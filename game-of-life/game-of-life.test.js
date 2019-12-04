const { readFileSync } = require("fs");
const { build, OUT_WASM } = require("./build");

const instantiate = async () => {
  const buffer = readFileSync(__dirname + "/" + OUT_WASM);
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  return instance.exports;
};

beforeAll(() => {
  build();
});

beforeEach(async done => {
  wasm = await instantiate();
  done();
});

test("hello world returns 42", () => {
  expect(wasm.helloWorld()).toBe(43);
});

test("offsetFromCoordinate", () => {
  expect(wasm.offsetFromCoordinate(0, 0)).toBe(0);
  expect(wasm.offsetFromCoordinate(49, 0)).toBe(49 * 4);
  expect(wasm.offsetFromCoordinate(10, 2)).toBe((10 + 2 * 50) * 4);
});

test("get / set cell", () => {
  // check that linear memory initialises to zero
  expect(wasm.getCell(2, 2)).toBe(0);
  // set and expect
  wasm.setCell(2, 2, 1);
  expect(wasm.getCell(2, 2)).toBe(1);
});

test("read memory directly", () => {
  const memory = new Uint32Array(wasm.memory.buffer, 0, 50 * 50);
  wasm.setCell(2, 2, 10);
  expect(memory[2 + 2 * 50]).toBe(10);
  expect(memory[3 + 2 * 50]).toBe(0);
});
