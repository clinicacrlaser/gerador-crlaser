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
  const proibidas = ['preço', 'preco', 'valor', 'quanto', 'promo', 'promoção', 'oferta', 'comprar', 'compra', 'pagar', 'pagamento', 'pix', 'link', 'desconto'];
  const perguntaNorm = normalizar(pergunta);
  if (proibidas.some(p => perguntaNorm.includes(p))) {
    return {
      mensagem: 'Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade.',
      link: ''
    };
  }
  let melhor = null;
  let melhorScore = 0;
  for (const duvida of baseDuvidas) {
    let score = 0;
    const titulo = normalizar(duvida['TÍTULO'] || '');
    const categoria = normalizar(duvida['CATEGORIA'] || '');
    const mensagem = normalizar(duvida['MENSAGEM'] || '');
    // Peso: título 3, categoria 2, mensagem 1
    if (perguntaNorm && titulo) {
      const palavrasPerg = perguntaNorm.split(' ');
      for (const p of palavrasPerg) {
        if (titulo.includes(p)) score += 3;
        if (categoria.includes(p)) score += 2;
        if (mensagem.includes(p)) score += 1;
      }
    }
    if (score > melhorScore) {
      melhor = duvida;
      melhorScore = score;
    }
  }
  if (melhor && melhorScore > 0) {
    return {
      mensagem: melhor['MENSAGEM'] || '',
      link: melhor['LINK_COMPLEMENTAR'] || ''
    };
  }
  return null;
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
