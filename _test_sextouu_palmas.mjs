// Teste da lógica de links de campanha Sextouu Palmas

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

const LINKS_CAMPANHA_SEXTOUU_PALMAS = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4pWxfEt',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/4gwYO37',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/43jpYF9',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4gwYO37',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4htLaOz',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/421rBXD',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4kEvokX',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/442qoAM',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4mtqtmV',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/44tQmx0',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/4lm5Mcg',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/4encYCO',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4kUz2aa',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/44vVv7J',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3HUpPAl',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/3G2CJeZ',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/43YlG6Z',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/44cXY5M',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/3ZOPUa6',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3T4T4mn',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4lo0VYd',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3Icqw7X',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3TEUqEs',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4lHjZ3Z',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/3GbM7gn',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/3HVBYoy',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4k2G6Ap',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4m1v7dh',
  'Botox Suor Axilar': 'https://cielolink.com.br/4bGnHHA',
  'Preenchedor Facial': 'https://cielolink.com.br/417PGLr',
  'Bioestimulador Diamond': 'https://cielolink.com.br/430UpzN'
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
console.log('✅ TESTE LINKS SEXTOUU PALMAS');
console.log('=================================\n');

const testCases = [
  { entrada: 'quero Ultraformer MPT Full Face em Palmas', cidade: 'palmas', esperado: 'https://cielolink.com.br/4pWxfEt' },
  { entrada: 'Ultraformer MPT Terço Inferior', cidade: 'palmas', esperado: 'https://cielolink.com.br/4gwYO37' },
  { entrada: 'Quero fazer Lavieen Facial Completo Palmas', cidade: 'palmas', esperado: 'https://cielolink.com.br/3ZOPUa6' },
  { entrada: 'Botox Facial em Palmas', cidade: 'palmas', esperado: 'https://cielolink.com.br/4m1v7dh' },
  { entrada: 'Preenchedor Facial', cidade: 'palmas', esperado: 'https://cielolink.com.br/417PGLr' },
  { entrada: 'Ultraformer MPT Papada', cidade: 'palmas', esperado: 'https://cielolink.com.br/43jpYF9' }
];

let sucessos = 0;
testCases.forEach((test, idx) => {
  console.log(`Teste ${idx + 1}: "${test.entrada}"`);
  const procedimento = detectarProcedimento(test.entrada);
  console.log(`  Procedimento: ${procedimento}`);
  
  if (procedimento) {
    const link = LINKS_CAMPANHA_SEXTOUU_PALMAS[procedimento];
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
