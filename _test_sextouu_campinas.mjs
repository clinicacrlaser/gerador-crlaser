// Teste da lógica de links de campanha Sextouu Campinas

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

const LINKS_CAMPANHA_SEXTOUU_CAMPINAS = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4hMMcVZ',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/47SmB9U',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/3WIYKnO',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4qLLht5',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/49GEfzH',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3LokIdr',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4hNiG2x',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/4hNP19u',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/43ZgOxR',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/3WIGD1q',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/3JQjKWK',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/4nLfaqR',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4nKHqdg',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/4oVCkf1',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3XfbVwO',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/3JHTD4c',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3XmQtpH',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/4ow6VQF',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4nRfu7u',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3LFxqo4',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4nQS9CI',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4qTN2V4',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3JQmHGW',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4qVchGD',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/4oDzdc4',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/47S34Gf',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4hWmuyk',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4igbg8p',
  'Botox Suor Axilar': 'https://cielolink.com.br/47P9eHd',
  'Preenchedor Facial': 'https://cielolink.com.br/3WUFXGd',
  'Bioestimulador Diamond': 'https://cielolink.com.br/49Vqe14'
};

function detectarProcedimento(texto = '') {
  const textoNorm = normalizeText(texto);
  
  for (const proc of PROCEDURES) {
    const procNorm = normalizeText(proc.name);
    if (textoNorm.includes(procNorm)) {
      return proc.name;
    }
  }
  
  return null;
}

console.log('=================================');
console.log('✅ TESTE LINKS SEXTOUU CAMPINAS');
console.log('=================================\n');

const testCases = [
  { entrada: 'quero Ultraformer MPT Full Face em Campinas', cidade: 'campinas', esperado: 'https://cielolink.com.br/4hMMcVZ' },
  { entrada: 'Ultraformer MPT Terço Inferior', cidade: 'campinas', esperado: 'https://cielolink.com.br/47SmB9U' },
  { entrada: 'Quero fazer Lavieen Facial Completo Campinas', cidade: 'campinas', esperado: 'https://cielolink.com.br/4nRfu7u' },
  { entrada: 'Botox Facial em Campinas', cidade: 'campinas', esperado: 'https://cielolink.com.br/4igbg8p' },
  { entrada: 'Preenchedor Facial', cidade: 'campinas', esperado: 'https://cielolink.com.br/3WUFXGd' },
  { entrada: 'Ultraformer MPT Papada', cidade: 'campinas', esperado: 'https://cielolink.com.br/3WIYKnO' }
];

let sucessos = 0;
testCases.forEach((test, idx) => {
  console.log(`Teste ${idx + 1}: "${test.entrada}"`);
  const procedimento = detectarProcedimento(test.entrada);
  console.log(`  Procedimento: ${procedimento}`);
  
  if (procedimento) {
    const link = LINKS_CAMPANHA_SEXTOUU_CAMPINAS[procedimento];
    const passou = link === test.esperado;
    console.log(`  Link: ${passou ? '✅' : '❌'} ${link || 'não encontrado'}`);
    if (passou) sucessos++;
  } else {
    console.log(`  ❌ Procedimento não detectado`);
  }
  console.log('');
});

console.log('=================================');
console.log(`✅ RESULTADO: ${sucessos}/${testCases.length} testes passaram`);
console.log('=================================');
