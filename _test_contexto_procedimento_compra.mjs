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

const mensagens = ['quero comprar botox', 'sistema', 'Goiânia', 'cartão'];
let contexto = {};
let respostaCartao = '';

console.log('=== TESTE CONTEXTO PROCEDIMENTO ===');
for (const msg of mensagens) {
  const r = await chamarLia(msg, contexto);
  const resposta = r.payload?.resposta || '';
  contexto = r.payload?.contexto || contexto;
  if (msg === 'cartão') {
    respostaCartao = resposta;
  }

  console.log('\n> Usuario:', msg);
  console.log('Lia:', resposta.replace(/\n/g, ' | '));
  console.log('procedimento_selecionado:', contexto.procedimento_selecionado || '(vazio)');
  console.log('procedimentoBase:', contexto.procedimentoBase || '(vazio)');
  console.log('intencao:', contexto.intencao || '(vazio)');
}

console.log('\n=== CHECAGEM FINAL ===');
console.log('Resposta final:', respostaCartao.replace(/\n/g, ' | '));
console.log('Contexto salvo como Botox:', contexto.procedimento_selecionado === 'Botox' ? 'SIM' : 'NAO');
console.log('Nao perguntou procedimento generico:', !respostaCartao.includes('Qual procedimento você quer finalizar') ? 'SIM' : 'NAO');
console.log('Perguntou facial ou suor:', respostaCartao.includes('Você quer Botox facial ou Botox para suor axilar? 😊') ? 'SIM' : 'NAO');
