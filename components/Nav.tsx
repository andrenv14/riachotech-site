'use client';

import { useEffect, useState } from 'react';

/* A barra de topo.

   Ela existia como esboço até 08/09/2026 — logo, dois links e um botão — e o
   fundador apontou que não tinha sido desenhada. Quatro decisões, e cada uma
   conserta uma coisa que estava errada:

   1. DOIS links para SEIS seções. Agora são os quatro destinos que o leitor
      pode querer, e entre eles "o que ela faz", que é a seção mais forte da
      página e não tinha como ser alcançada pelo topo.
   2. A barra era uma faixa navy com fio embaixo POR CIMA de um hero navy: no
      alto da página o fio desenhava uma linha atravessada sem separar coisa
      nenhuma, porque dos dois lados dele a cor era a mesma. O fio e a sombra só
      entram depois que o hero sai — antes disso a barra é a continuação do
      hero, e some.
   3. Não havia como saber onde se está. O link da seção corrente acende, com
      um traço embaixo. Isso é movimento que informa, e não enfeite: é o único
      da barra.
   4. O botão continua aparecendo só depois do hero, pelo motivo já medido: com
      ele sempre visível, "Falar no WhatsApp" no topo e "Testar no seu WhatsApp"
      no hero disputam a mesma tela querendo a mesma coisa — CTA de intenção
      duplicada, que o `detectar-tells.js` acusa.

   NO CELULAR os links não aparecem, e isso é decisão, não esquecimento: são
   quatro âncoras numa página de rolagem única, e um menu sanfona para isso
   custa um painel, foco, `Esc` e um alvo a mais no topo para entregar o que a
   rolagem já entrega. O que o celular mantém é o que ele precisa: a marca e,
   depois do hero, a chamada. */

/* As seções da HOME. Elas são o padrão, e não a única lista possível: desde a
   página `/landing-page/` a barra serve mais de uma página, e cada uma passa as
   próprias âncoras por `secoes`. Parametrizado em vez de duplicado — a barra
   tem quatro comportamentos (fio depois do hero, link corrente, botão que
   entra, alvo de 44px) que nenhuma cópia ia manter em dia. */
const SECOES_HOME = [
  { id: 'como-funciona', texto: 'Como funciona' },
  { id: 'recursos', texto: 'O que ela faz' },
  { id: 'segmentos', texto: 'Pra quem é' },
  { id: 'planos', texto: 'Planos' },
];

export default function Nav({
  zap,
  secoes = SECOES_HOME,
}: {
  zap: string;
  secoes?: { id: string; texto: string }[];
}) {
  const SECOES = secoes;
  const [passouDoHero, setPassouDoHero] = useState(false);
  const [atual, setAtual] = useState<string | null>(null);

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

  /* Qual seção está sendo lida. A faixa de observação é a fatia logo abaixo da
     barra (`-62px` no topo, `-58%` embaixo): sem recortá-la, uma seção alta
     continuaria "corrente" enquanto a seguinte já ocupasse a tela inteira. */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis.length) setAtual(visiveis[0].target.id);
      },
      { rootMargin: '-62px 0px -58% 0px' },
    );
    for (const s of SECOES) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-ink textura transition-shadow duration-300 ${
        passouDoHero
          ? 'border-b border-white/10 shadow-[0_10px_30px_-24px_rgba(0,0,0,.9)]'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="wrap flex items-center justify-between h-[62px]">
        <a href="/" className="flex items-center gap-2.5 font-display text-[19px] text-ink min-h-[44px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Riacho Tech" width={340} height={91} className="h-[30px] w-auto [filter:brightness(0)_invert(1)]" />
        </a>

        {/* `inline-flex` + `min-h-[44px]`: sem isso os links davam 24px de altura
            e eram os únicos alvos reprovados da página — passavam sem ser vistos
            porque em 390 o nav os esconde, e o número que o projeto media era o
            de 390. */}
        <div className="hidden min-[820px]:flex items-center gap-6 text-[15px] font-medium">
          {SECOES.map((s) => {
            const ativo = atual === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={ativo ? 'true' : undefined}
                /* `min-w-[44px]` além do `min-h`: o alvo é uma ÁREA, e a
                   altura sozinha não o fecha. Passou despercebido enquanto o
                   link mais curto da barra foi "Planos"; a página
                   `/landing-page/` trouxe "Preço", que mede 42px de largura e
                   reprovou em 820 e em 1280. Nos links largos o `min-w` e o
                   `justify-center` não mudam nada — por isso a home não muda. */
                className={`relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
                  ativo ? 'text-white' : 'text-mist hover:text-white'
                }`}
              >
                {s.texto}
                {/* O traço mora sempre no DOM e muda de escala, não de
                    existência: assim ele desliza em vez de piscar, e sem
                    JS nenhum link acende — o que não tira nada, porque o
                    destino continua sendo o mesmo link. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-[13px] h-[2px] origin-left rounded-full bg-sky transition-transform duration-300 ${
                    ativo ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
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
