// api/debug-lia-ia.js - Rota de debug para Lia IA (ESM)
import https from 'https';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTuZWS1FSLb_BwDRQy4_HwlzCklKoUd8oO1NOP4ITKaI100iQEuM_x3ANFjB8tgjkfJQMx3LBmbbzij/pub?output=csv';

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

async function fetchCSV() {
  return new Promise((resolve, reject) => {
    https.get(CSV_URL, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

export default async function handler(req, res) {
  try {
    const csv = await fetchCSV();
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
