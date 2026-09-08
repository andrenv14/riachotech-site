'use client';

import { useEffect, useRef, useState } from 'react';

/* O celular do hero. Até 08/09/2026 ele tocava um roteiro fixo que o visitante
   não podia tocar: era a FOTO do produto. Agora o visitante escolhe a pergunta
   e vê a Sofia responder.

   Roteirizado de propósito — sem chamada de modelo. Decisão do fundador em
   08/09: demonstração ao vivo com LLM abriria porta para abuso e gasto, e o
   incidente de loop já foi ~60% do gasto histórico de IA da casa.

   Cada resposta abaixo só afirma o que a assistente REALMENTE faz, conforme a
   tabela "O que a assistente faz (verificado no código)" de
   `docs/contexto/negocio.md` do sofia-bot: consulta a agenda, mostra catálogo
   com preço, marca. Nada aqui promete o que não existe. */

type Fala = { de: 'cliente' | 'sofia'; texto: string; hora: string };

type Roteiro = { chip: string; pergunta: string; respostas: string[] };

const ROTEIROS: Roteiro[] = [
  {
    chip: 'tem horário amanhã?',
    pergunta: 'oi, tem horário livre amanhã de tarde?',
    respostas: [
      'Oi! Deixa eu conferir a agenda…',
      'Amanhã à tarde eu tenho 15h ou 16h30. Qual fica melhor pra você?',
    ],
  },
  {
    chip: 'quanto custa a limpeza?',
    pergunta: 'quanto custa a limpeza?',
    respostas: [
      'A limpeza fica R$150, e leva uns 40 minutos.',
      'Quer que eu já reserve um horário pra você?',
    ],
  },
  {
    chip: 'quais serviços vocês fazem?',
    pergunta: 'quais serviços vocês fazem?',
    respostas: [
      'A gente faz limpeza, clareamento, restauração e avaliação.',
      'Quer ver o preço de algum deles, ou prefere já marcar uma avaliação?',
    ],
  },
];

const ABERTURA: Fala[] = [
  { de: 'sofia', texto: 'Oi! Aqui é a Sofia. Como posso ajudar?', hora: '14:02' },
];

function agora(passo: number) {
  const base = 14 * 60 + 2 + passo;
  return `${String(Math.floor(base / 60)).padStart(2, '0')}:${String(base % 60).padStart(2, '0')}`;
}

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

  async function perguntar(r: Roteiro) {
    if (ocupado) return;
    setOcupado(true);
    setUsados((u) => [...u, r.chip]);

    let passo = falas.length;
    setFalas((f) => [...f, { de: 'cliente', texto: r.pergunta, hora: agora(passo) }]);

    for (const resposta of r.respostas) {
      await espera(620);
      if (!vivo.current) return;
      setDigitando(true);
      await espera(80 + resposta.length * 16);
      if (!vivo.current) return;
      setDigitando(false);
      passo += 1;
      setFalas((f) => [...f, { de: 'sofia', texto: resposta, hora: agora(passo) }]);
    }
    setOcupado(false);
  }

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

        <div className="phone-body" ref={corpo} role="log" aria-live="polite" aria-label="conversa de exemplo">
          {falas.map((f, i) => (
            <div key={i} className={`bubble ${f.de === 'cliente' ? 'bubble-cliente' : 'bubble-sofia'}`}>
              {f.texto}
              <span className="bubble-tick" aria-hidden="true">{f.hora}</span>
            </div>
          ))}
          {digitando && (
            <div className="typing-bubble" style={{ opacity: 1 }} aria-label="a assistente está digitando">
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          )}
        </div>

        <div className="phone-perguntas">
          {ROTEIROS.map((r) => (
            <button
              key={r.chip}
              type="button"
              className="chip"
              disabled={ocupado || usados.includes(r.chip)}
              onClick={() => perguntar(r)}
            >
              {r.chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
