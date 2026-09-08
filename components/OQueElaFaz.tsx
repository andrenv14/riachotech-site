/* "O que ela faz" — o repertório, e o ARTEFATO é o herói.

   Passada de design de 08/09/2026. O que estava errado antes:

   - O arquivo prometia "cada bloco mostra o artefato daquela capacidade" e
     dois dos cinco blocos não mostravam nada — justo o de AGENDA, que é o
     maior e o principal, e o de VOCÊ. Afirmação sem artefato é a forma mais
     fraca de prova, e a seção argumentava contra si mesma.
   - Os artefatos que existiam eram caixas de `white/8`, que sobre navy leem
     como div, não como coisa vinda do produto.
   - O fundo era navy chapado — primeira causa de página morta na `nao-slop`.

   As três decisões desta passada:

   1. TODO bloco mostra o artefato, e o artefato vem primeiro: rótulo, peça,
      título, uma linha de legenda. O texto encolheu para o artefato caber
      grande.
   2. A peça é CLARA sobre o navy (`.peca` em `app/globals.css`). Objeto claro
      sobre escuro lê como tela capturada do produto. Não é um segundo celular:
      isso repetiria a `PraQuemE`, onde a conversa por ramo já mora.
   3. A seção ganhou luz de fundo (`.vitrine`), da mesma família do hero.

   Os artefatos se amarram entre si de propósito: o evento da agenda é a
   consulta da Camila, e o lembrete que chega é o lembrete DAQUELE evento; o
   valor do Pix é o do item do catálogo. Peça que contradiz a vizinha na mesma
   tela é o defeito que a foto do catálogo já tinha corrigido uma vez.

   O conteúdo continua saindo da tabela "O que a assistente faz (verificado no
   código)" de `docs/contexto/negocio.md`. Nada aqui promete o que ela não faz. */

import AoEntrar from '@/components/AoEntrar';

/* O bloco tem TRÊS faixas — rótulo, peça, texto — e elas são as linhas do
   grid da seção, por `subgrid`. Sem isso cada bloco empilha sozinho, as peças
   de uma mesma faixa têm alturas diferentes (a do Pix são duas mensagens, a do
   lembrete é um aviso curto) e os títulos caem em alturas distintas: a linha de
   baixo saía com três títulos em três alturas. Com `subgrid`, a faixa da peça
   mede pela mais alta e os títulos voltam a se alinhar.

   Onde não houver `subgrid`, o bloco empilha como antes — a informação não
   depende dele, só o alinhamento. */
function Bloco({
  span, rotulo, titulo, legenda, children,
}: {
  span: string; rotulo: string; titulo: string; legenda: string; children: React.ReactNode;
}) {
  return (
    <div className={`${span} row-span-3 grid grid-rows-subgrid border-t border-white/12 pt-6`}>
      <div className="font-mono text-[11px] uppercase tracking-[.13em] text-sky">{rotulo}</div>
      {/* `self-end`: a faixa da peca mede pela peca mais alta, e sem isto a
          sobra caia ENTRE a peca e o titulo — medido em 1280, o vao ia de 28px
          no catalogo a 146px no lembrete, e a linha de titulos parecia solta.
          Ancorada no pe, a distancia peca->titulo e' a mesma nos cinco blocos e
          a sobra sai para cima, sob o rotulo, onde le como respiro. */}
      <div className="self-end">{children}</div>
      <div>
        <h3 className="font-display text-[21px] leading-[1.25] text-white max-w-[26ch]">{titulo}</h3>
        <p className="mt-3.5 text-[16px] leading-[1.55] text-mist max-w-[42ch]">{legenda}</p>
      </div>
    </div>
  );
}

export default function OQueElaFaz() {
  return (
    <section id="recursos" className="vitrine py-24 min-[900px]:py-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-[clamp(30px,4.2vw,46px)] leading-[1.15] text-white max-w-[20ch]">
          Um atendente que não dorme, não esquece e não inventa horário.
        </h2>
        <p className="mt-4 text-[17px] text-mist max-w-[54ch]">
          Tudo isto já está rodando hoje, no WhatsApp de um negócio de verdade.
          Nada aqui é promessa de versão futura.
        </p>

        <div className="mt-14 grid grid-cols-1 min-[820px]:grid-cols-12 gap-x-10 gap-y-7">

          <Bloco
            span="min-[820px]:col-span-7"
            rotulo="agenda"
            titulo="Olha a sua agenda no instante da pergunta"
            legenda="Marca, cancela e remarca no seu Google Agenda, e oferece dois ou três
              horários livres em vez da grade inteira. Cada pessoa que atende tem a própria
              agenda e a própria duração."
          >
            {/* O ARTEFATO que faltava, e o bloco maior estava sem nenhum: o
                evento como ele nasce no Google Agenda. A barra de cor à
                esquerda e a linha de autoria embaixo são o que distingue um
                evento criado pela assistente de um digitado à mão. */}
            <div className="peca px-5 py-4 max-w-[420px]">
              <div className="flex gap-3.5">
                <span aria-hidden="true" className="mt-1 h-[38px] w-[3px] flex-shrink-0 rounded-full bg-signal" />
                <div className="min-w-0">
                  <div className="text-[15.5px] font-semibold leading-[1.3] text-ink">
                    Camila Nunes · Clínica geral
                  </div>
                  <div className="mt-1 text-[14px] text-muted">
                    quinta, 12 · 16:30 às 17:00
                  </div>
                </div>
              </div>
              <div className="mt-3.5 border-t border-line pt-2.5 font-mono text-[11px] text-muted">
                criado pela Sofia às 14:07
              </div>
            </div>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-5"
            rotulo="pix"
            titulo="Cobra dentro da conversa"
            legenda="O valor vem do catálogo cadastrado, e o código copia-e-cola vai em
              mensagem separada — para o cliente copiar sem pegar texto junto."
          >
            {/* DUAS peças empilhadas, e é a peça que prova a frase: a legenda
                diz "mensagem separada", então são duas mensagens na tela, não
                uma caixa só com o texto explicando que seriam duas. */}
            <div className="flex flex-col gap-2.5 max-w-[360px]">
              <div className="peca px-4 py-3.5">
                <div className="text-[14px] text-muted">Banho e tosa · porte médio</div>
                <div className="mt-1 font-display text-[26px] leading-none text-ink">R$ 80,00</div>
              </div>
              <div className="peca px-4 py-3.5 font-mono text-[11.5px] leading-[1.55] text-ink break-all">
                00020126580014br.gov.bcb.pix0136a1f3…5204000053039865802BR
              </div>
            </div>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="lembrete"
            titulo="Avisa antes da hora, sozinha"
            legenda="Um aviso no dia anterior e outro uma hora antes, os dois por mensagem
              de utilidade da API oficial, com o texto aprovado pela Meta."
          >
            {/* Era uma bolha de conversa; virou o AVISO como o cliente o vê
                chegar. O único movimento desta seção está aqui, e ele significa
                alguma coisa: um lembrete CHEGA. Sem JS, nasce visível.

                São DOIS avisos porque são dois lembretes: o de 24 h e o de 1 h,
                que entrou em produção em 08/09. Mostrar só um dizia menos do que
                o produto faz — e, de quebra, deixava esta peça baixa demais ao
                lado das duas vizinhas da mesma faixa.

                As horas saem do evento da peça de agenda, que é às 16:30 de
                quinta: o de 24 h sai na quarta no mesmo horário, o de 1 h sai
                às 15:30 de quinta. A hora antiga (08:00) contradizia a
                antecedência do próprio produto na mesma tela. */}
            <AoEntrar><div className="chega flex flex-col gap-2.5">
              <div className="peca px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                    24 h antes
                  </span>
                  <span className="font-mono text-[11px] text-muted">qua · 16:30</span>
                </div>
                <div className="mt-2 text-[14px] leading-[1.45] text-ink">
                  Oi, Camila! Passando pra lembrar da sua consulta amanhã às 16h30.
                </div>
              </div>
              <div className="peca px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                    1 h antes
                  </span>
                  <span className="font-mono text-[11px] text-muted">qui · 15:30</span>
                </div>
                <div className="mt-2 text-[14px] leading-[1.45] text-ink">
                  Camila, sua consulta é daqui a uma hora, às 16h30. Até já!
                </div>
              </div>
            </div></AoEntrar>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="catálogo"
            titulo="Mostra o serviço com foto e preço"
            legenda="Nome, valor e foto de verdade, não uma lista de texto."
          >
            {/* A foto era de 44px ao lado do texto, o que não é "mostrar o
                serviço": é um ícone. Passa a 640x480 e ocupa a peça inteira.
                Continua placeholder declarado — entra foto de cliente quando
                houver catálogo de cliente no ar.
                eslint-disable-next-line @next/next/no-img-element */}
            <div className="peca max-w-[330px]">
              <img
                src="/catalogo-banho-tosa-640.webp"
                alt=""
                width={640}
                height={480}
                className="peca-foto h-[152px] w-full object-cover"
              />
              <div className="px-4 py-3.5">
                <div className="text-[14.5px] leading-[1.35] text-ink">Banho e tosa · porte médio</div>
                <div className="mt-1 font-mono text-[12px] text-muted">R$ 80,00 · 1h</div>
              </div>
            </div>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="você"
            titulo="Chama você quando o caso pede gente"
            legenda="No mesmo número e no seu próprio aplicativo, por Coexistence. O que
              você escreve entra no histórico marcado como seu."
          >
            {/* O outro bloco que não tinha artefato. O artefato aqui é a MARCA
                DE AUTORIA: as duas falas saem do mesmo número, e o histórico
                sabe qual foi de quem. Isso é o mecanismo, não enfeite.

                As duas ficam à esquerda porque as duas são o lado do negócio; o
                cliente não aparece nesta peça. Pôr a segunda à direita a leria
                como fala do cliente, contra a convenção de lados que a
                `PraQuemE` já fixou. */}
            <div className="peca flex flex-col gap-1.5 p-3.5 max-w-[330px]">
              <span className="autoria">Sofia</span>
              <div className="fala-peca fala-peca-sofia self-start">
                Vou chamar alguém da equipe pra falar com você.
              </div>
              <span className="autoria mt-2">você</span>
              <div className="fala-peca fala-peca-dono self-start">
                Oi, Camila! Aqui é a Marina, eu assumo daqui.
              </div>
            </div>
          </Bloco>
        </div>
      </div>
    </section>
  );
}
