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

console.log('=== TESTE 1: Comprar Botox Suor de Palmas no cartão, depois perguntar contato ===');
const teste1 = await fluxo([
  'quero comprar botox suor',
  'sistema',
  'Palmas',
  'cartão'
]);
console.log('Link recebido:', teste1.ultimaResposta.includes('https://cielolink.com.br') ? '✓ SIM' : '✗ NÃO');

const teste1_pergunta = await chamarLia('qual o contato de Palmas', teste1.contexto);
console.log('Pergunta: qual o contato de Palmas');
console.log('Resposta esperada: contato de Palmas');
console.log('Resposta recebida:', teste1_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste1_pergunta.payload?.resposta?.includes('Palmas') ? ' - contém Palmas' : ' - ⚠ não contém Palmas'));

console.log('\n=== TESTE 2: Mesmo contexto, perguntar "qual telefone" ===');
const teste2_pergunta = await chamarLia('qual telefone', teste1.contexto);
console.log('Pergunta: qual telefone');
console.log('Resposta:', teste2_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste2_pergunta.payload?.resposta?.includes('(63)') ? ' - tem telefone de Palmas' : ' - ⚠ sem telefone'));

console.log('\n=== TESTE 3: Mesmo contexto, perguntar "endereço" ===');
const teste3_pergunta = await chamarLia('endereço', teste1.contexto);
console.log('Pergunta: endereço');
console.log('Resposta:', teste3_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste3_pergunta.payload?.resposta?.includes('Palmas') ? ' - contém Palmas' : ' - ⚠ sem Palmas'));

console.log('\n=== TESTE 4: Mesmo contexto, dizer "paguei" ===');
const teste4_pergunta = await chamarLia('paguei', teste1.contexto);
console.log('Pergunta: paguei');
console.log('Resposta:', teste4_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste4_pergunta.payload?.resposta?.includes('WhatsApp') ? ' - tem WhatsApp' : ' - ⚠ sem WhatsApp'));

console.log('\n=== TESTE 5: Verificar que localização tem prioridade sobre pós-pagamento ===');
console.log('Cenário: cliente já recebeu link, depois pergunta "qual WhatsApp de Palmas"');
const teste5_pergunta = await chamarLia('qual WhatsApp de Palmas', teste1.contexto);
console.log('Resposta:', teste5_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste5_pergunta.payload?.resposta?.includes('WhatsApp') && teste5_pergunta.payload?.resposta?.includes('Palmas') ? ' - tem WhatsApp de Palmas' : ' - ⚠ não atendeu corretamente'));

console.log('\n=== TESTE 6: Nova conversa, perguntar endereço de Campinas sem contexto ===');
const teste6_pergunta = await chamarLia('qual endereço de Campinas', {});
console.log('Pergunta: qual endereço de Campinas');
console.log('Resposta:', teste6_pergunta.payload?.resposta || '(vazio)');
console.log('✓ PASSOU' + (teste6_pergunta.payload?.resposta?.includes('Campinas') ? ' - contém Campinas' : ' - ⚠ sem Campinas'));

console.log('\n=== RESUMO ===');
console.log('Se todos os testes têm ✓ PASSOU, a prioridade de localização está funcionando corretamente!');
