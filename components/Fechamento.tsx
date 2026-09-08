/* Fechamento e rodapé, num bloco escuro só.

   O fecho amarra na primeira tela: quem chegou até aqui já conversou com a
   Sofia dentro do celular do hero, e o botão leva para a MESMA conversa, no
   número real da Riacho, onde ela atende de verdade. Essa continuidade é o
   argumento mais forte que a página tem, e ela só existe porque o roteiro do
   hero é o da Riacho e não o de uma clínica inventada.

   Escuro de propósito: é a última palavra, e terminar em massa escura fecha a
   página em vez de deixá-la desmanchando em branco. */

const LINKS = [
  { href: 'mailto:contato@riachotech.com.br', texto: 'contato@riachotech.com.br' },
  { href: 'https://instagram.com/riacho_tech', texto: '@riacho_tech' },
  { href: '/privacidade.html', texto: 'Política de Privacidade' },
  { href: '/privacidade.html#exclusao', texto: 'Exclusão de dados' },
];

export default function Fechamento({ zap }: { zap: string }) {
  return (
    <footer className="bg-ink">
      <div className="wrap py-24 min-[900px]:py-28">
        <div className="grid gap-10 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-16 min-[900px]:items-end">
          <div>
            <h2 className="font-display font-semibold text-white text-[clamp(28px,4vw,44px)] leading-[1.1] max-w-[17ch]">
              Você acabou de conversar com uma cópia dela.
            </h2>
            <p className="mt-5 text-[17px] text-mist max-w-[44ch]">
              A de verdade está no WhatsApp agora, no número da Sofia. Manda
              uma mensagem e veja ela atender você do mesmo jeito que atenderia
              o seu cliente.
            </p>
          </div>

          <div className="min-[900px]:pb-2">
            <a href={zap} className="btn btn-primary text-[16px] px-7 py-[15px]">
              Falar no WhatsApp
            </a>
            <div className="mt-5 font-mono text-[12px] leading-[1.7] text-sky-2">
              +55 61 99964 3707
              <br />
              a Sofia responde na hora, a qualquer hora
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/12 pt-8 flex flex-col gap-5 min-[820px]:flex-row min-[820px]:items-center min-[820px]:justify-between">
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
