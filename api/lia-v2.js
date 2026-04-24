import { unidades } from '../data/unidades-v2.js';
import { correcoes } from '../data/correcoes-v2.js';
import { endymedFaq } from '../data/endymed-v2.js';
import { faq } from '../data/faq-v2.js';
import { sugestoes } from '../data/sugestoes-v2.js';
import { bioestimuladorFaq } from '../data/bioestimulador-v2.js';
import { indicacoes } from '../data/indicacoes-v2.js';

const RESPOSTA_PRECO = 'Para ver os valores certinhos, o ideal é consultar direto no nosso sistema 😊\nÉ bem simples de usar e você vai conseguir ver tudo organizado por procedimento e faixa de oferta.\nPode acessar por aqui mesmo e testar, você vai gostar 😉';
const RESPOSTA_CIDADE = 'Temos unidades em várias cidades 😊\n\nBrasília, Campinas, Goiânia, Palmas e São Paulo.\n\nQual fica melhor pra você que já te passo o endereço certinho?';
const RESPOSTA_HORARIO = 'Funcionamos de segunda a sexta das 08:30 às 12:00 e das 14:00 às 18:30, e sábado das 08:00 às 12:00 😊';
const RESPOSTA_AGENDAMENTO_SEM_CIDADE = 'Perfeito 😊\n\nMe fala sua cidade que te envio o contato direto da unidade mais próxima.';
const RESPOSTA_FECHAMENTO_LEVE = 'Se quiser, posso te passar a melhor condição da semana 😊';
const RESPOSTA_OFERTA_SEMANA_SEM_CIDADE = 'Claro 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const LINKS_WHATSAPP_UNIDADE = {
  campinas: 'https://wa.me/5519991818366?text=Estou%20vindo%20da%20Lia%20e%20quero%20mais%20informa%C3%A7%C3%B5es',
  brasilia: 'https://wa.me/5561981316493?text=Estou%20vindo%20da%20Lia%20e%20quero%20mais%20informa%C3%A7%C3%B5es',
  goiania: 'https://wa.me/5562985499102?text=Estou%20vindo%20da%20Lia%20e%20quero%20mais%20informa%C3%A7%C3%B5es',
  palmas: 'https://wa.me/5563981226319?text=Estou%20vindo%20da%20Lia%20e%20quero%20mais%20informa%C3%A7%C3%B5es',
  saopaulo: 'https://wa.me/5511967292039?text=Estou%20vindo%20da%20Lia%20e%20quero%20mais%20informa%C3%A7%C3%B5es'
};
const LINKS_OFERTA_SEMANA = {
  campinas: 'https://wa.me/5519991818366?text=Quero%20ver%20a%20oferta%20da%20semana',
  brasilia: 'https://wa.me/5561981316493?text=Quero%20ver%20a%20oferta%20da%20semana',
  goiania: 'https://wa.me/5562985499102?text=Quero%20ver%20a%20oferta%20da%20semana',
  palmas: 'https://wa.me/5563981226319?text=Quero%20ver%20a%20oferta%20da%20semana',
  saopaulo: 'https://wa.me/5511967292039?text=Quero%20ver%20a%20oferta%20da%20semana'
};

function normalizeText(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandirAbreviacoes(texto = '') {
  // Expand common abbreviations before normalization
  return texto
    .replace(/\bvcs\b/gi, 'vocês')
    .replace(/\bvc\b/gi, 'você')
    .replace(/\bql\b/gi, 'qual')
    .replace(/\bpq\b/gi, 'porque')
    .replace(/\bp\.q\./gi, 'porque')
    // Common light typos that appear in real chats
    .replace(/\bmarda\b/gi, 'marca')
    .replace(/\bender[cç]o\b/gi, 'endereco')
    .replace(/\bgoinia\b/gi, 'goiania')
    .replace(/\bestu\b/gi, 'estou')
    .replace(/\bbotoxx\b/gi, 'botox')
    // Bioestimulador typos
    .replace(/\bscultra\b/gi, 'sculptra')
    .replace(/\bbioestulador\b/gi, 'bioestimulador')
    .replace(/\bbioestimuldor\b/gi, 'bioestimulador')
    .toLowerCase()
    .trim();
}

function identificarCidade(texto = '') {
  const textoNormalizado = normalizeText(texto);

  // Exact substring match (existing behaviour)
  for (const unidade of unidades) {
    if (unidade.nomes.some((nome) => textoNormalizado.includes(normalizeText(nome)))) {
      return unidade;
    }
  }

  // Fuzzy: compare each word of the message against each city-name word
  // Min length 4 to avoid false positives with 3-char words (e.g. "faz" ~ "sao")
  const palavrasTexto = textoNormalizado.split(' ').filter((p) => p.length >= 4);
  for (const unidade of unidades) {
    for (const nome of unidade.nomes) {
      const palavrasNome = normalizeText(nome).split(' ').filter((p) => p.length >= 4);
      for (const pn of palavrasNome) {
        if (palavrasTexto.some((pt) => palavrasParecidas(pt, pn))) {
          return unidade;
        }
      }
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
    t.includes('onde vocês') ||
    t.includes('onde voces') ||
    t.includes('ficam onde') ||
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

  // Fuzzy fallback for common typos in intent keywords
  const palavrasFuzzy = t.split(' ').filter((p) => p.length >= 4);
  if (palavrasFuzzy.some((p) => palavrasParecidas(p, 'endereco'))) return 'endereco';
  if (palavrasFuzzy.some((p) => palavrasParecidas(p, 'telefone'))) return 'telefone';

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

function detectarInteresseFechamento(texto = '') {
  const t = normalizeText(texto);
  return (
    ['quero', 'sim', 'tenho interesse', 'interesse', 'quero sim', 'pode mandar', 'manda'].includes(t) ||
    t.includes('valores') ||
    t.includes('oferta') ||
    t.includes('oferta da semana') ||
    t.includes('me passa os valores') ||
    t.includes('quanto custa') ||
    t.includes('tenho interesse')
  );
}

function detectarIntencaoAgendamento(texto = '') {
  const t = normalizeText(texto);

  if (
    t.includes('como agendar') ||
    t.includes('quero agendar') ||
    t.includes('como faco') ||
    t.includes('marcar consulta') ||
    t.includes('marcar horario') ||
    t.includes('agendar') ||
    t.includes('marcar') ||
    t.includes('agenda')
  ) return true;

  const palavrasFuzzy = t.split(' ').filter((p) => p.length >= 5);
  return palavrasFuzzy.some((p) => palavrasParecidas(p, 'agendar') || palavrasParecidas(p, 'agenda'));
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

function mencionaOutroProcedimento(texto = '') {
  const t = normalizeText(texto);
  return ['botox', 'lavieen', 'preenchedor', 'toxina', 'melasma', 'bioestimulador', 'diamond', 'sculptra', 'elleva', 'endymed', 'ifine', 'intensif', 'small', 'shapper'].some((termo) => t.includes(termo));
}

// Nomes de tratamentos que, se presentes, impedem a lógica de indicação de disparar
// (o usuário está perguntando sobre o tratamento, não descrevendo um problema)
const TRATAMENTOS_CONHECIDOS = ['botox', 'bioestimulador', 'endymed', 'ultraformer', 'lavieen', 'sculptra', 'diamond', 'shapper', 'small'];

function identificarProblema(texto = '') {
  const t = normalizeText(texto);
  if (TRATAMENTOS_CONHECIDOS.some((tr) => t.includes(tr))) return null;
  for (const item of indicacoes) {
    if (item.gatilhos.some((g) => t.includes(normalizeText(g)))) {
      return item;
    }
  }
  return null;
}

function perguntaConducaoPorProblema(problema = '') {
  const p = normalizeText(problema);

  if (p === 'flacidez_rosto' || p === 'perda_volume') {
    return '👉 Você sente mais flacidez ou perda de volume?';
  }

  if (p === 'papada' || p === 'gordura') {
    return '👉 É mais gordura ou flacidez?';
  }

  if (p === 'vago') {
    return 'O que mais te incomoda hoje?';
  }

  return '👉 Essa região te incomoda há muito tempo?';
}

function perguntaContinuidadePorProblema(problema = '') {
  const p = normalizeText(problema);

  if (p === 'papada' || p === 'gordura') {
    return '👉 Essa região te incomoda há muito tempo?';
  }

  if (p === 'flacidez_rosto' || p === 'perda_volume' || p === 'flacidez_corpo') {
    return '👉 Essa região te incomoda há muito tempo?';
  }

  if (p === 'vago') {
    return 'O que mais te incomoda hoje?';
  }

  return '👉 O que mais te incomoda hoje?';
}

function montarRespostaIndicacaoComConducao(itemIndicacao) {
  const respostaBase = itemIndicacao?.resposta || '';
  const pergunta = perguntaConducaoPorProblema(itemIndicacao?.problema || '');

  if (!pergunta) return respostaBase;
  if (respostaBase.includes(pergunta)) return respostaBase;

  return `${respostaBase}\n\n${pergunta}`;
}

function respostaWhatsappPorCidade(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const linkWhatsapp = LINKS_WHATSAPP_UNIDADE[cidadeNorm];
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!linkWhatsapp) return null;

  return `Perfeito 😊\n\nVou te direcionar direto para a unidade de ${nomeCidade} 👇\n\n<a href="${linkWhatsapp}" target="_blank" style="display:inline-block;margin-top:8px;padding:12px 18px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Falar com a equipe no WhatsApp</a>`;
}

function respostaOfertaSemanaPorCidade(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const linkOferta = LINKS_OFERTA_SEMANA[cidadeNorm];
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!linkOferta) return null;

  return `Perfeito 😊\n\nVou te direcionar para a oferta da semana da unidade de ${nomeCidade} 👇\n\n<a href="${linkOferta}" target="_blank" style="display:inline-block;margin-top:8px;padding:12px 18px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Ver oferta da semana</a>`;
}

function encontrarBlocoEndymed(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoEndymed = procedimentoAtual === 'endymed';

  const matchDireto = endymedFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto) return matchDireto;

  if (contextoEndymed) {
    return endymedFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

function encontrarBlocoBioestimulador(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoBio = procedimentoAtual === 'bioestimulador' || procedimentoAtual === 'diamond';

  const matchDireto = bioestimuladorFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto) return matchDireto;

  if (contextoBio) {
    return bioestimuladorFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let pergunta = (req.body?.pergunta || '').toString();
    pergunta = expandirAbreviacoes(pergunta);
    const msg = normalizeText(pergunta);
    const contexto = req.body?.contexto || {};
    const unidadeDetectada = identificarCidade(pergunta);
    const cidadeDetectada = unidadeDetectada ? unidadeDetectada.cidade : null;

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
    
    // Se está esperando apenas a resposta de cidade, enviar dados direto
    if (contexto.intencao === 'aguardando_apenas_cidade') {
      const cidadeNoMsg = unidadeDetectada ? unidadeDetectada.cidade : null;
      if (cidadeNoMsg && unidadeDetectada) {
        return res.status(200).json({
          resposta: `📍 ${unidadeDetectada.nomeCompleto}\n\n${unidadeDetectada.endereco}\n\n📞 ${unidadeDetectada.telefone}`,
          contexto: {}
        });
      }
    }

    if (contexto.intencao === 'aguardando_cidade_whatsapp') {
      const cidadeNoMsg = unidadeDetectada ? unidadeDetectada.cidade : null;
      if (cidadeNoMsg) {
        const tipoLink = contexto.tipoLink || 'whatsapp';
        const respostaLink = tipoLink === 'oferta_semana'
          ? respostaOfertaSemanaPorCidade(cidadeNoMsg)
          : respostaWhatsappPorCidade(cidadeNoMsg);

        if (respostaLink) {
          return res.status(200).json({
            resposta: respostaLink,
            contexto: { cidade: cidadeNoMsg, cidadeAtual: cidadeNoMsg }
          });
        }
      }

      return res.status(200).json({
        resposta: contexto.tipoLink === 'oferta_semana'
          ? RESPOSTA_OFERTA_SEMANA_SEM_CIDADE
          : 'Me fala sua cidade que te envio o contato direto da unidade mais próxima 😊',
        contexto
      });
    }

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
            resposta: `📍 ${unidadeCtx.nomeCompleto}\n\n${unidadeCtx.endereco}`,
            contexto: {}
          });
        }

        if (pedirTelefone) {
          const respostaWhatsapp = respostaWhatsappPorCidade(unidadeCtx.cidade);
          if (respostaWhatsapp) {
            return res.status(200).json({
              resposta: respostaWhatsapp,
              contexto: { cidade: unidadeCtx.cidade }
            });
          }

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

    // Continuação de contexto — cliente fez follow-up após resposta sobre procedimento/oferta
    if (contexto.intencao === 'aguardando_interesse') {
      const ambos = msg.includes('os dois') || msg.includes('ambos') || msg.includes('os 2');
      const quer = ['quero', 'sim', 'ok', 'claro', 'pode ser', 'manda', 'pode mandar'].includes(msg) || ambos;
      if (quer) {
        const sufixo = contexto.procedimentoAtual ? ` sobre ${contexto.procedimentoAtual}` : '';
        return res.status(200).json({
          resposta: `Perfeito 😊\n\nMe fala qual é a sua principal preocupação${sufixo} que já te preparo as melhores opções da semana 😉`,
          contexto: contexto
        });
      }
    }

    if (contexto.intencao === 'conduzindo_indicacao') {
      const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
      const cidadeAtual = cidadeDetectada || cidadeContexto;

      if (detectarIntencaoAgendamento(pergunta)) {
        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_AGENDAMENTO_SEM_CIDADE,
            contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'whatsapp', cidadeAtual: cidadeAtual || undefined }
          });
        }

        const respostaWhatsapp = respostaWhatsappPorCidade(cidadeAtual);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: respostaWhatsapp,
            contexto: { cidade: cidadeAtual, cidadeAtual }
          });
        }
      }

      if (detectarInteresseFechamento(pergunta)) {
        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_OFERTA_SEMANA_SEM_CIDADE,
            contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'oferta_semana', cidadeAtual: cidadeAtual || undefined }
          });
        }

        const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
        if (respostaOferta) {
          return res.status(200).json({
            resposta: respostaOferta,
            contexto: { cidade: cidadeAtual, cidadeAtual }
          });
        }
      }

      const passos = Number(contexto.passosConducao || 0) + 1;
      if (passos >= 2) {
        return res.status(200).json({
          resposta: RESPOSTA_FECHAMENTO_LEVE,
          contexto: { ...contexto, passosConducao: passos, cidade: cidadeAtual || undefined, cidadeAtual: cidadeAtual || undefined }
        });
      }

      const perguntaConducao = perguntaContinuidadePorProblema(contexto.procedimentoAtual || '');
      return res.status(200).json({
        resposta: perguntaConducao || 'O que mais te incomoda hoje?',
        contexto: { ...contexto, passosConducao: passos, cidade: cidadeAtual || undefined, cidadeAtual: cidadeAtual || undefined }
      });
    }

    console.log('VERIFICANDO SAUDACAO');
    if (ehSaudacao(pergunta)) {
      console.log('CAIU NA SAUDACAO');
      return res.status(200).json({ resposta: respostaSaudacao(pergunta) });
    }

    if (detectarInteresseFechamento(pergunta)) {
      const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
      const cidadeAtual = cidadeDetectada || cidadeContexto;

      if (!cidadeAtual) {
        return res.status(200).json({
          resposta: RESPOSTA_OFERTA_SEMANA_SEM_CIDADE,
          contexto: { intencao: 'aguardando_cidade_whatsapp', tipoLink: 'oferta_semana', cidadeAtual: cidadeAtual || undefined }
        });
      }

      const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
      if (respostaOferta) {
        return res.status(200).json({
          resposta: respostaOferta,
          contexto: { cidade: cidadeAtual, cidadeAtual }
        });
      }
    }

    if (detectarPreco(pergunta)) {
      return res.status(200).json({ resposta: RESPOSTA_PRECO });
    }

    if (detectarIntencaoAgendamento(pergunta)) {
      const cidadeContexto = contexto.cidade || null;
      const unidadeContexto = cidadeContexto ? unidades.find((u) => u.cidade === cidadeContexto) : null;
      const unidadeAgendamento = unidadeDetectada || unidadeContexto;

      if (!unidadeAgendamento) {
        return res.status(200).json({
          resposta: RESPOSTA_AGENDAMENTO_SEM_CIDADE,
          contexto: { intencao: 'aguardando_apenas_cidade' }
        });
      }

      const linkWhatsapp = LINKS_WHATSAPP_UNIDADE[unidadeAgendamento.cidade];

      if (linkWhatsapp) {
        const respostaWhatsapp = respostaWhatsappPorCidade(unidadeAgendamento.cidade);
        return res.status(200).json({
          resposta: respostaWhatsapp,
          contexto: { cidade: unidadeAgendamento.cidade }
        });
      }

      return res.status(200).json({
        resposta: `Perfeito 😊\n\nVocê pode agendar direto pelo WhatsApp da unidade:\n\n📞 ${unidadeAgendamento.telefone}\n\nSe preferir, posso te orientar sobre o melhor tratamento antes de agendar 😉`,
        contexto: { cidade: unidadeAgendamento.cidade }
      });
    }

    const itemEndymed = encontrarBlocoEndymed(pergunta, contexto);
    if (itemEndymed) {
      return res.status(200).json({
        resposta: itemEndymed.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemEndymed.procedimento || 'endymed' }
      });
    }

    const intencao = identificarIntencaoOperacional(pergunta);
    const unidade = unidadeDetectada;

    if (intencao === 'horario') {
      return res.status(200).json({ resposta: RESPOSTA_HORARIO });
    }

    if (intencao === 'endereco' || intencao === 'telefone' || intencao === 'mapa') {
      if (!unidade) {
        return res.status(200).json({ 
          resposta: RESPOSTA_CIDADE,
          contexto: { intencao: 'aguardando_apenas_cidade' }
        });
      }

      if (intencao === 'endereco') {
        return res.status(200).json({
          resposta: `📍 ${unidade.nomeCompleto}\n\n${unidade.endereco}\n\n📞 ${unidade.telefone}`
        });
      }

      if (intencao === 'telefone') {
        const respostaWhatsapp = respostaWhatsappPorCidade(unidade.cidade);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: respostaWhatsapp,
            contexto: { cidade: unidade.cidade }
          });
        }

        return res.status(200).json({
          resposta: `📞 ${unidade.telefone}`
        });
      }

      return res.status(200).json({
        resposta: `📍 Mapa:\n${unidade.mapa}`
      });
    }

    if (cidadeDetectada && unidadeDetectada) {
      const nomeCidade = unidadeDetectada.nomeCompleto.replace('CR Laser® ', '');

      return res.status(200).json({
        resposta: `Perfeito 😊\nTemos uma unidade em ${nomeCidade}.\n\nQuer que eu te envie o endereço ou o telefone?`,
        contexto: { cidade: cidadeDetectada, intencao: 'aguardando_endereco_ou_telefone' }
      });
    }

    console.log('CAIU NA BASE');
    const correcao = encontrarCorrecao(pergunta);
    if (correcao) {
      return res.status(200).json({
        resposta: correcao,
        contexto: { intencao: 'aguardando_interesse' }
      });
    }

    const itemIndicacao = identificarProblema(pergunta);
    if (itemIndicacao) {
      return res.status(200).json({
        resposta: montarRespostaIndicacaoComConducao(itemIndicacao),
        contexto: {
          intencao: 'conduzindo_indicacao',
          procedimentoAtual: itemIndicacao.problema,
          passosConducao: 0,
          cidade: cidadeDetectada || contexto.cidade
        }
      });
    }

    const itemBio = encontrarBlocoBioestimulador(pergunta, contexto);
    if (itemBio) {
      return res.status(200).json({
        resposta: itemBio.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemBio.procedimento || 'bioestimulador' }
      });
    }

    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      const rawGatilho = Array.isArray(itemFaq.gatilhos) ? itemFaq.gatilhos[0] : null;
      const procAtual = rawGatilho && rawGatilho.split(' ').length <= 2 ? rawGatilho : null;
      return res.status(200).json({
        resposta: itemFaq.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: procAtual }
      });
    }

    const itemSugestao = encontrarSugestao(pergunta);
    if (itemSugestao) {
      const rawSug = Array.isArray(itemSugestao.gatilhos) ? itemSugestao.gatilhos[0] : null;
      const procSug = rawSug && rawSug.split(' ').length <= 2 ? rawSug : null;
      return res.status(200).json({
        resposta: itemSugestao.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: procSug }
      });
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