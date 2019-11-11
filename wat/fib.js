const fs = require("fs");
const buf = fs.readFileSync(__dirname + "/fib.wasm");

const NUM = 5;

WebAssembly.instantiate(buf).then(res => {
  const { fib } = res.instance.exports;
  console.log(`Fibonacci of ${NUM} is ${fib(NUM)}`);
});
