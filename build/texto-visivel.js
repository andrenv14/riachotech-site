// Extrai o texto VISÍVEL de um HTML, para provar que uma mudança de
// apresentação não mexeu no conteúdo. Existe por causa da política de
// privacidade, que é compromisso público: restyle não pode alterar uma
// palavra. Compara-se a saída de duas versões:
//
//   git show main:privacidade.html | node build/texto-visivel.js > /tmp/antes.txt
//   node build/texto-visivel.js privacidade.html > /tmp/depois.txt
//   diff /tmp/antes.txt /tmp/depois.txt
//
// Com --main, considera só o conteúdo de <main>: o texto do documento em si,
// sem a moldura de nav e rodapé.
const fs = require('fs');
const args = process.argv.slice(2);
const soMain = args.includes('--main');
const arquivo = args.find(a => !a.startsWith('--'));
const html = arquivo ? fs.readFileSync(arquivo, 'utf8') : fs.readFileSync(0, 'utf8');
let t = html;
if (soMain) { const m = t.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i); t = m ? m[1] : ''; }
t = t.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
     .replace(/<!--[\s\S]*?-->/g, ' ')
     .replace(/<[^>]*>/g, ' ');
const ent = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ldquo: '“', rdquo: '”',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', acirc: 'â', ecirc: 'ê', ocirc: 'ô',
  atilde: 'ã', otilde: 'õ', ccedil: 'ç', agrave: 'à', times: '×' };
t = t.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, c) =>
  c[0] === '#' ? String.fromCodePoint(parseInt(c[1] === 'x' ? c.slice(2) : c.slice(1), c[1] === 'x' ? 16 : 10)) : (ent[c] ?? m));
process.stdout.write(t.replace(/\s+/g, ' ').trim().replace(/([.:!?]) /g, '$1\n') + '\n');
