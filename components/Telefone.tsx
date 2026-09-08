'use client';

import { useEffect, useRef, useState } from 'react';

/* O celular do hero. Até 08/09/2026 ele tocava um roteiro fixo que o visitante
   não podia tocar: era a FOTO do produto.

   Agora ele é a PRÉVIA DA CONVERSA REAL. Quem toca em "Testar no seu WhatsApp"
   cai no número da própria Riacho, onde a Sofia atende — então o que se vê
   aqui é o que vai acontecer lá. Por isso as perguntas são sobre a Riacho
   Tech, e não sobre uma clínica genérica: decisão do fundador na janela dele
   em 08/09.

   As sugestões sao bolhas A DIREITA, dentro da conversa, no lugar exato em
   que a fala do visitante aparece depois de enviada — um toque envia. A
   versao anterior tinha um campo de digitar falso com botao de enviar
   desativado, so para indicar "aperte os botoes acima", e o fundador apontou
   como remendo de UX em 08/09. Ele estava certo: interface que precisa
   explicar como se usa nao esta explicada.

   Roteirizado de propósito, sem chamada de modelo: demonstração ao vivo com
   LLM abriria porta para abuso e gasto, e o incidente de loop já foi ~60% do
   gasto histórico de IA da casa.

   As falas abaixo seguem o `system_prompt_extra` do tenant 4 (`sofia-bot`),
   lido no banco em 08/09: ela se apresenta como IA e pergunta o nome de forma
   direta; responde em 2 a 4 linhas; nunca lista tudo de uma vez; e o preço é
   R$1.000 (ou 2× R$500) + R$200/mês, com a mensalidade começando 30 dias
   depois do lançamento, e o site por R$750 avulso ou R$1.500 no combo.
   Nada aqui promete o que ela não faz. */

type Fala = { de: 'visitante' | 'sofia'; texto: string; hora: string };
type Roteiro = { chip: string; pergunta: string; respostas: string[] };

const ROTEIROS: Roteiro[] = [
  {
    chip: 'quais serviços vocês fazem?',
    pergunta: 'quais serviços vocês fazem?',
    respostas: [
      'A gente faz duas coisas: uma assistente de IA que atende no WhatsApp do seu negócio, e landing page.',
      'A assistente conversa com o seu cliente, confere sua agenda de verdade e marca o horário sozinha. Seu negócio é de quê?',
    ],
  },
  {
    chip: 'quanto custa?',
    pergunta: 'quanto custa?',
    respostas: [
      'A implantação é R$1.000, ou 2× de R$500, e a mensalidade fica R$200, sem limite de conversas.',
      'A mensalidade só começa 30 dias depois que ela estiver no ar. Se quiser o site junto, os dois saem por R$1.500.',
    ],
  },
  {
    chip: 'tem horário amanhã?',
    pergunta: 'tem horário amanhã pra falar com alguém?',
    respostas: [
      'Deixa eu conferir a agenda do André…',
      'Amanhã ele tem 15h ou 16h30 livres. Qual fica melhor pra você?',
    ],
  },
];

/* A conversa de abertura, reescrita em 08/09 depois de o fundador dizer que a
   primeira versao estava horrivel. Ele tinha razao, e o defeito era em tres
   camadas:

     1. O visitante nao respondia o que a Sofia perguntou. Ela pedia o nome e
        ele falava da barbearia — a troca nao fechava.
     2. "sem voce largar a tesoura" era piada chamando atencao para si.
     3. "Pergunta o que quiser, que eu respondo aqui mesmo" era recheio
        instrucional: interface explicando como se usa, o mesmo defeito do
        campo de digitar falso que ja tinha saido daqui.

   Agora sao tres mensagens que fecham entre si: ela pergunta, ele responde a
   pergunta E da o ramo de graca (como gente faz), e ela adapta o exemplo aquele
   ramo. E' o passo 3 do prompt real dela, e serve de demonstracao em vez de
   cumprimento. As sugestoes embaixo passam a ser a continuacao natural. */
const ABERTURA: Fala[] = [
  { de: 'sofia', texto: 'Oi! Sou a Sofia, a assistente de IA da Riacho Tech. Qual é o seu nome?', hora: '14:02' },
  { de: 'visitante', texto: 'sou o Diego, tenho uma barbearia', hora: '14:02' },
  { de: 'sofia', texto: 'Prazer, Diego. Numa barbearia eu consulto a agenda de cada barbeiro e marco na conversa.', hora: '14:03' },
];

const hora = (passo: number) => {
  const m = 14 * 60 + 2 + passo;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const espera = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Telefone({ nome = 'Sofia' }: { nome?: string }) {
  const [falas, setFalas] = useState<Fala[]>(ABERTURA);
  const [digitando, setDigitando] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [usados, setUsados] = useState<string[]>([]);
  const corpo = useRef<HTMLDivElement>(null);
  const vivo = useRef(true);

  useEffect(() => () => { vivo.current = false; }, []);
  useEffect(() => {
    const el = corpo.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [falas, digitando]);

  async function enviar(r: Roteiro) {
    if (ocupado) return;
    setOcupado(true);
    setUsados((u) => [...u, r.chip]);

    let passo = falas.length;
    setFalas((f) => [...f, { de: 'visitante', texto: r.pergunta, hora: hora(passo) }]);

    for (const resposta of r.respostas) {
      await espera(600);
      if (!vivo.current) return;
      setDigitando(true);
      await espera(220 + resposta.length * 14);
      if (!vivo.current) return;
      setDigitando(false);
      passo += 1;
      setFalas((f) => [...f, { de: 'sofia', texto: resposta, hora: hora(passo) }]);
    }
    setOcupado(false);
  }

  const restantes = ROTEIROS.filter((r) => !usados.includes(r.chip));

  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span>14:02</span>
          <span className="sinal"><i /><i /><i /></span>
          <span className="bateria" />
        </div>

        <div className="phone-bar">
          <span className="av">{nome.charAt(0)}</span>
          <div>
            <div>{nome}</div>
            <div className="status">online</div>
          </div>
        </div>

        <div className="phone-body" ref={corpo} role="log" aria-live="polite" aria-label="conversa de exemplo com a Sofia">
          {falas.map((f, i) => (
            <div key={i} className={`bubble ${f.de === 'visitante' ? 'bubble-cliente' : 'bubble-sofia'}`}>
              {f.texto}
              <span className="bubble-tick" aria-hidden="true">{f.hora}</span>
            </div>
          ))}
          {digitando && (
            <div className="typing-bubble" style={{ opacity: 1 }} aria-label="a Sofia está digitando">
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          )}
        </div>

        {restantes.length > 0 && (
          <div className="sugestoes">
            {restantes.map((r) => (
              <button
                key={r.chip}
                type="button"
                className="sugestao"
                disabled={ocupado}
                onClick={() => enviar(r)}
              >
                {r.chip}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11.5M9 3.2 13.8 8 9 12.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
