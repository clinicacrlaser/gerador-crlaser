import { unidades } from '../data/unidades-v2.js';
import { correcoes } from '../data/correcoes-v2.js';
import { endymedFaq } from '../data/endymed-v2.js';
import { faq } from '../data/faq-v2.js';
import { sugestoes } from '../data/sugestoes-v2.js';
import { bioestimuladorFaq } from '../data/bioestimulador-v2.js';
import { indicacoes } from '../data/indicacoes-v2.js';
import { lavieenFaq } from '../data/lavieen-v2.js';
import { ultraformerFaq } from '../data/ultraformer-v2.js';
import { preenchedorFaq } from '../data/preenchedor-v2.js';
import { scizerFaq } from '../data/scizer-v2.js';
import { confiancaFaq } from '../data/confianca-v2.js';

// ════ BLOQUEIO OBRIGATÓRIO DE PREÇOS ════
// A Lia NUNCA informa valores. Sempre direciona para o sistema.
const RESPOSTA_PRECO = 'Os valores variam conforme a campanha do dia 😊\n\n👉 O ideal é você gerar direto no sistema para ver a condição atual';
const RESPOSTA_CIDADE = 'Temos unidades em várias cidades 😊\n\nBrasília, Campinas, Goiânia, Palmas e São Paulo.\n\nQual fica melhor pra você que já te passo o endereço certinho?';
const RESPOSTA_HORARIO = 'Funcionamos de segunda a sexta das 08:30 às 12:00 e das 14:00 às 18:30, e sábado das 08:00 às 12:00 😊';
const RESPOSTA_AGENDAMENTO_SEM_CIDADE = 'Perfeito 😊\n\nMe fala sua cidade que te envio o contato direto da unidade mais próxima.';
const RESPOSTA_FECHAMENTO_LEVE = 'Se quiser, posso te passar a melhor condição da semana 😊';
const RESPOSTA_OFERTA_SEMANA_SEM_CIDADE = 'Claro 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const CONTEXTO_ULTRAFORMER_PALPEBRAS = 'ultraformer_palpebras';

// ════ FLUXO DE VENDA - OFERTAS E PAGAMENTO ════
const RESPOSTA_OPCOES_COMPRA = 'Você pode comprar aqui comigo, de forma mais rápida e prática, ou falar direto com a equipe da unidade 😊\n\nApós a compra, é só enviar o comprovante para a unidade de atendimento e solicitar o agendamento.\n\n➖️➖️➖️➖️\n📍 Como fica mais fácil para você?\n\n1️⃣ Comprar aqui pelo sistema\n2️⃣ Falar com a equipe da unidade';

const RESPOSTA_QUAL_UNIDADE = 'Qual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';

const RESPOSTA_FORMA_PAGAMENTO = 'Perfeito 😊\n\nQual será a forma de pagamento?\n\n1️⃣ Pix\n2️⃣ Cartão';

// ════ CHAVES DE PIX REAIS - CR LASER® ════
const PIX_BRASILIA = 'Pix CR Laser® Brasília:\n\n🔽🔽\n\n43.713.316/0001-33';
const PIX_CAMPINAS = 'Pix CR Laser® Campinas:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n60.970.806/0001-34';
const PIX_GOIANIA = 'PIX CR Laser® Goiânia:\n\n🔽🔽\n\n39.252.455/0001-30';
const PIX_PALMAS = 'PIX CR Laser® Palmas:\n\n🔽🔽\n\n18.986.800/0001-99';
const PIX_SAO_PAULO = 'Pix CR Laser® São Paulo:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n54.153.510/0001-28';

// ════ PLACEHOLDERS PARA LINKS DE CARTÃO ════
const LINK_CARTAO_BRASILIA = 'INSERIR_LINK_CARTAO_BRASILIA';
const LINK_CARTAO_CAMPINAS = 'INSERIR_LINK_CARTAO_CAMPINAS';
const LINK_CARTAO_GOIANIA = 'INSERIR_LINK_CARTAO_GOIANIA';
const LINK_CARTAO_PALMAS = 'INSERIR_LINK_CARTAO_PALMAS';
const LINK_CARTAO_SAO_PAULO = 'INSERIR_LINK_CARTAO_SAO_PAULO';

const PIX_POR_CIDADE = {
  brasilia: PIX_BRASILIA,
  campinas: PIX_CAMPINAS,
  goiania: PIX_GOIANIA,
  palmas: PIX_PALMAS,
  saopaulo: PIX_SAO_PAULO
};

const LINK_CARTAO_POR_CIDADE = {
  brasilia: LINK_CARTAO_BRASILIA,
  campinas: LINK_CARTAO_CAMPINAS,
  goiania: LINK_CARTAO_GOIANIA,
  palmas: LINK_CARTAO_PALMAS,
  saopaulo: LINK_CARTAO_SAO_PAULO
};

// ════ RESPOSTAS PADRONIZADAS COM AUTORIDADE (MODELO OFICIAL CR LASER®) ════
// Estrutura: Responder → Autoridade (Equipamento Original, Segurança, ANVISA) → Direcionar
const RESPOSTA_ULTRAFORMER_PALPEBRAS = 'Pode valer a pena sim 😊\n\nO Ultraformer MPT Pálpebras é um tratamento não-invasivo que atua na flacidez, estimulando colágeno e melhorando o contorno.\n\nAqui na CR Laser®:\n- Utilizamos equipamentos próprios\n- Nada é alugado\n- Todas as ponteiras são originais e ANVISA aprovadas\n\n👉 Você pode gerar sua oferta agora direto no sistema';
const RESPOSTA_ULTRAFORMER_PALPEBRAS_CONTEXTO = 'Funciona bem para flacidez leve a moderada 😊\n\nO Ultraformer estimula colágeno e melhora firmeza da pele.\n\nAqui na CR Laser®:\n- Equipamentos próprios\n- Ponteiras originais\n- ANVISA aprovado\n\n👉 Clique em gerar oferta e veja as condições de hoje';
const RESPOSTA_FLACIDEZ_ROSTO_MAGRO = 'Pelo que você descreveu, o Bioestimulador faz mais sentido 😊\n\nEle estimula colágeno natural, ajudando a restaurar estrutura e volume.\n\nAqui na CR Laser®:\n- Bioestimulador original (Diamond)\n- Aplicação por especialistas certificados\n- ANVISA aprovado\n\n👉 Você pode gerar sua oferta agora direto no sistema';
const RESPOSTA_FLACIDEZ_ROSTO_CHEIO = 'Pelo que você descreveu, o Ultraformer MPT faz mais sentido 😊\n\nÉ uma ótima opção quando existe flacidez em rosto com mais volume, oferecendo lifting sem cirurgia.\n\nAqui na CR Laser®:\n- Utilizamos equipamentos próprios\n- Nada é alugado\n- Ponteiras originais e ANVISA aprovadas\n\n👉 Clique em gerar oferta e veja as condições de hoje';
const RESPOSTA_BOTOX_FACIAL_RUGAS = 'Para rugas na testa e linhas de expressão, o Botox é uma ótima solução 😊\n\nFazemos aplicação completa no terço superior com retorno, buscando resultado natural e equilibrado.\n\nAqui na CR Laser®:\n- Toxina Botulínica original importada\n- Aplicação por especialistas certificados\n- Resultado natural garantido\n\n👉 Você pode gerar sua oferta agora direto no sistema';
const RESPOSTA_INTENCAO_GENERICA = 'Consigo te ajudar sim 😊\n\nIsso costuma estar relacionado a {categoria}.\n\nSe quiser, me conta um pouco melhor que te explico direitinho.';
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

function detectarTemaUltraformerPalpebras(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoPalpebras = procedimentoAtual === CONTEXTO_ULTRAFORMER_PALPEBRAS || procedimentoAtual.includes('palpebras');
  const gatilhos = [
    'mpt palpebras',
    'mpt palpebra',
    'ultraformer palpebras',
    'ultraformer palpebra',
    'palpebra caida',
    'retirada de palpebra',
    'cirurgia de palpebra',
    'blefaroplastia',
    'bolsinha na palpebra',
    'flacidez na palpebra',
    'flacidez nas palpebras',
    'palpebras',
    'palpebra'
  ];

  if (gatilhos.some((gatilho) => t.includes(gatilho))) {
    return true;
  }

  return contextoPalpebras && ['cirurgia', 'operar', 'operacao', 'indicação cirurgica', 'indicacao cirurgica', 'bolsinha', 'flacidez'].some((gatilho) => t.includes(normalizeText(gatilho)));
}

function detectarFollowUpUltraformerPalpebras(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  if (procedimentoAtual !== CONTEXTO_ULTRAFORMER_PALPEBRAS) {
    return false;
  }

  return [
    'e bom',
    'é bom',
    'vale a pena',
    'funciona',
    'isso funciona',
    'ele funciona'
  ].some((gatilho) => t.includes(normalizeText(gatilho)));
}

function detectarPerfilFlacidezFacial(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  if (!['flacidez_rosto', 'perda_volume'].includes(procedimentoAtual)) {
    return null;
  }

  const sinaisRostoMagro = [
    'magro',
    'fino',
    'rosto murcho',
    'perdi volume',
    'emagreci',
    'chupado'
  ];
  if (sinaisRostoMagro.some((gatilho) => t.includes(normalizeText(gatilho)))) {
    return 'magro';
  }

  const sinaisRostoCheio = [
    'cheio',
    'mais cheio',
    'gordinho',
    'rosto pesado',
    'tenho volume',
    'bochecha',
    'papada'
  ];
  if (sinaisRostoCheio.some((gatilho) => t.includes(normalizeText(gatilho)))) {
    return 'cheio';
  }

  return null;
}

function detectarTemaBotoxFacial(texto = '') {
  const t = normalizeText(texto);
  const gatilhosBotoxFacial = [
    'rugas na testa',
    'linhas na testa',
    'testa',
    'testa marcada',
    'minha testa ta marcada',
    'minha testa esta marcada',
    'ruga da testa',
    'glabela',
    'ruga entre as sobrancelhas',
    'bravo',
    'pes de galinha',
    'rugas nos olhos',
    'linhas de expressao',
    'botox',
    'aplicacao facial'
  ];

  const exclusoes = [
    'axila',
    'axilar',
    'suor',
    'hiperidrose',
    'pontos',
    'onde aplica',
    'quais os pontos',
    'durabilidade',
    'dura quanto',
    'quanto tempo dura',
    'toxina',
    'bioestimulador',
    'preenchedor',
    'ultraformer',
    'idade',
    'quantos anos',
    'fica natural',
    'fica duro',
    'repetir',
    'parar botox',
    'diluicao',
    'diluicao',
    'boca'
  ];

  const exclusoesEspecificas = [
    'qual marca',
    'marca do botox',
    'que marca',
    'qual toxina'
  ];

  if (exclusoes.some((gatilho) => t.includes(normalizeText(gatilho))) || exclusoesEspecificas.some((gatilho) => t.includes(normalizeText(gatilho)))) {
    return false;
  }

  return gatilhosBotoxFacial.some((gatilho) => t.includes(normalizeText(gatilho)));
}

function detectarTemaFlacidez(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const itemIndicacao = identificarProblema(texto);

  if (['flacidez_rosto', 'flacidez_corpo', 'perda_volume'].includes(procedimentoAtual)) {
    return true;
  }

  if (itemIndicacao && ['flacidez_rosto', 'flacidez_corpo', 'perda_volume'].includes(itemIndicacao.problema)) {
    return true;
  }

  return [
    'pele ta mole',
    'pele esta mole',
    'minha pele ta mole',
    'meu rosto caiu',
    'rosto caiu',
    'tenho bochecha caida',
    'bochecha caida',
    'bochecha caiu',
    'meu rosto caiu',
    'pele frouxa',
    'rosto caido',
    'pele caida'
  ].some((gatilho) => t.includes(normalizeText(gatilho)));
}

function detectarTemaGordura(texto = '', contexto = {}) {
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const itemIndicacao = identificarProblema(texto);
  if (['gordura', 'papada'].includes(procedimentoAtual)) {
    return true;
  }

  if (itemIndicacao && ['gordura', 'papada'].includes(itemIndicacao.problema)) {
    return true;
  }

  const t = normalizeText(texto);
  return ['gordura localizada', 'papada', 'bochecha pesada', 'rosto pesado'].some((gatilho) => t.includes(normalizeText(gatilho)));
}

function detectarTemaBioPreenchimento(texto = '', contexto = {}) {
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const itemIndicacao = identificarProblema(texto);
  if (['bioestimulador', 'diamond', 'preenchedor', 'harmonizacao', 'harmonizacao facial'].includes(procedimentoAtual)) {
    return true;
  }

  if (itemIndicacao && itemIndicacao.problema === 'perda_volume') {
    return true;
  }

  const t = normalizeText(texto);
  return [
    'bioestimulador',
    'sculptra',
    'diamond',
    'preenchedor',
    'preenchimento',
    'acido hialuronico',
    'perdi volume',
    'rosto murcho',
    'rosto chupado',
    'labios',
    'bigode chines',
    'olheira'
  ].some((gatilho) => t.includes(normalizeText(gatilho)));
}

function labelCategoriaProvavel(categoria = 'fallback') {
  const labels = {
    humano: 'atendimento humano',
    localizacao: 'localização',
    botox_rugas: 'botox / rugas',
    flacidez: 'flacidez',
    gordura: 'gordura',
    bio_preenchimento: 'bioestimulador / preenchimento',
    duvidas_gerais: 'dúvidas gerais',
    oferta_preco: 'oferta / preço',
    fallback: 'tratamentos faciais'
  };

  return labels[categoria] || labels.fallback;
}

function respostaGenericaPorCategoria(categoria = 'fallback') {
  return RESPOSTA_INTENCAO_GENERICA.replace('{categoria}', labelCategoriaProvavel(categoria));
}

function classificarIntencaoMensagem(texto = '', contexto = {}) {
  const t = normalizeText(texto);

  if (!t) {
    return { categoria: 'fallback' };
  }

  // ════ PRIORIDADE MÁXIMA: Bloquear pedidos de preço ════
  // NUNCA deixar preço cair em outra categoria!
  if (detectarPreco(texto) || detectarInteresseFechamento(texto)) {
    return { categoria: 'oferta_preco' };
  }

  if (detectarIntencaoHumano(texto)) {
    return { categoria: 'humano' };
  }

  if (identificarIntencaoOperacional(texto) || (!!identificarCidade(texto) && ['onde', 'endereco', 'telefone', 'unidade', 'mapa', 'fica', 'contato'].some((termo) => t.includes(termo)))) {
    return { categoria: 'localizacao' };
  }

  if (detectarTemaBotoxFacial(texto)) {
    return { categoria: 'botox_rugas' };
  }

  if (detectarTemaFlacidez(texto, contexto)) {
    return { categoria: 'flacidez' };
  }

  if (detectarTemaGordura(texto, contexto)) {
    return { categoria: 'gordura' };
  }

  if (detectarTemaBioPreenchimento(texto, contexto)) {
    return { categoria: 'bio_preenchimento' };
  }

  if (encontrarCorrecao(texto) || encontrarFaq(texto) || encontrarSugestao(texto) || encontrarBlocoUltraformer(texto, contexto) || encontrarBlocoBioestimulador(texto, contexto) || encontrarBlocoPreenchedor(texto, contexto) || encontrarBlocoLavieen(texto, contexto) || encontrarBlocoEndymed(texto, contexto) || encontrarBlocoScizer(texto, contexto)) {
    return { categoria: 'duvidas_gerais' };
  }

  return { categoria: 'fallback' };
}

function responderIntencaoOperacional(intencao, unidade) {
  if (intencao === 'horario') {
    return { resposta: RESPOSTA_HORARIO };
  }

  if (!['endereco', 'telefone', 'mapa'].includes(intencao)) {
    return null;
  }

  if (!unidade) {
    return {
      resposta: RESPOSTA_CIDADE,
      contexto: { intencao: 'aguardando_apenas_cidade' }
    };
  }

  if (intencao === 'endereco') {
    return {
      resposta: `📍 ${unidade.nomeCompleto}\n\n${unidade.endereco}\n\n📞 ${unidade.telefone}`
    };
  }

  if (intencao === 'telefone') {
    const respostaWhatsapp = respostaWhatsappPorCidade(unidade.cidade);
    if (respostaWhatsapp) {
      return {
        resposta: respostaWhatsapp,
        contexto: { cidade: unidade.cidade }
      };
    }

    return { resposta: `📞 ${unidade.telefone}` };
  }

  return { resposta: `📍 Mapa:\n${unidade.mapa}` };
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

function detectarIntencaoHumano(texto = '') {
  const t = normalizeText(texto);
  return [
    'quero falar com alguem',
    'quero falar com alguém',
    'quero falar com atendente',
    'falar com atendente',
    'quero atendente',
    'humano',
    'quero humano',
    'falar com pessoa',
    'falar com a clinica',
    'falar com a clínica',
    'quero agendar direto',
    'me chama no whatsapp',
    'tem alguem ai',
    'tem alguém aí',
    'tem alguem',
    'tem alguém'
  ].some((g) => t.includes(normalizeText(g)));
}

// ════ DETECÇÃO DE INTENÇÃO DE COMPRA ════
function detectarIntencaoCompra(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('quero comprar') ||
    t.includes('quero fechar') ||
    t.includes('quero aproveitar') ||
    t.includes('quero pagar') ||
    t.includes('vou querer') ||
    t.includes('quero essa oferta') ||
    t === 'quero comprar' ||
    t === 'quero fechar' ||
    t === 'quero aproveitar' ||
    t === 'quero pagar' ||
    t === 'vou querer' ||
    t === 'quero essa oferta'
  );
}

// ════ DETECÇÃO DE ESCOLHA: EQUIPE OU SISTEMA ════
function detectarEscolhaEquipe(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('equipe') ||
    t.includes('unidade') ||
    t.includes('atendente') ||
    t.includes('whatsapp') ||
    t.includes('falar com alguem') ||
    t.includes('falar com alguém') ||
    t === '2' ||
    t === 'equipe' ||
    t === 'unidade' ||
    t === 'atendente'
  );
}

function detectarEscolhaSistema(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('sistema') ||
    t.includes('aqui') ||
    t.includes('comprar aqui') ||
    t.includes('pelo sistema') ||
    t === '1' ||
    t === 'sistema' ||
    t === 'aqui' ||
    t === 'comprar aqui'
  );
}

// ════ DETECÇÃO DE FORMA DE PAGAMENTO ════
function detectarFormaPagamento(texto = '') {
  const t = normalizeText(texto);
  if (t.includes('pix') || t === '1' || t === 'pix') return 'pix';
  if (t.includes('cartao') || t.includes('cartão') || t === '2' || t === 'cartao' || t === 'cartão') return 'cartao';
  return null;
}

function gerarRespostaPix(cidade = '') {
  const cidadeNorm = normalizeText(cidade).replace(/\s+/g, '');
  const pix = PIX_POR_CIDADE[cidadeNorm];

  if (!pix) {
    return 'Desculpe, não encontrei a chave Pix desta unidade. Você pode falar direto com a equipe!';
  }

  // Extrair CNPJ da string PIX (está entre os 🔽🔽 e o final)
  const cnpjMatch = pix.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/);
  const cnpj = cnpjMatch ? cnpjMatch[1] : '';

  // Extrair nome da cidade (primeira palavra após "Laser®")
  const cityNameMatch = pix.match(/Laser®\s+([^:]+)/);
  const cityName = cityNameMatch ? cityNameMatch[1].trim() : cidade;

  // Botão para copiar Pix
  const botaoCopiar = cnpj ? `<button onclick="navigator.clipboard.writeText('${cnpj}').then(() => alert('Pix copiado!')).catch(e => console.error('Erro ao copiar:', e))" style="display:inline-block;margin-top:12px;padding:10px 20px;background:#00c2ff;color:#ffffff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:14px;">📋 Copiar Pix</button>` : '';

  return `Perfeito 😊

Segue o Pix da unidade de ${cityName}:

${cnpj}

${botaoCopiar}

Após o pagamento, envie o comprovante para a unidade e solicite o agendamento.

📍 Importante: confira se os dados pertencem à CR Laser® antes de concluir o pagamento.`;
}

function gerarRespostaCartao(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const link = LINK_CARTAO_POR_CIDADE[cidadeNorm];
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!link || link.startsWith('INSERIR_')) {
    return `Link de pagamento de ${nomeCidade}:\n\n${link}\n\nApós o pagamento, solicite o agendamento 😊`;
  }

  return `Você pode pagar com cartão clicando aqui:\n\n<a href="${link}" target="_blank" style="display:inline-block;margin-top:8px;padding:12px 18px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Pagar com Cartão</a>\n\nApós o pagamento, solicite o agendamento 😊`;
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

  if (p === 'flacidez_rosto') {
    return 'Seu rosto hoje é mais magro ou mais cheio?';
  }

  if (p === 'perda_volume') {
    return '👉 Essa região te incomoda há muito tempo?';
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

  if (p === 'flacidez_rosto' || p === 'perda_volume') {
    return 'Seu rosto hoje é mais magro ou mais cheio?';
  }

  if (p === 'papada' || p === 'gordura') {
    return '👉 Essa região te incomoda há muito tempo?';
  }

  if (p === 'flacidez_corpo') {
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

function respostaHumanoPorCidade(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const linkWhatsapp = LINKS_WHATSAPP_UNIDADE[cidadeNorm];
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!linkWhatsapp) return null;

  return `Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nÉ só clicar aqui e falar com a equipe da unidade de ${nomeCidade} 👇\n\n<a href="${linkWhatsapp}" target="_blank" style="display:inline-block;margin-top:8px;padding:12px 18px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Falar com a equipe no WhatsApp</a>`;
}

function respostaCurtaComConducao(resposta = '') {
  if (!resposta) return 'Me fala sua principal dúvida que eu te ajudo?';

  // Preserve operational/address/map payloads.
  if (resposta.includes('📍') || resposta.includes('📞') || resposta.startsWith('📍 Mapa:')) {
    return resposta;
  }

  const linhasOriginais = resposta
    .split('\n')
    .map((l) => l.trim())
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));

  const linhaBotao = linhasOriginais.find((l) => l.includes('<a href='));
  let linhas = linhasOriginais.filter((l) => !l.includes('<a href='));

  // Keep content objective in up to 4-6 lines.
  linhas = linhas.slice(0, 5);
  if (linhaBotao) {
    linhas.push(linhaBotao);
  }

  let texto = linhas.join('\n').trim();
  const ultimaLinha = linhas[linhas.length - 1] || '';
  const terminaComAcaoOuPergunta =
    ultimaLinha.includes('<a href=') ||
    /\?$/.test(ultimaLinha) ||
    /^(quer|prefere|me fala|clique|pode clicar)/i.test(normalizeText(ultimaLinha)) ||
    ultimaLinha.includes('👉');

  // ════ BLOQUEIO OBRIGATÓRIO: NUNCA pedir "valores" ════
  // Se a resposta não termina com ação clara, direcionar ao sistema (NÃO pedir valores)
  if (!terminaComAcaoOuPergunta && !texto.includes('👉')) {
    texto = `${texto}\n\n👉 Você pode gerar sua oferta agora direto no sistema`;
  }

  return texto;
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
  const contextoEndymed = procedimentoAtual === 'endymed' || procedimentoAtual === 'intensif' || procedimentoAtual.includes('endymed');

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

function encontrarBlocoUltraformer(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoUltraformer = procedimentoAtual === 'ultraformer' || procedimentoAtual.includes('ultraformer');
  const contextoOutroProcedimento = ['lavieen', 'endymed', 'intensif', 'bioestimulador', 'diamond', 'botox'].includes(procedimentoAtual);
  const mencionaUltraformer = ['ultraformer', 'mpt'].some((termo) => textoNormalizado.includes(termo));
  const mencionaPreenchedor = ['preenchedor', 'preenchimento', 'acido hialuronico', 'ácido hialurônico'].some((termo) => textoNormalizado.includes(normalizeText(termo)));

  if (mencionaPreenchedor && !mencionaUltraformer && !contextoUltraformer) {
    return null;
  }

  if (contextoOutroProcedimento && !contextoUltraformer && !mencionaUltraformer) {
    return null;
  }

  const matchDireto = ultraformerFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto) return matchDireto;

  if (contextoUltraformer) {
    return ultraformerFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

function encontrarBlocoLavieen(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoLavieen = procedimentoAtual === 'lavieen';
  const mencionaProcedimentoConcorrente = [
    'botox',
    'bioestimulador',
    'diamond',
    'sculptra',
    'endymed',
    'ultraformer',
    'preenchedor'
  ].some((termo) => textoNormalizado.includes(termo));

  const matchDireto = lavieenFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto && !mencionaProcedimentoConcorrente) return matchDireto;

  if (contextoLavieen) {
    return lavieenFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

function encontrarBlocoPreenchedor(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoPreenchedor = procedimentoAtual === 'preenchedor' || procedimentoAtual.includes('preenchedor') || procedimentoAtual.includes('harmonizacao');
  const mencionaPreenchedor = [
    'preenchedor',
    'preenchimento',
    'acido hialuronico',
    'ácido hialurônico',
    'ampolas',
    'labios',
    'lábios',
    'olheira',
    'olheiras',
    'bigode chines',
    'bigode chinês',
    'md codes',
    'harmonizacao',
    'harmonização',
    'mento',
    'orelha',
    'orelhas',
    'top model'
  ].some((termo) => textoNormalizado.includes(normalizeText(termo)));

  const concorrentesSemPreenchedor = ['lavieen', 'endymed', 'intensif', 'bioestimulador', 'diamond', 'botox'].some((termo) => textoNormalizado.includes(termo)) && !textoNormalizado.includes('preenchedor');

  if (!contextoPreenchedor && !mencionaPreenchedor) {
    if (!['e definitivo', 'é definitivo', 'dura quanto', 'quantas ampolas'].some((g) => textoNormalizado.includes(normalizeText(g)))) {
      return null;
    }
  }

  if (concorrentesSemPreenchedor && !contextoPreenchedor) {
    return null;
  }

  const matchDireto = preenchedorFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto) return matchDireto;

  if (contextoPreenchedor) {
    return preenchedorFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

function encontrarBlocoScizer(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');
  const contextoScizer = procedimentoAtual === 'scizer' || procedimentoAtual.includes('scizer');
  const mencionaScizer = [
    'scizer',
    'gordura localizada',
    'criolipolise',
    'criolipólise',
    'quadrantes',
    'amamentando'
  ].some((termo) => textoNormalizado.includes(normalizeText(termo)));
  const gatilhoCurtoScizer = ['doi', 'dói', 'resultado', 'dura quanto', 'quantas sessoes', 'quantas sessões', 'anestesia', 'anticoagulante', 'trombose', 'ultraformer'].some((g) => textoNormalizado.includes(normalizeText(g)));

  if (!contextoScizer && !mencionaScizer && !gatilhoCurtoScizer) {
    return null;
  }

  const matchDireto = scizerFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );
  if (matchDireto) {
    if (!contextoScizer && !mencionaScizer) {
      const gatilhoDisparado = matchDireto.gatilhos.find((gatilho) => textoNormalizado.includes(normalizeText(gatilho))) || '';
      if (['doi', 'dói', 'resultado', 'dura quanto', 'quantas sessoes', 'quantas sessões', 'anestesia', 'anticoagulante', 'trombose', 'ultraformer'].includes(normalizeText(gatilhoDisparado))) {
        return null;
      }
    }
    return matchDireto;
  }

  if (contextoScizer) {
    return scizerFaq.find((item) =>
      Array.isArray(item.gatilhosContextuais) &&
      item.gatilhosContextuais.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
    ) || null;
  }

  return null;
}

function encontrarBlocoConfianca(texto = '', contexto = {}) {
  const textoNormalizado = normalizeText(texto);
  const procedimentoAtual = normalizeText(contexto.procedimentoAtual || '');

  const contextoTratamento = [
    'ultraformer',
    'scizer',
    'preenchedor',
    'bioestimulador',
    'lavieen',
    'endymed'
  ].includes(procedimentoAtual);

  // Avoid hijacking treatment-specific safety/originality follow-ups while in procedure context.
  if (contextoTratamento) {
    const somenteConfiancaGenerica = ['e seguro', 'é seguro', 'original', 'quero'].includes(textoNormalizado);
    if (somenteConfiancaGenerica) return null;
  }

  const matchDireto = confiancaFaq.find((item) =>
    Array.isArray(item.gatilhos) &&
    item.gatilhos.some((gatilho) => textoNormalizado.includes(normalizeText(gatilho)))
  );

  return matchDireto || null;
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
    const intencaoInterpretada = classificarIntencaoMensagem(pergunta, contexto);

    console.log('PERGUNTA RECEBIDA:', pergunta);
    console.log('TEXTO NORMALIZADO:', msg);
    console.log('INTENCAO CLASSIFICADA:', intencaoInterpretada.categoria);

    if (!msg) {
      console.log('CAIU NO FALLBACK');
      return res.status(200).json({
        resposta: 'Desculpe, ainda estou aprendendo 😊\nMas posso te ajudar com nossos tratamentos. O que você gostaria de melhorar?'
      });
    }

    if (msg.startsWith('midia0505')) {
      return res.status(200).json({ resposta: 'Correção registrada.' });
    }

    // ════ SE COMPRA JÁ FOI FINALIZADA, NÃO CONTINUAR O FLUXO ════
    if (contexto.intencao === 'compra_finalizada_sistema' || contexto.intencao === 'compra_finalizada_equipe') {
      return res.status(200).json({
        resposta: 'Sua compra já foi processada! 🎉\n\nQualquer dúvida, fale direto com a equipe de atendimento. Estamos sempre prontos para ajudar! 😊',
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - DETECÇÃO DE INTENÇÃO ════
    if (detectarIntencaoCompra(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_OPCOES_COMPRA,
        contexto: { ...contexto, intencao: 'fluxo_compra_opcoes', cidade: cidadeDetectada || contexto.cidade || undefined }
      });
    }

    // ════ FLUXO DE COMPRA - CONTEXTO AGUARDANDO ESCOLHA (EQUIPE OU SISTEMA) ════
    if (contexto.intencao === 'fluxo_compra_opcoes') {
      if (detectarEscolhaEquipe(pergunta)) {
        // Usuário escolheu falar com equipe
        const cidadeContexto = contexto.cidade || null;
        const cidadeAtual = cidadeDetectada || cidadeContexto;

        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_QUAL_UNIDADE,
            contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_equipe' }
          });
        }

        const respostaWhatsapp = respostaWhatsappPorCidade(cidadeAtual);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: respostaWhatsapp,
            contexto: { cidade: cidadeAtual, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: cidadeAtual }
          });
        }
      }

      if (detectarEscolhaSistema(pergunta)) {
        // Usuário escolheu comprar pelo sistema
        const cidadeContexto = contexto.cidade || null;
        const cidadeAtual = cidadeDetectada || cidadeContexto;

        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_QUAL_UNIDADE,
            contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_sistema' }
          });
        }

        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_pagamento', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema' }
        });
      }

      // Se não entendeu a opção, repetir
      return res.status(200).json({
        resposta: 'Desculpa, não entendi 😊\n\nVocê prefere:\n\n1️⃣ Comprar aqui pelo sistema\n2️⃣ Falar com a equipe da unidade',
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - EQUIPE AGUARDANDO CIDADE ════
    if (contexto.intencao === 'fluxo_compra_aguardando_cidade_equipe') {
      const cidadeAtual = cidadeDetectada;
      if (cidadeAtual) {
        const respostaWhatsapp = respostaWhatsappPorCidade(cidadeAtual);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: respostaWhatsapp,
            contexto: { cidade: cidadeAtual, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: cidadeAtual }
          });
        }
      }

      return res.status(200).json({
        resposta: RESPOSTA_QUAL_UNIDADE,
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - SISTEMA AGUARDANDO CIDADE ════
    if (contexto.intencao === 'fluxo_compra_aguardando_cidade_sistema') {
      const cidadeAtual = cidadeDetectada;
      if (cidadeAtual) {
        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_pagamento', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema' }
        });
      }

      return res.status(200).json({
        resposta: RESPOSTA_QUAL_UNIDADE,
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - SISTEMA AGUARDANDO FORMA DE PAGAMENTO ════
    if (contexto.intencao === 'fluxo_compra_aguardando_pagamento') {
      const formaPagamento = detectarFormaPagamento(pergunta);
      const cidadeCompra = contexto.cidadeCompra || cidadeDetectada;

      if (formaPagamento === 'pix') {
        return res.status(200).json({
          resposta: gerarRespostaPix(cidadeCompra),
          contexto: { cidade: cidadeCompra, intencao: 'compra_finalizada_sistema', intencaoCompra: 'sistema', formaPagamento: 'pix', cidadeCompra }
        });
      }

      if (formaPagamento === 'cartao') {
        return res.status(200).json({
          resposta: gerarRespostaCartao(cidadeCompra),
          contexto: { cidade: cidadeCompra, intencao: 'compra_finalizada_sistema', intencaoCompra: 'sistema', formaPagamento: 'cartao', cidadeCompra }
        });
      }

      // Se não entendeu a forma de pagamento, repetir
      return res.status(200).json({
        resposta: 'Desculpa, não entendi 😊\n\nQual será a forma de pagamento?\n\n1️⃣ Pix\n2️⃣ Cartão',
        contexto: contexto
      });
    }

    // Prioridade máxima: pediu humano = direcionamento imediato ao WhatsApp.
    if (intencaoInterpretada.categoria === 'humano') {
      const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
      const cidadeAtual = cidadeDetectada || cidadeContexto;

      if (!cidadeAtual) {
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nMe fala sua cidade que te envio o contato da unidade mais próxima.',
          contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', cidadeAtual: undefined }
        });
      }

      const respostaHumano = respostaHumanoPorCidade(cidadeAtual);
      if (respostaHumano) {
        return res.status(200).json({
          resposta: respostaHumano,
          contexto: { cidade: cidadeAtual, cidadeAtual }
        });
      }

      return res.status(200).json({
        resposta: 'Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nMe fala sua cidade que te envio o contato da unidade mais próxima.',
        contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', cidadeAtual: undefined }
      });
    }

    const itemConfianca = encontrarBlocoConfianca(pergunta, contexto);
    if (itemConfianca && intencaoInterpretada.categoria !== 'oferta_preco') {
      if (itemConfianca.tipo === 'fechamento_direto') {
        const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
        const cidadeAtual = cidadeDetectada || cidadeContexto;

        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: 'Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nMe fala sua cidade que te envio o contato da unidade mais próxima.',
            contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', cidadeAtual: undefined }
          });
        }

        const respostaHumano = respostaHumanoPorCidade(cidadeAtual);
        if (respostaHumano) {
          return res.status(200).json({
            resposta: respostaHumano,
            contexto: { cidade: cidadeAtual, cidadeAtual }
          });
        }

        return res.status(200).json({
          resposta: itemConfianca.resposta,
          contexto: { intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano' }
        });
      }

      return res.status(200).json({
        resposta: itemConfianca.resposta,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: 'confianca' }
      });
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
          : tipoLink === 'humano'
            ? respostaHumanoPorCidade(cidadeNoMsg)
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
          : 'Me fala sua cidade que te envio o contato da unidade mais próxima.',
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
    if (intencaoInterpretada.categoria === 'localizacao') {
      const intencaoLocalizacao = identificarIntencaoOperacional(pergunta);
      const respostaOperacional = responderIntencaoOperacional(intencaoLocalizacao, unidadeDetectada);
      if (respostaOperacional) {
        return res.status(200).json(respostaOperacional);
      }

      if (cidadeDetectada && unidadeDetectada) {
        const nomeCidade = unidadeDetectada.nomeCompleto.replace('CR Laser® ', '');

        return res.status(200).json({
          resposta: `Perfeito 😊\nTemos uma unidade em ${nomeCidade}.\n\nQuer que eu te envie o endereço ou o telefone?`,
          contexto: { cidade: cidadeDetectada, intencao: 'aguardando_endereco_ou_telefone' }
        });
      }
    }

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
      const unidadeContexto = cidadeAtual ? unidades.find((u) => u.cidade === cidadeAtual) : null;
      const unidadeAtual = unidadeDetectada || unidadeContexto;
      const intencaoOperacional = identificarIntencaoOperacional(pergunta);

      if (intencaoOperacional) {
        const respostaOperacional = responderIntencaoOperacional(intencaoOperacional, unidadeAtual);
        if (respostaOperacional) {
          return res.status(200).json(respostaOperacional);
        }
      }

      const perfilFlacidezFacial = detectarPerfilFlacidezFacial(pergunta, contexto);
      if (perfilFlacidezFacial === 'magro') {
        return res.status(200).json({
          resposta: RESPOSTA_FLACIDEZ_ROSTO_MAGRO,
          contexto: { intencao: 'aguardando_interesse', procedimentoAtual: 'bioestimulador', cidade: cidadeAtual || undefined, cidadeAtual: cidadeAtual || undefined }
        });
      }

      if (perfilFlacidezFacial === 'cheio') {
        return res.status(200).json({
          resposta: RESPOSTA_FLACIDEZ_ROSTO_CHEIO,
          contexto: { intencao: 'aguardando_interesse', procedimentoAtual: 'ultraformer', cidade: cidadeAtual || undefined, cidadeAtual: cidadeAtual || undefined }
        });
      }

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

    if (detectarFollowUpUltraformerPalpebras(pergunta, contexto)) {
      return res.status(200).json({
        resposta: RESPOSTA_ULTRAFORMER_PALPEBRAS_CONTEXTO,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: CONTEXTO_ULTRAFORMER_PALPEBRAS }
      });
    }

    if (detectarTemaUltraformerPalpebras(pergunta, contexto)) {
      return res.status(200).json({
        resposta: RESPOSTA_ULTRAFORMER_PALPEBRAS,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: CONTEXTO_ULTRAFORMER_PALPEBRAS }
      });
    }

    if (intencaoInterpretada.categoria === 'oferta_preco' && detectarInteresseFechamento(pergunta)) {
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

    if (intencaoInterpretada.categoria === 'oferta_preco' && detectarPreco(pergunta)) {
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
        resposta: respostaCurtaComConducao(itemEndymed.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemEndymed.procedimento || 'endymed' }
      });
    }

    const intencao = identificarIntencaoOperacional(pergunta);
    const unidade = unidadeDetectada;

    if (intencaoInterpretada.categoria === 'localizacao' && intencao) {
      const respostaOperacional = responderIntencaoOperacional(intencao, unidade);
      if (respostaOperacional) {
        return res.status(200).json(respostaOperacional);
      }
    }

    if (intencaoInterpretada.categoria === 'localizacao' && cidadeDetectada && unidadeDetectada) {
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
        resposta: respostaCurtaComConducao(correcao),
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

    if (intencaoInterpretada.categoria === 'flacidez') {
      return res.status(200).json({
        resposta: 'Para flacidez facial, a melhor indicação depende muito do tipo de rosto 😊\n\nSeu rosto hoje é mais magro ou mais cheio?',
        contexto: {
          intencao: 'conduzindo_indicacao',
          procedimentoAtual: 'flacidez_rosto',
          passosConducao: 0,
          cidade: cidadeDetectada || contexto.cidade
        }
      });
    }

    const itemScizer = encontrarBlocoScizer(pergunta, contexto);
    if (itemScizer) {
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemScizer.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemScizer.procedimento || 'scizer' }
      });
    }

    const itemUltraformer = encontrarBlocoUltraformer(pergunta, contexto);
    if (itemUltraformer) {
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemUltraformer.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemUltraformer.procedimento || 'ultraformer' }
      });
    }

    const itemBio = encontrarBlocoBioestimulador(pergunta, contexto);
    if (itemBio) {
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemBio.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemBio.procedimento || 'bioestimulador' }
      });
    }

    const itemLavieen = encontrarBlocoLavieen(pergunta, contexto);
    if (itemLavieen) {
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemLavieen.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemLavieen.procedimento || 'lavieen' }
      });
    }

    const itemPreenchedor = encontrarBlocoPreenchedor(pergunta, contexto);
    if (itemPreenchedor) {
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemPreenchedor.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: itemPreenchedor.procedimento || 'preenchedor' }
      });
    }

    if (intencaoInterpretada.categoria === 'botox_rugas' && detectarTemaBotoxFacial(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_BOTOX_FACIAL_RUGAS,
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: 'botox' }
      });
    }

    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      const rawGatilho = Array.isArray(itemFaq.gatilhos) ? itemFaq.gatilhos[0] : null;
      const procAtual = rawGatilho && rawGatilho.split(' ').length <= 2 ? rawGatilho : null;
      const preservarRespostaCompleta = Array.isArray(itemFaq.gatilhos) && itemFaq.gatilhos.includes('pontos botox');
      return res.status(200).json({
        resposta: preservarRespostaCompleta ? itemFaq.resposta : respostaCurtaComConducao(itemFaq.resposta),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: procAtual }
      });
    }

    const itemSugestao = encontrarSugestao(pergunta);
    if (itemSugestao) {
      const rawSug = Array.isArray(itemSugestao.gatilhos) ? itemSugestao.gatilhos[0] : null;
      const procSug = rawSug && rawSug.split(' ').length <= 2 ? rawSug : null;
      return res.status(200).json({
        resposta: respostaCurtaComConducao(itemSugestao.resposta),
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

    if (intencaoInterpretada.categoria !== 'fallback') {
      return res.status(200).json({
        resposta: respostaGenericaPorCategoria(intencaoInterpretada.categoria),
        contexto: { intencao: 'aguardando_interesse', procedimentoAtual: intencaoInterpretada.categoria }
      });
    }

    console.log('CAIU NO FALLBACK');
    return res.status(200).json({
      resposta: 'Consigo te ajudar sim 😊\n\nSe quiser, me conta um pouco melhor o que está te incomodando que eu te explico direitinho.'
    });
  } catch {
    console.log('CAIU NO FALLBACK');
    return res.status(200).json({
      resposta: 'Consigo te ajudar sim 😊\n\nSe quiser, me conta um pouco melhor o que está te incomodando que eu te explico direitinho.'
    });
  }
}