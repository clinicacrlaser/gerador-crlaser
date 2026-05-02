// api/debug-lia-ia.js - Rota de debug para Lia IA (ESM)


const CSV_URL = 'https://docs.google.com/spreadsheets/d/17KgtQRbHpt4Pwif1Of5s3ukWXSaetfXJvcH7H6PKQlQ/export?format=csv&gid=7168740';

function parseCSVSeguro(csv) {
  if (csv.charCodeAt(0) === 0xFEFF) csv = csv.slice(1);
  const linhas = csv.split(/\r?\n/).filter(Boolean);
  if (linhas.length < 2) return { colunas: [], dados: [] };
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
  return { colunas: Object.values(headerMap), dados };
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

export default async function handler(req, res) {
  try {
    const csv = await baixarCSV();
    const { colunas, dados } = parseCSVSeguro(csv);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      quantidade: dados.length,
      colunas,
      linhas: dados.slice(0, 5).map(l => ({
        CATEGORIA: l.CATEGORIA || '',
        TITULO: l.TITULO || '',
        MENSAGEM: l.MENSAGEM || '',
        LINK_COMPLEMENTAR: l.LINK_COMPLEMENTAR || ''
      }))
    }));
  } catch (e) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, erro: e.message }));
  }
}
