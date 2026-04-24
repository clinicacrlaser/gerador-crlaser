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
  'o que é scizer',
  'funciona pra gordura?',
  'dói?',
  'quantas sessões?',
  'melhor que criolipolise?',
  'posso fazer amamentando?'
];

let contexto = {};
for (const pergunta of testes) {
  const r = await perguntar(pergunta, contexto);
  console.log(`\n--- ${pergunta} ---`);
  console.log((r.resposta || '').replace(/\n/g, ' | '));
  console.log('CTX:', JSON.stringify(r.contexto || {}));
  contexto = r.contexto || contexto;
}
