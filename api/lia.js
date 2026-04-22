export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pergunta } = req.body;

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'Você é a Lia, assistente da Clínica CR Laser®. Responda de forma objetiva, elegante e com foco comercial.',
          },
          {
            role: 'user',
            content: pergunta,
          },
        ],
      }),
    });

    const data = await resposta.json();

    return res.status(200).json({
      resposta: data.choices[0].message.content,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar' });
  }
}
