/* "Como funciona" — o fluxo, do primeiro oi ao horário na agenda.

   A sequência é carregada pela HORA, não por `01 — 02 — 03`. Motivo: o rótulo
   numerado é um dos padrões que a taste-skill nomeia como cara-de-IA (o
   exemplo dela, `001 · Capabilities`, é quase idêntico ao que o site tinha), e
   o `detectar-tells.js` o acusa. A hora resolve melhor do que apenas evitar:
   ela é DADO — o mesmo papel de monoespaçada que já vive dentro da bolha de
   mensagem, e que o doc de marca chama da assinatura visual mais distinta da
   casa. Um ordinal diz "este é o segundo"; a hora diz "isto levou um minuto",
   que é o argumento de venda.

   Cada passo mostra o artefato em vez de descrevê-lo: a mensagem que chega, a
   grade de horários sendo consultada, e o compromisso escrito. Nada de grade
   de cards com ícone e título, que a `design-site` proíbe como estrutura. */

import AoEntrar from '@/components/AoEntrar';

type Passo = {
  hora: string;
  titulo: string;
  texto: string;
  artefato: React.ReactNode;
};

/* DUAS mensagens, e não uma. Gente escreve em rajada, e a segunda é o que
   arma o passo seguinte: ela pede "depois das 15h", e a grade ao lado mostra
   livres exatamente 15:00 e 16:30. Antes o artefato era uma bolha só, metade
   da altura das vizinhas da mesma faixa — o vão vinha de falta de conteúdo, e
   se fecha com conteúdo verdadeiro, não com espaçador. */
function Mensagem() {
  return (
    <div className="flex h-full flex-col gap-2 max-w-[300px]">
      <div className="peca-clara px-4 py-3">
        <div className="text-[14px] text-ink leading-[1.45]">oi, tem horário livre amanhã de tarde?</div>
        <span className="mt-1.5 block text-right font-mono text-[10px] text-muted">14:02</span>
      </div>
      <div className="peca-clara mt-auto px-4 py-3">
        <div className="text-[14px] text-ink leading-[1.45]">pode ser depois das 15h</div>
        <span className="mt-1.5 block text-right font-mono text-[10px] text-muted">14:02</span>
      </div>
    </div>
  );
}

function Grade() {
  const faixas = [
    { h: '09:00', livre: false },
    { h: '10:30', livre: false },
    { h: '14:00', livre: false },
    { h: '15:00', livre: true },
    { h: '16:30', livre: true },
    { h: '18:00', livre: false },
  ];
  return (
    <div className="peca-clara flex h-full flex-col p-3.5 max-w-[300px]">
      <div className="font-mono text-[11px] uppercase tracking-[.12em] text-muted">amanhã, quinta</div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {faixas.map((f) => (
          <span
            key={f.h}
            className={
              f.livre
                ? 'faixa faixa-livre rounded-md bg-signal text-white font-mono text-[12px] py-1.5 text-center'
                : 'faixa rounded-md bg-paper-2 text-muted font-mono text-[12px] py-1.5 text-center line-through decoration-[1.5px]'
            }
          >
            {f.h}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-2.5 text-[12.5px] text-muted">dois livres, o resto já ocupado</div>
    </div>
  );
}

/* O MESMO evento de agenda que a peça de "o que ela faz" mostra, desenhado do
   mesmo jeito: barra de acento estreita ao lado do texto, título em sans, o dia
   com a faixa de horas, e o rodapé mono com a agenda de destino e a autoria.

   Antes eram dois desenhos para o mesmo objeto do mesmo produto — aqui com
   título em SERIFA, barra larga sangrando na borda e sem contexto; lá com sans,
   barra estreita e a linha de quem criou. O leitor passa pelos dois na mesma
   rolagem, e objeto que muda de forma entre duas telas lê como duas coisas.

   Some junto o `overflow-hidden` que a barra sangrada exigia — recorte em canto
   arredondado é a família de defeito que já custou quatro voltas no celular. */
function Compromisso() {
  return (
    <div className="peca-clara flex h-full flex-col px-4 py-3.5 max-w-[300px]">
      <div className="font-mono text-[11px] uppercase tracking-[.12em] text-muted">google agenda</div>
      <div className="mt-3 flex gap-3">
        <span aria-hidden="true" className="mt-0.5 h-[36px] w-[3px] flex-shrink-0 rounded-full bg-signal" />
        <div className="min-w-0">
          <div className="text-[14.5px] font-semibold leading-[1.3] text-ink">Corte e barba · Bruno</div>
          <div className="mt-1 text-[13.5px] text-muted">quinta, 12 · 16:30 às 17:10</div>
        </div>
      </div>
      <div className="mt-auto pt-3 font-mono text-[11px] leading-[1.6] text-muted">
        na agenda do Bruno
        <br />
        criado pela Sofia às 14:03
      </div>
    </div>
  );
}

const PASSOS: Passo[] = [
  {
    hora: '14:02',
    titulo: 'O cliente escreve do jeito que fala',
    texto:
      'Sem menu, sem digite 1. Ela entende a pergunta em português normal, a qualquer hora, inclusive no domingo à noite.',
    artefato: <Mensagem />,
  },
  {
    hora: '14:02',
    titulo: 'Ela abre a sua agenda de verdade',
    texto:
      'Não é uma tabela de horários que alguém digitou. É o seu Google Agenda, no momento da pergunta, com o que já está ocupado fora da conta.',
    artefato: <Grade />,
  },
  {
    hora: '14:03',
    titulo: 'O horário fica marcado, e você nem parou',
    texto:
      'O compromisso entra na agenda com nome e duração. Perto do dia, ela manda o lembrete sozinha.',
    artefato: <Compromisso />,
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-paper-2 textura textura-clara py-24 min-[900px]:pt-40 min-[900px]:pb-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[16ch]">
          Da mensagem ao horário marcado, em uma conversa só.
        </h2>
        <p className="mt-4 text-[17px] text-muted max-w-[52ch]">
          Do primeiro oi ao horário na agenda, sem ninguém parar o que estava
          fazendo.
        </p>

        {/* subgrid alinha hora, titulo, texto e artefato na MESMA linha nas
            tres colunas. Sem isso cada coluna comeca onde o texto dela acabou,
            e a fileira de artefatos fica esfarrapada. */}
        <AoEntrar>
        <ol className="mt-14 space-y-12 min-[900px]:space-y-0 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-10 min-[900px]:grid-rows-[auto_auto_1fr_auto]">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="relative min-[900px]:pt-8 min-[900px]:grid min-[900px]:row-span-4 min-[900px]:grid-rows-subgrid min-[900px]:gap-0">
              {/* A régua do tempo: um trilho fino que atravessa os três, com a
                  hora ancorada nele. No celular ela some.

                  São DUAS camadas. O trilho cinza está sempre inteiro; por cima
                  dele o rastro azul cresce da esquerda para a direita levando o
                  ponto na ponta, um passo de cada vez. Antes o que crescia era o
                  próprio trilho, em cinza, e o ponto só acendia parado na
                  largada — o movimento existia e não se via, porque nada mudava
                  de cor no caminho. */}
              <span
                aria-hidden="true"
                className="hidden min-[900px]:block absolute top-[7px] left-0 right-0 h-px bg-line"
              />
              <span
                aria-hidden="true"
                className="rastro hidden min-[900px]:block absolute top-[7px] left-0 h-px bg-signal"
              >
                <span aria-hidden="true" className="regua-ponto" />
              </span>
              <time className="font-mono text-[12px] tracking-[.06em] text-signal-dark">
                {p.hora}
                {i > 0 && <span className="text-muted"> {i === 1 ? '· mesmo minuto' : '· um minuto depois'}</span>}
              </time>

              <h3 className="mt-3 min-[900px]:mt-4 font-display text-[22px] text-ink leading-[1.25] max-w-[22ch]">
                {p.titulo}
              </h3>
              <p className="mt-2.5 text-[16px] text-muted max-w-[40ch]">{p.texto}</p>
              {/* Sem `self-start`: a faixa do artefato ESTICA, e as três peças
                  ficam com topo e pé na mesma linha. Medido antes, em 1280: os
                  três começavam juntos em 1519 e terminavam em 1587, 1675 e
                  1609 — 88px de diferença, o mesmo defeito que as outras cinco
                  seções já não tinham. Quem distribui é cada peça por dentro,
                  com `mt-auto` no último bloco. */}
              <div className="mt-6 min-[900px]:mt-8">{p.artefato}</div>
            </li>
          ))}
        </ol>
        </AoEntrar>
      </div>
    </section>
  );
}
