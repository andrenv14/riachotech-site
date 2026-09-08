---
name: nao-slop
description: As duas camadas que faltavam na design-site — declarar a leitura e as direções ANTES de desenhar, e detectar os tells contáveis DEPOIS. Use ao criar tela nova ou redesenhar. O chão e a auditoria continuam na design-site; esta não os repete.
---

# nao-slop

Escrita em 08/09/2026 depois de ler `pbakaus/impeccable` e `Leonxlnx/taste-skill`
e medir o site contra as duas. Motivo de existir: a `design-site` foi extraída
de `craft-floor.md`, `critique.md` e `audit.md` — o chão e a perícia. Chão
impede feiúra; ele não produz nada. O resultado foi uma página correta que
poderia ser de qualquer um. O `new-work.md` do impeccable nomeia exatamente
isso: *"if someone could guess your aesthetic from the category alone, or from
category-plus-avoidance, rework until neither answer is obvious."*

**Decisão do fundador em 08/09, e ela limita esta skill:** o esqueleto de página
que vende (o quê → prova → pra quem → preço → chamada) **fica**. Ele não é o
defeito. O defeito é estética e falta de vida. Esta skill não reorganiza
estrutura; ela ataca aparência, energia e tells.

## 1 — Antes de desenhar

**Declare a leitura em uma linha.** Da taste-skill. Antes de qualquer código,
escrever como se está lendo o pedido — público, tom, referência, restrição.
Serve para não cair no mesmo default de sempre sem perceber.

**Traga 2–3 direções e espere a escolha.** Do `overdrive.md`:
*"Do NOT jump straight into implementation… Think through 2-3 different
directions"* e *"Get the user's pick before writing any code."* Direção aqui é
tratamento visual — luz, escala, profundidade, movimento —, não outra estrutura
de página.

**Mostre em tela antes de pedir opinião.** Também do `overdrive.md`: usar o
navegador, olhar o resultado, iterar. Descrever layout em palavras não funciona
com este fundador, e não funciona em geral: captura em 390 e 1280, lida, antes
de chamar.

## 2 — As três alavancas de "vivo", medidas em concorrente

Medido no `botconversa.com.br` em 08/09 (`generator: Framer`, zero biblioteca
de animação, página de 11.026px de altura com **7** elementos animados na
entrada — ou seja, contido). O que faz aquilo parecer vivo, em ordem de força:

1. **Profundidade no fundo.** O fundo não é chapado: tem grade em perspectiva.
   Fundo liso é o maior responsável pela sensação de página morta.
2. **O produto sangra pela borda.** O print sobe de baixo, grande, cortado pela
   viewport. Produto sentado dentro de uma caixa centralizada lê como
   ilustração; produto cortado lê como janela para algo maior.
3. **O produto em movimento.** Quatro `<video>` mudos na mesma posição, trocados
   por abas — gravação de tela do produto fazendo a coisa.

Corolário: **animação de entrada não é o que dá vida.** Fade-up em toda seção é
tell, e o concorrente que parece vivo usa sete numa página inteira.

## 3 — Os tells contáveis

`node build/detectar-tells.js <url>` — roda junto do `npm run medir`. Ele conta;
o julgamento é de quem lê. Reprovação não é automática: é achado que precisa de
resposta.

- **Travessão**: o sinal não é o caractere, é a densidade. Em português o
  travessão é pontuação legítima; vinte numa página de marketing lê como texto
  de modelo. Teto aqui: **6 por página**, e a exceção se declara.
- **Rótulo mono de seção (`.eyebrow`)**: no máximo **um a cada três seções**.
  Contar o elemento, **nunca a classe** — `.eyebrow` tem um `.eyebrow-dot`
  aninhado, e `grep -c 'class="eyebrow'` conta os dois. Esse erro já foi
  cometido aqui em 08/09 e virou achado falso.
- **Eyebrow numerado** (`01 — …`, `001 · …`): banido. A taste-skill nomeia com
  exemplo quase idêntico ao que o site tinha.
- **Hero cabe na viewport**: H1 ≤ 2 linhas, subtexto ≤ 20 palavras.
- **CTA de intenção duplicada**: dois botões que querem a mesma coisa visíveis
  ao mesmo tempo é reprovação.
- **Raio concêntrico**: filho dentro de pai com padding tem raio = raio do pai
  − padding. Errar por 2px produz um arco visível no canto, e foi assim que o
  mock de celular do site ficou com cara de rascunho.

## 4 — O que NÃO se importa das duas fontes

- O **gosto** da taste-skill (pool de fontes rotativas, paletas): a marca já
  está decidida em `DESIGN.md` e no doc de marca. Detecção entra; estética de
  terceiro, não.
- **Dark mode obrigatório**: decisão do fundador, não importação.
- O **binário** do `npx impeccable detect`: só com o fundador dizendo sim na
  janela, como a `design-site` já manda.

## 5 — O chão continua onde estava

Contraste, medida, escala de espaço, alvos, estados, WCAG, Lighthouse, o
`npm run medir` e a auditoria de tema: tudo em `.claude/skills/design-site/SKILL.md`.
Esta skill não repete nada disso e não a substitui.
