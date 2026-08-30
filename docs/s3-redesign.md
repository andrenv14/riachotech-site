# S3 — redesign do site institucional

Spec aprovada em 30/08/2026 (sessão Fable, plan mode). Implementação em
`opusplan`, mobile-first, seção por seção — commits `S3 N/9` nesta branch
(`s3-redesign`). É o item 13 de `docs/contexto/fila.md` no `sofia-bot`.

## Contexto

`riachotech.com.br` pesava **2,00 MB**, 97% em quatro screenshots PNG de
conversa. `demo-professor.png` sozinho tinha **1.665 KB** — e vendia um pacote
cortado da oferta em 20/08 (`negocio.md` do `sofia-bot`: "Pacote Aulas
(professor) — sem RAG sobra agenda+cobrança, ROI do professor é fraco,
prospect sumiu"). O site anunciava algo que a Riacho não vende.

Os outros três (`clinica`, `salao`, `petshop`) eram 460×903 exibidos num card
de 300px com `object-fit:cover; object-position:top` — só o terço de cima
aparecia, ponto de corte diferente em cada um.

Medições em 30/08 contra o site no ar:

| arquivo | bytes |
|---|---:|
| `demo-professor.png` | 1.665.186 |
| `demo-petshop.png` | 108.425 |
| `demo-clinica.png` | 109.099 |
| `demo-salao.png` | 95.305 |
| `logo.png` (1600×427, exibido a 34px) | 29.752 |
| `index.html` | 25.684 |
| `favicon.png` (512×512) | 15.298 |
| **total** | **2.048.749** |

### Três defeitos achados na leitura, corrigidos de brinde

1. **Itálico do Fraunces era falso** — a URL do Google Fonts não pedia o eixo
   `ital`, então o `<em>` do H1 era inclinação sintética do navegador, não o
   itálico de marca que o doc de marca descreve como ênfase.
2. **Pesos pedidos e não usados**: Fraunces 500/900 (nada usa), faltando o 400
   (`.pname` usa).
3. **Verde fora da paleta**: `.plan.feat` tinha `rgba(31,170,89,.12)`, sobra de
   paleta antiga — proibido pelo doc de marca.

## Direção de design

### O elemento-assinatura: a conversa

Um só. Aparece duas vezes, e em nenhum outro lugar:
- **No hero**, digitando sozinha.
- **Em "pra quem é"**, o mesmo componente `.phone`, com três abas — o
  visitante troca quem está falando e a conversa se redigita. Os três PNG
  viram três roteiros de texto no mesmo celular.

### Tokens → `@theme` (de `docs/brand-riacho-tech.md` do `sofia-bot`, sem
alterar nenhum hex)

```css
@theme {
  --color-ink:         #16253D;
  --color-paper:       #F3F5F3;
  --color-paper-2:     #E9ECE9;
  --color-sand:        #E8E4DC;
  --color-signal:      #2F5D91;
  --color-signal-dark: #20456E;
  --color-clay:        #3B5578;
  --color-muted:       #5C6B72;
  --color-line:        rgba(20,33,61,0.12);
  --color-sky:         #9CBBE0;
  --color-sky-2:       #BFD9F2;
  --color-mist:        #CFE0DD;
  --font-display: "Fraunces", serif;
  --font-sans:    "Inter", sans-serif;
  --font-mono:    "IBM Plex Mono", monospace;
  --radius-card:  14px;
}
```

`--teal` morreu (valia `#16253D`, é navy, o nome mentia). O verde fora da
paleta morreu sem substituto.

### Tipografia — escala fixa de 7 degraus

| papel | face | tamanho |
|---|---|---|
| display-1 (H1) | Fraunces 600, ital nas ênfases | `clamp(34px, 5.4vw, 56px)` |
| display-2 (H2 de seção) | Fraunces 600 | `clamp(26px, 3.4vw, 36px)` |
| display-3 (H3 de card) | Fraunces 600 | `19px` |
| lead | Inter 400 | `18px` |
| corpo | Inter 400 | `16px` |
| apoio | Inter 400 | `14.5px` |
| mono (eyebrow, tag, aba, hora, preço) | IBM Plex Mono 500, caixa alta, `.14em` | `12.5px` |

URL de fonte corrigida (mesma no `index.html` e `privacidade.html`, pra
dividirem cache):

```
family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,600
&family=Inter:wght@400;500;600;700
&family=IBM+Plex+Mono:wght@400;500&display=swap
```

## O que muda em cada seção

| seção | mudança |
|---|---|
| `<head>` | og:/twitter:/canonical/theme-color (o site não tinha nenhuma tag social) |
| nav | Tailwind puro, `logo.png` reexportado a 340×91 |
| hero | Mantido — conversa auto-digitada, `aria-hidden` + transcrição pra leitor de tela |
| como funciona | `01·02·03` ficam (sequência real), ganham a hora da conversa do hero |
| recursos | Só escala/espaçamento |
| pra quem é | 4 cards PNG → 1 celular + 3 abas. Card "Aulas particulares" sai |
| planos | Verde fora da paleta removido, texto da oferta intocado |
| CTA final / rodapé | Só escala tipográfica |
| `privacidade.html` | Uma linha: o `<link>` de fonte, igual ao do index |
| `/conectar` | Não tocado — congelada até a Meta |

### Texto da oferta — conferido contra `negocio.md`, sem alteração

R$1.000 + R$200/mês, sem limite de conversas; 2× R$500; landing avulsa R$750,
combo R$1.500; mensalidade começa 30 dias depois. Nenhum texto novo sobre a
oferta entra nesta fatia. Os roteiros das abas são transcrição literal das
conversas que estavam nos PNG, feita antes de apagar os arquivos.

## Interações — o orçamento inteiro

- conversa auto-digitada (hero) — mostra o produto funcionando antes de
  qualquer texto pedir confiança
- abas em "pra quem é" — substitui 313 KB de imagem por interação
- revelação no scroll — 6 elementos, não ~15
- hover em botão e card

Nada mais. `prefers-reduced-motion` respeitado nas quatro.

## Ícone e imagens

Fonte: `docs/brand/logo-icone.png` do `sofia-bot` (1254×1254). Nenhum desenho
novo. `favicon.png` (256×256), `apple-touch-icon.png` (180×180, novo),
`og-image.png` (630×630, novo — 1200×1200 pesava 176KB sem ganho visível),
`logo.png` (340×91). O cabeçalho continua com o `logo.png` horizontal.

## Tailwind — mesmo esquema do painel (`sofia-bot/src/admin`)

`build/tailwind-input.css` → `site.css` (commitado, minificado) via
`npm run build:css` (`@tailwindcss/cli` + `tailwindcss` `^4.3.3`, mesma versão
do painel). Nada compila no servidor — deploy segue `git pull`.

**Handoff, fora desta fatia:** o repo é o diretório servido, então
`package.json`/`package-lock.json`/`build/` passam a ser buscáveis por HTTP —
regra de deny entra em `nginx/` (S3 9/9), aplicação na VPS é da sessão-guia.

## Peso projetado

| | antes | depois |
|---|---:|---:|
| total | 2.048.749 | ≈116.000 |

−94%, folga de 184 KB sobre o teto de 300 KB.

## Critério de pronto

- [ ] Peso total < 300 KB (`du -sh`, sem `.git`/`node_modules`)
- [ ] Lighthouse mobile ≥ 90 em performance e acessibilidade
- [ ] Zero link quebrado
- [ ] Texto da oferta idêntico ao `negocio.md`
- [ ] `prefers-reduced-motion` respeitado
- [ ] Abas navegáveis por teclado, foco visível
- [ ] `npm run build:css` rodado e `site.css` commitado junto
- [ ] Zero hex fora do `@theme`

**Plano B de performance:** se o Lighthouse mobile ficar abaixo de 90 por
Google Fonts bloqueante, hospedar os três `woff2` (subset latin, ~100 KB) no
repo — só se a medição pedir.

## Voz da marca — 3 frases pro Canva (campo vazio no kit)

> Escrevemos como quem já atendeu no balcão: frase curta, verbo direto,
> nenhuma palavra que o cliente precise procurar no Google.

> Só prometemos o que o produto já faz hoje. Nada de revolucionar, transformar
> ou potencializar.

> O preço aparece por inteiro na primeira vez que é dito — e o que não está
> incluído a gente diz antes de perguntarem.

## Fora de escopo, dito na cara

- `/conectar` — congelada até a Meta
- Conteúdo do `privacidade.html` — só o `<link>` de fonte muda
- Aplicar o deny no Nginx da VPS — a regra é escrita aqui, aplicada lá
- Hospedar fonte no repo — só se o Lighthouse reprovar
- Naming / troca do nome "Riacho Tech" — fica enquanto for local
