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
        {/* Titulo e apoio no ALTO, largura cheia — nao mais numa coluna ao
            lado da lista. O fundador marcou com seta o vazio que a versao de
            duas colunas deixava no alto da direita: a coluna do texto era
            curta, a da lista era longa, e centrar uma para compensar a outra
            so mudava o vazio de lugar. Com o titulo em cima, a lista usa a
            largura inteira e nao sobra buraco. */}
        <h2 className="font-display font-semibold text-ink text-[clamp(26px,3.4vw,36px)] leading-[1.15] max-w-[16ch]">
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

        <ul className="mt-14">
          {RAMOS.map((r) => (
            <li
              key={r.ramo}
              className="grid grid-cols-1 min-[560px]:grid-cols-[minmax(14rem,22rem)_1fr] gap-x-10 gap-y-1 border-t border-line py-6"
            >
              <span className="font-display text-[21px] text-ink leading-[1.3]">{r.ramo}</span>
              <span className="font-mono text-[13.5px] leading-[1.55] text-muted min-[560px]:pt-1.5">
                {r.detalhe}
              </span>
            </li>
          ))}
        </ul>

        {/* A ultima linha desfaz a lista. Sem ela, um comprador que nao se ve
            nos cinco de cima fecha a pagina. */}
        <div className="mt-10 border-t-2 border-ink/15 pt-8 grid gap-6 min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-end">
          <div>
            <p className="font-display text-[22px] text-ink leading-[1.3] max-w-[30ch]">
              O seu negócio não está nessa lista?
            </p>
            <p className="mt-2.5 text-[16px] text-muted max-w-[54ch]">
              Qualquer negócio que marca hora é configurado do mesmo jeito, pelo
              mesmo preço. Não existe cobrança extra por ser diferente.
            </p>
          </div>
          <a
            href={zap}
            className="btn btn-ghost self-start min-[820px]:self-end whitespace-nowrap"
          >
            Me conta como o seu atende hoje
          </a>
        </div>
      </div>
    </section>
  );
}
