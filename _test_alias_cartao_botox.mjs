import handler from './api/lia-v2.js';

function chamarLia(pergunta, contexto = {}) {
  return new Promise((resolve) => {
    const req = { method: 'POST', body: { pergunta, contexto } };
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

async function rodarFluxo(nome, mensagens) {
  let contexto = {};
  let ultimaResposta = '';

  console.log(`\n=== ${nome} ===`);
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    ultimaResposta = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
    console.log(`> ${msg}`);
    console.log(`${ultimaResposta.replace(/\n/g, ' | ')}`);
  }

  return { contexto, ultimaResposta };
}

const esperadoPalmas = `Perfeito 😊\n\nVocê pode finalizar sua compra aqui 👇\n\nhttps://cielolink.com.br/4m1v7dh\n\nApós o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento.`;
const esperadoBrasilia = `Perfeito 😊\n\nVocê pode finalizar sua compra aqui 👇\n\nhttps://cielolink.com.br/4t0kASi\n\nApós o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento.`;

const c1 = await rodarFluxo('Teste 1 - Palmas + botox', ['sistema', 'Palmas', 'Cartão', 'botox']);
const c2 = await rodarFluxo('Teste 2 - Palmas + botox facial', ['sistema', 'Palmas', 'Cartão', 'botox facial']);
const c3 = await rodarFluxo('Teste 3 - Brasília + botox terço superior', ['sistema', 'Brasília', 'Cartão', 'botox terço superior']);

console.log('\n=== RESULTADOS ===');
console.log('Teste 1 (Palmas+botox) bate esperado:', c1.ultimaResposta === esperadoPalmas ? 'SIM' : 'NAO');
console.log('Teste 2 (Palmas+botox facial) bate esperado:', c2.ultimaResposta === esperadoPalmas ? 'SIM' : 'NAO');
console.log('Teste 3 (Brasilia+botox terco superior) bate esperado:', c3.ultimaResposta === esperadoBrasilia ? 'SIM' : 'NAO');
