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

console.log('=== TESTE: Aparelho/Equipamento Ultraformer ===\n');

// TESTE 1: ultra mpt → rosto → qual o aparelho de vcs
console.log('\n--- TESTE 1: ultra mpt → rosto → qual o aparelho de vcs ---');
const test1a = await chamarLia('ultra mpt', {});
console.log('\n1a) "ultra mpt"');
console.log('Resposta:', test1a.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test1a.payload?.contexto?.intencao);
console.log('Procedimento:', test1a.payload?.contexto?.procedimentoAtual);

const test1b = await chamarLia('rosto', test1a.payload?.contexto || {});
console.log('\n1b) "rosto" (após ultra mpt)');
console.log('Resposta:', test1b.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test1b.payload?.contexto?.intencao);
console.log('Procedimento:', test1b.payload?.contexto?.procedimentoAtual);

const test1c = await chamarLia('qual o aparelho de vcs', test1b.payload?.contexto || {});
console.log('\n1c) "qual o aparelho de vcs" (após rosto)');
console.log('Resposta:', test1c.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test1c.payload?.contexto?.intencao);
console.log('Procedimento:', test1c.payload?.contexto?.procedimentoAtual);

const respostaEsperada = 'Trabalhamos com o Ultraformer MPT original da Medsystems';
const test1Sucesso = test1c.payload?.resposta?.includes(respostaEsperada) && !test1c.payload?.resposta?.includes('Consigo te ajudar');
console.log('\n✓ Resposta é sobre aparelho:', test1Sucesso ? 'SIM' : 'NÃO');
console.log('✓ Contexto ultraformer mantido:', test1c.payload?.contexto?.procedimentoAtual === 'ultraformer' ? 'SIM' : 'NÃO');

// TESTE 2: quero saber qual o aparelho (sem contexto anterior)
console.log('\n\n--- TESTE 2: quero saber qual o aparelho (contexto Ultraformer) ---');
const test2 = await chamarLia('quero saber qual o aparelho', { procedimentoAtual: 'ultraformer' });
console.log('\nPergunta: "quero saber qual o aparelho"');
console.log('Resposta:', test2.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test2.payload?.contexto?.intencao);

const test2Sucesso = test2.payload?.resposta?.includes(respostaEsperada) && !test2.payload?.resposta?.includes('Consigo te ajudar');
console.log('\n✓ Resposta é sobre aparelho:', test2Sucesso ? 'SIM' : 'NÃO');
console.log('✓ Contexto ultraformer mantido:', test2.payload?.contexto?.procedimentoAtual === 'ultraformer' ? 'SIM' : 'NÃO');

// TESTE 3: qual marca do ultraformer (sem contexto anterior, mas menciona ultraformer)
console.log('\n\n--- TESTE 3: qual marca do ultraformer ---');
const test3 = await chamarLia('qual marca do ultraformer', {});
console.log('\nPergunta: "qual marca do ultraformer"');
console.log('Resposta:', test3.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test3.payload?.contexto?.intencao);
console.log('Procedimento:', test3.payload?.contexto?.procedimentoAtual);

const test3Sucesso = test3.payload?.resposta?.includes(respostaEsperada) && !test3.payload?.resposta?.includes('Consigo te ajudar');
console.log('\n✓ Resposta é sobre aparelho:', test3Sucesso ? 'SIM' : 'NÃO');
console.log('✓ Contexto ultraformer definido:', test3.payload?.contexto?.procedimentoAtual === 'ultraformer' ? 'SIM' : 'NÃO');

// TESTE 4: qual equipamento (sem contexto)
console.log('\n\n--- TESTE 4: qual equipamento (com contexto ultraformer) ---');
const test4 = await chamarLia('qual equipamento', { procedimentoAtual: 'ultraformer' });
console.log('\nPergunta: "qual equipamento"');
console.log('Resposta:', test4.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test4.payload?.contexto?.intencao);

const test4Sucesso = test4.payload?.resposta?.includes(respostaEsperada) && !test4.payload?.resposta?.includes('Consigo te ajudar');
console.log('\n✓ Resposta é sobre aparelho:', test4Sucesso ? 'SIM' : 'NÃO');
console.log('✓ Contexto ultraformer mantido:', test4.payload?.contexto?.procedimentoAtual === 'ultraformer' ? 'SIM' : 'NÃO');

// TESTE 5: é original? (contexto Ultraformer)
console.log('\n\n--- TESTE 5: é original? (contexto Ultraformer) ---');
const test5 = await chamarLia('é original?', { procedimentoAtual: 'ultraformer' });
console.log('\nPergunta: "é original?"');
console.log('Resposta:', test5.payload?.resposta?.replace(/\n/g, ' | '));
console.log('Intencao:', test5.payload?.contexto?.intencao);

const test5Sucesso = test5.payload?.resposta?.includes(respostaEsperada) && !test5.payload?.resposta?.includes('Consigo te ajudar');
console.log('\n✓ Resposta é sobre aparelho:', test5Sucesso ? 'SIM' : 'NÃO');
console.log('✓ Contexto ultraformer mantido:', test5.payload?.contexto?.procedimentoAtual === 'ultraformer' ? 'SIM' : 'NÃO');

console.log('\n\n=== RESUMO ===');
const todos = [test1Sucesso, test2Sucesso, test3Sucesso, test4Sucesso, test5Sucesso];
const passaram = todos.filter(t => t).length;
console.log(`${passaram}/${todos.length} testes passaram`);
