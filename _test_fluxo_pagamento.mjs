// Teste do fluxo de pagamento corrigido
// Cenário: quero comprar → sistema → Brasília → Pix → quero cartão

function normalizeText(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Funções de detecção
function detectarIntencaoCompra(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('quero comprar') ||
    t.includes('quero fechar') ||
    t.includes('quero aproveitar') ||
    t.includes('quero pagar')
  );
}

function detectarEscolhaSistema(texto = '') {
  const t = normalizeText(texto);
  return t.includes('sistema') || t.includes('aqui') || t === 'sistema';
}

function detectarCidade(texto = '') {
  const t = normalizeText(texto);
  if (t.includes('brasilia') || t === 'brasilia') return 'brasilia';
  if (t.includes('campinas') || t === 'campinas') return 'campinas';
  if (t.includes('goiania') || t === 'goiania') return 'goiania';
  if (t.includes('palmas') || t === 'palmas') return 'palmas';
  if (t.includes('sao paulo') || t === 'sao paulo') return 'saopaulo';
  return null;
}

function detectarFormaPagamento(texto = '') {
  const t = normalizeText(texto);
  if (t.includes('pix') || t === 'pix') return 'pix';
  if (t.includes('cartao') || t.includes('cartão') || t === 'cartao') return 'cartao';
  return null;
}

function detectarMudancaFormaPagamento(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('quero cartao') ||
    t.includes('quero cartão') ||
    t.includes('prefiro cartao') ||
    t.includes('prefiro cartão') ||
    t.includes('mudar forma') ||
    t.includes('trocar forma')
  );
}

function detectarConfirmacaoPagamento(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('ja paguei') ||
    t.includes('já paguei') ||
    t.includes('fiz o pix') ||
    t.includes('fiz pix') ||
    t.includes('pagamento feito')
  );
}

// Simulação de mensagens
const mensagens = [
  { msg: 'quero comprar', esperado: 'detectarIntencaoCompra' },
  { msg: 'sistema', esperado: 'detectarEscolhaSistema' },
  { msg: 'brasilia', esperado: 'detectarCidade' },
  { msg: 'pix', esperado: 'detectarFormaPagamento === pix' },
  { msg: 'quero cartão', esperado: 'detectarMudancaFormaPagamento' }
];

console.log('=================================');
console.log('✅ TESTE: Fluxo de Pagamento');
console.log('=================================\n');

mensagens.forEach((item, idx) => {
  console.log(`${idx + 1}. Mensagem: "${item.msg}"`);
  console.log(`   Esperado: ${item.esperado}`);
  
  if (item.esperado === 'detectarIntencaoCompra') {
    const resultado = detectarIntencaoCompra(item.msg);
    console.log(`   ✅ Resultado: ${resultado}`);
  } else if (item.esperado === 'detectarEscolhaSistema') {
    const resultado = detectarEscolhaSistema(item.msg);
    console.log(`   ✅ Resultado: ${resultado}`);
  } else if (item.esperado === 'detectarCidade') {
    const resultado = detectarCidade(item.msg);
    console.log(`   ✅ Resultado: ${resultado}`);
  } else if (item.esperado === 'detectarFormaPagamento === pix') {
    const resultado = detectarFormaPagamento(item.msg);
    console.log(`   ✅ Resultado: ${resultado}`);
  } else if (item.esperado === 'detectarMudancaFormaPagamento') {
    const resultado = detectarMudancaFormaPagamento(item.msg);
    console.log(`   ✅ Resultado: ${resultado}`);
  }
  console.log('');
});

console.log('=================================');
console.log('FLUXO ESPERADO:');
console.log('=================================');
console.log(`1. Cliente: "quero comprar" → fluxo_compra_opcoes`);
console.log(`2. Cliente: "sistema" → fluxo_compra_aguardando_cidade_sistema`);
console.log(`3. Cliente: "brasilia" → fluxo_compra_aguardando_pagamento`);
console.log(`4. Cliente: "pix" → fluxo_pagamento_aguardando_confirmacao (NOVO ESTADO!)`);
console.log(`5. Cliente: "quero cartão" → volta para fluxo_compra_aguardando_pagamento`);
console.log(`6. Cliente: "cartão" → fluxo_pagamento_aguardando_confirmacao`);
console.log(`7. Cliente: "já paguei" → compra_finalizada_sistema`);
console.log('=================================');
