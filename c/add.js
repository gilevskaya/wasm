const fs = require("fs");
const buf = fs.readFileSync(__dirname + "/add.wasm");

const [A, B] = Object.freeze([4, 2]);

WebAssembly.instantiate(buf).then(res => {
  const { add } = res.instance.exports;
  console.log(`Sum of ${A} and ${B}: ${add(A, B)}`);
});
