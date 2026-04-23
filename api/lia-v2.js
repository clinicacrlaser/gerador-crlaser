import { unidades } from '../data/unidades-v2.js';
import { correcoes } from '../data/correcoes-v2.js';
import { faq } from '../data/faq-v2.js';
import { sugestoes } from '../data/sugestoes-v2.js';

const RESPOSTA_PRECO = 'Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊\nÉ bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.\nPode acessar por aqui mesmo e testar, você vai gostar 😉';
const RESPOSTA_CIDADE = 'Me fala qual cidade você deseja 😊 Temos Brasília, Campinas, Goiânia, Palmas e São Paulo.';
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
    t.includes('localizacao da clinica')
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
  return faq.find((item) => Array.isArray(item.gatilhos) && item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))) || null;
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

    if (normalizeText(pergunta).startsWith('midia0505')) {
      return res.status(200).json({ resposta: 'Correção registrada.' });
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

      if (intencao === 'telefone') {
        return res.status(200).json({ resposta: unidade.telefone });
      }

      if (intencao === 'endereco') {
        return res.status(200).json({
          resposta: `${unidade.nomeCompleto} fica em:\n${unidade.endereco}`
        });
      }

      return res.status(200).json({ resposta: unidade.mapa });
    }

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

    return res.status(200).json({
      resposta: 'Posso confirmar essa informação com a equipe pra você 😊'
    });
  } catch {
    return res.status(200).json({
      resposta: 'Posso confirmar essa informação com a equipe pra você 😊'
    });
  }
}