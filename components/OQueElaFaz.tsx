'use client';

import { useEffect, useState } from 'react';
import AoEntrar from '@/components/AoEntrar';

/* "O que ela faz" — o repertório, e o ARTEFATO é o herói.

   Passada de design de 08/09/2026, em três voltas com o fundador. O que estava
   errado no começo, e o que cada volta corrigiu:

   1. O arquivo prometia "cada bloco mostra o artefato daquela capacidade" e
      dois dos cinco não mostravam nada — justo AGENDA, o principal, e VOCÊ.
      Afirmação sem artefato é a forma mais fraca de prova, e a seção
      argumentava contra si mesma. Hoje os seis mostram.
   2. Os artefatos que existiam eram caixas de `white/8`, que sobre navy leem
      como div. A peça passou a ser CLARA sobre o navy (`.peca`, em
      `app/globals.css`): objeto claro sobre escuro lê como tela capturada do
      produto. Não é um segundo celular — isso repetiria a `PraQuemE`, onde a
      conversa por ramo já mora.
   3. O fundo era navy chapado, que é a primeira causa de página morta na
      `nao-slop`. Entrou a luz da `.vitrine`.
   4. Os vãos: com `subgrid` os títulos alinham, e `self-end` na faixa da peça
      manda a sobra para cima, sob o rótulo, em vez de abrir buraco entre a
      peça e o título.
   5. A simetria, e é o motivo de existirem SEIS blocos. Cinco numa grade de
      três colunas é 3+2 e não fecha por construção — a faixa de baixo ficava
      com uma peça larga e uma estreita, e nenhum ajuste de espaço resolvia
      isso, porque o defeito era a contagem. O sexto bloco não foi inventado
      para encher a grade: a Sofia OUVE ÁUDIO desde 06/09, está em produção, e
      a página não contava. As seis peças têm a mesma largura de coluna e
      alturas aproximadas por CONTEÚDO, nunca por espaçador.

   Os artefatos se amarram entre si de propósito: o evento da agenda é a
   consulta da Camila, o lembrete é o lembrete DAQUELE evento, o áudio é a
   mensagem que abriu a conversa, e o valor do Pix é o do item do catálogo.
   Peça que contradiz a vizinha na mesma tela é o defeito que a foto do
   catálogo já tinha corrigido uma vez.

   INTERAÇÃO. Três blocos respondem ao toque, e cada um mostra o mecanismo em
   vez de enfeitar: escolher um dos horários que ela ofereceu reescreve o
   evento E os dois lembretes; copiar o código do Pix copia de verdade; e o
   áudio revela o que ela entendeu. Nenhuma inventa comportamento que o produto
   não tem — em particular, o bloco de áudio NÃO toca som: ele mostra a
   transcrição, que é o que o produto faz com o áudio.

   Sem JS os seis blocos mostram a informação inteira: o evento aparece no
   primeiro horário, o código do Pix fica visível e selecionável (só o botão de
   copiar não é renderizado), e a transcrição já vem aberta. O que se perde é a
   escolha, não o conteúdo.

   O conteúdo continua saindo da tabela "O que a assistente faz (verificado no
   código)" de `docs/contexto/negocio.md`. Nada aqui promete o que ela não faz. */

/* O bloco tem TRÊS faixas — rótulo, peça, texto — e elas são as linhas do grid
   da seção, por `subgrid`. Sem isso cada bloco empilha sozinho, as peças de uma
   mesma faixa têm alturas diferentes e os títulos caem em alturas distintas.
   Onde não houver `subgrid`, o bloco empilha — a informação não depende dele,
   só o alinhamento. */
function Bloco({
  rotulo, titulo, legenda, children,
}: {
  rotulo: string; titulo: string; legenda: string; children: React.ReactNode;
}) {
  return (
    <div className="min-[820px]:col-span-4 row-span-3 grid grid-rows-subgrid border-t border-white/12 pt-6">
      <div className="font-mono text-[11px] uppercase tracking-[.13em] text-sky">{rotulo}</div>
      {/* A peça ESTICA para a altura da faixa, e as seis ficam com topo e pé
          na mesma linha. Foi a terceira tentativa, e as duas primeiras erraram
          de jeitos que vale registrar: com o padrão do grid a sobra caía entre
          a peça e o título (vão de 28px a 146px, e a linha de títulos parecia
          solta); com `self-end` a sobra subia para debaixo do rótulo, o que era
          melhor mas continuava desigual — e a ORDEM de quem sobrava mudava
          entre 1280 e 820, então nenhum ajuste de conteúdo fechava as duas
          larguras ao mesmo tempo.

          Esticando, não há sobra: quem distribui é cada peça por dentro, com
          `mt-auto` no último bloco. `mt-auto` e não `justify-end` — com
          overflow, `justify-content: flex-end` esconde conteúdo para cima e o
          navegador nem conta como rolável. */}
      <div>{children}</div>
      <div>
        <h3 className="font-display text-[21px] leading-[1.25] text-white max-w-[26ch]">{titulo}</h3>
        <p className="mt-3.5 text-[16px] leading-[1.55] text-mist max-w-[42ch]">{legenda}</p>
      </div>
    </div>
  );
}

/* Os dois horários que ela ofereceu, e o evento que cada um vira. O segundo par
   não é decoração: ele prova que quem decide é a escolha do cliente, que é o
   que a legenda afirma. `hora` é a mesma string que os lembretes citam, para as
   três peças nunca discordarem na mesma tela. */
const HORARIOS = [
  { chip: 'quinta, 16:30', dia: 'quinta, 12', hora: '16:30', fim: '17:00', fala: '16h30' },
  { chip: 'sexta, 09:30', dia: 'sexta, 13', hora: '09:30', fim: '10:00', fala: '9h30' },
];

const CODIGO_PIX =
  '00020126580014br.gov.bcb.pix0136a1f3e2b74c9d8a51' +
  '…520400005303986540408.005802BR5913RIACHO TECH6009BRASILIA';

/* Alturas das barras da onda, em px. É um desenho, não leitura de sinal — por
   isso a lista é fixa e mora aqui, e não num gerador aleatório que mudaria a
   cada render e faria a peça piscar. */
const ONDA = [5, 11, 17, 9, 20, 13, 24, 15, 8, 19, 12, 22, 10, 16, 7, 21, 14, 9, 18, 11, 6, 15, 20, 10, 5];

export default function OQueElaFaz() {
  const [horario, setHorario] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const [transcrito, setTranscrito] = useState(false);
  /* O botão de copiar só existe onde há JS: sem ele seria uma affordance que
     não faz nada, e o código já está visível e selecionável ao lado. Os outros
     dois controles degradam mostrando o conteúdo inteiro, então podem existir
     sempre. */
  const [temJs, setTemJs] = useState(false);
  useEffect(() => setTemJs(true), []);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(CODIGO_PIX);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* Sem permissão de área de transferência não há o que fazer além de não
         mentir: o estado não muda, e o código continua ali para seleção. */
    }
  }

  const h = HORARIOS[horario];

  return (
    <section id="recursos" className="vitrine textura py-24 min-[900px]:py-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-[clamp(30px,4.2vw,46px)] leading-[1.15] text-white max-w-[20ch]">
          Um atendente que não dorme, não esquece e não inventa horário.
        </h2>
        <p className="mt-4 text-[17px] text-mist max-w-[54ch]">
          Tudo isto já está rodando hoje, no WhatsApp de um negócio de verdade.
          Nada aqui é promessa de versão futura.
        </p>

        <div className="mt-14 grid grid-cols-1 min-[820px]:grid-cols-12 gap-x-10 gap-y-7">

          <Bloco
            rotulo="agenda"
            titulo="Olha a sua agenda no instante da pergunta"
            legenda="Oferece dois ou três horários livres em vez da grade inteira, e marca o
              que o cliente escolher. Cada pessoa que atende tem a própria agenda."
          >
            {/* UMA peça com duas seções, e não duas peças: no pix e no lembrete
                as duas camadas são duas MENSAGENS separadas, e ali a separação
                é o que a legenda promete. Aqui é um episódio só da agenda — o
                que ela ofereceu e o que virou evento —, então divide por fio.

                Os chips são o controle: trocar de horário reescreve o evento
                abaixo e os dois lembretes do bloco vizinho, que é exatamente o
                mecanismo que a legenda descreve. */}
            <div className="peca flex h-full flex-col px-4 py-3.5">
              <div className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                ela ofereceu
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {HORARIOS.map((op, i) => (
                  <button
                    key={op.chip}
                    type="button"
                    aria-pressed={i === horario}
                    onClick={() => setHorario(i)}
                    className={`inline-flex items-center min-h-[44px] rounded-[9px] border px-3.5 text-[13px] transition-colors ${
                      i === horario
                        ? 'border-signal bg-signal text-white'
                        : 'border-line text-ink hover:border-ink'
                    }`}
                  >
                    {op.chip}
                  </button>
                ))}
              </div>
              <div className="mt-auto flex gap-3 border-t border-line pt-3.5">
                <span aria-hidden="true" className="mt-0.5 h-[36px] w-[3px] flex-shrink-0 rounded-full bg-signal" />
                {/* `aria-live`: quem usa leitor de tela precisa ouvir que o
                    evento mudou, senão o clique no chip não anuncia nada. */}
                <div className="min-w-0" aria-live="polite">
                  <div className="text-[14.5px] font-semibold leading-[1.3] text-ink">
                    Camila Nunes · Clínica geral
                  </div>
                  <div className="mt-1 text-[13.5px] text-muted">
                    {h.dia} · {h.hora} às {h.fim}
                  </div>
                  <div className="mt-2 font-mono text-[11px] leading-[1.6] text-muted">
                    na agenda da Marina
                    <br />
                    criado pela Sofia às 14:07
                  </div>
                </div>
              </div>
            </div>
          </Bloco>

          <Bloco
            rotulo="pix"
            titulo="Cobra dentro da conversa"
            legenda="O valor vem do catálogo cadastrado, e o código copia-e-cola vai em
              mensagem separada, para o cliente copiar sem pegar texto junto."
          >
            {/* DUAS peças empilhadas, e é a peça que prova a frase: a legenda
                diz "mensagem separada", então são duas mensagens na tela. */}
            <div className="flex h-full flex-col gap-2.5">
              <div className="peca px-4 py-3.5">
                <div className="text-[14px] text-muted">Banho e tosa · porte médio</div>
                <div className="mt-1 font-display text-[26px] leading-none text-ink">R$ 80,00</div>
                {/* A procedência do valor, que é o que a legenda afirma: ele não
                    foi digitado na hora, veio do item cadastrado — o mesmo que
                    aparece inteiro na peça do catálogo, com o mesmo preço e a
                    mesma duração. */}
                <div className="mt-2.5 font-mono text-[11px] text-muted">1h · do item do catálogo</div>
              </div>
              <div className="peca mt-auto px-4 pt-3.5 pb-1">
                <div className="font-mono text-[11.5px] leading-[1.55] text-ink break-all">
                  {CODIGO_PIX}
                </div>
                {temJs && (
                  <button
                    type="button"
                    onClick={copiar}
                    className="inline-flex items-center min-h-[44px] font-mono text-[11px] uppercase tracking-[.09em] text-signal-dark hover:underline"
                  >
                    {copiado ? 'código copiado' : 'copiar código'}
                  </button>
                )}
              </div>
            </div>
          </Bloco>

          <Bloco
            rotulo="lembrete"
            titulo="Avisa antes da hora, sozinha"
            legenda="Um aviso no dia anterior e outro uma hora antes, os dois por mensagem
              de utilidade da API oficial, com o texto aprovado pela Meta."
          >
            {/* Era uma bolha de conversa; virou o AVISO como o cliente o vê
                chegar. O único movimento automático desta seção está aqui, e
                ele significa alguma coisa: um lembrete CHEGA. Sem JS, nasce
                visível.

                São DOIS avisos porque são dois lembretes. A hora sai do MESMO
                objeto que o evento da peça de agenda, e não de um texto
                repetido: escolher outro horário lá reescreve os dois aqui, e as
                três peças não têm como discordar na tela. */}
            <AoEntrar className="h-full"><div className="chega flex h-full flex-col gap-2.5">
              <div className="peca px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                    24 h antes
                  </span>
                  <span className="font-mono text-[11px] text-muted">na véspera</span>
                </div>
                <div className="mt-2 text-[14px] leading-[1.45] text-ink">
                  Oi, Camila! Passando pra lembrar da sua consulta amanhã às {h.fala}.
                </div>
              </div>
              <div className="peca px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                    1 h antes
                  </span>
                  <span className="font-mono text-[11px] text-muted">no dia</span>
                </div>
                <div className="mt-2 text-[14px] leading-[1.45] text-ink">
                  Camila, sua consulta é daqui a uma hora, às {h.fala}. Até já!
                </div>
              </div>
              {/* A guarda de antecedência, em produção desde 08/09: se a
                  marcação for feita depois da hora em que o aviso de 24 h
                  sairia, ele não sai. Fica na peça e não na legenda porque é
                  limite do mecanismo, e limite declarado vale mais que promessa
                  redonda. */}
              <div className="mt-auto font-mono text-[11px] leading-[1.6] text-sky-2">
                se a marcação for feita depois da hora
                <br />
                do aviso de 24 h, só o de 1 h sai
              </div>
            </div></AoEntrar>
          </Bloco>

          <Bloco
            rotulo="catálogo"
            titulo="Mostra o serviço com foto e preço"
            legenda="Nome, valor e foto de verdade, não uma lista de texto. A duração sai do
              próprio item, e é ela que reserva o espaço na agenda."
          >
            {/* A foto era de 44px ao lado do texto, o que é ícone, não "mostrar
                o serviço". Continua placeholder declarado — entra foto de
                cliente quando houver catálogo de cliente no ar.
                eslint-disable-next-line @next/next/no-img-element */}
            <div className="peca flex h-full flex-col">
              <img
                src="/catalogo-banho-tosa-640.webp"
                alt=""
                width={640}
                height={480}
                className="peca-foto min-h-[156px] w-full flex-1 object-cover"
              />
              <div className="px-4 py-3.5">
                <div className="text-[15px] leading-[1.35] text-ink">Banho e tosa · porte médio</div>
                <div className="mt-1.5 font-mono text-[12.5px] text-muted">R$ 80,00 · 1h</div>
              </div>
            </div>
          </Bloco>

          <Bloco
            rotulo="áudio"
            titulo="Entende o áudio que o cliente manda"
            legenda="Quem está com as mãos ocupadas grava em vez de digitar. Ela transcreve e
              responde no mesmo fio, sem ninguém pedir para repetir por escrito."
          >
            {/* O bloco que faltava, e ele não foi inventado para fechar a grade:
                a Sofia ouve áudio desde 06/09 e está em produção.

                A peça NÃO toca som, e é por isso que o controle não tem
                triângulo de play nem fala em ouvir: ele diz "ver a transcrição",
                que é o que acontece. A onda é desenho, e varre da esquerda para
                a direita ao revelar — o que se mostra é a leitura, não a
                reprodução.

                A barra fica à ESQUERDA e em largura de bolha, e não atravessada
                na peça. O lado é o da tela do DONO, que é para quem esta seção
                fala: o áudio chega do cliente, então entra pela esquerda, e a
                resposta da Sofia sai à direita — o mesmo par de lados da peça de
                "você". A largura de bolha também some com o achado de raio não
                concêntrico do `detectar-tells`: filho de largura cheia dentro de
                peça com padding pede raio 0, e bolha de canto reto seria errada
                pelos dois motivos.

                Sem JS a transcrição já vem aberta, então o conteúdo nunca
                depende do clique. */}
            <div className="peca flex h-full flex-col px-4 py-3.5">
              <button
                type="button"
                onClick={() => { setTranscrito(false); requestAnimationFrame(() => setTranscrito(true)); }}
                aria-label="reencenar a leitura do áudio"
                className="flex w-[86%] self-start items-center gap-3 rounded-[10px] border border-line bg-paper px-3 py-3 min-h-[44px] text-left transition-colors hover:bg-paper-2"
              >
                <span aria-hidden="true" className="flex h-6 items-end gap-[2px]">
                  {ONDA.map((alt, i) => (
                    <span
                      key={i}
                      className={`w-[2px] rounded-full bg-line ${transcrito ? 'onda-passa' : ''}`}
                      style={{ height: `${alt}px`, animationDelay: `${(i * 0.028).toFixed(3)}s` }}
                    />
                  ))}
                </span>
                <span className="ml-auto font-mono text-[11px] text-muted">0:07</span>
              </button>

              <div className="mt-3 border-t border-line pt-3">
                <div className="font-mono text-[10px] uppercase tracking-[.09em] text-muted">
                  o que ela entendeu
                </div>
                <div className="mt-1.5 text-[14px] leading-[1.45] text-ink">
                  “oi, queria ver se tem horário pra amanhã de manhã”
                </div>
              </div>

              {/* A resposta fecha o fio, que é o que a legenda promete —
                  "responde no mesmo fio". Sem ela a peça mostrava a Sofia
                  ouvindo e não mostrava a Sofia respondendo. */}
              <div className="mt-auto flex justify-end pt-3">
                <div className="fala-peca fala-peca-sofia">
                  Tenho amanhã às 9h ou às 10h30. Qual prefere?
                </div>
              </div>
            </div>
          </Bloco>

          <Bloco
            rotulo="você"
            titulo="Chama você quando o caso pede gente"
            legenda="No mesmo número e no seu próprio aplicativo, por Coexistence. O que você
              escreve entra no histórico marcado como seu."
          >
            {/* O artefato aqui é a MARCA DE AUTORIA: as duas falas do negócio
                saem do mesmo número, e o histórico sabe qual foi de quem. Isso
                é o mecanismo, não enfeite.

                Os LADOS aqui são o inverso dos da `PraQuemE`, e isso é
                deliberado: lá o visitante se põe no lugar do CLIENTE testando a
                Sofia, então a fala dele sai à direita. Nesta seção o texto fala
                com o DONO o tempo todo ("a SUA agenda", "chama VOCÊ"), então
                vale a tela do dono — o que chega do cliente entra pela esquerda
                e o que sai do negócio vai à direita. Achado do fundador, e ele
                pegou pelo bloco de áudio.

                A fala do cliente abre a peça porque a peça mostrava a delegação
                sem mostrar o que a provocou, e é o que a legenda pressupõe; de
                quebra, é o que faz esta peça medir como as duas vizinhas da
                faixa, sem espaçador. Sofia e você ficam do MESMO lado, e é esse
                o ponto do bloco: as duas saem do mesmo número, e só a marca de
                autoria as distingue. */}
            <div className="peca flex h-full flex-col gap-2.5 p-5">
              <div className="fala-peca fala-peca-cliente self-start">
                é sobre um resultado de exame, prefiro falar com alguém
              </div>
              <span className="autoria mt-auto pt-1 self-end">Sofia</span>
              <div className="fala-peca fala-peca-sofia self-end">
                Vou chamar alguém da equipe pra falar com você.
              </div>
              <span className="autoria pt-1 self-end">você</span>
              <div className="fala-peca fala-peca-dono self-end">
                Oi, Camila! Aqui é a Marina, eu assumo daqui.
              </div>
            </div>
          </Bloco>
        </div>
      </div>
    </section>
  );
}
