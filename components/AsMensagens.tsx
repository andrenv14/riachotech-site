/* "O que cai no seu WhatsApp" — a seção 2, e ela substitui a lista de tiquinhos
   que dizia "a amostra é esta página".

   Por que a anterior saiu: ela AFIRMAVA a prova e entregava uma lista de itens
   marcados, que é a forma mais fraca de prova que existe. O fundador reprovou e
   pediu explicitamente que a substituta não fosse sobre responsividade.

   O que entrou é a outra ponta do mesmo mecanismo, e é o que o comprador de
   fato quer: as mensagens que chegam. Cada botão da página manda um texto
   diferente, e a marca em mono diz de qual seção ele veio — que é a informação
   que muda o atendimento, porque quem recebe já sabe do que a pessoa fala antes
   de responder.

   Nada aqui é interativo, de propósito. Três mensagens empilhadas dizem "elas
   continuam chegando" melhor do que um seletor diria, e a peça do herói já
   carrega o peso de movimento da página.

   A COMPOSIÇÃO é coluna curta de texto ao lado de coluna alta de imagem, que é
   a mesma assimetria do herói. Cheguei nela depois de duas tentativas piores, e
   as duas erram de jeitos que vale registrar: com a foto na coluna de TEXTO,
   sobrava um vão morto debaixo da última bolha; esticando o painel para
   compensar, ele virava uma caixa bege vazia com três bolhas perdidas no meio
   dela. Foto e painel empilhados na mesma coluna resolvem sem esticar nada. */

const MENSAGENS = [
  { de: 'do topo', texto: 'Oi! Vim pelo site. Queria marcar um horário.' },
  { de: 'de serviços', texto: 'Oi! Vim pelo site. Queria saber sobre coloração.' },
  { de: 'de horários', texto: 'Oi! Vim pelo site. Vocês têm horário no sábado?' },
];

export default function AsMensagens() {
  return (
    <section id="mensagens" className="bg-paper-2 textura textura-clara py-24 min-[900px]:py-28">
      <div className="wrap grid gap-12 min-[900px]:grid-cols-[.95fr_1.05fr] min-[900px]:gap-16 items-start">

        <div>
          <h2 className="font-display font-semibold text-ink text-[clamp(30px,4.2vw,46px)] leading-[1.08] max-w-[15ch]">
            O que cai no seu WhatsApp.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-muted max-w-[46ch]">
            Cada botão da página manda um texto diferente, escrito antes. Quem
            toca em &ldquo;ver preços&rdquo; chega falando de preço; quem toca em
            &ldquo;marcar horário&rdquo; chega falando de horário.
          </p>
          <p className="mt-4 text-[17px] leading-[1.6] text-muted max-w-[46ch]">
            Você abre o aplicativo e já sabe o que a pessoa quer. Ninguém começa
            do &ldquo;oi&rdquo;, e ninguém some enquanto você pergunta no que
            pode ajudar.
          </p>
        </div>

        <div>
          {/* A foto é o INSTANTE que o texto ao lado descreve: a mensagem
              chegou e a pessoa está lendo. Sem ela a seção era texto de um lado
              e bolhas do outro, sem nada do mundo de quem compra.

              A tela do celular está ilegível de propósito: nada de conteúdo de
              conversa, nem inventado. `width` e `height` declarados — é o que
              segura o CLS em zero. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mensagem-que-chega-900.webp"
            alt=""
            width={900}
            height={600}
            className="peca-clara w-full h-auto"
          />

          {/* O painel tem o MESMO chão da tela do celular da home
              (`--color-sand`, via `.painel-conversa`): é o objeto que o site já
              usa para dizer "isto é uma conversa", e desenhar um segundo
              aparelho aqui repetiria o herói da home com outra roupa. */}
          <div className="painel-conversa mt-6 p-5 min-[900px]:p-6">
            {MENSAGENS.map((m) => (
              <div key={m.de} className="mt-6 first:mt-0">
                {/* `ink/70`, não `muted`: a marca fica sobre o `sand` do painel,
                    e ali `muted` mede 4,36:1 — abaixo dos 4,5. É a mesma
                    armadilha que já pegou a linha de apoio do topo da peça, e
                    ela reaparece em todo texto secundário sobre fundo quente. */}
                <div className="font-mono text-[10px] uppercase tracking-[.13em] text-ink/70 text-right">
                  {m.de}
                </div>
                {/* A bolha é ESTREITA de propósito: em uma linha só ela lê como
                    item de lista, e o que precisa ser reconhecido aqui é uma
                    MENSAGEM. Duas linhas curtas é a forma que o olho conhece. */}
                <div className="mt-1.5 flex justify-end">
                  <span className="fala-peca fala-peca-cliente max-w-[15rem]">{m.texto}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
