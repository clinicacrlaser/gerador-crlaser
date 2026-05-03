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

// Função para normalizar texto (sem acento, minúsculo, sem pontuação)
function normalizarBusca(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[.,;:!?\-–—_()\[\]{}"'`´^~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buscarLinhasRelevantes(pergunta, base) {
  const perguntaNorm = normalizarBusca(pergunta);
  const tokens = perguntaNorm.split(' ').filter(Boolean);
  // Regras especiais para botox pontos aplicação
  const isBotoxPontos = perguntaNorm.includes('botox') && (perguntaNorm.includes('pontos') || perguntaNorm.includes('aplicacao') || perguntaNorm.includes('aplica') || perguntaNorm.includes('onde aplica') || perguntaNorm.includes('locais') || perguntaNorm.includes('regioes'));
  let scored = base.map(linha => {
    let score = 0;
    const tituloNorm = normalizarBusca(linha.titulo);
    const categoriaNorm = normalizarBusca(linha.categoria);
    const mensagemNorm = normalizarBusca(linha.mensagem);
    // Peso alto para palavras no título
    for (const t of tokens) {
      if (tituloNorm.includes(t)) score += 10;
      if (categoriaNorm.includes(t)) score += 4;
      if (mensagemNorm.includes(t)) score += 2;
    }
    // Regra especial botox pontos aplicação
    if (isBotoxPontos && tituloNorm.includes('botox') && (tituloNorm.includes('pontos') || tituloNorm.includes('aplicacao'))) {
      score += 30;
    }
    return { ...linha, score };
  });
  scored = scored.filter(l => l.score > 0);
  scored.sort((a, b) => b.score - a.score);
  // Seleciona top 5 a 10 linhas
  return scored.slice(0, 10);
}

async function callOpenAI(pergunta, linhasRelevantes) {
  // Monta base reduzida
  let baseTexto = linhasRelevantes.map((t, i) => {
    return `[${i+1}]\nCategoria: ${t.categoria}\nTítulo: ${t.titulo}\nMensagem: ${t.mensagem}\nLink: ${t.link}`;
  }).join("\n\n");

  // Prompt reforçado para correspondência semântica com TÍTULO
  const prompt = `Você é a Lia - Assistente Virtual da CR Laser®.\nResponda sempre de forma humana, simpática, objetiva e útil, usando exclusivamente as informações da BASE DE CONHECIMENTO.\nNão invente informações.\nNão use conhecimento externo.\n\nREGRAS DA LIA:\n- A Lia é apenas uma assistente virtual para tirar dúvidas.\n- NÃO agenda procedimentos, NÃO promete agendamento, NÃO fecha venda, NÃO envia Pix, NÃO envia link de pagamento, NÃO informa valores.\n- NÃO deve dizer frases como: "posso ajudar a agendar", "posso fazer seu agendamento", "vou agendar para você", "posso finalizar sua compra", "envio Pix", "envio link de pagamento".\n\n1. SAUDAÇÕES:\nSe o usuário disser bom dia, boa tarde, boa noite, oi, olá ou tudo bem, responda de forma curta, simpática e contextual, variando as respostas. Exemplos:\n- "Bom dia 😊 Sou a Lia - Assistente Virtual da CR Laser®. Estou à disposição para te ajudar com dúvidas sobre os procedimentos."\n- "Boa tarde 😊 Sou a Lia - Assistente Virtual da CR Laser®. Se quiser, pode me mandar sua dúvida."\n- "Boa noite 😊 Sou a Lia - Assistente Virtual da CR Laser®. Estou à disposição para te ajudar."\n\n2. AGENDAMENTO:\nSe o usuário perguntar sobre agendar, marcar horário, consulta, atendimento, falar com alguém, unidade, endereço ou telefone, responda:\n"Para agendamento ou atendimento com a unidade, é só clicar no botão WhatsApp que fica na página 😊"\nSe quiser, também pode complementar: "Se quiser, também posso te explicar melhor sobre o procedimento antes."\nNunca diga que a Lia agenda ou promete horário.\n\n3. PREÇO / VALOR:\nSe o usuário perguntar sobre valor, preço, quanto custa, oferta, desconto, promoção, pagamento, pix, cartão ou comprar, responda:\n"Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou clique no botão WhatsApp da página."\n\n4. RESPOSTAS TÉCNICAS:\nSe houver base suficiente na planilha, responda normalmente, de forma humana, simpática, objetiva e útil. Não caia no fallback cedo demais.\nExemplo:\nPergunta: "quais os pontos do botox?"\nResposta: "Na CR Laser®, o Botox facial é feito no terço superior da face. De modo geral, os pontos mais comuns envolvem testa, glabela e região dos olhos, sempre de acordo com a avaliação profissional. Se quiser, posso te explicar melhor 😊"\nPergunta: "tem botox?"\nResposta: "Sim, temos Botox na CR Laser®. O Botox facial é feito no terço superior e a proposta é manter um resultado natural. Se quiser, posso te explicar melhor como funciona 😊"\n\n5. FALLBACK:\nSó use fallback quando realmente não houver conteúdo útil na base.\nMensagem de fallback:\n"Ainda não encontrei uma resposta segura para isso na minha base 😊 Se quiser, posso te orientar pelo botão WhatsApp da página."\n\n6. TOM:\nSeja sempre humana, simpática, objetiva, sem enrolar e sem empurrar para WhatsApp sem necessidade.\n\n7. NOME:\nNas apresentações, use sempre: "Lia - Assistente Virtual"\n\nIMPORTANTE:\n- Se a pergunta do usuário for parecida com algum TÍTULO da base, use essa linha para responder, mesmo que as palavras não sejam exatamente iguais.\n- Dê prioridade alta para correspondência semântica com o TÍTULO da base.\n- Exemplo: Se a pergunta mencionar 'botox' e 'pontos' ou 'aplicação', use a linha sobre pontos de aplicação do Botox.\n- Não invente fora da base.\n\nBASE DE CONHECIMENTO:\n${baseTexto}\n\nPergunta do usuário: ${pergunta}\n\nResposta:`;

  // Timeout de 20s
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let response, data;
  try {
    response = await fetch(OPENAI_API_URL, {
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
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    console.log('[LIA-IA] OpenAI status:', response.status);
    console.log('[LIA-IA] OpenAI ok:', response.ok);
    let text = await response.text();
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
    if (!response.ok) {
      console.error("[LIA-IA] Erro OpenAI completo:", data);
      throw new Error(data?.error?.message || "Erro ao consultar OpenAI");
    }
    console.log('[LIA-IA] OpenAI respondeu com sucesso');
    // Diagnóstico de extração de texto
    let resposta = data && data.output_text;
    if (!resposta && data && data.output && data.output[0] && data.output[0].content && data.output[0].content[0] && data.output[0].content[0].text) {
      resposta = data.output[0].content[0].text;
    }
    if (!resposta) {
      console.error("[LIA-IA] Resposta OpenAI sem texto:", data);
    }
    return resposta;
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      console.error('[LIA-IA] Timeout na chamada OpenAI');
      throw new Error('Timeout na chamada OpenAI');
    }
    throw err;
  }
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

      // 4. Busca de contexto antes da IA
      console.log('[LIA-IA] Pergunta:', pergunta);
      const linhasRelevantes = buscarLinhasRelevantes(pergunta, base);
      console.log('[LIA-IA] Linhas relevantes:', linhasRelevantes.length);
      console.log('[LIA-IA] Títulos enviados para IA:', linhasRelevantes.map(l => l.titulo));

      if (!linhasRelevantes.length) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resposta: 'Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.' }));
        console.log('[LIA-IA] Fallback: nenhuma linha relevante');
        return;
      }

      // 5. Chamar OpenAI com as linhas relevantes
      let respostaFinal;
      try {
        console.log('[LIA-IA] Chamando OpenAI...');
        const respostaIA = await callOpenAI(pergunta, linhasRelevantes);
        respostaFinal = respostaIA && respostaIA.trim() ? respostaIA.trim() : 'Ainda não encontrei uma resposta segura para isso na minha base 😊 Se quiser, posso te orientar pelo botão WhatsApp da página.';
        // Troca qualquer frase pronta de agendamento por WhatsApp
        respostaFinal = respostaFinal.replace(/Se quiser mais informações ou agendar, posso ajudar!?/gi, 'Para mais informações ou agendamento, fale com o WhatsApp da sua unidade.');

        // 1. Corrigir regra de preço/oferta: só mostrar resposta de valores se pergunta realmente for sobre preço/compra
        const precoRegex = /(pre[cç]o|valor|quanto\s*custa|promo[cç][aã]o|desconto|oferta|comprar|compra|pagamento|pix|cart[aã]o|boleto|link de pagamento)/i;
        if (precoRegex.test(pergunta)) {
          respostaFinal = 'Para valores, ofertas ou compra de procedimentos, use a Lia de compras ou fale com o WhatsApp da sua unidade.';
        } else {
          // 2. Corrigir links: só incluir "Veja também" se link complementar for URL real
          const linksValidos = linhasRelevantes
            .map(l => l.link)
            .filter(link => typeof link === 'string' && /^https?:\/\//i.test(link));
          if (linksValidos.length > 0 && !/Veja também/i.test(respostaFinal)) {
            respostaFinal += `<br><br>Veja também:<br><a href="${linksValidos[0]}" target="_blank" style="color:#18c7d1;word-break:break-all;">${linksValidos[0]}</a>`;
          }
        }
      } catch (err) {
        console.error('[LIA-IA] Falha ao consultar OpenAI:', err);
        respostaFinal = 'Não consegui consultar a IA agora. Verifique os logs da Vercel.';
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ resposta: respostaFinal }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Erro ao processar a dúvida', detalhe: e.message }));
    }
  });
};
