import handler from './api/lia-v2.js';

function mkReq(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function mkRes() {
  let result = null;
  return {
    res: {
      status(code) {
        return {
          json(payload) {
            result = { code, ...payload };
          }
        };
      }
    },
    get: () => result
  };
}

async function send(pergunta, contexto = {}) {
  const { res, get } = mkRes();
  await handler(mkReq(pergunta, contexto), res);
  return get();
}

function head(text = '') {
  return (text || '').split('\n')[0];
}

console.log('\n═══ TESTE FINAL FLUXO CENTRAL ═══\n');

let contexto = {};
const roteiro = [
  'quero saber do botox',
  'preço do botox',
  'quero comprar botox',
  'onde fica',
  'qual whatsapp',
  'paguei',
  'quero falar com atendente'
];

for (const msg of roteiro) {
  const out = await send(msg, contexto);
  contexto = out.contexto || contexto;
  console.log(`• ${msg} -> ${head(out.resposta)}`);
}

console.log('\n--- validações ---');

const rInfo = await send('quero saber do botox', {});
const okInfo = (rInfo.resposta || '').includes('O Botox suaviza rugas e linhas de expressão') && (rInfo.resposta || '').includes('1️⃣ Ver a oferta');
console.log(`${okInfo ? '✅' : '❌'} INFORMACAO_PROCEDIMENTO com opções`);

const rPreco = await send('preço do botox', {});
const okPreco = (rPreco.resposta || '').includes('Você quer:\n1️⃣ Gerar a oferta agora\n2️⃣ Que eu te ajude?');
console.log(`${okPreco ? '✅' : '❌'} PRECO orienta sistema sem link`);

const rContato = await send('qual whatsapp', { cidade: 'campinas', cidadeAtual: 'campinas' });
const okContato = (rContato.resposta || '').includes('📞') || (rContato.resposta || '').toLowerCase().includes('whatsapp');
console.log(`${okContato ? '✅' : '❌'} CONTATO vence fluxo antigo`);

const rHumano = await send('quero falar com atendente', {});
const okHumano = (rHumano.resposta || '').toLowerCase().includes('direcionar direto para a equipe');
console.log(`${okHumano ? '✅' : '❌'} HUMANO direciona equipe`);

console.log('\n═══ fim ═══\n');
