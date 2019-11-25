const fs = require("fs");

const N = 10;
const [A, B] = Object.freeze([4, 2]);

const envModuleBuf = fs.readFileSync(__dirname + "/env.wasm");
const memory = new WebAssembly.Memory({ initial: N, maximum: 100 });
// instantiateStreaming doesn't seem to work on node v13.2.0
WebAssembly.instantiate(envModuleBuf, {
  env: {
    memory,
    js_log: console.log
  }
}).then(obj => {
  var i32 = new Uint32Array(memory.buffer);
  for (var i = 0; i < N; i++) {
    i32[i] = i;
  }
  const { hello42, accumulate } = obj.instance.exports;
  hello42();
  // where 0 pointer to the memory start
  console.log(`Accumulate ${N} result`, accumulate(0, N));
});

const envMathBuf = fs.readFileSync(__dirname + "/math.wasm");
WebAssembly.instantiate(envMathBuf).then(obj => {
  const { add, mult } = obj.instance.exports;
  console.log(`Sum of ${A} and ${B}: ${add(A, B)}`);
  console.log(`Mult of ${A} and ${B}: ${mult(A, B)}`);
});
