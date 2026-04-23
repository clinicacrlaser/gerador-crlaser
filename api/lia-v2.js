import { unidades } from '../data/unidades-v2.js';
import { correcoes } from '../data/correcoes-v2.js';
import { faq } from '../data/faq-v2.js';
import { sugestoes } from '../data/sugestoes-v2.js';

const RESPOSTA_PRECO = 'Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊\nÉ bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.\nPode acessar por aqui mesmo e testar, você vai gostar 😉';
const RESPOSTA_CIDADE = 'Claro 😊\nMe fala qual cidade você está que te envio o endereço da unidade mais próxima.';
const RESPOSTA_HORARIO = 'Funcionamos de segunda a sexta das 08:30 às 12:00 e das 14:00 às 18:30, e sábado das 08:00 às 12:00 😊';

function normalizeText(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function identificarCidade(texto = '') {
  const textoNormalizado = normalizeText(texto);

  for (const unidade of unidades) {
    if (unidade.nomes.some((nome) => textoNormalizado.includes(normalizeText(nome)))) {
      return unidade;
    }
  }

  return null;
}

function identificarIntencaoOperacional(texto) {
  const t = normalizeText(texto);

  if (
    t.includes('endereco') ||
    t.includes('endereco da clinica') ||
    t.includes('endereco de') ||
    t.includes('onde fica') ||
    t.includes('onde e') ||
    t.includes('localizacao') ||
    t.includes('localizacao da clinica') ||
    t.includes('unidade') ||
    t.includes('tem em') ||
    t.includes('tem na') ||
    t.includes('funciona em') ||
    t.includes('fica em')
  ) return 'endereco';

  if (
    t.includes('telefone') ||
    t.includes('numero') ||
    t.includes('contato') ||
    t.includes('whatsapp')
  ) return 'telefone';

  if (
    t.includes('mapa') ||
    t.includes('como chegar') ||
    t.includes('local no mapa')
  ) return 'mapa';

  if (
    t.includes('horario') ||
    t.includes('funcionamento') ||
    t.includes('abre') ||
    t.includes('fecha')
  ) return 'horario';

  return null;
}

function ehSaudacao(texto = '') {
  const t = normalizeText(texto);
  return [
    'oi',
    'ola',
    'olá',
    'bom dia',
    'boa tarde',
    'boa noite',
    'tudo bem',
    'oii',
    'opa'
  ].some((s) => t === normalizeText(s));
}

function respostaSaudacao(texto = '') {
  const t = normalizeText(texto);

  if (t === normalizeText('bom dia')) {
    return 'Bom dia 😊\nComo posso te ajudar hoje?';
  }

  if (t === normalizeText('boa tarde')) {
    return 'Boa tarde 😊\nComo posso te ajudar hoje?';
  }

  if (t === normalizeText('boa noite')) {
    return 'Boa noite 😊\nComo posso te ajudar hoje?';
  }

  if (t === normalizeText('tudo bem')) {
    return 'Tudo bem 😊\nComo posso te ajudar hoje?';
  }

  return 'Oi 😊\nMe conta o que está te incomodando que eu te ajudo.';
}

function detectarConfirmacao(texto = '') {
  const t = normalizeText(texto);
  return ['sim', 'ok', 'confirme', 'confirmado', 'certo', 'ta', 'entendi', 'beleza', 'perfeito', 'claro', 'pode ser'].includes(t);
}

function detectarIntencaoPositiva(texto = '') {
  const t = normalizeText(texto);
  return [
    'sim',
    'quero',
    'pode mandar',
    'manda',
    'claro',
    'ok'
  ].includes(t);
}

function detectarPreco(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('preco') ||
    t.includes('valor') ||
    t.includes('quanto custa') ||
    t.includes('quanto e') ||
    t.includes('quanto sai')
  );
}

function tokenize(texto = '') {
  const stopwords = new Set(['a', 'o', 'as', 'os', 'de', 'do', 'da', 'dos', 'das', 'e', 'em', 'no', 'na', 'nos', 'nas', 'com', 'por', 'para', 'que', 'qual', 'quais']);
  return normalizeText(texto)
    .split(' ')
    .filter((p) => p.length >= 3 && !stopwords.has(p));
}

function levenshteinDistance(a = '', b = '') {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + custo
      );
    }
  }

  return matrix[a.length][b.length];
}

function palavrasParecidas(a = '', b = '') {
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.length >= 4 && b.length >= 4 && a.slice(0, 3) === b.slice(0, 3)) return true;

  const maxLen = Math.max(a.length, b.length);
  const dist = levenshteinDistance(a, b);
  const tolerancia = maxLen <= 5 ? 2 : 2;

  return dist <= tolerancia;
}

function scorePerguntaVsGatilho(pergunta, gatilho) {
  const perguntaPalavras = tokenize(pergunta);
  const gatilhoPalavras = tokenize(gatilho);
  if (!perguntaPalavras.length || !gatilhoPalavras.length) return 0;

  const keywordsCentrais = new Set(['botox', 'marca', 'toxina', 'durabilidade', 'pontos', 'preenchimento', 'melasma', 'lavieen', 'ultraformer', 'axilar']);

  let exatas = 0;
  let aproximadas = 0;
  let centrais = 0;

  for (const gp of gatilhoPalavras) {
    if (perguntaPalavras.includes(gp)) {
      exatas += 1;
      if (keywordsCentrais.has(gp)) centrais += 1;
      continue;
    }

    const temParecida = perguntaPalavras.some((pp) => palavrasParecidas(pp, gp));
    if (temParecida) {
      aproximadas += 1;
      if (keywordsCentrais.has(gp)) centrais += 1;
    }
  }

  const total = gatilhoPalavras.length;
  const scoreExato = exatas / total;
  const scoreAprox = aproximadas / total;
  const scoreCoberturaPergunta = (exatas + aproximadas) / Math.max(perguntaPalavras.length, 1);
  const temCentral = centrais >= 1 ? 1 : 0;
  const temCentralForte = centrais >= 2 ? 1 : 0;

  return (scoreExato * 0.45) + (scoreAprox * 0.2) + (scoreCoberturaPergunta * 0.2) + (temCentral * 0.1) + (temCentralForte * 0.05);
}

function encontrarCorrecao(texto = '') {
  const textoNormalizado = normalizeText(texto);

  for (const item of correcoes) {
    if (!item || !item.resposta) {
      continue;
    }

    if (item.pergunta && textoNormalizado.includes(normalizeText(item.pergunta))) {
      return item.resposta;
    }

    if (Array.isArray(item.gatilhos) && item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))) {
      return item.resposta;
    }
  }

  return null;
}

function encontrarFaq(texto = '') {
  const textoNormalizado = normalizeText(texto);
  const palavrasPergunta = tokenize(textoNormalizado);
  const perguntaCurta = palavrasPergunta.length <= 1;

  // Etapa 1: correspondencia exata por includes (prioriza gatilhos especificos).
  const matchExato = faq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((g) => {
      const gNorm = normalizeText(g);
      const palavrasGatilho = tokenize(gNorm);
      const gatilhoCurto = palavrasGatilho.length <= 1;
      if (!perguntaCurta && gatilhoCurto) return false;
      return textoNormalizado.includes(gNorm);
    })
  );
  if (matchExato) return matchExato;

  // Para perguntas muito curtas, aceita gatilho curto exato (ex.: "botox").
  if (perguntaCurta) {
    const matchCurto = faq.find((item) =>
      Array.isArray(item.gatilhos) &&
      item.gatilhos.some((g) => {
        const gNorm = normalizeText(g);
        return gNorm && textoNormalizado.includes(gNorm);
      })
    );
    if (matchCurto) return matchCurto;
  }

  // Etapa 2: correspondencia por palavras-chave.
  let matchPalavraChave = null;
  let melhorScorePalavra = 0;
  for (const item of faq) {
    if (!Array.isArray(item.gatilhos)) continue;
    for (const g of item.gatilhos) {
      const palavrasGatilho = tokenize(g);
      if (!palavrasGatilho.length) continue;
      if (!perguntaCurta && palavrasGatilho.length <= 1) continue;
      const intersecao = palavrasGatilho.filter((pg) => palavrasPergunta.includes(pg)).length;
      const score = intersecao / palavrasGatilho.length;
      const passouMinimo = intersecao >= Math.min(2, palavrasGatilho.length);
      if (passouMinimo && score > melhorScorePalavra) {
        melhorScorePalavra = score;
        matchPalavraChave = item;
      }
    }
  }
  if (matchPalavraChave) return matchPalavraChave;

  // Etapa 3: correspondencia aproximada com score minimo.
  let melhorItem = null;
  let melhorScore = 0;

  for (const item of faq) {
    if (!Array.isArray(item.gatilhos)) continue;
    for (const gatilho of item.gatilhos) {
      if (!perguntaCurta && tokenize(gatilho).length <= 1) continue;
      const score = scorePerguntaVsGatilho(textoNormalizado, gatilho);
      if (score > melhorScore) {
        melhorScore = score;
        melhorItem = item;
      }
    }
  }

  return melhorScore >= 0.62 ? melhorItem : null;
}

function encontrarSugestao(texto = '') {
  const textoNormalizado = normalizeText(texto);
  return sugestoes.find((item) => Array.isArray(item.gatilhos) && item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))) || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pergunta = (req.body?.pergunta || '').toString();
    const msg = normalizeText(pergunta);
    const contexto = req.body?.contexto || {};
    let cidadeDetectada = null;

    if (msg.includes('goiania') || msg.includes('goiânia')) {
      cidadeDetectada = 'goiania';
    }

    if (msg.includes('brasilia') || msg.includes('brasília')) {
      cidadeDetectada = 'brasilia';
    }

    if (msg.includes('campinas')) {
      cidadeDetectada = 'campinas';
    }

    if (msg.includes('palmas')) {
      cidadeDetectada = 'palmas';
    }

    if (msg.includes('sao paulo') || msg.includes('são paulo')) {
      cidadeDetectada = 'saopaulo';
    }

    console.log('PERGUNTA RECEBIDA:', pergunta);
    console.log('TEXTO NORMALIZADO:', msg);

    if (!msg) {
      console.log('CAIU NO FALLBACK');
      return res.status(200).json({
        resposta: 'Desculpe, ainda estou aprendendo 😊\nMas posso te ajudar com nossos tratamentos. O que você gostaria de melhorar?'
      });
    }

    if (msg.startsWith('midia0505')) {
      return res.status(200).json({ resposta: 'Correção registrada.' });
    }

    // Continuação de contexto — deve vir antes de todas as outras regras
    if (contexto.intencao === 'aguardando_endereco_ou_telefone' && contexto.cidade) {
      const unidadeCtx = unidades.find((u) => u.cidade === contexto.cidade);
      if (unidadeCtx) {
        const ambos = msg.includes('os dois') || msg.includes('ambos') || msg.includes('os 2');
        const pedirEndereco = msg.includes('endereco') || msg === 'endereco';
        const pedirTelefone = msg.includes('telefone') || msg.includes('numero') || msg.includes('contato');
        const pedirAmbiguidade = ['quero', 'sim', 'ok', 'claro', 'pode ser'].includes(msg);

        if (ambos) {
          return res.status(200).json({
            resposta: `📍 ${unidadeCtx.nomeCompleto}\n\n${unidadeCtx.endereco}\n\n📞 ${unidadeCtx.telefone}`,
            contexto: {}
          });
        }

        if (pedirEndereco) {
          return res.status(200).json({
            resposta: `📍 ${unidadeCtx.nomeCompleto}\n\n${unidadeCtx.endereco}\n\n📞 ${unidadeCtx.telefone}`,
            contexto: {}
          });
        }

        if (pedirTelefone) {
          return res.status(200).json({
            resposta: `📞 ${unidadeCtx.telefone}`,
            contexto: {}
          });
        }

        if (pedirAmbiguidade) {
          return res.status(200).json({
            resposta: 'Você quer o endereço ou o telefone? 😊',
            contexto: contexto
          });
        }
      }
    }

    console.log('VERIFICANDO SAUDACAO');
    if (ehSaudacao(pergunta)) {
      console.log('CAIU NA SAUDACAO');
      return res.status(200).json({ resposta: respostaSaudacao(pergunta) });
    }

    if (detectarPreco(pergunta)) {
      return res.status(200).json({ resposta: RESPOSTA_PRECO });
    }

    const intencao = identificarIntencaoOperacional(pergunta);
    const unidade = identificarCidade(pergunta);

    if (intencao === 'horario') {
      return res.status(200).json({ resposta: RESPOSTA_HORARIO });
    }

    if (intencao === 'endereco' || intencao === 'telefone' || intencao === 'mapa') {
      if (!unidade) {
        return res.status(200).json({ resposta: RESPOSTA_CIDADE });
      }

      if (intencao === 'endereco') {
        return res.status(200).json({
          resposta: `📍 ${unidade.nomeCompleto}\n\n${unidade.endereco}\n\n📞 ${unidade.telefone}`
        });
      }

      if (intencao === 'telefone') {
        return res.status(200).json({
          resposta: `📞 ${unidade.telefone}`
        });
      }

      return res.status(200).json({
        resposta: `📍 Mapa:\n${unidade.mapa}`
      });
    }

    if (cidadeDetectada) {
      const nomesCidade = {
        goiania: 'Goiânia',
        brasilia: 'Brasília',
        campinas: 'Campinas',
        palmas: 'Palmas',
        saopaulo: 'São Paulo'
      };

      return res.status(200).json({
        resposta: `Perfeito 😊\nTemos uma unidade em ${nomesCidade[cidadeDetectada]}.\n\nQuer que eu te envie o endereço ou o telefone?`,
        contexto: { cidade: cidadeDetectada, intencao: 'aguardando_endereco_ou_telefone' }
      });
    }

    console.log('CAIU NA BASE');
    const correcao = encontrarCorrecao(pergunta);
    if (correcao) {
      return res.status(200).json({ resposta: correcao });
    }

    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      return res.status(200).json({ resposta: itemFaq.resposta });
    }

    const itemSugestao = encontrarSugestao(pergunta);
    if (itemSugestao) {
      return res.status(200).json({ resposta: itemSugestao.resposta });
    }

    if (detectarIntencaoPositiva(pergunta)) {
      return res.status(200).json({
        resposta: 'Perfeito 😊\n\nMe fala qual procedimento você tem interesse que eu te envio os valores da oferta da semana 😉'
      });
    }

    if (detectarConfirmacao(pergunta)) {
      return res.status(200).json({
        resposta: 'Perfeito 😊\nVocê quer saber sobre algum tratamento específico ou está buscando melhorar algo no rosto ou corpo?'
      });
    }

    console.log('CAIU NO FALLBACK');
    return res.status(200).json({
      resposta: 'Desculpe, ainda estou aprendendo 😊\nMas posso te ajudar com nossos tratamentos. O que você gostaria de melhorar?'
    });
  } catch {
    console.log('CAIU NO FALLBACK');
    return res.status(200).json({
      resposta: 'Desculpe, ainda estou aprendendo 😊\nMas posso te ajudar com nossos tratamentos. O que você gostaria de melhorar?'
    });
  }
}