// Teste da lógica de links de campanha Sextouu São Paulo

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

const LINKS_CAMPANHA_SEXTOUU_SAOPAULO = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4k8hne7',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/4l2Kn8u',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4nmeERe',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4kagiCH',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/4kgUxRK',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4kbqN8K',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/4kZQudA',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4k72hFF',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/3ZMX12H',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/44ukCYx',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/449vrzr',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/3Gd8Zfl',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/43Yd5RH',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/4l4L7Kk',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/4niMYfY',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3T3M8pz',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/4k83M6q',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4emce0L',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/4lpMses',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3IaR2P4',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4kTxJID',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/4l2Wq5I',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/46cJNjI',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/4emll1t',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/45FebmO',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4nzR2bZ',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4sJCiJH',
  'Botox Suor Axilar': 'https://cielolink.com.br/3PH1MbU',
  'Preenchedor Facial': 'https://cielolink.com.br/3Qa4AhM',
  'Bioestimulador Diamond': 'https://cielolink.com.br/4k3zUbn'
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
console.log('✅ TESTE LINKS SEXTOUU SÃO PAULO');
console.log('=================================\n');

const testCases = [
  { entrada: 'quero Ultraformer MPT Full Face em São Paulo', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/4k8hne7' },
  { entrada: 'Ultraformer MPT Papada', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/4l2Kn8u' },
  { entrada: 'Quero fazer Lavieen Facial Completo São Paulo', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/4emce0L' },
  { entrada: 'Botox Facial em São Paulo', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/4sJCiJH' },
  { entrada: 'Preenchedor Facial', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/3Qa4AhM' },
  { entrada: 'Ultraformer MPT Bichectomia', cidade: 'saopaulo', esperado: 'https://cielolink.com.br/4nmeERe' }
];

let sucessos = 0;
testCases.forEach((test, idx) => {
  console.log(`Teste ${idx + 1}: "${test.entrada}"`);
  const procedimento = detectarProcedimento(test.entrada);
  console.log(`  Procedimento: ${procedimento}`);
  
  if (procedimento) {
    const link = LINKS_CAMPANHA_SEXTOUU_SAOPAULO[procedimento];
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
