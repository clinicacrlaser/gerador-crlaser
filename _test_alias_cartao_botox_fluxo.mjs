import handler from './api/lia-v2.js';

function chamarLia(pergunta, contexto = {}) {
  return new Promise((resolve) => {
    const req = { method: 'POST', body: { pergunta, contexto } };
    const res = {
      _status: 200,
      status(code) { this._status = code; return this; },
      json(payload) { resolve({ status: this._status, payload }); }
    };
    Promise.resolve(handler(req, res)).catch((error) => resolve({ status: 500, payload: { erro: String(error) } }));
  });
}

async function fluxoMensagens(mensagens) {
  let contexto = {};
  let ultima = '';
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    ultima = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
  }
  return { contexto, ultima };
}

const esperadoPalmas = `Perfeito 😊\n\nVocê pode finalizar sua compra aqui 👇\n\nhttps://cielolink.com.br/4m1v7dh\n\nApós o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento.`;
const esperadoBrasilia = `Perfeito 😊\n\nVocê pode finalizar sua compra aqui 👇\n\nhttps://cielolink.com.br/4t0kASi\n\nApós o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento.`;

const t1 = await fluxoMensagens(['quero comprar', 'sistema', 'Palmas', 'Cartão', 'botox']);
const t2 = await fluxoMensagens(['quero comprar', 'sistema', 'Palmas', 'Cartão', 'botox facial']);
const t3 = await fluxoMensagens(['quero comprar', 'sistema', 'Brasília', 'Cartão', 'botox terço superior']);

console.log('T1 Palmas+botox:', t1.ultima === esperadoPalmas ? 'OK' : 'FALHOU');
console.log(t1.ultima.replace(/\n/g, ' | '));
console.log('T2 Palmas+botox facial:', t2.ultima === esperadoPalmas ? 'OK' : 'FALHOU');
console.log(t2.ultima.replace(/\n/g, ' | '));
console.log('T3 Brasília+botox terço superior:', t3.ultima === esperadoBrasilia ? 'OK' : 'FALHOU');
console.log(t3.ultima.replace(/\n/g, ' | '));
