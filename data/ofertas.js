(function (globalScope) {
  'use strict';

  const PROCEDURES = [
    { name: 'Botox Facial Terço Superior Com Retorno', pix: 975.24, group: 'botox' },
    { name: 'Botox Suor Axilar', pix: 1644.30, group: 'botox' },
    { name: 'Preenchedor Facial', pix: 975.24, group: 'preenchedor' },
    { name: 'Bioestimulador Diamond', pix: 1927.80, group: 'diamond' },
    { name: 'Ultraformer MPT Full Face', pix: 2516.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Pálpebras', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)', pix: 2012.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Papada', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Bichectomia', pix: 2012.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Terço Inferior', pix: 2012.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Abdome', pix: 2516.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Flancos', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Colo', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Gordura do Sutiã', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Gordura Pré-Axilar', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Monte de Vênus', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Bananinha', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Braços Região do Tchau', pix: 2012.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Joelho', pix: 2012.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Interno de Coxa', pix: 2516.85, group: 'ultraformer' },
    { name: 'Ultraformer MPT Mãos', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Rejuvenescimento Íntimo', pix: 1288.35, group: 'ultraformer' },
    { name: 'Ultraformer MPT Bumbum Up', pix: 2516.85, group: 'ultraformer' },
    { name: 'Scizer Corporal Por Região', pix: 975.24, group: 'scizer' },
    { name: 'Lavieen BB Laser Facial - 3 sessões', pix: 1927.80, group: 'lavieen' },
    { name: 'Lavieen Facial Completo - 3 sessões', pix: 1927.80, group: 'lavieen' },
    { name: 'Lavieen Melasma Facial - 3 sessões', pix: 1927.80, group: 'lavieen' },
    { name: 'Lavieen Face + Pescoço + Colo - 3 sessões', pix: 2557.80, group: 'lavieen' },
    { name: 'Lavieen Facial + Pescoço - 3 sessões', pix: 2242.80, group: 'lavieen' },
    { name: 'Lavieen Olheiras - 3 sessões', pix: 975.24, group: 'lavieen' },
    { name: 'Lavieen Pescoço + Colo - 3 sessões', pix: 1530.90, group: 'lavieen' },
    { name: 'Lavieen Capilar - 3 sessões', pix: 1927.80, group: 'lavieen' },
    { name: 'Lavieen Mãos - 3 sessões', pix: 975.24, group: 'lavieen' },
    { name: 'Microagulhamento Robótico - 3 sessões', pix: 1927.80, group: 'microagulhamento' },
    { name: 'Endymed Radiofrequência 3DEEP - 6 sessões', pix: 1644.30, group: 'endymed' },
    { name: 'Hollywood Peel - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Despigmentação a Laser - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Laser Fracionado Pixel - 1 Sessão', pix: 975.24, group: 'luzpulsada' },
    { name: 'Laser Fracionado Código de Barras - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Laser Fracionado Pálpebras - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Laser Fracionado Glabela - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Luz Pulsada Facial - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Luz Pulsada Colo - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Luz Pulsada Mãos - 2 sessões', pix: 975.24, group: 'luzpulsada' },
    { name: 'Depilação a Laser (10 Sessões) — Axilas', pix: 693.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Virilha Completa (Incl. região perianal)', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Buço e Mento', pix: 693.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Barba Completa', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Barba Delimitada', pix: 871.50, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Rosto', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Perna Completa', pix: 2772.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Antebraço', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Meia Perna', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Coxa', pix: 1732.50, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Costas', pix: 2079.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Tórax e Abdome', pix: 2079.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Braço Completo', pix: 2079.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Bumbum', pix: 1386.00, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Virilha Delimitada', pix: 1039.50, group: 'depilacao' },
    { name: 'Depilação a Laser (10 Sessões) — Pescoço Feminino', pix: 871.50, group: 'depilacao' }
  ];

  const DISCOUNT_RATES = {
    ultraformer: [0.45, 0.45, 0.45, 0.45], // 45%
    lavieen: [0.60, 0.60, 0.60, 0.60],     // 60%
    botox: [0.40, 0.40, 0.40, 0.40],       // 40%
    preenchedor: [0.40, 0.40, 0.40, 0.40], // 40%
    diamond: [0.45, 0.45, 0.45, 0.45],     // 45%
    scizer: [0.55, 0.55, 0.55, 0.55],      // 55%
    endymed: [0.60, 0.60, 0.60, 0.60],     // 60%
    microagulhamento: [0.20, 0.20, 0.20, 0.20], // 20%
    luzpulsada: [0.50, 0.50, 0.50, 0.50],  // 50% (ajustar se necessário)
    depilacao: [0.55, 0.55, 0.55, 0.55]    // 55% (ajustar se necessário)
  };

  const HIGHLIGHT_BOTOX_PROC_IDX = '0';
  const HIGHLIGHT_BONUS_TEXT = 'Um Peeling Facial + Uma Máscara de LED';
  const DEFAULT_OFFER_INDEX = '1';

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function getOfferIndexForGroup(group, requestedIndex) {
    const rates = DISCOUNT_RATES[group] || [];
    const parsed = String(requestedIndex);
    if (rates[Number(parsed)] !== undefined) {
      return parsed;
    }
    if (rates[Number(DEFAULT_OFFER_INDEX)] !== undefined) {
      return DEFAULT_OFFER_INDEX;
    }
    return '0';
  }

  // Normaliza nome do procedimento para buscar desconto correto por família
  function getDiscountGroupByProcedureName(procName) {
    const n = normalizeText(procName);
    if (n.includes('ultraformer mpt') || n.includes('ultraformer')) return 'ultraformer';
    if (n.includes('lavieen') || n.includes('laser lavieen')) return 'lavieen';
    if (n.includes('botox')) return 'botox';
    if (n.includes('preenchedor') || n.includes('preenchimento')) return 'preenchedor';
    if (n.includes('bioestimulador diamond') || n.includes('bioestimulador')) return 'diamond';
    if (n.includes('scizer')) return 'scizer';
    if (n.includes('endymed')) return 'endymed';
    if (n.includes('microagulhamento')) return 'microagulhamento';
    if (n.includes('luz pulsada') || n.includes('luz intensa pulsada')) return 'luzpulsada';
    if (n.includes('depilacao') || n.includes('depilação')) return 'depilacao';
    return null;
  }

  function calculateProcedureOffer(procIdx, offerIdx) {
    const parsedProcIdx = Number(procIdx);
    const procedure = PROCEDURES[parsedProcIdx];

    if (!procedure) {
      return null;
    }

    // Busca grupo normalizado para desconto
    let discountGroup = getDiscountGroupByProcedureName(procedure.name);
    // fallback: usa o grupo original se não encontrar
    if (!discountGroup) discountGroup = procedure.group;

    const safeOfferIndex = getOfferIndexForGroup(discountGroup, offerIdx);
    const discountRate = DISCOUNT_RATES[discountGroup][Number(safeOfferIndex)];
    const discountPct = Math.round(discountRate * 100);

    const originalPix = procedure.pix;
    const originalCard = originalPix / 10;
    const discountedPix = originalPix * (1 - discountRate);
    const discountedCard = discountedPix / 10;

    return {
      procIdx: String(parsedProcIdx),
      offerIdx: safeOfferIndex,
      procedure,
      discountRate,
      discountPct,
      originalPix,
      originalCard,
      discountedPix,
      discountedCard
    };
  }

  function detectOfferIndexFromQuestion(question) {
    const normalized = normalizeText(question);
    if (normalized.includes('close friends')) return '3';
    if (normalized.includes('sextou')) return '2';
    if (normalized.includes('semana')) return '0';
    if (normalized.includes('especial') || normalized.includes('oferta atual')) return '1';
    return DEFAULT_OFFER_INDEX;
  }

  const PROCEDURE_KEYWORDS = [
    { idx: '0', keywords: ['botox facial', 'botox rosto', 'botox'] },
    { idx: '1', keywords: ['suor axilar', 'axilar botox'] },
    { idx: '2', keywords: ['preenchedor'] },
    { idx: '3', keywords: ['bioestimulador', 'diamond'] },
    { idx: '4', keywords: ['ultraformer full face', 'full face'] },
    { idx: '7', keywords: ['papada'] },
    { idx: '10', keywords: ['ultraformer abdome', 'abdome'] },
    { idx: '11', keywords: ['ultraformer flancos', 'flancos'] },
    { idx: '23', keywords: ['scizer'] },
    { idx: '24', keywords: ['lavieen bb'] },
    { idx: '25', keywords: ['lavieen facial completo'] },
    { idx: '26', keywords: ['lavieen melasma'] },
    { idx: '29', keywords: ['lavieen olheiras'] },
    { idx: '31', keywords: ['lavieen capilar'] },
    { idx: '33', keywords: ['microagulhamento'] },
    { idx: '34', keywords: ['endymed'] },
    { idx: '35', keywords: ['hollywood peel'] },
    { idx: '44', keywords: ['depilacao axilas', 'axilas'] },
    { idx: '45', keywords: ['virilha completa'] },
    { idx: '50', keywords: ['perna completa'] },
    { idx: '54', keywords: ['depilacao costas', 'costas'] }
  ];

  function findProcedureFromQuestion(question) {
    const normalized = normalizeText(question);
    if (!normalized) {
      return null;
    }

    for (let i = 0; i < PROCEDURES.length; i += 1) {
      const nameNormalized = normalizeText(PROCEDURES[i].name);
      if (normalized.includes(nameNormalized)) {
        return String(i);
      }
    }

    for (let i = 0; i < PROCEDURE_KEYWORDS.length; i += 1) {
      const entry = PROCEDURE_KEYWORDS[i];
      for (let j = 0; j < entry.keywords.length; j += 1) {
        if (normalized.includes(normalizeText(entry.keywords[j]))) {
          return entry.idx;
        }
      }
    }

    return null;
  }

  const shared = {
    PROCEDURES,
    DISCOUNT_RATES,
    HIGHLIGHT_BOTOX_PROC_IDX,
    HIGHLIGHT_BONUS_TEXT,
    DEFAULT_OFFER_INDEX,
    normalizeText,
    formatBRL,
    getOfferIndexForGroup,
    calculateProcedureOffer,
    detectOfferIndexFromQuestion,
    findProcedureFromQuestion
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = shared;
  }

  globalScope.CRLaserOffers = shared;
})(typeof globalThis !== 'undefined' ? globalThis : this);
