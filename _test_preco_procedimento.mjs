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

const casos = [
  'preço do bioestimulador',
  'valor do botox',
  'quanto custa ultraformer',
  'promoção lavieen',
  'orçamento preenchedor'
];

for (const frase of casos) {
  const r = await chamarLia(frase, {});
  const resposta = r.payload?.resposta || '';
  const okMensagem = resposta.includes('Os valores variam conforme a campanha ativa.') && resposta.includes('Para ver a condição atual, é melhor gerar direto no sistema.');
  const okCidade = resposta.includes('Qual unidade fica melhor pra você?') && resposta.includes('Brasília, Campinas, Goiânia, Palmas ou São Paulo?');
  const naoTecnica = !resposta.includes('Isso costuma estar relacionado a') && !resposta.includes('bioestimulador / preenchimento');

  console.log('\nPERGUNTA:', frase);
  console.log('RESPOSTA:', resposta.replace(/\n/g, ' | '));
  console.log('Mensagem de preço correta:', okMensagem ? 'SIM' : 'NAO');
  console.log('Pediu unidade quando sem cidade:', okCidade ? 'SIM' : 'NAO');
  console.log('Nao respondeu duvida tecnica:', naoTecnica ? 'SIM' : 'NAO');
}
