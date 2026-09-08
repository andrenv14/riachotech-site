import Nav from '@/components/Nav';
import Telefone from '@/components/Telefone';
import ComoFunciona from '@/components/ComoFunciona';
import OQueElaFaz from '@/components/OQueElaFaz';
import PraQuemE from '@/components/PraQuemE';
import Planos from '@/components/Planos';
import Fechamento from '@/components/Fechamento';

const ZAP = 'https://wa.me/5561999643707?text=Oi%2C%20quero%20conhecer%20a%20Sofia';

export default function Home() {
  return (
    <>
      <Nav zap={ZAP} />

      <main>
        <section className="hero-escuro relative pt-6 min-[900px]:pt-16 pb-0">
          <div className="wrap grid gap-10 min-[900px]:grid-cols-[1.05fr_.95fr] min-[900px]:gap-14 items-start">

            <div className="min-[900px]:pt-6 min-[900px]:pb-28">
              {/* Sem rótulo acima do H1: é o hero padrão de SaaS de IA, e a
                  `design-site` o proíbe sem exceção. */}
              <h1 className="font-display font-semibold text-white text-[clamp(42px,6.4vw,72px)] leading-[1.02] tracking-[-0.02em] max-w-[17ch]">
                Seu WhatsApp já pode{' '}
                <em className="text-sky not-italic font-display italic">marcar horário</em>{' '}
                sozinho.
              </h1>

              {/* 17 palavras. O teto do detector é 20; o texto antigo tinha 34. */}
              <p className="mt-4 min-[900px]:mt-5 text-[17px] min-[900px]:text-[18px] text-mist max-w-[46ch]">
                A Sofia atende, confere sua agenda e marca o horário sozinha.
                Você fica com as mãos livres.
              </p>

              {/* UMA chamada na primeira tela. O botão do topo só aparece
                  depois que este sai de vista (ver components/Nav.tsx). */}
              <div className="mt-8 hidden min-[900px]:block">
                <a href={ZAP} className="btn btn-primary text-[16px] px-7 py-[15px]">
                  Testar no seu WhatsApp
                </a>
              </div>

              <div className="mt-5 min-[900px]:mt-7 font-mono text-[12px] text-sky-2 tracking-[.02em]">
                API oficial da Meta · Google Agenda · Pix na conversa
              </div>

            </div>

            {/* O aparelho desce e invade a seção de baixo, em vez de ficar
                sentado dentro da coluna. Ele NÃO é cortado: agora é
                interativo, e cortar comeria os botões. */}
            <div className="relative z-10 flex justify-center min-[900px]:justify-end min-[900px]:translate-y-24">
              <div>
                <Telefone />
                {/* No celular a chamada vem DEPOIS do aparelho: ver ela
                    responder e' o argumento, e pedir o clique antes de mostrar
                    e' pedir fe. */}
                <div className="mt-7 min-[900px]:hidden">
                  <a href={ZAP} className="btn btn-primary text-[16px] px-7 py-[15px]">
                    Testar no seu WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="fim-do-hero" aria-hidden="true" className="h-px" />
        </section>

        <ComoFunciona />

        <OQueElaFaz />

        <PraQuemE zap={ZAP} />

        <Planos zap={ZAP} />
      </main>

      <Fechamento zap={ZAP} />
    </>
  );
}
