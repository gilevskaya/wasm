const { readFileSync, writeFileSync } = require("fs");
const wabt = require("wabt")();

const IN_WAT = "game-of-life.wat";
const OUT_WASM = "game-of-life.wasm";

const build = async () => {
  const wasmModule = wabt.parseWat(IN_WAT, readFileSync(IN_WAT, "utf8"));
  const { buffer } = wasmModule.toBinary({});
  writeFileSync(OUT_WASM, Buffer.from(buffer));
};

module.exports = { build, OUT_WASM };
