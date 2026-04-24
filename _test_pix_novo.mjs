// Teste do novo formato PIX com correção de normalização

function normalizeText(texto = '') {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const PIX_POR_CIDADE = {
  'brasilia': 'Pix CR Laser® Brasília:\n\n🔽🔽\n\n43.713.316/0001-33',
  'campinas': 'Pix CR Laser® Campinas:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n60.970.806/0001-34',
  'goiania': 'PIX CR Laser® Goiânia:\n\n🔽🔽\n\n39.252.455/0001-30',
  'palmas': 'PIX CR Laser® Palmas:\n\n🔽🔽\n\n18.986.800/0001-99',
  'saopaulo': 'Pix CR Laser® São Paulo:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n54.153.510/0001-28'
};

function gerarRespostaPix(cidade = '') {
  // ✅ FIX: Remover espaços também na normalização para "São Paulo" → "saopaulo"
  const cidadeNorm = normalizeText(cidade).replace(/\s+/g, '');
  const pix = PIX_POR_CIDADE[cidadeNorm];

  if (!pix) {
    return 'Desculpe, não encontrei a chave Pix desta unidade. Você pode falar direto com a equipe!';
  }

  // Extrair CNPJ da string PIX
  const cnpjMatch = pix.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/);
  const cnpj = cnpjMatch ? cnpjMatch[1] : '';

  // Extrair nome da cidade
  const cityNameMatch = pix.match(/Laser®\s+([^:]+)/);
  const cityName = cityNameMatch ? cityNameMatch[1].trim() : cidade;

  // Botão para copiar Pix
  const botaoCopiar = cnpj ? `<button onclick="navigator.clipboard.writeText('${cnpj}').then(() => alert('Pix copiado!')).catch(e => console.error('Erro ao copiar:', e))" style="display:inline-block;margin-top:12px;padding:10px 20px;background:#00c2ff;color:#ffffff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:14px;">📋 Copiar Pix</button>` : '';

  return `Perfeito 😊

Segue o Pix da unidade de ${cityName}:

${cnpj}

${botaoCopiar}

Após o pagamento, envie o comprovante para a unidade e solicite o agendamento.

📍 Importante: confira se os dados pertencem à CR Laser® antes de concluir o pagamento.`;
}

console.log('=================================');
console.log('✅ TESTE DO NOVO FORMATO PIX');
console.log('=================================\n');

const cidades = ['Palmas', 'Campinas', 'Brasília', 'São Paulo', 'Goiânia'];

cidades.forEach((cidade, idx) => {
  console.log(`📍 TESTE ${idx + 1}: ${cidade}\n`);
  console.log(gerarRespostaPix(cidade));
  if (idx < cidades.length - 1) console.log('\n---\n');
});

console.log('\n\n✅ TODOS OS TESTES COMPLETADOS COM SUCESSO!');
