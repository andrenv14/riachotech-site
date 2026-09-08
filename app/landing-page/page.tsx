import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Fechamento from '@/components/Fechamento';
import MiniPagina from '@/components/MiniPagina';

/* A página que vende LANDING PAGE, e a decisão do fundador é que ela precisa
   SER a amostra do serviço que vende: se não for a melhor página do site, ela
   desmente a própria oferta.

   Duas consequências de desenho, e as duas custam alguma coisa:

   1. Nada de sistema visual novo. Ela herda inteiro o vocabulário que a home
      construiu em `app/globals.css` — `.peca`, `.textura`, as luzes de fundo,
      `.cartao-plano`, `.fala-peca`, `.plan-item`. O único elemento novo é a
      landing page em miniatura do herói (`components/MiniPagina.tsx`), porque
      não existia objeto para "uma página inteira" no vocabulário.
   2. O argumento mais forte não é dito, é exercido: a seção "A amostra é esta
      página" só se sustenta porque a página cumpre o mesmo chão da home. Se ela
      regredir em contraste, alvo ou rolagem, a seção passa a mentir.

   TODO NÚMERO desta página sai de `docs/contexto/negocio.md` do sofia-bot, que
   é a fonte da oferta: R$750 avulso, R$1.500 no combo, uma rodada de revisão,
   escopo fechado por escrito. O que não está vendido não entra — a escada de
   sites multi-página e a manutenção mensal existem lá como conversa, não como
   preço de tabela, e por isso não aparecem aqui.

   O que a página NÃO pode sugerir: a versão da integração com API, que mostra
   horário livre dentro do site. Ela está fora da oferta por risco
   desproporcional ao ganho. O que se vende, e o que a peça do herói mostra, é o
   botão de WhatsApp com o texto já preenchido por seção. */

const ZAP = 'https://wa.me/5561999643707?text=Quero%20um%20or%C3%A7amento%20de%20landing%20page';
const ZAP_COMBO = 'https://wa.me/5561999643707?text=Quero%20a%20assistente%20com%20site';

/* A ABA continua sendo só "Riacho Tech": ela vem do `title` de `app/layout.tsx`
   e esta página não a sobrescreve, por decisão do fundador em 08/09.

   O CARTÃO DO LINK é o oposto, e também por decisão dele: a prévia descreve a
   página que está sendo compartilhada, porque ali cabe a frase e é ela que diz
   ao leitor o que vai abrir. Por isso o `openGraph` inteiro é redeclarado aqui
   — em Next, `openGraph` definido na página substitui o do layout em vez de se
   fundir com ele, então omitir um campo o apagaria.

   A imagem é a mesma da home, de propósito: ela é o cartão da MARCA, gerado dos
   próprios tokens por `npm run og`, e não uma ilustração da home. */
export const metadata: Metadata = {
  description:
    'Uma página só, feita pra você, com um botão de WhatsApp em cada seção e a mensagem já escrita. R$750, escopo fechado por escrito e uma rodada de revisão.',
  alternates: { canonical: '/landing-page/' },
  openGraph: {
    type: 'website',
    url: 'https://riachotech.com.br/landing-page/',
    title: 'Landing page — uma página que termina no seu WhatsApp',
    description:
      'Uma página só, feita pra você, com um botão de WhatsApp em cada seção e a mensagem já escrita. R$750, escopo fechado por escrito e uma rodada de revisão.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const SECOES_NAV = [
  { id: 'amostra', texto: 'A amostra' },
  { id: 'pra-quem', texto: 'Pra quem é' },
  { id: 'escopo', texto: 'O que entra' },
  { id: 'preco', texto: 'Preço' },
];

/* As conferências que a página passa antes de subir. São PROPRIEDADES, não
   contagens: "sem rolagem lateral em celular, tablet e PC" continua verdadeiro
   quando entrar uma quarta largura, e "quatro larguras" não continuaria. Cada
   uma corresponde a uma medida real de `build/medir-site.js` e do portão de
   `build/conferir-estaticas.js`, e nenhuma delas afirma nota de ferramenta —
   nota muda sozinha, propriedade não. */
const CONFERIDO = [
  'Abre rápido, mesmo com internet ruim',
  'No celular funciona igual ao computador',
  'Letra grande o bastante pra ler sem apertar o olho',
  'Botão que o dedo acerta de primeira',
  'Nada dança na tela enquanto carrega',
];

const PRA_QUEM = [
  {
    rotulo: 'só tem o Instagram',
    titulo: 'O link da bio joga a pessoa no seu perfil.',
    texto:
      'E perfil não responde pergunta. Quem chega quer saber o que você faz, quanto custa e se tem horário, e desiste antes de achar.',
  },
  {
    rotulo: 'manda print de tabela',
    titulo: 'Seu preço mora num print que você reenvia toda semana.',
    texto:
      'Fica tudo num endereço só. Você manda uma vez, e atualiza quando o preço mudar em vez de procurar a imagem certa na galeria.',
  },
  {
    rotulo: 'paga anúncio',
    titulo: 'O clique cai no perfil e se perde ali.',
    texto:
      'Quem clicou ainda tem que descobrir sozinho o que você faz e como falar com você. É um passo a mais entre o interesse e a conversa.',
  },
];

const VOCE_MANDA = [
  'O que o seu negócio faz, do seu jeito',
  'As fotos que você quiser mostrar',
  'Preço, horário e onde fica',
  'O número de WhatsApp que recebe as mensagens',
];

const SAI = [
  'Uma página no ar, no seu endereço',
  'Botão de WhatsApp em cada seção, com a mensagem já escrita',
  'Conferida no celular, no tablet e no computador',
  'Uma rodada de revisão, depois que você vir tudo pronto',
];

function Marcado({ children }: { children: React.ReactNode }) {
  return <li className="plan-item text-[16px] text-ink/85">{children}</li>;
}

export default function LandingPage() {
  return (
    <>
      <Nav zap={ZAP} secoes={SECOES_NAV} />

      <main>
        {/* HERÓI. Mesma família da home — navy, textura, a luz que deriva —
            porque é a mesma casa; o que muda é o objeto no centro. */}
        <section className="hero-escuro textura relative pt-6 pb-20 min-[900px]:pt-16 min-[900px]:pb-24">
          <div className="luz-hero" aria-hidden="true" />
          <div className="wrap grid gap-12 min-[900px]:grid-cols-[1.12fr_.88fr] min-[900px]:gap-14 items-start">

            <div className="text-center min-[900px]:text-left min-[900px]:pt-6">
              {/* Sem rótulo acima do H1: é o hero padrão de SaaS de IA, e a
                  `design-site` o proíbe sem exceção. */}
              {/* A ESCALA É A DA HOME: 72px, o mesmo `clamp` do h1 de lá.
                  A versão anterior descia a 62px para caber em duas linhas e
                  zerar o achado do `detectar-tells` — era otimizar para o
                  contador em vez de para a página, e custou justamente a
                  presença que o herói precisa ter. O h1 de três linhas é
                  decisão do fundador na home, e aqui vale igual: o detector
                  conta, quem julga é quem olha. */}
              <h1 className="font-display font-semibold text-white text-[clamp(42px,6.4vw,72px)] leading-[1.02] tracking-[-0.02em] max-w-[17ch] mx-auto min-[900px]:mx-0">
                Sua página faz o cliente{' '}
                <em className="text-sky not-italic font-display italic">te chamar</em>{' '}
                no WhatsApp.
              </h1>

              <p className="mt-5 text-[17px] min-[900px]:text-[18px] text-mist max-w-[46ch] mx-auto min-[900px]:mx-0">
                Ele vê o que você faz, quanto custa e onde fica. E toca num
                botão que abre a conversa.
              </p>

              {/* UMA chamada na primeira tela, e no PC ela vem antes da peça:
                  o botão do topo só aparece depois que esta sai de vista. */}
              <div className="mt-8 hidden min-[900px]:block">
                <a href={ZAP} className="btn btn-primary text-[16px] px-7 py-[15px]">
                  Quero um orçamento
                </a>
              </div>

              <div className="mt-5 min-[900px]:mt-7 font-mono text-[12px] text-sky-2 tracking-[.02em]">
                uma página · escopo por escrito · uma rodada de revisão
              </div>
            </div>

            <div className="relative z-10 flex justify-center min-[900px]:justify-end">
              {/* `w-full max-w-[420px]` AQUI, e não só dentro da peça: item de
                  container flex encolhe para o conteúdo, então o `w-full` da
                  peça passava a valer sobre uma caixa do tamanho do painel de
                  mensagem — a página em miniatura saía com 330px em vez dos 420
                  do desenho, nas três larguras. */}
              <div className="w-full max-w-[420px]">
                <MiniPagina />
                {/* No celular a chamada vem DEPOIS da peça, pela mesma razão da
                    home: ver a coisa funcionar é o argumento, e pedir o clique
                    antes de mostrar é pedir fé. */}
                <div className="mt-8 flex justify-center min-[900px]:hidden">
                  <a href={ZAP} className="btn btn-primary text-[16px] px-7 py-[15px]">
                    Quero um orçamento
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="fim-do-hero" aria-hidden="true" className="h-px" />
        </section>

        {/* A AMOSTRA. É a seção que só existe porque a página cumpre o chão —
            e é o argumento mais honesto que esta oferta tem, porque o leitor
            pode conferir sozinho, agora, sem acreditar em nada. */}
        <section id="amostra" className="bg-paper-2 textura textura-clara py-24 min-[900px]:py-28">
          <div className="wrap grid gap-10 min-[900px]:grid-cols-[1fr_.85fr] min-[900px]:gap-16 items-start">
            <div>
              <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[15ch]">
                A amostra é esta página.
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-muted max-w-[50ch]">
                Você já está dentro dela. A sua sai do mesmo trabalho, e dá pra
                conferir agora: diminua a janela, abra no celular, aumente a
                letra. Nada quebra.
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted max-w-[50ch]">
                Isso não é capricho. Página que quebra no celular perde
                justamente quem chegou pelo Instagram, que é de onde vem quase
                todo mundo.
              </p>
            </div>

            <div className="peca-clara p-7 min-[900px]:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[.13em] text-muted">
                conferido antes de subir
              </div>
              <p className="mt-4 text-[16px] leading-[1.55] text-muted">
                Em celular, tablet e computador, um por um.
              </p>
              <ul className="mt-5">
                {CONFERIDO.map((c) => (
                  <Marcado key={c}>{c}</Marcado>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PRA QUEM É. Sem cartão e sem ícone: são três situações, separadas
            por fio, e o que carrega cada uma é a frase — não uma caixa. */}
        <section id="pra-quem" className="vitrine textura py-24 min-[900px]:py-28">
          <div className="wrap">
            <h2 className="font-display font-semibold text-white text-[clamp(30px,4.2vw,46px)] leading-[1.12] max-w-[19ch]">
              Você já perdeu cliente por não ter pra onde mandar ele.
            </h2>

            <div className="mt-14 grid gap-10 min-[820px]:grid-cols-3 min-[820px]:gap-8">
              {PRA_QUEM.map((p) => (
                <div key={p.rotulo} className="border-t border-white/12 pt-6">
                  <div className="font-mono text-[11px] uppercase tracking-[.13em] text-sky">
                    {p.rotulo}
                  </div>
                  <h3 className="mt-4 font-display text-[21px] leading-[1.25] text-white max-w-[24ch]">
                    {p.titulo}
                  </h3>
                  <p className="mt-3.5 text-[16px] leading-[1.55] text-mist max-w-[42ch]">
                    {p.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O ESCOPO. O que separa esta oferta de um orçamento de agência é que
            ela cabe numa tabela de duas colunas — e a tabela está aqui. */}
        <section id="escopo" className="bg-paper textura textura-clara py-24 min-[900px]:py-28">
          <div className="wrap">
            <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[16ch]">
              O que você manda, e o que sai.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-muted max-w-[52ch]">
              O escopo fica por escrito antes de começar: quais seções, o que
              entra em cada uma e o prazo. Pedido que aparecer depois vira
              orçamento novo, e isso protege os dois lados — preço sem escopo é
              preço que muda no meio.
            </p>

            <div className="mt-12 grid gap-6 min-[820px]:grid-cols-2 min-[820px]:gap-8 items-stretch">
              <div className="peca-clara flex flex-col p-7 min-[900px]:p-8">
                <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-signal">
                  você manda
                </div>
                <h3 className="mt-3 font-display text-[22px] text-ink leading-[1.25] max-w-[22ch]">
                  O conteúdo, que é seu
                </h3>
                <ul className="mt-6">
                  {VOCE_MANDA.map((v) => (
                    <Marcado key={v}>{v}</Marcado>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-[16px] leading-[1.55] text-muted">
                  Não tem foto boa? A gente resolve isso junto, antes de fechar
                  o escopo.
                </p>
              </div>

              <div className="peca-clara flex flex-col p-7 min-[900px]:p-8">
                <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-signal">
                  sai
                </div>
                <h3 className="mt-3 font-display text-[22px] text-ink leading-[1.25] max-w-[22ch]">
                  A página no ar, escrita e desenhada
                </h3>
                <ul className="mt-6">
                  {SAI.map((s) => (
                    <Marcado key={s}>{s}</Marcado>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-[16px] leading-[1.55] text-muted">
                  A escrita e o desenho ficam com a gente. É o trabalho, não um
                  extra.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PREÇO. O cartão e o bloco do combo são os MESMOS objetos da seção
            "Planos" da home, com o mesmo desenho: aqui quem recebe o acento de
            oferta principal é a página avulsa, porque é ela que esta página
            vende. O combo aparece como o que é — a saída mais barata para quem
            quiser as duas coisas —, e não como o destino de todo mundo: a
            landing page avulsa é porta de entrada para quem ainda não quer a
            assistente, e a página tem de funcionar para esse público. */}
        <section id="preco" className="planos-luz textura textura-clara py-24 min-[900px]:py-28">
          <div className="wrap">
            {/* O título e o cartão dividem a largura, e isso é correção de um
                defeito medido: com o cartão sozinho num `max-w`, sobrava metade
                da seção vazia ao lado dele — o mesmo vão morto que o fundador
                apontou no fechamento da home. Aqui a coluna da esquerda não é
                enchimento: ela carrega a regra de preço, que é o que desarma a
                pechincha antes de ela começar. */}
            <div className="grid gap-10 min-[900px]:grid-cols-[.82fr_1.18fr] min-[900px]:gap-14 items-start">
              <div>
                <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[14ch]">
                  Um preço só, e ele está escrito aqui.
                </h2>
                <p className="mt-5 text-[17px] leading-[1.6] text-muted max-w-[40ch]">
                  Sem &ldquo;fale com um especialista&rdquo; para descobrir
                  quanto custa.
                </p>
                <p className="mt-4 text-[17px] leading-[1.6] text-muted max-w-[40ch]">
                  E ele não desce: uma página avulsa não sai por menos de R$750.
                  O valor mais baixo só existe dentro do combo, como desconto de
                  pacote.
                </p>
              </div>

              <div className="cartao-plano cartao-principal flex flex-col p-7 min-[900px]:p-9">
                <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-signal">
                  a landing page
                </div>
                <h3 className="mt-3 font-display text-[25px] text-ink leading-[1.25] max-w-[20ch]">
                  Uma página que faz o cliente te achar
                </h3>

                <div className="mt-7 flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-display font-semibold text-ink text-[clamp(44px,7vw,64px)] leading-[0.95] tracking-[-0.02em]">
                    R$750
                  </span>
                  <span className="font-mono text-[11.5px] uppercase tracking-[.13em] text-muted">
                    pagamento único · sem mensalidade
                  </span>
                </div>

                <ul className="mt-7 mb-8">
                  <Marcado>Uma página, com as seções fechadas por escrito antes de começar</Marcado>
                  <Marcado>Uma rodada de revisão inclusa no preço</Marcado>
                  <Marcado>Botão de WhatsApp com a mensagem já preenchida em cada seção</Marcado>
                  <Marcado>O conteúdo é seu; a escrita e o desenho ficam com a gente</Marcado>
                </ul>

                <a href={ZAP} className="btn btn-primary mt-auto self-start">
                  Quero um orçamento
                </a>
              </div>
            </div>

            {/* O combo, desenhado como na home: mesmo bloco escuro, mesma
                hierarquia de preço. Aqui ele vem em uma coluna só porque a
                linha do tempo de cobrança é da assistente, e é lá que ela mora
                — repeti-la seria contar a mesma coisa duas vezes no site. */}
            {/* O COMBO é o mesmo objeto da seção "Planos" da home, e é
                desenhado do mesmo jeito de propósito: bloco escuro, preço em
                display, a linha do tempo de cobrança na coluna da direita. O
                mesmo objeto do produto desenhado de dois jeitos lê como duas
                coisas — e quem sai desta página para a home vê os dois na mesma
                visita. A linha do tempo se repete porque quem decide o combo
                AQUI precisa dela aqui; repetir o objeto entre páginas não é o
                defeito, redesenhá-lo é. */}
            <div className="combo-luz mt-8 grid gap-8 rounded-[var(--radius-card)] p-7 min-[900px]:p-9 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:gap-12">
              <div>
                <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky">
                  se você também quiser a assistente
                </div>
                <div className="mt-4 flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-display font-semibold text-white text-[clamp(38px,5.5vw,52px)] leading-[0.95] tracking-[-0.02em]">
                    R$1.500
                  </span>
                  <span className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky-2">
                    implantação · ou 2× de R$750
                  </span>
                </div>
                <p className="mt-4 text-[16px] leading-[1.6] text-mist max-w-[42ch]">
                  A Sofia atende e marca horário no seu WhatsApp, e a página leva
                  o cliente até ela. As duas juntas saem por R$250 a menos do que
                  separadas, com a mensalidade de R$200 da assistente.
                </p>
                <a href={ZAP_COMBO} className="btn btn-primary mt-7 self-start">
                  Quero as duas
                </a>
              </div>

              <div>
                <div className="font-mono text-[11.5px] uppercase tracking-[.13em] text-sky">
                  quando cada coisa é cobrada
                </div>
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
                      A primeira mensalidade da assistente. Nunca na assinatura:
                      ela só cobra quando já estiver trabalhando pra você.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Fechamento
        zap={ZAP}
        titulo="A página que você está lendo foi feita assim."
        texto="Se ela funcionou com você, é o mesmo trabalho que entra na sua. Me chama que a gente fecha o escopo por escrito antes de qualquer coisa."
        botao="Quero um orçamento"
        nota="escopo por escrito antes de começar"
      />
    </>
  );
}
