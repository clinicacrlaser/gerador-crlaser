import offersData from '../data/ofertas.js';

const {
  calculateProcedureOffer,
  detectOfferIndexFromQuestion,
  findProcedureFromQuestion,
  formatBRL,
  HIGHLIGHT_BONUS_TEXT,
  HIGHLIGHT_BOTOX_PROC_IDX,
  isPriceQuestion,
} = offersData;

const SYSTEM_PROMPT = `Você é a Lia, assistente comercial da Clínica CR Laser®.

Seu objetivo é:
- responder dúvidas de pacientes
- indicar o melhor tratamento
- conduzir para agendamento
- gerar interesse e desejo

Regras de comportamento:

1. Sempre responda de forma:
- clara
- segura
- elegante
- objetiva

2. Sempre que possível:
- sugira um tratamento
- explique o benefício
- destaque resultado (flacidez, gordura, rejuvenescimento)

3. Quando perguntarem preço:
- dê suporte comercial sem inventar valores
- convide para atendimento

4. Sempre conduza para ação:
- "posso te explicar melhor"
- "quer que eu te indique o melhor tratamento?"
- "posso te direcionar para avaliação"

5. Linguagem:
- natural
- humana
- sem parecer robô
- sem respostas longas demais

6. Especialidades da clínica:
- Botox
- Bioestimulador
- Ultraformer MPT
- Lavieen
- Tratamentos de flacidez e gordura localizada`;

function buildPriceAnswer(pergunta, body) {
  const selectedProcedure = body && body.procedimento ? String(body.procedimento) : '';
  const selectedOffer = body && body.faixaOferta ? String(body.faixaOferta) : '';
  const highlightAtivo = Boolean(body && body.highlightAtivo);

  const procIdx = selectedProcedure || findProcedureFromQuestion(pergunta);
  if (!procIdx && procIdx !== '0') {
    return 'Posso te ajudar melhor se você me disser qual procedimento deseja.';
  }

  const offerIdx = selectedOffer || detectOfferIndexFromQuestion(pergunta);
  const calculated = calculateProcedureOffer(procIdx, offerIdx);
  if (!calculated) {
    return 'Posso te ajudar melhor se você me disser qual procedimento deseja.';
  }

  let resposta = `${calculated.procedure.name} está por R$ ${formatBRL(calculated.discountedPix)} no Pix ou 12x de R$ ${formatBRL(calculated.discountedCard)} no cartão, na oferta atual.`;

  if (highlightAtivo && calculated.procIdx === HIGHLIGHT_BOTOX_PROC_IDX) {
    resposta += ` Bônus ativo de hoje: ${HIGHLIGHT_BONUS_TEXT}.`;
  }

  resposta += ' Se quiser, posso te direcionar para avaliação.';
  return resposta;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pergunta } = req.body || {};
    if (!pergunta) {
      return res.status(200).json({
        resposta: 'Posso te ajudar melhor se você me disser qual procedimento deseja.',
      });
    }

    if (isPriceQuestion(pergunta)) {
      return res.status(200).json({
        resposta: buildPriceAnswer(pergunta, req.body),
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: pergunta,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!data || !data.choices || !data.choices[0]) {
      return res.status(500).json({
        resposta: 'Erro ao gerar resposta da IA.',
      });
    }

    return res.status(200).json({
      resposta: data.choices[0].message.content,
    });
  } catch (error) {
    return res.status(500).json({
      resposta: 'Erro interno ao processar a pergunta.',
    });
  }
}
