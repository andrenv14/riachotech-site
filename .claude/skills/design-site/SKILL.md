---
name: design-site
description: Crítica, auditoria e acabamento de qualquer tela do site da Riacho Tech (riachotech.com.br). Use antes de propor mudança visual, ao construir uma seção nova e antes de chamar o fundador para ver o resultado. Adaptado do "impeccable" (pbakaus) aos tokens e à voz da marca — lido, não instalado.
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

## Fluxo

Construir INTEIRO → inspecionar UMA vez em lote (390 e 1280, capturas +
`npm run medir` + Lighthouse) → corrigir em UM lote → confirmar → parar. Nada
de laço aberto de QA. A terceira correção seguida que revela problema novo em
outro lugar diz que o desenho está errado: parar e redesenhar.

Refinamento preserva o mundo visual, o conteúdo e o que está fora do escopo;
redesenho substitui. Nunca meio-termo, e nunca redesenho disfarçado de
refinamento — se o conceito estiver errado, dizer isso e propor redesenho.

## Medir, não estimar

    npm run medir                                  # site no ar
    SITE_URL=http://localhost:8099/ npm run medir  # cópia local (python3 -m http.server 8099)
    OUT=/tmp/x PREFIX=site-final npm run medir     # outro destino e nome

`build/medir-site.js` captura 390/820/1280 e mede contraste por par cor/fundo
COMPOSTO (inclusive `oklab(... / α)`, que é como o Tailwind 4 resolve cor com
opacidade), tamanho, entrelinha, tracking, medida em `ch` de parágrafo que de
fato quebra linha, alvos de toque, overflow, blur, gradiente, pseudo-elemento
com `content`, fontes carregadas e console.

Lighthouse mobile, com o Chromium que o Playwright já baixou:

    CHROME_PATH=~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome \
    npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo \
      --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
      --output=json --output-path=<arquivo>

Toda afirmação sobre a tela se apoia numa linha desses relatórios ou numa
captura; "parece bom" não é evidência. **Relatório que passa observando NADA
(zero reprovações, console vazio) é visto FALHAR antes de ser aceito**: troque
uma cor de texto por uma que não contrasta, rode, veja o número vermelho, e
desfaça. Sem esse controle, "zero" tanto significa que está certo quanto que a
medição não rodou.

O detector determinístico do impeccable roda **só com o fundador dizendo sim
na janela** — ele baixa um binário para `~/.impeccable/bin/`:

    IMPECCABLE_BROWSER=~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome \
    npx impeccable detect --json <url>

É evidência B, lida DEPOIS da leitura A estar fechada, para não ancorar o
julgamento. Onde as duas discordam, a divergência é o achado — não se escolhe
a mais conveniente. Falsos positivos conhecidos dele aqui, cada um confirmado
por seletor antes de descartar: `text-overflow` na transcrição `sr-only` (a
caixa tem 1px por definição), `nested-cards` no frame do celular (`.phone` ›
`.phone-screen` é um aparelho) e `overused-font` (Inter é decisão de marca).

## O chão — toda tela cumpre, sem exceção além das nomeadas

- **Contraste**: texto ≥ 4,5:1; texto grande (≥ 24px, ou ≥ 18,66px em bold) e
  controles ≥ 3:1. Sobre superfície colorida, o texto secundário sai da
  própria paleta (`mist`, `sky`, `sky-2`), nunca cinza. O par mais apertado do
  site é `muted` sobre `paper-2`, com 4,64:1: **não escurecer `paper-2`, não
  clarear `muted`**.
- **Tipo**: corpo (`<p>`, `<li>`) ≥ 1rem; texto funcional ≥ 11px; display
  ≤ 6rem; tracking nunca abaixo de −0,04em; entrelinha de display (`h1`–`h3`)
  entre 1,05 e 1,25, nunca a do corpo; a do corpo cresce com a medida.
  Exceção declarada: a hora dentro da bolha (`.bubble-tick`, 9,5px) é
  decoração `aria-hidden`, com transcrição `sr-only` ao lado.
- **Medida**: prosa corrida entre 45 e 75ch. Duas exceções, ambas medidas:
  abaixo de 700px a largura da tela decide e 35–43ch é o esperado; célula de
  grade de várias colunas pode descer a 40ch, porque ali cada cela tem duas ou
  três linhas e não é passagem de leitura.
- **Espaço**: a escala é a do Tailwind (múltiplos de 0,25rem). Valor
  arbitrário (`[26px]`) só para nudge óptico, e com comentário dizendo o que
  compensa — modelo: o `translate-y` da marca no nav. Grupos apertados,
  separação generosa, mais espaço acima de um título do que abaixo.
- **Movimento**: UM momento autoral por página, e aqui é o celular digitando
  no hero. Troca de aba, hover e `:active` são resposta a interação, não
  movimento autoral. Nunca uma entrada idêntica em toda seção; nunca animar
  imagem no hover; nunca bounce/elastic; `prefers-reduced-motion` com
  alternativa que preserva a informação (o mock renderiza a conversa inteira
  de uma vez).
- **Controles**: estados default/hover/focus/active — e disabled, loading e
  error quando existirem, o que hoje não acontece porque a página não tem
  formulário. Foco de teclado visível (`:focus-visible` do `@layer base`).
  Alvo ≥ 44×44, exceção declarada para link inline dentro de parágrafo. Cor
  nunca é o único código: aba ativa é fundo + `aria-selected`, item de lista é
  ícone + texto. Controle é Inter, nunca monoespaçada.
- **Superfícies do navegador**: `::selection` e o anel de foco vêm da paleta.
  `caret-color` fica de fora **enquanto não houver campo editável na página** —
  regra que se verifica sozinha: se `grep -c '<input\|<textarea\|contenteditable'`
  em qualquer `.html` der diferente de zero, o cursor precisa de cor de tema.
- **Layout**: sem rolagem horizontal em 390 (`scrollWidth == innerWidth`).
  Toda `<img>` com `width` e `height`. CLS ≤ 0,03.
- **Texto**: controles nomeiam a ação ("Falar no WhatsApp", nunca "Clique
  aqui"); erro nomeia o problema E a saída (é o que o `404.html` faz). O texto
  da oferta é o do `negocio.md`, literal; nada de "revolucionar",
  "transformar", "potencializar". Travessão só para aparte de verdade —
  `grep -o '&mdash;' index.html | wc -l` é o termômetro, não a regra.

## Proibições — o que faz um site parecer gerado

Recusar por padrão; a exceção existe só se estiver nomeada aqui ou em `DESIGN.md`:

- Cards do mesmo tamanho com ícone, título e texto como estrutura de página; e
  card dentro de card. (O celular não é card: é um aparelho.)
- "Número grande + rótulo pequeno" como template de métrica.
- Kicker ou eyebrow acima de título — **acima do H1 do hero é proibido sem
  exceção**, é o hero padrão de SaaS de IA. **Exceção da marca**: o rótulo
  mono de SEÇÃO (`.eyebrow`: ponto + IBM Plex Mono maiúsculo) nomeando a
  seção, um por seção. Rótulo acima de título de card ou de painel que repete
  o que o título ou a aba já dizem: sai.
- Seções numeradas 01/02/03. **Exceção**: "Como funciona", porque a sequência
  carrega informação (chama → confere → confirma, com a hora da conversa).
- Texto em gradiente; gradiente como fundo; gradiente roxo-azul.
- Vidro e blur decorativos — o nav é `paper` sólido.
- Borda lateral acima de 1px em card, item de lista ou aviso.
- Sombra dura sem contexto (`4px 4px 0`). Sombra tem offset e blur.
- Emoji ou glifo Unicode no lugar de ícone: ícone é SVG desenhado (o ✓ do
  plano é `mask-image`). Emoji dentro do roteiro de chat é conteúdo, não ícone.
- Monoespaçada como fantasia de "técnico". Aqui mono é RÓTULO (eyebrow de
  seção, marcador de etapa) e DADO curto (hora da mensagem, valor). Controle é
  Inter. Preço é display, porque é a informação principal da seção dele.
- Máscara geométrica em foto; ghost card (borda + sombra suave); cinza puro
  sem matiz; texto cinza sobre fundo colorido.
- Animação bounce/elastic; entrada idêntica em toda seção.

## Crítica (antes de propor mudança)

1. Capturas em 390/820/1280 do estado atual (`npm run medir`), lidas.
2. Veredito de especificidade, seção por seção: "isto é da Riacho ou trocável
   por qualquer SaaS?". Nomear o que é cada coisa.
3. As 10 heurísticas de Nielsen, 0–4, com o achado ao lado. `n/a` com motivo
   onde não se aplica (sem formulário, "Prevenção de erro" é n/a), e o total
   sobre o máximo aplicável, nunca sobre 40 fixo.
4. 2–3 pontos fortes específicos: o quê, e por que funciona.
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

Cinco dimensões, 0–4, cada nota com a medida ao lado:

- **Acessibilidade** — Lighthouse mobile, que não pode cair de 100; `medir`
  sem reprovação de contraste; ordem de tabulação; hierarquia `h1→h2→h3`.
- **Performance** — Lighthouse ≥ 98; CLS ≤ 0,03; imagem com proporção declarada.
- **Responsividade** — 390/820/1280; alvos; overflow.
- **Tema** — zero hex de MARCA fora do `@theme`, e todo token do `@theme` com
  consumidor:

      grep -nE '#[0-9a-fA-F]{3,6}\b' build/tailwind-input.css *.html \
        | grep -viE 'color-|theme-color|%23|#fff\b|#ffffff\b'

  A única exceção é o branco puro (`#fff`), que não é cor de marca — é o fundo
  da bolha do cliente, e o doc de marca diz explicitamente que ela é branca,
  não areia. Qualquer outra linha na saída é achado.
- **Integridade** — nenhum utilitário solto contradizendo token:
  `grep -n 'text-\[#\|bg-\[#\|\[rgba' *.html` vazio.

## Acabamento (antes de chamar o fundador)

Estados de todo controle, capturados; alinhamento óptico, não só matemático;
texto longo e curto (o nome mais longo das abas, em 390); console sem erro;
`npm run build:css` rodado e `site.css` commitado junto; captura final nos
três tamanhos em `~/para-revisao/`, **lida** antes de chamar — regra do
`AGENTS.md`: fatia de front-end confere em screenshot, sempre.

## Regras que não mudam

Texto da oferta e preço vêm do `negocio.md`. Nada de telefone de cliente, nome
de cliente ou captura de conversa real. `site.css` compilado é commitado; a
VPS não tem build. Achado sobre o `sofia-bot` ou o painel vira item da
`fila.md` do `sofia-bot`, não trabalho daqui. Deploy é `git pull` na VPS,
pela guia; linha de Nginx é do fundador. `/conectar` não se edita sem revisão.
