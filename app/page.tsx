import Nav from '@/components/Nav';
import Telefone from '@/components/Telefone';
import ComoFunciona from '@/components/ComoFunciona';

const ZAP = 'https://wa.me/5561999643707?text=Oi%2C%20quero%20conhecer%20a%20Sofia';

export default function Home() {
  return (
    <>
      <Nav zap={ZAP} />

      <main>
        <section className="halo relative overflow-hidden pt-14 min-[900px]:pt-20 pb-0">
          <div className="wrap grid gap-10 min-[900px]:grid-cols-[1.05fr_.95fr] min-[900px]:gap-14 items-start">

            <div className="min-[900px]:pt-6 min-[900px]:pb-28">
              {/* Sem rótulo acima do H1: é o hero padrão de SaaS de IA, e a
                  `design-site` o proíbe sem exceção. */}
              <h1 className="font-display font-semibold text-ink text-[clamp(38px,5.2vw,58px)] leading-[1.04] tracking-[-0.015em] max-w-[19ch]">
                Seu WhatsApp já pode{' '}
                <em className="text-signal-dark not-italic font-display italic">marcar horário</em>{' '}
                sozinho.
              </h1>

              {/* 17 palavras. O teto do detector é 20; o texto antigo tinha 34. */}
              <p className="mt-5 text-[18px] text-muted max-w-[46ch]">
                A Sofia atende, confere sua agenda e marca o horário sozinha.
                Você fica com as mãos livres.
              </p>

              {/* UMA chamada na primeira tela. O botão do topo só aparece
                  depois que este sai de vista (ver components/Nav.tsx). */}
              <div className="mt-8">
                <a href={ZAP} className="btn btn-primary text-[16px] px-7 py-[15px]">
                  Testar no seu WhatsApp
                </a>
              </div>

              <p className="mt-7 font-mono text-[12px] text-muted tracking-[.02em]">
                API oficial da Meta · Google Agenda · Pix na conversa
              </p>

              <p className="mt-10 text-[14px] text-muted max-w-[38ch] min-[900px]:hidden">
                Toque numa pergunta e veja ela responder de verdade.
              </p>
            </div>

            {/* O aparelho desce e invade a seção de baixo, em vez de ficar
                sentado dentro da coluna. Ele NÃO é cortado: agora é
                interativo, e cortar comeria os botões. */}
            <div className="relative flex justify-center min-[900px]:justify-end min-[900px]:translate-y-10">
              <div>
                <Telefone />
                <p className="hidden min-[900px]:block mt-4 text-center font-mono text-[11.5px] text-muted">
                  toque numa pergunta
                </p>
              </div>
            </div>
          </div>
          <div id="fim-do-hero" aria-hidden="true" className="h-px" />
        </section>

        <ComoFunciona />

        <section id="planos" className="bg-ink text-mist py-24">
          <div className="wrap">
            <p className="font-mono text-[12px] text-sky-2">seção em construção</p>
          </div>
        </section>
      </main>
    </>
  );
}
