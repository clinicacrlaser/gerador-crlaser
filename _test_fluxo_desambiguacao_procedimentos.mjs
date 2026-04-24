import handler from './api/lia-v2.js';

function chamarLia(pergunta, contexto = {}) {
  return new Promise((resolve) => {
    const req = { method: 'POST', body: { pergunta, contexto } };
    const res = {
      _status: 200,
      status(code) { this._status = code; return this; },
      json(payload) { resolve({ status: this._status, payload }); }
    };

    Promise.resolve(handler(req, res)).catch((error) => {
      resolve({ status: 500, payload: { erro: String(error) } });
    });
  });
}

async function executarFluxo(mensagens) {
  let contexto = {};
  const respostas = [];

  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    const resposta = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
    respostas.push({ msg, resposta, contexto: { ...contexto } });
  }

  return respostas;
}

function ultimoTexto(respostas) {
  return respostas[respostas.length - 1]?.resposta || '';
}

async function rodar(nome, mensagens, esperadoContem) {
  const respostas = await executarFluxo(mensagens);
  const final = ultimoTexto(respostas);
  const ok = final.includes(esperadoContem);

  console.log(`\n=== ${nome} ===`);
  console.log('Fluxo:', mensagens.join(' -> '));
  console.log('Resposta final:', final.replace(/\n/g, ' | '));
  console.log('Esperado conter:', esperadoContem);
  console.log('Status:', ok ? 'OK' : 'FALHOU');
}

await rodar(
  'cartao / botox / facial',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'botox', 'facial'],
  'https://cielolink.com.br/4m1v7dh'
);

await rodar(
  'cartao / botox / suor',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'botox', 'suor'],
  'https://cielolink.com.br/4bGnHHA'
);

await rodar(
  'cartao / ultraformer / rosto',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'ultraformer', 'rosto'],
  'https://cielolink.com.br/4pWxfEt'
);

await rodar(
  'cartao / ultraformer / não sei',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'ultraformer', 'não sei'],
  'Temos algumas opções de Ultraformer MPT 😊'
);

await rodar(
  'cartao / lavieen / melasma',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'lavieen', 'melasma'],
  'https://cielolink.com.br/4lHjZ3Z'
);

await rodar(
  'cartao / lavieen / rosto',
  ['quero comprar', 'sistema', 'Palmas', 'cartão', 'lavieen', 'rosto'],
  'https://cielolink.com.br/3ZOPUa6'
);
