/* O ARTEFATO do herói: uma landing page inteira, alta, CORTADA pela borda de
   baixo do herói.

   Por que ela mudou de forma em 08/09/2026, e o motivo é de conceito, não de
   acabamento. A versão anterior mostrava uma página BAIXA e chapada, inteira
   dentro da caixa — e o fundador chamou o herói de fraquíssimo. Ele estava
   certo pelo motivo mais duro possível: numa página que vende landing page, o
   herói mostrava uma página PIOR do que aquela em que o leitor já estava. O
   artefato desmentia a oferta em vez de sustentá-la.

   As duas correções, e as duas vêm da `nao-slop`:

   - ELA SANGRA. Página cortada pela viewport lê como janela para algo maior;
     página sentada dentro de uma caixa centralizada lê como ilustração. É a
     alavanca 2 medida no concorrente, e era a que faltava aqui.
   - ELA É BONITA POR DENTRO. Hierarquia de verdade — um topo que domina, lista
     de serviços com PREÇO alinhado à direita, tipo em três escalas. Página de
     vender não é feita de faixas de peso igual; era isso que fazia a peça ler
     como formulário.

   A FOTO entrou em 08/09/2026, na faixa do topo, e o texto anterior aqui dizia
   o contrário ("o que ela não tem, e é declarado: foto") — ficou falso no dia em
   que a foto chegou. Ela é própria da peça, não reusada da home, que era o
   motivo de não haver nenhuma. É o lugar onde a foto do CLIENTE entraria, e
   trocá-la não exige mudar mais nada.

   ELA NÃO É MAIS INTERATIVA, e isso também é decisão: a conversa que os botões
   geram ganhou seção própria, onde cabe mostrá-la inteira. Aqui ela seria uma
   segunda coisa disputando a mesma tela. Sem estado, sem `use client`, sem JS.

   O negócio é inventado, e é preciso que seja: nome de cliente, telefone de
   cliente e captura de conversa real não entram no site. Mesmo critério da
   "Camila Nunes" e do "Bruno" da home. */

/* TRÊS serviços, e não quatro: a peça atravessa a borda do herói e precisa
   terminar ANTES do conteúdo da seção seguinte. Cada linha aqui custa altura
   real, e a lista existe para mostrar que a página tem preço — não para ser um
   cardápio. */
const SERVICOS = [
  { nome: 'Corte', preco: 'R$ 60' },
  { nome: 'Barba', preco: 'R$ 35' },
  { nome: 'Corte + barba', preco: 'R$ 85' },
];

function Zap({ children }: { children: React.ReactNode }) {
  return (
    <span className="mini-zap">
      <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" fill="currentColor">
        <path d="M8 0a8 8 0 00-6.9 12L0 16l4.1-1.1A8 8 0 108 0zm4.6 11.3c-.2.5-1 1-1.4 1-.4.1-.8.1-1.3-.1a11 11 0 01-4.8-4.2c-.4-.6-.6-1.2-.6-1.8 0-.6.3-1 .5-1.2.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c0 .1.1.3 0 .4l-.3.4-.2.3c-.1.1-.2.2 0 .4a7.4 7.4 0 003.2 2.6c.2.1.3.1.4 0l.7-.8c.1-.2.3-.1.4-.1l1.4.7c.2.1.3.2.4.3v.6z" />
      </svg>
      {children}
    </span>
  );
}

function Secao({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-5 border-t border-[color:var(--color-line)]">
      <div className="font-mono text-[9.5px] uppercase tracking-[.13em] text-muted">{rotulo}</div>
      {children}
    </div>
  );
}

export default function MiniPagina() {
  return (
    /* `aria-hidden`: a peça é a FIGURA de uma página, não uma página. Para quem
       usa leitor de tela, ouvir "Barbearia King · Corte R$ 60" no meio do herói de
       outra empresa é ruído que promete um negócio que não existe. O que ela
       ilustra está dito em texto no herói e na seção das mensagens. */
    <div className="peca w-full max-w-[420px] overflow-hidden border border-[color:var(--color-line)]" aria-hidden="true">

      <div className="flex items-center justify-between gap-3 px-6 py-3.5">
        <div className="font-display text-[17px] text-ink leading-none">Barbearia King</div>
        <div className="font-mono text-[9.5px] uppercase tracking-[.12em] text-muted">sudoeste</div>
      </div>

      {/* A FOTO do negócio, na faixa larga logo abaixo do nome. Ela NÃO leva
          texto por cima, e isso foi decisão de desenho: texto sobre foto exige
          véu escuro para passar nos 4,5:1, e o véu mudaria o clima da peça
          inteira. Com o título por baixo, o contraste continua sendo o do texto
          sobre `sand`, que já está medido.

          `width` e `height` declarados porque a `design-site` exige e porque é
          o que segura o CLS em zero — e ele está em zero. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/salao-cadeira-840.webp"
        alt=""
        width={840}
        height={280}
        className="block w-full h-auto"
      />

      {/* O TOPO da página do cliente, e é ele que domina. */}
      <div className="mini-topo px-6 pt-5 pb-6">
        <div className="font-display text-[28px] leading-[1.1] text-ink max-w-[11ch]">
          Corte e barba, hora marcada.
        </div>
        {/* `div`, e não `<p>`: o texto DENTRO da peça é legenda de figura, e o
            chão de 16px do projeto vale para corpo de leitura — `<p>` e `<li>`.
            A home resolve o mesmo caso do mesmo jeito, e por isso as falas do
            celular dela são span, nunca parágrafo. Marcar figura como parágrafo
            é que era o erro, não o tamanho. */}
        <div className="mt-2.5 text-[14px] leading-[1.45] text-ink/75 max-w-[30ch]">
          Corte, barba e navalha no Sudoeste.
        </div>
        <Zap>Marcar horário</Zap>
      </div>

      <Secao rotulo="serviços">
        {/* PREÇO alinhado à direita, com fio entre as linhas: é o que uma página
            de negócio de verdade tem, e é o que dá à peça a tensão de escala que
            faltava — nome em Inter, valor em display. */}
        <ul className="mt-3">
          {SERVICOS.map((s) => (
            <li
              key={s.nome}
              className="flex items-baseline justify-between gap-4 py-2 border-b border-[color:var(--color-line)] last:border-b-0"
            >
              <span className="text-[15px] text-ink">{s.nome}</span>
              <span className="font-display text-[16px] text-ink">{s.preco}</span>
            </li>
          ))}
        </ul>
        <Zap>Perguntar sobre a barba</Zap>
      </Secao>

      <Secao rotulo="horários">
        <div className="mt-3 font-display text-[19px] leading-[1.25] text-ink">
          Terça a sábado, das 9h às 19h
        </div>
        <Zap>Ver se tem sábado</Zap>
      </Secao>

      {/* O RODAPÉ fecha a página. Ele existe porque a peça ATRAVESSA a borda
          do herói e termina dentro da seção clara — e ali não há corte para
          escondê-la, então ela precisa acabar por conta própria. Enquanto ela
          era cortada rente à virada de cor, este bloco era uma seção pela
          metade, de propósito; corte reto num cartão branco, porém, lê como
          amputação e não como continuação, que foi o achado do fundador. */}
      <div className="px-6 py-4 border-t border-[color:var(--color-line)] text-right font-mono text-[9.5px] uppercase tracking-[.12em] text-muted">
        instagram · como chegar
      </div>
    </div>
  );
}
