import handler from './api/lia-v2.js';

function fakeRes() {
  let result = null;
  const res = {
    status(code) { this._status = code; return this; },
    json(data) { result = data; return this; },
    getResult() { return result; }
  };
  return res;
}

async function simStep(pergunta, contexto = {}) {
  const req = { method: 'POST', body: { pergunta, contexto } };
  const res = fakeRes();
  await handler(req, res);
  return res.getResult();
}

let passou = 0;
let falhou = 0;

function check(label, cond) {
  if (cond) {
    console.log(`✓ ${label}`);
    passou += 1;
    return;
  }
  console.log(`✗ FALHOU: ${label}`);
  falhou += 1;
}

console.log('\n=== TESTE 1 ===');
let r1 = await simStep('quero comprar botox');
check('Pergunta unidade no fluxo de compra', /Brasília|Campinas|Goiânia|Palmas|São Paulo|Sao Paulo/i.test(r1.resposta));
let r2 = await simStep('campinas', r1.contexto);
check('Pergunta forma de pagamento', /Pix|Cartão|Cartao/i.test(r2.resposta));
let r3 = await simStep('2', r2.contexto);
check('Envia link para Botox Campinas Cartão', /https?:\/\/cielolink\.com\.br\//i.test(r3.resposta));
check('Inclui WhatsApp Campinas', /Campinas:\s*\(19\)\s*99181-8366/i.test(r3.resposta));

console.log('\n=== TESTE 2 ===');
let t2 = await simStep('quero botox em Goiânia no Pix');
check('Não repete unidade quando já veio na frase', !/Qual unidade fica melhor pra você/i.test(t2.resposta));
check('Não repete forma de pagamento quando já veio na frase', !/Você prefere/i.test(t2.resposta));

console.log('\n=== TESTE 3 ===');
let t31 = await simStep('quero comprar Lavieen em Brasília no cartão');
check('Lavieen Brasília Cartão retorna condição/encaminhamento seguro', /cielolink|Não consegui localizar essa condição com segurança|não está disponível/i.test(t31.resposta));

console.log('\n=== TESTE 4 ===');
let t41 = await simStep('quero Scizer em Palmas');
check('Scizer Palmas pergunta pagamento quando faltar forma', /Pix|Cartão|Cartao|Você prefere/i.test(t41.resposta));
let t42 = await simStep('2', t41.contexto);
check('Scizer Palmas Cartão retorna link ou fallback seguro', /cielolink|Não consegui localizar essa condição com segurança|não está disponível/i.test(t42.resposta));

console.log('\n=== TESTE 5 ===');
let t5 = await simStep('quero Hollywood Peel em Campinas no cartão');
check('Indisponibilidade da campanha sem link errado', /não está disponível para essa unidade nessa campanha|Não consegui localizar essa condição com segurança/i.test(t5.resposta));
check('Não envia link quando indisponível', !/https?:\/\/cielolink\.com\.br\//i.test(t5.resposta));

console.log('\n=== TESTE 6 ===');
let t6 = await simStep('quero procedimento inexistente em Campinas no cartão');
check('Fallback seguro quando não localiza condição', /Não consegui localizar essa condição com segurança|não está disponível para essa unidade nessa campanha/i.test(t6.resposta));

console.log('\n=== RESUMO ===');
console.log(`${passou} passou | ${falhou} falhou`);
if (falhou > 0) process.exitCode = 1;
