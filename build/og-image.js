// Gera a prévia de link (og-image) FOTOGRAFANDO O SITE DE VERDADE.
//
//   npm run build && node build/og-image.js
//
// A versão anterior montava uma composição 1200×630 à parte, com markup
// próprio, lendo o `site.css` compilado. Isso funcionou enquanto o site ERA
// aquele CSS. Com o redesign em Next, a composição continuou a existir e a
// gerar a prévia do site ANTIGO: um artefato que descreve algo que já não
// existe, sem nada acusando. É o mesmo defeito de doc desatualizado, em
// imagem.
//
// A cura é não ter uma segunda descrição do site. Este script sobe o `out/`
// num servidor local, abre a página real numa janela 1200×630 e fotografa.
// Se o site mudar, a prévia muda junto, porque é a mesma coisa.
//
// Importa porque o `docs/contexto/negocio.md` registra que o endereço é
// enviado por WhatsApp, que é o canal de venda: quem recebe o link vê esta
// imagem antes de ver o site.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const raiz = path.join(__dirname, '..');
const out = path.join(raiz, 'out');
const PORTA = 8123;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json',
};

function servidor() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const arquivo = path.join(out, p);
    if (!arquivo.startsWith(out) || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
      res.writeHead(404); return res.end('não achei');
    }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(arquivo)] || 'application/octet-stream' });
    fs.createReadStream(arquivo).pipe(res);
  });
}

(async () => {
  if (!fs.existsSync(path.join(out, 'index.html'))) {
    console.error('rode `npm run build` antes: não há out/index.html');
    process.exit(1);
  }
  const srv = servidor();
  await new Promise((r) => srv.listen(PORTA, '127.0.0.1', r));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:${PORTA}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // o nav gruda no topo e ocuparia 62px da prévia sem acrescentar nada
  await page.evaluate(() => { const h = document.querySelector('header'); if (h) h.style.display = 'none'; });
  await page.waitForTimeout(300);
  const bruto = await page.screenshot({ type: 'png' });
  await browser.close();
  srv.close();

  // paleta indexada: a composição é chapada fora do halo, então 128 cores
  // bastam e o arquivo cai de centenas de KB para dezenas.
  const imagem = await sharp(bruto).resize(1200, 630).png({ palette: true, colors: 128, compressionLevel: 9 }).toBuffer();
  for (const destino of [path.join(raiz, 'public/og-image.png'), path.join(out, 'og-image.png')]) {
    fs.writeFileSync(destino, imagem);
  }
  console.log(`og-image.png: 1200×630, ${(imagem.length / 1024).toFixed(1)} KB (public/ e out/)`);
})();
