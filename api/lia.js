export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pergunta } = req.body;

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
            content: `Você é a Lia, assistente comercial da Clínica CR Laser®.

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
- NÃO informe valor direto
- diga que depende da avaliação
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
- Tratamentos de flacidez e gordura localizada

7. Exemplo de resposta ideal:

Pergunta: "qual melhor tratamento para flacidez?"

Resposta:
"Para flacidez, normalmente indicamos o Ultraformer MPT ou bioestimuladores, dependendo do seu tipo de pele. Eles ajudam a estimular colágeno e melhorar a firmeza. Se quiser, posso te orientar qual seria o melhor no seu caso 🙂"`,
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
