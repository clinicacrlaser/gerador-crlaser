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

// ════ LISTA DE PROCEDIMENTOS PARA DETECÇÃO ════
// Hardcoded dos procedimentos disponíveis
const PROCEDURES = [
  { name: 'Botox Facial Terço Superior Com Retorno', group: 'botox' },
  { name: 'Botox Suor Axilar', group: 'botox' },
  { name: 'Preenchedor Facial', group: 'preenchedor' },
  { name: 'Bioestimulador Diamond', group: 'diamond' },
  { name: 'Ultraformer MPT Full Face', group: 'ultraformer' },
  { name: 'Ultraformer MPT Pálpebras', group: 'ultraformer' },
  { name: 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)', group: 'ultraformer' },
  { name: 'Ultraformer MPT Papada', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bichectomia', group: 'ultraformer' },
  { name: 'Ultraformer MPT Terço Inferior', group: 'ultraformer' },
  { name: 'Ultraformer MPT Abdome', group: 'ultraformer' },
  { name: 'Ultraformer MPT Flancos', group: 'ultraformer' },
  { name: 'Ultraformer MPT Colo', group: 'ultraformer' },
  { name: 'Ultraformer MPT Gordura do Sutiã', group: 'ultraformer' },
  { name: 'Ultraformer MPT Gordura Pré-Axilar', group: 'ultraformer' },
  { name: 'Ultraformer MPT Monte de Vênus', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bananinha', group: 'ultraformer' },
  { name: 'Ultraformer MPT Braços Região do Tchau', group: 'ultraformer' },
  { name: 'Ultraformer MPT Joelho', group: 'ultraformer' },
  { name: 'Ultraformer MPT Interno de Coxa', group: 'ultraformer' },
  { name: 'Ultraformer MPT Mãos', group: 'ultraformer' },
  { name: 'Ultraformer MPT Rejuvenescimento Íntimo', group: 'ultraformer' },
  { name: 'Ultraformer MPT Bumbum Up', group: 'ultraformer' },
  { name: 'Lavieen BB Laser Facial - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Facial Completo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Melasma Facial - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Face + Pescoço + Colo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Facial + Pescoço - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Olheiras - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Pescoço + Colo - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Capilar - 3 sessões', group: 'lavieen' },
  { name: 'Lavieen Mãos - 3 sessões', group: 'lavieen' }
];

const PROCEDURE_ALIASES = {
  'Botox Facial': [
    'botox',
    'botox facial',
    'botox terco superior',
    'botox facial terco superior',
    'aplicacao facial',
    'toxina botulinica facial'
  ],
  'Botox Suor Axilar': [
    'suor',
    'axila',
    'axilar',
    'hiperidrose'
  ],
  'Ultraformer MPT Full Face': [
    'ultraformer',
    'ultra former',
    'ultrafomer',
    'ultrformer',
    'ultrfomer',
    'ultra',
    'mpt',
    'mpt rosto',
    'mpt face',
    'mpt facial',
    'ultra rosto',
    'ultra face',
    'ultra facial',
    'ultrafomer rosto',
    'ultrafomer face',
    'ultrformer rosto',
    'ultrformer face',
    'ultrfomer rosto',
    'ultrfomer face',
    'ultrfomer facial',
    'lifting sem cirurgia',
    'lifting rosto',
    'flacidez rosto',
    'pele caida rosto',
    'quero ultra no rosto'
  ],
  'Ultraformer MPT Papada': [
    'papada',
    'gordura no queixo',
    'queixo duplo',
    'queixo gordo',
    'papada caida'
  ],
  'Ultraformer MPT Pálpebras': [
    'palpebra',
    'palpebras',
    'olho caido',
    'olho caindo',
    'pele do olho',
    'flacidez olho'
  ],
  'Ultraformer MPT Abdome': [
    'barriga',
    'gordura barriga',
    'barriga caida',
    'flacidez barriga',
    'abdomen'
  ],
  'Ultraformer MPT Flancos': [
    'flanco',
    'lateral barriga',
    'pneuzinho',
    'gordura lateral'
  ],
  'Lavieen BB Laser Facial - 3 sessões': [
    'bb laser',
    'bb laser facial'
  ],
  'Lavieen Melasma Facial - 3 sessões': [
    'lavieen melasma',
    'laveen melasma',
    'melasma'
  ],
  'Preenchedor Facial': [
    'preenchedor',
    'preenchimento'
  ],
  'Bioestimulador Diamond': [
    'bioestimulador',
    'bioestulador',
    'sculptra',
    'scultra'
  ]
};

const PROCEDURE_LINK_KEYS = {
  'Botox Facial': 'Botox Facial Terço Superior Com Retorno'
};

const RESPOSTA_BOTOX_DESAMBIGUACAO = 'Você quer Botox facial ou Botox para suor axilar? 😊';
const RESPOSTA_ULTRAFORMER_SEM_REGIAO = 'Em qual região pretende fazer?\n\nRosto, pescoço ou outra região?';
const RESPOSTA_ULTRAFORMER_FULL_FACE_DIRETA = 'Perfeito 😊\n\nO Ultraformer MPT Full Face é indicado para flacidez do rosto e efeito lifting sem cirurgia.\n\nVocê quer ver a condição da campanha atual ou já deseja finalizar a compra?';
const RESPOSTA_ULTRAFORMER_FULL_FACE_CONTEXTO_REGIAO = 'Perfeito 😊\n\nO Ultraformer MPT Full Face é indicado para flacidez do rosto e efeito lifting.\n\nVocê quer gerar a oferta ou tirar alguma dúvida antes?';
const RESPOSTA_PROCEDIMENTO_CURTO_CONTEXTO = 'Perfeito 😊\n\nVocê escolheu {procedimento}.\n\nVocê quer gerar a oferta ou tirar alguma dúvida antes?';
const RESPOSTA_ULTRAFORMER_OPCOES = 'Temos algumas opções de Ultraformer MPT 😊\n\n1️⃣ Full Face\n2️⃣ Terço Inferior\n3️⃣ Papada\n4️⃣ Pescoço\n5️⃣ Colo\n6️⃣ Pálpebras\n7️⃣ Abdome\n8️⃣ Flancos\n9️⃣ Braços\n🔟 Interno de coxa\n\nQual dessas regiões você quer?';
const RESPOSTA_LAVIEEN_SEM_REGIAO = 'O Lavieen pode ser feito em diferentes protocolos 😊\n\nEm qual região pretende fazer?\n\nRosto? Pescoço? Ou alguma outra região?';
const RESPOSTA_LAVIEEN_OPCOES = 'Temos algumas opções de Lavieen 😊\n\n1️⃣ Facial completo\n2️⃣ Face + Pescoço\n3️⃣ Pescoço + Colo\n4️⃣ Face + Pescoço + Colo\n5️⃣ BB Laser Facial\n6️⃣ Melasma\n7️⃣ Olheiras\n8️⃣ Capilar\n9️⃣ Mãos\n\nQual dessas opções você quer?';
const RESPOSTA_DIRECIONAR_LINK_ERRADO = 'Para evitar te passar o link errado 😊\n\nVou te direcionar para a equipe da unidade 👇';

// ════ BLOQUEIO OBRIGATÓRIO DE PREÇOS ════
// A Lia NUNCA informa valores. Sempre direciona para o sistema.
const RESPOSTA_PRECO = 'Os valores variam conforme a campanha do dia 😊\n\n👉 O ideal é você gerar direto no sistema para ver a condição atual';
const RESPOSTA_PRECO_SEM_CIDADE = 'Claro 😊\n\nOs valores variam conforme a campanha ativa.\n\nPara te passar a condição correta, me fala qual unidade fica melhor pra você:\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const RESPOSTA_PRECO_SISTEMA = 'Claro 😊\n\nOs valores variam conforme a campanha ativa.\n\nPara ver a condição atual, é só usar o sistema aqui na tela:\n\n1️⃣ Escolha o procedimento\n2️⃣ Selecione a faixa da oferta\n3️⃣ Clique em Gerar Oferta\n\nAssim você vê o valor certinho.';
const RESPOSTA_CONTINUIDADE_PRECO_SISTEMA = 'Perfeito 😊\n\nQualquer dúvida na hora de gerar a oferta, me chama por aqui.';
const RESPOSTA_CIDADE = 'Temos unidades em várias cidades 😊\n\nBrasília, Campinas, Goiânia, Palmas e São Paulo.\n\nQual fica melhor pra você que já te passo o endereço certinho?';
const RESPOSTA_HORARIO = 'Funcionamos de segunda a sexta das 08:30 às 12:00 e das 14:00 às 18:30, e sábado das 08:00 às 12:00 😊';
const RESPOSTA_AGENDAMENTO_SEM_CIDADE = 'Perfeito 😊\n\nMe fala sua cidade que te envio o contato direto da unidade mais próxima.';
const RESPOSTA_FECHAMENTO_LEVE = 'Se quiser, posso te passar a melhor condição da semana 😊';
const RESPOSTA_OFERTA_SEMANA_SEM_CIDADE = 'Claro 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const CONTEXTO_ULTRAFORMER_PALPEBRAS = 'ultraformer_palpebras';

// ════ FLUXO DE VENDA - OFERTAS E PAGAMENTO ════
const RESPOSTA_OPCOES_COMPRA = 'Você pode comprar aqui comigo, de forma mais rápida e prática, ou falar direto com a equipe da unidade 😊\n\nApós a compra, é só enviar o comprovante para a unidade de atendimento e solicitar o agendamento.\n\n➖️➖️➖️➖️\n📍 Como fica mais fácil para você?\n\n1️⃣ Comprar aqui pelo sistema\n2️⃣ Falar com a equipe da unidade';

const RESPOSTA_QUAL_UNIDADE = 'Qual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const RESPOSTA_CONFIRMAR_CIDADE_OFERTA = 'Perfeito 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';

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

// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - BRASÍLIA ════
const LINKS_CAMPANHA_SEXTOUU_BRASILIA = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/3IdBDxq',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/4eilQJG',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/40hOlS4',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/3Ta289v',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4nfB2eQ',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3Ta4F3v',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4nhX5l2',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/3HXv3eI',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/40mfAej',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/4eiTq2d',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/4nwe0Rc',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/44tNCjc',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/40hTl9i',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/46cVlDv',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/4nzzzAr',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/44xkBmM',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3FTixw9',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/3TEQSlC',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4et2Nwv',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3Id8zWT',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/45z4lmh',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3ZLbuwb',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3FRMJI0',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4lq229L',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/44lhygk',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/4lkw0vN',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/3ZO2Qgm',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4t0kASi',
  'Botox Suor Axilar': 'https://cielolink.com.br/41RXUHO',
  'Preenchedor Facial': 'https://cielolink.com.br/4mcm7ls',
  'Bioestimulador Diamond': 'https://cielolink.com.br/3HUzUx6'
};

// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - CAMPINAS ════
const LINKS_CAMPANHA_SEXTOUU_CAMPINAS = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4hMMcVZ',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/47SmB9U',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/3WIYKnO',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4qLLht5',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/49GEfzH',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3LokIdr',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4hNiG2x',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/4hNP19u',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/43ZgOxR',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/3WIGD1q',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/3JQjKWK',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/4nLfaqR',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4nKHqdg',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/4oVCkf1',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3XfbVwO',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/3JHTD4c',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3XmQtpH',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/4ow6VQF',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4nRfu7u',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3LFxqo4',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4nQS9CI',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4qTN2V4',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3JQmHGW',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4qVchGD',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/4oDzdc4',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/47S34Gf',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4hWmuyk',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4igbg8p',
  'Botox Suor Axilar': 'https://cielolink.com.br/47P9eHd',
  'Preenchedor Facial': 'https://cielolink.com.br/3WUFXGd',
  'Bioestimulador Diamond': 'https://cielolink.com.br/49Vqe14'
};

// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - GOIÂNIA ════
const LINKS_CAMPANHA_SEXTOUU_GOIANIA = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4kWJPjS',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/3SOinsE',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/3HBDoo6',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/3HDAKOu',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/3TmRlss',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/3FAFMeh',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4e0R2xc',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/3SJG05E',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4l7ONKW',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/4kNv5Ej',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/45gwTRm',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/3TmJo6C',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4jJJqQH',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/4l0t870',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3FVSSTj',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/4kIpE9G',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/4jJZLoE',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/43QLO3L',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4e3tVC7',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/4dWX0yV',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4kE0OYo',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3HBLL2Z',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3SPZWDV',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/3FAKNU9',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/3T9mPT7',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/43WHyOD',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/3G0OsdM',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4198sSD',
  'Botox Suor Axilar': 'https://cielolink.com.br/3O16Siy',
  'Preenchedor Facial': 'https://cielolink.com.br/4s8p87T',
  'Bioestimulador Diamond': 'https://cielolink.com.br/4l02GKP'
};

// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - PALMAS ════
const LINKS_CAMPANHA_SEXTOUU_PALMAS = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4pWxfEt',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/4gwYO37',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/43jpYF9',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4gwYO37',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4htLaOz',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/421rBXD',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4kEvokX',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/442qoAM',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4mtqtmV',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/44tQmx0',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/4lm5Mcg',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/4encYCO',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/4kUz2aa',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/44vVv7J',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/3HUpPAl',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/3G2CJeZ',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/43YlG6Z',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/44cXY5M',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/3ZOPUa6',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/3T4T4mn',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4lo0VYd',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3Icqw7X',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/3TEUqEs',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/4lHjZ3Z',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/3GbM7gn',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/3HVBYoy',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4k2G6Ap',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4m1v7dh',
  'Botox Suor Axilar': 'https://cielolink.com.br/4bGnHHA',
  'Preenchedor Facial': 'https://cielolink.com.br/417PGLr',
  'Bioestimulador Diamond': 'https://cielolink.com.br/430UpzN'
};

// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - SÃO PAULO ════
const LINKS_CAMPANHA_SEXTOUU_SAOPAULO = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/4k8hne7',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/4l2Kn8u',
  'Ultraformer MPT Bichectomia': 'https://cielolink.com.br/4nmeERe',
  'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)': 'https://cielolink.com.br/4kagiCH',
  'Ultraformer MPT Colo': 'https://cielolink.com.br/4kgUxRK',
  'Ultraformer MPT Pálpebras': 'https://cielolink.com.br/4kbqN8K',
  'Ultraformer MPT Abdome': 'https://cielolink.com.br/4kZQudA',
  'Ultraformer MPT Flancos': 'https://cielolink.com.br/4k72hFF',
  'Ultraformer MPT Braços Região do Tchau': 'https://cielolink.com.br/3ZMX12H',
  'Ultraformer MPT Gordura do Sutiã': 'https://cielolink.com.br/44ukCYx',
  'Ultraformer MPT Gordura Pré-Axilar': 'https://cielolink.com.br/449vrzr',
  'Ultraformer MPT Bananinha': 'https://cielolink.com.br/3Gd8Zfl',
  'Ultraformer MPT Interno de Coxa': 'https://cielolink.com.br/43Yd5RH',
  'Ultraformer MPT Monte de Vênus': 'https://cielolink.com.br/4l4L7Kk',
  'Ultraformer MPT Rejuvenescimento Íntimo': 'https://cielolink.com.br/4niMYfY',
  'Ultraformer MPT Joelho': 'https://cielolink.com.br/3T3M8pz',
  'Ultraformer MPT Mãos': 'https://cielolink.com.br/4k83M6q',
  'Lavieen Facial Completo - 3 sessões': 'https://cielolink.com.br/4emce0L',
  'Lavieen Facial + Pescoço - 3 sessões': 'https://cielolink.com.br/4lpMses',
  'Lavieen Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/3IaR2P4',
  'Lavieen Face + Pescoço + Colo - 3 sessões': 'https://cielolink.com.br/4kTxJID',
  'Lavieen BB Laser Facial - 3 sessões': 'https://cielolink.com.br/4l2Wq5I',
  'Lavieen Melasma Facial - 3 sessões': 'https://cielolink.com.br/46cJNjI',
  'Lavieen Olheiras - 3 sessões': 'https://cielolink.com.br/4emll1t',
  'Lavieen Capilar - 3 sessões': 'https://cielolink.com.br/45FebmO',
  'Lavieen Mãos - 3 sessões': 'https://cielolink.com.br/4nzR2bZ',
  'Botox Facial Terço Superior Com Retorno': 'https://cielolink.com.br/4sJCiJH',
  'Botox Suor Axilar': 'https://cielolink.com.br/3PH1MbU',
  'Preenchedor Facial': 'https://cielolink.com.br/3Qa4AhM',
  'Bioestimulador Diamond': 'https://cielolink.com.br/4k3zUbn'
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
    .replace(/\blaveen\b/gi, 'lavieen')
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

function ehRespostaCurta(texto = '') {
  const t = normalizeText(texto);
  return ['ok', 'sim', 'certo', 'pode', 'entendi', 'beleza', 'ta', 'tá', 'perfeito', 'claro'].includes(t);
}

function detectarConfirmacaoCurtaPosPrecoSistema(texto = '') {
  const t = normalizeText(texto);
  return ['ok', 'entendi', 'certo', 'beleza', 'obrigado', 'obrigada', 'ta', 'tá'].includes(t);
}

function interpretarFormaPagamentoPorRespostaCurta(texto = '') {
  const t = normalizeText(texto);
  if (['1', 'pix'].includes(t)) return 'pix';
  if (['2', 'cartao', 'cartão'].includes(t)) return 'cartao';
  return null;
}

function respostaCurtaAposLink(texto = '') {
  const t = normalizeText(texto);
  return ['ok', 'certo', 'entendi', 'beleza', 'sim', 'pode'].includes(t);
}

function detectarPedidoContatoComprovante(texto = '') {
  const t = normalizeText(texto);
  return [
    'qual',
    'onde',
    'qual whatsapp',
    'qual contato',
    'quero sim',
    'manda',
    'pode mandar',
    'me envia'
  ].includes(t);
}

function contextoComprovanteAtivo(contexto = {}) {
  return Boolean(contexto.aguardandoComprovante || contexto.aguardando_comprovante);
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
    t.includes('valores') ||
    t.includes('quanto custa') ||
    t.includes('custa quanto') ||
    t.includes('orcamento') ||
    t.includes('promoc') ||
    t.includes('promocao') ||
    t.includes('oferta') ||
    t.includes('quanto e') ||
    t.includes('quanto sai')
  );
}

function detectarPrecoProcedimento(texto = '') {
  const temPreco = detectarPreco(texto);
  const temProcedimento = !!detectarProcedimento(texto) || !!detectarBaseProcedimentoAmbiguo(texto);
  return temPreco && temProcedimento;
}

function detectarPedidoOfertasSistema(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('ofertas') ||
    t === 'oferta' ||
    t.includes('oferta da semana') ||
    t.includes('promocao') ||
    t.includes('promocoes') ||
    t.includes('valores') ||
    t.includes('quero saber das ofertas') ||
    t.includes('quais ofertas tem') ||
    t.includes('quais promocoes tem') ||
    t.includes('quero ver valores')
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
    t.includes('tenho interesse')
  );
}

function detectarConfirmacaoOferta(texto = '') {
  const t = normalizeText(texto);
  return ['quero', 'quero sim', 'pode mandar', 'manda', 'sim', 'pode'].includes(t);
}

function interpretarCidadePorRespostaCurta(texto = '') {
  const t = normalizeText(texto);
  if (['brasilia', 'brasilia', 'bsb'].includes(t)) return 'brasilia';
  if (['campinas'].includes(t)) return 'campinas';
  if (['goiania', 'goiania', 'gyn'].includes(t)) return 'goiania';
  if (['palmas', 'pmw'].includes(t)) return 'palmas';
  if (['sao paulo', 'sao paulo', 'sp', 'spj'].includes(t)) return 'saopaulo';
  return null;
}

function resolverProcedimentoCurtoPorBase(texto = '', base = '') {
  const t = normalizeText(texto);

  if (base === 'ultraformer') {
    if (['rosto', 'face', 'facial'].includes(t)) return 'Ultraformer MPT Full Face';
    if (['pescoco', 'pescoço'].includes(t)) return 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)';
    if (['papada'].includes(t)) return 'Ultraformer MPT Papada';
    if (['palpebras', 'palpebra', 'pálpebras', 'pálpebra', 'olhos', 'olho'].includes(t)) return 'Ultraformer MPT Pálpebras';
    if (['abdome', 'barriga'].includes(t)) return 'Ultraformer MPT Abdome';
    return null;
  }

  if (base === 'botox') {
    if (['facial', 'rosto', 'testa', 'rugas'].includes(t)) return 'Botox Facial';
    if (['suor', 'axila', 'axilar', 'hiperidrose'].includes(t)) return 'Botox Suor Axilar';
    return null;
  }

  if (base === 'lavieen') {
    if (['melasma'].includes(t)) return 'Lavieen Melasma Facial - 3 sessões';
    if (['rosto', 'facial'].includes(t)) return 'Lavieen Facial Completo - 3 sessões';
    if (['bb', 'bb laser'].includes(t)) return 'Lavieen BB Laser Facial - 3 sessões';
    if (['olheiras'].includes(t)) return 'Lavieen Olheiras - 3 sessões';
    if (['capilar', 'cabelo'].includes(t)) return 'Lavieen Capilar - 3 sessões';
    if (['maos', 'mãos'].includes(t)) return 'Lavieen Mãos - 3 sessões';
    return null;
  }

  return null;
}

function interpretarRespostaCurtaContextual(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const ultima = normalizeText(contexto.ultimaPerguntaBot || '');
  const base = contexto.procedimentoBase || contexto?.liaContext?.procedimentoBase || null;

  const perguntouUltra =
    contexto.intencao === 'aguardando_regiao_ultraformer' ||
    ultima === normalizeText(RESPOSTA_ULTRAFORMER_SEM_REGIAO);
  if (perguntouUltra) {
    const procedimento = resolverProcedimentoCurtoPorBase(t, 'ultraformer');
    if (procedimento) return { tipo: 'procedimento', base: 'ultraformer', procedimento };
  }

  const perguntouBotox =
    ultima === normalizeText(RESPOSTA_BOTOX_DESAMBIGUACAO) ||
    (base === 'botox' && contexto.intencao === 'aguardando_interesse');
  if (perguntouBotox) {
    const procedimento = resolverProcedimentoCurtoPorBase(t, 'botox');
    if (procedimento) return { tipo: 'procedimento', base: 'botox', procedimento };
  }

  const perguntouLavieen =
    ultima === normalizeText(RESPOSTA_LAVIEEN_SEM_REGIAO) ||
    (base === 'lavieen' && contexto.intencao === 'aguardando_interesse');
  if (perguntouLavieen) {
    const procedimento = resolverProcedimentoCurtoPorBase(t, 'lavieen');
    if (procedimento) return { tipo: 'procedimento', base: 'lavieen', procedimento };
  }

  const contextosCidade = [
    'aguardando_apenas_cidade',
    'aguardando_cidade_whatsapp',
    'fluxo_compra_aguardando_cidade_sistema',
    'fluxo_compra_aguardando_cidade_equipe',
    'aguardando_cidade_para_confirmacao_oferta',
    'aguardando_cidade_comprovante'
  ];
  const perguntouCidade =
    contextosCidade.includes(contexto.intencao) ||
    ultima.includes(normalizeText('qual unidade fica melhor pra você')) ||
    ultima.includes(normalizeText('me fala sua cidade'));
  if (perguntouCidade) {
    const cidade = interpretarCidadePorRespostaCurta(t);
    if (cidade) return { tipo: 'cidade', cidade };
  }

  const contextosPagamento = [
    'fluxo_compra_aguardando_pagamento',
    'confirmacao_oferta_aguardando_pagamento'
  ];
  const perguntouPagamento =
    contextosPagamento.includes(contexto.intencao) ||
    ultima === normalizeText(RESPOSTA_FORMA_PAGAMENTO);
  if (perguntouPagamento) {
    const formaPagamento = interpretarFormaPagamentoPorRespostaCurta(t) || detectarFormaPagamento(t);
    if (formaPagamento) return { tipo: 'pagamento', formaPagamento };
  }

  return null;
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
    'botox facial',
    'botox terco superior',
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
    'bioestulador',
    'sculptra',
    'scultra',
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

function detectarTermoUltraAproximado(texto = '') {
  const t = normalizeText(texto);
  const termosUltra = ['ultra', 'ultraformer', 'ultra former', 'ultrafomer', 'ultrformer', 'ultrfomer', 'mpt'];
  return termosUltra.some((termo) => t.includes(termo));
}

function detectarRegiaoRosto(texto = '') {
  const t = normalizeText(texto);
  return ['rosto', 'face', 'facial'].some((termo) => t.includes(termo));
}

function detectarRespostaRegiaoUltraformerRosto(texto = '') {
  const t = normalizeText(texto);
  return ['rosto', 'face', 'facial'].includes(t);
}

function detectarUltraformerFullFaceAproximado(texto = '') {
  return detectarTermoUltraAproximado(texto) && detectarRegiaoRosto(texto);
}

function detectarUltraSemRegiaoDireta(texto = '') {
  const t = normalizeText(texto);
  return ['ultra', 'ultraformer', 'ultra former', 'ultrafomer', 'ultrformer', 'ultrfomer', 'mpt'].includes(t);
}

function processarMensagemLia(mensagemUsuario = '') {
  const texto = normalizeText(mensagemUsuario).trim();

  const padraoUltra = /\b(ultra|ultrafomer|ultrformer|ultrfomer|ultraformer|mpt)\b/i;
  const padraoRosto = /\b(rosto|face|facial)\b/i;

  if (padraoUltra.test(texto)) {
    if (padraoRosto.test(texto)) {
      return {
        intent: 'ULTRAFORMER_FULL_FACE',
        resposta: RESPOSTA_ULTRAFORMER_FULL_FACE_DIRETA
      };
    }

    return {
      intent: 'ULTRAFORMER_GENERICO',
      resposta: RESPOSTA_ULTRAFORMER_SEM_REGIAO
    };
  }

  return null;
}

function detectarConsultaAparelho(texto = '') {
  const t = normalizeText(texto);
  return ['aparelho', 'equipamento', 'marca', 'original', 'mpt original'].some(termo => t.includes(termo));
}

function labelCategoriaProvavel(categoria = 'fallback') {
  const labels = {
    humano: 'atendimento humano',
    pos_pagamento: 'pagamento / comprovante',
    localizacao: 'localização',
    preco_procedimento: 'preço de procedimento',
    compra: 'compra / pagamento',
    procedimento: 'procedimento',
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

function normalizarProcedimentoBase(valor = '') {
  const t = normalizeText(valor);

  if (!t) return null;
  if (t.includes('botox')) return 'botox';
  if (t.includes('ultraformer') || t.includes('ultrafomer') || t.includes('ultrformer') || t.includes('ultrfomer') || t === 'ultra' || t === 'mpt') return 'ultraformer';
  if (t.includes('lavieen') || t.includes('bb laser')) return 'lavieen';
  if (t.includes('bioestimulador') || t.includes('diamond') || t.includes('sculptra') || t.includes('scultra')) return 'bioestimulador';
  if (t.includes('preenchedor') || t.includes('preenchimento')) return 'preenchedor';
  if (t.includes('endymed') || t.includes('intensif') || t.includes('shapper') || t.includes('small')) return 'endymed';
  if (t.includes('scizer')) return 'scizer';

  return null;
}

function ehProcedimentoGenerico(valor = '') {
  const base = normalizarProcedimentoBase(valor);
  const t = normalizeText(valor);
  return !!base && (
    t === base ||
    t === 'ultraformer mpt' ||
    t === 'botox' ||
    t === 'lavieen' ||
    t === 'bioestimulador' ||
    t === 'preenchedor' ||
    t === 'endymed' ||
    t === 'scizer'
  );
}

function extrairCidadeContexto(contexto = {}) {
  return contexto?.liaContext?.cidade || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || null;
}

function extrairProcedimentoBaseContexto(contexto = {}) {
  const candidatos = [
    contexto?.liaContext?.procedimentoBase,
    contexto.procedimentoBase,
    contexto.procedimento_selecionado,
    contexto.procedimento,
    contexto.procedimentoAtual
  ];

  for (const candidato of candidatos) {
    const base = normalizarProcedimentoBase(candidato || '');
    if (base) return base;
  }

  return null;
}

function extrairProcedimentoFinalContexto(contexto = {}) {
  const candidatos = [
    contexto?.liaContext?.procedimentoFinal,
    contexto.procedimentoFinal,
    contexto.procedimento,
    contexto.procedimentoAtual,
    contexto.procedimento_selecionado
  ];

  for (const candidato of candidatos) {
    if (candidato && !ehProcedimentoGenerico(candidato)) {
      return candidato;
    }
  }

  return null;
}

function mensagemDefineProcedimentoEspecifico(texto = '', base = '', procedimentoFinal = '') {
  const t = normalizeText(texto);
  if (!procedimentoFinal) return false;

  const baseNorm = normalizarProcedimentoBase(base || procedimentoFinal);
  if (!baseNorm) return true;

  const gatilhosEspecificos = {
    botox: ['facial', 'terco', 'suor', 'axila', 'axilar', 'hiperidrose'],
    ultraformer: ['rosto', 'face', 'full face', 'terco inferior', 'papada', 'pescoco', 'colo', 'palpebra', 'abdome', 'flancos', 'bracos', 'coxa'],
    lavieen: ['melasma', 'olheiras', 'capilar', 'maos', 'mãos', 'bb', 'pescoco', 'colo', 'facial'],
    bioestimulador: ['diamond', 'sculptra', 'scultra'],
    preenchedor: ['facial', 'labio', 'lábio', 'olheira', 'bigode'],
    endymed: ['3deep', 'intensif', 'shapper', 'small'],
    scizer: ['regiao', 'região', 'quadrante']
  };

  const lista = gatilhosEspecificos[baseNorm] || [];
  return lista.some((gatilho) => t.includes(normalizeText(gatilho)));
}

function sincronizarLiaContext(contextoEntrada = {}, texto = '') {
  const contexto = { ...contextoEntrada };
  const cidadeMensagem = identificarCidade(texto)?.cidade || null;
  const baseMensagem = detectarBaseProcedimentoAmbiguo(texto);
  const finalMensagemBruta = detectarProcedimento(texto);
  const finalMensagem = mensagemDefineProcedimentoEspecifico(texto, baseMensagem, finalMensagemBruta)
    ? finalMensagemBruta
    : null;
  const formaMensagem = detectarFormaPagamento(texto);

  const cidade = cidadeMensagem || extrairCidadeContexto(contexto);
  let procedimentoBase = baseMensagem || extrairProcedimentoBaseContexto(contexto);
  let procedimentoFinal = finalMensagem || extrairProcedimentoFinalContexto(contexto);

  if (procedimentoFinal) {
    const baseDoFinal = normalizarProcedimentoBase(procedimentoFinal);
    procedimentoBase = procedimentoBase || baseDoFinal;
  }

  if (baseMensagem && !finalMensagem) {
    const baseAtualFinal = normalizarProcedimentoBase(procedimentoFinal || '');
    if (baseAtualFinal && baseAtualFinal !== baseMensagem) {
      procedimentoFinal = null;
    }
  }

  const formaPagamento = formaMensagem || contexto.formaPagamento || contexto?.liaContext?.formaPagamento || null;
  const etapa = contexto.etapa || contexto?.liaContext?.etapa || null;
  const aguardandoComprovante = contextoComprovanteAtivo(contexto);

  const liaContext = {
    cidade: cidade || null,
    procedimentoBase: procedimentoBase || null,
    procedimentoFinal: procedimentoFinal || null,
    formaPagamento: formaPagamento || null,
    etapa: etapa || null,
    aguardandoComprovante: !!aguardandoComprovante
  };

  const saida = {
    ...contexto,
    liaContext,
    cidade: cidade || contexto.cidade || null,
    procedimentoBase: procedimentoBase || contexto.procedimentoBase || null,
    procedimentoFinal: procedimentoFinal || contexto.procedimentoFinal || null,
    formaPagamento: formaPagamento || contexto.formaPagamento || null,
    etapa: etapa || contexto.etapa || null,
    aguardandoComprovante: !!aguardandoComprovante,
    aguardando_comprovante: !!aguardandoComprovante
  };

  if (cidade) {
    saida.cidadeAtual = cidade;
    saida.cidadeCompra = saida.cidadeCompra || cidade;
  }

  if (procedimentoFinal) {
    saida.procedimento = procedimentoFinal;
    saida.procedimentoAtual = procedimentoFinal;
  }

  return saida;
}

function classificarIntencaoPrincipal(texto = '', contexto = {}) {
  const t = normalizeText(texto);
  const temProcedimento = !!detectarProcedimento(texto) || !!detectarBaseProcedimentoAmbiguo(texto);

  if (!t) return 'FALLBACK';

  // 1) HUMANO
  if (detectarIntencaoHumano(texto)) return 'HUMANO';

  // 2) CONTATO
  if (
    identificarIntencaoOperacional(texto) ||
    (!!identificarCidade(texto) && ['onde', 'endereco', 'telefone', 'unidade', 'mapa', 'fica', 'contato'].some((termo) => t.includes(termo)))
  ) {
    return 'CONTATO';
  }

  // 3) PRECO
  if (detectarPreco(texto)) return 'PRECO';

  // 4) COMPRA
  if (detectarIntencaoCompra(texto) || detectarFormaPagamento(texto) || detectarInteresseFechamento(texto)) return 'COMPRA';

  // 5) PROCEDIMENTO
  if (
    temProcedimento ||
    detectarTemaBotoxFacial(texto) ||
    detectarTemaFlacidez(texto, contexto) ||
    detectarTemaGordura(texto, contexto) ||
    detectarTemaBioPreenchimento(texto, contexto)
  ) {
    return 'PROCEDIMENTO';
  }

  // 6) PAGAMENTO
  if (detectarConfirmacaoPagamento(texto) || contextoComprovanteAtivo(contexto)) return 'PAGAMENTO';

  // 7) DUVIDA_TECNICA
  if (
    encontrarCorrecao(texto) ||
    encontrarFaq(texto) ||
    encontrarSugestao(texto) ||
    encontrarBlocoUltraformer(texto, contexto) ||
    encontrarBlocoBioestimulador(texto, contexto) ||
    encontrarBlocoPreenchedor(texto, contexto) ||
    encontrarBlocoLavieen(texto, contexto) ||
    encontrarBlocoEndymed(texto, contexto) ||
    encontrarBlocoScizer(texto, contexto)
  ) {
    return 'DUVIDA_TECNICA';
  }

  // 8) FALLBACK
  return 'FALLBACK';
}

function intencaoContextoCompativel(contexto = {}, intencaoPrincipal = '', texto = '', cidadeDetectada = null) {
  const estado = contexto.intencao || '';
  if (!estado) return true;

  const t = normalizeText(texto);
  const respostaCurta = ehRespostaCurta(texto) || ['1', '2', 'pix', 'cartao', 'cartão'].includes(t);
  const temCidade = !!cidadeDetectada;

  const estadosContato = [
    'aguardando_cidade_contato_direto',
    'aguardando_apenas_cidade',
    'aguardando_cidade_whatsapp',
    'aguardando_endereco_ou_telefone'
  ];
  if (estadosContato.includes(estado)) {
    return intencaoPrincipal === 'CONTATO' || temCidade || respostaCurta;
  }

  const estadosCompra = [
    'fluxo_compra_opcoes',
    'fluxo_compra_aguardando_cidade_equipe',
    'fluxo_compra_aguardando_cidade_sistema',
    'fluxo_compra_aguardando_pagamento',
    'fluxo_pagamento_aguardando_procedimento_cartao',
    'fluxo_pagamento_aguardando_confirmacao',
    'confirmacao_oferta_aguardando_pagamento',
    'aguardando_cidade_para_confirmacao_oferta'
  ];
  if (estadosCompra.includes(estado)) {
    return ['COMPRA', 'PAGAMENTO', 'PRECO'].includes(intencaoPrincipal) || temCidade || respostaCurta;
  }

  if (estado === 'aguardando_regiao_ultraformer') {
    return intencaoPrincipal === 'PROCEDIMENTO' || respostaCurta;
  }

  if (estado === 'aguardando_aceite_oferta_semana') {
    return ['COMPRA', 'PRECO'].includes(intencaoPrincipal) || respostaCurta;
  }

  return true;
}

function classificarIntencaoMensagem(texto = '', contexto = {}) {
  const principal = classificarIntencaoPrincipal(texto, contexto);

  if (principal === 'HUMANO') return { categoria: 'humano' };
  if (principal === 'CONTATO') return { categoria: 'localizacao' };
  if (principal === 'PAGAMENTO') return { categoria: 'pos_pagamento' };
  if (principal === 'COMPRA') return { categoria: 'compra' };

  if (principal === 'PRECO') {
    if (detectarPrecoProcedimento(texto)) return { categoria: 'preco_procedimento' };
    return { categoria: 'oferta_preco' };
  }

  if (principal === 'PROCEDIMENTO') {
    if (detectarTemaBotoxFacial(texto)) return { categoria: 'botox_rugas' };
    if (detectarTemaFlacidez(texto, contexto)) return { categoria: 'flacidez' };
    if (detectarTemaGordura(texto, contexto)) return { categoria: 'gordura' };
    if (detectarTemaBioPreenchimento(texto, contexto)) return { categoria: 'bio_preenchimento' };
    return { categoria: 'procedimento' };
  }

  if (principal === 'DUVIDA_TECNICA') return { categoria: 'duvidas_gerais' };

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

// ════ DETECÇÃO DE CONFIRMAÇÃO DE PAGAMENTO ════
function detectarConfirmacaoPagamento(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('ja paguei') ||
    t.includes('já paguei') ||
    t.includes('feito o pagamento') ||
    t.includes('fiz o pix') ||
    t.includes('fiz pix') ||
    t.includes('pagamento feito') ||
    t.includes('comprovante enviado') ||
    t.includes('comprovante') ||
    t.includes('mando o comprovante onde') ||
    t.includes('enviei') ||
    t.includes('pageui') ||
    t.includes('paguei') ||
    t === 'ja paguei' ||
    t === 'já paguei' ||
    t === 'feito o pagamento' ||
    t === 'fiz o pix' ||
    t === 'fiz pix' ||
    t === 'pagamento feito' ||
    t === 'comprovante enviado' ||
    t === 'comprovante' ||
    t === 'mando o comprovante onde' ||
    t === 'enviei' ||
    t === 'pageui' ||
    t === 'paguei'
  );
}

function gerarRespostaComprovanteUnidade(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!unidade) {
    return null;
  }

  return `Perfeito 😊

O comprovante deve ser enviado para o WhatsApp da unidade de ${nomeCidade}.

O agendamento também é feito direto por lá.

📍 ${unidade.nomeCompleto}

📞 ${unidade.telefone}`;
}

// ════ DETECÇÃO DE MUDANÇA DE FORMA DE PAGAMENTO ════
function detectarMudancaFormaPagamento(texto = '') {
  const t = normalizeText(texto);
  return (
    t.includes('quero cartao') ||
    t.includes('quero cartão') ||
    t.includes('prefiro cartao') ||
    t.includes('prefiro cartão') ||
    t.includes('mudar forma') ||
    t.includes('trocar forma') ||
    t.includes('trocar pagamento') ||
    t.includes('mudar pagamento') ||
    t.includes('prefiro pix') ||
    t.includes('quero pix') ||
    t === 'quero cartao' ||
    t === 'quero cartão' ||
    t === 'prefiro cartao' ||
    t === 'prefiro cartão' ||
    t === 'mudar forma' ||
    t === 'trocar forma' ||
    t === 'trocar pagamento' ||
    t === 'mudar pagamento' ||
    t === 'prefiro pix' ||
    t === 'quero pix'
  );
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

  return `Perfeito 😊

Segue o Pix da unidade de ${cityName}:

${cnpj}

📍 Importante: confira se os dados pertencem à CR Laser® antes de concluir o pagamento.`;
}

function gerarRespostaCartao(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const link = LINK_CARTAO_POR_CIDADE[cidadeNorm];
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  const nomeCidade = unidade ? unidade.nomeCompleto.replace('CR Laser® ', '') : cidade;

  if (!link || link.startsWith('INSERIR_')) {
    return `Link de pagamento de ${nomeCidade}:\n\n${link}`;
  }

  return `Você pode pagar com cartão clicando aqui:\n\n<a href="${link}" target="_blank" style="display:inline-block;margin-top:8px;padding:12px 18px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Pagar com Cartão</a>`;
}


function gerarRespostaOfertaCampanha(procedimento = '', cidade = '', formato = 'html') {
  const cidadeNorm = normalizeText(cidade).replace(/\s+/g, '');
  
  // Validar cidade e escolher mapeamento correto
  let linksMap = null;
  if (cidadeNorm === 'brasilia') {
    linksMap = LINKS_CAMPANHA_SEXTOUU_BRASILIA;
  } else if (cidadeNorm === 'campinas') {
    linksMap = LINKS_CAMPANHA_SEXTOUU_CAMPINAS;
  } else if (cidadeNorm === 'goiania') {
    linksMap = LINKS_CAMPANHA_SEXTOUU_GOIANIA;
  } else if (cidadeNorm === 'palmas') {
    linksMap = LINKS_CAMPANHA_SEXTOUU_PALMAS;
  } else if (cidadeNorm === 'saopaulo') {
    linksMap = LINKS_CAMPANHA_SEXTOUU_SAOPAULO;
  } else {
    return null;
  }

  const procedimentoLinkKey = PROCEDURE_LINK_KEYS[procedimento] || procedimento;

  // Buscar o link pelo nome do procedimento
  const link = linksMap[procedimentoLinkKey];

  if (!link) {
    return null;
  }

  if (formato === 'texto') {
    return `Perfeito 😊

Você pode finalizar sua compra aqui 👇

${link}`;
  }

  return `Perfeito 😊

Você pode finalizar sua compra aqui 👇

<a href="${link}" target="_blank" style="display:inline-block;margin-top:12px;padding:12px 20px;background:#00c2ff;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">🛒 Finalizar Compra</a>`;
}

function procedimentoCorrespondeBase(procedimento = '', base = '') {
  if (!procedimento || !base) return false;
  const p = normalizeText(procedimento);

  if (base === 'botox') return p.includes('botox');
  if (base === 'ultraformer') return p.includes('ultraformer');
  if (base === 'lavieen') return p.includes('lavieen');
  if (base === 'preenchedor') return p.includes('preenchedor');
  if (base === 'bioestimulador') return p.includes('bioestimulador');
  if (base === 'endymed') return p.includes('endymed');
  if (base === 'scizer') return p.includes('scizer');

  return false;
}


function detectarProcedimentoDetalhado(texto = '') {
  const textoNorm = normalizeText(texto);
  const tokensTexto = textoNorm.split(' ').filter((p) => p.length >= 3);
  const procedimentosDetectados = new Set();
  const ultraProcedimentos = new Set([
    'Ultraformer MPT Full Face',
    'Ultraformer MPT Papada',
    'Ultraformer MPT Pálpebras',
    'Ultraformer MPT Abdome',
    'Ultraformer MPT Flancos'
  ]);

  const ultraSemRegiao = ['ultra', 'ultraformer', 'ultra former', 'ultrafomer', 'ultrformer', 'ultrfomer', 'mpt'];
  if (ultraSemRegiao.includes(textoNorm)) {
    return { procedimento: null, precisaConfirmarRegiao: true };
  }

  if (detectarUltraformerFullFaceAproximado(textoNorm)) {
    return { procedimento: 'Ultraformer MPT Full Face', precisaConfirmarRegiao: false };
  }

  // 1) Alias/sinônimos primeiro (cartão e variações simples)
  for (const [procedimentoCanonico, aliases] of Object.entries(PROCEDURE_ALIASES)) {
    for (const alias of aliases) {
      const aliasNorm = normalizeText(alias);
      if (textoNorm.includes(aliasNorm)) {
        procedimentosDetectados.add(procedimentoCanonico);
        continue;
      }

      const tokensAlias = aliasNorm.split(' ').filter((p) => p.length >= 3);
      if (tokensAlias.length <= 1) {
        continue;
      }

      const hits = tokensAlias.filter((ta) => tokensTexto.some((tt) => palavrasParecidas(tt, ta))).length;
      if (tokensAlias.length && hits >= tokensAlias.length) {
        procedimentosDetectados.add(procedimentoCanonico);
      }
    }
  }

  if (procedimentosDetectados.size > 1) {
    const somenteUltra = Array.from(procedimentosDetectados).every((p) => ultraProcedimentos.has(p));
    if (somenteUltra) {
      return { procedimento: null, precisaConfirmarRegiao: true };
    }
  }

  if (procedimentosDetectados.size === 1) {
    return { procedimento: Array.from(procedimentosDetectados)[0], precisaConfirmarRegiao: false };
  }
  
  // 2) Busca exata pelo nome completo do procedimento
  for (const proc of PROCEDURES) {
    const procNorm = normalizeText(proc.name);
    if (textoNorm.includes(procNorm)) {
      return { procedimento: proc.name, precisaConfirmarRegiao: false };
    }
  }

  // 3) Aproximação por palavras para evitar repetição em pequenos erros de digitação
  let melhor = null;
  let melhorScore = 0;
  for (const proc of PROCEDURES) {
    const tokensProc = normalizeText(proc.name).split(' ').filter((p) => p.length >= 4);
    if (!tokensProc.length) continue;

    const hits = tokensProc.filter((tp) => tokensTexto.some((tt) => palavrasParecidas(tt, tp))).length;
    const score = hits / tokensProc.length;

    if (hits >= 2 && score > melhorScore) {
      melhor = proc.name;
      melhorScore = score;
    }
  }

  if (melhorScore >= 0.6) {
    return { procedimento: melhor, precisaConfirmarRegiao: false };
  }
  
  return { procedimento: null, precisaConfirmarRegiao: false };
}

function detectarProcedimento(texto = '') {
  const resultado = detectarProcedimentoDetalhado(texto);
  return resultado.procedimento;
}

function detectarBaseProcedimentoAmbiguo(texto = '') {
  const t = normalizeText(texto);

  const botoxFacial = ['facial', 'rosto', 'testa', 'rugas'];
  const botoxSuor = ['suor', 'axila', 'axilar', 'hiperidrose'];
  const temBotox = t.includes('botox');
  const temBotoxFacial = botoxFacial.some((k) => t.includes(k));
  const temBotoxSuor = botoxSuor.some((k) => t.includes(k));
  if (temBotox && !temBotoxFacial && !temBotoxSuor) {
    return 'botox';
  }

  const termosUltra = ['ultraformer', 'ultra former', 'ultrafomer', 'ultrformer', 'ultrfomer', 'ultra', 'mpt'];
  const temUltra = termosUltra.some((k) => t.includes(k)) || t === 'quero ultraformer';
  const ultraEspecificos = [
    'rosto', 'face', 'full face', 'terco inferior', 'papada', 'pescoco', 'colo', 'palpebra',
    'abdome', 'barriga', 'flanco', 'lateral', 'pneuzinho', 'braco', 'bracos', 'tchau', 'coxa', 'interno de coxa'
  ];
  const temUltraEspecifico = ultraEspecificos.some((k) => t.includes(k));
  if (temUltra && !temUltraEspecifico) {
    return 'ultraformer';
  }

  const temLavieen = t.includes('lavieen') || t.includes('bb laser');
  const lavieenEspecificos = [
    'facial completo', 'face pescoco', 'pescoco colo', 'face pescoco colo', 'bb', 'melasma',
    'olheiras', 'capilar', 'maos', 'mãos', 'rosto', 'facial'
  ];
  const temLavieenEspecifico = lavieenEspecificos.some((k) => t.includes(k));
  if (temLavieen && !temLavieenEspecifico) {
    return 'lavieen';
  }

  if (['preenchedor', 'preenchimento'].some((k) => t.includes(k))) {
    return 'preenchedor';
  }

  if (['bioestimulador', 'bioestulador', 'sculptra', 'scultra'].some((k) => t.includes(k))) {
    return 'bioestimulador';
  }

  if (['endymed', 'shapper', 'small', 'intensif'].some((k) => t.includes(k))) {
    return 'endymed';
  }

  if (['scizer', 'gordura localizada'].some((k) => t.includes(k))) {
    return 'scizer';
  }

  return null;
}

function resolverProcedimentoPorBase(base = '', texto = '') {
  const t = normalizeText(texto);

  if (base === 'botox') {
    if (['facial', 'rosto', 'testa', 'rugas'].some((k) => t.includes(k))) return 'Botox Facial';
    if (['suor', 'axila', 'axilar', 'hiperidrose'].some((k) => t.includes(k))) return 'Botox Suor Axilar';
    return null;
  }

  if (base === 'ultraformer') {
    if (['rosto', 'face', 'facial', 'full face'].some((k) => t.includes(k))) return 'Ultraformer MPT Full Face';
    if (t.includes('terco inferior')) return 'Ultraformer MPT Terço Inferior';
    if (t.includes('papada')) return 'Ultraformer MPT Papada';
    if (t.includes('pescoco')) return 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)';
    if (t.includes('colo')) return 'Ultraformer MPT Colo';
    if (t.includes('palpebra')) return 'Ultraformer MPT Pálpebras';
    if (['abdome', 'barriga'].some((k) => t.includes(k))) return 'Ultraformer MPT Abdome';
    if (['flanco', 'lateral', 'pneuzinho'].some((k) => t.includes(k))) return 'Ultraformer MPT Flancos';
    if (['braco', 'bracos', 'tchau'].some((k) => t.includes(k))) return 'Ultraformer MPT Braços Região do Tchau';
    if (['interno de coxa', 'coxa'].some((k) => t.includes(k))) return 'Ultraformer MPT Interno de Coxa';
    return null;
  }

  if (base === 'lavieen') {
    if (t.includes('melasma')) return 'Lavieen Melasma Facial - 3 sessões';
    if (t.includes('olheiras')) return 'Lavieen Olheiras - 3 sessões';
    if (t.includes('capilar')) return 'Lavieen Capilar - 3 sessões';
    if (t.includes('maos') || t.includes('mãos')) return 'Lavieen Mãos - 3 sessões';
    if (t.includes('bb')) return 'Lavieen BB Laser Facial - 3 sessões';
    if (t.includes('face') && t.includes('pescoco') && t.includes('colo')) return 'Lavieen Face + Pescoço + Colo - 3 sessões';
    if (t.includes('face') && t.includes('pescoco')) return 'Lavieen Facial + Pescoço - 3 sessões';
    if (t.includes('pescoco') && t.includes('colo')) return 'Lavieen Pescoço + Colo - 3 sessões';
    if (t.includes('rosto') || t.includes('facial')) return 'Lavieen Facial Completo - 3 sessões';
    return null;
  }

  if (base === 'preenchedor') {
    return 'Preenchedor Facial';
  }

  if (base === 'bioestimulador') {
    return 'Bioestimulador Diamond';
  }

  return null;
}

function resolverDesambiguacaoProcedimentoCartao(texto = '', contexto = {}) {
  const baseDoContexto = contexto.procedimentoBase || (
    contexto.procedimento_selecionado === 'Botox' ? 'botox' :
    contexto.procedimento_selecionado === 'Ultraformer MPT' ? 'ultraformer' :
    contexto.procedimento_selecionado === 'Lavieen' ? 'lavieen' :
    contexto.procedimento_selecionado === 'Preenchedor' ? 'preenchedor' :
    contexto.procedimento_selecionado === 'Bioestimulador' ? 'bioestimulador' :
    contexto.procedimento_selecionado === 'Endymed' ? 'endymed' :
    contexto.procedimento_selecionado === 'Scizer' ? 'scizer' :
    null
  );
  const base = baseDoContexto || detectarBaseProcedimentoAmbiguo(texto);
  if (!base) {
    return { procedimento: null, base: null, precisaPerguntar: false, respostaPergunta: '', tentativas: 0, redirecionar: false };
  }

  const procedimento = resolverProcedimentoPorBase(base, texto);
  if (procedimento) {
    return { procedimento, base, precisaPerguntar: false, respostaPergunta: '', tentativas: 0, redirecionar: false };
  }

  const tentativasAtuais = contexto.procedimentoBase === base ? Number(contexto.tentativas_pergunta || 0) : 0;

  if (tentativasAtuais <= 0) {
    if (base === 'botox') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_BOTOX_DESAMBIGUACAO, tentativas: 1, redirecionar: false };
    }

    if (base === 'ultraformer') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_ULTRAFORMER_SEM_REGIAO, tentativas: 1, redirecionar: false };
    }

    if (base === 'lavieen') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_LAVIEEN_SEM_REGIAO, tentativas: 1, redirecionar: false };
    }
  }

  // Na etapa de pergunta 2, tentar interpretar com aproximação e, se falhar, perguntar pela ultima vez.
  if (tentativasAtuais === 1) {
    const procedimentoAproximado = detectarProcedimento(texto);
    if (procedimentoCorrespondeBase(procedimentoAproximado, base)) {
      return { procedimento: procedimentoAproximado, base, precisaPerguntar: false, respostaPergunta: '', tentativas: 0, redirecionar: false };
    }

    if (base === 'botox') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_BOTOX_DESAMBIGUACAO, tentativas: 2, redirecionar: false };
    }

    if (base === 'ultraformer') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_ULTRAFORMER_OPCOES, tentativas: 2, redirecionar: false };
    }

    if (base === 'lavieen') {
      return { procedimento: null, base, precisaPerguntar: true, respostaPergunta: RESPOSTA_LAVIEEN_OPCOES, tentativas: 2, redirecionar: false };
    }
  }

  // Depois de 2 perguntas, se ainda nao entender, redirecionar.
  const procedimentoAproximadoFinal = detectarProcedimento(texto);
  if (procedimentoCorrespondeBase(procedimentoAproximadoFinal, base)) {
    return { procedimento: procedimentoAproximadoFinal, base, precisaPerguntar: false, respostaPergunta: '', tentativas: 0, redirecionar: false };
  }

  return { procedimento: null, base, precisaPerguntar: false, respostaPergunta: '', tentativas: tentativasAtuais, redirecionar: true };

  return { procedimento: null, base: null, precisaPerguntar: false, respostaPergunta: '', tentativas: 0, redirecionar: false };
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

function respostaContatoDiretoPorCidade(cidade = '') {
  const cidadeNorm = normalizeText(cidade);
  const unidade = unidades.find((u) => u.cidade === cidadeNorm);
  if (!unidade) return null;

  return `Perfeito 😊\n\n📍 ${unidade.nomeCompleto}\n\n📞 ${unidade.telefone}\n\nO agendamento é feito direto por esse WhatsApp.`;
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
    const contextoInicial = req.body?.contexto || {};
    const contexto = sincronizarLiaContext(contextoInicial, pergunta);
    const statusOriginal = res.status.bind(res);
    res.status = (code) => {
      const statusResponse = statusOriginal(code);
      const jsonOriginal = statusResponse.json.bind(statusResponse);
      statusResponse.json = (payload) => {
        if (payload && typeof payload === 'object' && Object.prototype.hasOwnProperty.call(payload, 'contexto')) {
          const contextoResposta = payload.contexto || {};
          payload.contexto = sincronizarLiaContext({ ...contexto, ...contextoResposta }, pergunta);
        }
        return jsonOriginal(payload);
      };
      return statusResponse;
    };
    const unidadeDetectada = identificarCidade(pergunta);
    const cidadeDetectada = unidadeDetectada ? unidadeDetectada.cidade : null;
    const procedimentoDetectadoMensagem = detectarProcedimento(pergunta);
    const pagamentoDetectado = interpretarFormaPagamentoPorRespostaCurta(pergunta) || detectarFormaPagamento(pergunta);
    const contextoSemIntencao = { ...contexto };
    delete contextoSemIntencao.intencao;
    const intencaoAtual = classificarIntencaoPrincipal(pergunta, contextoSemIntencao);
    if (!intencaoContextoCompativel(contexto, intencaoAtual, pergunta, cidadeDetectada)) {
      delete contexto.intencao;
      delete contexto.etapa;
      if (contexto.liaContext && typeof contexto.liaContext === 'object') {
        contexto.liaContext = { ...contexto.liaContext, etapa: null };
      }
    }
    const intencaoPrincipal = intencaoAtual;
    const intencaoInterpretada = classificarIntencaoMensagem(pergunta, contexto);
    const procedimentoBaseMensagem = detectarBaseProcedimentoAmbiguo(pergunta);
    const procedimentoResolvidoPorBase = procedimentoBaseMensagem ? resolverProcedimentoPorBase(procedimentoBaseMensagem, pergunta) : null;
    const procedimentoSelecionadoMensagem = procedimentoResolvidoPorBase || (
      procedimentoBaseMensagem === 'botox' ? 'Botox' :
      procedimentoBaseMensagem === 'ultraformer' ? 'Ultraformer MPT' :
      procedimentoBaseMensagem === 'lavieen' ? 'Lavieen' :
      procedimentoBaseMensagem === 'preenchedor' ? 'Preenchedor' :
      procedimentoBaseMensagem === 'bioestimulador' ? 'Bioestimulador' :
      procedimentoBaseMensagem === 'endymed' ? 'Endymed' :
      procedimentoBaseMensagem === 'scizer' ? 'Scizer' :
      procedimentoDetectadoMensagem || null
    );

    console.log('PERGUNTA RECEBIDA:', pergunta);
    console.log('TEXTO NORMALIZADO:', msg);
    console.log('INTENCAO PRINCIPAL:', intencaoAtual);
    console.log('INTENCAO CLASSIFICADA:', intencaoInterpretada.categoria);
    console.log('CIDADE DETECTADA:', cidadeDetectada);
    console.log('PROCEDIMENTO DETECTADO:', procedimentoDetectadoMensagem);
    console.log('PAGAMENTO DETECTADO:', pagamentoDetectado);

    // Early return para aparelho/equipamento ANTES de qualquer outra lógica
    const procedimentoAtualNorm = normalizeText(contexto.procedimentoAtual || '');
    const eContextoUltraformer = procedimentoAtualNorm === 'ultraformer' || procedimentoAtualNorm.includes('ultraformer') || procedimentoAtualNorm === 'ultraformer mpt' || procedimentoAtualNorm.includes('ultraformer mpt');
    const temAparelhoNaMensagem = detectarConsultaAparelho(pergunta);
    
    if (temAparelhoNaMensagem && (eContextoUltraformer || detectarTermoUltraAproximado(pergunta))) {
      const respostaAparelho = 'Trabalhamos com o Ultraformer MPT original da Medsystems 😊\n\nCada unidade tem seu próprio aparelho.\n\nNão alugamos, não emprestamos e não usamos aparelhos compartilhados.\n\nSe quiser, também posso te explicar a diferença dele para versões antigas.';
      const procedimentoMantido = contexto.procedimentoAtual && (contexto.procedimentoAtual === 'Ultraformer MPT Full Face' || contexto.procedimentoAtual.includes('Ultraformer')) ? contexto.procedimentoAtual : 'ultraformer';
      return res.status(200).json({
        resposta: respostaAparelho,
        contexto: { ...contexto, intencao: 'aguardando_interesse', procedimentoAtual: procedimentoMantido }
      });
    }
    
    // Se mencionou aparelho e o contexto é ultraformer, mas a mensagem não menciona ultraformer explicitamente
    if (temAparelhoNaMensagem && eContextoUltraformer && !detectarTermoUltraAproximado(pergunta)) {
      const respostaAparelho = 'Trabalhamos com o Ultraformer MPT original da Medsystems 😊\n\nCada unidade tem seu próprio aparelho.\n\nNão alugamos, não emprestamos e não usamos aparelhos compartilhados.\n\nSe quiser, também posso te explicar a diferença dele para versões antigas.';
      const procedimentoMantido = contexto.procedimentoAtual || 'ultraformer';
      return res.status(200).json({
        resposta: respostaAparelho,
        contexto: { ...contexto, intencao: 'aguardando_interesse', procedimentoAtual: procedimentoMantido }
      });
    }

    if (!msg) {
      console.log('CAIU NO FALLBACK');
      return res.status(200).json({
        resposta: 'Desculpe, ainda estou aprendendo 😊\nMas posso te ajudar com nossos tratamentos. O que você gostaria de melhorar?'
      });
    }

    if (msg === 'cidade') {
      return res.status(200).json({
        resposta: RESPOSTA_CONFIRMAR_CIDADE_OFERTA,
        contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'whatsapp', ultimaPerguntaBot: RESPOSTA_CONFIRMAR_CIDADE_OFERTA }
      });
    }

    if (msg === 'pagamento') {
      return res.status(200).json({
        resposta: RESPOSTA_FORMA_PAGAMENTO,
        contexto: { ...contexto, intencao: 'confirmacao_oferta_aguardando_pagamento', ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO }
      });
    }

    if (msg.startsWith('midia0505')) {
      return res.status(200).json({ resposta: 'Correção registrada.' });
    }

    if (
      contexto.intencao === 'aguardando_cidade_contato_direto' &&
      (intencaoAtual === 'CONTATO' || !!cidadeDetectada || ehRespostaCurta(pergunta))
    ) {
      const cidadeContato = cidadeDetectada || contexto.cidadeAtual || contexto.cidade || null;
      if (!cidadeContato) {
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: { ...contexto, intencao: 'aguardando_cidade_contato_direto' }
        });
      }

      const respostaContato = respostaContatoDiretoPorCidade(cidadeContato);
      if (respostaContato) {
        return res.status(200).json({
          resposta: respostaContato,
          contexto: { ...contexto, cidade: cidadeContato, cidadeAtual: cidadeContato }
        });
      }
    }

    if (contextoComprovanteAtivo(contexto) && detectarPedidoContatoComprovante(pergunta)) {
      const cidadeCompra = cidadeDetectada || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade;

      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: {
            ...contexto,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante'
          }
        });
      }

      const respostaComprovante = gerarRespostaComprovanteUnidade(cidadeCompra);
      if (respostaComprovante) {
        return res.status(200).json({
          resposta: respostaComprovante,
          contexto: {
            ...contexto,
            cidade: cidadeCompra,
            cidadeAtual: cidadeCompra,
            cidadeCompra,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante',
            status_compra: 'em andamento'
          }
        });
      }
    }

    // ════ PRIORIDADE ABSOLUTA DA CAMADA CENTRAL ════
    if (intencaoPrincipal === 'HUMANO') {
      const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
      const cidadeAtual = cidadeDetectada || cidadeContexto;

      if (!cidadeAtual) {
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nMe fala sua cidade que te envio o contato da unidade mais próxima.',
          contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', cidadeAtual: undefined, tentativas_pergunta: 0 }
        });
      }

      const respostaHumano = respostaHumanoPorCidade(cidadeAtual);
      if (respostaHumano) {
        return res.status(200).json({
          resposta: respostaHumano,
          contexto: { cidade: cidadeAtual, cidadeAtual, tentativas_pergunta: 0 }
        });
      }
    }

    // 2) CONTATO
    if (intencaoPrincipal === 'CONTATO') {
      const cidadeParaLocalizar = cidadeDetectada || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade;
      
      if (!cidadeParaLocalizar) {
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nQual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: { ...contexto, intencao: 'aguardando_cidade_contato_direto', tentativas_pergunta: 0 }
        });
      }

      const respostaContatoDireto = respostaContatoDiretoPorCidade(cidadeParaLocalizar);
      if (respostaContatoDireto) {
        return res.status(200).json({
          resposta: respostaContatoDireto,
          contexto: { ...contexto, cidade: cidadeParaLocalizar, cidadeAtual: cidadeParaLocalizar, tentativas_pergunta: 0 }
        });
      }

      const respostaLocalizacao = responderIntencaoOperacional(
        identificarIntencaoOperacional(pergunta) || 'endereco',
        unidades.find((u) => u.cidade === cidadeParaLocalizar)
      );

      if (respostaLocalizacao) {
        return res.status(200).json({
          resposta: respostaLocalizacao.resposta,
          contexto: { ...contexto, ...respostaLocalizacao.contexto, tentativas_pergunta: 0 }
        });
      }
    }

    // 3) PAGAMENTO
    if (intencaoPrincipal === 'PAGAMENTO' && detectarConfirmacaoPagamento(pergunta)) {
      const cidadeCompra = contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || cidadeDetectada;

      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: { ...contexto, aguardandoComprovante: true, aguardando_comprovante: true, intencao: 'aguardando_cidade_comprovante' }
        });
      }

      const respostaComprovante = gerarRespostaComprovanteUnidade(cidadeCompra);
      if (respostaComprovante) {
        return res.status(200).json({
          resposta: respostaComprovante,
          contexto: {
            ...contexto,
            cidade: cidadeCompra,
            cidadeAtual: cidadeCompra,
            cidadeCompra,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante',
            statusPagamento: 'confirmado',
            status_compra: 'em andamento'
          }
        });
      }
    }

    if (intencaoPrincipal === 'PRECO' && detectarPrecoProcedimento(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_PRECO_SISTEMA,
        contexto: {
          ...contexto,
          intencao: 'aguardando_interesse',
          ultimaPerguntaBot: RESPOSTA_PRECO_SISTEMA
        }
      });
    }

    if (contextoComprovanteAtivo(contexto) && detectarConfirmacaoPagamento(pergunta)) {
      const cidadeCompra = contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || cidadeDetectada;

      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: { ...contexto, aguardandoComprovante: true, aguardando_comprovante: true, intencao: 'aguardando_cidade_comprovante' }
        });
      }

      const respostaComprovante = gerarRespostaComprovanteUnidade(cidadeCompra);
      if (respostaComprovante) {
        return res.status(200).json({
          resposta: respostaComprovante,
          contexto: {
            ...contexto,
            cidade: cidadeCompra,
            cidadeAtual: cidadeCompra,
            cidadeCompra,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante',
            statusPagamento: 'confirmado',
            status_compra: 'em andamento'
          }
        });
      }
    }

    if (contexto.intencao === 'aguardando_cidade_comprovante') {
      const cidadeCompra = cidadeDetectada || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade;
      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: ehRespostaCurta(pergunta)
            ? RESPOSTA_QUAL_UNIDADE
            : 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?',
          contexto: { ...contexto, aguardandoComprovante: true, aguardando_comprovante: true, intencao: 'aguardando_cidade_comprovante' }
        });
      }

      const respostaComprovante = gerarRespostaComprovanteUnidade(cidadeCompra);
      if (respostaComprovante) {
        return res.status(200).json({
          resposta: respostaComprovante,
          contexto: {
            ...contexto,
            cidade: cidadeCompra,
            cidadeAtual: cidadeCompra,
            cidadeCompra,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante',
            statusPagamento: 'confirmado',
            status_compra: 'em andamento'
          }
        });
      }
    }

    // ════ SE COMPRA JÁ FOI FINALIZADA, NÃO CONTINUAR O FLUXO ════
    if (contexto.intencao === 'compra_finalizada_sistema' || contexto.intencao === 'compra_finalizada_equipe') {
      return res.status(200).json({
        resposta: 'Perfeito 😊\n\nSe precisar, te ajudo com os próximos passos ou te direciono para a equipe da unidade.',
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - DETECÇÃO DE INTENÇÃO ════
    if (detectarIntencaoCompra(pergunta)) {
      const cidadeCompra = cidadeDetectada || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || null;

      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: RESPOSTA_QUAL_UNIDADE,
          contexto: {
            ...contexto,
            intencao: 'fluxo_compra_aguardando_cidade_sistema',
            procedimento_selecionado: procedimentoSelecionadoMensagem || contexto.procedimento_selecionado || undefined,
            procedimentoBase: procedimentoBaseMensagem || contexto.procedimentoBase || undefined,
            status_compra: 'em andamento'
          }
        });
      }

      return res.status(200).json({
        resposta: RESPOSTA_OPCOES_COMPRA,
        contexto: {
          ...contexto,
          intencao: 'fluxo_compra_opcoes',
          cidade: cidadeCompra,
          procedimento_selecionado: procedimentoSelecionadoMensagem || contexto.procedimento_selecionado || undefined,
          procedimentoBase: procedimentoBaseMensagem || contexto.procedimentoBase || undefined,
          status_compra: 'em andamento'
        }
      });
    }

    // ════ FLUXO DE COMPRA - CONTEXTO AGUARDANDO ESCOLHA (EQUIPE OU SISTEMA) ════
    if (
      contexto.intencao === 'fluxo_compra_opcoes' &&
      (intencaoAtual === 'COMPRA' || detectarEscolhaEquipe(pergunta) || detectarEscolhaSistema(pergunta) || ['1', '2'].includes(msg))
    ) {
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
            contexto: {
              ...contexto,
              intencao: 'fluxo_compra_aguardando_cidade_sistema',
              procedimento_selecionado: procedimentoSelecionadoMensagem || contexto.procedimento_selecionado || undefined,
              procedimentoBase: procedimentoBaseMensagem || contexto.procedimentoBase || undefined
            }
          });
        }

        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: {
            ...contexto,
            intencao: 'fluxo_compra_aguardando_pagamento',
            cidadeCompra: cidadeAtual,
            intencaoCompra: 'sistema',
            procedimento_selecionado: procedimentoSelecionadoMensagem || contexto.procedimento_selecionado || undefined,
            procedimentoBase: procedimentoBaseMensagem || contexto.procedimentoBase || undefined
          }
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
        // Verificar se mencionou um procedimento
        const perguntaNorm = normalizeText(pergunta);
        const nomesCidade = unidadeDetectada ? unidadeDetectada.nomes.map((n) => normalizeText(n)) : [];
        const mensagemApenasCidade = perguntaNorm === cidadeAtual || nomesCidade.includes(perguntaNorm);
        const procedimentoDetectado = mensagemApenasCidade ? null : detectarProcedimento(pergunta);
        
        // Verificar se a cidade tem links de campanha (Brasília, Campinas, Goiânia, Palmas ou São Paulo)
        const cidadesComLinks = ['brasilia', 'campinas', 'goiania', 'palmas', 'saopaulo'];
        if (procedimentoDetectado && cidadesComLinks.includes(cidadeAtual)) {
          // Tentar buscar link da campanha
          const respostaOferta = gerarRespostaOfertaCampanha(procedimentoDetectado, cidadeAtual);
          if (respostaOferta) {
            return res.status(200).json({
              resposta: respostaOferta,
              contexto: {
                ...contexto,
                intencao: 'fluxo_pagamento_aguardando_confirmacao',
                cidadeCompra: cidadeAtual,
                cidadeAtual: cidadeAtual,
                intencaoCompra: 'sistema',
                procedimento: procedimentoDetectado,
                procedimentoAtual: procedimentoDetectado,
                aguardandoComprovante: true,
                aguardando_comprovante: true,
                status_compra: 'em andamento'
              }
            });
          } else {
            // Link não encontrado, redirecionar para WhatsApp
            const respostaWhatsapp = respostaWhatsappPorCidade(cidadeAtual);
            if (respostaWhatsapp) {
              return res.status(200).json({
                resposta: `Ainda não temos o link direto dessa oferta 😊\n\nVou te direcionar para a equipe da unidade 👇\n\n${respostaWhatsapp}`,
                contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra: cidadeAtual, intencaoCompra: 'equipe' }
              });
            }
          }
        }
        
        // Se não mencionar procedimento ou cidade não tem links, continuar com forma de pagamento
        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: {
            ...contexto,
            intencao: 'fluxo_compra_aguardando_pagamento',
            cidadeCompra: cidadeAtual,
            intencaoCompra: 'sistema',
            procedimento_selecionado: procedimentoSelecionadoMensagem || contexto.procedimento_selecionado || undefined,
            procedimentoBase: procedimentoBaseMensagem || contexto.procedimentoBase || undefined
          }
        });
      }

      return res.status(200).json({
        resposta: RESPOSTA_QUAL_UNIDADE,
        contexto: contexto
      });
    }

    // ════ FLUXO DE COMPRA - SISTEMA AGUARDANDO FORMA DE PAGAMENTO ════
    if (contexto.intencao === 'fluxo_compra_aguardando_pagamento') {
      const reconhecimentoLiaCompra = processarMensagemLia(pergunta);
      if (reconhecimentoLiaCompra && reconhecimentoLiaCompra.intent === 'ULTRAFORMER_FULL_FACE') {
        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: {
            ...contexto,
            intencao: 'fluxo_compra_aguardando_pagamento',
            procedimento: 'Ultraformer MPT Full Face',
            procedimentoAtual: 'Ultraformer MPT Full Face',
            procedimento_selecionado: 'Ultraformer MPT Full Face',
            procedimentoBase: 'ultraformer',
            status_compra: 'em andamento'
          }
        });
      }

      const formaPagamento = interpretarFormaPagamentoPorRespostaCurta(pergunta) || detectarFormaPagamento(pergunta);
      const cidadeCompra = contexto.cidadeCompra || cidadeDetectada;

      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: RESPOSTA_QUAL_UNIDADE,
          contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento' }
        });
      }

      if (formaPagamento === 'pix') {
        return res.status(200).json({
          resposta: gerarRespostaPix(cidadeCompra),
          contexto: { 
            cidade: cidadeCompra, 
            cidadeAtual: cidadeCompra,
            intencao: 'fluxo_pagamento_aguardando_confirmacao',
            intencaoCompra: 'sistema', 
            formaPagamento: 'pix', 
            cidadeCompra,
            procedimentoAtual: contexto.procedimento || contexto.procedimento_selecionado || undefined,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            procedimento_selecionado: contexto.procedimento_selecionado || undefined,
            procedimentoBase: contexto.procedimentoBase || undefined,
            status_compra: 'em andamento'
          }
        });
      }

      if (formaPagamento === 'cartao') {
        const desambiguacao = resolverDesambiguacaoProcedimentoCartao(pergunta, contexto);
        if (desambiguacao.redirecionar) {
          const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
          if (respostaWhatsapp) {
            return res.status(200).json({
              resposta: `${RESPOSTA_DIRECIONAR_LINK_ERRADO}\n\n${respostaWhatsapp}`,
              contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', status_compra: 'em andamento' }
            });
          }
        }

        if (desambiguacao.precisaPerguntar) {
          return res.status(200).json({
            resposta: desambiguacao.respostaPergunta,
            contexto: {
              ...contexto,
              intencao: 'fluxo_pagamento_aguardando_procedimento_cartao',
              formaPagamento: 'cartao',
              cidadeCompra,
              procedimentoBase: desambiguacao.base,
              tentativas_pergunta: desambiguacao.tentativas,
              perguntouProcedimentoCartao: true,
              status_compra: 'em andamento'
            }
          });
        }

        const procedimentoInfo = detectarProcedimentoDetalhado(pergunta);
        const procedimentoDoContexto = ['Botox', 'Ultraformer MPT', 'Lavieen'].includes(contexto.procedimento_selecionado)
          ? null
          : contexto.procedimento_selecionado;
        const procedimentoDetectado = desambiguacao.procedimento || procedimentoInfo.procedimento || contexto.procedimento || procedimentoDoContexto;

        if (!procedimentoDetectado) {
          const tentativasPergunta = Number(contexto.tentativas_pergunta || 0) + 1;
          if (tentativasPergunta >= 2) {
            const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
            if (respostaWhatsapp) {
              return res.status(200).json({
                resposta: `${RESPOSTA_DIRECIONAR_LINK_ERRADO}\n\n${respostaWhatsapp}`,
                contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', tentativas_pergunta: 0, status_compra: 'em andamento' }
              });
            }
          }

          return res.status(200).json({
            resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
            contexto: {
              ...contexto,
              intencao: 'fluxo_pagamento_aguardando_procedimento_cartao',
              formaPagamento: 'cartao',
              cidadeCompra,
              procedimentoBase: contexto.procedimentoBase || null,
              tentativas_pergunta: tentativasPergunta,
              perguntouProcedimentoCartao: true,
              status_compra: 'em andamento'
            }
          });
        }

        const respostaOferta = gerarRespostaOfertaCampanha(procedimentoDetectado, cidadeCompra, 'texto');
        if (respostaOferta) {
          return res.status(200).json({
            resposta: respostaOferta,
            contexto: {
              ...contexto,
              intencao: 'fluxo_pagamento_aguardando_confirmacao',
              formaPagamento: 'cartao',
              cidadeCompra,
              cidadeAtual: cidadeCompra,
              procedimentoBase: desambiguacao.base || contexto.procedimentoBase || null,
              tentativas_pergunta: 0,
              procedimento: procedimentoDetectado,
              procedimentoAtual: procedimentoDetectado,
              aguardandoComprovante: true,
              aguardando_comprovante: true,
              perguntouProcedimentoCartao: false,
              status_compra: 'em andamento'
            }
          });
        }

        const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: `Ainda não temos o link direto dessa oferta 😊\n\nVou te direcionar para a equipe da unidade 👇\n\n${respostaWhatsapp}`,
            contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', status_compra: 'em andamento' }
          });
        }

        return res.status(200).json({
          resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
          contexto: { 
            ...contexto,
            intencao: 'fluxo_pagamento_aguardando_procedimento_cartao',
            formaPagamento: 'cartao', 
            cidadeCompra,
            procedimentoBase: contexto.procedimentoBase || null,
            tentativas_pergunta: Number(contexto.tentativas_pergunta || 0) + 1,
            perguntouProcedimentoCartao: true,
            status_compra: 'em andamento'
          }
        });
      }

      // Se não entendeu a forma de pagamento, repetir
      return res.status(200).json({
        resposta: 'Desculpa, não entendi 😊\n\nQual será a forma de pagamento?\n\n1️⃣ Pix\n2️⃣ Cartão',
        contexto: contexto
      });
    }

    if (contexto.intencao === 'fluxo_pagamento_aguardando_procedimento_cartao') {
      const cidadeCompra = contexto.cidadeCompra || cidadeDetectada;
      if (!cidadeCompra) {
        return res.status(200).json({
          resposta: RESPOSTA_QUAL_UNIDADE,
          contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento' }
        });
      }

      const desambiguacao = resolverDesambiguacaoProcedimentoCartao(pergunta, contexto);
      if (desambiguacao.redirecionar) {
        const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
        if (respostaWhatsapp) {
          return res.status(200).json({
            resposta: `${RESPOSTA_DIRECIONAR_LINK_ERRADO}\n\n${respostaWhatsapp}`,
            contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', status_compra: 'em andamento' }
          });
        }
      }

      if (desambiguacao.precisaPerguntar) {
        return res.status(200).json({
          resposta: desambiguacao.respostaPergunta,
          contexto: {
            ...contexto,
            cidadeCompra,
            formaPagamento: 'cartao',
            procedimentoBase: desambiguacao.base,
            tentativas_pergunta: desambiguacao.tentativas,
            perguntouProcedimentoCartao: true,
            status_compra: 'em andamento'
          }
        });
      }

      const procedimentoInfo = detectarProcedimentoDetalhado(pergunta);
      const procedimentoDetectado = desambiguacao.procedimento || procedimentoInfo.procedimento || contexto.procedimento;

      if (!procedimentoDetectado) {
        if (contexto.perguntouProcedimentoCartao) {
          const tentativasPergunta = Number(contexto.tentativas_pergunta || 0) + 1;
          if (tentativasPergunta >= 2) {
            const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
            if (respostaWhatsapp) {
              return res.status(200).json({
                resposta: `${RESPOSTA_DIRECIONAR_LINK_ERRADO}\n\n${respostaWhatsapp}`,
                contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', tentativas_pergunta: 0, status_compra: 'em andamento' }
              });
            }
          }

          return res.status(200).json({
            resposta: 'Não consegui identificar o procedimento pelo nome informado 😊\n\nPode me dizer o nome mais próximo do tratamento?',
            contexto: {
              ...contexto,
              cidadeCompra,
              formaPagamento: 'cartao',
              tentativas_pergunta: tentativasPergunta,
              status_compra: 'em andamento'
            }
          });
        }

        return res.status(200).json({
          resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
          contexto: {
            ...contexto,
            cidadeCompra,
            formaPagamento: 'cartao',
            perguntouProcedimentoCartao: true,
            tentativas_pergunta: Number(contexto.tentativas_pergunta || 0) + 1,
            status_compra: 'em andamento'
          }
        });
      }

      const respostaOferta = gerarRespostaOfertaCampanha(procedimentoDetectado, cidadeCompra, 'texto');
      if (respostaOferta) {
        return res.status(200).json({
          resposta: respostaOferta,
          contexto: {
            ...contexto,
            intencao: 'fluxo_pagamento_aguardando_confirmacao',
            cidade: cidadeCompra,
            cidadeAtual: cidadeCompra,
            cidadeCompra,
            formaPagamento: 'cartao',
            procedimentoBase: desambiguacao.base || contexto.procedimentoBase || null,
            tentativas_pergunta: 0,
            procedimento: procedimentoDetectado,
            procedimentoAtual: procedimentoDetectado,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            perguntouProcedimentoCartao: false,
            status_compra: 'em andamento'
          }
        });
      }

      const respostaWhatsapp = respostaWhatsappPorCidade(cidadeCompra);
      if (respostaWhatsapp) {
        return res.status(200).json({
          resposta: `Ainda não temos o link direto dessa oferta 😊\n\nVou te direcionar para a equipe da unidade 👇\n\n${respostaWhatsapp}`,
          contexto: { ...contexto, intencao: 'compra_finalizada_equipe', cidadeCompra, intencaoCompra: 'equipe', status_compra: 'em andamento' }
        });
      }

      return res.status(200).json({
        resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
        contexto: { ...contexto, cidadeCompra, formaPagamento: 'cartao', tentativas_pergunta: Number(contexto.tentativas_pergunta || 0) + 1, status_compra: 'em andamento' }
      });
    }

    // ════ FLUXO DE PAGAMENTO - AGUARDANDO CONFIRMAÇÃO OU MUDANÇA ════
    if (contexto.intencao === 'fluxo_pagamento_aguardando_confirmacao') {
      if (respostaCurtaAposLink(pergunta)) {
        const cidadeCompra = contexto.cidadeCompra || contexto.cidadeAtual || contexto.cidade || cidadeDetectada;
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nDepois do pagamento, envie o comprovante para o WhatsApp da unidade para solicitar o agendamento.',
          contexto: {
            ...contexto,
            cidade: cidadeCompra || contexto.cidade,
            cidadeAtual: cidadeCompra || contexto.cidadeAtual,
            cidadeCompra: cidadeCompra || contexto.cidadeCompra,
            aguardandoComprovante: true,
            aguardando_comprovante: true,
            intencao: 'aguardando_cidade_comprovante',
            status_compra: 'em andamento'
          }
        });
      }

      // Verificar se cliente confirmou o pagamento
      if (detectarConfirmacaoPagamento(pergunta)) {
        return res.status(200).json({
          resposta: 'Perfeito 😊\n\nRecebemos a confirmação! Você irá receber um email com os detalhes da sua compra.\n\nMuitíssimo obrigado! Qualquer dúvida, estamos aqui 🎉',
          contexto: { 
            ...contexto, 
            intencao: 'compra_finalizada_sistema',
            statusPagamento: 'confirmado',
            status_compra: 'finalizada'
          }
        });
      }

      // Verificar se cliente quer mudar de forma de pagamento
      if (detectarMudancaFormaPagamento(pergunta)) {
        const formaPagamentoAtual = contexto.formaPagamento || 'desconhecida';
        const perguntaNormalizada = normalizeText(pergunta);
        const novaForma = perguntaNormalizada.includes('cartao') ? 'cartao' : 'pix';
        
        // Se solicitou cartão mas está em pix, oferecer cartão
        if (novaForma === 'cartao' && formaPagamentoAtual === 'pix') {
          const cidadeCompra = contexto.cidadeCompra || cidadeDetectada;
          if (!cidadeCompra) {
            return res.status(200).json({
              resposta: RESPOSTA_QUAL_UNIDADE,
              contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento' }
            });
          }

          return res.status(200).json({
            resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
            contexto: { 
              ...contexto, 
              intencao: 'fluxo_pagamento_aguardando_procedimento_cartao',
              formaPagamento: 'cartao',
              cidadeCompra,
              perguntouProcedimentoCartao: true,
              status_compra: 'em andamento'
            }
          });
        }
        
        // Se solicitou pix mas está em cartão, oferecer pix
        if (novaForma === 'pix' && formaPagamentoAtual === 'cartao') {
          const cidadeCompra = contexto.cidadeCompra || cidadeDetectada;
          if (!cidadeCompra) {
            return res.status(200).json({
              resposta: RESPOSTA_QUAL_UNIDADE,
              contexto: { ...contexto, intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento' }
            });
          }

          return res.status(200).json({
            resposta: gerarRespostaPix(cidadeCompra),
            contexto: { 
              ...contexto, 
              intencao: 'fluxo_pagamento_aguardando_confirmacao',
              formaPagamento: 'pix',
              cidadeCompra,
              status_compra: 'em andamento'
            }
          });
        }
      }

      // Se houver procedimento mencionado, oferecer link
      const procedimentoInfo = detectarProcedimentoDetalhado(pergunta);
      const procedimentoDetectado = procedimentoInfo.procedimento;

      if (procedimentoInfo.precisaConfirmarRegiao) {
        return res.status(200).json({
          resposta: RESPOSTA_ULTRAFORMER_SEM_REGIAO,
          contexto: { ...contexto, status_compra: 'em andamento' }
        });
      }

      if (procedimentoDetectado && contexto.cidadeCompra) {
        const cidadesComLinks = ['brasilia', 'campinas', 'goiania', 'palmas', 'saopaulo'];
        if (cidadesComLinks.includes(normalizeText(contexto.cidadeCompra).replace(/\s+/g, ''))) {
          const respostaOferta = gerarRespostaOfertaCampanha(procedimentoDetectado, contexto.cidadeCompra);
          if (respostaOferta) {
            return res.status(200).json({
              resposta: respostaOferta,
              contexto: { 
                ...contexto, 
                intencao: 'fluxo_pagamento_aguardando_confirmacao',
                procedimento: procedimentoDetectado,
                procedimentoAtual: procedimentoDetectado,
                cidadeAtual: contexto.cidadeCompra,
                aguardandoComprovante: true,
                aguardando_comprovante: true,
                status_compra: 'em andamento'
              }
            });
          }

          const respostaWhatsapp = respostaWhatsappPorCidade(contexto.cidadeCompra);
          if (respostaWhatsapp) {
            return res.status(200).json({
              resposta: `Ainda não temos o link direto dessa oferta 😊\n\nVou te direcionar para a equipe da unidade 👇\n\n${respostaWhatsapp}`,
              contexto: { ...contexto, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', status_compra: 'em andamento' }
            });
          }
        }
      }

      // Se nenhuma das opções acima, oferecer os próximos passos
      return res.status(200).json({
        resposta: 'Perfeito 😊\n\nDepois do pagamento, envie o comprovante para o WhatsApp da unidade para solicitar o agendamento.',
        contexto: {
          ...contexto,
          cidadeAtual: contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || cidadeDetectada,
          aguardandoComprovante: true,
          aguardando_comprovante: true,
          intencao: 'aguardando_cidade_comprovante',
          status_compra: 'em andamento'
        }
      });
    }

    const itemConfianca = encontrarBlocoConfianca(pergunta, contexto);
    if (itemConfianca && intencaoPrincipal !== 'PRECO' && contexto.intencao !== 'aguardando_aceite_oferta_semana') {
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

      const respostaConfianca = itemConfianca.resposta || '';
      const terminaComOfertaSemana = normalizeText(respostaConfianca).includes(normalizeText(RESPOSTA_FECHAMENTO_LEVE));

      return res.status(200).json({
        resposta: respostaConfianca,
        contexto: {
          intencao: terminaComOfertaSemana ? 'aguardando_aceite_oferta_semana' : 'aguardando_interesse',
          procedimentoAtual: 'confianca',
          ultimaPerguntaBot: terminaComOfertaSemana ? RESPOSTA_FECHAMENTO_LEVE : respostaConfianca
        }
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

      if (ehRespostaCurta(pergunta)) {
        return res.status(200).json({
          resposta: RESPOSTA_QUAL_UNIDADE,
          contexto
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

      if (ehRespostaCurta(pergunta)) {
        return res.status(200).json({
          resposta: RESPOSTA_QUAL_UNIDADE,
          contexto
        });
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

    if (
      normalizeText(contexto.ultimaPerguntaBot || '') === normalizeText(RESPOSTA_PRECO_SISTEMA) &&
      detectarConfirmacaoCurtaPosPrecoSistema(pergunta)
    ) {
      return res.status(200).json({
        resposta: RESPOSTA_CONTINUIDADE_PRECO_SISTEMA,
        contexto: {
          ...contexto,
          intencao: 'aguardando_interesse',
          ultimaPerguntaBot: RESPOSTA_CONTINUIDADE_PRECO_SISTEMA
        }
      });
    }

    const respostaCurtaContextual = interpretarRespostaCurtaContextual(pergunta, contexto);
    if (respostaCurtaContextual) {
      if (respostaCurtaContextual.tipo === 'procedimento') {
        const procedimento = respostaCurtaContextual.procedimento;
        const respostaProcedimento = procedimento === 'Ultraformer MPT Full Face'
          ? RESPOSTA_ULTRAFORMER_FULL_FACE_CONTEXTO_REGIAO
          : RESPOSTA_PROCEDIMENTO_CURTO_CONTEXTO.replace('{procedimento}', procedimento);

        return res.status(200).json({
          resposta: respostaProcedimento,
          contexto: {
            ...contexto,
            intencao: 'aguardando_interesse',
            procedimentoBase: respostaCurtaContextual.base,
            procedimentoFinal: procedimento,
            procedimento: procedimento,
            procedimentoAtual: procedimento,
            procedimento_selecionado: procedimento,
            ultimaPerguntaBot: respostaProcedimento
          }
        });
      }

      if (respostaCurtaContextual.tipo === 'cidade') {
        const cidadeAtual = respostaCurtaContextual.cidade;

        if (contexto.intencao === 'fluxo_compra_aguardando_cidade_equipe') {
          const respostaWhatsapp = respostaWhatsappPorCidade(cidadeAtual);
          if (respostaWhatsapp) {
            return res.status(200).json({
              resposta: respostaWhatsapp,
              contexto: { cidade: cidadeAtual, cidadeAtual, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: cidadeAtual }
            });
          }
        }

        if (contexto.intencao === 'fluxo_compra_aguardando_cidade_sistema') {
          return res.status(200).json({
            resposta: RESPOSTA_FORMA_PAGAMENTO,
            contexto: {
              ...contexto,
              intencao: 'fluxo_compra_aguardando_pagamento',
              cidadeCompra: cidadeAtual,
              cidade: cidadeAtual,
              cidadeAtual,
              intencaoCompra: 'sistema',
              ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO
            }
          });
        }

        if (contexto.intencao === 'aguardando_cidade_para_confirmacao_oferta') {
          return res.status(200).json({
            resposta: RESPOSTA_FORMA_PAGAMENTO,
            contexto: {
              ...contexto,
              cidade: cidadeAtual,
              cidadeAtual,
              intencao: 'confirmacao_oferta_aguardando_pagamento',
              intencaoCompra: 'sistema',
              ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO
            }
          });
        }

        if (contexto.intencao === 'aguardando_cidade_whatsapp') {
          const tipoLink = contexto.tipoLink || 'whatsapp';
          const respostaLink = tipoLink === 'oferta_semana'
            ? respostaOfertaSemanaPorCidade(cidadeAtual)
            : tipoLink === 'humano'
              ? respostaHumanoPorCidade(cidadeAtual)
              : respostaWhatsappPorCidade(cidadeAtual);

          if (respostaLink) {
            return res.status(200).json({
              resposta: respostaLink,
              contexto: { cidade: cidadeAtual, cidadeAtual }
            });
          }
        }

        if (contexto.intencao === 'aguardando_apenas_cidade') {
          const unidadeCurta = unidades.find((u) => u.cidade === cidadeAtual);
          if (unidadeCurta) {
            return res.status(200).json({
              resposta: `📍 ${unidadeCurta.nomeCompleto}\n\n${unidadeCurta.endereco}\n\n📞 ${unidadeCurta.telefone}`,
              contexto: { cidade: cidadeAtual, cidadeAtual }
            });
          }
        }

        return res.status(200).json({
          resposta: `Perfeito 😊\n\nVocê escolheu ${cidadeAtual === 'saopaulo' ? 'São Paulo' : cidadeAtual.charAt(0).toUpperCase() + cidadeAtual.slice(1)}.`,
          contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual }
        });
      }

      if (respostaCurtaContextual.tipo === 'pagamento') {
        const cidadeAtual = contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || null;
        const forma = respostaCurtaContextual.formaPagamento;

        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_CONFIRMAR_CIDADE_OFERTA,
            contexto: { ...contexto, intencao: 'aguardando_cidade_para_confirmacao_oferta', ultimaPerguntaBot: RESPOSTA_CONFIRMAR_CIDADE_OFERTA }
          });
        }

        if (contexto.intencao === 'confirmacao_oferta_aguardando_pagamento') {
          const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
          if (respostaOferta) {
            return res.status(200).json({
              resposta: respostaOferta,
              contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual, formaPagamento: forma, intencao: 'aguardando_interesse' }
            });
          }
        }

        if (forma === 'pix') {
          return res.status(200).json({
            resposta: gerarRespostaPix(cidadeAtual),
            contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual, cidadeCompra: cidadeAtual, formaPagamento: 'pix', intencao: 'fluxo_pagamento_aguardando_confirmacao' }
          });
        }

        return res.status(200).json({
          resposta: 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?',
          contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual, cidadeCompra: cidadeAtual, formaPagamento: 'cartao', intencao: 'fluxo_pagamento_aguardando_procedimento_cartao' }
        });
      }
    }

    // Continuação de contexto — cliente fez follow-up após resposta sobre procedimento/oferta
    if (intencaoPrincipal === 'CONTATO') {
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
        const respostaInteresse = `Perfeito 😊\n\nMe fala qual é a sua principal preocupação${sufixo} que já te preparo as melhores opções da semana 😉`;

        return res.status(200).json({
          resposta: respostaInteresse,
          contexto: { ...contexto, ultimaPerguntaBot: respostaInteresse }
        });
      }
    }

    if (contexto.intencao === 'aguardando_cidade_para_confirmacao_oferta') {
      const cidadeNoMsg = unidadeDetectada ? unidadeDetectada.cidade : null;
      const cidadeAtual = cidadeNoMsg || contexto.cidadeAtual || contexto.cidade || null;
      const formaPagamentoContexto = contexto.formaPagamento || contexto?.liaContext?.formaPagamento || null;
      const formaPagamentoMensagem = interpretarFormaPagamentoPorRespostaCurta(pergunta) || detectarFormaPagamento(pergunta);
      const formaPagamentoAtual = formaPagamentoMensagem || formaPagamentoContexto;

      if (!cidadeAtual) {
        return res.status(200).json({
          resposta: RESPOSTA_CONFIRMAR_CIDADE_OFERTA,
          contexto: { ...contexto, intencao: 'aguardando_cidade_para_confirmacao_oferta', ultimaPerguntaBot: RESPOSTA_CONFIRMAR_CIDADE_OFERTA }
        });
      }

      if (formaPagamentoAtual) {
        const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
        if (respostaOferta) {
          return res.status(200).json({
            resposta: respostaOferta,
            contexto: {
              ...contexto,
              cidade: cidadeAtual,
              cidadeAtual,
              formaPagamento: formaPagamentoAtual,
              intencao: 'aguardando_interesse'
            }
          });
        }
      }

      return res.status(200).json({
        resposta: RESPOSTA_FORMA_PAGAMENTO,
        contexto: {
          ...contexto,
          cidade: cidadeAtual,
          cidadeAtual,
          intencao: 'confirmacao_oferta_aguardando_pagamento',
          intencaoCompra: 'sistema',
          ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO
        }
      });
    }

    if (contexto.intencao === 'confirmacao_oferta_aguardando_pagamento') {
      const cidadeAtual = contexto.cidadeAtual || contexto.cidade || cidadeDetectada || null;
      const formaPagamentoMensagem = interpretarFormaPagamentoPorRespostaCurta(pergunta) || detectarFormaPagamento(pergunta);
      const formaPagamentoAtual = formaPagamentoMensagem || contexto.formaPagamento || contexto?.liaContext?.formaPagamento || null;

      if (!cidadeAtual) {
        return res.status(200).json({
          resposta: RESPOSTA_CONFIRMAR_CIDADE_OFERTA,
          contexto: { ...contexto, intencao: 'aguardando_cidade_para_confirmacao_oferta', ultimaPerguntaBot: RESPOSTA_CONFIRMAR_CIDADE_OFERTA }
        });
      }

      if (!formaPagamentoAtual) {
        return res.status(200).json({
          resposta: RESPOSTA_FORMA_PAGAMENTO,
          contexto: {
            ...contexto,
            cidade: cidadeAtual,
            cidadeAtual,
            intencao: 'confirmacao_oferta_aguardando_pagamento',
            ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO
          }
        });
      }

      const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
      if (respostaOferta) {
        return res.status(200).json({
          resposta: respostaOferta,
          contexto: {
            ...contexto,
            cidade: cidadeAtual,
            cidadeAtual,
            formaPagamento: formaPagamentoAtual,
            intencao: 'aguardando_interesse'
          }
        });
      }
    }

    if (contexto.intencao === 'aguardando_aceite_oferta_semana') {
      const cidadeContexto = contexto.cidadeAtual || contexto.cidade || null;
      const cidadeAtual = cidadeDetectada || cidadeContexto;
      const formaPagamentoContexto = contexto.formaPagamento || contexto?.liaContext?.formaPagamento || null;
      const aceitouOferta = detectarConfirmacaoOferta(pergunta) || detectarInteresseFechamento(pergunta) || detectarConfirmacao(pergunta) || ehRespostaCurta(pergunta);

      if (aceitouOferta) {
        if (!cidadeAtual) {
          return res.status(200).json({
            resposta: RESPOSTA_CONFIRMAR_CIDADE_OFERTA,
            contexto: {
              ...contexto,
              intencao: 'aguardando_cidade_para_confirmacao_oferta',
              cidadeAtual: cidadeAtual || undefined,
              ultimaPerguntaBot: RESPOSTA_CONFIRMAR_CIDADE_OFERTA
            }
          });
        }

        if (!formaPagamentoContexto) {
          return res.status(200).json({
            resposta: RESPOSTA_FORMA_PAGAMENTO,
            contexto: {
              ...contexto,
              cidade: cidadeAtual,
              cidadeAtual,
              intencao: 'confirmacao_oferta_aguardando_pagamento',
              intencaoCompra: 'sistema',
              ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO
            }
          });
        }

        const respostaOferta = respostaOfertaSemanaPorCidade(cidadeAtual);
        if (respostaOferta) {
          return res.status(200).json({
            resposta: respostaOferta,
            contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual, formaPagamento: formaPagamentoContexto, intencao: 'aguardando_interesse' }
          });
        }
      }

      return res.status(200).json({
        resposta: 'Perfeito 😊\n\nSe você quiser seguir com a oferta da semana, me responde "quero" que eu te envio agora.',
        contexto: { ...contexto, intencao: 'aguardando_aceite_oferta_semana', ultimaPerguntaBot: 'Perfeito 😊\n\nSe você quiser seguir com a oferta da semana, me responde "quero" que eu te envio agora.' }
      });
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
          contexto: {
            ...contexto,
            intencao: 'aguardando_aceite_oferta_semana',
            passosConducao: passos,
            cidade: cidadeAtual || undefined,
            cidadeAtual: cidadeAtual || undefined,
            ultimaPerguntaBot: RESPOSTA_FECHAMENTO_LEVE
          }
        });
      }

      const perguntaConducao = perguntaContinuidadePorProblema(contexto.procedimentoAtual || '');
      const respostaConducao = perguntaConducao || 'O que mais te incomoda hoje?';

      return res.status(200).json({
        resposta: respostaConducao,
        contexto: {
          ...contexto,
          passosConducao: passos,
          cidade: cidadeAtual || undefined,
          cidadeAtual: cidadeAtual || undefined,
          ultimaPerguntaBot: respostaConducao
        }
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



    const aguardandoRegiaoUltraformer =
      contexto.intencao === 'aguardando_regiao_ultraformer' ||
      (
        contexto.procedimentoBase === 'ultraformer' &&
        normalizeText(contexto.ultimaPerguntaBot || '') === normalizeText(RESPOSTA_ULTRAFORMER_SEM_REGIAO)
      );

    if (aguardandoRegiaoUltraformer && detectarRespostaRegiaoUltraformerRosto(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_ULTRAFORMER_FULL_FACE_CONTEXTO_REGIAO,
        contexto: {
          ...contexto,
          intencao: 'aguardando_interesse',
          procedimentoBase: 'ultraformer',
          procedimentoFinal: 'Ultraformer MPT Full Face',
          procedimento: 'Ultraformer MPT Full Face',
          procedimentoAtual: 'Ultraformer MPT Full Face',
          procedimento_selecionado: 'Ultraformer MPT Full Face',
          ultimaPerguntaBot: RESPOSTA_ULTRAFORMER_FULL_FACE_CONTEXTO_REGIAO
        }
      });
    }

    const reconhecimentoLia = processarMensagemLia(pergunta);
    const ultraFullFaceAproximado = reconhecimentoLia && reconhecimentoLia.intent === 'ULTRAFORMER_FULL_FACE';
    const ultraSemRegiao = reconhecimentoLia && reconhecimentoLia.intent === 'ULTRAFORMER_GENERICO';
    const intencoesFluxoCompra = [
      'fluxo_compra_opcoes',
      'fluxo_compra_aguardando_cidade_sistema',
      'fluxo_compra_aguardando_pagamento',
      'fluxo_pagamento_aguardando_procedimento_cartao'
    ];
    const emFluxoCompra = intencoesFluxoCompra.includes(contexto.intencao);

    if (ultraFullFaceAproximado && emFluxoCompra) {
      return res.status(200).json({
        resposta: RESPOSTA_FORMA_PAGAMENTO,
        contexto: {
          ...contexto,
          intencao: 'fluxo_compra_aguardando_pagamento',
          procedimento: 'Ultraformer MPT Full Face',
          procedimentoAtual: 'Ultraformer MPT Full Face',
          procedimento_selecionado: 'Ultraformer MPT Full Face',
          procedimentoBase: 'ultraformer',
          status_compra: 'em andamento'
        }
      });
    }

    if (ultraFullFaceAproximado) {
      return res.status(200).json({
        resposta: reconhecimentoLia.resposta,
        contexto: {
          ...contexto,
          intencao: 'aguardando_interesse',
          procedimento: 'Ultraformer MPT Full Face',
          procedimentoAtual: 'Ultraformer MPT Full Face',
          procedimento_selecionado: 'Ultraformer MPT Full Face',
          procedimentoBase: 'ultraformer'
        }
      });
    }

    if (ultraSemRegiao) {
      return res.status(200).json({
        resposta: reconhecimentoLia.resposta,
        contexto: {
          ...contexto,
          intencao: 'aguardando_regiao_ultraformer',
          procedimentoBase: 'ultraformer',
          procedimento: 'Ultraformer MPT',
          procedimentoAtual: 'Ultraformer MPT',
          ultimaPerguntaBot: RESPOSTA_ULTRAFORMER_SEM_REGIAO
        }
      });
    }

    if (detectarPedidoOfertasSistema(pergunta)) {
      const contextoAtualizado = { ...contexto, intencao: 'aguardando_interesse' };
      delete contextoAtualizado.tipoLink;

      return res.status(200).json({
        resposta: RESPOSTA_PRECO_SISTEMA,
        contexto: { ...contextoAtualizado, ultimaPerguntaBot: RESPOSTA_PRECO_SISTEMA }
      });
    }

    if (intencaoPrincipal === 'PRECO' && detectarInteresseFechamento(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_PRECO_SISTEMA,
        contexto: { ...contexto, intencao: 'aguardando_interesse', ultimaPerguntaBot: RESPOSTA_PRECO_SISTEMA }
      });
    }

    if (intencaoPrincipal === 'PRECO' && detectarPreco(pergunta)) {
      return res.status(200).json({
        resposta: RESPOSTA_PRECO_SISTEMA,
        contexto: { ...contexto, intencao: 'aguardando_interesse', ultimaPerguntaBot: RESPOSTA_PRECO_SISTEMA }
      });
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

    if (intencaoPrincipal === 'CONTATO' && intencao) {
      const respostaOperacional = responderIntencaoOperacional(intencao, unidade);
      if (respostaOperacional) {
        return res.status(200).json(respostaOperacional);
      }
    }

    if (intencaoPrincipal === 'CONTATO' && cidadeDetectada && unidadeDetectada) {
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