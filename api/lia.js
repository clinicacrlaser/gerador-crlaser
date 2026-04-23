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

3. Quando perguntarem preço, valor, quanto custa, quanto sai ou similares:
- nunca informar valor diretamente
- responder exatamente com esta mensagem:
"Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊
É bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.
Pode acessar por aqui mesmo e testar, você vai gostar 😉"

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

function bloquearPreco(resposta) {
  if (!resposta) return resposta;

  const texto = resposta.toLowerCase();

  const temPreco =
    texto.includes('r$') ||
    texto.includes('pix') ||
    texto.includes('cartão') ||
    texto.includes('cartao') ||
    texto.includes('12x') ||
    texto.includes('10x') ||
    texto.includes('parcel');

  if (temPreco) {
    return 'Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊\nÉ bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.\nPode acessar por aqui mesmo e testar, você vai gostar 😉';
  }

  return resposta;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pergunta } = req.body;

    const texto = (pergunta || '').toLowerCase();

    const pediuPreco =
      texto.includes('preço') ||
      texto.includes('preco') ||
      texto.includes('valor') ||
      texto.includes('quanto custa') ||
      texto.includes('quanto é') ||
      texto.includes('quanto e') ||
      texto.includes('quanto sai') ||
      texto.includes('tem valor') ||
      texto.includes('qual o preço') ||
      texto.includes('qual o preco');

    if (pediuPreco) {
      return res.status(200).json({
        resposta: 'Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊\nÉ bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.\nPode acessar por aqui mesmo e testar, você vai gostar 😉'
      });
    }

    if (!pergunta) {
      return res.status(200).json({
        resposta: 'Posso te ajudar melhor se você me disser qual procedimento deseja.',
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

    const resposta = data.choices[0].message.content;
    const respostaFinal = bloquearPreco(resposta);

    return res.status(200).json({
      resposta: respostaFinal,
    });
  } catch (error) {
    return res.status(500).json({
      resposta: 'Erro interno ao processar a pergunta.',
    });
  }
}
