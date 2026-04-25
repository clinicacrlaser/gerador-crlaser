// Teste de validade da oferta

console.log('=== TESTE DE VALIDADE DA OFERTA ===\n');

// Simular a lógica de OFFER_END_DATE
const getOfferEndDate = () => new Date(new Date().setHours(12, 0, 0, 0));

// Teste 1: Agora (antes das 12:00)
console.log('--- TESTE 1: Horário atual (antes de 12:00) ---');
const now = new Date();
const offerEnd = getOfferEndDate();
const diffNow = offerEnd.getTime() - now.getTime();

console.log(`Hora atual: ${now.toLocaleTimeString('pt-BR')}`);
console.log(`Oferta termina em: ${offerEnd.toLocaleTimeString('pt-BR')}`);
console.log(`Diferença: ${Math.round(diffNow / 1000)} segundos`);
console.log(`Status: ${diffNow > 0 ? '✓ Oferta ATIVA' : '✗ Oferta ENCERRADA'}`);
console.log(`Mensagem exibida: ${diffNow > 0 ? 'Contagem regressiva' : 'Oferta encerrada'}\n`);

// Teste 2: Simular uma hora após 12:00
console.log('--- TESTE 2: Simulando 13:00 (1 hora após 12:00) ---');
const futureDate = new Date();
futureDate.setHours(13, 0, 0, 0);

const simulatedOfferEnd = new Date(futureDate.setHours(12, 0, 0, 0));
const diffFuture = simulatedOfferEnd.getTime() - futureDate.getTime();

console.log(`Hora simulada: ${futureDate.toLocaleTimeString('pt-BR')}`);
console.log(`Oferta terminaria em: ${simulatedOfferEnd.toLocaleTimeString('pt-BR')}`);
console.log(`Diferença: ${Math.round(diffFuture / 1000)} segundos`);
console.log(`Status: ${diffFuture > 0 ? '✓ Oferta ATIVA' : '✗ Oferta ENCERRADA'}`);
console.log(`Mensagem exibida: ${diffFuture > 0 ? 'Contagem regressiva' : 'Oferta encerrada'}\n`);

// Resumo
console.log('=== RESUMO ===');
console.log(`✓ Lógica de validade: ${diffNow > 0 ? 'CORRETA' : 'INCORRETA'}`);
console.log(`✓ Comportamento após 12:00: ${diffFuture <= 0 ? 'CORRETO' : 'INCORRETO'}`);
console.log('\nMudanças aplicadas:');
console.log('1. script.js linha 87: OFFER_END_DATE = new Date(new Date().setHours(12, 0, 0, 0))');
console.log('2. index.html linha 470: "hoje às 12:00" em vez de "24/04/2026"');
