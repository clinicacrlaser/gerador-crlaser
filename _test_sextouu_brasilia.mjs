// Teste da lógica de links de campanha Sextouu Brasília

function normalizeText(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const PROCEDURES = [
  { name: 'Botox Facial Terço Superior Com Retorno', group: 'botox' },
  { name: 'Botox Suor Axilar', group: 'botox' },
  { name: 'Preenchedor Facial', group: 'preenchedor' },
  { name: 'Bioestimulador Diamond', group: 'diamond' },
  { name: 'Ultraformer MPT Full Face', group: 'ultraformer' },
  { name: 'Ultraformer MPT Pálpebras', group: 'ultraformer' },
  { name: 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)', group: 'ultraformer' },
  { name: 'Ultraformer MPT Papada', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bichectomia', group: 'ultraformer' },
  { name: 'Ultraformer MPT Terço Inferior', group: 'ultraformer' },
  { name: 'Ultraformer MPT Abdome', group: 'ultraformer' },
  { name: 'Ultraformer MPT Flancos', group: 'ultraformer' },
  { name: 'Ultraformer MPT Colo', group: 'ultraformer' },
  { name: 'Ultraformer MPT Gordura do Sutiã', group: 'ultraformer' },
  { name: 'Ultraformer MPT Gordura Pré-Axilar', group: 'ultraformer' },
  { name: 'Ultraformer MPT Monte de Vênus', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bananinha', group: 'ultraformer' },
  { name: 'Ultraformer MPT Braços Região do Tchau', group: 'ultraformer' },
  { name: 'Ultraformer MPT Joelho', group: 'ultraformer' },
  { name: 'Ultraformer MPT Interno de Coxa', group: 'ultraformer' },
  { name: 'Ultraformer MPT Mãos', group: 'ultraformer' },
  { name: 'Ultraformer MPT Rejuvenescimento Íntimo', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bumbum Up', group: 'ultraformer' },
  { name: 'Lavieen BB Laser Facial - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Facial Completo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Melasma Facial - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Face + Pescoço + Colo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Facial + Pescoço - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Olheiras - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Pescoço + Colo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Capilar - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Mãos - 3 sessões', group: 'lavieen' }
];

const LINKS_CAMPANHA_SEXTOUU_BRASILIA = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/3IdBDxq',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/4eilQJG',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/40hOlS4',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/3Ta289v',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4nfB2eQ',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3Ta4F3v',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4nhX5l2',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/3HXv3eI',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/40mfAej',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/4eiTq2d',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/4nwe0Rc',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/44tNCjc',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/40hTl9i',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/46cVlDv',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/4nzzzAr',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/44xkBmM',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3FTixw9',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/3TEQSlC',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4et2Nwv',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3Id8zWT',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/45z4lmh',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3ZLbuwb',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3FRMJI0',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4lq229L',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/44lhygk',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/4lkw0vN',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/3ZO2Qgm',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4t0kASi',
  'Botox Suor Axilar': 'https://cielolink.com.br/41RXUHO',
  'Preenchedor Facial': 'https://cielolink.com.br/4mcm7ls',
  'Bioestimulador Diamond': 'https://cielolink.com.br/3HUzUx6'
};

function detectarProcedimento(texto = '') {
  const textoNorm = normalizeText(texto);
  
  // Busca exata pelo nome completo do procedimento
  for (const proc of PROCEDURES) {
    const procNorm = normalizeText(proc.name);
    if (textoNorm.includes(procNorm)) {
      return proc.name;
    }
  }
  
  return null;
}

function gerarRespostaOfertaCampanha(procedimento = '', cidade = '') {
  const cidadeNorm = normalizeText(cidade).replace(/\s+/g, '');
  
  // Por enquanto, apenas Brasília tem links de campanha
  if (cidadeNorm !== 'brasilia') {
    return null;
  }

  // Buscar o link pelo nome do procedimento
  const link = LINKS_CAMPANHA_SEXTOUU_BRASILIA[procedimento];

  if (!link) {
    return null;
  }

  return `Perfeito 😊

Você pode finalizar sua compra aqui 👇

<a href="${link}" target="_blank" style="display:inline-block;margin-top:12px;padding:12px 20px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">🛒 Finalizar Compra</a>

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento.`;
}

console.log('=================================');
console.log('✅ TESTE LINKS SEXTOUU BRASÍLIA');
console.log('=================================\n');

const testCases = [
  { entrada: 'quero Ultraformer MPT Full Face em Brasília', esperado: 'https://cielolink.com.br/3IdBDxq' },
  { entrada: 'Ultraformer MPT Terço Inferior', esperado: 'https://cielolink.com.br/4eilQJG' },
  { entrada: 'Quero fazer Lavieen Facial Completo', esperado: 'https://cielolink.com.br/4et2Nwv' },
  { entrada: 'Botox Facial em Brasília', esperado: 'https://cielolink.com.br/4t0kASi' },
  { entrada: 'Preenchedor Facial', esperado: 'https://cielolink.com.br/4mcm7ls' },
  { entrada: 'Ultraformer MPT Papada', esperado: 'https://cielolink.com.br/40hOlS4' }
];

testCases.forEach((test, idx) => {
  console.log(`Teste ${idx + 1}: "${test.entrada}"`);
  const procedimento = detectarProcedimento(test.entrada);
  console.log(`  Procedimento detectado: ${procedimento}`);
  
  if (procedimento) {
    const link = LINKS_CAMPANHA_SEXTOUU_BRASILIA[procedimento];
    console.log(`  Link encontrado: ${link === test.esperado ? '✅ ' : '❌ '}${link}`);
    
    const resposta = gerarRespostaOfertaCampanha(procedimento, 'Brasília');
    console.log(`  Resposta HTML: ${resposta ? '✅ Gerada' : '❌ Não gerada'}`);
  } else {
    console.log(`  ❌ Procedimento não detectado`);
  }
  console.log('');
});

console.log('=================================');
console.log('✅ TESTES CONCLUÍDOS');
console.log('=================================');
