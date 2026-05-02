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
    if (/categoria/.test(h)) headerMap[i] = 'categoria';
    else if (/titulo|título/.test(h)) headerMap[i] = 'titulo';
    else if (/mensagem/.test(h)) headerMap[i] = 'mensagem';
    else if (/linkcomplementar|link\s*complementar/.test(h) || h === 'link') headerMap[i] = 'link';
    else headerMap[i] = h;
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
    const obj = { categoria: '', titulo: '', mensagem: '', link: '' };
    for (let j = 0; j < cabecalho.length; j++) {
      const key = headerMap[j];
      if (key === 'categoria') obj.categoria = (campos[j] || '').trim();
      else if (key === 'titulo') obj.titulo = (campos[j] || '').trim();
      else if (key === 'mensagem') obj.mensagem = (campos[j] || '').trim();
      else if (key === 'link') obj.link = (campos[j] || '').trim();
    }
    dados.push(obj);
  }
  // Logging: quantidade de linhas e primeiros 3 títulos normalizados
  console.log('[LIA-IA] Linhas normalizadas:', dados.length);
  console.log('[LIA-IA] Primeiros 3 títulos:', dados.slice(0,3).map(l => l.titulo));
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

// Função removida: agora a IA interpreta toda a base


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

async function callOpenAI(pergunta, base) {
  // Monta base completa
  let baseTexto = base.map((t, i) => {
    return `[${i+1}]\nCategoria: ${t.categoria}\nTítulo: ${t.titulo}\nMensagem: ${t.mensagem}\nLink: ${t.link}`;
  }).join("\n\n");

  const prompt = `Você é a Lia IA, assistente da CR Laser®.\nResponda de forma natural, simpática e objetiva.\nUse exclusivamente as informações da BASE DE CONHECIMENTO.\nNão invente informações.\nNão use conhecimento externo.\nSe a resposta puder ser inferida claramente a partir da base, responda.\nSe a base não tiver informação suficiente, diga:\n"Ainda estou em treinamento para responder essa dúvida com segurança 😊\nPor favor, fale com o WhatsApp da sua unidade de atendimento."\n\nSe a pergunta for sobre preço, valor, promoção, desconto, compra, pagamento, Pix ou cartão, responda sempre:\n"Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade."\n\nSe a base tiver LINK_COMPLEMENTAR relevante para a resposta, incluir no final:\n"Veja também:\n[link]"\n\nBASE DE CONHECIMENTO:\n${baseTexto}\n\nPergunta do usuário: ${pergunta}\n\nResposta:`;

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
      // Logs
      console.log('[LIA-IA] Pergunta recebida:', pergunta);
      // 1. Perguntas proibidas (preço, valor, compra, etc)
      const proibidas = ['preço','preco','valor','quanto','promo','promoção','oferta','comprar','compra','pagar','pagamento','pix','link','desconto','cartao','cartão'];
      if (proibidas.some(p => normalizar(pergunta).includes(p))) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade.' }));
        console.log('[LIA-IA] Respondeu: preço/compra');
        return;
      }
      // 2. Saudações
      const saudacoes = ['oi','olá','ola','bom dia','boa tarde','boa noite','tudo bem'];
      if (saudacoes.includes(normalizar(pergunta))) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Olá 😊<br>Sou a Lia IA e posso te ajudar com dúvidas sobre os procedimentos da CR Laser®. <br>Digite sua dúvida.' }));
        console.log('[LIA-IA] Respondeu: saudação');
        return;
      }
      // 3. Baixar e normalizar base
      const csv = await baixarCSV();
      const base = parseCSVSeguro(csv);
      if (!base.length) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.' }));
        console.log('[LIA-IA] Fallback: base vazia');
        return;
      }
      // 4. Chamar OpenAI com a base completa
      let respostaFinal;
      try {
        console.log('[LIA-IA] Chamando OpenAI...');
        const respostaIA = await callOpenAI(pergunta, base);
        respostaFinal = respostaIA && respostaIA.trim() ? respostaIA.trim() : 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.';
      } catch (err) {
        console.error('[LIA-IA] Falha ao consultar OpenAI:', err);
        respostaFinal = 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.';
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ resposta: respostaFinal }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Erro ao processar a dúvida', detalhe: e.message }));
    }
  });
};
