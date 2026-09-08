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

   O QUE ELA NÃO TEM, e é declarado: foto. As duas fotos do repositório já são
   usadas na home, e reusar qualquer uma aqui leria como "só temos uma foto". A
   faixa do topo é o lugar onde a foto do CLIENTE entra — quando houver uma, ela
   troca o fundo `sand` e nada mais na peça precisa mudar.

   ELA NÃO É MAIS INTERATIVA, e isso também é decisão: a conversa que os botões
   geram ganhou seção própria, onde cabe mostrá-la inteira. Aqui ela seria uma
   segunda coisa disputando a mesma tela. Sem estado, sem `use client`, sem JS.

   O negócio é inventado, e é preciso que seja: nome de cliente, telefone de
   cliente e captura de conversa real não entram no site. Mesmo critério da
   "Camila Nunes" e do "Bruno" da home. */

const SERVICOS = [
  { nome: 'Corte', preco: 'R$ 60' },
  { nome: 'Coloração', preco: 'R$ 180' },
  { nome: 'Escova', preco: 'R$ 45' },
  { nome: 'Hidratação', preco: 'R$ 70' },
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
    <div className="px-6 py-7 border-t border-[color:var(--color-line)]">
      <div className="font-mono text-[9.5px] uppercase tracking-[.13em] text-muted">{rotulo}</div>
      {children}
    </div>
  );
}

export default function MiniPagina() {
  return (
    /* `aria-hidden`: a peça é a FIGURA de uma página, não uma página. Para quem
       usa leitor de tela, ouvir "Salão Aurora · Corte R$ 60" no meio do herói de
       outra empresa é ruído que promete um negócio que não existe. O que ela
       ilustra está dito em texto no herói e na seção das mensagens. */
    <div className="peca w-full max-w-[420px] overflow-hidden" aria-hidden="true">

      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div className="font-display text-[17px] text-ink leading-none">Salão Aurora</div>
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
        height={360}
        className="block w-full h-auto"
      />

      {/* O TOPO da página do cliente, e é ele que domina. */}
      <div className="mini-topo px-6 pt-7 pb-9">
        <div className="font-display text-[32px] leading-[1.08] text-ink max-w-[11ch]">
          Cabelo bom, hora marcada.
        </div>
        {/* `div`, e não `<p>`: o texto DENTRO da peça é legenda de figura, e o
            chão de 16px do projeto vale para corpo de leitura — `<p>` e `<li>`.
            A home resolve o mesmo caso do mesmo jeito, e por isso as falas do
            celular dela são span, nunca parágrafo. Marcar figura como parágrafo
            é que era o erro, não o tamanho. */}
        <div className="mt-3 text-[14px] leading-[1.45] text-ink/75 max-w-[26ch]">
          Corte, coloração e escova no Sudoeste, com hora marcada de verdade.
        </div>
        <Zap>Marcar horário</Zap>
      </div>

      <Secao rotulo="serviços">
        {/* PREÇO alinhado à direita, com fio entre as linhas: é o que uma página
            de negócio de verdade tem, e é o que dá à peça a tensão de escala que
            faltava — nome em Inter, valor em display. */}
        <ul className="mt-4">
          {SERVICOS.map((s) => (
            <li
              key={s.nome}
              className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[color:var(--color-line)] last:border-b-0"
            >
              <span className="text-[15px] text-ink">{s.nome}</span>
              <span className="font-display text-[16px] text-ink">{s.preco}</span>
            </li>
          ))}
        </ul>
        <Zap>Perguntar sobre coloração</Zap>
      </Secao>

      <Secao rotulo="horários">
        <div className="mt-3 font-display text-[19px] leading-[1.25] text-ink">
          Terça a sábado, das 9h às 19h
        </div>
        <div className="mt-2 text-[14px] leading-[1.45] text-muted">
          Domingo e segunda a gente descansa.
        </div>
        <Zap>Ver se tem sábado</Zap>
      </Secao>

      {/* A última seção existe para ser CORTADA: é ela que diz que a página
          continua abaixo da dobra. Se um dia a peça deixar de sangrar, esta
          seção precisa ganhar fim — meia seção visível dentro de uma caixa
          fechada lê como defeito, não como corte. */}
      <Secao rotulo="onde fica">
        <div className="mt-3 font-display text-[19px] leading-[1.25] text-ink">
          Quadra comercial, Sudoeste
        </div>
        <div className="mt-2 text-[14px] leading-[1.45] text-muted">
          Estacionamento na porta, e dá pra ir a pé das quadras vizinhas.
        </div>
      </Secao>
    </div>
  );
}
