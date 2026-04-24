import handler from './api/lia-v2.js';

function chamarLia(pergunta, contexto = {}) {
  return new Promise((resolve) => {
    const req = {
      method: 'POST',
      body: { pergunta, contexto }
    };

    const res = {
      _status: 200,
      status(code) {
        this._status = code;
        return this;
      },
      json(payload) {
        resolve({ status: this._status, payload });
      }
    };

    Promise.resolve(handler(req, res)).catch((error) => {
      resolve({ status: 500, payload: { erro: String(error) } });
    });
  });
}

const passos = ['quero comprar', 'sistema', 'Brasilia', 'Pix', 'quero cartão'];

let contexto = {};

console.log('=== TESTE PRINCIPAL: FLUXO PAGAMENTO ===');
for (const msg of passos) {
  const resultado = await chamarLia(msg, contexto);
  const resposta = resultado.payload?.resposta || '';
  contexto = resultado.payload?.contexto || contexto;

  console.log('\n> Usuario:', msg);
  console.log('Lia:', resposta.replace(/\n/g, ' | '));
  console.log('Intencao:', contexto.intencao || '(sem intencao)');
  console.log('Status compra:', contexto.status_compra || '(sem status)');
}

console.log('\n=== CHECAGEM DO PASSO FINAL ===');
const esperado = 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?';
const ultimo = await chamarLia('quero cartão', { ...contexto, formaPagamento: 'pix', intencao: 'fluxo_pagamento_aguardando_confirmacao' });
const respostaFinal = ultimo.payload?.resposta || '';
console.log('Resposta final:', respostaFinal.replace(/\n/g, ' | '));
console.log('Bate esperado:', respostaFinal === esperado ? 'SIM' : 'NAO');
