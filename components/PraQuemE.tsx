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


/* Ícones desenhados à mão em SVG, traço de 1,6 e ponta arredondada, todos na
   mesma caixa de 20. A `design-site` manda que ícone seja SVG desenhado, e não
   emoji nem imagem: emoji muda de desenho por sistema, e ícone gerado por IA
   não fecha traço de perto. Eles herdam `currentColor`, então acompanham o
   estado de selecionado sem regra extra. */
const traco = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ICONES: Record<string, React.ReactNode> = {
  clinica: (
    <>
      <path d="M10 3.5v13M3.5 10h13" {...traco} />
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" {...traco} opacity=".45" />
    </>
  ),
  escritorio: (
    <>
      <rect x="2.5" y="5.5" width="15" height="11" rx="2" {...traco} />
      <path d="M7 5.5V4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 13 4v1.5M2.5 10h15" {...traco} />
    </>
  ),
  barbearia: (
    <>
      <circle cx="5" cy="14.5" r="2.5" {...traco} />
      <circle cx="15" cy="14.5" r="2.5" {...traco} />
      <path d="M6.8 12.7 15.5 3M13.2 12.7 4.5 3" {...traco} />
    </>
  ),
  petshop: (
    <>
      <ellipse cx="10" cy="13.2" rx="4" ry="3.3" {...traco} />
      <ellipse cx="4.6" cy="8.4" rx="1.7" ry="2.1" {...traco} />
      <ellipse cx="15.4" cy="8.4" rx="1.7" ry="2.1" {...traco} />
      <ellipse cx="8.2" cy="4.6" rx="1.6" ry="2" {...traco} />
      <ellipse cx="13.4" cy="4.9" rx="1.5" ry="1.9" {...traco} />
    </>
  ),
  oficina: (
    <>
      <path d="M12.6 3.2a4 4 0 0 0-5 5L3 12.8a1.8 1.8 0 0 0 2.5 2.5l4.6-4.6a4 4 0 0 0 5-5l-2.4 2.4-2-2 2.4-2.4Z" {...traco} />
    </>
  ),
};

function Icone({ nome }: { nome: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="flex-shrink-0">
      {ICONES[nome]}
    </svg>
  );
}

type Ramo = {
  icone: string;
  ramo: string;
  detalhe: string;
  conversa: { de: 'cliente' | 'sofia'; texto: string }[];
};

const RAMOS: Ramo[] = [
  {
    icone: 'clinica',
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
    icone: 'escritorio',
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
    icone: 'barbearia',
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
    icone: 'petshop',
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
    icone: 'oficina',
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
        {/* Título à esquerda e a CENA à direita. A imagem entra aqui e em
            nenhum outro lugar da página: é o único ponto em que a fotografia
            faz o que o texto não faz — o comprador se reconhecer antes de ler.
            O celular está de barriga para cima no balcão, com notificação, e as
            mãos do dono estão ocupadas no fundo. É o título virando cena. */}
        <div className="grid gap-10 min-[900px]:grid-cols-[1fr_0.85fr] min-[900px]:gap-14 min-[900px]:items-center">
          <div>
            <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[15ch]">
              Suas mãos estão ocupadas e o celular está vibrando.
            </h2>
            <p className="mt-5 text-[17px] text-muted max-w-[46ch]">
              Se você para, interrompe quem está na sua frente. Se não para, a
              mensagem esfria e quem perguntou já perguntou pra outro.
            </p>
            <p className="mt-4 text-[17px] text-muted max-w-[46ch]">
              É o mesmo problema numa cadeira de dentista, numa mesa de reunião e
              num banho e tosa. Por isso a assistente é a mesma, e o preço também.
            </p>
          </div>

          {/* `width`/`height` declarados porque a design-site exige e porque é
              o que segura o CLS em zero. `loading="lazy"`: a seção é a quarta
              da página, então ela nunca abre na primeira tela.
              eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dor-celular-no-balcao.webp"
            alt="Um celular de barriga para cima no balcão de um pequeno negócio, com mensagens não lidas na tela, enquanto o dono trabalha ao fundo com as mãos ocupadas."
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-auto rounded-[var(--radius-card)] border border-line"
          />
        </div>

        {/* rótulo em monoespaçada não é prosa do documento: <div>, como as
            outras. O `medir` acusa <p> abaixo de 16px, e com razão. */}
        {/* Ramos a ESQUERDA, conversa a DIREITA e no mesmo lugar sempre.

            Antes era um acordeao de largura cheia com um painel estreito
            aberto embaixo — largo em cima, estreito no meio, e o fundador
            apontou que nao combinava. Com duas colunas o painel ocupa a coluna
            inteira, nao ha desencontro de largura, e a pagina para de pular:
            trocar de ramo troca o CONTEUDO do painel, nao a altura da secao.

            No celular as duas colunas empilham e o painel fica logo abaixo da
            lista, que ali e' curta. */}
        <div className="mt-12 font-mono text-[12px] uppercase tracking-[.13em] text-muted">
          toque num ramo e veja como ela conversa
        </div>

        <div className="mt-5 grid gap-8 min-[900px]:grid-cols-[0.74fr_1.26fr] min-[900px]:gap-14 min-[900px]:items-start">
          <ul>
            {RAMOS.map((r) => {
              const ativo = aberto === r.ramo;
              return (
                <li key={r.ramo} className={ativo ? "" : "border-t border-line"}>
                  <button
                    type="button"
                    onClick={() => setAberto(r.ramo)}
                    aria-pressed={ativo}
                    className={`relative w-full flex items-start gap-3.5 py-5 pl-4 pr-3 -ml-4 text-left min-h-[44px] rounded-[10px] cursor-pointer transition-colors ${
                      ativo
                        ? 'bg-paper-2 text-signal-dark'
                        : 'text-ink hover:bg-paper-2/60 hover:text-signal'
                    }`}
                  >
                    {/* Barra de acento: e' ela que diz "este esta escolhido".
                        Sem ela, a selecao era so uma mudanca de cor de texto,
                        que se confunde com o hover — e o anel azul que aparecia
                        na tela era o foco do teclado, nao a selecao. */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-colors ${
                        ativo ? 'bg-signal' : 'bg-transparent'
                      }`}
                    />
                    <span className={`mt-0.5 ${ativo ? 'text-signal' : 'text-muted'}`}>
                      <Icone nome={r.icone} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[20px] leading-[1.25]">{r.ramo}</span>
                      <span className="mt-1 block font-mono text-[12.5px] leading-[1.5] text-muted">
                        {r.detalhe}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="painel-conversa min-[900px]:sticky min-[900px]:top-[86px]">
            <div className="cabeca">
              <span className="av" aria-hidden="true">S</span>
              <span>Sofia</span>
              <span className="status">online</span>
              <span className="ml-auto font-mono text-[10px] font-normal text-sky-2">
                {(RAMOS.find((r) => r.ramo === aberto) ?? RAMOS[0]).ramo.split(/[\s,]+/)[0].toLowerCase()}
              </span>
            </div>
            <div className="fala">
              {(RAMOS.find((r) => r.ramo === aberto) ?? RAMOS[0]).conversa.map((m, i) => (
                <div
                  key={`${aberto}-${i}`}
                  className={`bubble ${m.de === 'cliente' ? 'bubble-cliente' : 'bubble-sofia'}`}
                >
                  {m.texto}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t-2 border-ink/15 pt-8 grid gap-6 min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-end">
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
        </div>
      </div>
    </section>
  );
}
