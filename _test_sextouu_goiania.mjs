// Teste da lógica de links de campanha Sextouu Goiânia

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

const LINKS_CAMPANHA_SEXTOUU_GOIANIA = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4kWJPjS',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/3SOinsE',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/3HBDoo6',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/3HDAKOu',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/3TmRlss',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3FAFMeh',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4e0R2xc',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/3SJG05E',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4l7ONKW',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/4kNv5Ej',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/45gwTRm',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/3TmJo6C',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4jJJqQH',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/4l0t870',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3FVSSTj',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/4kIpE9G',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/4jJZLoE',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/43QLO3L',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4e3tVC7',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/4dWX0yV',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4kE0OYo',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3HBLL2Z',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3SPZWDV',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/3FAKNU9',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/3T9mPT7',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/43WHyOD',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/3G0OsdM',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4198sSD',
  'Botox Suor Axilar': 'https://cielolink.com.br/3O16Siy',
  'Preenchedor Facial': 'https://cielolink.com.br/4s8p87T',
  'Bioestimulador Diamond': 'https://cielolink.com.br/4l02GKP'
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
console.log('✅ TESTE LINKS SEXTOUU GOIÂNIA');
console.log('=================================\n');

const testCases = [
  { entrada: 'quero Ultraformer MPT Full Face em Goiânia', cidade: 'goiania', esperado: 'https://cielolink.com.br/4kWJPjS' },
  { entrada: 'Ultraformer MPT Terço Inferior', cidade: 'goiania', esperado: 'https://cielolink.com.br/3SOinsE' },
  { entrada: 'Quero fazer Lavieen Facial Completo Goiânia', cidade: 'goiania', esperado: 'https://cielolink.com.br/4e3tVC7' },
  { entrada: 'Botox Facial em Goiânia', cidade: 'goiania', esperado: 'https://cielolink.com.br/4198sSD' },
  { entrada: 'Preenchedor Facial', cidade: 'goiania', esperado: 'https://cielolink.com.br/4s8p87T' },
  { entrada: 'Ultraformer MPT Papada', cidade: 'goiania', esperado: 'https://cielolink.com.br/3HBDoo6' }
];

let sucessos = 0;
testCases.forEach((test, idx) => {
  console.log(`Teste ${idx + 1}: "${test.entrada}"`);
  const procedimento = detectarProcedimento(test.entrada);
  console.log(`  Procedimento: ${procedimento}`);
  
  if (procedimento) {
    const link = LINKS_CAMPANHA_SEXTOUU_GOIANIA[procedimento];
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
