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
            content: 'Você é a Lia, assistente da Clínica CR Laser®. Responda de forma clara, elegante e com foco em conversão de pacientes.',
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
