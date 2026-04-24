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
  let ultimaResposta = '';
  for (const msg of mensagens) {
    const r = await chamarLia(msg, contexto);
    ultimaResposta = r.payload?.resposta || '';
    contexto = r.payload?.contexto || contexto;
  }
  return { contexto, ultimaResposta };
}

async function testeFluxoBotoxCurto() {
  const inicio = await fluxo(['quero comprar botox', 'sistema', 'Palmas', 'cartão']);
  const passoBotox = await chamarLia('botox', inicio.contexto);
  const contextoComLink = passoBotox.payload?.contexto || inicio.contexto;
  const respostaLink = passoBotox.payload?.resposta || '';
  const temLink = respostaLink.includes('https://cielolink.com.br');

  const okPosLink = await chamarLia('ok', contextoComLink);
  const respostaOk = okPosLink.payload?.resposta || '';
  const okMensagem = respostaOk.includes('Depois do pagamento, envie o comprovante para o WhatsApp da unidade para solicitar o agendamento.');

  console.log('\n[TESTE 1] quero comprar botox / sistema / Palmas / cartão / botox / facial');
  console.log('Link recebido:', temLink ? 'SIM' : 'NAO');
  console.log('Resposta do link:', respostaLink.replace(/\n/g, ' | '));
  console.log('Resposta para "ok":', respostaOk.replace(/\n/g, ' | '));
  console.log('Mensagem curta pós-link correta:', okMensagem ? 'SIM' : 'NAO');
}

async function testeCidadeComRespostaCurta() {
  const inicio = await fluxo(['quero comprar', 'sistema']);
  const r = await chamarLia('ok', inicio.contexto);
  const resposta = r.payload?.resposta || '';
  const ok = resposta.includes('Qual unidade fica melhor pra você?') && resposta.includes('Brasília, Campinas, Goiânia, Palmas ou São Paulo?');

  console.log('\n[TESTE 1B] pergunta de cidade + resposta curta "ok"');
  console.log('Resposta:', resposta.replace(/\n/g, ' | '));
  console.log('Repetiu cidade com clareza:', ok ? 'SIM' : 'NAO');
}

async function testeFormaPagamentoNumerica() {
  const r = await fluxo(['quero comprar', 'sistema', 'Palmas', '2']);
  const resposta = r.ultimaResposta || '';
  const ok = resposta.includes('Qual procedimento você quer finalizar no cartão?') || resposta.includes('Você quer Botox facial ou Botox para suor axilar?');

  console.log('\n[TESTE 2] forma de pagamento: 2');
  console.log('Resposta:', resposta.replace(/\n/g, ' | '));
  console.log('Interpretou como cartão:', ok ? 'SIM' : 'NAO');
}

async function testeFormaPagamentoPixTexto() {
  const r = await fluxo(['quero comprar', 'sistema', 'Palmas', 'pix']);
  const resposta = r.ultimaResposta || '';
  const ok = resposta.includes('Segue o Pix da unidade de Palmas');

  console.log('\n[TESTE 3] forma de pagamento: pix');
  console.log('Resposta:', resposta.replace(/\n/g, ' | '));
  console.log('Interpretou como pix:', ok ? 'SIM' : 'NAO');
}

await testeFluxoBotoxCurto();
await testeCidadeComRespostaCurta();
await testeFormaPagamentoNumerica();
await testeFormaPagamentoPixTexto();
