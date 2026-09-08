// Servidor estático COM gzip, para o Lighthouse medir o que a VPS realmente
// entrega. O `python3 -m http.server` não comprime, e medir sem compressão
// contra uma produção que comprime produz um número pessimista que descreve
// um servidor que não existe.
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const raiz = process.argv[2], porta = +process.argv[3];
const TIPOS = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript',
  '.png':'image/png', '.webp':'image/webp', '.woff2':'font/woff2', '.svg':'image/svg+xml', '.ico':'image/x-icon' };
const COMPRIME = new Set(['.html', '.css', '.js', '.svg']);
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const arq = path.join(raiz, p);
  if (!arq.startsWith(raiz) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end(); }
  const ext = path.extname(arq);
  const cab = { 'content-type': TIPOS[ext] || 'application/octet-stream', 'cache-control': 'public, max-age=300' };
  const dados = fs.readFileSync(arq);
  if (COMPRIME.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
    const gz = zlib.gzipSync(dados, { level: 9 });
    res.writeHead(200, { ...cab, 'content-encoding': 'gzip' }); return res.end(gz);
  }
  res.writeHead(200, cab); res.end(dados);
}).listen(porta, '127.0.0.1', () => console.log('servindo com gzip em', porta));
