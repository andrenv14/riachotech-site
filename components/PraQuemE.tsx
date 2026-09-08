/* "Pra quem é" — e esta seção mudou de premissa em 08/09/2026.

   O site antigo tinha três abas fixas (`clinicas`, `saloes`, `petshops`) e
   deixava escritório e "qualquer outro negócio" de fora. O fundador corrigiu
   na janela dele: o público não é uma profissão, é **quem perde cliente porque
   ninguém respondeu o WhatsApp a tempo**. A primeira cliente é clínica, o
   segundo é escritório, e o funil real do `negocio.md` já tem corretor,
   luthier e transportes.

   Por isso a seção abre pela DOR, que é idêntica nos seis casos, e só depois
   lista os ramos — terminando com a linha que convida quem não está na lista.
   A lista existe para mostrar variedade, não para delimitar. O `negocio.md`
   diz, literal: "configuro pro seu negócio do mesmo jeito, mesmo preço".

   Formato diferente das outras duas de propósito: a 1 é linha do tempo em três
   colunas e a 2 é grade escura desigual. Esta é uma pilha de linhas largas,
   com o detalhe específico de cada ramo em monoespaçada. */

const RAMOS: { ramo: string; detalhe: string }[] = [
  { ramo: 'Clínica e consultório', detalhe: 'pergunta convênio ou particular antes de marcar' },
  { ramo: 'Escritório', detalhe: 'confirma o assunto e reserva o horário pelo tempo que ele leva' },
  { ramo: 'Barbearia e salão', detalhe: 'corte e coloração não duram o mesmo, e ela sabe disso' },
  { ramo: 'Petshop', detalhe: 'pergunta o porte do animal, porque muda a duração' },
  { ramo: 'Oficina, estúdio, ateliê', detalhe: 'mostra o preço do serviço no catálogo e marca a data' },
];

export default function PraQuemE({ zap }: { zap: string }) {
  return (
    <section id="segmentos" className="bg-paper py-24 min-[900px]:py-28">
      <div className="wrap">
        <div className="grid gap-10 min-[900px]:grid-cols-[0.92fr_1.08fr] min-[900px]:gap-16">

          <div className="min-[900px]:self-center">
            <h2 className="font-display font-semibold text-ink text-[clamp(26px,3.4vw,36px)] leading-[1.15] max-w-[16ch]">
              Suas mãos estão ocupadas e o celular está vibrando.
            </h2>
            <p className="mt-5 text-[17px] text-muted max-w-[42ch]">
              Se você para, interrompe quem está na sua frente. Se não para, a
              mensagem esfria e quem perguntou já perguntou pra outro.
            </p>
            <p className="mt-4 text-[17px] text-muted max-w-[42ch]">
              É o mesmo problema numa cadeira de dentista, numa mesa de reunião
              e num banho e tosa. Por isso a assistente é a mesma, e o preço
              também.
            </p>
          </div>

          <ul className="min-[900px]:pt-2">
            {RAMOS.map((r) => (
              <li
                key={r.ramo}
                className="grid grid-cols-1 min-[560px]:grid-cols-[13rem_1fr] gap-x-6 gap-y-1 border-t border-line py-5"
              >
                <span className="font-display text-[19px] text-ink leading-[1.3]">{r.ramo}</span>
                <span className="font-mono text-[13px] leading-[1.55] text-muted">{r.detalhe}</span>
              </li>
            ))}

            {/* A última linha é a que importa: ela desfaz a lista. Sem isso, um
                comprador que não se vê nos cinco de cima fecha a página. */}
            <li className="border-t border-line pt-6">
              <p className="font-display text-[19px] text-ink leading-[1.35] max-w-[34ch]">
                O seu negócio não está nessa lista?
              </p>
              <p className="mt-2 text-[16px] text-muted max-w-[44ch]">
                Qualquer negócio que marca hora é configurado do mesmo jeito,
                pelo mesmo preço. Não existe cobrança extra por ser diferente.
              </p>
              <a
                href={zap}
                className="mt-4 inline-flex items-center gap-2 font-medium text-[16px] text-signal hover:text-signal-dark min-h-[44px]"
              >
                Me conta como o seu atende hoje
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11.5M9 3.2 13.8 8 9 12.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
