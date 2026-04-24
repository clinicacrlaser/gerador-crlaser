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
  'quero falar com atendente',
  'tem alguém aí?',
  'quero humano',
  'me chama no WhatsApp',
  'quero agendar direto'
];

for (const pergunta of testes) {
  const r = await perguntar(pergunta, {});
  const linhas = (r.resposta || '').split('\n').filter((l) => l.trim() !== '').length;
  console.log(`\n--- ${pergunta} ---`);
  console.log((r.resposta || '').replace(/\n/g, ' | '));
  console.log('LINHAS:', linhas);
  console.log('CTX:', JSON.stringify(r.contexto || {}));
}

const comCidade = await perguntar('quero humano', { cidade: 'campinas' });
console.log('\n--- quero humano (com cidade campinas) ---');
console.log((comCidade.resposta || '').replace(/\n/g, ' | '));
console.log('CTX:', JSON.stringify(comCidade.contexto || {}));

const exemploObjetivo = await perguntar('qual marca do botox', {});
const linhasObjetivo = (exemploObjetivo.resposta || '').split('\n').filter((l) => l.trim() !== '').length;
console.log('\n--- exemplo redução (qual marca do botox) ---');
console.log((exemploObjetivo.resposta || '').replace(/\n/g, ' | '));
console.log('LINHAS:', linhasObjetivo);
