/* "O que cai no seu WhatsApp" — a seção 2.

   Ela substituiu uma lista de tiquinhos que dizia "a amostra é esta página": a
   lista AFIRMAVA a prova em vez de mostrar qualquer coisa, que é a forma mais
   fraca de prova que existe. O fundador reprovou e pediu que a substituta não
   fosse sobre responsividade.

   O que ficou é o argumento em texto mais a foto do instante que ele descreve:
   a mensagem chegou e a pessoa está lendo.

   O QUE SAIU, e é decisão do fundador em 08/09: o painel com as três mensagens
   de exemplo. Primeiro saíram as marcas em mono que diziam de qual seção cada
   uma vinha, depois o painel inteiro. Se ele voltar um dia, volta com o chão da
   `.painel-conversa`, que é o objeto que o site já usa para dizer "isto é uma
   conversa" — desenhar um segundo aparelho aqui repetiria o herói da home com
   outra roupa. */

/* O RESPIRO DE CIMA no PC não é gosto: a peça do herói ATRAVESSA a borda de
   baixo dele e desce para dentro desta seção, e o conteúdo daqui tem de começar
   abaixo dela. É o mesmo arranjo do "Como funciona" da home, que abre espaço
   para o celular descer.

   O valor é MEDIDO, e o comando que o rederiva está no README do repositório,
   na seção da `/landing-page/`: ele imprime a folga entre o pé da peça e o
   começo do conteúdo desta seção. Folga negativa quer dizer que a peça cresceu
   e este respiro precisa crescer junto. */
export default function AsMensagens() {
  return (
    <section id="mensagens" className="bg-paper-2 textura textura-clara py-24 min-[900px]:pt-[20rem] min-[900px]:pb-28">
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
              chegou e a pessoa está lendo. Com a saída do painel de exemplos,
              ela é a única coisa do mundo de quem compra que esta seção mostra.

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
        </div>
      </div>
    </section>
  );
}
