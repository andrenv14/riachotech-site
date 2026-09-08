'use client';

import { useState } from 'react';

/* O ARTEFATO da página que vende landing page: uma landing page inteira,
   desenhada como peça clara sobre o navy, com as seções tocáveis.

   Por que ele é assim, e não outra coisa:

   - É a peça `.peca` de `app/globals.css`, a mesma da seção "O que ela faz" da
     home. Objeto claro sobre escuro lê como tela capturada do produto. Nada de
     desenhar um segundo aparelho: o celular já mora no hero da home, e o mesmo
     objeto do produto desenhado de dois jeitos lê como duas coisas.
   - A página aparece INTEIRA, sem corte. Isso não é acaso de layout: o que se
     vende é uma página só, e mostrar a página só cabendo na peça é o argumento
     acontecendo em vez de ser afirmado.
   - Cada bloco é um `<button>` de largura cheia, e é por isso que ele passa nos
     44px de alvo de toque sem regra especial: quem dá altura é o conteúdo do
     bloco, não um `min-height` pendurado.

   O QUE A INTERAÇÃO MOSTRA é o mecanismo que a casa vende, e só ele: cada seção
   tem um botão de WhatsApp com o texto já preenchido, e tocar a seção mostra o
   texto que chega do outro lado. Não existe API, não existe horário livre
   aparecendo no site, e a peça não sugere que exista — a versão com API está
   fora da oferta em `docs/contexto/negocio.md` do sofia-bot.

   O botão desenhado DENTRO do bloco é parte do desenho da página do cliente,
   não um controle desta página: quem responde ao toque é o bloco inteiro, que o
   contém. Assim não há affordance que não faz nada.

   Sem JS a peça continua inteira e legível, com a primeira seção acesa e a
   mensagem dela à mostra: o que se perde é a troca, não o conteúdo. */

/* O negócio é inventado, e é preciso que seja: nome de cliente, telefone de
   cliente e captura de conversa real não entram no site. Mesmo critério da
   "Camila Nunes" e do "Bruno" da home. */
const SECOES = [
  {
    id: 'topo',
    rotulo: 'topo',
    titulo: 'Cabelo bom, hora marcada.',
    apoio: 'Corte, coloração e escova no Sudoeste.',
    botao: 'Marcar horário',
    mensagem: 'Oi! Vim pelo site. Queria marcar um horário.',
  },
  {
    id: 'servicos',
    rotulo: 'serviços',
    titulo: 'O que a gente faz',
    apoio: 'Corte · Coloração · Escova · Hidratação',
    botao: 'Perguntar sobre coloração',
    mensagem: 'Oi! Vim pelo site. Queria saber sobre coloração.',
  },
  {
    id: 'horarios',
    rotulo: 'horários',
    titulo: 'Quando a gente abre',
    apoio: 'Terça a sábado, das 9h às 19h.',
    botao: 'Ver se tem sábado',
    mensagem: 'Oi! Vim pelo site. Vocês têm horário no sábado?',
  },
];

export default function MiniPagina() {
  const [ativa, setAtiva] = useState(0);
  const secao = SECOES[ativa];

  return (
    <div className="w-full max-w-[420px] mx-auto min-[900px]:mx-0">

      {/* A PÁGINA. `overflow-hidden` fica de fora de propósito: quem arredonda
          é o filho, com o próprio raio. Recorte no pai deixa um fio da cor do
          pai entre o filho de canto reto e a borda — a família de defeito que
          já custou quatro voltas no celular da home. */}
      <div className="peca">

        {/* A barra do site do cliente. Ela não é tocável: é moldura, e marcar
            como controle o que não responde é a affordance falsa que esta peça
            existe para não ter. */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[color:var(--color-line)]">
          <div className="font-display text-[15px] text-ink leading-none">Salão Aurora</div>
          <div className="font-mono text-[9.5px] uppercase tracking-[.12em] text-muted">sudoeste</div>
        </div>

        {SECOES.map((s, i) => {
          const acesa = i === ativa;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={acesa}
              onClick={() => setAtiva(i)}
              className={`mini-bloco ${i === 0 ? 'mini-bloco-topo' : ''} ${
                acesa ? 'mini-bloco-acesa' : ''
              }`}
            >
              {/* O rótulo mono existe nas SEÇÕES, e não no topo. "SERVIÇOS" e
                  "HORÁRIOS" são coisas que uma página de verdade escreve; "TOPO"
                  não é — era anotação minha sobre a peça, e uma página anotada
                  lê como diagrama de página, não como página. Foi o defeito que
                  o fundador chamou de "herói fraquíssimo", junto com o topo ter
                  a mesma altura das outras faixas. */}
              {i > 0 && (
                <span className="font-mono text-[9.5px] uppercase tracking-[.13em] text-muted">
                  {s.rotulo}
                </span>
              )}

              {/* A ESCALA DENTRO DA PEÇA, e ela é o que fazia a peça inteira
                  ler como formulário em vez de página: os três blocos tinham
                  título quase do mesmo tamanho, e página de verdade tem um topo
                  que domina. O topo vai a 27px contra os 16px das seções, que é
                  a mesma tensão de escala que a seção de preço da home usa. */}
              <span
                className={`block font-display leading-[1.1] text-ink ${
                  i === 0 ? 'text-[30px] max-w-[12ch]' : 'mt-1.5 text-[16px]'
                }`}
              >
                {s.titulo}
              </span>

              {/* Sobre o `sand` a linha de apoio NÃO usa `muted`: medido,
                  `muted` sobre a faixa quente dá 4,18:1, abaixo dos 4,5 que o
                  chão exige. A `design-site` já avisa que `muted` sobre
                  `paper-2` é o par mais apertado do site, com 4,64 — sobre
                  `sand` ele fica pior ainda. Nas faixas brancas `muted` continua
                  valendo, e ali ele passa com folga. */}
              <span
                className={`block leading-[1.45] ${
                  i === 0 ? 'mt-2.5 text-[14px] text-ink/75' : 'mt-1 text-[13px] text-muted'
                }`}
              >
                {s.apoio}
              </span>

              {/* O botão da página do CLIENTE. É desenho — quem escuta o toque
                  é o bloco em volta —, então ele não é um `<button>` aninhado,
                  que seria HTML inválido e um alvo que engole o clique do pai. */}
              <span className="mini-zap">
                <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" fill="currentColor">
                  <path d="M8 0a8 8 0 00-6.9 12L0 16l4.1-1.1A8 8 0 108 0zm4.6 11.3c-.2.5-1 1-1.4 1-.4.1-.8.1-1.3-.1a11 11 0 01-4.8-4.2c-.4-.6-.6-1.2-.6-1.8 0-.6.3-1 .5-1.2.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c0 .1.1.3 0 .4l-.3.4-.2.3c-.1.1-.2.2 0 .4a7.4 7.4 0 003.2 2.6c.2.1.3.1.4 0l.7-.8c.1-.2.3-.1.4-.1l1.4.7c.2.1.3.2.4.3v.6z" />
                </svg>
                {s.botao}
              </span>
            </button>
          );
        })}

        {/* Rodapé do site do cliente: fecha a página para o olho entender que
            ela ACABOU ali, que é o que "uma página só" quer dizer.

            CURTO e à DIREITA porque o painel de mensagem sobe por cima do canto
            inferior ESQUERDO da peça. Com o texto longo à esquerda, o painel
            cortava a linha no meio de uma palavra — e palavra cortada ao meio lê
            como defeito de recorte, não como um objeto na frente do outro. */}
        <div className="px-5 py-3 border-t border-[color:var(--color-line)] text-right font-mono text-[9.5px] uppercase tracking-[.12em] text-muted">
          instagram · como chegar
        </div>
      </div>

      {/* A MENSAGEM que aquele botão manda. Peça própria, e no PC ela SOBE por
          cima do pé da página e escapa para a esquerda: é o outro lado do mesmo
          mecanismo, e objeto que se sobrepõe lê como estando mais perto — a
          profundidade que a `nao-slop` mede como a alavanca mais forte.

          O deslocamento também conserta um vão medido: com a peça sentada
          embaixo da página, sobrava um quarto de tela vazio à esquerda dela, no
          canto do herói. `z-10` porque sem ele a sobreposição fica por baixo e
          o efeito se inverte. */}
      <div className="peca relative z-10 mt-5 min-[900px]:-mt-12 min-[900px]:-ml-28 max-w-[330px] p-4">
        <div className="font-mono text-[9.5px] uppercase tracking-[.13em] text-muted">
          chega assim no seu whatsapp
        </div>
        {/* `key` na bolha: sem ele o React reaproveita o nó e o texto troca sem
            que a animação de entrada rode. Com ele, cada mensagem é um elemento
            novo e a chegada se vê. */}
        <div key={secao.id} className="mt-2.5 flex justify-end">
          <span className="fala-peca fala-peca-cliente mini-chega">{secao.mensagem}</span>
        </div>
      </div>
    </div>
  );
}
