/* "O que ela faz" — o repertório.

   Três decisões de desenho, e nenhuma é gosto solto:

   1. Seção ESCURA. O site inteiro é claro até os Planos; jogar o navy aqui
      cria ritmo e dá o contraste que faltava. Cor de texto sobre superfície
      colorida sai da própria paleta (`mist`, `sky`, `sky-2`, `mist-2`),
      nunca de um cinza — regra do DESIGN.md.
   2. Grade DESIGUAL, de 12 colunas com vãos de tamanhos diferentes. É a
      assimetria que eu tinha descrito mal antes: não é torto por esporte, é
      cada bloco ocupando a largura que o conteúdo dele pede. A alternativa —
      cards do mesmo tamanho com ícone, título e texto — é justamente o que a
      `design-site` proíbe como estrutura de página.
   3. Cada bloco mostra o ARTEFATO daquela capacidade: o código do Pix, o
      texto do lembrete, o item do catálogo com preço. Afirmação em lista de ✓
      é a forma mais fraca de prova que existe.

   O conteúdo é a tabela "O que a assistente faz (verificado no código)" de
   `docs/contexto/negocio.md`. Nada aqui promete o que ela não faz. */

import AoEntrar from '@/components/AoEntrar';

function Bloco({
  span, rotulo, titulo, children,
}: {
  span: string; rotulo: string; titulo: string; children?: React.ReactNode;
}) {
  return (
    <div className={`${span} border-t border-white/12 pt-6`}>
      <div className="font-mono text-[11px] uppercase tracking-[.13em] text-sky">{rotulo}</div>
      <h3 className="mt-2.5 font-display text-[23px] leading-[1.25] text-mist-2 max-w-[24ch]">{titulo}</h3>
      {children}
    </div>
  );
}

export default function OQueElaFaz() {
  return (
    <section id="recursos" className="bg-ink py-24 min-[900px]:py-28">
      <div className="wrap">
        <h2 className="font-display font-semibold text-[clamp(30px,4.2vw,46px)] leading-[1.15] text-white max-w-[20ch]">
          Um atendente que não dorme, não esquece e não inventa horário.
        </h2>
        <p className="mt-4 text-[17px] text-mist max-w-[54ch]">
          Tudo isto já está rodando hoje, no WhatsApp de um negócio de verdade.
          Nada aqui é promessa de versão futura.
        </p>

        <div className="mt-14 grid grid-cols-1 min-[820px]:grid-cols-12 gap-x-10 gap-y-12">

          <Bloco
            span="min-[820px]:col-span-7"
            rotulo="agenda"
            titulo="Marca, cancela e remarca olhando o seu Google Agenda no instante da pergunta"
          >
            <p className="mt-3 text-[16px] text-mist max-w-[48ch]">
              Oferece dois ou três horários livres em vez de despejar a grade
              inteira. Se o negócio tem várias pessoas atendendo, cada uma tem a
              própria agenda e a própria duração.
            </p>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-5"
            rotulo="pix"
            titulo="Cobra dentro da conversa"
          >
            <p className="mt-3 text-[16px] text-mist max-w-[38ch]">
              O valor vem do catálogo cadastrado. O código copia-e-cola vai em
              mensagem separada, para o cliente conseguir copiar sem pegar texto
              junto.
            </p>
            <div className="mt-4 rounded-[10px] bg-white/8 px-3.5 py-3 font-mono text-[11.5px] leading-[1.5] text-sky-2 break-all">
              00020126580014br.gov.bcb.pix0136a1f3…5204000053039865802BR
            </div>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="lembrete"
            titulo="Avisa antes da hora, sozinha"
          >
            <p className="mt-3 text-[16px] text-mist max-w-[34ch]">
              Mensagem de utilidade pela API oficial, com o texto aprovado pela
              Meta.
            </p>
            <AoEntrar><div className="chega mt-4 rounded-[12px] rounded-bl-[4px] bg-white/10 px-3.5 py-3">
              <div className="text-[13.5px] leading-[1.45] text-mist-2">
                Oi, Camila! Passando pra lembrar da sua consulta amanhã às 16h30.
              </div>
              <span className="mt-1.5 block text-right font-mono text-[10px] text-sky-2">08:00</span>
            </div></AoEntrar>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="catálogo"
            titulo="Mostra o serviço com foto e preço"
          >
            <p className="mt-3 text-[16px] text-mist max-w-[34ch]">
              Nome, descrição, valor e foto de verdade, não uma lista de texto.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-[12px] bg-white/8 p-3">
              {/* Foto de verdade, e nao um quadradinho de gradiente. O texto ao
                  lado promete "foto de verdade" e o placeholder anterior o
                  desmentia na propria tela. 160x160 em webp, 6,6 KB.
                  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/catalogo-banho-tosa.webp"
                alt=""
                width={160}
                height={160}
                className="h-11 w-11 flex-shrink-0 rounded-[8px] object-cover"
              />
              <div className="min-w-0">
                <div className="text-[13.5px] text-mist-2 truncate">Banho e tosa · porte médio</div>
                <div className="font-mono text-[12px] text-sky-2">R$80 · 1h</div>
              </div>
            </div>
          </Bloco>

          <Bloco
            span="min-[820px]:col-span-4"
            rotulo="você"
            titulo="Chama você quando o caso pede gente"
          >
            <p className="mt-3 text-[16px] text-mist max-w-[34ch]">
              Se o cliente pede uma pessoa, ou o assunto é delicado, ela para e
              te passa a conversa. Com Coexistence, no mesmo número, no seu
              próprio aplicativo.
            </p>
          </Bloco>
        </div>
      </div>
    </section>
  );
}
