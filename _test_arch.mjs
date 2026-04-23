import handler from './api/lia-v2.js';

async function test(label, msg, ctx = {}) {
  const holder = {};
  const res = { status(c) { return this; }, json(d) { holder.data = d; } };
  await handler({ method: 'POST', body: { pergunta: msg, contexto: ctx } }, res);
  console.log('[' + label + '] "' + msg + '"');
  console.log('  → ' + holder.data.resposta.replace(/\n/g, ' | '));
  if (holder.data.contexto && Object.keys(holder.data.contexto).length)
    console.log('  CTX:', JSON.stringify(holder.data.contexto));
  console.log();
  return holder.data;
}

// Testes obrigatórios individuais
await test('T1', 'bom dia');
await test('T2', 'onde ficam');
await test('T4', 'qual marda do botox');
await test('T5', 'vcs fazem botoxx');
await test('T6', 'estu em campinas');
await test('T7', 'enderço goinia');

// Fluxo em sequência: onde ficam → palmas
console.log('--- Fluxo: onde ficam → palmas ---');
const r1 = await test('F1', 'onde ficam');
await test('F2', 'palmas', r1.contexto || {});

// Fluxo em sequência: estu em campinas → os dois
console.log('--- Fluxo: estu em campinas → os dois ---');
const r2 = await test('F3', 'estu em campinas');
await test('F4', 'os dois', r2.contexto || {});

// Fluxo em sequência: qual marda do botox → quero
console.log('--- Fluxo: FAQ botox → quero ---');
const r3 = await test('F5', 'qual marda do botox');
await test('F6', 'quero', r3.contexto || {});
