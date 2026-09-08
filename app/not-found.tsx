import type { Metadata } from 'next';

/* O 404.

   As outras duas paginas estaticas (privacidade e /conectar) atravessam o
   redesign intactas, copiadas para `public/`. Esta NAO consegue: o Next sempre
   gera o proprio `out/404.html`, e ele venceria o arquivo estatico — o export
   saiu com "This page could not be found", em ingles, no lugar do 404 da casa.

   Entao o conteudo do 404 antigo foi reproduzido aqui, com as mesmas duas
   saidas. A regra que ele cumpre esta na `design-site`: erro nomeia o PROBLEMA
   e a SAIDA. */

export const metadata: Metadata = { title: 'Essa página não existe · Riacho Tech' };

const ZAP = 'https://wa.me/5561999643707?text=Oi%2C%20quero%20conhecer%20a%20Sofia';

export default function NaoEncontrada() {
  return (
    <main className="halo min-h-[78vh] flex items-center">
      <div className="wrap py-24">
        <div className="font-mono text-[12px] uppercase tracking-[.13em] text-muted">erro 404</div>
        <h1 className="mt-4 font-display font-semibold text-ink text-[clamp(32px,5vw,52px)] leading-[1.08] max-w-[16ch]">
          Essa página não existe.
        </h1>
        <p className="mt-5 text-[17px] text-muted max-w-[46ch]">
          O endereço pode ter mudado, ou o link veio com um pedaço faltando.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="/" className="btn btn-primary">Voltar pro início</a>
          <a href={ZAP} className="btn btn-ghost">Falar no WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
