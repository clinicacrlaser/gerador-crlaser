// ════════════════════════════════════════════════════════════════
// TEST — Cérebro Central V2 — 5 cenários obrigatórios
// ════════════════════════════════════════════════════════════════
import handler from './api/lia-v2.js';

let passed = 0;
let failed = 0;

async function ask(pergunta, contexto = {}) {
  let statusCode = 200;
  let body = null;
  const req = { method: 'POST', body: { pergunta, contexto } };
  const res = {
    _status: 200,
    status(code) { this._status = code; return this; },
    json(payload) { body = payload; return this; }
  };
  await handler(req, res);
  return { status: res._status, ...body };
}

function assert(label, condition, got) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.log(`  ❌ ${label}`);
    console.log(`     GOT: ${JSON.stringify(got).substring(0, 200)}`);
    failed++;
  }
}

// ════ CENÁRIO 1: quero saber do botox → 1 → campinas → cartão → facial ════
console.log('\n═══ CENÁRIO 1: Fluxo info→compra botox facial ═══');
{
  const r1 = await ask('quero saber do botox');
  assert('Botox: resposta com escolha 1/2', r1.resposta && (r1.resposta.includes('1') || r1.resposta.includes('dúvida') || r1.resposta.includes('oferta')), r1.resposta);

  const r2 = await ask('1', r1.contexto);
  assert('Escolha 1 → avança compra (pede cidade ou pagamento)', r2.resposta && (r2.resposta.toLowerCase().includes('cidad') || r2.resposta.toLowerCase().includes('unidade') || r2.resposta.toLowerCase().includes('pagamento') || r2.resposta.toLowerCase().includes('pix') || r2.resposta.toLowerCase().includes('cart')), r2.resposta);

  const r3 = await ask('campinas', r2.contexto);
  assert('Campinas → avança (pede pagamento ou link)', r3.resposta && (r3.resposta.toLowerCase().includes('pix') || r3.resposta.toLowerCase().includes('cart') || r3.resposta.toLowerCase().includes('oferta') || r3.resposta.toLowerCase().includes('link')), r3.resposta);

  const r4 = await ask('cartão', r3.contexto);
  assert('Cartão → avança (pede procedimento ou link)', r4.resposta && (r4.resposta.toLowerCase().includes('procedimento') || r4.resposta.toLowerCase().includes('facial') || r4.resposta.toLowerCase().includes('oferta') || r4.resposta.includes('http') || r4.resposta.includes('<a href')), r4.resposta);

  // Se pediu procedimento, responde "facial"
  if (!r4.resposta.includes('http') && !r4.resposta.includes('<a href')) {
    const r5 = await ask('facial', r4.contexto);
    assert('Facial → link de oferta', r5.resposta && (r5.resposta.includes('http') || r5.resposta.includes('<a href') || r5.resposta.toLowerCase().includes('oferta') || r5.resposta.toLowerCase().includes('comprar')), r5.resposta);
  }
}

// ════ CENÁRIO 2: preço do botox → quero comprar → campinas → cartão → facial ════
console.log('\n═══ CENÁRIO 2: Preço → compra botox ═══');
{
  const r1 = await ask('qual o preço do botox');
  assert('Preço → RESPOSTA_PRECO_SISTEMA (1/2)', r1.resposta && (r1.resposta.includes('1') && r1.resposta.includes('2')), r1.resposta);

  const r2 = await ask('quero comprar', r1.contexto);
  assert('Quero comprar → pede cidade ou pagamento', r2.resposta && (r2.resposta.toLowerCase().includes('cidad') || r2.resposta.toLowerCase().includes('pix') || r2.resposta.toLowerCase().includes('cart') || r2.resposta.toLowerCase().includes('unidade')), r2.resposta);

  const r3 = await ask('campinas', r2.contexto);
  const r4 = await ask('cartão', r3.contexto);
  assert('Campinas+cartão → avança (pede proc ou link)', r4.resposta && (r4.resposta.toLowerCase().includes('procedimento') || r4.resposta.includes('http') || r4.resposta.includes('<a href') || r4.resposta.toLowerCase().includes('oferta')), r4.resposta);
}

// ════ CENÁRIO 3: tem botox → 2 → pontos de aplicação → onde atendem ════
console.log('\n═══ CENÁRIO 3: Info botox → dúvida → contato ═══');
{
  const r1 = await ask('tem botox');
  assert('Tem botox → "Temos sim" com 1/2', r1.resposta && (r1.resposta.toLowerCase().includes('temos') || r1.resposta.includes('1') && r1.resposta.includes('2')), r1.resposta);

  const r2 = await ask('2', r1.contexto);
  assert('Escolha 2 → abre espaço para dúvida', r2.resposta && (r2.resposta.toLowerCase().includes('dúvida') || r2.resposta.toLowerCase().includes('explico') || r2.resposta.toLowerCase().includes('pergunt') || r2.resposta.toLowerCase().includes('ajudo')), r2.resposta);

  const r3 = await ask('quais os pontos de aplicação', r2.contexto);
  assert('Pontos de aplicação → FAQ resposta', r3.resposta && r3.resposta.length > 30, r3.resposta);

  const r4 = await ask('onde vocês atendem', r3.contexto);
  assert('Onde atendem → pede cidade ou lista unidades', r4.resposta && (r4.resposta.toLowerCase().includes('cidad') || r4.resposta.toLowerCase().includes('brasília') || r4.resposta.toLowerCase().includes('campinas') || r4.resposta.toLowerCase().includes('whatsapp') || r4.resposta.toLowerCase().includes('unidade')), r4.resposta);
}

// ════ CENÁRIO 4: quero comprar ultra → palmas → cartão → rosto ════
console.log('\n═══ CENÁRIO 4: Compra ultraformer palmas ═══');
{
  const r1 = await ask('quero comprar ultraformer');
  assert('Quero comprar ultra → pede cidade', r1.resposta && (r1.resposta.toLowerCase().includes('cidad') || r1.resposta.toLowerCase().includes('palmas') || r1.resposta.toLowerCase().includes('unidade')), r1.resposta);

  const r2 = await ask('palmas', r1.contexto);
  assert('Palmas → avança (pede pagamento ou região)', r2.resposta && (r2.resposta.toLowerCase().includes('pix') || r2.resposta.toLowerCase().includes('cart') || r2.resposta.toLowerCase().includes('region') || r2.resposta.toLowerCase().includes('rosto') || r2.resposta.toLowerCase().includes('procedimento')), r2.resposta);

  const r3 = await ask('cartão', r2.contexto);
  assert('Cartão palmas → pede região/proc ou link', r3.resposta && (r3.resposta.toLowerCase().includes('region') || r3.resposta.toLowerCase().includes('rosto') || r3.resposta.toLowerCase().includes('procedimento') || r3.resposta.includes('http') || r3.resposta.includes('<a href')), r3.resposta);

  if (!r3.resposta.includes('http') && !r3.resposta.includes('<a href')) {
    const r4 = await ask('rosto', r3.contexto);
    assert('Rosto → link Full Face', r4.resposta && (r4.resposta.includes('http') || r4.resposta.includes('<a href') || r4.resposta.toLowerCase().includes('full face') || r4.resposta.toLowerCase().includes('oferta')), r4.resposta);
  }
}

// ════ CENÁRIO 5: Após link enviado → pede WhatsApp ════
console.log('\n═══ CENÁRIO 5: Pós-link → WhatsApp comprovante ═══');
{
  const contextoComLink = {
    linkEnviado: true,
    cidadeAtual: 'campinas',
    cidade: 'campinas',
    procedimentoFinal: 'Ultraformer MPT Full Face',
    formaPagamento: 'pix',
    intencao: 'fluxo_pagamento_aguardando_confirmacao'
  };
  const r1 = await ask('qual o whatsapp', contextoComLink);
  assert('Pós-link: whatsapp → envia comprovante ou wpp', r1.resposta && (r1.resposta.toLowerCase().includes('whatsapp') || r1.resposta.toLowerCase().includes('comprovante') || r1.resposta.toLowerCase().includes('zap') || r1.resposta.includes('55')), r1.resposta);

  const contextoComLink2 = { ...contextoComLink, intencao: 'fluxo_pagamento_aguardando_confirmacao' };
  const r2 = await ask('paguei', contextoComLink2);
  assert('Pós-link: paguei → instrução comprovante', r2.resposta && (r2.resposta.toLowerCase().includes('comprovante') || r2.resposta.toLowerCase().includes('whatsapp') || r2.resposta.toLowerCase().includes('agendar')), r2.resposta);
}

// ════ SUMÁRIO ════
console.log(`\n════════════════════════`);
console.log(`RESULTADO: ${passed} passou | ${failed} falhou`);
console.log(`════════════════════════\n`);
if (failed > 0) process.exit(1);
