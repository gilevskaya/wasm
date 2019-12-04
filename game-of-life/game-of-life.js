const { readFileSync } = require("fs");
const { build, OUT_WASM } = require("./build");

build();

(async () => {
  const buffer = readFileSync(__dirname + "/" + OUT_WASM);
  WebAssembly.instantiate(buffer).then(res => {
    const { helloWorld } = res.instance.exports;
    console.log(helloWorld());
  });
})();
