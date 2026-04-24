import handler from './api/lia-v2.js';

function chamarLia(pergunta, contexto = {}) {
  return new Promise((resolve) => {
    const req = { method: 'POST', body: { pergunta, contexto } };
    const res = {
      _status: 200,
      status(code) { this._status = code; return this; },
      json(payload) { resolve({ status: this._status, payload }); }
    };
    Promise.resolve(handler(req, res)).catch((error) => {
      resolve({ status: 500, payload: { erro: String(error) } });
    });
  });
}

const baseContextoCartao = {
  intencao: 'fluxo_pagamento_aguardando_procedimento_cartao',
  cidadeCompra: 'palmas',
  formaPagamento: 'cartao',
  intencaoCompra: 'sistema',
  status_compra: 'em andamento',
  perguntouProcedimentoCartao: true
};

const casos = [
  { entrada: 'ultra', esperadoContem: 'Você quer fazer no rosto ou em alguma região do corpo? 😊' },
  { entrada: 'ultrafomer', esperadoContem: 'https://cielolink.com.br/4pWxfEt' },
  { entrada: 'mpt rosto', esperadoContem: 'https://cielolink.com.br/4pWxfEt' },
  { entrada: 'lifting sem cirurgia', esperadoContem: 'https://cielolink.com.br/4pWxfEt' },
  { entrada: 'papada', esperadoContem: 'https://cielolink.com.br/43jpYF9' },
  { entrada: 'barriga', esperadoContem: 'https://cielolink.com.br/442qoAM' },
  { entrada: 'olho caído', esperadoContem: 'https://cielolink.com.br/4kEvokX' },
  { entrada: 'papada e barriga', esperadoContem: 'Você quer fazer no rosto ou em alguma região do corpo? 😊' }
];

console.log('=== TESTE ALIASES ULTRAFORMER ===');
for (const caso of casos) {
  const r = await chamarLia(caso.entrada, baseContextoCartao);
  const resposta = r.payload?.resposta || '';
  const ok = resposta.includes(caso.esperadoContem);
  console.log(`\nEntrada: ${caso.entrada}`);
  console.log(`Esperado conter: ${caso.esperadoContem}`);
  console.log(`Resultado: ${ok ? 'OK' : 'FALHOU'}`);
  console.log(`Resposta: ${resposta.replace(/\n/g, ' | ')}`);
}
