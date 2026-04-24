// Teste para verificar se o Pix não contém HTML

function normalizeText(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Simular PIX_POR_CIDADE
const PIX_POR_CIDADE = {
  'brasilia': 'Pix CR Laser® Brasília:\n\n🔽🔽\n\n34.028.314/0001-78',
  'campinas': 'Pix CR Laser® Campinas:\n\n🔽🔽\n\n34.028.314/0001-78',
  'goiania': 'Pix CR Laser® Goiânia:\n\n🔽🔽\n\n34.028.314/0001-78',
  'palmas': 'Pix CR Laser® Palmas:\n\n🔽🔽\n\n34.028.314/0001-78',
  'saopaulo': 'Pix CR Laser® São Paulo:\n\n🔽🔽\n\n34.028.314/0001-78'
};

// Função CORRIGIDA (sem HTML)
function gerarRespostaPix(cidade = '') {
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

  return `Perfeito 😊

Segue o Pix da unidade de ${cityName}:

${cnpj}

Após o pagamento, envie o comprovante para a unidade e solicite o agendamento.

📍 Importante: confira se os dados pertencem à CR Laser® antes de concluir o pagamento.`;
}

console.log('=================================');
console.log('✅ TESTE: Pix SEM HTML');
console.log('=================================\n');

const cidades = ['brasilia', 'campinas', 'goiania', 'palmas', 'saopaulo'];

cidades.forEach(cidade => {
  const resposta = gerarRespostaPix(cidade);
  console.log(`\n📍 ${cidade.toUpperCase()}:`);
  console.log('─'.repeat(40));
  console.log(resposta);
  console.log('─'.repeat(40));
  
  // Verificar se há HTML
  const temHTML = /<[^>]*>/g.test(resposta);
  const status = temHTML ? '❌ FALHA: Contém HTML' : '✅ OK: Sem HTML';
  console.log(status);
});

console.log('\n=================================');
console.log('✅ TESTE CONCLUÍDO');
console.log('=================================');
