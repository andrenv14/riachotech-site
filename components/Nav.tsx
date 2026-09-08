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
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-[2px] border-b border-line">
      <nav className="wrap flex items-center justify-between h-[62px]">
        <a href="/" className="flex items-center gap-2.5 font-display text-[19px] text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Riacho Tech" width={340} height={91} className="h-[26px] w-auto" />
        </a>
        <div className="hidden min-[820px]:flex items-center gap-7 text-[15px] font-medium">
          <a href="#como-funciona" className="text-muted hover:text-ink">Como funciona</a>
          <a href="#planos" className="text-muted hover:text-ink">Planos</a>
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
