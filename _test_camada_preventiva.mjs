import handler from './api/lia-v2.js';

function makeReq(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function makeRes() {
  let payload = null;
  return {
    res: {
      status(code) {
        return {
          json(data) {
            payload = { code, ...data };
          }
        };
      }
    },
    get: () => payload
  };
}

async function send(pergunta, contexto = {}) {
  const { res, get } = makeRes();
  await handler(makeReq(pergunta, contexto), res);
  return get();
}

function line(text = '') {
  return (text || '').split('\n')[0] || '';
}

function hasLink(text = '') {
  return /https?:\/\//i.test(text) || /Finalizar Compra|finalizar sua compra/i.test(text);
}

console.log('\n═══ TESTE CAMADA PREVENTIVA ═══\n');

let contexto = {};

const roteiro = [
  'preço do botox',
  'quero comprar botox',
  'onde fica',
  'campinas',
  'qual o preço',
  'quero cartão',
  'paguei',
  'qual telefone',
  'ultra mpt',
  'rosto'
];

for (const msg of roteiro) {
  const out = await send(msg, contexto);
  contexto = out.contexto || contexto;
  console.log(`• ${msg} -> ${line(out.resposta)}`);
}

console.log('\n--- Checks preventivos ---\n');

// Regra 3: preço não inicia pagamento
const rPreco = await send('preço do botox', {});
const okPreco = (rPreco.resposta || '').includes('Você quer:\n1️⃣ Gerar a oferta agora\n2️⃣ Que eu te ajude?');
console.log(`${okPreco ? '✅' : '❌'} Preço direciona sistema (não entra em pagamento)`);

// Regra 4: sem pagamento não manda link
let ctxCompra = {};
const c1 = await send('quero comprar botox', ctxCompra);
ctxCompra = c1.contexto || {};
const c2 = await send('campinas', ctxCompra);
ctxCompra = c2.contexto || ctxCompra;
const semLinkSemPagamento = !hasLink(c2.resposta || '') && (c2.resposta || '').includes('Você prefere:\n1️⃣ Pix\n2️⃣ Cartão?');
console.log(`${semLinkSemPagamento ? '✅' : '❌'} Sem pagamento não envia link`);

// Completo com pagamento + procedimento -> link
const c3 = await send('cartão', ctxCompra);
ctxCompra = c3.contexto || ctxCompra;
const c4 = await send('botox facial', ctxCompra);
const temLinkComDados = hasLink(c4.resposta || '');
console.log(`${temLinkComDados ? '✅' : '❌'} Com cidade+procedimento+pagamento envia link`);

// Regra 5: contato objetivo
const rContato = await send('qual telefone', { cidade: 'campinas', cidadeAtual: 'campinas' });
const okContato = (rContato.resposta || '').includes('📞') || (rContato.resposta || '').toLowerCase().includes('whatsapp');
console.log(`${okContato ? '✅' : '❌'} Contato responde contato`);

console.log('\n═══ FIM TESTE CAMADA PREVENTIVA ═══\n');
