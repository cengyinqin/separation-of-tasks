const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const PORT = 3000;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let filePath = path.join(OUT, req.url === '/' ? '/index.html' : req.url);

  // Map clean URLs to .html files
  if (!path.extname(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) filePath = htmlPath;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'text/html' });

  try {
    res.end(fs.readFileSync(filePath));
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
