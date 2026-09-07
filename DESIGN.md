# DESIGN.md — Riacho Tech, site institucional

A fonte executável dos tokens é `build/tailwind-input.css` (bloco `@theme`);
este arquivo os espelha textualmente e é atualizado NO MESMO COMMIT que os
altera. Os hex vêm de `~/sofia-bot/docs/brand-riacho-tech.md` (kit do Canva,
lidos em 30/08/2026). Em 07/09/2026 saíram duas entradas que tinham perdido o
consumidor: `--color-clay` (`#3B5578`), que só servia ao componente `.tag`.
(O `--radius-card` também saiu por um momento, e voltou no mesmo dia quando o
`.toc` do documento longo passou a consumi-lo.) **Todo token do `@theme` tem consumidor**, e o critério se
verifica sozinho: para cada `--nome` do bloco, `grep -c 'var(--nome)\|-nome'`
em `build/tailwind-input.css` e nos `.html` tem de passar de zero. O doc de
marca ainda lista o `#3B5578` como extra do CSS do site; quem for atualizá-lo
confere com `grep -c '3B5578' build/tailwind-input.css`. As regras de uso — o chão, as proibições, a crítica, a
auditoria — vivem em `.claude/skills/design-site/SKILL.md`; aqui está o
sistema, não o procedimento. Registro da fatia que o criou:
`docs/s3-redesign.md`. Renovação de 09/2026: `docs/plans/2026-09-renovacao.md`.

Este arquivo **não escreve número que descreve o código** (quantos elementos
têm tal classe, quantos usos de tal componente): número assim envelhece na
primeira mudança e não avisa ninguém. Onde o número for inevitável, vem o
comando que o rederiva.

## Tokens (cópia textual do `@theme`)

```css
@theme {
  --color-ink:         #16253D;  /* navy — títulos, nav, fundo da seção Planos */
  --color-paper:       #F3F5F3;
  --color-paper-2:     #E9ECE9;
  --color-sand:        #E8E4DC;  /* fundo da tela do celular */
  --color-signal:      #2F5D91;  /* ação primária, bolha da Sofia */
  --color-signal-dark: #20456E;  /* hover, itálico de ênfase */
  --color-muted:       #5C6B72;
  --color-line:        rgba(20, 33, 61, 0.12);
  --color-sky:         #9CBBE0;  /* eyebrow sobre navy */
  --color-sky-2:       #BFD9F2;  /* nota mono sobre navy */
  --color-mist:        #CFE0DD;  /* corpo sobre navy */
  --color-mist-2:      #E4EFEC;  /* item de lista sobre navy */
  --color-mint:        #BFEBD3;  /* status "online" no celular */

  --font-display: "Fraunces", serif;
  --font-sans:    "Inter", sans-serif;
  --font-mono:    "IBM Plex Mono", monospace;

  --radius-card: 14px;

  /* Ícone de marca de seleção, traço de 2px e ponta reta — desenhado aqui
     para o CSS não depender de nenhum glifo de fonte. Usado por .plan-item. */
  --icone-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2.5 8.6l3.6 3.6 7.4-8.4' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='square'/%3E%3C/svg%3E");
}
```

## Papéis de cor

| papel | token |
|---|---|
| fundo de página | `paper` |
| seção alternada | `paper-2` |
| superfície quente (tela do celular) | `sand` |
| texto principal | `ink` |
| texto secundário | `muted` — 4,64:1 sobre `paper-2`, o par mais apertado do site |
| ação primária / bolha da Sofia | `signal`, hover e ênfase itálica `signal-dark` |
| linha divisória | `line` |
| sobre `ink` (navy): eyebrow e ícone | `sky` |
| sobre `ink`: nota em mono | `sky-2` |
| sobre `ink`: corpo | `mist` |
| sobre `ink`: item de lista | `mist-2` |
| status "online" | `mint` |

Sobre superfície colorida o texto secundário sai da paleta, nunca de um cinza.
Elemento não textual que carrega informação (o ✓ da lista, o ponto da linha do
tempo) usa `sky`, não `signal`: o signal dá 2,27:1 sobre o navy e some.

## Tipografia — papéis

| papel | face | tamanho | entrelinha |
|---|---|---|---|
| display-1 (H1) | Fraunces 600, itálico nas ênfases | `clamp(34px, 5.4vw, 56px)` | 1,06 |
| display-2 (H2) | Fraunces 600 | `clamp(26px, 3.4vw, 36px)` | 1,15 |
| display-3 (H3) | Fraunces 600 | 19px | 1,25 |
| preço | Fraunces 600 | `clamp(38px, 6vw, 52px)` | 1 |
| lead | Inter 400 | 18px | 1,6 |
| corpo | Inter 400 | 16px — é o PISO | 1,6 |
| controle (botão, aba, link de nav) | Inter 500/600 | 14,5–15px | — |
| mono: eyebrow de seção, marcador de etapa, hora, valor | IBM Plex Mono 500, caixa alta, `.14em` | 11,5–13px | — |

As três famílias entram pelo mesmo `<link>` do Google Fonts, idêntico em
`index.html`, `404.html` e `privacidade.html`, para dividirem cache. Elas
carregam com `display=swap` e a troca ainda produz um resto de deslocamento no
H1 (CLS medido em 0,019, dentro do teto). O `@font-face` de fallback métrico
foi TENTADO e não entrou: `local("Georgia")` não existe no Linux, o override
certo muda por plataforma, e nesta máquina o ganho medido foi de 0,001.

## Espaço

Escala do Tailwind (múltiplos de 0,25rem). Seção: `py-20`, `min-[820px]:py-24`.
`.wrap` com 1160px de largura máxima e 28px de gutter. Valor arbitrário só
para nudge óptico, sempre com comentário dizendo o que compensa — o modelo é o
`translate-y` da marca no nav.

## Componentes (`@layer components` de `build/tailwind-input.css`)

`.wrap` · `.eyebrow` + `.eyebrow-dot` (só como nome de seção) · `.btn`
(`-primary`, `-ghost`; default/hover/focus/active) · `.tab` · `.phone` +
`-screen`/`-bar`/`-body` · `.bubble` (`-in`, `-out`, `-tick`) ·
`.typing-bubble` · `.plan-item` · `.pay` + `.pay-when` · `.fnote`.

Documento longo (`privacidade.html`): `.doc-header` · `.doc` · `.toc` +
`.toc-label`. A política tinha um sistema inteiro num `<style>` inline —
`:root` próprio repetindo os mesmos hex, mais `.wrap`, `.btn`, `.eyebrow` e
anel de foco duplicados — e foi por isso que ela ficou para trás quando o
sistema evoluiu. Agora consome o mesmo `site.css`.

O celular é o elemento-assinatura da página: aparece no hero digitando sozinho
e em "pra quem é" com abas, e em nenhum outro lugar. A linha do tempo de
cobrança (`.pay`) é a segunda assinatura, e fala a MESMA língua da primeira —
o marcador em monoespaçada é o mesmo recurso da hora dentro da bolha.

## Movimento — o orçamento inteiro

1. O celular do hero digitando sozinho. É o único momento autoral.
2. A troca de aba em "pra quem é", que redesenha as bolhas.
3. Hover e `:active` em botão e aba.

`prefers-reduced-motion` respeitado nos três. Nada mais — e o critério se
verifica sozinho: `grep -n 'animation\|transition' build/tailwind-input.css`
só pode achar os seletores acima, mais o bloco de `prefers-reduced-motion`.

## O que não se faz aqui

A lista inteira está em `.claude/skills/design-site/SKILL.md`, seção
"Proibições". As duas exceções da marca, porque são as que sempre voltam à
discussão: **o eyebrow mono de SEÇÃO fica** (é a assinatura visual mais
distinta da marca segundo o doc de marca) — mas acima do H1 do hero, não;
e **o 01/02/03 de "Como funciona" fica**, porque ali a sequência carrega
informação. Do doc de marca: nada de paleta genérica de "app de IA"
(bege+terracota, preto+neon), nada de cor viva ou infantil. A marca é sóbria.
