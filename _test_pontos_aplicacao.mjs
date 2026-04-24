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
  'quais os pontos do botox?',
  'onde aplica o bioestimulador?',
  'pontos ultraformer full face',
  'ponteiras papada',
  'pontos pescoço',
  'ultraformer terço inferior'
];

for (const pergunta of testes) {
  const r = await perguntar(pergunta, {});
  console.log(`\n--- ${pergunta} ---`);
  console.log((r.resposta || '').replace(/\n/g, ' | '));
  console.log('CTX:', JSON.stringify(r.contexto || {}));
}
