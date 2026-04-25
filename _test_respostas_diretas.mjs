import handler from './api/lia-v2.js';

function criarReq(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function criarRes() {
  let resultado = null;
  return {
    res: {
      status(code) {
        return {
          json(payload) {
            resultado = { code, ...payload };
          }
        };
      }
    },
    getResultado: () => resultado
  };
}

async function enviar(pergunta, contexto = {}) {
  const { res, getResultado } = criarRes();
  await handler(criarReq(pergunta, contexto), res);
  return getResultado();
}

function ok(nome, condicao, resultado) {
  console.log(`${condicao ? '✅' : '❌'} ${nome}`);
  if (!condicao) {
    console.log('Resposta recebida:');
    console.log(resultado?.resposta || '(sem resposta)');
  }
}

console.log('\n═══ TESTES: respostas diretas sem desvio ═══\n');

const r1 = await enviar('qual o aparelho');
ok(
  'CASO 1: "qual o aparelho" -> resposta direta',
  (r1?.resposta || '').includes('Usamos Ultraformer MPT original 😊') &&
    (r1?.resposta || '').includes('Quer ver a oferta ou tirar dúvida?'),
  r1
);

const r2 = await enviar('tem botox');
ok(
  'CASO 2: "tem botox" -> resposta + opção 1/2',
  (r2?.resposta || '').includes('Temos sim 😊') &&
    (r2?.resposta || '').includes('1️⃣ Ver a oferta') &&
    (r2?.resposta || '').includes('2️⃣ Tirar dúvida?'),
  r2
);

const r3 = await enviar('onde fica?', { cidade: 'campinas', cidadeAtual: 'campinas' });
ok(
  'CASO 3: "onde fica" com cidade em contexto -> contato direto',
  (r3?.resposta || '').includes('CR Laser® Campinas') || (r3?.resposta || '').includes('📞'),
  r3
);

console.log('\n═══ fim ═══\n');
