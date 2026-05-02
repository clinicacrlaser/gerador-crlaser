// lia-duvidas.js - Assistente de dúvidas CR Laser®

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTuZWS1FSLb_BwDRQy4_HwlzCklKoUd8oO1NOP4ITKaI100iQEuM_x3ANFjB8tgjkfJQMx3LBmbbzij/pub?output=csv';
let baseDuvidas = [];
let csvCarregado = false;
let erroCarregarCSV = false;

const liaMessages = document.getElementById('liaMessages');
const liaForm = document.getElementById('liaForm');
const liaInput = document.getElementById('liaInput');

function adicionarMensagem(texto, tipo = 'lia') {
  const msg = document.createElement('div');
  msg.className = 'lia-msg ' + tipo;
  msg.innerHTML = texto.replace(/\n/g, '<br>');
  liaMessages.appendChild(msg);
  liaMessages.scrollTop = liaMessages.scrollHeight;
}

function normalizar(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCSVSeguro(csv) {
  const linhas = csv.split(/\r?\n/).filter(Boolean);
  if (linhas.length < 2) return [];
  const cabecalho = linhas[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const dados = [];
  for (let i = 1; i < linhas.length; i++) {
    let linha = linhas[i];
    const campos = [];
    let atual = '', dentroAspas = false;
    for (let c = 0; c < linha.length; c++) {
      const char = linha[c];
      if (char === '"') dentroAspas = !dentroAspas;
      else if (char === ',' && !dentroAspas) { campos.push(atual); atual = ''; }
      else atual += char;
    }
    campos.push(atual);
    if (campos.length < 4) continue;
    const obj = {};
    for (let j = 0; j < cabecalho.length; j++) {
      obj[cabecalho[j].toUpperCase()] = (campos[j] || '').trim();
    }
    dados.push(obj);
  }
  return dados;
}

function buscarResposta(pergunta) {
  // 1. Saudações simples
  const saudacoes = [
    'oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem'
  ];
  const perguntaNorm = normalizar(pergunta);
  if (saudacoes.includes(perguntaNorm)) {
    return {
      mensagem: 'Olá 😊<br>Sou a Lia e posso te ajudar com dúvidas sobre os procedimentos da CR Laser®. <br>Digite sua dúvida.',
      link: ''
    };
  }

  // 7. Perguntas de preço, valor, promoção, desconto, comprar, pagamento, Pix ou cartão
  const proibidas = [
    'preço', 'preco', 'valor', 'quanto', 'promo', 'promoção', 'oferta', 'comprar', 'compra', 'pagar', 'pagamento', 'pix', 'link', 'desconto', 'cartao', 'cartão'
  ];
  if (proibidas.some(p => perguntaNorm.includes(p))) {
    return {
      mensagem: 'Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade.',
      link: ''
    };
  }

  // 3. Palavras genéricas a ignorar
  const stopwords = new Set([
    'o','a','os','as','de','do','da','dos','das','em','para','com','que','qual','quais','como','por','é','e','ou','um','uma','sobre','procedimento','tratamento','cr','laser','no','na','nos','nas','ao','aos','à','às','se','sua','seu','minha','meu','pra','pro','pelo','pela','pelos','pelas'
  ]);
  // 2. Pesos
  const PESO_TITULO = 6;
  const PESO_CATEGORIA = 3;
  const PESO_MENSAGEM = 1;

  // 5 e 6. Palavras-chave para priorização
  const originalKeys = ['original', 'verdadeiro', 'autêntico', 'autentico', 'autoridade', 'segurança', 'seguranca'];
  const dorKeys = ['dói', 'doi', 'dor', 'dolorido', 'dolorida', 'doeu', 'doer', 'dores', 'aplicação', 'aplicacao'];
  const perguntaTokens = perguntaNorm.split(' ').filter(p => p && !stopwords.has(p));
  if (perguntaTokens.length === 0) return null;

  let melhor = null;
  let melhorScore = 0;
  let melhorTitulo = '';
  let empate = false;

  for (const duvida of baseDuvidas) {
    let score = 0;
    const titulo = normalizar(duvida['TÍTULO'] || '');
    const categoria = normalizar(duvida['CATEGORIA'] || '');
    const mensagem = normalizar(duvida['MENSAGEM'] || '');

    // 5. Prioridade para "original"
    if (originalKeys.some(k => perguntaNorm.includes(k))) {
      if (titulo.includes('original') || categoria.includes('original') || titulo.includes('autoridade') || categoria.includes('autoridade') || titulo.includes('seguranca') || categoria.includes('seguranca') || titulo.includes('segurança') || categoria.includes('segurança')) {
        score += 10;
      }
    }
    // 6. Prioridade para "dor"
    if (dorKeys.some(k => perguntaNorm.includes(k))) {
      if (titulo.includes('dói') || titulo.includes('doi') || titulo.includes('dor') || titulo.includes('aplicacao') || titulo.includes('aplicação')) {
        score += 8;
      }
    }

    for (const p of perguntaTokens) {
      if (titulo.includes(p)) score += PESO_TITULO;
      if (categoria.includes(p)) score += PESO_CATEGORIA;
      if (mensagem.includes(p)) score += PESO_MENSAGEM;
    }

    if (score > melhorScore) {
      melhor = duvida;
      melhorScore = score;
      melhorTitulo = duvida['TÍTULO'] || '';
      empate = false;
    } else if (score === melhorScore && score > 0) {
      empate = true;
    }
  }

  // 4 e 9. Só responder se a pontuação for realmente segura e não houver empate
  const LIMIAR_SEGURO = 10;
  if (!melhor || melhorScore < LIMIAR_SEGURO || empate) {
    console.log('Pergunta:', pergunta);
    console.log('Título escolhido: (nenhum)');
    console.log('Pontuação final:', melhorScore);
    return null;
  }
  // 10. Log para validação
  console.log('Pergunta:', pergunta);
  console.log('Título escolhido:', melhorTitulo);
  console.log('Pontuação final:', melhorScore);
  return {
    mensagem: melhor['MENSAGEM'] || '',
    link: melhor['LINK_COMPLEMENTAR'] || ''
  };
}

function mostrarMensagemInicial() {
  adicionarMensagem('Oi, eu sou a Lia 😊<br><br>Estou aqui para tirar dúvidas sobre os procedimentos da CR Laser®.<br><br>Digite sua pergunta abaixo.', 'lia');
}

async function carregarCSV() {
  try {
    const resp = await fetch(CSV_URL);
    if (!resp.ok) throw new Error('Erro ao baixar CSV');
    const csv = await resp.text();
    baseDuvidas = parseCSVSeguro(csv);
    csvCarregado = true;
    erroCarregarCSV = false;
  } catch (e) {
    csvCarregado = false;
    erroCarregarCSV = true;
  }
}

function mostrarErroCarregarCSV() {
  adicionarMensagem('Não consegui carregar minha base de respostas agora. Tente novamente em alguns instantes ou fale com sua unidade.', 'lia');
}

liaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pergunta = liaInput.value.trim();
  if (!pergunta) return;
  adicionarMensagem(pergunta, 'user');
  liaInput.value = '';
  if (!csvCarregado) {
    if (erroCarregarCSV) {
      mostrarErroCarregarCSV();
      return;
    }
    await carregarCSV();
    if (!csvCarregado) {
      mostrarErroCarregarCSV();
      return;
    }
  }
  const resposta = buscarResposta(pergunta);
  if (!resposta) {
    adicionarMensagem('Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.', 'lia');
    return;
  }
  adicionarMensagem(
    resposta.mensagem + (resposta.link ? `<br><br>Veja também:<br><a href="${resposta.link}" target="_blank" style="color:#18c7d1;word-break:break-all;">${resposta.link}</a>` : ''),
    'lia'
  );
});

// Inicialização
carregarCSV().then(mostrarMensagemInicial);
