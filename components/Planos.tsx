/* "Planos" — e aqui a landing page deixa de ser apêndice.

   Até 08/09/2026 o site vendia a landing page como um card no canto da seção
   de preço da assistente, com o título "Só o site também dá". Decisão do
   fundador na janela dele: são DUAS ofertas, não uma com acessório. Elas
   ganham colunas de mesmo peso, e a landing page ganha página própria depois.

   Também é aqui que mora o contraste de escala que faltava na página inteira:
   o preço em display grande com a monoespaçada minúscula colada nele. Até
   agora tudo era médio, e página sem salto de tamanho lê como morna. Os dois
   papéis já existem na marca; o que faltava era pô-los em tensão. */

function Preco({ valor, nota }: { valor: string; nota: string }) {
  return (
    <div className="flex items-baseline gap-2.5 flex-wrap">
      <span className="font-display font-semibold text-ink text-[clamp(44px,7vw,64px)] leading-[0.95] tracking-[-0.02em]">
        {valor}
      </span>
      <span className="font-mono text-[11.5px] uppercase tracking-[.13em] text-muted">{nota}</span>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="plan-item text-[16px] text-ink/85">{children}</li>
  );
}

export default function Planos({ zap }: { zap: string }) {
  /* O cartão da landing page manda para a PÁGINA dela, não direto para o
     WhatsApp, e essa é a única assimetria entre os dois cartões desta seção.
     Ela é deliberada: a assistente tem a página inteira em volta para explicar
     o que é, e a landing page tinha só quatro linhas — pedir a conversa ali é
     pedir decisão antes de haver o que decidir. `/landing-page/` é o argumento
     que faltava, e o botão do combo continua indo direto porque quem clica nele
     já leu as duas colunas. */
  const paginaSite = '/landing-page/';
  const zapCombo = 'https://wa.me/5561999643707?text=Quero%20a%20assistente%20com%20site';

  return (
    <section id="planos" className="planos-luz textura textura-clara py-24 min-[900px]:py-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[16ch]">
          Duas coisas que fazemos, e o preço das duas é público.
        </h2>
        <p className="mt-4 text-[17px] text-muted max-w-[52ch]">
          Existe programa mais barato, em que você mesmo monta os caminhos:
          digite 1 para agendar, digite 2 para preço. Aqui é outra coisa. A
          assistente conversa de verdade e chega configurada pro seu negócio,
          sem você montar fluxo nem aprender ferramenta nenhuma.
        </p>

        <div className="mt-14 grid gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-8 items-stretch">

          {/* A assistente — e ela e' a oferta PRINCIPAL, o que o desenho nao
              dizia: os dois cartoes eram gemeos, mesmo rotulo, mesmo peso,
              mesma lista, e secao de preco sem hierarquia le como tabela. A
              barra de acento no topo e' a mesma peca que marca o ramo escolhido
              na `PraQuemE` — vocabulario que a pagina ja tem, nao enfeite novo. */}
          <div className="cartao-plano cartao-principal flex flex-col p-7 min-[900px]:p-9">
            <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-signal">a assistente</div>
            <h3 className="mt-3 font-display text-[25px] text-ink leading-[1.25] max-w-[20ch]">
              Ela atende no WhatsApp do seu negócio
            </h3>

            <div className="mt-7">
              <Preco valor="R$1.000" nota="implantação · ou 2× de R$500" />
              <div className="mt-4">
                <Preco valor="R$200" nota="por mês · conversas sem limite" />
              </div>
            </div>

            <ul className="mt-7 mb-8">
              <Item>Atende sozinha, conversando de verdade</Item>
              <Item>Marca, cancela e remarca na sua agenda real</Item>
              <Item>Lembra o cliente antes do horário</Item>
              <Item>Mostra catálogo com foto e cobra por Pix</Item>
              <Item>Passa pra você quando o caso pede gente</Item>
            </ul>

            <a href={zap} className="btn btn-primary mt-auto self-start">Falar no WhatsApp</a>
          </div>

          {/* A landing page — mesmo peso, mesma coluna, mesmo tamanho */}
          <div className="cartao-plano flex flex-col p-7 min-[900px]:p-9">
            <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-signal">a landing page</div>
            <h3 className="mt-3 font-display text-[25px] text-ink leading-[1.25] max-w-[20ch]">
              Uma página que faz o cliente te achar
            </h3>

            <div className="mt-7">
              <Preco valor="R$750" nota="pagamento único · sem mensalidade" />
              <p className="mt-4 text-[16px] text-muted max-w-[34ch]">
                Escopo fechado por escrito antes de começar, com uma rodada de
                revisão inclusa.
              </p>
            </div>

            <ul className="mt-7 mb-8">
              <Item>Uma página, com as seções fechadas por escrito antes de começar</Item>
              <Item>Uma rodada de revisão inclusa no preço</Item>
              <Item>Botão de WhatsApp com a mensagem já preenchida em cada seção</Item>
              <Item>O conteúdo é seu; a escrita e o desenho ficam com a gente</Item>
            </ul>

            <a href={paginaSite} className="btn btn-ghost mt-auto self-start">Ver como funciona</a>
          </div>
        </div>

        {/* O combo, e a linha do tempo de cobrança */}
        <div className="combo-luz mt-8 grid gap-8 rounded-[var(--radius-card)] p-7 min-[900px]:p-9 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:gap-12">
          <div>
            <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky">as duas juntas</div>
            <div className="mt-4 flex items-baseline gap-2.5 flex-wrap">
              <span className="font-display font-semibold text-white text-[clamp(38px,5.5vw,52px)] leading-[0.95] tracking-[-0.02em]">
                R$1.500
              </span>
              <span className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky-2">
                implantação · em vez de R$1.750
              </span>
            </div>
            <p className="mt-4 text-[16px] text-mist max-w-[42ch]">
              A assistente e a página juntas, por R$250 a menos do que
              separadas. A mensalidade de R$200 segue igual.
            </p>
            <a href={zapCombo} className="btn btn-primary mt-7 self-start">Quero as duas</a>
          </div>

          <div>
            <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky">quando cada coisa é cobrada</div>
            <ol className="mt-5 space-y-4">
              <li>
                <div className="font-mono text-[11px] uppercase tracking-[.12em] text-sky-2">no início</div>
                <div className="mt-1 text-[16px] text-mist-2">A primeira parcela, quando a implantação começa.</div>
              </li>
              <li>
                <div className="font-mono text-[11px] uppercase tracking-[.12em] text-sky-2">no lançamento</div>
                <div className="mt-1 text-[16px] text-mist-2">A segunda, quando a assistente entra no ar.</div>
              </li>
              <li>
                <div className="font-mono text-[11px] uppercase tracking-[.12em] text-sky-2">30 dias depois</div>
                <div className="mt-1 text-[16px] text-mist-2">
                  A primeira mensalidade. Nunca na assinatura: ela só cobra quando
                  já estiver trabalhando pra você.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
