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

async function fluxo(mensagens) {
  let contexto = {};
  let ultimaResposta = '';
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    ultimaResposta = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
  }
  return { contexto, ultimaResposta };
}

const casos = [
  {
    nome: 'quero comprar botox / sistema / Goiânia / cartão',
    mensagens: ['quero comprar botox', 'sistema', 'Goiânia', 'cartão'],
    espera: 'Você quer Botox facial ou Botox para suor axilar? 😊'
  },
  {
    nome: 'quero comprar ultra / sistema / Palmas / cartão / rosto',
    mensagens: ['quero comprar ultra', 'sistema', 'Palmas', 'cartão', 'rosto'],
    espera: 'https://cielolink.com.br/4pWxfEt'
  },
  {
    nome: 'quero comprar lavieen / Campinas / cartão / melasma',
    mensagens: ['quero comprar lavieen', 'sistema', 'Campinas', 'cartão', 'melasma'],
    espera: 'https://cielolink.com.br/4qVchGD'
  },
  {
    nome: 'quero falar com atendente',
    mensagens: ['quero falar com atendente'],
    espera: 'cidade'
  },
  {
    nome: 'endereço campinas',
    mensagens: ['endereço campinas'],
    espera: 'Campinas'
  }
];

console.log('=== TESTES OBRIGATORIOS ===');
for (const caso of casos) {
  const r = await fluxo(caso.mensagens);
  console.log(`\n${caso.nome}`);
  console.log(r.ultimaResposta.replace(/\n/g, ' | '));
  console.log('OK:', r.ultimaResposta.includes(caso.espera) ? 'SIM' : 'NAO');
}

const contextoPosPagamento = (await fluxo(['quero comprar botox', 'sistema', 'Goiânia', 'cartão', 'facial'])).contexto;
const pos = await chamarLia('paguei, mando comprovante onde?', contextoPosPagamento);
console.log('\npaguei, mando comprovante onde?');
console.log((pos.payload?.resposta || '').replace(/\n/g, ' | '));
console.log('OK:', (pos.payload?.resposta || '').includes('WhatsApp da unidade de Goiânia') ? 'SIM' : 'NAO');
console.log('\nMEMORIA FINAL:');
console.log('procedimento_selecionado:', contextoPosPagamento.procedimento_selecionado || '(vazio)');
console.log('cidadeAtual:', contextoPosPagamento.cidadeAtual || '(vazio)');
console.log('formaPagamento:', contextoPosPagamento.formaPagamento || '(vazio)');
console.log('intencao:', contextoPosPagamento.intencao || '(vazio)');
