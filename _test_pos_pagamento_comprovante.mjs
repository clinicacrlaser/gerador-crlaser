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

async function fluxoBaseGoiania() {
  let contexto = {};
  const mensagens = ['quero comprar botox', 'sistema', 'Goiânia', 'cartão', 'facial'];
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    contexto = r.payload?.contexto || contexto;
  }
  return contexto;
}

const contextoBase = await fluxoBaseGoiania();
console.log('=== CONTEXTO APOS LINK ===');
console.log('cidadeAtual:', contextoBase.cidadeAtual || '(vazio)');
console.log('procedimentoAtual:', contextoBase.procedimentoAtual || '(vazio)');
console.log('aguardandoComprovante:', String(contextoBase.aguardandoComprovante));

for (const msg of ['mando o comprovante onde', 'paguei', 'feito o pagamento']) {
  const r = await chamarLia(msg, contextoBase);
  const resposta = r.payload?.resposta || '';
  console.log(`\n=== ${msg} ===`);
  console.log(resposta.replace(/\n/g, ' | '));
  console.log('Tem cidade Goiânia:', resposta.includes('Goiânia') ? 'SIM' : 'NAO');
  console.log('Tem whatsapp unidade:', resposta.includes('wa.me/5562985499102') ? 'SIM' : 'NAO');
}
