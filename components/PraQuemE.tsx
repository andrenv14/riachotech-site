'use client';

import { useState } from 'react';

/* "Pra quem é" — e esta seção mudou de premissa em 08/09/2026.

   O site antigo tinha três abas fixas (`clinicas`, `saloes`, `petshops`) e
   deixava escritório e "qualquer outro negócio" de fora. O fundador corrigiu:
   o público não é uma profissão, é quem perde cliente porque ninguém respondeu
   o WhatsApp a tempo. A primeira cliente é clínica, o segundo é escritório, e o
   funil real já tem corretor, luthier e transportes.

   Por isso a seção abre pela DOR, que é idêntica em todos os casos, e a lista
   existe para mostrar variedade, não para delimitar — termina com a linha que
   convida quem não está nela.

   A lista é INTERATIVA: cada ramo abre a conversa daquele negócio. Isso não é
   enfeite. O que diferencia a assistente do disparador de R$97 é ela chegar
   configurada para o jeito daquele negócio, e afirmar isso numa frase convence
   menos do que mostrar a pergunta que ela faz. Cada troca abaixo sai da tabela
   de kits do `docs/contexto/negocio.md`: convênio na clínica, porte no petshop,
   duração por serviço na barbearia. */

type Ramo = {
  ramo: string;
  detalhe: string;
  conversa: { de: 'cliente' | 'sofia'; texto: string }[];
};

const RAMOS: Ramo[] = [
  {
    ramo: 'Clínica e consultório',
    detalhe: 'pergunta convênio ou particular antes de marcar',
    conversa: [
      { de: 'cliente', texto: 'queria marcar uma avaliação' },
      { de: 'sofia', texto: 'Claro! Vai ser pelo convênio ou particular?' },
      { de: 'cliente', texto: 'particular' },
      { de: 'sofia', texto: 'Perfeito. Tenho quinta às 15h ou sexta às 9h30. Qual fica melhor?' },
    ],
  },
  {
    ramo: 'Escritório',
    detalhe: 'confirma o assunto e reserva o horário pelo tempo que ele leva',
    conversa: [
      { de: 'cliente', texto: 'preciso de uma reunião essa semana' },
      { de: 'sofia', texto: 'Certo. É sobre um caso novo ou algo que já está em andamento?' },
      { de: 'cliente', texto: 'caso novo' },
      { de: 'sofia', texto: 'Então reservo uma hora. Quinta às 14h está livre.' },
    ],
  },
  {
    ramo: 'Barbearia e salão',
    detalhe: 'corte e coloração não duram o mesmo, e ela sabe disso',
    conversa: [
      { de: 'cliente', texto: 'tem horário hoje pra corte e barba?' },
      { de: 'sofia', texto: 'Tenho. Corte e barba levam 40 minutos, e hoje ainda tem 17h com o Bruno.' },
      { de: 'cliente', texto: 'e se fosse coloração?' },
      { de: 'sofia', texto: 'Aí são duas horas, então o próximo espaço é amanhã de manhã.' },
    ],
  },
  {
    ramo: 'Petshop',
    detalhe: 'pergunta o porte do animal, porque muda a duração',
    conversa: [
      { de: 'cliente', texto: 'quero marcar banho e tosa' },
      { de: 'sofia', texto: 'Vamos lá! Qual o porte do seu cão?' },
      { de: 'cliente', texto: 'é um golden' },
      { de: 'sofia', texto: 'Porte grande leva mais tempo, então reservo duas horas. Amanhã às 10h?' },
    ],
  },
  {
    ramo: 'Oficina, estúdio, ateliê',
    detalhe: 'mostra o preço do serviço no catálogo e marca a data',
    conversa: [
      { de: 'cliente', texto: 'quanto fica a revisão completa?' },
      { de: 'sofia', texto: 'A revisão completa está R$380 e leva meio período.' },
      { de: 'cliente', texto: 'pode ser na terça' },
      { de: 'sofia', texto: 'Marcado, terça de manhã. Mando um lembrete na véspera.' },
    ],
  },
];

const ZAP_RAMO = 'https://wa.me/5561999643707?text=Oi%2C%20quero%20conhecer%20a%20Sofia';

export default function PraQuemE({ zap = ZAP_RAMO }: { zap?: string }) {
  const [aberto, setAberto] = useState<string | null>(RAMOS[0].ramo);

  return (
    <section id="segmentos" className="bg-paper py-24 min-[900px]:py-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[15ch]">
          Suas mãos estão ocupadas e o celular está vibrando.
        </h2>
        <div className="mt-5 grid gap-x-14 gap-y-4 min-[820px]:grid-cols-2 max-w-[76ch]">
          <p className="text-[17px] text-muted">
            Se você para, interrompe quem está na sua frente. Se não para, a
            mensagem esfria e quem perguntou já perguntou pra outro.
          </p>
          <p className="text-[17px] text-muted">
            É o mesmo problema numa cadeira de dentista, numa mesa de reunião e
            num banho e tosa. Por isso a assistente é a mesma, e o preço também.
          </p>
        </div>

        {/* rótulo em monoespaçada não é prosa do documento: <div>, como as
            outras. O `medir` acusa <p> abaixo de 16px, e com razão. */}
        <div className="mt-12 font-mono text-[12px] uppercase tracking-[.13em] text-muted">
          toque num ramo e veja como ela conversa
        </div>

        <ul className="mt-4">
          {RAMOS.map((r) => {
            const ativo = aberto === r.ramo;
            return (
              <li key={r.ramo} className="border-t border-line">
                <button
                  type="button"
                  onClick={() => setAberto(ativo ? null : r.ramo)}
                  aria-expanded={ativo}
                  className="w-full grid grid-cols-1 min-[560px]:grid-cols-[minmax(14rem,22rem)_1fr_auto] gap-x-10 gap-y-1 py-6 text-left min-h-[44px] group"
                >
                  <span className={`font-display text-[21px] leading-[1.3] ${ativo ? 'text-signal-dark' : 'text-ink'}`}>
                    {r.ramo}
                  </span>
                  <span className="font-mono text-[13.5px] leading-[1.55] text-muted min-[560px]:pt-1.5">
                    {r.detalhe}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`hidden min-[560px]:block mt-2 h-[9px] w-[9px] rounded-full transition-colors ${
                      ativo ? 'bg-signal' : 'bg-line group-hover:bg-muted'
                    }`}
                  />
                </button>

                {/* A conversa daquele ramo. `grid-template-rows` de 0fr para 1fr
                    abre sem eu precisar medir altura em JS, e sem travar em
                    `max-height` chutado, que corta texto longo em silêncio. */}
                <div
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                    ativo ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 flex flex-col gap-2 max-w-[46ch] min-[560px]:ml-[calc(14rem+2.5rem)]">
                      {r.conversa.map((m, i) => (
                        <div
                          key={i}
                          className={`bubble ${m.de === 'cliente' ? 'bubble-cliente' : 'bubble-sofia'} !opacity-100 !translate-y-0 !animate-none`}
                          style={{ maxWidth: '86%' }}
                        >
                          {m.texto}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

          <li className="border-t-2 border-ink/15 pt-8 mt-2 grid gap-6 min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-end">
            <div>
              <p className="font-display text-[22px] text-ink leading-[1.3] max-w-[30ch]">
                O seu negócio não está nessa lista?
              </p>
              <p className="mt-2.5 text-[16px] text-muted max-w-[54ch]">
                Qualquer negócio que marca hora é configurado do mesmo jeito, pelo
                mesmo preço. Não existe cobrança extra por ser diferente.
              </p>
            </div>
            <a href={zap} className="btn btn-ghost self-start min-[820px]:self-end whitespace-nowrap">
              Me conta como o seu atende hoje
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
