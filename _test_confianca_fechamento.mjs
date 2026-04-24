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
  'posso confiar?',
  'é original?',
  'quem faz?',
  'tem agenda?',
  'posso comprar agora?'
];

for (const pergunta of testes) {
  const r = await perguntar(pergunta, {});
  const linhas = (r.resposta || '').split('\n').filter((l) => l.trim() !== '').length;
  console.log(`\n--- ${pergunta} ---`);
  console.log((r.resposta || '').replace(/\n/g, ' | '));
  console.log('LINHAS:', linhas);
  console.log('CTX:', JSON.stringify(r.contexto || {}));
}
