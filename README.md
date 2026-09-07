# riachotech-site

Site institucional da Riacho Tech, no ar em
[riachotech.com.br](https://riachotech.com.br). É HTML com Tailwind v4
compilado e commitado, mais um arquivo de JavaScript que não depende de nada.
O servidor não roda build: o deploy é `git pull`.

**Repositórios irmãos:**
[`sofia-vitrine`](https://github.com/andrenv14/sofia-vitrine), a arquitetura do
produto · [`sofia-eval`](https://github.com/andrenv14/sofia-eval), a avaliação
de comportamento do modelo.

---

## O site

A dobra, em 1280 px. A conversa da direita é markup da própria página, com uma
transcrição fixa ao lado para leitor de tela. Não é captura de WhatsApp e não há
cliente real nela.

![Dobra do site em 1280 px](docs/imagens/index-1280-dobra.png)

A mesma página em 390 px, e a seção que troca o exemplo por segmento (clínica,
salão, petshop) sem recarregar nada:

| 390 px, a dobra | 390 px, "pra quem é" |
|---|---|
| ![Dobra em 390 px](docs/imagens/index-390-dobra.png) | ![Seção por segmento em 390 px](docs/imagens/index-390-segmentos.png) |

E a seção de planos, que é onde o site precisa ser mais claro:

![Seção de planos em 1280 px](docs/imagens/index-1280-planos.png)

## O que vale olhar aqui

**`DESIGN.md`** descreve o site que existe, não o que eu gostaria de ter: ele
espelha `build/tailwind-input.css` e diz isso na primeira linha. Traz os tokens
de cor em OKLCH, os papéis de tipografia (display, corpo, rótulo, dado), a
escala de espaçamento, o orçamento de movimento e a lista do que não se faz
aqui. Quando o CSS e o documento discordam, quem está errado é o documento.

**`build/medir-site.js`** abre qualquer página em 390, 820 e 1280 px e devolve
números: contraste reprovado, corpo abaixo de 16 px, alvo de toque menor que
44×44, rolagem horizontal, erro de console. Nenhuma mudança visual vai ao ar sem
passar por ele.

**`build/texto-visivel.js`** extrai o texto visível de uma página antes e depois
de uma mudança e compara os dois. Foi ele que garantiu que a política de
privacidade mudasse de forma sem perder uma palavra.

**`.claude/skills/design-site/SKILL.md`** é como se trabalha neste site: o chão
de regras (contraste, medida de linha, alvos, estados, foco visível), as
proibições que fazem uma página parecer gerada e o fluxo de acabamento. Escrevi
a partir do que serve no kit `impeccable` do `pbakaus`
([Apache 2.0](https://github.com/pbakaus/impeccable)), que não instalei: ele traz
um hook que reescreve `.claude/settings.local.json` a cada edição de interface, e
permissão só muda quando uma pessoa decide. Rodei o detector dele uma vez, só
para ler: achou um excesso de travessão que eu não tinha visto, e três falsos
positivos que a medição derrubou.

## Medido

Última renovação, nas três páginas, com o servidor local e o Chromium do
Playwright:

| | index | privacidade | 404 |
|---|---:|---:|---:|
| acessibilidade | 100 | 100 | 100 |
| performance | 99 | 99 | 100 |
| boas práticas | 100 | 100 | 100 |
| SEO | 100 | 63 | 63 |
| CLS (quanto a página pula ao carregar) | 0,020 | 0,032 | 0,023 |
| contraste reprovado (390/820/1280) | 0 | 0 | 0 |
| corpo abaixo de 16 px | 0 | 0 | 0 |
| alvo abaixo de 44×44 | 0 | 3 | 0 |

O SEO de 63 nas duas últimas é `is-crawlable`, e é de propósito: as duas têm
`<meta robots noindex>`. Os três alvos da política são links dentro de
parágrafo, exceção declarada na skill. Compressão e cache não entram na tabela
porque dependem do Nginx e só valem medidos em produção; a configuração está em
`nginx/riachotech.conf`.

A medição pegou uma coisa que eu não tinha visto lendo: o rodapé mudava de
altura quando a fonte carregava. A linha quebrava automaticamente, então o
número de linhas dependia da largura da fonte, e numa página curta o rodapé cai
dentro da primeira tela. Era a maior fonte de deslocamento de layout do site:
0,171 na página 404. Empilhado no celular, 0,023.

## Escopo

A renovação mexeu em hierarquia e piso tipográfico, que era o que separava este
site de um site bom, e não em composição. As fontes continuam vindo do Google
Fonts: auto-hospedá-las pesaria mais do que o deslocamento que resolveriam, e um
`@font-face` de fallback métrico eu tentei e reverti, porque o override certo
muda por plataforma e o ganho medido foi de 0,001.

## Operação

- `npm run build:css` compila o Tailwind; o `site.css` resultante é commitado,
  porque o servidor não roda build.
- `npm run medir` mede qualquer página; `npm run og` regenera a prévia do link
  a partir dos próprios tokens.
- Deploy: `git pull` em `/var/www/riachotech`. O `.git` mora dentro do
  diretório servido, e o Nginx nega dotfiles, `README.md`, `docs/`, `build/`,
  `nginx/` e `package*.json`. As negações estão no conf versionado.
- `conectar/` é a página do Embedded Signup (o fluxo oficial da Meta para o
  cliente conectar o número dele), aberta a partir de um link de convite
  assinado. Ela não guarda segredo: o id
  do app e o da configuração são públicos por natureza, e o token do convite é
  validado no back-end.
