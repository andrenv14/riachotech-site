'use client';

import { useEffect, useState } from 'react';

/* O botão do topo só aparece depois que o hero sai da tela.

   Motivo, medido em 08/09/2026: com ele sempre visível, "Falar no WhatsApp" no
   nav e "Testar no seu WhatsApp" no hero ficavam na MESMA tela querendo a
   mesma coisa — o padrão que a taste-skill reprova como CTA de intenção
   duplicada, e que o `detectar-tells.js` acusa. Some o de cima enquanto o de
   baixo está à vista, e a primeira tela passa a ter uma chamada só. */
export default function Nav({ zap }: { zap: string }) {
  const [passouDoHero, setPassouDoHero] = useState(false);

  useEffect(() => {
    const alvo = document.getElementById('fim-do-hero');
    if (!alvo) return;
    const obs = new IntersectionObserver(
      ([e]) => setPassouDoHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      { rootMargin: '0px' },
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-white/10">
      <nav className="wrap flex items-center justify-between h-[62px]">
        <a href="/" className="flex items-center gap-2.5 font-display text-[19px] text-ink min-h-[44px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Riacho Tech" width={340} height={91} className="h-[30px] w-auto [filter:brightness(0)_invert(1)]" />
        </a>
        {/* `inline-flex` + `min-h-[44px]`, a mesma clausula do link do logo
            acima: sem ela os dois davam 24px de altura e eram os UNICOS alvos
            reprovados da pagina — 2 de 21 em 820 e em 1280. Passavam sem ser
            vistos porque em 390 o nav esconde os dois, e o numero de alvos que
            o projeto media era o de 390. */}
        <div className="hidden min-[820px]:flex items-center gap-7 text-[15px] font-medium">
          <a href="#como-funciona" className="inline-flex items-center min-h-[44px] text-mist hover:text-white">Como funciona</a>
          <a href="#planos" className="inline-flex items-center min-h-[44px] text-mist hover:text-white">Planos</a>
        </div>
        <a
          href={zap}
          className={`btn btn-primary transition-opacity duration-300 ${
            passouDoHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          Falar no WhatsApp
        </a>
      </nav>
    </header>
  );
}
