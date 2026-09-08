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

function Mensagem() {
  return (
    <div className="rounded-[14px] bg-white border border-line px-4 py-3 max-w-[300px] shadow-[0_1px_2px_rgba(20,33,61,.05)]">
      <div className="text-[14px] text-ink leading-[1.45]">oi, tem horário livre amanhã de tarde?</div>
      <span className="mt-1.5 block text-right font-mono text-[10px] text-muted">14:02</span>
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
    <div className="rounded-[14px] bg-white border border-line p-3.5 max-w-[300px] shadow-[0_1px_2px_rgba(20,33,61,.05)]">
      <div className="font-mono text-[11px] uppercase tracking-[.12em] text-muted">amanhã, quinta</div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {faixas.map((f) => (
          <span
            key={f.h}
            className={
              f.livre
                ? 'rounded-md bg-signal text-white font-mono text-[12px] py-1.5 text-center'
                : 'rounded-md bg-paper-2 text-muted font-mono text-[12px] py-1.5 text-center line-through decoration-[1.5px]'
            }
          >
            {f.h}
          </span>
        ))}
      </div>
      <div className="mt-2.5 text-[12.5px] text-muted">dois livres, o resto já ocupado</div>
    </div>
  );
}

function Compromisso() {
  return (
    <div className="rounded-[14px] bg-white border border-line overflow-hidden max-w-[300px] shadow-[0_1px_2px_rgba(20,33,61,.05)]">
      <div className="flex">
        <span className="w-1.5 bg-signal" aria-hidden="true" />
        <div className="px-4 py-3">
          <div className="font-mono text-[11px] uppercase tracking-[.12em] text-muted">google agenda</div>
          <div className="mt-1 font-display text-[17px] text-ink leading-[1.25]">Corte e barba · Bruno</div>
          <div className="mt-0.5 font-mono text-[12px] text-muted">quinta, 16:30 · 40 min</div>
        </div>
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
    <section id="como-funciona" className="bg-paper-2 py-24 min-[900px]:pt-40 min-[900px]:pb-28">
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
              {/* A régua do tempo: uma linha fina que atravessa os três, com a
                  hora ancorada nela. No celular ela vira vertical. */}
              <span
                aria-hidden="true"
                className="regua hidden min-[900px]:block absolute top-[7px] left-0 right-0 h-px bg-line"
              />
              <span
                aria-hidden="true"
                className="regua-ponto hidden min-[900px]:block absolute top-[3px] left-0 w-[9px] h-[9px] rounded-full bg-signal"
              />
              <time className="font-mono text-[12px] tracking-[.06em] text-signal-dark">
                {p.hora}
                {i > 0 && <span className="text-muted"> {i === 1 ? '· mesmo minuto' : '· um minuto depois'}</span>}
              </time>

              <h3 className="mt-3 min-[900px]:mt-4 font-display text-[22px] text-ink leading-[1.25] max-w-[22ch]">
                {p.titulo}
              </h3>
              <p className="mt-2.5 text-[16px] text-muted max-w-[40ch]">{p.texto}</p>
              <div className="mt-6 min-[900px]:mt-8 min-[900px]:self-start">{p.artefato}</div>
            </li>
          ))}
        </ol>
        </AoEntrar>
      </div>
    </section>
  );
}
