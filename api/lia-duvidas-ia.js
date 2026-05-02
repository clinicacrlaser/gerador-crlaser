// api/lia-duvidas-ia.js - API para Lia IA



const CSV_URL = 'https://docs.google.com/spreadsheets/d/17KgtQRbHpt4Pwif1Of5s3ukWXSaetfXJvcH7H6PKQlQ/export?format=csv&gid=7168740';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const MODEL = 'gpt-4.1-mini';

function parseCSVSeguro(csv) {
  // Remove BOM se existir
  if (csv.charCodeAt(0) === 0xFEFF) csv = csv.slice(1);
  const linhas = csv.split(/\r?\n/).filter(Boolean);
  if (linhas.length < 2) return [];
  // Normaliza cabeçalhos
  const normalizeHeader = h => h.replace(/\uFEFF/g, '').replace(/\s+/g, '').replace(/_/g, '').toLowerCase();
  const cabecalhoRaw = linhas[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const cabecalho = cabecalhoRaw.map(normalizeHeader);
  // Mapeamento para nomes padronizados
  const headerMap = {};
  cabecalho.forEach((h, i) => {
    if (/categoria/.test(h)) headerMap[i] = 'CATEGORIA';
    else if (/titulo|título/.test(h)) headerMap[i] = 'TITULO';
    else if (/mensagem/.test(h)) headerMap[i] = 'MENSAGEM';
    else if (/linkcomplementar|linkcomplementar|linkcomplementar/.test(h) || /link/.test(h)) headerMap[i] = 'LINK_COMPLEMENTAR';
    else headerMap[i] = h.toUpperCase();
  });
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
      obj[headerMap[j]] = (campos[j] || '').trim();
    }
    dados.push(obj);
  }
  // Logging: quantidade de linhas e nomes de colunas
  console.log('[LIA-IA] Linhas carregadas:', dados.length);
  console.log('[LIA-IA] Colunas detectadas:', Object.keys(dados[0] || {}));
  return dados;
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

function selecionarTrechosRelevantes(pergunta, base) {
  // Aliases fortes
  const aliases = {
    mpt: 'Ultraformer MPT',
    ultraformer: 'Ultraformer MPT',
    'ultraformer mpt': 'Ultraformer MPT',
    botox: 'Botox',
    lavieen: 'Lavieen',
    bioestimulador: 'Bioestimulador Diamond',
    preenchedor: 'Preenchedor',
    scizer: 'Scizer',
    endymed: 'Endymed',
    ifine: 'Endymed Ifine',
    'microagulhamento': 'Microagulhamento Robótico'
  };
  const proibidas = ['preço','preco','valor','quanto','promo','promoção','oferta','comprar','compra','pagar','pagamento','pix','link','desconto','cartao','cartão'];
  const saudacoes = ['oi','olá','ola','bom dia','boa tarde','boa noite','tudo bem'];
  const perguntaNorm = normalizar(pergunta);
  if (proibidas.some(p => perguntaNorm.includes(p))) return [];
  if (saudacoes.includes(perguntaNorm)) return [];
  const stopwords = new Set(['o','a','os','as','de','do','da','dos','das','em','para','com','que','qual','quais','como','por','é','e','ou','um','uma','sobre','procedimento','tratamento','cr','laser','no','na','nos','nas','ao','aos','à','às','se','sua','seu','minha','meu','pra','pro','pelo','pela','pelos','pelas']);
  const tokens = perguntaNorm.split(' ').filter(p => p && !stopwords.has(p));
  // Detecta alias
  let aliasMatch = null;
  for (const key in aliases) {
    if (perguntaNorm.includes(key)) {
      aliasMatch = aliases[key];
      break;
    }
  }
  let scored = base.map(linha => {
    let score = 0;
    const titulo = normalizar(linha['TITULO']||'');
    const categoria = normalizar(linha['CATEGORIA']||'');
    const mensagem = normalizar(linha['MENSAGEM']||'');
    // Se alias, dar boost para linhas que contenham o termo expandido
    if (aliasMatch) {
      if (titulo.includes(normalizar(aliasMatch))) score += 20;
      if (categoria.includes(normalizar(aliasMatch))) score += 12;
      if (mensagem.includes(normalizar(aliasMatch))) score += 6;
    }
    for (const t of tokens) {
      if (titulo.includes(t)) score += 6;
      if (categoria.includes(t)) score += 3;
      if (mensagem.includes(t)) score += 1;
    }
    return { ...linha, score };
  });
  scored = scored.filter(l => l.score > 0);
  scored.sort((a,b) => b.score - a.score);
  // Logging: top 5 títulos
  console.log('[LIA-IA] Pergunta:', pergunta);
  for (let i = 0; i < Math.min(5, scored.length); i++) {
    console.log(`[LIA-IA] Top${i+1}:`, scored[i]['TITULO'], 'Pontuação:', scored[i].score);
  }
  // Se alias, retorna até 10 trechos
  if (aliasMatch) return scored.slice(0, 10);
  return scored.slice(0, 4);
}


async function baixarCSV() {
  const response = await fetch(CSV_URL, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/csv,text/plain,*/*"
    }
  });
  const texto = await response.text();
  if (!response.ok) {
    throw new Error("Erro ao baixar CSV: " + response.status);
  }
  if (texto.trim().startsWith("<") || texto.toLowerCase().includes("<html")) {
    throw new Error("A planilha retornou HTML, não CSV. Verifique publicação da planilha.");
  }
  return texto;
}

async function callOpenAI(pergunta, trechos) {
  let contexto = '';
  trechos.forEach((t, i) => {
    contexto += `Trecho ${i+1}:\nCategoria: ${t['CATEGORIA']}\nTítulo: ${t['TITULO'] || t['TÍTULO'] || ''}\nMensagem: ${t['MENSAGEM']}\n`;
  });
  let prompt = `Você é a Lia IA, assistente da CR Laser®. Responda de forma curta, natural e segura, usando SOMENTE as informações dos trechos abaixo.\nSe não houver informação suficiente, diga: Ainda estou em treinamento para responder essa dúvida com segurança 😊 Por favor, fale com o WhatsApp da sua unidade de atendimento.\n\nPergunta: ${pergunta}\n\n${contexto}\nResposta:`;
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 500
    })
  });
  const data = await response.json();
  if (!response.ok) {
    console.error("[LIA-IA] OpenAI erro:", data);
    throw new Error(data?.error?.message || "Erro ao consultar OpenAI");
  }
  return data.output_text;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ erro: 'Método não permitido' }));
    return;
  }
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { pergunta } = JSON.parse(body);
      // 7. Perguntas proibidas
      const proibidas = ['preço','preco','valor','quanto','promo','promoção','oferta','comprar','compra','pagar','pagamento','pix','link','desconto','cartao','cartão'];
      if (proibidas.some(p => normalizar(pergunta).includes(p))) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade.' }));
        return;
      }
      // 1. Saudações
      const saudacoes = ['oi','olá','ola','bom dia','boa tarde','boa noite','tudo bem'];
      if (saudacoes.includes(normalizar(pergunta))) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Olá 😊<br>Sou a Lia IA e posso te ajudar com dúvidas sobre os procedimentos da CR Laser®. <br>Digite sua dúvida.' }));
        return;
      }
      // 4. Baixar CSV
      const csv = await baixarCSV();
      const base = parseCSVSeguro(csv);
      // 5. Selecionar trechos relevantes
      const trechos = selecionarTrechosRelevantes(pergunta, base);
      if (!trechos.length) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.' }));
        return;
      }
      // 6. Chamar OpenAI
      let respostaFinal;
      try {
        const respostaIA = await callOpenAI(pergunta, trechos);
        respostaFinal = respostaIA && respostaIA.trim() ? respostaIA.trim() : 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.';
      } catch (err) {
        console.error('[LIA-IA] Falha ao consultar OpenAI:', err);
        respostaFinal = 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.';
      }
      // 8. Se houver LINK_COMPLEMENTAR, incluir
      const link = trechos[0]['LINK_COMPLEMENTAR'];
      if (link) {
        respostaFinal += `<br><br>Veja também:<br><a href="${link}" target="_blank" style="color:#18c7d1;word-break:break-all;">${link}</a>`;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ resposta: respostaFinal }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Erro ao processar a dúvida', detalhe: e.message }));
    }
  });
};
