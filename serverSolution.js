const http = require('http');
const { Worker } = require('worker_threads');

const server = http.createServer((req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (result) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World! Result: ' + result);
  });

  worker.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: ' + err.message);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// worker.js
const { parentPort } = require('worker_threads');

let i = 0;
while (i < 1000000000) {
  i++;
}

parentPort.postMessage(i);