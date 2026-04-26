import handler from './api/lia-v2.js';

function req(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function resFactory() {
  let out = null;
  return {
    res: {
      status(code) {
        return {
          json(payload) {
            out = { code, ...payload };
          }
        };
      }
    },
    get: () => out
  };
}

async function send(pergunta, contexto = {}) {
  const { res, get } = resFactory();
  await handler(req(pergunta, contexto), res);
  return get();
}

console.log('\n═══ TESTE FLUXO BOTOX INFORMATIVO ═══\n');

const perguntaInicial = 'quero saber do botox';
const esperadoBase = 'O Botox suaviza rugas e linhas de expressão 😊';

const r1 = await send(perguntaInicial, {});
const okR1 = (r1.resposta || '').includes(esperadoBase) && (r1.resposta || '').includes('1️⃣ Ver a oferta') && (r1.resposta || '').includes('2️⃣ Tirar uma dúvida?');
console.log(`${okR1 ? '✅' : '❌'} caso 1/2 - resposta inicial explicativa com opções`);
if (!okR1) console.log(r1.resposta || '');

const r1_1 = await send('1', r1.contexto || {});
const naoPerguntouCidadeAntes = !(r1_1.resposta || '').toLowerCase().includes('qual unidade fica melhor');
console.log(`${naoPerguntouCidadeAntes ? '✅' : '❌'} resposta 1 não pergunta cidade imediatamente`);
console.log(`→ resposta para 1: ${(r1_1.resposta || '').split('\n')[0]}`);

const r2 = await send(perguntaInicial, {});
const r2_2 = await send('2', r2.contexto || {});
const okR2 = (r2_2.resposta || '').includes('Perfeito 😊\nQual sua dúvida sobre o Botox?');
console.log(`${okR2 ? '✅' : '❌'} resposta 2 pergunta dúvida de Botox`);
if (!okR2) console.log(r2_2.resposta || '');

console.log('\n═══ fim ═══\n');
