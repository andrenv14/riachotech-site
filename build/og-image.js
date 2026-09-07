// Gera a og-image a partir dos PRÓPRIOS tokens e componentes do site: monta
// uma composição 1200×630 que usa o site.css compilado, fotografa e otimiza.
// Antes, a prévia do link era o ícone do avião num quadrado 630×630 — quem
// recebia o endereço no WhatsApp (que é o canal de venda) via a marca, não o
// produto. Rodar depois de `npm run build:css`:
//
//   node build/og-image.js
//
const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(raiz, 'site.css'), 'utf8');
const logo = fs.readFileSync(path.join(raiz, 'logo.png')).toString('base64');

const bolha = (quem, texto, hora) =>
  `<div class="bubble bubble-${quem}" style="opacity:1;transform:none;animation:none">${texto}<span class="bubble-tick">${hora}</span></div>`;

const pagina = `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${css}
  body { margin:0; width:1200px; height:630px; overflow:hidden; }
  .og { width:1200px; height:630px; display:grid; grid-template-columns:1.1fr 0.9fr;
        align-items:center; gap:48px; padding:0 64px; box-sizing:border-box; }
</style></head>
<body class="bg-paper text-ink font-sans antialiased leading-[1.6]">
  <div class="og">
    <div>
      <img src="data:image/png;base64,${logo}" alt="" width="340" height="91" style="height:38px;width:auto;margin-bottom:34px">
      <h1 style="font-size:60px;line-height:1.04;margin:0 0 22px">Seu WhatsApp já pode <em class="text-signal-dark">marcar horário</em> sozinho.</h1>
      <p class="text-muted" style="font-size:24px;margin:0 0 26px;max-width:22ch">A assistente que atende, confere sua agenda e marca o horário.</p>
      <span class="font-mono text-muted" style="font-size:18px;letter-spacing:.02em">riachotech.com.br</span>
    </div>
    <div style="display:flex;justify-content:center">
      <div class="phone" style="width:290px">
        <div class="phone-screen" style="height:470px">
          <div class="phone-bar"><span class="av">S</span><div><div>Sofia</div><div class="status">online</div></div></div>
          <div class="phone-body">
            ${bolha('in', 'oi, tem horário livre amanhã de tarde?', '14:02')}
            ${bolha('out', 'Deixa eu conferir a agenda… tenho 15h ou 16h30 livres, qual fica melhor pra você?', '14:02')}
            ${bolha('in', 'pode ser 16h30', '14:03')}
            ${bolha('out', 'Prontinho! Marcado amanhã às 16h30.', '14:03')}
          </div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(pagina, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const bruto = await page.screenshot({ type: 'png' });
  await browser.close();
  const destino = path.join(raiz, 'og-image.png');
  // Paleta indexada: a composição é chapada (sem foto), então 128 cores bastam
  // e o arquivo fica na casa dos 60 KB em vez de 250 KB em cor verdadeira.
  await sharp(bruto).png({ palette: true, colors: 128, compressionLevel: 9 }).toFile(destino);
  const { size } = fs.statSync(destino);
  console.log(`og-image.png: 1200×630, ${(size / 1024).toFixed(1)} KB`);
})();
