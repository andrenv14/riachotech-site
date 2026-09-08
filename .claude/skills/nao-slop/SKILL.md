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

## 5 — Medido no redesign de 08/09/2026

Cinco coisas que custaram volta e que se aplicam a QUALQUER tela nova. Não é
diário: cada uma é regra, com o número que a produziu ao lado.

**Textura precisa de DUAS escalas.** Grão fino sozinho some — o olho integra
ruído de alta frequência a um metro da tela e volta a ver cor lisa, que é
exatamente a queixa que a textura foi corrigir. Vai o grão de perto (ladrilho de
160px) mais uma mancha larga de baixa frequência (ladrilho de 560px), que é a
variação que se enxerga de longe. E **não use `mix-blend-mode: overlay` sobre
fundo escuro**: overlay preserva tom escuro, então ruído cinza médio sobre navy
não muda quase nada. A primeira versão ficou invisível e só apareceu numa
ampliação de 4× de um pedaço liso do fundo — a 1× eu teria dado por feito.

**Para alinhar uma faixa de artefatos, a peça ESTICA e `mt-auto` distribui.**
Três tentativas, e as duas primeiras erram de jeitos que parecem certos: com o
padrão do grid a sobra cai ENTRE a peça e o título (medido: vão de 28px a 146px
na mesma faixa); com `align-self: end` a sobra sobe para debaixo do rótulo, o
que é melhor **e ainda não resolve, porque a ORDEM de quem sobra muda entre
1280 e 820** — não existe ajuste de conteúdo que feche as duas larguras ao mesmo
tempo. Esticando não há sobra. `mt-auto` no último bloco, e nunca
`justify-content: flex-end`: com overflow ele esconde conteúdo para cima e o
navegador nem conta como rolável.

**Quando o vão não fecha com espaço, o defeito é a CONTAGEM.** Cinco blocos numa
grade de três colunas é 3+2 e não fecha por construção — a faixa de baixo fica
com uma peça larga e uma estreita, e nenhum ajuste conserta, porque o problema é
quantos são. A saída foi um sexto bloco, e ele não foi inventado para encher a
grade: era uma capacidade em produção que a página não contava. Se não houver
conteúdo verdadeiro para o bloco que falta, o desenho é que está errado.

**Regra que sobrevive ao layout que a justificava vira defeito silencioso.** Uma
media query arredondava a foto pelo lado esquerdo, escrita para uma versão em
que ela ficava ao lado do texto. O layout voltou a ter a foto em cima, a regra
ficou, e acima de 820px sobrou uma orelha de canto reto por cima do canto
arredondado da peça. Passou por duas medições minhas sem ser vista, porque
nenhuma delas olha canto. **Ao desfazer um layout, varra as regras que só
existiam por causa dele.**

**O mesmo objeto do produto desenhado de dois jeitos lê como duas coisas.** O
cartão do Google Agenda aparecia em duas seções da mesma página — numa com
título em serifa e barra sangrando na borda, na outra com sans, barra estreita e
linha de autoria. O leitor passa pelos dois na mesma rolagem. Artefato repetido
vira componente, não segunda interpretação.

**E o instrumento erra igual ao desenho.** Duas medições minhas mentiram nesta
fatia, as duas por olhar o lugar errado: um script pegava `querySelector('.peca')`
— a PRIMEIRA peça de um bloco que tem duas empilhadas — e reportava 101px de vão
onde a tela mostrava 28; e um teste procurava a hora no formato antigo depois de
o texto mudar. Quando a tela e a medição discordam, **a tela ganha**, e o
próximo passo é consertar o instrumento, não o desenho.

## 6 — O chão continua onde estava

Contraste, medida, escala de espaço, alvos, estados, WCAG, Lighthouse, o
`npm run medir` e a auditoria de tema: tudo em `.claude/skills/design-site/SKILL.md`.
Esta skill não repete nada disso e não a substitui.
