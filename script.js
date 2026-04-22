'use strict';

/* ── TABELA REAL DE PROCEDIMENTOS ── */
/*
  pix          = valor original no Pix
  cardOriginal = pix / 10  (total cartão é pix × 1,2, parcelado em 12)
  Calculados em runtime — não armazenados aqui.
*/

const PROCEDURES = [
  // ── Botox
  { name: 'Botox Facial Terço Superior Com Retorno', pix: 975.24,  group: 'botox'            }, // 0
  { name: 'Botox Suor Axilar',                        pix: 1644.30, group: 'botox'            }, // 1
  // ── Preenchedor
  { name: 'Preenchedor Facial',                       pix: 975.24,  group: 'preenchedor'      }, // 2
  // ── Bioestimulador
  { name: 'Bioestimulador Diamond',                   pix: 1927.80, group: 'diamond'          }, // 3
  // ── Ultraformer MPT
  { name: 'Ultraformer MPT Full Face',                               pix: 2516.85, group: 'ultraformer'     }, // 4
  { name: 'Ultraformer MPT Pálpebras',                               pix: 1288.35, group: 'ultraformer'     }, // 5
  { name: 'Ultraformer MPT Pescoço (Pega Papada com Foco em Flacidez)', pix: 2012.85, group: 'ultraformer'  }, // 6
  { name: 'Ultraformer MPT Papada',                                   pix: 1288.35, group: 'ultraformer'    }, // 7
  { name: 'Ultraformer MPT Bichectomia',                              pix: 2012.85, group: 'ultraformer'    }, // 8
  { name: 'Ultraformer MPT Terço Inferior',                           pix: 2012.85, group: 'ultraformer'    }, // 9
  { name: 'Ultraformer MPT Abdome',                                   pix: 2516.85, group: 'ultraformer'    }, // 10
  { name: 'Ultraformer MPT Flancos',                                  pix: 1288.35, group: 'ultraformer'    }, // 11
  { name: 'Ultraformer MPT Colo',                                     pix: 1288.35, group: 'ultraformer'    }, // 12
  { name: 'Ultraformer MPT Gordura do Sutiã',                         pix: 1288.35, group: 'ultraformer'    }, // 13
  { name: 'Ultraformer MPT Gordura Pré-Axilar',                       pix: 1288.35, group: 'ultraformer'    }, // 14
  { name: 'Ultraformer MPT Monte de Vênus',                           pix: 1288.35, group: 'ultraformer'    }, // 15
  { name: 'Ultraformer MPT Bananinha',                                pix: 1288.35, group: 'ultraformer'    }, // 16
  { name: 'Ultraformer MPT Braços Região do Tchau',                   pix: 2012.85, group: 'ultraformer'    }, // 17
  { name: 'Ultraformer MPT Joelho',                                   pix: 2012.85, group: 'ultraformer'    }, // 18
  { name: 'Ultraformer MPT Interno de Coxa',                          pix: 2516.85, group: 'ultraformer'    }, // 19
  { name: 'Ultraformer MPT Mãos',                                     pix: 1288.35, group: 'ultraformer'    }, // 20
  { name: 'Ultraformer MPT Rejuvenescimento Íntimo',                  pix: 1288.35, group: 'ultraformer'    }, // 21
  { name: 'Ultraformer MPT Bumbum Up',                                pix: 2516.85, group: 'ultraformer'    }, // 22
  // ── Scizer
  { name: 'Scizer Corporal Por Região',               pix: 975.24,  group: 'scizer'           }, // 23
  // ── Laser Lavieen
  { name: 'Lavieen BB Laser Facial - 3 sessões',      pix: 1927.80, group: 'lavieen'          }, // 24
  { name: 'Lavieen Facial Completo - 3 sessões',      pix: 1927.80, group: 'lavieen'          }, // 25
  { name: 'Lavieen Melasma Facial - 3 sessões',       pix: 1927.80, group: 'lavieen'          }, // 26
  { name: 'Lavieen Face + Pescoço + Colo - 3 sessões',pix: 2557.80, group: 'lavieen'          }, // 27
  { name: 'Lavieen Facial + Pescoço - 3 sessões',     pix: 2242.80, group: 'lavieen'          }, // 28
  { name: 'Lavieen Olheiras - 3 sessões',             pix: 975.24,  group: 'lavieen'          }, // 29
  { name: 'Lavieen Pescoço + Colo - 3 sessões',       pix: 1530.90, group: 'lavieen'          }, // 30
  { name: 'Lavieen Capilar - 3 sessões',              pix: 1927.80, group: 'lavieen'          }, // 31
  { name: 'Lavieen Mãos - 3 sessões',                 pix: 975.24,  group: 'lavieen'          }, // 32
  // ── Microagulhamento
  { name: 'Microagulhamento Robótico - 3 sessões',    pix: 1927.80, group: 'microagulhamento' }, // 33
  // ── Endymed
  { name: 'Endymed Radiofrequência 3DEEP - 6 sessões',pix: 1644.30, group: 'endymed'          }, // 34
  // ── Luz Pulsada & Laser
  { name: 'Hollywood Peel - 2 sessões',               pix: 975.24,  group: 'luzpulsada'       }, // 35
  { name: 'Despigmentação a Laser - 2 sessões',       pix: 975.24,  group: 'luzpulsada'       }, // 36
  { name: 'Laser Fracionado Pixel - 1 Sessão',        pix: 975.24,  group: 'luzpulsada'       }, // 37
  { name: 'Laser Fracionado Código de Barras - 2 sessões', pix: 975.24, group: 'luzpulsada'   }, // 38
  { name: 'Laser Fracionado Pálpebras - 2 sessões',   pix: 975.24,  group: 'luzpulsada'       }, // 39
  { name: 'Laser Fracionado Glabela - 2 sessões',     pix: 975.24,  group: 'luzpulsada'       }, // 40
  { name: 'Luz Pulsada Facial - 2 sessões',           pix: 975.24,  group: 'luzpulsada'       }, // 41
  { name: 'Luz Pulsada Colo - 2 sessões',             pix: 975.24,  group: 'luzpulsada'       }, // 42
  { name: 'Luz Pulsada Mãos - 2 sessões',             pix: 975.24,  group: 'luzpulsada'       }, // 43
  // ── Depilação a Laser
  { name: 'Depilação a Laser (10 Sessões) — Axilas',                                  pix: 693.00,  group: 'depilacao' }, // 44
  { name: 'Depilação a Laser (10 Sessões) — Virilha Completa (Incl. região perianal)',pix: 1386.00, group: 'depilacao' }, // 45
  { name: 'Depilação a Laser (10 Sessões) — Buço e Mento',                            pix: 693.00,  group: 'depilacao' }, // 46
  { name: 'Depilação a Laser (10 Sessões) — Barba Completa',                          pix: 1386.00, group: 'depilacao' }, // 47
  { name: 'Depilação a Laser (10 Sessões) — Barba Delimitada',                        pix: 871.50,  group: 'depilacao' }, // 48
  { name: 'Depilação a Laser (10 Sessões) — Rosto',                                   pix: 1386.00, group: 'depilacao' }, // 49
  { name: 'Depilação a Laser (10 Sessões) — Perna Completa',                          pix: 2772.00, group: 'depilacao' }, // 50
  { name: 'Depilação a Laser (10 Sessões) — Antebraço',                               pix: 1386.00, group: 'depilacao' }, // 51
  { name: 'Depilação a Laser (10 Sessões) — Meia Perna',                              pix: 1386.00, group: 'depilacao' }, // 52
  { name: 'Depilação a Laser (10 Sessões) — Coxa',                                    pix: 1732.50, group: 'depilacao' }, // 53
  { name: 'Depilação a Laser (10 Sessões) — Costas',                                  pix: 2079.00, group: 'depilacao' }, // 54
  { name: 'Depilação a Laser (10 Sessões) — Tórax e Abdome',                          pix: 2079.00, group: 'depilacao' }, // 55
  { name: 'Depilação a Laser (10 Sessões) — Braço Completo',                          pix: 2079.00, group: 'depilacao' }, // 56
  { name: 'Depilação a Laser (10 Sessões) — Bumbum',                                  pix: 1386.00, group: 'depilacao' }, // 57
  { name: 'Depilação a Laser (10 Sessões) — Virilha Delimitada',                      pix: 1039.50, group: 'depilacao' }, // 58
  { name: 'Depilação a Laser (10 Sessões) — Pescoço Feminino',                        pix: 871.50,  group: 'depilacao' }, // 59
];

/*
  Desconto por faixa de oferta:
  Índice 0 → Oferta da Semana
  Índice 1 → Oferta Especial
  Índice 2 → Sextouu com Desconto
  Índice 3 → Close Friends
*/
const DISCOUNT_RATES = {
  ultraformer:      [0.30, 0.35, 0.40, 0.45],
  lavieen:          [0.45, 0.50, 0.55, 0.60],
  botox:            [0.25, 0.30, 0.35, 0.40],
  preenchedor:      [0.25, 0.30, 0.35, 0.40],
  diamond:          [0.30, 0.35, 0.40, 0.45],
  scizer:           [0.40, 0.45, 0.50, 0.55],
  endymed:          [0.45, 0.50, 0.55, 0.60],
  microagulhamento: [0.05, 0.10, 0.15, 0.25],
  luzpulsada:       [0.35, 0.40, 0.45, 0.50],
  depilacao:        [0.40, 0.50, 0.50, 0.50],
};

const HIGHLIGHT_BOTOX_PROC_IDX = '0';
let isBotoxHighlightActive = false;

/* ── FORMATAÇÃO ── */

/**
 * Formata número para moeda brasileira com exatamente 2 casas decimais.
 * Ex: 1500.5 → "1.500,50"
 */
function fmt(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/* ── CONTAGEM REGRESSIVA DA OFERTA ── */

const OFFER_END_DATE = new Date(2026, 3, 24, 18, 0, 0);

function padCountdown(value) {
  return String(value).padStart(2, '0');
}

function formatCountdown(diffMs) {
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${padCountdown(days)} : ${padCountdown(hours)} : ${padCountdown(minutes)} : ${padCountdown(seconds)}`;
}

function initOfferCountdown() {
  const valueEl = document.getElementById('offerCountdown');
  const barEl = document.querySelector('.offer-countdown-bar');

  if (!valueEl || !barEl) {
    return;
  }

  const update = () => {
    const diff = OFFER_END_DATE.getTime() - Date.now();

    if (diff <= 0) {
      valueEl.textContent = 'Oferta encerrada';
      barEl.classList.add('is-ended');
      return true;
    }

    valueEl.textContent = formatCountdown(diff);
    barEl.classList.remove('is-ended');
    return false;
  };

  if (update()) {
    return;
  }

  const timer = setInterval(() => {
    if (update()) {
      clearInterval(timer);
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', initOfferCountdown);

function renderBotoxHighlightState() {
  const highlightBtn = document.getElementById('botoxHighlightBtn');
  if (!highlightBtn) {
    return;
  }

  highlightBtn.classList.toggle('is-active', isBotoxHighlightActive);
}

function clearOfferResult() {
  const resultSection = document.getElementById('resultSection');
  const offerTextEl = document.getElementById('offerText');
  const discountBadgeEl = document.getElementById('discountBadge');

  if (offerTextEl) {
    offerTextEl.textContent = '';
  }

  if (discountBadgeEl) {
    discountBadgeEl.textContent = 'Desconto aplicado: —';
  }

  if (resultSection) {
    resultSection.style.display = 'none';
  }
}

function ensureOfferRangeSelected() {
  const rangeSelect = document.getElementById('faixaOferta');
  if (!rangeSelect || rangeSelect.value !== '') {
    return;
  }

  const firstAvailableOption = Array.from(rangeSelect.options).find((option) => !option.disabled && option.value !== '');
  if (firstAvailableOption) {
    rangeSelect.value = firstAvailableOption.value;
  }
}

function activateBotoxHighlight() {
  const procedureSelect = document.getElementById('procedimento');
  if (!procedureSelect) {
    return;
  }

  if (navigator.vibrate) {
    navigator.vibrate(30);
  }

  procedureSelect.value = HIGHLIGHT_BOTOX_PROC_IDX;
  ensureOfferRangeSelected();
  clearOfferResult();
  isBotoxHighlightActive = true;
  renderBotoxHighlightState();
  generateOffer();
}

function handleProcedureChangeForHighlight() {
  const procedureSelect = document.getElementById('procedimento');
  if (!procedureSelect) {
    return;
  }

  if (isBotoxHighlightActive && procedureSelect.value !== HIGHLIGHT_BOTOX_PROC_IDX) {
    isBotoxHighlightActive = false;
  }

  renderBotoxHighlightState();
}

document.addEventListener('DOMContentLoaded', () => {
  const procedureSelect = document.getElementById('procedimento');

  if (procedureSelect) {
    procedureSelect.addEventListener('change', handleProcedureChangeForHighlight);
  }

  renderBotoxHighlightState();
});



/* ── GERAÇÃO DA OFERTA ── */

function generateOffer() {
  const procIdx  = document.getElementById('procedimento').value;
  const offerIdx = document.getElementById('faixaOferta').value;

  /* Validação */
  if (procIdx === '') {
    showError('Selecione o procedimento.');
    return;
  }
  if (offerIdx === '') {
    showError('Selecione a faixa de oferta.');
    return;
  }

  /* Dados selecionados */
  const procedure    = PROCEDURES[parseInt(procIdx, 10)];
  const discountRate = DISCOUNT_RATES[procedure.group][parseInt(offerIdx, 10)];
  const discountPct  = Math.round(discountRate * 100);

  /* Valores originais
     - Pix:    conforme tabela
     - Cartão: o total no cartão é pix × 1,2 (parcela = pix / 10)
  */
  const originalPix      = procedure.pix;
  const originalCard     = originalPix / 10;   // parcela original no cartão

  /* Valores com desconto
     - Pix com desconto:    pix × (1 - taxa)
     - Parcela final cartão: valor Pix com desconto ÷ 12
  */
  const discountedPix  = originalPix * (1 - discountRate);
  const discountedCard = discountedPix / 10;

  /* Montagem do texto da oferta */
  let offerText =
    `${procedure.name} de R$ ${fmt(originalPix)} no Pix ou 12x de R$ ${fmt(originalCard)} no cartão.\n` +
    `\n` +
    `POR:\n` +
    `\n` +
    `\u{1F4B0} Pix: R$ ${fmt(discountedPix)}\n` +
    `\u{1F4B3} Cartão: 12x de R$ ${fmt(discountedCard)}\n` +
    `\n` +
    `➖➖\n` +
    `\u{1F4CC} Consulte as regras fixadas no feed da @crlaser.oficial.`;

  if (isBotoxHighlightActive && procIdx === HIGHLIGHT_BOTOX_PROC_IDX) {
    offerText += `\n\n🎁 Bônus exclusivo do destaque: Um Peeling Facial + Uma Máscara de LED`;
  }

  /* Exibição */
  document.getElementById('offerText').textContent   = offerText;
  document.getElementById('discountBadge').textContent = `Desconto aplicado: ${discountPct}%`;

  const resultSection = document.getElementById('resultSection');
  resultSection.style.display = 'flex';

  /* Scroll suave até o resultado */
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

/* ── COPIAR OFERTA ── */

function copyOffer() {
  const text = document.getElementById('offerText').textContent;
  const btn  = document.getElementById('btnCopiar');

  const confirm = () => {
    btn.textContent = 'Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'COPIAR OFERTA';
      btn.classList.remove('copied');
    }, 1500);
  };

  /* Preferência: Clipboard API (segura e moderna) */
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(confirm).catch(() => fallbackCopy(text, confirm));
  } else {
    fallbackCopy(text, confirm);
  }
}

/* ── ENVIAR NO WHATSAPP ── */

function openWhatsAppUnitPicker() {
  const text = document.getElementById('offerText').textContent.trim();

  if (!text) {
    showError('Gere a oferta antes de enviar no WhatsApp.');
    return;
  }

  const overlay = document.getElementById('whatsAppOverlay');
  if (!overlay) {
    return;
  }

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeWhatsAppUnitPicker() {
  const overlay = document.getElementById('whatsAppOverlay');
  if (!overlay) {
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

function sendOfferToWhatsApp(number) {
  const message = document.getElementById('offerText').textContent;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');
  closeWhatsAppUnitPicker();
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('whatsAppClose');
  const overlay = document.getElementById('whatsAppOverlay');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeWhatsAppUnitPicker);
  }

  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeWhatsAppUnitPicker();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeWhatsAppUnitPicker();
    }
  });
});

/** Fallback para navegadores sem Clipboard API */
function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  ta.style.top      = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    onSuccess();
  } catch (_) {
    alert('Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.');
  }
  document.body.removeChild(ta);
}

/* ── ERRO ── */

function showError(msg) {
  alert(msg);
}

/* ─────────────────────────────────────
   TIRE DÚVIDAS
───────────────────────────────────── */

const perguntasBioestimulador = {
  "Qual o Bioestimulador usado na CR Laser®?": `Trabalhamos com o Diamond (concorrente do Radiesse) da Rennova.

É um bioestimulador à base de hidroxiapatita de cálcio, uma substância presente em nosso organismo, tornando-o extremamente seguro.

A bioestimulação com essa substância injetável induz a produção de colágeno, melhorando o tônus e a flacidez cutânea.

Além da face e do pescoço, também é usado em outras áreas do corpo, como colo, glúteos, mãos, braços e abdômen.`,

  "Qual o Número de Sessões Indicado para o Bioestimulador Diamond?": `O número de sessões do Bioestimulador Diamond depende de cada caso.

Na clínica, recomendamos o seguinte:

Rosto / Mãos / Pescoço: realizar uma sessão e aguardar de 2 a 3 meses para uma segunda sessão, se houver necessidade.

Bumbum / Interno de Coxas / Abdômen: realizar uma sessão a cada 30 dias e avaliar a necessidade de mais sessões conforme o progresso.`,

  "Qual a Quantidade de Bioestimulador Diamond Indicada para face, pescoço ou mãos?": `Em relação à quantidade do Bioestimulador Diamond indicada para rosto, pescoço e mãos:

Geralmente usamos uma ampola por sessão (por região). Em alguns casos, podemos usar mais de uma por sessão, mas não é o mais comum.

Se houver necessidade de mais, deixamos para uma segunda sessão.

Geralmente recomendamos esperar em torno de 30 a 40 dias para avaliar a necessidade de uma segunda sessão.

Fazendo isso, garantimos mais segurança e naturalidade.`,

  "Qual a Quantidade de Bioestimulador Diamond Indicada para celulite / flacidez corporal?": `Em relação à quantidade de Bioestimulador Diamond para celulite e flacidez no bumbum, interno de coxas e abdômen:

Para algumas celulites localizadas, podemos usar 1 ampola por região.

No entanto, 2 ampolas são o ideal por sessão.

Podemos realizar uma sessão a cada 30 dias.

O número de sessões varia de acordo com cada caso.

Recomendamos comprar por sessão, 1 ou 2 ampolas, conforme a necessidade.

Obs.: No caso do abdômen, sempre recomendamos usar 1 ampola por vez.`,

  "Qual a Durabilidade do Bioestimulador Facial?": `É complicado falar sobre a durabilidade do Bioestimulador.

O produto é feito para durar cerca de 2 anos, mas, durante esse tempo, você continua perdendo colágeno, por isso não podemos garantir que o efeito se manterá por todo esse período.

Na clínica, seguimos um protocolo de uma sessão a cada 2 ou 3 meses, se necessário, chegando até 3 sessões, e depois continuamos conforme a necessidade de cada paciente.`,

  "Qual é a Indicação do Bioestimulador Diamond Facial para o rosto?": `Na face, indicamos o Bioestimulador Diamond para melhorar a firmeza da pele, a elasticidade, a perda de volume e o estímulo de colágeno.

A aplicação promove um processo inflamatório controlado na pele, resultando na formação de novo colágeno.

Isso ajuda na sustentação, recupera a estrutura da pele e melhora a flacidez.`,

  "Bioestimulador Diamond Gera Volume?": `O Bioestimulador Diamond pode ser usado, sim, com esse objetivo, e o volume irá depender da maneira como ele é aplicado.

Esse volume pode ser controlado e, quando bem aplicado, não há risco de gerar um volume desproporcional.`,

  "A aplicação do Bioestimulador Diamond Dói?": `Antes da aplicação do Bioestimulador Diamond, é feito um bloqueio anestésico local.

Geralmente, o procedimento é bem tranquilo.

Como usamos uma cânula, a maioria dos clientes não reclama de nenhum incômodo.`,

  "O Bioestimulador Diamond fica Natural?": `Sim, o Bioestimulador fica natural.

Na verdade, o resultado dependerá de quem o aplica.

Usando uma quantidade adequada e respeitando os limites, o rosto não ficará com um aspecto estranho.`,

  "Como funciona a diluição? Vou ter quantos ml de Bioestimulador?": `Variações na diluição do Bioestimulador

Muitas pessoas têm dúvida em relação à diluição do Bioestimulador, achando que uma diluição maior ou menor significa mais ou menos produto — mas não é assim que funciona.

A diluição é apenas a quantidade de líquido (soro) adicionada ao produto para facilitar a aplicação e adaptar o tratamento à necessidade de cada região e objetivo.

Ou seja, podemos usar diferentes diluições dependendo da estratégia: mais fluido para áreas maiores e mais concentrado para pontos específicos.

Mas o mais importante é:

Independentemente da diluição, a quantidade de Bioestimulador utilizada é exatamente a mesma.

O que muda é apenas a forma de aplicação, não a quantidade de produto entregue na pele.

➖➖➖➖
Entenda como funciona a diluição do Bioestimulador!

https://www.instagram.com/reel/DVQ8Wyojv6M/?igsh=MW1heG42bjVudm4wdg==`,

  "Qual a Diferença do Bioestimulador Diamond para Sculptra / Elleva?": `Diferença principal

Sculptra / Elleva

* Base: ácido poli-L-láctico (PLLA)
* Atua estimulando colágeno de forma gradual
* Não tem efeito imediato
* Resultado aparece com o tempo (semanas)
* Mais focado em qualidade de pele e volume progressivo

Diamond

* Base: hidroxiapatita de cálcio
* Tem dupla ação: estímulo de colágeno + efeito estrutural imediato
* Dá sustentação e firmeza mais rápida
* Pode modelar e dar contorno`,

  "Qual a Diferença do Bioestimulador Diamond para Ultraformer MPT?": `Diferença do Bioestimulador Diamond para Ultraformer MPT:

Basicamente e resumidamente, usamos o Ultraformer MPT para casos de flacidez em rosto um pouco mais cheinho.

Já o Bioestimulador é indicado para flacidez em um rosto mais magrinho, com perda de volume (rosto murcho).

Também é possível combinar os dois, o que seria perfeito.`,

  "Tem Bioestimulador Sculptra na CR Laser®?": `Na CR Laser®, trabalhamos somente com Diamond, um Bioestimulador à base de hidroxiapatita de cálcio, o mesmo componente do Radiesse.`,

  "Mas é preciso aplicar Bioestimulador também para dar volume no bumbum?": `Não trabalhamos com o objetivo de volume. O objetivo é melhorar textura, flacidez e celulite.`,

  "Tem como fazer Bioestimulador na papada?": `Tem, sim. Mas só se for uma papada apenas com flacidez.

Fazemos no pescoço e na papada.

Se tiver gordura, é melhor o Ultraformer MPT.`,
};

const perguntasBotox = {
  "Tem que ter intervalo entre Bioestimulador e Botox?": `Não precisa de intervalo. Pode ser feito no mesmo dia.`,

  "Botox Durando Pouco": `A CR Laser® trabalha com o mesmo produto de sempre, e a diluição não foi alterada.

A clínica utiliza o frasco de 200U diluído em 1,8 ml, o que a torna mais concentrada que a diluição padrão.

A durabilidade do Botox varia, podendo durar de 3 a 4 meses, mas, em alguns casos, o efeito pode começar a diminuir após 2 meses, ou até antes 😥😥.

A realidade atual é que a durabilidade do Botox tem diminuído, e isso não é exclusivo da CR Laser®, mas sim uma tendência com todas as marcas.

O que estamos fazendo é adequar o preço à nova realidade.

Obs.: Veja os prints

https://www.instagram.com/reel/DORwgKbCXce/`,

  "Qual a Durabilidade do Botox?": `A durabilidade do Botox varia de pessoa para pessoa, podendo durar de 3 a 4 meses e, em alguns casos, até mais.

Em algumas situações, o movimento já começa a voltar após 2 meses.

Não é necessário aplicar novamente assim que o efeito começa a passar.

Algumas pessoas repetem a aplicação a cada 6 meses, outras a cada um ano, e há casos que necessitam repetir a cada 4 meses.

Lembrando que não é obrigatório repetir a aplicação, mas você provavelmente vai querer repetir.`,

  "Quais os pontos de aplicação do Botox?": `Na clínica, só é feito Botox Terço Superior Facial Completo.

É assim para garantir a harmonia facial.

Por esse motivo, o Botox é sempre aplicado nas 4 principais regiões:

1- Rugas da testa

2 - Rugas da glabela

3 - Pés de galinha

4 - Ruguinhas do nariz (nem todos precisam nessa região).`,

  "Qual marca do Botox é usada na clínica?": `Nós já trabalhamos com diversas marcas, mas atualmente usamos a Nabota e a Letybo.

É uma toxina botulínica coreana de alta pureza, conhecida por ação mais rápida (resultados visíveis em 2-3 dias) e resultados naturais.

Elas oferecem a melhor relação custo-benefício.

Seguras e com bons resultados.`,

  "Qual a diferença entre Preenchedor e Botox?": `Diferenças entre Botox e Preenchedor:

A primeira diferença a ser notada é o tipo de substância utilizada: o Botox utiliza a toxina botulínica, enquanto o Preenchedor utiliza o ácido hialurônico.

Outra diferença é o mecanismo de ação: a toxina botulínica atua paralisando o músculo, sendo eficaz em rugas dinâmicas, como as rugas da testa. Já o ácido hialurônico promove o preenchimento, sendo mais indicado para rugas estáticas, como o famoso "bigode chinês".

Em resumo:

Botox é indicado para rugas de movimento, como os "pés de galinha".

Preenchedor é indicado para rugas estáticas, como o "bigode chinês", e para reposição ou definição de volume em algumas regiões, como o queixo ou até mesmo as mãos.`,

  "Qual a idade para começar a fazer Botox?": `Botox não tem idade.

Nos mais jovens: a toxina botulínica pode ter um efeito preventivo. Nunca é cedo demais para começar. Você deve iniciar assim que as rugas começarem a incomodar. Quanto antes começar, melhor será o resultado.

Nos mais velhos: o Botox sempre ajuda. Com a idade, pode ser necessário combiná-lo com outros tratamentos. Mas sempre irá precisar, ele é a base de qualquer tratamento.`,

  "Botox fica Natural? Não tem perigo de ficar estranho?": `O Botox tem efeito natural.

Quando vemos casos de rostos que parecem completamente paralisados, é porque a sua aplicação foi inadequada e não houve respeito aos limites.

Quando bem aplicado, o Botox ameniza as rugas de movimento do paciente, mantendo a naturalidade do seu sorriso.`,

  "Sou obrigado a repetir o Botox? O que acontece se não fizer mais?": `Após a aplicação do Botox, se o tratamento não for repetido, o resultado será pior?

Não, na verdade será melhor!

Além de tratar rugas de expressão, o Botox previne e atrasa a formação de novas rugas durante o tempo que dura o efeito do tratamento.

Por isso, mesmo que você não queira repetir — o que é difícil acontecer — o resultado será sempre melhor do que nunca ter feito.`,

  "Quem faz Botox pode fazer Ultraformer?": `Quem fez Botox pode fazer Ultraformer, mas é preciso aplicar da maneira correta.

Inclusive, podemos fazer no mesmo dia, caso você tenha indicação, mas seguimos uma sequência:

Primeiro o Ultraformer e depois o Botox.

Se você já fez Botox, deve esperar pelo menos uma semana para fazer o Ultraformer.

Você poderá fazer o Ultraformer no retorno do Botox.`,

  "Como funciona o Botox Axilar?": `O Botox nas axilas é recomendado para tratar a hiperidrose axilar (suor excessivo).

A aplicação bloqueia a liberação do neurotransmissor acetilcolina, ou seja, a transmissão sináptica, produzindo desnervação química eficaz da glândula e cessação temporária da sudorese excessiva.`,

  "Qual a durabilidade do Botox Axilar?": `A durabilidade depende de cada caso, podendo variar, em média, de 6 a 12 meses.

Em alguns casos já começa a voltar antes, existem casos raros que voltam antes de 3 meses, e, em alguns, pode durar mais do que 12 meses.

Geralmente o suor volta em menor intensidade.`,

  "Precisa de repouso no Botox suor?": `O Botox Axilar não precisa de repouso.

Faz e volta para sua rotina normal na mesma hora.

Pode fazer e ir para uma festa.`,

  "Botox suor ou cirurgia? Qual o melhor": `Fazer o Botox Axilar é consideravelmente muito melhor.

Seguro, sem necessidade de repouso e sem os riscos de uma cirurgia.`,

  "Eu não faço Botox na região dos pés de galinha. Pode substituir pelo canto da boca para melhorar sorriso caído?": `Não é possível. Essa é uma região com um risco relativo para assimetria e, por isso, não oferecemos. Somente a parte do terço superior mesmo.`,

  "Tem como diluir na minha frente?": `Trabalhamos com toxina botulínica de 200U, que é utilizada em mais de um paciente.

Isso é padrão em todas as grandes clínicas. Somente quem atende poucos pacientes costuma comprar frascos de 50 unidades para diluir na frente do paciente. Na prática, isso nem é viável, já que são raros os casos em que se utilizam apenas 50 unidades, considerando aplicação inicial e retorno. Ou seja, se um profissional diluir um frasco de 50U apenas para você, é bem provável que faltem unidades ou que a diluição seja feita de forma incorreta.

A diluição padrão do Botox é a seguinte:

Botox 50U → diluído em 0,5 ml

Botox 100U → diluído em 1,0 ml

Botox 200U → diluído em 2,0 ml

Na CR Laser®, diluímos o de 200U em 1,8 ml, ou seja, de forma um pouco mais concentrada.`,

  "Posso trocar os pontos de aplicação?": `Não é possível. Essa é uma região com um risco relativo para assimetria e, por isso, não oferecemos. Somente a parte do terço superior mesmo.`,
};

const perguntasLavieen = {
  "O que é o Laser Lavieen?": `Lavieen é um laser muito versátil, projetado para tratar, restaurar e rejuvenescer a pele.

Com tecnologia de última geração, ele é indicado para linhas finas, poros dilatados, manchas e flacidez leve.

Além de proporcionar um aspecto aveludado e hidratado à pele, ele oferece vários outros benefícios.

O Lavieen melhora a tonalidade da pele.`,

  "Qual Diferença do BB Laser Para o Laser Lavieen Facial Completo?": `Diferença entre o BB Laser e o Laser Lavieen Facial Completo:

Em ambos os casos utilizamos o mesmo aparelho — o que muda é a potência e a finalidade do tratamento.

O BB Laser atua de forma mais superficial, sem causar descamação. Ele melhora a tonalidade da pele, proporciona um efeito blur/glow (ou "pele de maquiagem") e ajuda a reduzir os poros. É ideal para quem tem um evento próximo e deseja uma pele radiante.

Já o Lavieen Facial Completo é aplicado com uma potência mais alta, o que provoca uma leve descamação e permite que o laser atue nas camadas mais profundas da pele. Esse tratamento oferece inúmeros benefícios, auxiliando no rejuvenescimento, redução de poros, linhas de expressão, rugas, manchas, melhora da textura e controle da oleosidade.`,

  "O que é o BB Laser?": `A respeito do Lavieen BB Laser:

Esse protocolo melhora a aparência da pele, proporcionando um efeito "glow" sem descamação, resultando em uma pele mais viçosa e uniforme.

Pode ser usado em qualquer época do ano e é especialmente indicado para preparar a pele para eventos próximos.`,

  "Qual a Diferença entre o Laser Lavieen e o CO2 e Fotona?": `Diferença entre o Laser Lavieen e o CO2 e Fotona:

O CO2, assim como o Fotona, é um laser ablativo que causa uma lesão maior, deixando a pele exposta e exigindo um tempo maior de recuperação.

Já o Lavieen é um laser sem "downtime", ou seja, com rápida recuperação. Ele foi projetado para tratar, restaurar e rejuvenescer a pele, melhorando linhas finas, poros dilatados e manchas. A recuperação tecidual começa já no primeiro dia.

Obs.: O resultado final do CO2 e do Fotona pode ser um pouco melhor, mas a segurança do Lavieen é maior e o pós procedimento é mais tranquilo.`,

  "O Laser Lavieen trata Melasma?": `Laser Lavieen e Melasma:

Com o Lavieen, é possível tratar a derme superficial, a epiderme e diferentes graus de pigmentação.

Para melasma, o laser age na epiderme e na camada basal, onde se encontram os pigmentos e melanócitos, atuando diretamente nessas áreas.

Embora não seja a cura do melasma, é o tratamento mais seguro para seu controle.

O Laser Lavieen gera um dano controlado nas camadas da pele, inibindo a produção de melanina e pigmentações em excesso. Isso traz mais brilho, nutrição e viço à pele, além de uniformizar a coloração.`,

  "Laser Lavieen é dolorido?": `Dor no Laser Lavieen:

O máximo que o paciente irá sentir é um pequeno incômodo.

O procedimento é muito tranquilo.

Além disso, aplicamos uma anestesia tópica antes do Laser Lavieen para garantir o máximo de conforto possível.`,

  "Qual o Número de Sessões Indicado Para o Laser Lavieen?": `O indicado é adquirir as 3 sessões do Laser Lavieen, pois é o protocolo mínimo do procedimento para obter os melhores resultados.

No entanto, se você realmente deseja apenas 1 sessão e já fez outras anteriormente, pode adquiri-la pagando 50% do valor do pacote de 3 sessões.

Obs.: Caso opte por 1 sessão, não será possível mudar para o pacote completo posteriormente.`,

  "Vocês fazem Drug Delivery com o Laser Lavieen?": `Em todas as sessões de Laser Lavieen, o procedimento é finalizado com o Drug Delivery.

A escolha dos ativos depende de cada caso, variando de paciente para paciente.

O Lavieen emite raios de laser fracionados que aumentam a permeabilidade da pele, facilitando a aplicação de soluções conforme o protocolo estabelecido. Com isso, podemos obter maiores efeitos com soluções regenerativas, clareadoras, anti-inflamatórias, entre outras.`,

  "Qual o intervalo indicado entre as sessões do Laser Lavieen?": `Intervalo indicado entre as sessões de Laser Lavieen:

O intervalo geralmente varia entre 21 e 30 dias.

Esse período pode variar de paciente para paciente e de região para região.`,

  "Como é o Pós procedimento do Laser Lavieen?": `A recuperação/pós procedimento do Laser Lavieen depende do tipo de aplicação.

No caso do BB Laser, a recuperação é mais rápida e não há necessidade de repouso.

Já no caso do Facial Completo, com objetivo de rejuvenescimento, cicatrizes ou poros, a recuperação é mais lenta e requer um pequeno período de repouso em relação ao sol.

A pele pode ficar levemente inchada, com sensação de desidratação e prurido, sintomas comuns durante o processo de recuperação.

Microscópicas crostas irão surgir e gradualmente desaparecer. O uso de hidratantes leves pode ajudar.

Durante o processo de descamação, a pele pode apresentar uma aparência ligeiramente bronzeada.`,

  "Qual a Diferença do Laser Lavieen para o Laser Pixel?": `Diferença do Laser Lavieen para o Laser Pixel:

O Laser Lavieen é não ablativo, o que faz com que não precise de repouso e pode ser usado em quem tem melasma.

O Laser Pixel (assim como o CO2) é ablativo, precisa de repouso, é mais agressivo e não pode ser usado em quem tem melasma.`,

  "O que é Laser Lavieen Rejuvenescimento?": `Laser Lavieen Rejuvenescimento:

Indicado para peles maduras e fotoenvelhecidas, o Laser Lavieen irá melhorar a aparência geral da pele, discromia (manchas), textura, redução dos poros e rugas finas.

Ele estimula a produção de colágeno e favorece o processo de rejuvenescimento.`,

  "Como é o Pós do Laser Lavieen Rejuvenescimento?": `Pós do Laser Lavieen Rejuvenescimento:

A pele pode ficar levemente inchada, sensação de desidratação e prurido são sintomas comuns quando a pele está em processo de recuperação.

Microcrostas irão surgir e gradualmente desaparecerão. Pode ser feito o uso de hidratantes leves para ajudar.

No processo de descamação pode apresentar uma aparência ligeiramente bronzeada.`,

  "Qual a Diferença do Laser Lavieen Rejuvenescimento e Laser Lavieen Melasma?": `Diferença do Laser Lavieen Rejuvenescimento e Laser Lavieen Melasma:

São protocolos diferentes.

A região de aplicação é a mesma, porém com potência e maneira de aplicar diferente.

Ambos irão melhorar poros. Porém, o de melasma é mais suave, uma vez que o foco é na mancha.`,

  "Laser Lavieen para Poros e Linhas": `Laser Lavieen para Poros e Linhas:

O Lavieen causa a redução da aparência de poros, linhas finas e cicatrizes.

Sua ação ocorre através da formação de microcrostas pela sua tecnologia de irradiação do laser não ablativo, promovendo a regeneração tecidual.

Uma ótima indicação para poros.

Gera também um estímulo secundário de colágeno.`,

  "Como o Laser Lavieen Funciona no Cabelo?": `O Laser Lavieen no cabelo estimula a neovascularização, favorecendo o aumento do metabolismo local para o crescimento de novos fios capilares. Além disso, há o aumento da permeabilidade na utilização de drug delivery.

Pode ser utilizado no couro cabeludo ou em barba também.

Obs.: O Lavieen não quebra os fios pré-existentes por não ter afinidade pela melanina.`,

  "O Laser Lavieen tem disparos?": `O Laser Lavieen não tem disparos.

O que define é a potência e a região no momento da aplicação.

Os parâmetros de tratamento, assim como a duração do pulso, energia e distância, são definidos a partir do fototipo da pele e do protocolo escolhido.

Na CR Laser® vendemos o protocolo completo para cada região.`
};

const perguntasUltraformerMPTCorpo = {
  "Durabilidade e Número de Sessões": `Quando se fala em gordura localizada é imprevisível.

Tem paciente que faz o Ultraformer MPT e vai para academia no mesmo dia, tem paciente que faz e vai para pizzaria no mesmo dia.

Por isso é impossível falar se precisa de mais uma sessão após 30 dias ou se precisa a cada 6 meses.

Quem prometer o contrário não está sendo verdadeiro com você.`,

  "Qual a Indicação do Ultraformer MPT Abdome?": `Indicação do Ultraformer MPT Abdome:

Sua ação permite a redução de medidas desta área através da diminuição da gordura, ao mesmo tempo que reduz a flacidez.

Indicado para casos em que há uma associação entre uma pequena quantidade de gordura e flacidez.

Se a região tiver uma grande quantidade de gordura, o mais indicado seria o Scizer.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Abdome?": `O número de sessões para Ultraformer MPT Abdome depende muito de cada caso.

Recomendamos fazer uma sessão e reavaliar se faz ou não mais sessões após uns 30 dias.

Alguns pacientes fazem apenas uma, mas a maioria precisa de mais sessões.

Lembrando que o Ultraformer Abdome é indicado para os casos com pequena quantidade de gordura, associada com flacidez.`,

  "Qual a Indicação do Ultraformer MPT Axilar?": `Indicação do Ultraformer MPT Axilar:

Sua ação permite a redução de medidas desta área através da diminuição da gordura, ao mesmo tempo que não deixa gerar flacidez, uma vez que também estimula colágeno.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Axilar?": `Recomendamos realizar uma sessão do Ultraformer MPT Axilar e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Gordura do Sutiã?": `Indicação do Ultraformer MPT Gordura do Sutiã:

Sua ação permite a redução de medidas desta área através da diminuição da gordura, ao mesmo tempo que não deixa gerar flacidez.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Gordura do Sutiã?": `Recomendamos realizar uma sessão de Ultraformer MPT Gordura do Sutiã e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Braços?": `Indicação do Ultraformer MPT Braços:

Sua ação permite a redução de medidas desta área através da diminuição da gordura, ao mesmo tempo que não deixa gerar flacidez.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Braços?": `Recomendamos realizar uma sessão de Ultraformer MPT Braços e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Flancos?": `O Ultraformer MPT Flancos é uma alternativa eficaz para combater a gordura localizada nos flancos, que é essa gordurinha localizada na região do quadril, de forma não invasiva.

Nesse sentido, a vantagem do Ultraformer MPT em relação a outras técnicas é que ele trata a gordura e a flacidez ao mesmo tempo.

Obs.: O Ultra MPT Flancos é indicado para tratar flacidez com pequena quantidade de gordura, mas, se o foco do tratamento for gordura, a indicação é de Scizer.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Flancos?": `Recomendamos realizar uma sessão de Ultraformer MPT Flancos e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Monte de Vênus?": `O Ultraformer MPT Monte de Vênus pode ser uma excelente alternativa para pacientes que sofrem com a gordura persistente na região do Monte de Vênus.

O tratamento com o MPT proporciona firmeza à pele, melhorando o contorno, reduzindo a flacidez da região e amenizando as gordurinhas acumuladas.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Monte de Vênus?": `Recomendamos realizar uma sessão e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Bananinha?": `O Ultraformer MPT na Bananinha é indicado para a gordura e flacidez na região.

Ele alcança as camadas de gordura e locais onde a pele é mais espessa, tratando não só a flacidez local como também fazendo quebra das células de gordura.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Bananinha?": `Recomendamos realizar uma sessão do Ultraformer MPT Bananinha e aguardar em torno de 30 dias para avaliar a necessidade de mais.`,

  "Qual a Indicação do Ultraformer MPT Joelho?": `O Ultraformer MPT Joelho no joelho é indicado para flacidez e gordurinha na região.

Irá proporcionar firmeza à pele, melhorando a textura, amenizando as gordurinhas da região e estimulando colágeno.`,

  "Qual o Número de Sessões Indicado Para o Ultraformer MPT Joelho?": `Recomendamos realizar uma sessão do Ultraformer MPT Joelho e aguardar em torno de 30 dias para avaliar a necessidade de mais.`
};

const perguntasUltraformerMPTFace = {
  "Você acha que dá para fazer o microagulhamento com o Ultraformer?": `Pode ser feito até no mesmo dia. A única coisa que pode acontecer é incomodar um pouco mais — pode ficar com mais edemas e um pouco mais dolorido.`,

  "Quais os Pontos de aplicação do Ultraformer MPT facial?": `Regiões de aplicação Ultraformer Full Face:

Região 1: realizado na região da testa, para dar um "up" nas sobrancelhas.

Região 2: realizado na região periocular superior, inferior e lateral, para dar um "up" nas pálpebras.

Região 3: realizado na lateral do rosto, para dar um efeito de "lifting" facial.

Região 4: realizado na região labial superior e inferior, para dar um "up" nos lábios.

➖➖➖➖
Esses pontos são apenas para sinalizar a região de aplicação.

Ele é aplicado em movimento, não de maneira estática.`,

  "Quando começam a aparecer os resultados do Ultraformer MPT Facial?": `Os resultados do Ultraformer MPT Facial geralmente começam a aparecer a partir do segundo mês, embora muitos pacientes já percebam mudanças visíveis nos primeiros 30 dias.

Alguns pacientes podem notar efeitos já na primeira ou segunda semana e, em casos mais raros, um efeito imediato — o que não é o mais comum, mas pode acontecer.

O resultado final é alcançado por volta de 6 meses, quando pode ser indicada uma nova sessão, caso haja necessidade.`,

  "Quem fez Bioestimulador pode fazer Ultraformer MPT Facial?": `Sim, o Ultraformer MPT pode ser realizado em quem já tem bioestimulador.

Inclusive, os dois procedimentos podem ser combinados no mesmo dia.

Primeiro fazemos o Ultraformer MPT e, em seguida, o bioestimulador.`,

  "Qual a Diferença do Ultraformer MPT Facial para Bioestimulador?": `Basicamente e resumidamente, usamos o Ultraformer MPT para casos de flacidez em rosto um pouco mais cheiinho.

Já o bioestimulador é indicado para flacidez em um rosto mais magrinho, com perda de volume (rosto murcho).

Também é possível combinar os dois, o que seria perfeito.`,

  "Qual a Diferença do Ultraformer MPT Full Face para o Ultraformer MPT Bichectomia?": `Diferença entre Ultraformer MPT Full Face e Ultraformer MPT Bichectomia:

O Ultraformer Full Face é utilizado para tratar a flacidez e proporcionar um efeito "lifting" em todo o rosto, incluindo as regiões superior e inferior.

O Ultraformer MPT Bichectomia, por outro lado, não é aplicado na região periocular e na testa. Ele se concentra no terço inferior do rosto e tem como foco a redução de gordura local.

Ambos irão gerar um estímulo de colágeno.`,

  "Diferença do Ultraformer MPT para o Ultraformer 3?": `Resumidamente, o MPT é mais rápido de fazer e proporciona resultados mais rápidos e melhores.

Ele é significativamente mais confortável que o Ultraformer anterior, representando uma verdadeira evolução.

O MPT maximiza a eficácia do MMFU, dividindo o método de geração de pontos de coagulação em 6 modos de emissão distintos.

O Ultraformer MPT é o único ultrassom no mercado que incorpora a avançada tecnologia micropulsada.

O procedimento estimula a produção de colágeno, promovendo um efeito lifting e melhorando a flacidez.`,

  "Ultraformer MPT é indolor?": `Dor é algo relativo, mas alguns pacientes sentem um leve incômodo durante as sessões.

Com o Ultraformer MPT, que é o que oferecemos atualmente, a maioria dos pacientes relata que é praticamente indolor.`,

  "Qual o Modelo/Marca do Ultraformer da CR Laser®?": `A Clínica CR Laser® trabalha com o Ultraformer MPT original da Medsystems.

Gostamos tanto que já temos 5 aparelhos. Cada unidade da CR Laser® possui um Ultraformer MPT.

Não alugamos, não emprestamos e não temos parceiros.

Obs.: Só existe 1 modelo de Ultraformer MPT, e ele é exatamente esse.

https://www.instagram.com/p/C90GhPDJ3in/`,

  "Qual a durabilidade do Ultraformer MPT Facial?": `Não há uma durabilidade definida.

O tratamento estimula o colágeno natural e gera um efeito lifting.

A maioria dos clientes realiza o procedimento uma vez por ano, mas alguns precisam de uma nova sessão após cerca de 6 meses.`,

  "Quais são as indicações do Ultraformer MPT Facial?": `O Ultraformer MPT no rosto tem basicamente a finalidade de tratar flacidez e melhorar a queda facial.

É o único tratamento que atua diretamente na musculatura.

Os transdutores promovem um efeito lifting.

Obs.: Quando temos um rosto flácido e emagrecido, geralmente o melhor tratamento é o bioestimulador.

Obs.: Também é possível combinar os dois.`,

  "Quem fez Botox pode fazer Ultraformer MPT Facial?": `Quem fez Botox pode fazer Ultraformer MPT Facial, mas é preciso aplicar de maneira correta.

Podemos fazer no mesmo dia:

Primeiro o Ultraformer e depois o Botox.

Se já fez Botox, deve esperar pelo menos uma semana.`,

  "O Ultraformer MPT Facial melhora o Bigode Chinês?": `O Ultraformer MPT Facial ajuda a amenizar o bigode chinês, mas geralmente não tem efeito imediato.

Para casos leves pode ser suficiente.

Para rugas mais profundas, o ideal é o preenchedor.

A combinação dos dois é uma ótima indicação.`,

  "Quem tem Preenchedor pode fazer Ultraformer MPT Facial?": `Pode sim, mas é preciso seguir os cuidados.

Pode ser feito no mesmo dia:

Primeiro o Ultraformer e depois o preenchedor.`,

  "Quem tem melasma pode fazer Ultraformer MPT Facial?": `Quem tem melasma pode fazer, mas precisa de cuidados especiais.

Evitar sol e seguir as orientações.`,

  "O Ultraformer MPT Facial afina o rosto?": `Depende do objetivo.

Se for para afinar, usamos protocolo específico (Ultra Bichectomia).

Ele reduz gordura e melhora flacidez, deixando o rosto mais fino.`,

  "O Ultraformer MPT Facial tem algum risco?": `O mais comum são pequenos hematomas.

Mais raro: assimetria ou paralisia temporária.

Ambos voltam ao normal.`,

  "Qual a Indicação do Ultraformer MPT Bichectomia?": `Redução de gordura e prevenção de flacidez.

Estimula colágeno.

Aplicado no terço inferior.`,

  "Qual o Número de sessões Indicado para o Ultraformer MPT Bichectomia?": `Pode variar.

Muitos resolvem com uma sessão.

Se necessário, repetir após 6 meses.`,

  "Como Funciona o tratamento com Ultraformer MPT Pálpebras?": `Encorta o músculo da pálpebra flácida.

Gera tração da pele para cima.

Estimula colágeno.

Ajuda na bolsinha de gordura.`,

  "Quem está fazendo depilação no rosto pode fazer MPT?": `Pode sim, inclusive no mesmo dia.

Pode dar um pouco mais de irritação.`,

  "O Ultraformer MPT pode ser feito em homem com barba?": `Pode sim.

Mas deve deixar a barba bem baixa.

O ideal é tirar.`,

  "De quanto em quanto tempo se faz Ultraformer MPT facial?": `Depende do caso.

Geralmente uma vez por ano.

Alguns fazem a cada 6 meses.`
};

const perguntasScizer = {
  "Quem teve trombose e usa anticoagulante pode realizar Scizer e o MPT?": `O que pode acontecer é romper vasos e gerar algum tipo de hematoma. E, se isso acontecer, deve evitar sol para não manchar e usar pomadas que já são utilizadas para hematomas.`,

  "O Scizer é simples? Necessita de cinta ou não?": `É "simples". Mas nada é 100% sem risco. Como ele dispara ultrassom macrofocado, pode romper vasos e gerar hematoma. E, se isso acontecer, tem que evitar sol pelo risco de manchas.

Não precisa usar cinta. O mais importante é seguir com atividades físicas e alimentação adequada.`,

  "Posso fazer 3 áreas diferentes de Scizer no mesmo dia? Flancos, interno de coxa e abdômen?": `Pode sim. Só vai incomodar um pouco mais.

Não vai ter sobrecarga no organismo.`,

  "O que é o Scizer?": `O Scizer é um sistema de contorno corporal não cirúrgico que utiliza a tecnologia MFSU (Macro Focused Scanning Ultrasound).

O processo se baseia no desenvolvimento de necroses coagulativas, que reduzem os depósitos de gordura localizada e melhoram o contorno do corpo.

Por meio da tecnologia de ultrassom macrofocado, promove o aquecimento dos adipócitos (células de gordura) na camada subcutânea, causando necrose coagulativa e a consequente eliminação dessas células pelo organismo.

Além disso, embora não seja o foco principal do tratamento, também estimula a produção de fibras de colágeno na região tratada.

É indicado para quem deseja perder gordura, mas não pode ou não quer passar por procedimentos cirúrgicos.`,

  "Quando aparecem os resultados do Scizer?": `Os resultados começam a aparecer após cerca de 20 dias, mas o resultado final é alcançado após 1 mês.

A durabilidade depende dos cuidados do paciente após a redução de gordura.

Se seguir uma dieta equilibrada e um regime de exercícios, o resultado pode ser definitivo. No entanto, se abusar na alimentação, a gordura pode voltar, assim como ocorre após uma lipoaspiração.`,

  "Qual melhor? Scizer ou Criolipólise?": `O Scizer é muito superior à criolipólise.

Ele é mais rápido e não apresenta risco de queimadura na pele.

Os resultados já começam a aparecer na segunda semana para a maioria dos pacientes.

Além disso, o Scizer tem a vantagem adicional de estimular a produção de colágeno na região tratada.`,

  "Scizer é indolor?": `Dor é algo relativo, mas a maioria dos pacientes sente um pouco de incômodo durante as sessões.

Em casos raros, alguns relatam uma dor mais intensa.

Nunca tivemos um paciente que não conseguiu concluir uma sessão ou que deixou de fazer outra devido à dor.

A anestesia tópica não é eficaz para o Scizer, por isso não a utilizamos.`,

  "Scizer gera flacidez?": `Entre todos os tratamentos estéticos para gordura, o Scizer é o que menos gera flacidez devido ao estímulo de colágeno que promove na área tratada.`,

  "Qual o melhor? Scizer ou Ultraformer MPT?": `Isso depende do caso.

Se for um abdome com mais gordura, o Scizer é melhor.

Se for um abdome com pouca gordura e mais flacidez, o Ultraformer MPT será melhor.`,

  "Precisa de quantas sessões de Scizer?": `O número de sessões depende de cada caso e da quantidade de gordura que o paciente deseja perder.

Alguns fazem 2 ou 3 sessões.

Outros já conseguem o resultado esperado com apenas 1 sessão.`,

  "Qual a durabilidade do resultado do Scizer?": `A durabilidade depende dos cuidados do paciente após a redução de gordura.

Se seguir uma dieta equilibrada e um regime de exercícios, o resultado pode ser definitivo. No entanto, se abusar na alimentação, a gordura pode voltar, assim como ocorre após uma lipoaspiração.`,

  "Quantos quadrantes fazem de Scizer por esse valor?": `Vendemos o tratamento por região, independente do número de quadrantes.

Faremos a quantidade de quadrantes que for necessária para cobrir a região por completo.

Geralmente, são feitos de 6 a 8 quadrantes.

Nunca menos que 6 e, em alguns casos, pode passar de 8 quadrantes, mas o valor não muda.`,

  "Pode fazer Scizer em quem está amamentando?": `Sim, o Scizer pode ser feito em quem está amamentando.

Não há nenhum risco.`
};

const perguntasPreenchedor = {
  "Preenchedor é definitivo?": `Não é definitivo.

Tenha muito cuidado com os chamados "preenchedores definitivos".

Nada é definitivo na estética. Você vai continuar envelhecendo; a única coisa que é definitiva nesses produtos é o risco.

Se acontecer alguma coisa, não tem o que fazer.

É comum que pacientes cheguem à clínica precisando de mais preenchedor ou de outro tratamento estético, mas não possam realizar o mesmo porque, há alguns anos, fizeram tratamento com PMMA (usam vários nomes para o mesmo produto).

Uma vez que você tenha feito o PMMA, nenhum outro profissional vai querer fazer novos tratamentos estéticos naquela região.`,

  "Qual a durabilidade do Preenchedor?": `Depende de cada caso, mas pode ser mais de um ano.

A durabilidade depende muito da região.

Lábios costumam durar menos, raramente passam de 6 meses, e olheiras costumam durar mais, geralmente mais de um ano.

A região do "bigode chinês" geralmente o paciente refaz com um ano, mas alguns podem precisar de mais uma ampola antes disso.`,

  "Como é o tratamento com Preenchedor Bigode Chinês?": `Um procedimento realizado com ácido hialurônico.

Rápido e sem necessidade de repouso para a recuperação.

Tem como objetivo amenizar o aspecto de cansaço deixado pela ruga conhecida como "bigode chinês".

Geralmente usamos uma ampola, mas em alguns casos pode ser necessário mais que isso.`,

  "Quem faz Preenchedor pode fazer Ultraformer MPT?": `Quem tem preenchedor pode fazer Ultraformer MPT, mas é preciso aplicar de maneira correta, com todos os cuidados na marcação.

Inclusive, podemos fazer no mesmo dia, caso você tenha indicação, mas seguimos uma sequência.

Primeiro o Ultraformer, depois o preenchedor.`,

  "O que é harmonização facial?": `Harmonização facial é a combinação de tratamentos estéticos que buscam, como o nome sugere, deixar seu rosto mais harmônico.

Alguns pacientes precisarão de preenchedores (como para o "bigode chinês"), enquanto outros precisarão de Botox (como para as rugas da testa).

O valor pode variar conforme a quantidade de produto utilizada.

Respeitamos quem gosta, mas na clínica não mudamos o formato do rosto. Realizamos apenas pequenas correções. Nada de aplicar grandes quantidades e deixar todo mundo com a mesma cara.`,

  "Qual a quantidade de ampolas usadas na harmonização facial?": `Duas ampolas já trazem uma melhora, mas em muitos casos pode ser necessário usar mais.

Recomendamos aplicar duas ou três ampolas e aguardar cerca de 2 meses para avaliar a necessidade de mais.

Sempre é aconselhável fazer o tratamento gradualmente, por questões de segurança e para manter a naturalidade.

Lembre-se de que harmonizar um rosto não se resume apenas ao uso de preenchedores. Outros procedimentos, como o Botox, também fazem parte desse tratamento.`,

  "O que é MD Codes?": `MD Codes consiste em um mapeamento preciso do rosto, com pontos específicos para aumentar a sustentação facial.

Sempre utilizamos ácido hialurônico por questões de segurança.

O MD Codes não é um preenchimento convencional, pois seu foco é a sustentação facial.`,

  "Qual a quantidade de ampolas usadas no MD Codes?": `Duas ampolas já trazem uma melhora, mas em muitos casos pode ser necessário usar mais.

Recomendamos aplicar duas ou três ampolas e aguardar cerca de 2 meses para avaliar a necessidade de mais.

Sempre é aconselhável fazer o tratamento gradualmente, por questões de segurança e para manter a naturalidade.`,

  "Qual a quantidade de ampolas usadas no Bigode Chinês?": `A maioria das pessoas utiliza 1 ampola no Bigode Chinês.

Em alguns casos, quando há uma necessidade maior de volume, podem ser usadas 2 ampolas.`,

  "Qual a quantidade de ampolas usadas no mento?": `Pode ser usada 1 ampola, mas o ideal, para um resultado mais harmoníoso e completo, são 2 ampolas.`,

  "Qual a indicação do preenchedor labial?": `O preenchimento labial corrige assimetrias e promove contornos mais definidos.

Sempre utilizamos ácido hialurônico por questões de segurança.

Respeitamos ao máximo a naturalidade e, por isso, sempre usamos pouco preenchedor, nunca mais do que uma ampola por aplicação.`,

  "Qual a quantidade de ampolas usadas (geral)?": `Preenchedor é vendido por ampola.

Cada região pode usar quantidades diferentes.

Geralmente usamos as seguintes quantidades:

Olheiras: uma ampola

Lábios: uma ampola

Bigode Chinês: uma ampola — eventualmente duas

Marionete: geralmente uma ampola

Top model look: uma ampola — eventualmente duas

MD Codes: uma ampola — eventualmente duas

Orelhas: uma ampola

Projeção de mento: geralmente duas ampolas

Delimitação de mandíbula: geralmente duas ampolas`,

  "Qual a quantidade de ampolas usadas nos lábios?": `A maioria usa apenas uma ampola.

Geralmente realizamos a segunda ampola, quando necessário, após cerca de 2 meses.

Ao realizar o procedimento com esse intervalo de tempo, conseguimos um resultado mais natural e duradouro.`,

  "Qual a indicação do Preenchedor de olheiras?": `O preenchimento de olheiras é indicado para tratar as chamadas "olheiras profundas".

A técnica visa substituir o volume perdido e atua como um hidratante, retendo a água nessa região.

Usa-se sempre uma quantidade pequena de preenchedor (ácido hialurônico), no máximo uma ampola para os dois lados.`,

  "Qual a quantidade de ampolas usadas nas olheiras?": `Uma ampola é o suficiente.

Não utilizamos mais pelo risco de intercorrência.

Se houver necessidade, pode-se associar outros tratamentos, como Lavieen, mas nunca mais de 1 ampola.`,

  "Qual a indicação do Preenchedor de orelhas?": `Ideal para tratar o envelhecimento das orelhas.

A aplicação de ácido hialurônico é muito utilizada para reposição do volume perdido.

Um procedimento seguro, que traz ótimos resultados para a correção da flacidez do lóbulo.`,

  "Qual a quantidade de ampolas usadas nas orelhas?": `Recomendamos fazer apenas uma ampola e aguardar para avaliar a necessidade de mais.

Caso seja a indicação, realizamos no máximo 2 ampolas.

Com isso, temos um resultado mais natural e com um custo menor para o cliente.`,

  "O que é Top Model Look?": `A respeito do chamado Top Model Look:

O objetivo principal é realçar a região da maçã do rosto e valorizar os ângulos faciais, proporcionando um efeito blush.

Uma ampola já melhora, mas em alguns casos pode ser necessário mais.`,

  "Qual a durabilidade do Preenchedor de olheiras?": `O preenchimento de olheiras é um dos que mais duram. Raramente acaba antes de um ano. Muitos chegam a durar 2 anos.`
};

const perguntasEndymed = {
  "Qual é a indicação do Endymed?": `Indicação do Endymed:

O Endymed geralmente pode ser usado em:

🔵 Pálpebras – para flacidez, rugas finas e bolsinhas

🔵 Face – para flacidez e rugas finas

🔵 Pescoço – para flacidez e rugas finas

🔵 Braços – para flacidez e gordurinhas

🔵 Colo – para flacidez e rugas finas

🔵 Abdome – para flacidez e gordurinhas

🔵 Culote – para flacidez e celulite

🔵 Interno de coxas – para flacidez e celulite

🔵 Bumbum – para flacidez e celulite`,

  "O que é Endymed Small?": `O Endymed Small é indicado para tratar flacidez da face e outras pequenas regiões, como área de bichectomia, pescoço e colo, atuando no estímulo de colágeno e melhorando linhas finas.

Com radiofrequência 3DEEP, que alcança de forma segura as 3 camadas da pele, estimulando colágeno.

Completamente indolor.`,

  "O que é Endymed Shapper?": `O Endymed Shapper é indicado para áreas corporais como abdômen, glúteos e muito mais. Tem como finalidade o estímulo de colágeno, tratando a flacidez e celulites.

Com radiofrequência 3DEEP, que alcança de forma segura as 3 camadas da pele, estimulando colágeno.

Completamente indolor.`,

  "São quantas sessões de Endymed?": `O Endymed iFine, Small e Shapper são 6 sessões, com intervalo médio de 1 semana entre elas.

O Endymed Intensif são 3 sessões, com intervalo médio de 30 dias entre elas.`,

  "Como é a radiofrequência Endymed? Qual a tecnologia?": `O Endymed é uma radiofrequência de última geração.

iFine, Shaper e Small → trabalham com radiofrequência multipolar controlada (3DEEP™), que aquece de dentro para fora com segurança.

Intensif → combina microagulhamento robótico com radiofrequência fracionada, atingindo a derme em profundidade para remodelar o colágeno.

Diferencial: o 3DEEP™ controla a energia de forma precisa, tornando o Endymed mais eficaz e seguro que a radiofrequência multipolar comum.`
};

const perguntasEndereco = {
  "Endereço Brasília": `CR Laser® Brasília - Procedimentos de Qualidade por um Preço Justo.

SGAS I SGAS 915 Advanced 2 Sala 220 2º pavimento - Asa Sul, Brasília - DF, 70390-150

https://maps.app.goo.gl/YEEWtseyzSJ5GySe6

(61) 98131-6493`,

  "Endereço Campinas": `CR Laser® Campinas - Procedimentos de Qualidade por um Preço Justo.

MedPlex Campinas: Av. Barão de Itapura, 610 - Sala 111 - Botafogo, Campinas - SP, 13020-430

https://maps.app.goo.gl/e42VM1tdzR5FjDbY8

(19) 99181-8366`,

  "Endereço Palmas": `CR Laser® Palmas - Procedimentos de Qualidade por um Preço Justo.

Palmas Medical, Q. 401 Sul, Avenida LO 11, 2 - Plano Diretor Sul, Palmas - TO, 77015-558

https://maps.app.goo.gl/M3LbY6j8XPw9xpHf8

(63) 98122-6319`,

  "Endereço Goiânia": `CR Laser® Goiânia - Procedimentos de Qualidade por um Preço Justo.

Buena Vista Office Design: Av. T-4, 619 - Sala 609 - St. Bueno, Goiânia - GO, 74230-035

https://maps.app.goo.gl/4FvQieRFew9X2y2T6

(62) 98549-9102`,

  "Endereço São Paulo": `CR Laser® São Paulo - Procedimentos de Qualidade por um Preço Justo.

Edifício Barão de Lorena: Alameda Lorena, 1611 - Sala 82 - Jardim Paulista, São Paulo - SP, 01424-007

https://maps.app.goo.gl/tuYyxyT4JwkPTh9h9

(11) 96729-2039`
};

const perguntasPorQueEscolher = {
  "Se eu for fechar, tem atendimento para realizar no dia que preciso?": `Os aparelhos ficam sempre na clínica, por isso não há complicações de data.

O máximo que pode acontecer é não ter exatamente o horário que você quer — pode haver outro paciente no horário ou a equipe estar atendendo.

Mas geralmente conseguimos um horário alternativo, mais cedo ou mais tarde, e em casos raros até um dia antes ou depois.`,

  "Qual a formação da equipe?": `Na CR Laser®, nosso processo seletivo é rigoroso e busca garantir a qualidade e segurança dos tratamentos oferecidos.

Selecionamos profissionais experientes, preferencialmente já atuantes no mercado, e submetemos os candidatos a uma criteriosa verificação de formação. Não temos nenhum profissional sem formação comprovada.

Após a aprovação no processo, os novos integrantes passam por um treinamento inicial, que inclui etapas teóricas e práticas.

O treinamento prático ocorre em outra unidade da CR Laser®, sob supervisão direta.

O primeiro paciente atendido pelo novo profissional é nosso CEO ou algum parente próximo. "Só posso liberar para atendimento se eu tiver coragem de ser atendido por ele."

A equipe é acompanhada diariamente e incentivada a estudar continuamente.

Como somos uma rede integrada, promovemos discussões regulares em equipe sobre casos reais, enriquecendo o aprendizado e a prática clínica.

Além disso, temos uma enfermeira esteta que faz visitas regulares e sem aviso prévio nas unidades para garantir que o padrão CR Laser® esteja sendo mantido.

Esse modelo reforça nosso compromisso com a excelência e assegura que nossos protocolos sejam seguidos com rigor e competência.

https://www.instagram.com/p/DJKvsUBJBdP/`,

  "O que dizem da CR Laser®?": `Caso ainda não conheça a CR Laser®.

Clique no link e veja a opinião de alguns clientes:

https://www.instagram.com/explore/tags/oquedizemdacrlaser/`,

  "Original Diamond": `Aprenda a identificar um bioestimulador original.

Aprenda a identificar o produto que está sendo usado.

Aprenda a identificar se não estão utilizando restos de produto.

https://www.instagram.com/reel/DJQKsFxJm5o/`,

  "Original Ultraformer MPT": `A CR Laser® trabalha com o Ultraformer MPT original e também com os cartuchos originais.

⚫️ O vídeo é um pouco longo, mas vale cada segundo.

⚫️ Confira se o aparelho é realmente o MPT e solicite a confirmação da autenticidade das ponteiras.

Obs.: Os aparelhos são da clínica, não utilizamos equipamentos alugados, e por isso ficam disponíveis todos os dias. Cada unidade possui seus próprios aparelhos.

https://www.instagram.com/p/DN5tkuRDdGm/`,

  "Original Preenchedor": `Aprenda a identificar um preenchedor de ácido hialurônico.

Aprenda a identificar o produto que está sendo usado e tenha certeza de que não é PMMA ou silicone.

Aprenda a identificar se não estão utilizando restos de produto.

https://www.instagram.com/reel/DJSq9Lvp-_g/`,

  "Quem realiza os procedimentos?": `Na CR Laser®, os procedimentos injetáveis são realizados por biomédica esteta experiente, seguindo protocolos rígidos de segurança e naturalidade, após treinamento direto com o fundador.

Tecnologias como Ultraformer MPT e Lavieen são realizadas pela equipe técnica (biomédica esteta e esteticista), todas altamente treinadas.

O treinamento inclui prática em outras unidades e finalização com as empresas fornecedoras dos aparelhos, garantindo segurança e qualidade.

Veja o que dizem:

https://www.instagram.com/explore/tags/oquedizemdacrlaser/`,

  "Segurança na compra": `🔒 Na CR Laser®, você compra com segurança!

Para garantir sua tranquilidade:

✅ Fale somente com os administradores do grupo;

✅ Verifique a razão social e o CNPJ antes de realizar qualquer pagamento;

https://www.instagram.com/reel/DJO6yycNKgi/`,

  "Comprar adiantado é seguro?": `Caso queira, pode aproveitar nosso sistema de vendas virtuais.

Você tem até um ano para realizar o procedimento.

A CR Laser® trabalha com um sistema tradicional de vendas virtuais.

Veja o que dizem quem já comprou:

https://www.instagram.com/p/Chh_74FuocW/?igshid=YmMyMTA2M2Y=`
};

const baseDuvidas = {
  'Bioestimulador': perguntasBioestimulador,
  'Botox': perguntasBotox,
  'Endymed': perguntasEndymed,
  'Lavieen': perguntasLavieen,
  'Preenchedor': perguntasPreenchedor,
  'Ultraformer MPT Corpo': perguntasUltraformerMPTCorpo,
  'Ultraformer MPT Face': perguntasUltraformerMPTFace,
  'Scizer': perguntasScizer,
  'Por que escolher a CR Laser®': perguntasPorQueEscolher,
  'Endereço': perguntasEndereco,
};

function carregarPerguntasDuvidas() {
  const procedimento   = document.getElementById('duvidaProcedimento').value;
  const selectPergunta = document.getElementById('duvidaPergunta');
  const box            = document.getElementById('duvidaRespostaBox');

  selectPergunta.innerHTML = '<option value="" disabled selected>Selecione a pergunta</option>';
  if (box) box.style.display = 'none';

  if (!procedimento || !baseDuvidas[procedimento]) return;

  Object.keys(baseDuvidas[procedimento]).forEach(function (pergunta) {
    const option       = document.createElement('option');
    option.value       = pergunta;
    option.textContent = pergunta;
    selectPergunta.appendChild(option);
  });
}

function mostrarRespostaDuvida() {
  const procedimento = document.getElementById('duvidaProcedimento').value;
  const pergunta     = document.getElementById('duvidaPergunta').value;
  const box          = document.getElementById('duvidaRespostaBox');
  const texto        = document.getElementById('duvidaRespostaTexto');

  if (!procedimento || !pergunta || !baseDuvidas[procedimento] || !baseDuvidas[procedimento][pergunta]) {
    if (box) box.style.display = 'none';
    if (texto) texto.innerHTML = '';
    return;
  }

  const resposta = baseDuvidas[procedimento][pergunta];

  /* Escapar HTML e converter URLs em links clicáveis */
  const escaped = resposta
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const linked = escaped.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  texto.innerHTML        = linked;
  box.style.display      = 'flex';

  setTimeout(function () {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

function qaCopiarResposta() {
  const texto = document.getElementById('duvidaRespostaTexto');
  const btn   = document.getElementById('btnCopiarQA');
  const text  = texto ? texto.textContent : '';

  const onSuccess = function () {
    btn.textContent = 'Copiado!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'COPIAR RESPOSTA';
      btn.classList.remove('copied');
    }, 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(function () { fallbackCopy(text, onSuccess); });
  } else {
    fallbackCopy(text, onSuccess);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("SW registrado"))
      .catch(err => console.log("Erro SW:", err));
  });
}
