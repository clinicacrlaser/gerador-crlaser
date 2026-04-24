import { default as handler } from './api/lia-v2.js';

async function perguntar(pergunta, contexto = {}) {
  const req = { method: 'POST', body: { pergunta, contexto } };
  let result = null;
  const res = {
    status: () => ({ json: (d) => { result = d; } }),
    json: (d) => { result = d; }
  };
  await handler(req, res);
  return result || {};
}

const testes = [
  'preenchedor dura quanto?',
  'é definitivo?',
  'quantas ampolas?',
  'lábios quanto usa?',
  'olheira funciona?'
];

for (const pergunta of testes) {
  const r = await perguntar(pergunta, {});
  console.log(`\n--- ${pergunta} ---`);
  console.log((r.resposta || '').replace(/\n/g, ' | '));
  console.log('CTX:', JSON.stringify(r.contexto || {}));
}
