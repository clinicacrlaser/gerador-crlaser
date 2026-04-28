import handler from './api/lia-v2.js';

function fakeRes() {
  let result = null;
  return {
    status() { return this; },
    json(payload) { result = payload; return this; },
    get() { return result; }
  };
}

async function ask(pergunta, contexto = {}) {
  const req = { method: 'POST', body: { pergunta, contexto } };
  const res = fakeRes();
  await handler(req, res);
  return res.get();
}

let ok = 0;
let fail = 0;
const check = (label, condition) => {
  if (condition) {
    console.log(`✓ ${label}`);
    ok += 1;
  } else {
    console.log(`✗ FALHOU: ${label}`);
    fail += 1;
  }
};

console.log('\n=== CENÁRIO PIX FIXO ===');
const pix = await ask('quero botox em campinas no pix');
check('Pix retorna CNPJ fixo de Campinas', pix.resposta.includes('60.970.806/0001-34'));
check('Pix contém WhatsApp/telefone de Campinas', pix.resposta.includes('Campinas: (19) 99181-8366'));
check('Pix NÃO contém link Cielo', !pix.resposta.includes('cielolink.com.br'));
check('Pix NÃO contém URL http', !/https?:\/\//i.test(pix.resposta));

console.log('\n=== CENÁRIO CARTÃO (PLANILHA) ===');
const card = await ask('quero botox em campinas no cartão');
check('Cartão busca planilha e retorna link Cielo', card.resposta.includes('https://cielolink.com.br/4igbg8p'));
check('Cartão contém WhatsApp/telefone de Campinas', card.resposta.includes('Campinas: (19) 99181-8366'));

console.log('\n=== RESUMO ===');
console.log(`${ok} passou | ${fail} falhou`);
if (fail > 0) process.exitCode = 1;
