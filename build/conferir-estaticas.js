// Portão do export: as páginas que NÃO são do redesign têm de sair intactas.
//
//   node build/conferir-estaticas.js       (depois de `npm run build`)
//
// Por que isto existe, e por que não se apaga sem ler:
//
//  - `privacidade.html` é documento legal E está citado, com âncora, num
//    e-mail de conformidade ao time de verificação OAuth do Google:
//    https://riachotech.com.br/privacidade.html#uso-limitado-google
//    Um revisor do Google vai abrir esse endereço. Se ele der 404, a resposta
//    que existia para provar que a declaração está publicada prova o contrário.
//    Por isso a URL COM `.html` e o `id` da seção são contrato, não detalhe.
//  - `conectar/index.html` é a página que o cliente abre na call de onboarding
//    para conectar o WhatsApp. Se ela cair, o lançamento para com o cliente do
//    outro lado.
//  - As duas leem `site.css`, que o Next não conhece e que virou artefato
//    congelado quando o `build:css` saiu do package.json.
//
// Este arquivo nasceu de um defeito real: o primeiro export do redesign não
// continha nenhuma das duas, e o `404.html` da casa tinha sido substituído
// pelo do Next, em inglês. Nada disso deu erro em lugar nenhum — o build
// passou verde. Daí o portão.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const raiz = path.join(__dirname, '..');
const out = path.join(raiz, 'out');
const falhas = [];
const ok = [];

const existe = (p) => fs.existsSync(path.join(out, p));
const ler = (p) => fs.readFileSync(path.join(out, p), 'utf8');

function checa(condicao, mensagem) {
  (condicao ? ok : falhas).push(mensagem);
}

// 1. Os arquivos saíram
for (const arquivo of ['privacidade.html', 'conectar/index.html', '404.html', 'site.css']) {
  checa(existe(arquivo), `existe out/${arquivo}`);
}

// 2. O texto visível é idêntico ao da origem. Não basta o arquivo existir:
//    ele tem de ser o MESMO documento.
for (const arquivo of ['privacidade.html', 'conectar/index.html']) {
  if (!existe(arquivo)) continue;
  const visivel = (p) =>
    execFileSync('node', [path.join(raiz, 'build/texto-visivel.js'), '--main', p], { encoding: 'utf8' });
  try {
    const antes = visivel(path.join(raiz, arquivo));
    const depois = visivel(path.join(out, arquivo));
    checa(antes === depois, `texto de ${arquivo} idêntico ao da origem`);
  } catch (e) {
    falhas.push(`não consegui comparar ${arquivo}: ${e.message}`);
  }
}

// 3. A âncora do e-mail do Google. Com CONTROLE NEGATIVO ao lado: uma âncora
//    que não existe TEM de dar falso, senão o "achou" não significa nada.
if (existe('privacidade.html')) {
  const html = ler('privacidade.html');
  checa(html.includes('id="uso-limitado-google"'), 'âncora #uso-limitado-google presente (citada ao Google)');
  checa(html.includes('id="exclusao"'), 'âncora #exclusao presente (link do rodapé)');
  checa(
    !html.includes('id="ancora-de-controle-que-nao-existe"'),
    'controle negativo: âncora inventada NÃO é encontrada',
  );
}

// 4. O 404 fala português. O Next sempre gera o dele, e ele já venceu uma vez.
if (existe('404.html')) {
  const html = ler('404.html');
  checa(html.includes('Essa página não existe'), '404 é o da casa');
  checa(!html.includes('This page could not be found'), '404 NÃO é o genérico do Next, em inglês');
}

for (const m of ok) console.log(`  ok      ${m}`);
for (const m of falhas) console.log(`  FALHA   ${m}`);
console.log(`\n${ok.length} conferência(s) passaram, ${falhas.length} falharam.\n`);
if (falhas.length) {
  console.error('Este export NAO pode ir ao ar.');
  process.exit(1);
}
