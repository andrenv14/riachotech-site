'use client';

import { useEffect, useRef } from 'react';

/* Acrescenta a classe `visivel` quando o elemento entra na tela, UMA vez.

   Deliberadamente burro: ele nao anima nada por conta propria, so avisa que
   chegou. Quem decide o que se move e' o CSS. Assim nao existe "sistema de
   animacao" para alguem pendurar entrada em toda secao depois — que e' o
   padrao que a design-site proibe e que a taste-skill lista como cara-de-IA.

   Sem observador disponivel, ou com movimento reduzido, o elemento ja nasce
   `visivel`: a informacao nunca depende da animacao ter rodado. */
export default function AoEntrar({
  children, className = '',
}: { children: React.ReactNode; className?: string }) {
  const alvo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = alvo.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('visivel'); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visivel'); obs.disconnect(); } },
      { rootMargin: '0px 0px -12% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <div ref={alvo} className={className}>{children}</div>;
}
