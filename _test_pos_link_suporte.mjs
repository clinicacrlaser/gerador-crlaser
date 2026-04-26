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

function hasLink(text = '') {
  return /https?:\/\//i.test(text) || /finalizar sua compra|finalizar compra/i.test(text);
}

console.log('\n═══ TESTE MODO SUPORTE PÓS-LINK ═══\n');

let contexto = {};

const s1 = await send('quero comprar botox', contexto);
contexto = s1.contexto || contexto;
const s2 = await send('campinas', contexto);
contexto = s2.contexto || contexto;
const s3 = await send('cartão', contexto);
contexto = s3.contexto || contexto;
const s4 = await send('botox facial', contexto);
contexto = s4.contexto || contexto;

const linkEnviado = !!contexto.linkEnviado;
console.log(`${linkEnviado ? '✅' : '❌'} linkEnviado marcado após resposta com link`);

const rMandoOnde = await send('mando onde', contexto);
const okMandoOnde = (rMandoOnde.resposta || '').includes('Envie o comprovante no WhatsApp da unidade:') && (rMandoOnde.resposta || '').includes('📞');
const semLinkMandoOnde = !hasLink(rMandoOnde.resposta || '');
console.log(`${okMandoOnde && semLinkMandoOnde ? '✅' : '❌'} fluxo completo + "mando onde" -> manda WhatsApp sem repetir link`);

contexto = rMandoOnde.contexto || contexto;
const rQualWhatsapp = await send('qual whatsapp', contexto);
const okQualWhatsapp = (rQualWhatsapp.resposta || '').includes('📞') && !hasLink(rQualWhatsapp.resposta || '');
console.log(`${okQualWhatsapp ? '✅' : '❌'} "qual whatsapp" -> manda telefone sem link`);

contexto = rQualWhatsapp.contexto || contexto;
const rPaguei = await send('paguei', contexto);
const okPaguei = (rPaguei.resposta || '').includes('Agora é só enviar o comprovante no WhatsApp da unidade para agendar:') && (rPaguei.resposta || '').includes('📞') && !hasLink(rPaguei.resposta || '');
console.log(`${okPaguei ? '✅' : '❌'} "paguei" -> orientação de comprovante sem link`);

console.log('\n--- Saídas resumidas ---');
console.log('mando onde:', (rMandoOnde.resposta || '').split('\n')[0]);
console.log('qual whatsapp:', (rQualWhatsapp.resposta || '').split('\n')[0]);
console.log('paguei:', (rPaguei.resposta || '').split('\n')[0]);

console.log('\n═══ fim ═══\n');
