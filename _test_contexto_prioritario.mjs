import handler from './api/lia-v2.js';

function criarReq(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function criarRes() {
  let resultado = null;
  return {
    res: {
      status(code) {
        return {
          json(payload) {
            resultado = { code, ...payload };
          }
        };
      }
    },
    getResultado: () => resultado
  };
}

async function enviar(pergunta, contexto) {
  const { res, getResultado } = criarRes();
  await handler(criarReq(pergunta, contexto), res);
  return getResultado();
}

function contemLinkCompra(texto = '') {
  return /https?:\/\//i.test(texto) || /Finalizar Compra|finalizar sua compra/i.test(texto);
}

console.log('\n═══ TESTE: priorizar contexto sem reiniciar fluxo ═══\n');

let contexto = {};

const passo1 = await enviar('quero comprar botox', contexto);
contexto = passo1.contexto || {};
console.log('1) quero comprar botox =>', (passo1.resposta || '').split('\n')[0]);

const passo2 = await enviar('campinas', contexto);
contexto = passo2.contexto || {};
console.log('2) campinas =>', (passo2.resposta || '').split('\n')[0]);

const passo3 = await enviar('cartão', contexto);
contexto = passo3.contexto || {};
console.log('3) cartão =>', (passo3.resposta || '').split('\n')[0]);

const passo4 = await enviar('quero', contexto);
contexto = passo4.contexto || {};
console.log('4) quero =>', (passo4.resposta || '').split('\n')[0]);

const passou = contemLinkCompra(passo4.resposta || '');
console.log(`\n${passou ? '✅ PASSOU' : '❌ FALHOU'}: passo final deve ir direto para link`);

if (!passou) {
  console.log('\nResposta final completa:');
  console.log(passo4.resposta);
  console.log('\nContexto final:');
  console.log(JSON.stringify(contexto, null, 2));
}

console.log('\n═══ fim ═══\n');
