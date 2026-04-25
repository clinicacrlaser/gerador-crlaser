import handler from './api/lia-v2.js';

function req(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function resFactory() {
  let out = null;
  return {
    res: {
      status(code) {
        return {
          json(payload) {
            out = { code, ...payload };
          }
        };
      }
    },
    get: () => out
  };
}

async function enviar(pergunta, contexto = {}) {
  const { res, get } = resFactory();
  await handler(req(pergunta, contexto), res);
  return get();
}

console.log('\n═══ TESTE: urgência leve em oferta ═══\n');

const r1 = await enviar('ver oferta', { intencao: 'aguardando_interesse' });
const texto1 = r1?.resposta || '';
const temUrgencia1 = texto1.includes('Essa condição depende da campanha ativa 😊') || texto1.includes('Os valores podem mudar conforme a campanha.');
console.log(`${temUrgencia1 ? '✅' : '❌'} ver oferta -> inclui urgência leve`);
if (!temUrgencia1) {
  console.log(texto1);
}

const r2 = await enviar('depois', { intencao: 'aguardando_interesse' });
const texto2 = r2?.resposta || '';
const temFraseDemora = texto2.includes('Se quiser, posso já deixar sua oferta pronta pra garantir o valor.');
console.log(`${temFraseDemora ? '✅' : '❌'} cliente demorou -> frase de garantia suave`);
if (!temFraseDemora) {
  console.log(texto2);
}

console.log('\n═══ fim ═══\n');
