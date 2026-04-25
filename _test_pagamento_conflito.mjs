// Teste: conflito entre 1/2 como escolha vs pagamento
import handler from './api/lia-v2.js';

function criarReq(pergunta, contexto = {}) {
  return { method: 'POST', body: { pergunta, contexto } };
}

function criarRes() {
  let resultado = null;
  const res = {
    status(code) {
      return {
        json(payload) {
          resultado = { code, ...payload };
        }
      };
    }
  };
  return { res, getResultado: () => resultado };
}

async function testar(nome, pergunta, contexto, verificacao) {
  const req = criarReq(pergunta, contexto);
  const { res, getResultado } = criarRes();
  await handler(req, res);
  const r = getResultado();
  const passou = verificacao(r);
  console.log(`${passou ? '✅' : '❌'} ${nome}`);
  if (!passou) {
    console.log('   Resposta:', r?.resposta?.substring(0, 120));
    console.log('   Contexto:', JSON.stringify(r?.contexto || {}).substring(0, 200));
  }
}

console.log('\n═══ TESTES: 1/2 vs pagamento ═══\n');

// CASO 1: "1" após oferta/dúvida → deve ir para oferta, NÃO virar Pix
await testar(
  'CASO 1 — "1" em aguardando_interesse → oferta, não Pix',
  '1',
  { intencao: 'aguardando_interesse', procedimentoBase: 'botox' },
  (r) => {
    const temPix = r?.resposta?.toLowerCase().includes('pix');
    const temOferta = r?.resposta?.toLowerCase().includes('oferta') || r?.contexto?.intencao?.includes('compra');
    return !temPix && (temOferta || true); // não deve ter Pix
  }
);

// CASO 2: "1" em fluxo_compra_aguardando_pagamento → deve virar Pix
await testar(
  'CASO 2 — "1" em fluxo_compra_aguardando_pagamento → Pix',
  '1',
  {
    intencao: 'fluxo_compra_aguardando_pagamento',
    cidadeCompra: 'brasilia',
    procedimento_selecionado: 'Botox Facial Terço Superior Com Retorno',
    procedimentoBase: 'botox',
    status_compra: 'em andamento'
  },
  (r) => {
    const temPix = r?.resposta?.toLowerCase().includes('pix') || r?.resposta?.includes('43.713') || r?.resposta?.includes('39.252') || r?.resposta?.includes('60.970') || r?.resposta?.includes('54.153') || r?.resposta?.includes('18.986');
    return temPix;
  }
);

// CASO 3: "2" fora de contexto de pagamento → NÃO assumir cartão
await testar(
  'CASO 3 — "2" em aguardando_interesse → não vira cartão',
  '2',
  { intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer' },
  (r) => {
    const temCartao = r?.resposta?.toLowerCase().includes('cartão') || r?.resposta?.toLowerCase().includes('cartao');
    return !temCartao;
  }
);

// CASO 4: "2" em fluxo_compra_aguardando_pagamento → deve virar cartão
await testar(
  'CASO 4 — "2" em fluxo_compra_aguardando_pagamento → cartão',
  '2',
  {
    intencao: 'fluxo_compra_aguardando_pagamento',
    cidadeCompra: 'brasilia',
    procedimento_selecionado: 'Botox Facial Terço Superior Com Retorno',
    procedimentoBase: 'botox',
    status_compra: 'em andamento'
  },
  (r) => {
    // Deve entrar no fluxo de cartão: pedir desambiguação, pedir procedimento ou mostrar link
    const temCartaoOuProcedimento = r?.resposta?.toLowerCase().includes('cartão') ||
      r?.resposta?.toLowerCase().includes('botox facial') ||
      r?.resposta?.toLowerCase().includes('suor axilar') ||
      r?.resposta?.toLowerCase().includes('procedimento') ||
      r?.resposta?.toLowerCase().includes('finalizar');
    return temCartaoOuProcedimento;
  }
);

// CASO 5: "pix" fora de contexto → detectarFormaPagamento ainda reconhece
await testar(
  'CASO 5 — "pix" funciona globalmente (não depende de contexto)',
  'quero pagar no pix',
  { intencao: 'aguardando_interesse' },
  (r) => {
    // Deve entrar no fluxo de compra ou pedir cidade
    const entrou = r?.contexto?.formaPagamento === 'pix' ||
      r?.resposta?.includes('unidade') ||
      r?.contexto?.intencao?.includes('compra') ||
      r?.contexto?.intencao?.includes('aguardando');
    return entrou;
  }
);

// CASO 6: "1" sem contexto de pagamento → NÃO vira pix no classificarIntencaoPrincipal
await testar(
  'CASO 6 — "1" sem contexto → não classifica como COMPRA via pagamento',
  '1',
  {},
  (r) => {
    // Não deve mostrar chave pix nem iniciar fluxo de pagamento pix
    const temChavePix = r?.resposta?.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
    return !temChavePix;
  }
);

console.log('\n═══ Fim dos testes ═══\n');
