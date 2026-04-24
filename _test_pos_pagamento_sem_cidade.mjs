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

const contexto = { aguardandoComprovante: true, intencao: 'fluxo_pagamento_aguardando_confirmacao' };
const r = await chamarLia('paguei', contexto);
console.log((r.payload?.resposta || '').replace(/\n/g, ' | '));
