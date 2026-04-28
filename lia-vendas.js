// ═══════════════════════════════════════════════════════════════════════════
// LIA VENDAS — Integrada ao site principal CR Laser®
// Adapta os IDs do novo lia.js (lia-vendas-dia30) para o site principal
// ═══════════════════════════════════════════════════════════════════════════

const unidades = {
  "1": { nome: "Brasília",  pix: "43.713.316/0001-33", whatsapp: "61981316493" },
  "2": { nome: "Campinas",  pix: "60.970.806/0001-34", whatsapp: "19991818366" },
  "3": { nome: "Goiânia",   pix: "39.252.455/0001-30", whatsapp: "62985499102" },
  "4": { nome: "Palmas",    pix: "18.986.800/0001-99", whatsapp: "63981226319" },
  "5": { nome: "São Paulo", pix: "54.153.510/0001-28", whatsapp: "11967292039" }
};

const procedimentos = {
  "botox facial":                { base: "Botox",                        regiao: "Facial" },
  "botox suor":                  { base: "Botox",                        regiao: "Axilar Suor" },
  "preenchedor":                 { base: "Preenchedor",                   regiao: "Uma Ampola" },
  "bioestimulador diamond":      { base: "Bioestimulador Diamond",         regiao: "Bioestimulador Diamond" },
  "scizer":                      { base: "Scizer",                       regiao: "Corporal Por Região" },
  "endymed":                     { base: "Endymed Radiofrequência 3DEEP", regiao: "Endymed Radiofrequência 3DEEP" },
  "lavieen facial":              { base: "Lavieen",                      regiao: "Facial completo" },
  "lavieen melasma":             { base: "Lavieen",                      regiao: "Melasma" },
  "lavieen bb laser":            { base: "Lavieen",                      regiao: "BB Laser Facial" },
  "lavieen olheiras":            { base: "Lavieen",                      regiao: "Olheiras" },
  "lavieen capilar":             { base: "Lavieen",                      regiao: "Capilar" },
  "lavieen maos":                { base: "Lavieen",                      regiao: "Mãos" },
  "ultraformer full face":       { base: "Ultraformer MPT",              regiao: "Full Face" },
  "mpt full face":               { base: "Ultraformer MPT",              regiao: "Full Face" },
  "ultraformer papada":          { base: "Ultraformer MPT",              regiao: "Papada" },
  "mpt papada":                  { base: "Ultraformer MPT",              regiao: "Papada" },
  "ultraformer palpebras":       { base: "Ultraformer MPT",              regiao: "Pálpebras" },
  "mpt palpebras":               { base: "Ultraformer MPT",              regiao: "Pálpebras" },
  "ultraformer pescoco":         { base: "Ultraformer MPT",              regiao: "Pescoço" },
  "mpt pescoco":                 { base: "Ultraformer MPT",              regiao: "Pescoço" },
  "ultraformer abdome":          { base: "Ultraformer MPT",              regiao: "Abdome" },
  "mpt abdome":                  { base: "Ultraformer MPT",              regiao: "Abdome" },
  "ultraformer flancos":         { base: "Ultraformer MPT",              regiao: "Flancos" },
  "mpt flancos":                 { base: "Ultraformer MPT",              regiao: "Flancos" },
  "ultraformer interno de coxa": { base: "Ultraformer MPT",              regiao: "Interno de Coxa" },
  "mpt interno de coxa":         { base: "Ultraformer MPT",              regiao: "Interno de Coxa" },
  "ultraformer bracos":          { base: "Ultraformer MPT",              regiao: "Braços Região do Tchau" },
  "mpt bracos":                  { base: "Ultraformer MPT",              regiao: "Braços Região do Tchau" },
  "ultraformer colo":            { base: "Ultraformer MPT",              regiao: "Colo" },
  "mpt colo":                    { base: "Ultraformer MPT",              regiao: "Colo" },
  "ultraformer maos":            { base: "Ultraformer MPT",              regiao: "Mãos" },
  "mpt maos":                    { base: "Ultraformer MPT",              regiao: "Mãos" }
};

const BOTOX_AMBIGUO = ["botox"];
const LAVIEEN_AMBIGUO = ["lavieen"];
const ULTRAFORMER_AMBIGUO = ["ultraformer", "ultraformer mpt", "mpt"];
const MICROAGULHAMENTO_AMBIGUO = ["microagulhamento", "microagulhamento robótico"];

const LINKS = {
  "Botox": {
    "Facial": {
      "Brasília": "https://cielolink.com.br/4t0kASi",
      "Campinas": "https://cielolink.com.br/4igbg8p",
      "Goiânia": "https://cielolink.com.br/4198sSD",
      "Palmas": "https://cielolink.com.br/4m1v7dh",
      "São Paulo": "https://cielolink.com.br/4sJCiJH"
    },
    "Axilar Suor": {
      "Brasília": "https://cielolink.com.br/41RXUHO",
      "Campinas": "https://cielolink.com.br/47P9eHd",
      "Goiânia": "https://cielolink.com.br/3O16Siy",
      "Palmas": "https://cielolink.com.br/4bGnHHA",
      "São Paulo": "https://cielolink.com.br/3PH1MbU"
    }
  },
  "Preenchedor": {
    "Uma Ampola": {
      "Brasília": "https://cielolink.com.br/4mcm7ls",
      "Campinas": "https://cielolink.com.br/3WUFXGd",
      "Goiânia": "https://cielolink.com.br/4s8p87T",
      "Palmas": "https://cielolink.com.br/417PGLr",
      "São Paulo": "https://cielolink.com.br/3Qa4AhM"
    }
  },
  "Bioestimulador Diamond": {
    "Bioestimulador Diamond": {
      "Brasília": "https://cielolink.com.br/3HUzUx6",
      "Campinas": "https://cielolink.com.br/49Vqe14",
      "Goiânia": "https://cielolink.com.br/4l02GKP",
      "Palmas": "https://cielolink.com.br/430UpzN",
      "São Paulo": "https://cielolink.com.br/4k3zUbn"
    }
  },
  "Scizer": {
    "Corporal Por Região": {
      "Brasília": "https://cielolink.com.br/4niM3My",
      "Campinas": "https://cielolink.com.br/492sZxn",
      "Goiânia": "https://cielolink.com.br/45zTkRL",
      "Palmas": "https://cielolink.com.br/4eiYZhj",
      "São Paulo": "https://cielolink.com.br/3T9bRgk"
    }
  },
  "Endymed Radiofrequência 3DEEP": {
    "Endymed Radiofrequência 3DEEP": {
      "Brasília": "https://cielolink.com.br/3ZHKOMQ",
      "Campinas": "https://cielolink.com.br/3JRggTU",
      "Goiânia": "https://cielolink.com.br/4nShFYx",
      "Palmas": "https://cielolink.com.br/48qTvA5",
      "São Paulo": "https://cielolink.com.br/3UwrWhb"
    }
  },
  "Ultraformer MPT": {
    "Full Face": { "Brasília": "https://cielolink.com.br/3IdBDxq", "Campinas": "https://cielolink.com.br/4hMMcVZ", "Goiânia": "https://cielolink.com.br/4kWJPjS", "Palmas": "https://cielolink.com.br/4pWxfEt", "São Paulo": "https://cielolink.com.br/4k8hne7" },
    "Papada": { "Brasília": "https://cielolink.com.br/40hOlS4", "Campinas": "https://cielolink.com.br/3WIYKnO", "Goiânia": "https://cielolink.com.br/3HBDoo6", "Palmas": "https://cielolink.com.br/43jpYF9", "São Paulo": "https://cielolink.com.br/4l2Kn8u" },
    "Pálpebras": { "Brasília": "https://cielolink.com.br/4nhX5l2", "Campinas": "https://cielolink.com.br/4hNiG2x", "Goiânia": "https://cielolink.com.br/4e0R2xc", "Palmas": "https://cielolink.com.br/4kEvokX", "São Paulo": "https://cielolink.com.br/4kbqN8K" },
    "Pescoço": { "Brasília": "https://cielolink.com.br/4nfB2eQ", "Campinas": "https://cielolink.com.br/49GEfzH", "Goiânia": "https://cielolink.com.br/3TmRlss", "Palmas": "https://cielolink.com.br/4htLaOz", "São Paulo": "https://cielolink.com.br/4kagiCH" },
    "Abdome": { "Brasília": "https://cielolink.com.br/3HXv3eI", "Campinas": "https://cielolink.com.br/4hNP19u", "Goiânia": "https://cielolink.com.br/3SJG05E", "Palmas": "https://cielolink.com.br/442qoAM", "São Paulo": "https://cielolink.com.br/4kZQudA" },
    "Flancos": { "Brasília": "https://cielolink.com.br/40mfAej", "Campinas": "https://cielolink.com.br/43ZgOxR", "Goiânia": "https://cielolink.com.br/4l7ONKW", "Palmas": "https://cielolink.com.br/4mtqtmV", "São Paulo": "https://cielolink.com.br/4k72hFF" },
    "Interno de Coxa": { "Brasília": "https://cielolink.com.br/46cVlDv", "Campinas": "https://cielolink.com.br/4oVCkf1", "Goiânia": "https://cielolink.com.br/4l0t870", "Palmas": "https://cielolink.com.br/44vVv7J", "São Paulo": "https://cielolink.com.br/43Yd5RH" },
    "Braços Região do Tchau": { "Brasília": "https://cielolink.com.br/4eiTq2d", "Campinas": "https://cielolink.com.br/3WIGD1q", "Goiânia": "https://cielolink.com.br/4kNv5Ej", "Palmas": "https://cielolink.com.br/44tQmx0", "São Paulo": "https://cielolink.com.br/3ZMX12H" },
    "Colo": { "Brasília": "https://cielolink.com.br/3Ta4F3v", "Campinas": "https://cielolink.com.br/3LokIdr", "Goiânia": "https://cielolink.com.br/3FAFMeh", "Palmas": "https://cielolink.com.br/421rBXD", "São Paulo": "https://cielolink.com.br/4kgUxRK" },
    "Mãos": { "Brasília": "https://cielolink.com.br/3TEQSlC", "Campinas": "https://cielolink.com.br/4ow6VQF", "Goiânia": "https://cielolink.com.br/43QLO3L", "Palmas": "https://cielolink.com.br/44cXY5M", "São Paulo": "https://cielolink.com.br/4k83M6q" }
  },
  "Lavieen": {
    "Facial completo": { "Brasília": "https://cielolink.com.br/4et2Nwv", "Campinas": "https://cielolink.com.br/4nRfu7u", "Goiânia": "https://cielolink.com.br/4e3tVC7", "Palmas": "https://cielolink.com.br/3ZOPUa6", "São Paulo": "https://cielolink.com.br/4emce0L" },
    "Melasma": { "Brasília": "https://cielolink.com.br/4lq229L", "Campinas": "https://cielolink.com.br/4qVchGD", "Goiânia": "https://cielolink.com.br/3FAKNU9", "Palmas": "https://cielolink.com.br/4lHjZ3Z", "São Paulo": "https://cielolink.com.br/46cJNjI" },
    "BB Laser Facial": { "Brasília": "https://cielolink.com.br/3FRMJI0", "Campinas": "https://cielolink.com.br/3JQmHGW", "Goiânia": "https://cielolink.com.br/3SPZWDV", "Palmas": "https://cielolink.com.br/3TEUqEs", "São Paulo": "https://cielolink.com.br/4l2Wq5I" },
    "Olheiras": { "Brasília": "https://cielolink.com.br/44lhygk", "Campinas": "https://cielolink.com.br/4oDzdc4", "Goiânia": "https://cielolink.com.br/3T9mPT7", "Palmas": "https://cielolink.com.br/3GbM7gn", "São Paulo": "https://cielolink.com.br/4emll1t" },
    "Capilar": { "Brasília": "https://cielolink.com.br/4lkw0vN", "Campinas": "https://cielolink.com.br/47S34Gf", "Goiânia": "https://cielolink.com.br/43WHyOD", "Palmas": "https://cielolink.com.br/3HVBYoy", "São Paulo": "https://cielolink.com.br/45FebmO" },
    "Mãos": { "Brasília": "https://cielolink.com.br/3ZO2Qgm", "Campinas": "https://cielolink.com.br/4hWmuyk", "Goiânia": "https://cielolink.com.br/3G0OsdM", "Palmas": "https://cielolink.com.br/4k2G6Ap", "São Paulo": "https://cielolink.com.br/4nzR2bZ" }
  },
  "Microagulhamento Robótico": {
    "Microagulhamento Robótico": {
      "Brasília": "https://cielolink.com.br/4tBloxc",
      "Campinas": "https://cielolink.com.br/3JqBkRb",
      "Goiânia": "https://cielolink.com.br/4sYCZPd",
      "Palmas": "https://cielolink.com.br/4bJmGjb",
      "São Paulo": "https://cielolink.com.br/3PGLpfC"
    }
  }
};

function normalizar(texto = "") {
  return String(texto).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function buscarLink(procedimentoBase, regiao, unidadeNome) {
  return LINKS?.[procedimentoBase]?.[regiao]?.[unidadeNome] || null;
}

function montarLinkWhatsApp(numeroUnidade) {
  const numeroLimpo = String(numeroUnidade || "").replace(/\D/g, "");
  return `https://wa.me/55${numeroLimpo}`;
}

function ehConsultaPrecoOuDuvida(texto) {
  const textoNorm = normalizar(texto);
  const termos = [
    "preco",
    "valor",
    "valores",
    "promocao",
    "oferta",
    "quanto custa",
    "custa",
    "custo",
    "duvida",
    "duvidas"
  ];

  return termos.some((termo) => textoNorm.includes(termo));
}

let estado = {
  etapa: "inicio",
  procedimentoDigitado: null,
  procedimentoBase: null,
  regiao: null,
  unidade: null
};

let aguardandoContinuidade = false;

function resetarEstado() {
  estado = { etapa: "inicio", procedimentoDigitado: null, procedimentoBase: null, regiao: null, unidade: null };
}

function perguntarUnidade() {
  adicionarMensagemNoChat("Perfeito 😊\n\nMe diga a unidade:\n\n1️⃣ Brasília\n2️⃣ Campinas\n3️⃣ Goiânia\n4️⃣ Palmas\n5️⃣ São Paulo", "lia");
}

function perguntarRegiaoUltraformer() {
  adicionarMensagemNoChat("Qual região do Ultraformer MPT você quer?\n\n1️⃣ Full Face\n2️⃣ Papada\n3️⃣ Pálpebras\n4️⃣ Pescoço\n5️⃣ Abdome\n6️⃣ Flancos\n7️⃣ Interno de Coxa\n8️⃣ Braços Região do Tchau\n9️⃣ Colo\n🔟 Mãos", "lia");
}

function analisarTextoProcedimento(texto) {
  const textoNorm = normalizar(texto);

  if (textoNorm.includes("ultraformer") || textoNorm.includes("mpt")) {
    if (textoNorm.includes("full face") || textoNorm.includes("rosto") || textoNorm.includes("face")) {
      estado.procedimentoBase = "Ultraformer MPT";
      estado.regiao = "Full Face";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    if (textoNorm.includes("papada")) {
      estado.procedimentoBase = "Ultraformer MPT";
      estado.regiao = "Papada";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    if (textoNorm.includes("palpebra")) {
      estado.procedimentoBase = "Ultraformer MPT";
      estado.regiao = "Pálpebras";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    estado.etapa = "ultraformer_regiao";
    perguntarRegiaoUltraformer();
    return true;
  }

  if (textoNorm.includes("botox")) {
    if (textoNorm.includes("facial")) {
      estado.procedimentoBase = "Botox";
      estado.regiao = "Facial";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    if (textoNorm.includes("suor") || textoNorm.includes("axilar")) {
      estado.procedimentoBase = "Botox";
      estado.regiao = "Axilar Suor";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    estado.etapa = "botox_regiao";
    adicionarMensagemNoChat("Você quer qual Botox?\n\n1️⃣ Botox facial\n2️⃣ Botox suor axilar", "lia");
    return true;
  }

  if (textoNorm.includes("lavieen")) {
    if (textoNorm.includes("melasma")) {
      estado.procedimentoBase = "Lavieen";
      estado.regiao = "Melasma";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    if (textoNorm.includes("facial")) {
      estado.procedimentoBase = "Lavieen";
      estado.regiao = "Facial completo";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    estado.etapa = "lavieen_regiao";
    adicionarMensagemNoChat("Qual Lavieen você quer?\n\n1️⃣ Facial completo\n2️⃣ Melasma\n3️⃣ BB Laser Facial\n4️⃣ Olheiras\n5️⃣ Capilar\n6️⃣ Mãos", "lia");
    return true;
  }

  if (
    textoNorm.includes("bioestimulador") ||
    textoNorm.includes("diamond")
  ) {
    estado.procedimentoBase = "Bioestimulador Diamond";
    estado.regiao = "Bioestimulador Diamond";
    estado.etapa = "unidade";
    perguntarUnidade();
    return true;
  }

  if (
    textoNorm.includes("preenchimento") ||
    textoNorm.includes("preenchedor") ||
    textoNorm.includes("acido hialuronico") ||
    textoNorm.includes("acido hialuronico") ||
    textoNorm.includes("hialuronico")
  ) {
    estado.procedimentoBase = "Preenchedor";
    estado.regiao = "Uma Ampola";
    estado.etapa = "unidade";
    perguntarUnidade();
    return true;
  }

  return false;
}

function adicionarMensagemNoChat(texto, tipo) {
  const liaMessages = document.getElementById("liaMessages");
  if (!liaMessages) return;

  const div = document.createElement("div");
  div.className = `lia-message-row ${tipo}`;
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.marginBottom = "12px";
  div.style.alignItems = tipo === "user" ? "flex-end" : "flex-start";

  const bolha = document.createElement("div");
  bolha.className = "lia-message-bubble";
  bolha.style.maxWidth = "85%";
  bolha.style.padding = "10px 12px";
  bolha.style.borderRadius = "14px";
  bolha.style.lineHeight = "1.5";
  bolha.style.fontSize = "14px";
  bolha.style.whiteSpace = "pre-wrap";
  bolha.style.wordBreak = "break-word";

  if (tipo === "user") {
    bolha.style.background = "rgba(24,199,209,0.12)";
    bolha.style.border = "1px solid rgba(24,199,209,0.30)";
    bolha.style.color = "#ffffff";
  } else {
    bolha.style.background = "rgba(255,255,255,0.05)";
    bolha.style.border = "1px solid rgba(255,255,255,0.10)";
    bolha.style.color = "#ffffff";
  }

  if (tipo === "lia" && /<a\s+href=/i.test(texto)) {
    bolha.innerHTML = texto;
  } else {
    bolha.textContent = texto;
  }

  div.appendChild(bolha);
  liaMessages.appendChild(div);
  bolha.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function responderLia(texto) {
  const chave = normalizar(texto);

  if (ehConsultaPrecoOuDuvida(texto) && estado.etapa === "inicio") {
    adicionarMensagemNoChat("Para ver os valores da oferta, use a parte de cima da página:\n\n1️⃣ Escolha o procedimento\n2️⃣ Clique em GERAR OFERTA\n\nSe quiser tirar dúvidas sobre o procedimento, use a parte de baixo da página em TIRE DÚVIDAS 😊", "lia");
    return;
  }

  if (aguardandoContinuidade) {
    const chaveLimpa = chave.replace(/[.,!?;:]/g, "").trim();
    const respostasEncerramento = new Set([
      "nao",
      "agora nao",
      "so isso",
      "obrigado",
      "obrigada",
      "valeu"
    ]);

    if (respostasEncerramento.has(chaveLimpa)) {
      adicionarMensagemNoChat("Perfeito 😊\n\nQualquer dúvida, estou por aqui.", "lia");
      aguardandoContinuidade = false;
      return;
    }

    aguardandoContinuidade = false;
  }

  if (estado.etapa === "inicio") {
    estado.procedimentoDigitado = texto;

    const textoNorm = texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (textoNorm.includes("ultraformer") || textoNorm.includes("mpt") || textoNorm === "ultra") {
      if (
        textoNorm.includes("full face") ||
        textoNorm.includes("rosto") ||
        textoNorm.includes("face")
      ) {
        estado.procedimentoBase = "Ultraformer MPT";
        estado.regiao = "Full Face";
        estado.etapa = "unidade";
        perguntarUnidade();
        return;
      }

      if (textoNorm.includes("papada")) {
        estado.procedimentoBase = "Ultraformer MPT";
        estado.regiao = "Papada";
        estado.etapa = "unidade";
        perguntarUnidade();
        return;
      }

      perguntarRegiaoUltraformer();
      return;
    }

    if (analisarTextoProcedimento(texto)) {
      return;
    }

    if (procedimentos[chave]) {
      estado.procedimentoBase = procedimentos[chave].base;
      estado.regiao = procedimentos[chave].regiao;
      estado.etapa = "unidade";
      perguntarUnidade();
      return;
    }

    if (BOTOX_AMBIGUO.includes(chave)) {
      estado.etapa = "botox_regiao";
      adicionarMensagemNoChat("Você quer qual Botox?\n\n1️⃣ Botox facial\n2️⃣ Botox suor axilar", "lia");
      return;
    }

    if (LAVIEEN_AMBIGUO.includes(chave)) {
      estado.etapa = "lavieen_regiao";
      adicionarMensagemNoChat("Qual Lavieen você quer?\n\n1️⃣ Facial completo\n2️⃣ Melasma\n3️⃣ BB Laser Facial\n4️⃣ Olheiras\n5️⃣ Capilar\n6️⃣ Mãos", "lia");
      return;
    }

    if (ULTRAFORMER_AMBIGUO.includes(chave)) {
      estado.etapa = "ultraformer_regiao";
      perguntarRegiaoUltraformer();
      return;
    }

    if (MICROAGULHAMENTO_AMBIGUO.includes(chave)) {
      estado.procedimentoBase = "Microagulhamento Robótico";
      estado.regiao = "Microagulhamento Robótico";
      estado.etapa = "unidade";
      perguntarUnidade();
      return;
    }

    adicionarMensagemNoChat("Me diga qual procedimento você quer comprar.", "lia");
    return;
  }

  if (estado.etapa === "botox_regiao") {
    const opcoes = {"1": { base: "Botox", regiao: "Facial" }, "2": { base: "Botox", regiao: "Axilar Suor" }, "botox facial": { base: "Botox", regiao: "Facial" }, "facial": { base: "Botox", regiao: "Facial" }, "botox suor": { base: "Botox", regiao: "Axilar Suor" }, "suor": { base: "Botox", regiao: "Axilar Suor" }, "axilar": { base: "Botox", regiao: "Axilar Suor" }};
    const op = opcoes[chave];
    if (!op) { adicionarMensagemNoChat("Escolha 1 para Botox facial ou 2 para Botox suor axilar.", "lia"); return; }
    estado.procedimentoBase = op.base; estado.regiao = op.regiao; estado.etapa = "unidade"; perguntarUnidade();
    return;
  }

  if (estado.etapa === "lavieen_regiao") {
    const opcoes = {"1": { base: "Lavieen", regiao: "Facial completo" }, "2": { base: "Lavieen", regiao: "Melasma" }, "3": { base: "Lavieen", regiao: "BB Laser Facial" }, "4": { base: "Lavieen", regiao: "Olheiras" }, "5": { base: "Lavieen", regiao: "Capilar" }, "6": { base: "Lavieen", regiao: "Mãos" }, "facial": { base: "Lavieen", regiao: "Facial completo" }, "melasma": { base: "Lavieen", regiao: "Melasma" }, "bb laser": { base: "Lavieen", regiao: "BB Laser Facial" }, "olheiras": { base: "Lavieen", regiao: "Olheiras" }, "capilar": { base: "Lavieen", regiao: "Capilar" }, "maos": { base: "Lavieen", regiao: "Mãos" }};
    const op = opcoes[chave];
    if (!op) { adicionarMensagemNoChat("Escolha uma opção de 1 a 6.", "lia"); return; }
    estado.procedimentoBase = op.base; estado.regiao = op.regiao; estado.etapa = "unidade"; perguntarUnidade();
    return;
  }

  if (estado.etapa === "ultraformer_regiao") {
    const opcoes = {"1": { base: "Ultraformer MPT", regiao: "Full Face" }, "2": { base: "Ultraformer MPT", regiao: "Papada" }, "3": { base: "Ultraformer MPT", regiao: "Pálpebras" }, "4": { base: "Ultraformer MPT", regiao: "Pescoço" }, "5": { base: "Ultraformer MPT", regiao: "Abdome" }, "6": { base: "Ultraformer MPT", regiao: "Flancos" }, "7": { base: "Ultraformer MPT", regiao: "Interno de Coxa" }, "8": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" }, "9": { base: "Ultraformer MPT", regiao: "Colo" }, "10": { base: "Ultraformer MPT", regiao: "Mãos" }, "full face": { base: "Ultraformer MPT", regiao: "Full Face" }, "papada": { base: "Ultraformer MPT", regiao: "Papada" }, "palpebras": { base: "Ultraformer MPT", regiao: "Pálpebras" }, "pescoco": { base: "Ultraformer MPT", regiao: "Pescoço" }, "abdome": { base: "Ultraformer MPT", regiao: "Abdome" }, "flancos": { base: "Ultraformer MPT", regiao: "Flancos" }, "interno de coxa": { base: "Ultraformer MPT", regiao: "Interno de Coxa" }, "bracos": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" }, "bracos regiao do tchau": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" }, "colo": { base: "Ultraformer MPT", regiao: "Colo" }, "maos": { base: "Ultraformer MPT", regiao: "Mãos" }};
    const op = opcoes[chave];
    if (!op) { adicionarMensagemNoChat("Escolha uma opção de 1 a 10.", "lia"); return; }
    estado.procedimentoBase = op.base; estado.regiao = op.regiao; estado.etapa = "unidade"; perguntarUnidade();
    return;
  }

  if (estado.etapa === "unidade") {
    if (!unidades[texto]) { adicionarMensagemNoChat("Escolha uma opção de 1 a 5.", "lia"); return; }
    estado.unidade = texto; estado.etapa = "pagamento"; adicionarMensagemNoChat("Você prefere:\n\n1️⃣ Pix\n2️⃣ Cartão", "lia");
    return;
  }

  if (estado.etapa === "pagamento") {
    const unidade = unidades[estado.unidade];
    const whatsappLink = montarLinkWhatsApp(unidade.whatsapp);
    if (texto === "1") {
      adicionarMensagemNoChat(`Perfeito 😊\n\nChave Pix:\n${unidade.pix}\n\n📲 Falar com a unidade no WhatsApp:\n<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer">${whatsappLink}</a>\n\nPosso te ajudar com mais algum procedimento? 😊`, "lia");
    } else if (texto === "2") {
      const link = buscarLink(estado.procedimentoBase, estado.regiao, unidade.nome);
      if (!link) { adicionarMensagemNoChat("Esse procedimento não está disponível para essa unidade nessa campanha.", "lia"); return; }
      adicionarMensagemNoChat(`Perfeito 😊\n\nFinalize sua compra pelo link abaixo:\n\n<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>\n\nApós o pagamento, envie o comprovante para o WhatsApp da unidade.\n\nCaso não tenha o telefone, basta me pedir dizendo qual é a sua unidade 😊`, "lia");
    } else { adicionarMensagemNoChat("Escolha 1 para Pix ou 2 para Cartão.", "lia"); return; }
    aguardandoContinuidade = texto === "1";
    resetarEstado();
    return;
  }
}

async function enviarMensagem() {
  const liaInput = document.getElementById("liaInput");
  if (!liaInput) return;

  const texto = liaInput.value.trim();
  if (!texto) return;

  adicionarMensagemNoChat(texto, "user");
  liaInput.value = "";

  await responderLia(texto.toLowerCase());
}

function garantirModalLia() {
  const modalExistente = document.getElementById("liaChat");
  if (modalExistente) return;

  const overlay = document.createElement("div");
  overlay.id = "liaOverlay";
  overlay.className = "lia-chat-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const chat = document.createElement("div");
  chat.id = "liaChat";
  chat.className = "lia-chat";
  chat.style.display = "none";
  chat.style.position = "fixed";
  chat.style.bottom = "80px";
  chat.style.right = "20px";
  chat.style.width = "320px";
  chat.style.maxHeight = "420px";
  chat.style.background = "#0b1a2a";
  chat.style.borderRadius = "16px";
  chat.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  chat.style.zIndex = "9999";
  chat.style.overflow = "hidden";

  chat.innerHTML = [
    '<div id="liaChatHeader" class="lia-chat-header" style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#0f2a44;color:#00c6ff;font-weight:bold;">',
    '  Fale com a Lia',
    '  <span id="btnFecharLia" style="cursor:pointer;">✕</span>',
    '</div>',
    '<div id="liaMessages" style="padding:10px;overflow-y:auto;max-height:280px;font-size:14px;color:#fff;"></div>',
    '<div id="liaInputBar" class="lia-chat-inputbar" style="display:flex;padding:10px;gap:6px;">',
    '  <input id="liaInput" placeholder="Digite sua dúvida..." style="flex:1;padding:8px;border-radius:8px;border:none;outline:none;"/>',
    '  <button id="btnEnviarLia" class="lia-send-btn" style="background:#00c6ff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;">Enviar ➤</button>',
    '</div>'
  ].join("\n");

  document.body.appendChild(overlay);
  document.body.appendChild(chat);
}

function initLiaVendasUI() {
  garantirModalLia();

  const btnAbrirLia = document.getElementById("btnAbrirLia");
  const btnFecharLia = document.getElementById("btnFecharLia");
  const liaChat = document.getElementById("liaChat");
  const liaOverlay = document.getElementById("liaOverlay");
  const btnEnviarLia = document.getElementById("btnEnviarLia");
  const liaInput = document.getElementById("liaInput");
  const liaMessages = document.getElementById("liaMessages");

  if (!liaChat || !btnEnviarLia || !liaInput || !liaMessages) return;

  function abrirLiaChat() {
    liaChat.style.zIndex = "12000";
    liaChat.style.display = "block";
    if (liaOverlay) {
      liaOverlay.classList.add("is-visible");
      liaOverlay.setAttribute("aria-hidden", "false");
    }
    liaInput.focus();
  }

  function fecharLiaChat() {
    liaChat.style.display = "none";
    if (liaOverlay) {
      liaOverlay.classList.remove("is-visible");
      liaOverlay.setAttribute("aria-hidden", "true");
    }
  }

  if (btnAbrirLia) {
    btnAbrirLia.onclick = (e) => {
      e.preventDefault();
      abrirLiaChat();
    };
  }

  if (btnFecharLia) {
    btnFecharLia.addEventListener("click", fecharLiaChat);
  }

  btnEnviarLia.type = "button";
  btnEnviarLia.addEventListener("click", enviarMensagem);
  liaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  });

  if (!liaMessages.dataset.liaInicializada) {
    adicionarMensagemNoChat("Oi, eu sou a Lia. Qual procedimento você quer fechar hoje?", "lia");
    liaMessages.dataset.liaInicializada = "1";
  }
}

window.enviarMensagem = enviarMensagem;

// Inicializa ao carregar o DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLiaVendasUI);
} else {
  initLiaVendasUI();
}
