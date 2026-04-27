import handler from './api/lia-v2.js';

function fakeRes() {
  let result = null;
  const res = {
    _status: 200,
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

function check(label, condition) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passou++;
  } else {
    console.log(`  ✗ FALHOU: ${label}`);
    falhou++;
  }
}

console.log('\n=== CENÁRIO PRINCIPAL: quero comprar botox → campinas → 2 ===');

const r1 = await simStep('quero comprar botox', {});
console.log('\n[1] "quero comprar botox" →');
console.log('   ', r1.resposta.substring(0, 250));
check('Tem cidades numeradas (1️⃣)', r1.resposta.includes('1️⃣'));
check('Tem Brasília', r1.resposta.includes('Bras'));
check('Tem intro sobre Botox facial', r1.resposta.includes('Botox facial com direito a retorno'));
check('Não tem "ver oferta ou tirar dúvida"', !r1.resposta.includes('Tirar uma dúvida'));
check('intencao = fluxo_compra_aguardando_cidade_sistema', r1.contexto?.intencao === 'fluxo_compra_aguardando_cidade_sistema');

const r2 = await simStep('campinas', r1.contexto);
console.log('\n[2] "campinas" →');
console.log('   ', r2.resposta.substring(0, 200));
check('Pergunta forma de pagamento (Pix/Cartão)', r2.resposta.includes('Pix') && r2.resposta.includes('Cart'));
check('Não repete pergunta de procedimento', !r2.resposta.includes('procedimento'));
check('intencao = fluxo_compra_aguardando_pagamento', r2.contexto?.intencao === 'fluxo_compra_aguardando_pagamento');

const r3 = await simStep('2', r2.contexto);
console.log('\n[3] "2" (cartão) →');
console.log('   ', r3.resposta.substring(0, 400));
check('Tem link de pagamento', r3.resposta.includes('cielolink') || r3.resposta.includes('http'));
check('Tem comprovante/WhatsApp', r3.resposta.includes('comprovante') || r3.resposta.includes('WhatsApp'));
check('Não tem "gerar oferta"', !r3.resposta.toLowerCase().includes('gerar oferta'));
check('Não tem "ver oferta ou tirar dúvida"', !r3.resposta.includes('Tirar uma dúvida'));

console.log('\n=== CENÁRIO COM NÚMERO PARA CIDADE: 2 = campinas ===');

const r1b = await simStep('quero comprar botox', {});
const r2b = await simStep('2', r1b.contexto); // city=campinas via number
console.log('\n[2b] "2" como cidade →');
console.log('   ', r2b.resposta.substring(0, 200));
check('Reconhece "2" como Campinas e pergunta pagamento', r2b.resposta.includes('Pix') || r2b.resposta.includes('prefere'));

const r3b = await simStep('2', r2b.contexto);
console.log('\n[3b] "2" (cartão) →');
console.log('   ', r3b.resposta.substring(0, 300));
check('Link de Campinas encontrado', r3b.resposta.includes('cielolink') || r3b.resposta.includes('http'));

console.log('\n=== CENÁRIO: quero botox (intenção implícita) ===');
const rA = await simStep('quero botox', {});
console.log('\n[A] "quero botox" →');
console.log('   ', rA.resposta.substring(0, 250));
check('Não mostra "ver oferta ou tirar dúvida"', !rA.resposta.includes('Tirar uma dúvida'));
check('Avança para cidade ou oferta diretamente', rA.resposta.includes('unidade') || rA.resposta.includes('Bras'));

console.log('\n=== RESUMO ===');
console.log(`✓ ${passou} passou | ✗ ${falhou} falhou`);
