# Renovação do site institucional — crítica, escopo e plano

Sessão de decisão (Fable, plan mode) em 07/09/2026, WSL. Implementação em
`opusplan` + xhigh, na sessão seguinte, DEPOIS deste plano aprovado. Este
arquivo vive em `~/riachotech-site/docs/plans/2026-09-renovacao.md` — plano
aprovado é artefato versionado do repositório que ele descreve. (O harness o
criou em `~/sofia-bot/docs/plans/`; foi movido ainda em plan mode, a pedido da
guia, porque um arquivo não rastreado ali suja a working tree da sessão da
`fala-do-dono-completa`, que mede a suíte com "tree: 0 arquivo(s) modificado(s)".)

## Contexto

O fundador quer o site renovado antes da primeira call de cliente, com o que
vale do "impeccable" (github.com/pbakaus/impeccable) — SEM instalar o kit
(binário em `~/.impeccable/bin/`, hook que reescreve `settings.local.json`,
23 comandos). O que serve vira uma skill local do repositório do site e um
`DESIGN.md`; o resto é lido e absorvido. Texto obedece ao
`~/sofia-bot/docs/contexto/negocio.md`; visual ao
`~/sofia-bot/docs/brand-riacho-tech.md`. Nenhum dos dois muda nesta fatia.

Estado de abertura (verificado): `~/riachotech-site` em `main`, igual ao
`origin`, único item fora do controle de versão é `.claude/agent-memory/`.
Os quatro arquivos servidos (`index.html`, `site.css`, `site.js`,
`privacidade.html`) são byte a byte iguais ao `main` (`curl | diff -q`), então
a crítica mediu o site no ar e vale para o repositório.

## Decisões do fundador (nesta janela, 07/09)

- **Escopo: T2** — refinar (T1) + redesenhar a seção "Planos" + prévia do link.
- **Detector do impeccable: sim, uma vez** — rodou (`npx impeccable@latest detect --json`,
  binário em `~/.impeccable/bin/`, nada no repositório nem em `settings`);
  saída em `impeccable-detect-site.json` (scratchpad → `~/para-revisao/` no
  primeiro passo da implementação). É a evidência B abaixo.
- **Lighthouse: `npx lighthouse` no WSL** com o Chromium do Playwright
  (`CHROME_PATH=~/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`).
  Linha de base medida nesta sessão — abaixo.
- Modelo: Fable só para o plano; a implementação exige `/model opusplan`
  nesta janela antes da primeira edição.

## Evidência — o que foi medido e como

**A — Playwright.** `medir-site.js` (Playwright 1.62.1 de
`~/sofia-bot/node_modules`, Chromium 151, `deviceScaleFactor: 2`) contra
`https://riachotech.com.br/` em 390×844, 820×1180 e 1280×800, em dois contextos:
`reducedMotion: 'reduce'` (tudo revelado, captura de página inteira e medição)
e movimento normal (dobra como o visitante vê, aos 4,2 s). O script está no
scratchpad desta sessão e **entra no repositório como `build/medir-site.js`**
(o Nginx já nega `build/`). Ele mede, por elemento com texto próprio: tamanho,
peso, entrelinha, tracking, família, cor e fundo compostos (inclusive
`oklab(... / α)` do Tailwind 4, que a canvas devolve sem normalizar —
conversão oklab→sRGB no próprio script), razão de contraste contra o limiar
que o tamanho exige, medida em `ch`; por alvo (`a, button, [role=tab]`): caixa
em px; por página: `scrollWidth`, `backdrop-filter`, gradientes,
`::before/::after` com `content`, fontes carregadas, console, `pageerror`,
requests falhados e HTTP ≥ 400.

Capturas (scratchpad → `~/para-revisao/site-critica-*.png` → `scp` para a VPS,
no primeiro passo da implementação): `390-inteira`, `390-dobra`,
`390-segmentos`, `820-inteira`, `820-dobra`, `1280-inteira`, `1280-dobra`,
`1280-abas-foco`, `1280-hero-hover`, `1280-planos`.

**B — detector determinístico do impeccable**, 17 achados (10 regras). Lido
DEPOIS da leitura A fechada, para não ancorar o julgamento.

**Lighthouse 12.8.2 mobile, linha de base (07/09, Chromium 151):**
performance **98**, acessibilidade **100**, boas práticas **100**, SEO **100**;
FCP 1,7 s, LCP 1,7 s (elemento: o lead do hero), TBT 0 ms, **CLS 0,072**.
Auditorias abaixo de 1 que dependem do repositório: `unsized-images`
(`logo.png` no nav e no rodapé, sem `width`/`height`) e o deslocamento do hero
(0,066) causado por esse `img` mais a troca de fonte (Inter e Fraunces
carregando sobre o fallback). As que dependem do Nginx (VPS): sem compressão
de texto (`site.css` 18,7 KB, `site.js` 7 KB), cache TTL curto, e as fontes do
Google como recurso bloqueante (886 ms). `forced-reflow`: 44 ms em `site.js`
(`segChat.scrollTop = segChat.scrollHeight`), irrelevante.

## Passo 1 — Crítica do site no ar

### Veredito de especificidade

**Metade Riacho, metade trocável.** O hero (Fraunces com itálico de verdade,
o celular digitando sozinho, a linha mono "feito em Brasília · integrado ao
Google Agenda") e "Pra quem é" (o mesmo celular, três roteiros reais, um por
segmento) são da Riacho — ninguém troca o logotipo e sai com o site de outra
empresa. A voz do texto também é ("Prontinho!", "sem planilha, sem alguém
parado no celular o dia inteiro", preço inteiro na primeira vez).

O que é trocável por qualquer SaaS: **"Recursos"** (quatro cards brancos iguais,
rótulo mono + título + parágrafo, em grade 2×2 — o anti-padrão número um da
lista, e a seção repete em outra forma os mesmos quatro itens que a lista do
plano já traz), **"Planos"** (card com borda + tinta sobre navy, lista com
`✓`, e o preço — a informação que a dona de clínica veio buscar — na MENOR
tipografia da seção: 11,5 px mono) e, pelo detector, **a forma do hero**:
rótulo mono maiúsculo acima de um H1 grande é "o hero padrão de SaaS de IA".
Nav e rodapé são genéricos, e não precisam deixar de ser.

### Evidência B × leitura A — a divergência é o achado

| Achado do detector | A já tinha? | Decisão |
|---|---|---|
| `hero-eyebrow-chip` + `all-caps-body` (os 32 caracteres de "Assistente de agendamento com IA") | parcial — A declarou o eyebrow como exceção de marca | **B tem razão no hero.** O rótulo mono é assinatura da marca como SISTEMA (hora, tag de linha, "feito em Brasília"); acima do H1 é o clichê. O conteúdo do eyebrow já está no H1 e na linha mono abaixo dos CTAs: **sai do topo, e a linha mono de baixo fica como única marca mono do hero.** Os eyebrows de SEÇÃO ("Pra quem é", "Planos") ficam — exceção declarada: nomeiam a seção, não antecedem um hero. O `brand-riacho-tech.md` cita o eyebrow do hero como exemplo da assinatura; o doc não muda nesta fatia — nota para a guia registrar o exemplo a atualizar |
| `kicker-above-heading` ("Pra quem é") | sim | fica (exceção de seção acima) |
| `tiny-text` 11,5 px | sim | abas → Inter 15 px; `.tag` → 12,5 px |
| `undersized-ui-text` "online" 10,5 px (×2) | não | 11 px — cabe no mock sem mudar o desenho |
| `numbered-section-labels` ×3 (advisory) | sim, justificado | fica: sequência real com a hora da conversa |
| `em-dash-overuse` — 13 travessões no corpo | **não** | **B pegou o que A não viu.** Travessão a cada frase é marca de texto gerado. Passar o texto trocando por ponto/vírgula onde não é aparte real; comando que conta: `grep -o '&mdash;\|—' index.html \| wc -l` |
| `overused-font` Inter 59 % | — | falso positivo para esta marca: Inter é o corpo por decisão do doc de marca; a voz é da Fraunces |
| `text-overflow` ×5 ("p overflows by 228–720 px") | — | provável falso positivo: cinco `<p>` na transcrição `sr-only` do hero (caixa de 1 px por definição). **Confirmar por seletor no passo 2** — o JSON não o traz |
| `nested-cards` | — | provável falso positivo: `.phone-screen` dentro de `.phone` é um aparelho, não card em card. Confirmar por seletor no passo 2 |

O que A pegou e B não tem regra para: os quatro cards iguais de "Recursos", o
`✓` como glifo, `.reveal` em 15 elementos e a página em branco sem JS, o preço
em corpo de nota, a entrelinha de display herdada do corpo, corpo abaixo de
16 px, alvos abaixo de 44 px, o 404 cru, o nav com blur, `::selection` sem tema.

### Heurísticas de Nielsen (0–4; a 5ª não se aplica — não há formulário)

| # | Heurística | Nota | Achado |
|---|---|---|---|
| 1 | Visibilidade do estado | 3 | Aba ativa clara (fundo + `aria-selected`); nav fixo não marca a seção corrente |
| 2 | Correspondência com o mundo real | 4 | Mock de WhatsApp fiel; linguagem de dono de negócio, não de tecnologia |
| 3 | Controle e liberdade | 3 | Abas por teclado, sem armadilha; `wa.me` abre nova aba sem aviso; sem "voltar ao topo" |
| 4 | Consistência e padrões | 2 | CTA muda de verbo (Falar / Testar / Chamar); abas em mono maiúsculo, botões em Inter; H1 a 1,06 de entrelinha e H2/H3 a 1,60; preço em tamanho de nota |
| 5 | Prevenção de erro | n/a | Única entrada é o texto pré-preenchido do WhatsApp |
| 6 | Reconhecimento, não memória | 2 | Em 390 o nav é só logo + CTA: não há caminho para "Planos"; o preço está a ~6 telas; o `.tag` "Clínicas" do painel repete a aba "CLÍNICAS" ativa 30 px acima |
| 7 | Flexibilidade e eficiência | 3 | Texto pré-preenchido diferente por seção (bom); sem atalho para o preço no celular |
| 8 | Estética e minimalismo | 3 | Leve (222 KB); "Recursos" duplica a lista do plano; revelação no scroll não acrescenta |
| 9 | Recuperação de erro | 1 | `/qualquer-coisa` devolve o 404 cru do Nginx ("nginx/1.18.0 (Ubuntu)"), sem link de volta |
| 10 | Ajuda e documentação | 3 | Rodapé com e-mail, privacidade e exclusão de dados; nenhuma das objeções do `negocio.md` ("medo de perder o número", "já uso um sistema") aparece no site |
| | **Total** | **24/36** | |

### Pontos fortes

1. **O celular é um elemento-assinatura de verdade** — aparece duas vezes e em
   nenhum outro lugar, com roteiro real por segmento, `tablist` correto,
   navegação por seta, foco visível (anel duplo, medido na captura
   `1280-abas-foco`) e transcrição `sr-only` do que o mock decorativo mostra.
2. **A voz do texto é o `negocio.md` falando** — verbo direto, preço por
   inteiro, "a mensalidade só começa 30 dias depois dela estar no ar". Nada a
   reescrever, fora os travessões.
3. **Disciplina técnica que a maioria dos sites não tem**: zero hex fora do
   `@theme`, contraste sem UMA reprovação nos três tamanhos (par mais apertado
   4,64:1), console limpo, `prefers-reduced-motion` respeitado nas quatro
   interações, sem rolagem horizontal em 390, Lighthouse 98/100/100/100.

### Problemas priorizados

Teste aplicado: "um usuário abriria chamado por isso? então é pelo menos P1".

- **[P1] O preço é a menor letra da seção que existe para mostrá-lo.**
  `#planos` › `.font-mono.text-[11.5px]` "R$1.000 de implantação (ou 2× R$500)
  + R$200/mês". A dona de clínica rola seis telas para chegar aqui e encontra a
  resposta em corpo de nota de rodapé. Cura (T2 redesenha a seção; se só T1
  entrar, vale aqui): o preço vira o segundo elemento em hierarquia, em
  display ≥ 28 px, com "implantação" e "mensalidade" em duas linhas legíveis.
- **[P1] Em 390 px, a primeira tela não mostra o produto.** Captura
  `390-dobra`: rótulo, H1, lead, dois botões e a nota mono; o celular começa
  no último pixel da dobra. A pessoa com 20 segundos lê texto pedindo confiança
  em vez de VER a conversa acontecendo — o oposto do que a spec S3 declarou
  como razão do hero. Cura: abaixo de 900 px, o celular sobe (H1 → celular
  compacto → lead → CTAs), com a tela do celular reduzida para caber na dobra;
  provar por captura em 390 antes de qualquer outra coisa.
- **[P1] No celular não há caminho para o preço.** O nav em < 760 px é logo +
  CTA; as âncoras somem sem menu. Cura mínima: abaixo de 760 px o logo mostra
  só o ícone (recorte do próprio `logo.png` por caixa com `overflow: hidden`,
  sem asset novo — o avião ocupa a ponta esquerda) e sobra espaço para UM link
  "Planos" ao lado do CTA.
- **[P2] Dois pisos tipográficos furados.** (a) 17 `<p>/<li>` abaixo de 16 px
  (14,5 nos cards e nos itens do plano, 15 nas colunas, 13 na nota do plano);
  (b) H2/H3 herdam `leading-[1.6]` do `body` — H2 de 36 px a 57,6 px de
  entrelinha, e o único título com entrelinha de display é o H1. Cura: corpo
  ≥ 16 px em toda `<p>/<li>`; `h2 { line-height: 1.15 } h3 { line-height: 1.25 }`
  no `@layer base`.
- **[P2] Revelação no scroll em 15 elementos, e sem JS a página fica em
  branco abaixo do hero.** `grep -o '\breveal\b' index.html | wc -l` → 15 (a
  spec S3 escreveu "6, não ~15" — a contagem envelheceu e ninguém viu). `.reveal
  { opacity: 0 }` é incondicional; a classe `.in` só vem do JS. Quem rola rápido
  vê vazios de 0,6 s por seção — "uma entrada idêntica em toda seção" é o
  anti-padrão de movimento do craft floor, e o momento autoral da página já
  existe (o celular digitando). Cura: remover `.reveal` do CSS, do HTML e o
  `IntersectionObserver` do `site.js`. Um momento, não dois.
- **[P2] Layout shift medido: CLS 0,072, e o piso é zero.** Causas no
  relatório do Lighthouse: `logo.png` sem `width`/`height` (nav e rodapé) e a
  troca de fonte de Inter e Fraunces. Cura de zero bytes: atributos de tamanho
  nos dois `<img>`; `@font-face` de fallback métrico para as três famílias
  (`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`
  sobre `local()` de Arial / Georgia / Courier New), com os valores MEDIDOS por
  um script Playwright que compara a largura do mesmo parágrafo nas duas
  faces — não copiados de tabela. Auto-hospedar as fontes fica fora: ~200 KB
  estourariam o teto de 300 KB da S3.
- **[P2] "Recursos" é a seção genérica.** Quatro cards iguais, rótulo + título
  + texto. Cura no refinamento: os mesmos quatro itens viram uma lista de duas
  colunas com filete (o mesmo tratamento das três colunas de "Como funciona"),
  sem caixa branca — conteúdo intacto, contêiner some.
- **[P2] O hero tem a forma do hero genérico de SaaS de IA** (evidência B):
  rótulo mono maiúsculo acima do H1. Cura: o rótulo sai do topo; a linha mono
  abaixo dos CTAs ("feito em Brasília · integrado ao Google Agenda") fica como
  a única marca mono do hero.
- **[P3] Miudezas que somam:** 13 travessões no corpo (evidência B); `✓` como
  glifo-ícone em `.plan-item::before` (vira SVG por `mask-image` no mesmo
  pseudo-elemento); `::selection` e `caret-color` sem tema (0 ocorrências no
  CSS-fonte); nenhum `:active` em `.btn`; CTA final "Chamar no WhatsApp"
  destoando dos "Falar no WhatsApp"; título do card do plano é `div`, não
  `h3`; abas de 36 px de altura; links do rodapé com 21 px de alvo; "online"
  a 10,5 px.

### Red flags por persona

**Dona de clínica, no celular, durante o expediente.** Abre, vê texto (o
celular-demo está fora da dobra). Quer saber quanto custa: o nav não tem
"Planos"; rola ~6 telas; o preço está a 11,5 px em mono, abaixo do título do
card. Corpo dos cards a 14,5 px no meio do expediente. O que a segura:
"Testar no seu WhatsApp" abre o WhatsApp com a mensagem pronta — zero
fricção — e a seção "Pra quem é" tem a aba "Clínicas" ativa por padrão, com a
pergunta de convênio/particular que é a dela.

**Recebeu o link no WhatsApp, tem 20 segundos.** Antes do clique, a prévia do
link é só o ícone do avião (`og-image.png` 630×630) — nada do produto. Depois
do clique, em 4G, três famílias de fonte externas com `display=swap` (o H1
troca de face e o layout pula — CLS medido), e a primeira tela sem o celular.
Rolando rápido, cada seção entra com fade de 0,6 s. Se o JS falhar
(bloqueador, rede corporativa), vê o hero e mais nada.

### Proibições concretas × site atual (cada uma declarada, com o sítio)

| Anti-padrão | Estado | Sítio / decisão |
|---|---|---|
| Cards iguais ícone+título+texto como estrutura | **presente** | `#recursos` (4 × `.bg-white.border.border-line.rounded-card`) — sai no refinamento |
| Número grande + rótulo pequeno | cumprido | não há métricas |
| Kicker/eyebrow acima de título | **presente** | `.eyebrow` ×3 (hero, segmentos, planos); `.tag` ×7 (4 cards + 3 painéis). **Hero: sai** (evidência B). **Seção: fica, exceção declarada** — o `brand-riacho-tech.md` chama o rótulo mono de "assinatura visual mais distinta da marca"; um por seção, nomeando a seção. `.tag` de painel sai (repete a aba); `.tag` de card vira rótulo de linha na lista |
| Seções numeradas 01/02/03 | **presente, justificado** | `#como-funciona`: sequência real (chama → confere → confirma) com a hora da conversa — o craft floor permite quando a sequência informa. Fica |
| Texto em gradiente | cumprido | 0 gradientes medidos |
| Vidro/blur decorativo | **presente, funcional** | `nav.backdrop-blur-[10px]` sobre `bg-paper/85`. Funcional (legibilidade sobre conteúdo rolado), mas `bg-paper` sólido resolve o mesmo com menos — sai (simples > elaborado) |
| Borda lateral > 1 px em card | cumprido | — |
| Sombra dura sem contexto | cumprido | `.phone` 0 30px 60px −20px; `.btn-primary` 0 1px 0 |
| Emoji/glifo como ícone | **presente** | `.plan-item::before` `"✓"`. (O 👍 no roteiro do hero é conteúdo de chat, fica) |
| Mono como fantasia de "técnico" | **parcial** | 32 elementos em mono por página. Rótulo e dado (hora, tag de linha) são marca; as três ABAS são controle em mono maiúsculo 11,5 px — saem do mono; o preço é display |
| Máscara geométrica em foto | cumprido | não há fotos |
| Ghost card (borda + sombra suave) | parcial | card do plano: `border-signal` + `bg-signal/15` (borda + tinta, sem sombra). Resolve-se no redesenho da seção (T2) |
| Gradientes repetidos de fundo | cumprido | — |
| Cinza puro / texto cinza sobre colorido | cumprido | `muted #5C6B72` tem matiz; sobre navy só `mist`/`sky`/`sky-2` da paleta |
| Gradiente roxo-azul | cumprido | — |
| Bounce/elastic | cumprido | `ease` em tudo |

### O chão × site atual

| Regra | Estado | Medida |
|---|---|---|
| Contraste ≥ 4,5:1 texto / ≥ 3:1 grande e controles | cumprido | 0 reprovações em 390/820/1280; par mais apertado `muted`/`paper-2` 4,64:1 — **não escurecer `paper-2` nem clarear `muted`** |
| Corpo ≥ 1rem | **falha** | 17 `<p>/<li>` abaixo de 16 px |
| Medida 45–75ch | limite | 1280: colunas de "Como funciona" a 44ch. Em 390 tudo fica em 35–43ch pela largura — a regra vale de 820 para cima |
| Display ≤ 6rem | cumprido | máx. 56 px |
| Tracking ≥ −0,04em | cumprido | −0,01em nos títulos |
| Entrelinha cresce com a medida | **falha** | H2/H3 a 1,60 (herdado do corpo); H1 a 1,06 |
| Espaçamento por escala documentada | **sem escala declarada** | `py-21`, `px-6.5`, `py-[26px]`, `mb-[22px]` — o `DESIGN.md` declara a escala e a regra para valor arbitrário |
| UM momento de movimento | **falha** | hero digitando (autoral) + `.reveal` ×15 |
| Nunca animar imagem no hover | cumprido | — |
| Estados default/hover/focus/active/disabled | parcial | hover e focus sim; `:active` ausente; disabled não existe (não há formulário) |
| Foco visível | cumprido | `:focus-visible` 2,5 px `signal-dark`, offset 3 |
| Alvo ≥ 44×44 | **falha** | 390: 10 de 18 alvos abaixo (abas 36 px; rodapé 21 px; logo 34 px) |
| Sem rolagem horizontal em 390 | cumprido | `scrollWidth` 390 |
| Sem layout shift; imagem com proporção declarada | **falha** | CLS 0,072; `logo.png` sem `width`/`height` |
| Cor não é o único código | cumprido | aba: fundo + `aria-selected`; plano: ícone + texto |
| Seleção, cursor e anel ao tema | parcial | anel sim; `::selection`/`caret-color` não |
| Controles nomeiam a ação; erros nomeiam o problema e a saída | **falha no erro** | 404 cru do Nginx |

## Escopo — os três tamanhos, e o escolhido

Custo em horas é **chute declarado**, inclui o pipeline de encerramento e as
capturas. "Refinamento preserva, redesenho substitui" — sem meio-termo.

- **T1 — Refinar (preserva o S3):** tudo o que a crítica achou que não muda a
  composição das seções. ~6–8 h, uma sessão. O que NÃO muda: composição, o
  celular, as cores, o texto da oferta.
- **T2 — T1 + redesenhar UMA seção-assinatura, "Planos", + prévia do link.**
  ~11–14 h, duas sessões. T1 vai primeiro em commits próprios; se o tempo
  apertar antes da call, o corte entre T1 e T2 é limpo.
- **T3 — Redesenhar a página** (a conversa como fio único; ~25–35 h, uma
  semana). Não recomendado: o que separa o site atual de um site bom é
  hierarquia e piso tipográfico, não composição.

### Escolhido: T2

**T1 (primeira sessão de implementação):**
1. Hero: rótulo mono do topo sai; abaixo de 900 px a ordem vira H1 → celular
   (tela reduzida para caber na dobra de 844 px) → lead → CTAs → linha mono.
2. Nav: `bg-paper` sólido, sem blur; abaixo de 760 px logo-ícone (caixa de
   ~40 px com `overflow: hidden` sobre o mesmo `logo.png`) + link "Planos" +
   CTA; `logo.png` com `width`/`height` nos dois `<img>`.
3. Tipo: corpo ≥ 16 px em toda `<p>/<li>`; `h2` 1,15 e `h3` 1,25 de
   entrelinha no `@layer base`; `.tag` 12,5 px; "online" 11 px; fallback
   métrico das três famílias (valores medidos, ver "Verificação").
4. `.reveal` removido de CSS, HTML e JS.
5. "Recursos": mesmos quatro itens, lista de duas colunas com filete, sem card;
   `.tag` como rótulo de linha.
6. "Pra quem é": abas viram `.tab` (Inter 500 15 px, `min-height: 44px`,
   estados default/hover/focus/active/`aria-selected`); `.tag` dos painéis sai.
7. "Planos" (o mínimo, porque T2 refaz a seção): preço em display; `h3` no
   título do card; `✓` → `mask-image` SVG.
8. CTA final "Falar no WhatsApp"; rodapé com links de 44 px de alvo (padding,
   visual igual); `:active` em `.btn`; `::selection` e `caret-color`.
9. Travessões: passar o corpo trocando por ponto/vírgula onde não é aparte;
   o texto da oferta não muda.
10. `404.html` da marca; `error_page 404 /404.html;` escrito em
    `nginx/riachotech.conf`.
11. Skill, `DESIGN.md`, nota no `s3-redesign.md`, `.gitignore`,
    `build/medir-site.js` + `npm run medir`.

**T2 (segunda sessão), em commits separados:**
12. Seção "Planos" nova: o preço como a segunda assinatura da página. Conteúdo
    que o `negocio.md` já tem e o site não usa, literal: **quando cada coisa é
    cobrada** (1ª parcela no início da implantação · 2ª no lançamento ·
    primeira mensalidade 30 dias depois — "a mensalidade só começa quando ela
    estiver trabalhando pra você"); o enquadramento contra o "digite 1" em uma
    frase, sem citar concorrente; o combo com o site (R$1.500) como segunda
    coluna do mesmo desenho; o que a implantação inclui (lista da seção
    "Preço" do `negocio.md`). Nenhuma promessa nova sobre o que a assistente
    faz.
13. Prévia do link: `og-image.png` 1200×630 gerada do próprio hero por
    Playwright (celular + H1) e otimizada por `sharp`; `twitter:card` vira
    `summary_large_image`.

## Entregáveis e arquivos tocados (`~/riachotech-site`)

| Arquivo | O que muda |
|---|---|
| `.claude/skills/design-site/SKILL.md` | **novo** — Apêndice A, copiado na íntegra |
| `DESIGN.md` | **novo** — Apêndice B; a tabela de tokens é COPIADA do bloco `@theme` de `build/tailwind-input.css` na hora do commit, nunca redigitada; **não escreve número que descreve o código — escreve o critério e o comando que conta** |
| `docs/s3-redesign.md` | uma nota no topo: tokens, tipografia, interações e proibições passam a viver em `DESIGN.md`; este arquivo é o registro da fatia de 30/08 |
| `docs/plans/2026-09-renovacao.md` | este plano |
| `.gitignore` | `+ .claude/agent-memory/` (memória do agente nunca entra; a skill entra) |
| `build/medir-site.js` | **novo** — o script de medição desta sessão; `package.json` ganha `playwright@1.62.1` em `devDependencies` e o script `"medir": "node build/medir-site.js"` (URL por `SITE_URL`) |
| `build/tailwind-input.css` | `@layer base`: `h2`/`h3` line-height, `::selection`, `caret-color`, `@font-face` de fallback métrico; `@layer components`: `.btn:active`, `.tab`, `.plan-item::before` com `mask-image`, `.reveal` removido |
| `index.html` | itens 1–10 de T1; 12–13 de T2 |
| `site.js` | bloco do `IntersectionObserver` removido; nada mais muda |
| `site.css` | recompilado (`npm run build:css`) e commitado junto de cada mudança de CSS |
| `404.html` | **novo** — mesma nav/rodapé, "Essa página não existe" + link para a home e para o WhatsApp |
| `nginx/riachotech.conf` | `error_page 404 /404.html;` — escrito aqui; a linha na VPS é `sudo`, preparada pela guia e aplicada pelo fundador no deploy |
| `og-image.png` | (T2) regenerado 1200×630 |
| `README.md` | entrada datada da renovação (o repositório não tem `LOG.md`) |

Texto da oferta e preços: só o que já está no `negocio.md`, seções "Catálogo"
e "Preço"; nenhuma frase nova sobre o que a assistente faz.

## Passo 2 — Auditoria (no que for tocado), após construir inteiro

Cinco dimensões, 0–4 cada, com a medida ao lado:
- **Acessibilidade**: Lighthouse mobile = 100 (era 100; não pode cair);
  `npm run medir` sem reprovação de contraste; ordem de tabulação; `h1→h2→h3`.
- **Performance**: Lighthouse mobile ≥ 98 (era 98); **CLS ≤ 0,01 (era 0,072)**;
  `unsized-images` limpo; nenhum layout shift na troca de aba (o `min-h` já
  existe — conferir que sobrevive ao `.tab`).
- **Responsividade**: `scrollWidth == innerWidth` em 390; zero alvo < 44×44
  nos três tamanhos (exceção declarada: link inline dentro de parágrafo).
- **Tema**: zero hex fora do `@theme` — `grep -nE '#[0-9a-fA-F]{3,6}\b' build/tailwind-input.css index.html 404.html`
  só encontra o bloco `@theme` e o `theme-color` do `<head>`.
- **Integridade**: nenhum utilitário solto contradizendo token —
  `grep -n 'text-\[#\|bg-\[#\|\[rgba' index.html 404.html` vazio; os dois
  prováveis falsos positivos de B (`text-overflow`, `nested-cards`) confirmados
  por seletor, ou corrigidos se não forem falsos.

## Passo 3 — Acabamento, antes de chamar o fundador

Estados de todo controle (default/hover/focus/active — capturados);
alinhamento óptico (o nudge do logo já existe e é documentado — manter);
texto longo e curto (o nome mais longo das abas, "Salões & barbearias", em
390); console sem erro; **captura final nos três tamanhos** em
`~/para-revisao/site-critica-final-*.png`, lida antes de chamar o fundador.

**Fluxo:** construir tudo → UMA inspeção em lote (390 + 1280, capturas +
`npm run medir` + Lighthouse) → UM lote de correções → confirmar → parar. Sem
laço aberto de QA. Teto de três correções seguidas vale aqui como em todo lugar.

## Verificação (ponta a ponta)

1. `npm run build:css && git status --short` — `site.css` muda junto do CSS-fonte.
2. Servidor local na pasta (`python3 -m http.server 8080`), `SITE_URL=http://localhost:8080/ npm run medir`:
   zero reprovação de contraste, zero alvo < 44, `scrollWidth` 390, console
   0/0/0/0, `grep -o '\breveal\b' index.html | wc -l` → 0. **Antes de aceitar
   o zero, quebrar de propósito** (um `text-muted` sobre `bg-ink`) e ver o
   script acusar.
3. Fallback métrico: script Playwright renderiza o mesmo parágrafo em
   "Inter" e no fallback e imprime a razão de larguras; `size-adjust` é essa
   razão; depois, Lighthouse com `CLS ≤ 0,01`.
4. Lighthouse mobile (`npx lighthouse`, mesmo comando da linha de base):
   acessibilidade 100, performance ≥ 98, `unsized-images` limpo.
5. Capturas 390/820/1280 lidas; a de `390-dobra` prova o celular dentro da
   primeira tela.
6. `404.html` renderiza localmente; na VPS, `curl -s -o /dev/null -w '%{http_code}' https://riachotech.com.br/nao-existe`
   só vira prova depois de o fundador aplicar a regra.
7. Texto da oferta: conferir frase a frase contra `negocio.md`, seções
   "Preço" e "Catálogo" — leitura, não `diff`.

## Encerramento e marcos

Commits pequenos (um por item da lista; `site.css` sempre junto do
CSS-fonte), mensagem dizendo o quê e por quê; `git add` explícito, arquivo por
arquivo (`.claude/agent-memory/` nunca). Pipeline de encerramento: `revisor` →
`conferidor-de-citacoes` (recebe este plano e o `DESIGN.md`, com `base..head`)
→ `/code-review` → `scp` para o Codex. `prova-negativa` não se aplica (não é
correção de bug com teste). Entrada datada no `README.md`; push; marcos à guia
`sofia-bot-b6` por mensagem: plano aprovado (com o `git -C ~/sofia-bot status
--porcelain` vazio), implementação pronta com capturas nos três tamanhos,
pronto para deploy. Deploy é `git pull` na VPS, pela guia; a linha do Nginx é
do fundador.

## Fora de escopo e handoffs

- `/conectar` e o conteúdo de `privacidade.html` — não tocados (o
  `privacidade.html` recebe só o mesmo `<link>` de fonte, se ele mudar).
- Fontes auto-hospedadas — fora: o fallback métrico resolve o CLS com zero
  bytes; auto-hospedar estouraria o teto de 300 KB.
- Nginx na VPS (fundador/guia): `error_page 404`; `gzip on` para css/js
  (Lighthouse: 18 KiB sem compressão); `expires` para os estáticos.
- `brand-riacho-tech.md` cita o eyebrow do hero como exemplo da assinatura
  mono; o site passa a não tê-lo. Nota para a guia registrar; o doc não muda
  nesta fatia.
- Nenhum achado sobre o `sofia-bot` ou o painel; `fila.md` não recebe item.

---

## Apêndice A — `.claude/skills/design-site/SKILL.md` (texto integral)

```markdown
---
name: design-site
description: Crítica, auditoria e acabamento de qualquer tela do site da Riacho Tech (riachotech.com.br). Use antes de propor mudança visual, ao construir uma seção nova e antes de chamar o fundador para ver o resultado. Adaptado do "impeccable" (pbakaus) aos tokens e à voz da marca — não instalado.
---

# design-site

O site é estático, Tailwind 4 compilado e commitado (`npm run build:css`),
servido por `git pull` na VPS. Fontes de verdade, nesta ordem, e nenhuma se
reescreve por esta skill: **texto** → `~/sofia-bot/docs/contexto/negocio.md`
(oferta, preço, o que a assistente faz — verificado no código); **visual** →
`~/sofia-bot/docs/brand-riacho-tech.md` (tokens do kit do Canva) espelhado em
`DESIGN.md` (raiz) e em `build/tailwind-input.css` (o `@theme` é a fonte
executável). Se `DESIGN.md` e o CSS discordarem, o CSS está certo e o
`DESIGN.md` se corrige no mesmo commit.

## Fluxo — o que esta skill acerta e a casa já pratica

Construir INTEIRO → inspecionar UMA vez em lote (390 e 1280, capturas +
`npm run medir` + Lighthouse) → corrigir em UM lote → confirmar → parar. Nada
de laço aberto de QA. A terceira correção seguida que revela problema novo em
outro lugar diz que o desenho está errado: parar e redesenhar.

Refinamento preserva o mundo visual, o conteúdo e o que está fora do escopo;
redesenho substitui. Nunca meio-termo, e nunca redesenho disfarçado de
refinamento — se o conceito estiver errado, dizer isso e propor redesenho.

## Medir, não estimar

`npm run medir` (`build/medir-site.js`, Playwright) contra a URL em `SITE_URL`
(padrão: produção). Ele captura 390/820/1280 e mede contraste por par
cor/fundo composto (inclusive `oklab(... / α)` do Tailwind 4), tamanho,
entrelinha, tracking, medida em `ch`, alvos, overflow, `backdrop-filter`,
gradientes, pseudo-elementos com `content`, fontes carregadas e console.
Lighthouse mobile: `npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=<arquivo>`
com `CHROME_PATH` apontando para o Chromium do Playwright.
Toda afirmação sobre a tela nesta skill se apoia numa linha desses relatórios
ou numa captura — "parece bom" não é evidência. Verificação que passa
observando NADA (zero reprovações, console vazio) é vista falhar de propósito
antes de ser aceita: quebre um contraste e veja o script acusar.

O detector do impeccable (`npx impeccable detect --json <url>`, com
`IMPECCABLE_BROWSER` apontando para o Chromium do Playwright) só roda com o
fundador dizendo sim na janela — baixa binário para `~/.impeccable/bin/`. Ele
é evidência B, lida DEPOIS da leitura A fechada; onde discordam, a divergência
é o achado. Falsos positivos conhecidos dele aqui: `text-overflow` na
transcrição `sr-only`, `nested-cards` no frame do celular, `overused-font`
(Inter é decisão de marca) — cada um confirmado por seletor antes de descartar.

## O chão — toda tela cumpre, sem exceção além das nomeadas

- Contraste: texto ≥ 4,5:1; texto grande (≥ 24 px, ou ≥ 18,66 px em bold) e
  controles ≥ 3:1. Sobre superfície colorida, texto secundário sai da própria
  paleta (`mist`, `sky`, `sky-2`), nunca cinza. O par mais apertado do site é
  `muted` sobre `paper-2` (4,64:1): não escurecer `paper-2`, não clarear `muted`.
- Tipo: corpo ≥ 1rem (`<p>`, `<li>`); texto funcional ≥ 11 px; display ≤ 6rem;
  tracking nunca abaixo de −0,04em; medida de corpo 45–75ch **de 820 px para
  cima** (em 390 a largura decide, e 35–43ch é o esperado); entrelinha de
  display (`h1`–`h3`) entre 1,05 e 1,25 — nunca a do corpo; a do corpo cresce
  com a medida. Exceção declarada: a hora dentro da bolha do mock
  (`.bubble-tick`, 9,5 px) é decoração `aria-hidden`, com transcrição
  `sr-only` ao lado. Fonte externa carrega com fallback métrico
  (`size-adjust`/`ascent-override`/`descent-override`/`line-gap-override`
  medidos, não copiados) — a troca de face não move o layout.
- Espaço: a escala é a do Tailwind (múltiplos de 0,25rem). Valor arbitrário
  (`[26px]`, `6.5`) só para nudge óptico, e com comentário dizendo o que
  compensa (modelo: o `translate-y` do logo no nav). Grupos apertados,
  separação generosa, mais espaço acima de um título do que abaixo.
- Movimento: UM momento autoral por página — aqui é o celular digitando no hero.
  Troca de aba, hover e `:active` são resposta a interação, não movimento
  autoral. Nunca uma entrada idêntica em toda seção; nunca animar imagem no
  hover; nunca bounce/elastic; `prefers-reduced-motion` com alternativa que
  preserva a informação (o mock renderiza a conversa inteira de uma vez).
- Controles: estados default/hover/focus/active (disabled/loading/error quando
  existirem — hoje não há formulário); foco de teclado visível
  (`:focus-visible` do `@layer base`); alvo ≥ 44×44 (exceção declarada: link
  inline dentro de parágrafo); cor nunca é o único código (aba ativa = fundo +
  `aria-selected`; item de lista = ícone + texto). Controle é Inter, nunca mono.
- Superfícies do navegador: `::selection`, `caret-color` e anel de foco vêm da
  paleta. Sem rolagem horizontal em 390 (`scrollWidth == innerWidth`). Imagem
  com `width`/`height`; CLS ≤ 0,01.
- Texto: controles nomeiam a ação ("Falar no WhatsApp", não "Clique aqui");
  erros nomeiam o problema e a saída (o `404.html` diz que a página não existe
  e para onde ir). O texto da oferta é o do `negocio.md`, literal; nada de
  "revolucionar", "transformar", "potencializar"; travessão só para aparte
  real (`grep -o '&mdash;\|—' index.html | wc -l` é o termômetro, não a regra).

## Proibições — o que faz um site parecer gerado

Recusar por padrão; a exceção existe só se estiver nomeada aqui ou em `DESIGN.md`:
- Cards do mesmo tamanho com ícone + título + texto como estrutura de página;
  card dentro de card (o celular — `.phone` › `.phone-screen` — é um aparelho,
  não card).
- "Número grande + rótulo pequeno" como template de métrica.
- Kicker/eyebrow acima de título — e acima do H1 do hero é PROIBIDO sem
  exceção: é o hero padrão de SaaS de IA. **Exceção da marca:** o rótulo mono
  de SEÇÃO (`.eyebrow`: ponto + IBM Plex Mono maiúsculo) nomeando a seção, um
  por seção. Rótulo acima de título de card ou de painel que repete o que o
  título ou a aba já dizem: sai.
- Seções numeradas 01/02/03. **Exceção:** "Como funciona", porque a sequência
  carrega informação (chama → confere → confirma, com a hora da conversa).
- Texto em gradiente; gradiente como fundo; gradiente roxo-azul.
- Vidro/blur decorativo (o nav é `paper` sólido).
- Borda lateral acima de 1 px em card, item de lista ou aviso.
- Sombra dura sem contexto (`4px 4px 0`). Sombra tem offset e blur (`.phone`).
- Emoji ou glifo Unicode como ícone — ícone é SVG desenhado (o `✓` do plano é
  `mask-image` SVG). Emoji dentro do roteiro de chat é conteúdo, não ícone.
- Monoespaçada como fantasia de "técnico". Aqui o mono é RÓTULO (eyebrow de
  seção, tag de linha, "feito em Brasília") e DADO curto (hora da mensagem).
  Controle (botão, aba, link) é Inter. Preço é display, porque é a informação
  principal da seção dele.
- Máscara geométrica em foto; "ghost card" (borda + sombra suave); cinza puro
  sem matiz; texto cinza sobre fundo colorido.
- Animação bounce/elastic; entrada idêntica em toda seção.

## Crítica (antes de propor mudança)

1. Capturas em 390/820/1280 do site NO AR (`npm run medir`), lidas.
2. Veredito de especificidade, seção por seção: "isto é da Riacho ou trocável
   por qualquer SaaS?" — nomear o que é cada coisa.
3. As 10 heurísticas de Nielsen, 0–4, com o achado ao lado; `n/a` com motivo
   quando não se aplicar (sem formulário, "Prevenção de erro" é n/a) e o total
   sobre o máximo aplicável.
4. 2–3 pontos fortes específicos (o quê e por quê funciona).
5. 3–5 problemas priorizados P0–P3. Teste: "um usuário abriria chamado por
   isso? então é pelo menos P1". P0 bloqueia a tarefa; P1 dificulta muito ou
   viola WCAG AA; P2 incomoda e tem contorno; P3 é polimento.
6. Red flags para duas personas: **a dona de clínica que abre no celular
   durante o expediente** (quer saber o que faz e quanto custa, em três
   toques) e **quem recebeu o link no WhatsApp e tem 20 segundos** (prévia do
   link, primeira tela, velocidade percebida). Nomear o elemento que falha,
   não descrever a persona.
7. Terminar com a proposta de escopo em três tamanhos — refinar, redesenhar
   uma seção-assinatura, redesenhar a página — com custo em horas (chute
   declarado) e o que muda em cada um. O fundador escolhe.
Sem suavizar. Sem a evidência B, o relato diz que a crítica é só a leitura A.

## Auditoria (no que for tocado)

Cinco dimensões, 0–4, cada nota com a medida ao lado: acessibilidade
(Lighthouse mobile — não pode cair do 100; `medir` sem reprovação; ordem de
tabulação; hierarquia `h1→h2→h3`); performance (Lighthouse ≥ 98; CLS ≤ 0,01;
imagem com proporção declarada); responsividade (390/820/1280; alvos; overflow);
tema (zero hex fora do `@theme` — `grep -nE '#[0-9a-fA-F]{3,6}\b'` só acha o
bloco `@theme` e o `theme-color`); integridade (nenhum utilitário solto que
contradiga token: `grep -n 'text-\[#\|bg-\[#\|\[rgba' index.html` vazio).

## Acabamento (antes de chamar o fundador)

Estados de todo controle capturados; alinhamento óptico, não só matemático;
texto longo e curto (o nome mais longo das abas, em 390); console sem erro;
`npm run build:css` rodado e `site.css` commitado junto; captura final nos
três tamanhos em `~/para-revisao/site-critica-final-*.png` — lida ANTES de
chamar o fundador (regra do `AGENTS.md`: fatia de front-end confere em
screenshot, sempre).

## Regras que não mudam

Texto da oferta e preço vêm do `negocio.md`. Nada de telefone de cliente, nome
de cliente ou captura de conversa real. `site.css` compilado é commitado; a
VPS não tem build. Achado sobre o `sofia-bot` ou o painel vira item da
`fila.md` do `sofia-bot`, não trabalho daqui. Deploy é `git pull` na VPS,
pela guia; linha de Nginx é do fundador. `/conectar` não se edita sem revisão.
```

## Apêndice B — `DESIGN.md` (estrutura e conteúdo; tokens copiados na hora)

```markdown
# DESIGN.md — Riacho Tech, site institucional

A fonte executável dos tokens é `build/tailwind-input.css` (bloco `@theme`);
este arquivo os espelha textualmente e é atualizado NO MESMO COMMIT que os
altera. Os hex vêm de `~/sofia-bot/docs/brand-riacho-tech.md` (kit do Canva,
lidos em 30/08/2026). Regras de uso: `.claude/skills/design-site/SKILL.md`.
Registro da fatia que criou este sistema: `docs/s3-redesign.md`.
Este arquivo não escreve número que descreve o código (quantos elementos,
quantos usos): escreve o critério, e o comando que conta.

## Tokens
[bloco `@theme` copiado de build/tailwind-input.css, com os comentários]

## Papéis de cor
- Fundo de página `paper`; seção alternada `paper-2`; superfície quente `sand` (tela do celular).
- Texto principal `ink`; secundário `muted` (4,64:1 sobre `paper-2` — o par mais apertado).
- Ação primária `signal`, hover `signal-dark`; ênfase itálica `signal-dark`.
- Sobre `ink` (navy): título branco; eyebrow `sky`; nota mono `sky-2`; corpo `mist`; item de lista `mist-2`; status "online" `mint`.
- Rótulo mono em linha: `clay`. Linha divisória: `line`.

## Tipografia — papéis
| papel | face | tamanho | entrelinha |
|---|---|---|---|
| display-1 (H1) | Fraunces 600, ital nas ênfases | clamp(34px, 5.4vw, 56px) | 1,06 |
| display-2 (H2) | Fraunces 600 | clamp(26px, 3.4vw, 36px) | 1,15 |
| display-3 (H3) | Fraunces 600 | 19px | 1,25 |
| preço | Fraunces 600 | ≥ 28px | 1,1 |
| lead | Inter 400 | 18px | 1,55 |
| corpo | Inter 400 | 16px (piso) | 1,6 |
| controle | Inter 500/600 | 14,5–16px | — |
| mono (eyebrow de seção, tag de linha, hora) | IBM Plex Mono 500, caixa alta, .14em | 12,5px | — |
Google Fonts com o `<link>` único (mesmo em `privacidade.html` e `404.html`),
com `@font-face` de fallback métrico por família (valores medidos, comando em
`build/`).

## Espaço
Escala do Tailwind (0,25rem). Valor arbitrário só para nudge óptico, comentado.
`.wrap` 1160px / 28px de gutter. Mais espaço acima de um título do que abaixo.

## Componentes (em `@layer components`)
`.wrap`, `.eyebrow` (+ `.eyebrow-dot`; só como nome de seção), `.btn`
(`-primary`, `-ghost`; estados default/hover/focus/active), `.tab`, `.tag`,
`.phone` (+ `-screen`, `-bar`, `-body`), `.bubble` (`-in`, `-out`, `-tick`),
`.typing-bubble`, `.plan-item`, `.fnote`.

## Movimento — o orçamento inteiro
- O celular do hero digitando sozinho — o único momento autoral.
- Troca de aba em "Pra quem é" (re-render das bolhas).
- Hover e active em botão e aba.
`prefers-reduced-motion` respeitado nos três. Nada mais — e o critério que se
verifica sozinho: `grep -c 'animation\|transition' build/tailwind-input.css`
só encontra os seletores listados acima.

## O que não se faz aqui
[a lista de "Proibições" da skill, com as duas exceções da marca nomeadas:
eyebrow de seção e 01/02/03 em "Como funciona"; mais as do brand doc: nada de
paleta genérica de "app de IA", nada de cor viva/infantil]
```

---

## O que mudou entre o plano e a entrega (07/09/2026, sessão Opus)

O plano acima é o texto aprovado, e fica como está. Sete decisões da
implementação divergiram dele; estão aqui para o revisor medir contra o que a
fatia REALMENTE entrega, não contra a intenção.

1. **`caret-color` não entrou.** A página não tem `<input>`, `<textarea>` nem
   `contenteditable`, então a regra nunca renderizaria: seria CSS morto que
   passa numa checklist sem ser exercido. O `::selection`, que se aplica,
   entrou. A skill declara a condição que traz o `caret-color` de volta, e ela
   se verifica sozinha por `grep`.
2. **O fallback métrico de fonte foi tentado e revertido.** `local("Georgia")`
   não existe no Linux, então o `@font-face` não casava nada aqui; e o override
   certo muda por plataforma (Android usa Noto, não Georgia). Medido nesta
   máquina: CLS 0,020 → 0,019. **O alvo de CLS ≤ 0,01 do plano não foi
   atingido; o resultado é 0,015–0,020** em três execuções (a variação é o
   instante em que a fonte chega), contra 0,072 da linha de base, e a queda
   toda veio de `width`/`height` nas duas `<img>` da marca. O resto é a troca
   de fonte no H1, e fica declarado como limite conhecido.
3. **O componente `.tag` morreu inteiro**, em vez de virar rótulo de linha na
   lista de "Recursos". Os quatro rótulos ("AGENDAMENTO", "CATÁLOGO",
   "PAGAMENTO", "LEMBRETES") não diziam nada que o título ao lado já não
   dissesse, e mantê-los deixava a lista com a mesma forma de kicker+título que
   a fatia estava removendo do hero.
4. **Dois tokens sem consumidor saíram do `@theme`**: `--color-clay`, que só
   servia ao `.tag`, e `--radius-card`, que só servia aos cards de "Recursos".
   Não estava no plano; entrou porque token morto com comentário que descreve
   um componente inexistente é exatamente a citação durável que envelhece em
   silêncio. O `DESIGN.md` registra a baixa e o comando que a confere.
5. **A marca no celular é o `favicon.png`, não um recorte do `logo.png`.** O
   plano previa uma caixa com `overflow: hidden` sobre o horizontal; o favicon
   é o ícone oficial da marca, já está no cache do navegador (é o ícone da
   aba), e não depende de adivinhar onde o avião termina dentro do PNG.
6. **A oferta do site ("Só o site também dá") foi para a coluna direita de
   "Planos"**, abaixo do calendário de cobrança, em vez de ficar como bloco
   centralizado abaixo do grid. Com só a linha do tempo à direita sobravam
   ~480px de navy vazio ao lado da lista de sete itens, e aquele bloco era o
   único texto centralizado de uma página alinhada à esquerda.
7. **O detector do impeccable rodou uma segunda vez**, contra a cópia local,
   para comparar com a linha de base. Não houve instalação nova (o binário já
   estava em `~/.impeccable/bin/` da primeira execução, autorizada pelo
   fundador) e a execução é de leitura. Resultado: `all-caps-body`,
   `em-dash-overuse`, `hero-eyebrow-chip`, `tiny-text` e `undersized-ui-text`
   zerados; o que resta é exceção declarada (eyebrow de seção ×2, 01/02/03 ×3,
   Inter como corpo) ou falso positivo confirmado por medição — os 12
   `text-overflow` são todos `<p>` dentro de `.sr-only`, cuja caixa tem 1px por
   definição, e o `nested-cards` é `.phone` › `.phone-screen`, que é o único
   par de superfícies arredondadas aninhadas que sobrou na página.

### Adendo de revisão da guia (07/09/2026)

A guia leu a branch em `~/rev-site` na VPS e decidiu, pela regra do
`AGENTS.md`, que ela **não vai ao Codex nem ao `revisor`/`/code-review`**: não
toca `conectar/`, não toca input externo nem dado de cliente, e o `site.js` só
perde o bloco do `.reveal`. O filtro que roda é o `conferidor-de-citacoes`
sobre este plano, o `DESIGN.md` e a skill. Três ajustes vieram dela:

- **O emoji saiu do roteiro do hero.** Sem fonte de emoji instalada (Linux de
  mesa, e o Chromium que tira as capturas) ele vira quadrado vazio, na
  primeira tela e dentro do elemento-assinatura. A transcrição `sr-only` nunca
  o teve, então agora as duas dizem exatamente a mesma frase — que é o ponto
  de existir transcrição.
- **`nginx/riachotech.conf` passou a espelhar o deploy inteiro**: `gzip_types`
  (o `gzip on` é global mas `gzip_types` está comentado no `nginx.conf`, e é
  por isso que css e js iam sem compressão), `gzip_vary`, e `expires` com TTL
  curto e `must-revalidate` em css/js — curto DE PROPÓSITO, porque `index.html`
  referencia `site.css` e `site.js` sem versão na URL e cache longo entregaria
  folha velha depois de um `git pull`. Aplicar na VPS é do fundador, com `sudo`.
- **Travessões: o achado não se confirmou, e fica registrado por quê.** A guia
  citou 13 (o número do detector ANTES desta fatia) e um `grep -c "—"` de 17
  que mistura categorias. Medido depois: `em-dash-overuse` do detector = 0. A
  classificação se rederiva por
  `grep -n '—\|&mdash;' index.html`, e dá: 7 em `<title>`/meta (separador de
  nome), 5 em comentário de código (não renderizado), 3 nos rótulos 01/02/03
  (parte da exceção já declarada), 2 na transcrição de chat (fala da Sofia,
  não se reescreve) e **3 em prosa de corpo**. Os três são aparte de verdade —
  o lead do hero, a citação de "tem horário amanhã de tarde?" e o H2 de
  segmentos — e a regra da skill é "travessão só para aparte de verdade", não
  "nenhum travessão". Ficam.

### `privacidade.html` entra no escopo (07/09/2026)

O fundador liberou a página na janela ("pode mexer sim, deixar aquilo ali
bonito"). Ela estava declarada fora de escopo neste plano; o registro da
mudança fica aqui para o plano não prometer diferente do que a fatia entrega.

Ela carregava um sistema de design inteiro num `<style>` inline — `:root`
próprio com os mesmos hex, `.wrap`, `.btn`, `.eyebrow` e anel de foco
duplicados —, e por isso ficou para trás quando o sistema evoluiu: dentro dele
ainda viviam `--teal` e `--clay`, mortos no `@theme`, e um creme fora da
paleta. Agora consome o mesmo `site.css`.

Medido antes e depois, nos três tamanhos: corpo abaixo de 16px **52 → 0**;
alvo abaixo de 44×44 **18 de 19 → 3 de 19** (os três são link inline dentro de
parágrafo, a exceção declarada); Lighthouse a11y **95 → 100**, sem auditoria
reprovada. O que fechou os últimos 5 pontos foi `link-in-text-block`: os links
do corpo se distinguiam só pela cor.

**A invariante que a guia pediu está provada, não afirmada.** O texto do
`<main>` é idêntico ao da `main` — 9811 bytes, `diff` vazio — pelo comando que
`build/texto-visivel.js` documenta e que qualquer revisor repete. Na página
inteira, incluindo moldura, a única palavra visível removida é o eyebrow
"Riacho Tech" acima do H1, que está FORA do `<main>`: kicker sobre título, com
o nav dizendo de quem é a página logo acima.

Não tocado, e registrado: o `<meta robots noindex>` da política é decisão
anterior a esta fatia e explica sozinho o SEO de 63 no Lighthouse dela.
