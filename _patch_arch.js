const fs = require('fs');
const path = require('path');

const f = path.join(__dirname, 'api', 'lia-v2.js');
let c = fs.readFileSync(f, 'utf8');
const hasCRLF = c.includes('\r\n');
if (hasCRLF) c = c.replace(/\r\n/g, '\n');

// ── 1. Add aguardando_interesse context handler (before VERIFICANDO SAUDACAO) ──
const AFTER_CTX_BLOCK = `    if (contexto.intencao === 'aguardando_endereco_ou_telefone' && contexto.cidade) {`;
const VERIFICANDO = `    console.log('VERIFICANDO SAUDACAO');`;

// Add new context block between the two existing context blocks and VERIFICANDO
const NEW_INTERESSE_BLOCK = `
    // Se cliente fez follow-up após resposta sobre procedimento/oferta
    if (contexto.intencao === 'aguardando_interesse') {
      const t = msg;
      const ambos = t.includes('os dois') || t.includes('ambos');
      const quer = ['quero', 'sim', 'ok', 'claro', 'pode ser', 'manda', 'pode mandar', 'quero os dois'].includes(t) || ambos;

      if (quer) {
        const proc = contexto.procedimentoAtual ? ' de ' + contexto.procedimentoAtual : '';
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nMe fala qual é a sua principal preocupação' + proc + ' que já te preparo as melhores opções da semana 😉',
          contexto: contexto
        });
      }
    }

`;

if (!c.includes('    // Se está esperando apenas a resposta de cidade')) {
  console.error('context block anchor not found');
  process.exit(1);
}

// Insert new block right before the VERIFICANDO SAUDACAO log
c = c.replace(VERIFICANDO, NEW_INTERESSE_BLOCK + VERIFICANDO);
console.log('1. Added aguardando_interesse context handler');

// ── 2. Return contexto when correcao matches ────────────────────────────────
const OLD_CORRECAO = `    const correcao = encontrarCorrecao(pergunta);
    if (correcao) {
      return res.status(200).json({ resposta: correcao });
    }`;

const NEW_CORRECAO = `    const correcao = encontrarCorrecao(pergunta);
    if (correcao) {
      return res.status(200).json({
        resposta: correcao,
        contexto: { intencao: 'aguardando_interesse' }
      });
    }`;

if (!c.includes(OLD_CORRECAO)) { console.error('OLD_CORRECAO not found'); process.exit(1); }
c = c.replace(OLD_CORRECAO, NEW_CORRECAO);
console.log('2. correcao now returns aguardando_interesse context');

// ── 3. Return contexto when faq matches (with procedimentoAtual from first gatilho) ──
const OLD_FAQ = `    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      return res.status(200).json({ resposta: itemFaq.resposta });
    }`;

const NEW_FAQ = `    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      const procAtual = Array.isArray(itemFaq.gatilhos) ? normalizeText(itemFaq.gatilhos[0]) : null;
      return res.status(200).json({
        resposta: itemFaq.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: procAtual }
      });
    }`;

if (!c.includes(OLD_FAQ)) { console.error('OLD_FAQ not found'); process.exit(1); }
c = c.replace(OLD_FAQ, NEW_FAQ);
console.log('3. FAQ now returns aguardando_interesse + procedimentoAtual context');

// ── 4. Return contexto when sugestao matches ────────────────────────────────
const OLD_SUG = `    const itemSugestao = encontrarSugestao(pergunta);
    if (itemSugestao) {
      return res.status(200).json({ resposta: itemSugestao.resposta });
    }`;

const NEW_SUG = `    const itemSugestao = encontrarSugestao(pergunta);
    if (itemSugestao) {
      const procSug = Array.isArray(itemSugestao.gatilhos) ? normalizeText(itemSugestao.gatilhos[0]) : null;
      return res.status(200).json({
        resposta: itemSugestao.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: procSug }
      });
    }`;

if (!c.includes(OLD_SUG)) { console.error('OLD_SUG not found'); process.exit(1); }
c = c.replace(OLD_SUG, NEW_SUG);
console.log('4. sugestao now returns aguardando_interesse + procedimentoAtual context');

if (hasCRLF) c = c.replace(/\n/g, '\r\n');
fs.writeFileSync(f, c, 'utf8');
console.log('\nALL PATCHES APPLIED');
