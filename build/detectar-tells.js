// Conta os tells que a taste-skill nomeia e a `design-site` não pegava. Ele
// CONTA; quem lê julga. Roda como o `medir-site.js`, na mesma máquina e com o
// mesmo Chromium:
//
//   node build/detectar-tells.js https://riachotech.com.br/
//   node build/detectar-tells.js http://localhost:3000/
//
const { chromium } = require('playwright');

const URL = process.argv[2] || process.env.SITE_URL || 'https://riachotech.com.br/';
const TETO_TRAVESSAO = 6;

const AUDIT = () => {
  const vis = e => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden';
  };
  const linhas = e => {
    const cs = getComputedStyle(e);
    let lh = parseFloat(cs.lineHeight);
    if (!lh || Number.isNaN(lh)) lh = parseFloat(cs.fontSize) * 1.2;
    return Math.max(1, Math.round(e.getBoundingClientRect().height / lh));
  };

  // 1. travessão no TEXTO VISÍVEL (não no markup: href e comentário não contam)
  const texto = document.body.innerText;
  const travessao = (texto.match(/—/g) || []).length;

  // 2. eyebrow: conta o ELEMENTO, nunca a classe — `.eyebrow` tem um
  //    `.eyebrow-dot` aninhado, e contar por string pega os dois.
  const eyebrows = [...document.querySelectorAll('.eyebrow')].filter(vis);
  const secoes = document.querySelectorAll('section').length;

  // 3. eyebrow numerado: "01 — ", "001 · ", "1. " abrindo um rótulo curto
  const numerado = [...document.querySelectorAll('*')]
    .filter(e => e.children.length === 0 && vis(e))
    .map(e => e.textContent.trim())
    .filter(t => t.length < 60 && /^0?\d{1,3}\s*[—·\-.]\s*\S/.test(t));

  // 4. hero
  const h1 = document.querySelector('h1');
  let hero = null;
  if (h1) {
    let p = h1.nextElementSibling;
    while (p && p.tagName !== 'P') p = p.nextElementSibling;
    hero = {
      h1Linhas: linhas(h1),
      h1Texto: h1.innerText.replace(/\s+/g, ' ').slice(0, 80),
      subPalavras: p ? p.innerText.trim().split(/\s+/).length : null,
      subLinhas: p ? linhas(p) : null,
    };
  }

  // 5. CTA de intenção duplicada, na PRIMEIRA TELA
  const alturaTela = window.innerHeight;
  const ctas = [...document.querySelectorAll('a, button')]
    .filter(vis)
    .filter(e => e.getBoundingClientRect().top < alturaTela)
    .map(e => e.innerText.trim())
    .filter(Boolean);
  const intencao = t => t.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\b(no|na|o|a|os|as|seu|sua|com|de|do|da|pra|para|meu|minha)\b/g, '')
    .replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
  const porIntencao = {};
  for (const t of ctas) {
    const k = intencao(t).split(' ').filter(w => w.length > 3).sort().join(' ');
    if (!k) continue;
    (porIntencao[k] = porIntencao[k] || []).push(t);
  }
  const ctasDuplicados = Object.values(porIntencao).filter(v => v.length > 1);

  // 6. raio concêntrico — SÓ quando o filho PREENCHE o pai.
  //
  //    A primeira versão desta regra rodou contra o próprio redesign em
  //    08/09/2026 e acusou um falso positivo: uma miniatura de foto de 44px
  //    dentro de um card com 12px de folga. Ali os dois cantos não se
  //    encostam, e obedecer a regra ao pé da letra mandaria deixar a
  //    miniatura QUADRADA, que é pior. Concentricidade só importa quando as
  //    curvas ficam lado a lado — a tela dentro da moldura do celular, que foi
  //    o caso que originou a regra. O corte é o filho ocupar quase toda a
  //    largura útil do pai. Detector que grita à toa deixa de ser lido.
  const raios = [];
  for (const pai of document.querySelectorAll('*')) {
    const cp = getComputedStyle(pai);
    const rPai = parseFloat(cp.borderTopLeftRadius);
    const pad = parseFloat(cp.paddingTop);
    if (!(rPai > 8) || !(pad > 0)) continue;
    const larguraUtil = pai.getBoundingClientRect().width - parseFloat(cp.paddingLeft) - parseFloat(cp.paddingRight);
    for (const filho of pai.children) {
      const rf = parseFloat(getComputedStyle(filho).borderTopLeftRadius);
      if (!(rf > 0)) continue;
      const preenche = larguraUtil > 0 && filho.getBoundingClientRect().width >= larguraUtil * 0.9;
      if (!preenche) continue;
      const esperado = rPai - pad;
      if (Math.abs(rf - esperado) >= 1) {
        raios.push({
          pai: pai.className.toString().slice(0, 30) || pai.tagName,
          filho: filho.className.toString().slice(0, 30) || filho.tagName,
          raioPai: rPai, padding: pad, esperado, encontrado: rf,
        });
      }
    }
  }

  return {
    travessao,
    eyebrows: eyebrows.length, eyebrowTextos: eyebrows.map(e => e.innerText.trim()),
    secoes, numerado, hero, ctasDuplicados, raios: raios.slice(0, 10),
  };
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(AUDIT);
  await browser.close();

  const achados = [];
  const diz = (ok, msg) => { console.log(`${ok ? '  ok ' : 'ACHADO'}  ${msg}`); if (!ok) achados.push(msg); };

  console.log(`\ndetectar-tells — ${URL}\n`);
  diz(r.travessao <= TETO_TRAVESSAO, `travessão: ${r.travessao} (teto ${TETO_TRAVESSAO})`);
  const tetoEye = Math.max(1, Math.ceil(r.secoes / 3));
  diz(r.eyebrows <= tetoEye, `eyebrow: ${r.eyebrows} em ${r.secoes} seções (teto ${tetoEye}) ${JSON.stringify(r.eyebrowTextos)}`);
  diz(r.numerado.length === 0, `eyebrow numerado: ${r.numerado.length} ${JSON.stringify(r.numerado.slice(0, 4))}`);
  if (r.hero) {
    diz(r.hero.h1Linhas <= 2, `h1 do hero: ${r.hero.h1Linhas} linhas — "${r.hero.h1Texto}"`);
    diz(r.hero.subPalavras === null || r.hero.subPalavras <= 20, `subtexto do hero: ${r.hero.subPalavras} palavras, ${r.hero.subLinhas} linhas (teto 20 e 4)`);
  } else diz(false, 'não achei <h1>');
  diz(r.ctasDuplicados.length === 0, `CTA de intenção duplicada na 1ª tela: ${JSON.stringify(r.ctasDuplicados)}`);
  diz(r.raios.length === 0, `raio não concêntrico: ${r.raios.length}${r.raios.length ? ' → ' + JSON.stringify(r.raios[0]) : ''}`);

  console.log(`\n${achados.length} achado(s).\n`);
  process.exitCode = 0; // conta, não reprova: quem lê julga
})();
