// Mede a página e captura os três tamanhos. É a evidência que a skill
// design-site (.claude/skills/design-site/SKILL.md) exige antes de qualquer
// afirmação sobre a tela: contraste por par cor/fundo COMPOSTO (inclusive
// oklab(... / a), que é como o Tailwind 4 resolve as cores com opacidade),
// tamanho, entrelinha, tracking, medida em ch, alvos de toque, overflow,
// blur, gradiente, pseudo-elemento com content, fontes e console.
//
//   npm run medir                                    # site no ar
//   SITE_URL=http://localhost:8080/ npm run medir    # cópia local
//   OUT=/tmp/x PREFIX=site-final npm run medir       # outro destino/nome
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const OUT = process.env.OUT || `${os.homedir()}/para-revisao`;
const PREFIX = process.env.PREFIX || 'site-critica';
const URL = process.env.SITE_URL || 'https://riachotech.com.br/';
const VIEWS = [390, 820, 1280];

const AUDIT = () => {
  const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
  const gam = v => { v = Math.max(0, Math.min(1, v)); return 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055); };
  const oklabToRgb = (L, A, B, a) => { const l_ = L + 0.3963377774 * A + 0.2158037573 * B, m_ = L - 0.1055613458 * A - 0.0638541728 * B, s_ = L - 0.0894841775 * A - 1.2914855480 * B;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    return { r: gam(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), g: gam(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), b: gam(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s), a }; };
  const parse = c => { ctx.fillStyle = '#000'; ctx.fillStyle = c || ''; const v = ctx.fillStyle;
    if (v[0] === '#') return { r: parseInt(v.slice(1, 3), 16), g: parseInt(v.slice(3, 5), 16), b: parseInt(v.slice(5, 7), 16), a: 1 };
    let m = v.match(/^rgba?\(([^)]+)\)/); if (m) { const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; }
    m = v.match(/^oklab\(([^)]+)\)/); if (m) { const p = m[1].split(/[\s\/]+/).filter(Boolean).map(parseFloat); return oklabToRgb(p[0], p[1], p[2], p.length > 3 ? p[3] : 1); }
    m = v.match(/^oklch\(([^)]+)\)/); if (m) { const p = m[1].split(/[\s\/]+/).filter(Boolean).map(parseFloat); const h = p[2] * Math.PI / 180; return oklabToRgb(p[0], p[1] * Math.cos(h), p[1] * Math.sin(h), p.length > 3 ? p[3] : 1); }
    m = v.match(/^color\(srgb ([^)]+)\)/); if (m) { const p = m[1].split(/[\s\/]+/).filter(Boolean).map(parseFloat); return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 }; }
    return { r: 0, g: 0, b: 0, a: 1, unparsed: v }; };
  const comp = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const bgOf = el => { let bg = { r: 255, g: 255, b: 255, a: 1 }; const chain = []; for (let e = el; e; e = e.parentElement) chain.unshift(e);
    for (const e of chain) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0) bg = c.a >= 1 ? c : comp(c, bg); } return bg; };
  const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const visible = el => { const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0'; };
  const larguraNatural = (txt, cs) => { ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; return ctx.measureText(txt).width; };
  const chWidth = cs => { ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; return ctx.measureText('abcdefghijklmnopqrstuvwxyz ').width / 27; };
  const sel = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');

  const text = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el)) continue;
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ');
    if (!own) continue;
    const cs = getComputedStyle(el); const fg0 = parse(cs.color); const bg = bgOf(el); const fg = fg0.a < 1 ? comp(fg0, bg) : fg0;
    const size = parseFloat(cs.fontSize); const weight = parseInt(cs.fontWeight, 10);
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const r = el.getBoundingClientRect();
    const block = /^(p|h1|h2|h3|li|div)$/i.test(el.tagName) && cs.display !== 'inline';
    text.push({ sel: sel(el), sample: own.slice(0, 48), size, weight, lh: cs.lineHeight, ls: cs.letterSpacing, family: cs.fontFamily.split(',')[0],
      fg: hex(fg), bg: hex(bg), ratio: +ratio(fg, bg).toFixed(2), need: large ? 3 : 4.5, ok: ratio(fg, bg) >= (large ? 3 : 4.5),
      w: Math.round(r.width),
      // Só faz sentido falar em MEDIDA onde o texto realmente quebra: um
      // parágrafo de duas palavras numa caixa larga não tem medida ruim, tem
      // caixa larga. Compara a largura natural do texto com a da caixa.
      measureCh: block && larguraNatural(own, cs) > r.width ? +(r.width / chWidth(cs)).toFixed(0) : null });
  }
  const targets = [...document.querySelectorAll('a, button, [role=tab]')].filter(visible).map(el => { const r = el.getBoundingClientRect();
    return { sel: sel(el), label: (el.textContent.trim() || el.getAttribute('aria-label') || el.querySelector('img')?.alt || '').slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), ok44: r.width >= 44 && r.height >= 44, ok24: r.width >= 24 && r.height >= 24 }; });
  const overflow = { scrollWidth: document.documentElement.scrollWidth, innerWidth: innerWidth,
    culprits: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(sel).slice(0, 10) };
  const styleHits = { backdrop: [], gradient: [], negTracking: [], monoCount: 0, emoji: [] };
  for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el);
    if (cs.backdropFilter && cs.backdropFilter !== 'none') styleHits.backdrop.push(sel(el));
    if (/gradient/.test(cs.backgroundImage)) styleHits.gradient.push(sel(el));
    const ls = parseFloat(cs.letterSpacing); if (ls < 0 && ls / parseFloat(cs.fontSize) < -0.04) styleHits.negTracking.push(sel(el));
    if (/Plex Mono/i.test(cs.fontFamily) && visible(el) && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) styleHits.monoCount++;
    for (const p of ['::before', '::after']) { const c = getComputedStyle(el, p).content; if (c && c !== 'none' && c !== 'normal' && c !== '""') styleHits.emoji.push(sel(el) + p + '=' + c); }
  }
  const unparsed = [...new Set([...document.querySelectorAll('body *')].flatMap(el => [getComputedStyle(el).color, getComputedStyle(el).backgroundColor]).filter(c => parse(c).unparsed))];
  const fonts = [...document.fonts].map(f => `${f.family} ${f.weight} ${f.style}: ${f.status}`);
  return { text, targets, overflow, styleHits, fonts, unparsed, title: document.title, h1: document.querySelector('h1')?.textContent.trim() };
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`URL: ${URL}\nsaída: ${OUT}/${PREFIX}-*`);
  const browser = await chromium.launch();
  const report = {};
  for (const w of VIEWS) {
    const h = w === 390 ? 844 : w === 820 ? 1180 : 800;
    // (a) contexto com movimento reduzido: tudo revelado, captura de página inteira
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, reducedMotion: 'reduce', isMobile: w < 1000, hasTouch: w < 1000 });
    const page = await ctx.newPage();
    const log = { console: [], pageerror: [], failed: [], http: [] };
    page.on('console', m => { if (['error', 'warning'].includes(m.type())) log.console.push(`${m.type()}: ${m.text()}`); });
    page.on('pageerror', e => log.pageerror.push(String(e)));
    page.on('requestfailed', r => log.failed.push(r.url()));
    page.on('response', r => { if (r.status() >= 400) log.http.push(`${r.status()} ${r.url()}`); });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/${PREFIX}-${w}-inteira.png`, fullPage: true });
    const audit = await page.evaluate(AUDIT);
    report[w] = { ...audit, log };
    if (w === 1280 && await page.locator('#tab-clinicas').count()) {
      await page.locator('#tab-clinicas').focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(400);
      await page.locator('#segmentos').screenshot({ path: `${OUT}/${PREFIX}-1280-abas-foco.png` });
      await page.locator('header .btn-primary').hover();
      await page.waitForTimeout(300);
      await page.locator('header').screenshot({ path: `${OUT}/${PREFIX}-1280-hero-hover.png` });
      await page.locator('#planos').screenshot({ path: `${OUT}/${PREFIX}-1280-planos.png` });
    }
    await ctx.close();
    // (b) contexto normal: a dobra como o visitante vê, com o hero digitando
    const ctx2 = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: w < 1000, hasTouch: w < 1000 });
    const p2 = await ctx2.newPage();
    await p2.goto(URL, { waitUntil: 'networkidle' });
    await p2.waitForTimeout(4200);
    await p2.screenshot({ path: `${OUT}/${PREFIX}-${w}-dobra.png` });
    // Páginas sem a seção de segmentos (privacidade, 404) passam direto: o
    // script serve a qualquer tela do site, não só à home.
    if (w === 390 && await p2.locator('#segmentos').count()) {
      await p2.evaluate(() => document.getElementById('segmentos').scrollIntoView());
      await p2.waitForTimeout(1200);
      await p2.screenshot({ path: `${OUT}/${PREFIX}-390-segmentos.png` });
    }
    await ctx2.close();
  }
  fs.writeFileSync(`${OUT}/${PREFIX}-medicao.json`, JSON.stringify(report, null, 1));
  await browser.close();
  // resumo legível
  for (const w of VIEWS) { const r = report[w];
    console.log(`\n===== ${w}px — ${r.title}`);
    console.log(`overflow: scrollWidth ${r.overflow.scrollWidth} vs innerWidth ${r.overflow.innerWidth}${r.overflow.culprits.length ? ' culpados: ' + r.overflow.culprits.join(', ') : ''}`);
    console.log(`fontes carregadas: ${[...new Set(r.fonts.filter(f => /loaded/.test(f)))].join(' | ')} | cores não parseadas: ${r.unparsed.join(', ') || 'nenhuma'}`);
    console.log(`console/erros/falhas/http>=400: ${r.log.console.length}/${r.log.pageerror.length}/${r.log.failed.length}/${r.log.http.length} ${JSON.stringify(r.log)}`);
    console.log(`backdrop: ${r.styleHits.backdrop.join(', ') || '-'} | gradiente: ${r.styleHits.gradient.join(', ') || '-'} | tracking<-0.04em: ${r.styleHits.negTracking.join(', ') || '-'} | elementos em mono: ${r.styleHits.monoCount} | pseudo content: ${[...new Set(r.styleHits.emoji)].join(', ')}`);
    const bad = r.text.filter(t => !t.ok); console.log(`contraste reprovado (${bad.length}):`); bad.forEach(t => console.log(`  ${t.ratio}:1 (precisa ${t.need}) ${t.sel} ${t.size}px ${t.fg}/${t.bg} "${t.sample}"`));
    const small = r.text.filter(t => t.size < 16 && /^(p|li)/.test(t.sel)); console.log(`corpo (<p>/<li>) abaixo de 16px (${small.length}):`); [...new Map(small.map(t => [t.sel + t.size, t])).values()].forEach(t => console.log(`  ${t.size}px ${t.sel} "${t.sample}"`));
    const wide = r.text.filter(t => t.measureCh && /^p/.test(t.sel) && (t.measureCh > 75 || t.measureCh < 45)); console.log(`medida fora de 45–75ch em <p> (${wide.length}):`); wide.forEach(t => console.log(`  ${t.measureCh}ch (${t.w}px, ${t.size}px) ${t.sel} "${t.sample}"`));
    const tt = r.targets.filter(t => !t.ok44); console.log(`alvos < 44×44 (${tt.length} de ${r.targets.length}):`); tt.forEach(t => console.log(`  ${t.w}×${t.h}${t.ok24 ? '' : ' (<24 TAMBÉM)'} ${t.sel} "${t.label}"`));
    const mins = r.text.map(t => t.size); console.log(`tamanhos de fonte em uso: ${[...new Set(mins)].sort((a, b) => a - b).join(', ')}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
