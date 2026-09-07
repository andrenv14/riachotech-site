# riachotech-site

Site institucional da Riacho Tech, no ar em
[riachotech.com.br](https://riachotech.com.br). Estático de propósito: HTML,
Tailwind v4 **compilado e commitado**, e um arquivo de JavaScript sem nenhuma
dependência. Não há build no servidor — o deploy é `git pull`.

**Repositórios irmãos:**
[`sofia-vitrine`](https://github.com/andrenv14/sofia-vitrine), a arquitetura do
produto · [`sofia-eval`](https://github.com/andrenv14/sofia-eval), a avaliação
de comportamento do modelo.

---

## O site

A dobra, em 1280 px. A conversa da direita é markup da própria página, com uma
transcrição fixa ao lado para leitor de tela — não é captura de WhatsApp, e não
há cliente real nela.

![Dobra do site em 1280 px](docs/imagens/index-1280-dobra.png)

A mesma página em 390 px, e a seção que troca o exemplo por segmento — clínica,
salão, petshop — sem recarregar nada:

| 390 px, a dobra | 390 px, "pra quem é" |
|---|---|
| ![Dobra em 390 px](docs/imagens/index-390-dobra.png) | ![Seção por segmento em 390 px](docs/imagens/index-390-segmentos.png) |

E a seção de planos, que é onde o site tem de ser mais claro:

![Seção de planos em 1280 px](docs/imagens/index-1280-planos.png)

## O que vale olhar aqui

**`DESIGN.md` — o sistema de design foi extraído, não inventado.** Ele não
descreve o site que alguém gostaria de ter: espelha `build/tailwind-input.css`,
e diz isso na primeira linha. Tokens de cor em OKLCH, papéis de tipografia
(display, corpo, rótulo, dado), escala de espaçamento, orçamento de movimento e
a lista do que não se faz aqui. Quando o CSS e o documento discordam, o CSS
vence e o documento é o errado.

**`build/medir-site.js` — a página é medida, não olhada.** Abre qualquer página
em 390, 820 e 1280 px e devolve números: contraste reprovado, corpo abaixo de
16 px, alvo de toque abaixo de 44×44, rolagem horizontal, erro de console.
Nenhuma mudança visual vai ao ar sem passar por ele.

**`build/texto-visivel.js` — prova que um restyle não mexeu no conteúdo.**
Extrai o texto visível de uma página antes e depois e compara. Foi o que
garantiu, na renovação, que a política de privacidade mudou de forma sem mudar
uma palavra — o tipo de coisa que ninguém confere no olho e todo mundo assume.

**`.claude/skills/design-site/SKILL.md` — como se trabalha neste site.** O chão
de regras (contraste, medida de linha, alvos, estados, foco visível), as
proibições concretas que fazem uma página parecer gerada, a crítica com
prioridades e o fluxo de acabamento. Foi escrita para os tokens e a voz desta
marca a partir do que serve no kit `impeccable` do `pbakaus`
([Apache 2.0](https://github.com/pbakaus/impeccable)) — que não foi instalado,
porque traz um hook que reescreve `.claude/settings.local.json` a cada edição de
interface, e permissão só muda com uma pessoa decidindo. O detector dele rodou
uma vez, como leitura: achou um excesso de travessão que o olho não pegou, e
três falsos positivos que a medição desmentiu.

## Medido

Última renovação, nas três páginas, com o servidor local e o Chromium do
Playwright:

| | index | privacidade | 404 |
|---|---:|---:|---:|
| acessibilidade | 100 | 100 | 100 |
| performance | 99 | 99 | 100 |
| boas práticas | 100 | 100 | 100 |
| SEO | 100 | 63 | 63 |
| CLS | 0,020 | 0,032 | 0,023 |
| contraste reprovado (390/820/1280) | 0 | 0 | 0 |
| corpo abaixo de 16 px | 0 | 0 | 0 |
| alvo abaixo de 44×44 | 0 | 3 | 0 |

O SEO de 63 nas duas últimas é `is-crawlable`, e é deliberado: as duas têm
`<meta robots noindex>`. Os três alvos da política são links dentro de
parágrafo, exceção declarada na skill. Compressão e cache não entram na tabela
porque dependem do Nginx e só valem medidos em produção; a configuração está em
`nginx/riachotech.conf`.

**O achado que a medição pegou e a leitura não:** o rodapé mudava de altura
quando a fonte carregava — em linha com quebra automática, o número de linhas
dependia da largura da fonte, e numa página curta o rodapé cai dentro da
primeira tela. Era a maior fonte de deslocamento de layout do site: 0,171 na
página 404. Empilhado no celular, 0,023.

## Escopo

A renovação mexeu no que separava este site de um site bom: hierarquia e piso
tipográfico, não composição. As fontes continuam vindo do Google Fonts —
auto-hospedá-las pesaria mais do que o deslocamento que resolveriam, e um
`@font-face` de fallback métrico foi tentado e revertido, porque o override certo
muda por plataforma e o ganho medido foi de 0,001.

## Operação

- `npm run build:css` compila o Tailwind; o `site.css` resultante é commitado,
  porque o servidor não roda build.
- `npm run medir` mede qualquer página; `npm run og` regenera a prévia do link
  a partir dos próprios tokens.
- Deploy: `git pull` em `/var/www/riachotech`. O `.git` mora dentro do
  diretório servido, e o Nginx nega dotfiles, `README.md`, `docs/`, `build/`,
  `nginx/` e `package*.json` — as negações estão no conf versionado.
- `conectar/` é a página do Embedded Signup da plataforma da Meta, aberta pelo
  cliente a partir de um link de convite assinado. Ela não guarda segredo: o id
  do app e o da configuração são públicos por natureza, e o token do convite é
  validado no back-end.
