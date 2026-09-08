/* Fechamento e rodapé, num bloco escuro só.

   O fecho amarra na primeira tela: quem chegou até aqui já conversou com a
   Sofia dentro do celular do hero, e o botão leva para a MESMA conversa, no
   número real da Riacho, onde ela atende de verdade. Essa continuidade é o
   argumento mais forte que a página tem, e ela só existe porque o roteiro do
   hero é o da Riacho e não o de uma clínica inventada.

   Escuro de propósito: é a última palavra, e terminar em massa escura fecha a
   página em vez de deixá-la desmanchando em branco.

   Passada de design de 08/09/2026, e ela conserta duas coisas:

   - O bloco era de duas colunas e a direita tinha um botão e duas linhas de
     nota. Sobrava um vão morto de quase metade da largura ao lado da melhor
     frase da página. Agora é UMA coluna centrada: frase, texto, botão e nota
     numa vertical só, e não há vão para preencher.
   - A página abria com luz e fechava em navy chapado. A luz volta aqui
     (`.fecho-luz`, em `app/globals.css`), embaixo e ao centro, atrás da última
     frase — as duas pontas escuras se respondem.

   O rodapé sai de dentro do bloco de luz e vira uma base quieta embaixo dele:
   ele é serviço, não fecho, e disputava atenção com a chamada. */

const LINKS = [
  { href: 'mailto:contato@riachotech.com.br', texto: 'contato@riachotech.com.br' },
  { href: 'https://instagram.com/riacho_tech', texto: '@riacho_tech' },
  { href: '/privacidade.html', texto: 'Política de Privacidade' },
  { href: '/privacidade.html#exclusao', texto: 'Exclusão de dados' },
];

export default function Fechamento({ zap }: { zap: string }) {
  return (
    <footer className="bg-ink">
      <div className="fecho-luz">
        <div className="wrap pt-24 pb-20 min-[900px]:pt-32 min-[900px]:pb-24 text-center">
          <h2 className="mx-auto font-display font-semibold text-white text-[clamp(30px,4.4vw,48px)] leading-[1.1] max-w-[18ch]">
            Você acabou de conversar com uma cópia dela.
          </h2>
          <p className="mx-auto mt-5 text-[17px] leading-[1.6] text-mist max-w-[46ch]">
            A de verdade está no WhatsApp agora, no número da Sofia. Manda uma
            mensagem e veja ela atender você do mesmo jeito que atenderia o seu
            cliente.
          </p>

          <div className="mt-9">
            <a href={zap} className="btn btn-primary text-[16px] px-7 py-[15px]">
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-6 font-mono text-[12px] leading-[1.8] text-sky-2">
            +55 61 99964 3707
            <br />
            a Sofia responde na hora, a qualquer hora
          </div>
        </div>
      </div>

      <div className="wrap pb-14">
        <div className="border-t border-white/12 pt-8 flex flex-col gap-5 min-[820px]:flex-row min-[820px]:items-center min-[820px]:justify-between">
          <div className="font-mono text-[12px] leading-[1.7] text-mist">
            {/* Sem cor propria no separador: `text-white/30` dava 2,66:1
                sobre o navy e, alem de reprovar, era um cinza sobre superficie
                colorida, que a design-site proibe. Ele herda a cor da linha. */}
            © 2026 Riacho Tech · riachotech.com.br
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center min-h-[44px] text-[15px] text-mist hover:text-white"
              >
                {l.texto}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
