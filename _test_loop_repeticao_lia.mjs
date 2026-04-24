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
  let resposta = '';
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    resposta = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
  }
  return { resposta, contexto };
}

async function testeBotoxSaiWhatsApp() {
  const base = await fluxo(['quero comprar botox', 'sistema', 'Palmas', 'cartão']);
  const passo1 = await chamarLia('resposta errada', base.contexto);
  const passo2 = await chamarLia('ainda errado', passo1.payload?.contexto || {});

  const respostaFinal = passo2.payload?.resposta || '';
  const ok = respostaFinal.toLowerCase().includes('vou te direcionar para a equipe da unidade') && respostaFinal.includes('wa.me');

  console.log('\n[TESTE] botox -> erro -> erro => WhatsApp');
  console.log('Resposta final:', respostaFinal.replace(/\n/g, ' | '));
  console.log('Resultado:', ok ? 'PASSOU' : 'FALHOU');
}

async function testeUltraSaiWhatsApp() {
  const base = await fluxo(['quero comprar ultra', 'sistema', 'Palmas', 'cartão']);
  const passo1 = await chamarLia('resposta confusa', base.contexto);
  const passo2 = await chamarLia('continua confusa', passo1.payload?.contexto || {});

  const respostaFinal = passo2.payload?.resposta || '';
  const ok = respostaFinal.toLowerCase().includes('vou te direcionar para a equipe da unidade') && respostaFinal.includes('wa.me');

  console.log('\n[TESTE] ultra -> confusa -> confusa => WhatsApp');
  console.log('Resposta final:', respostaFinal.replace(/\n/g, ' | '));
  console.log('Resultado:', ok ? 'PASSOU' : 'FALHOU');
}

async function testeResetAoEntender() {
  const base = await fluxo(['quero comprar botox', 'sistema', 'Palmas', 'cartão']);
  const passo1 = await chamarLia('resposta errada', base.contexto);
  const passo2 = await chamarLia('botox facial', passo1.payload?.contexto || {});
  const contextoFinal = passo2.payload?.contexto || {};
  const ok = Number(contextoFinal.tentativas_pergunta || 0) === 0;

  console.log('\n[TESTE] reset quando entende resposta');
  console.log('tentativas_pergunta:', contextoFinal.tentativas_pergunta ?? '(undefined)');
  console.log('Resultado:', ok ? 'PASSOU' : 'FALHOU');
}

await testeBotoxSaiWhatsApp();
await testeUltraSaiWhatsApp();
await testeResetAoEntender();
