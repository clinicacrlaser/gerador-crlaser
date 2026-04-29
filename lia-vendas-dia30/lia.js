const unidades = {
  "1": { nome: "Brasília",  pix: "43.713.316/0001-33", whatsapp: "61981316493" },
  "2": { nome: "Campinas",  pix: "60.970.806/0001-34", whatsapp: "19991818366" },
  "3": { nome: "Goiânia",   pix: "39.252.455/0001-30", whatsapp: "62985499102" },
  "4": { nome: "Palmas",    pix: "18.986.800/0001-99", whatsapp: "63981226319" },
  "5": { nome: "São Paulo", pix: "54.153.510/0001-28", whatsapp: "11967292039" }
};

// Mapeamento direto: texto digitado → { base, regiao }
const procedimentos = {
  // Botox (específicos)
  "botox facial":                { base: "Botox",                        regiao: "Facial" },
  "botox suor":                  { base: "Botox",                        regiao: "Axilar Suor" },
  // Outros procedimentos únicos
  "preenchedor":                 { base: "Preenchedor",                   regiao: "Uma Ampola" },
  "bioestimulador diamond":      { base: "Bioestimulador Diamond",        regiao: "Bioestimulador Diamond" },
  "scizer":                      { base: "Scizer",                       regiao: "Corporal Por Região" },
  "endymed":                     { base: "Endymed Radiofrequência 3DEEP", regiao: "Endymed Radiofrequência 3DEEP" },
  // Lavieen (específicos)
  "lavieen facial":              { base: "Lavieen",                      regiao: "Facial completo" },
  "lavieen melasma":             { base: "Lavieen",                      regiao: "Melasma" },
  "lavieen bb laser":            { base: "Lavieen",                      regiao: "BB Laser Facial" },
  "lavieen olheiras":            { base: "Lavieen",                      regiao: "Olheiras" },
  "lavieen capilar":             { base: "Lavieen",                      regiao: "Capilar" },
  "lavieen maos":                { base: "Lavieen",                      regiao: "Mãos" },
  // Ultraformer (específicos — via texto ou "mpt X")
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
  "ultraformer bracos":          { base: "Ultraformer MPT",              regiao: "Braços" },
  "mpt bracos":                  { base: "Ultraformer MPT",              regiao: "Braços" },
  "ultraformer colo":            { base: "Ultraformer MPT",              regiao: "Colo" },
  "mpt colo":                    { base: "Ultraformer MPT",              regiao: "Colo" },
  "ultraformer maos":            { base: "Ultraformer MPT",              regiao: "Mãos" },
  "mpt maos":                    { base: "Ultraformer MPT",              regiao: "Mãos" }
};

// Termos que exigem desambiguação antes de prosseguir
const BOTOX_AMBIGUO         = ["botox"];
const LAVIEEN_AMBIGUO       = ["lavieen"];
const ULTRAFORMER_AMBIGUO   = ["ultraformer", "ultraformer mpt", "mpt"];
const MICROAGULHAMENTO_AMBIGUO = ["microagulhamento", "microagulhamento robótico"];

// Links fixos por procedimento, região e unidade
const LINKS = {
  "Botox": {
    "Facial": {
      "Brasília": "https://cielolink.com.br/4t0kASi",
      "Campinas": "https://cielolink.com.br/4igbg8p",
      "Goiânia": "https://cielolink.com.br/4198sSD",
      "Palmas": "https://cielolink.com.br/4m1v7dh",
      "São Paulo": "https://cielolink.com.br/4sJCiJH"
    },
        "Full Face": {
          "Brasília": "https://cielolink.com.br/4bl7OGp",
          "Campinas": "https://cielolink.com.br/4hMMcVZ",
          "Goiânia": "https://cielolink.com.br/4kWJPjS",
          "Palmas": "https://cielolink.com.br/4pWxfEt",
          "São Paulo": "https://cielolink.com.br/4k8hne7"
    }
        "Papada": {
          "Brasília": "https://cielolink.com.br/4uqFdbb",
          "Campinas": "https://cielolink.com.br/3WIYKnO",
          "Goiânia": "https://cielolink.com.br/3HBDoo6",
          "Palmas": "https://cielolink.com.br/43jpYF9",
          "São Paulo": "https://cielolink.com.br/4l2Kn8u"
      "Palmas": "https://cielolink.com.br/417PGLr",
        "Pálpebras": {
          "Brasília": "https://cielolink.com.br/4b6AzaT",
          "Campinas": "https://cielolink.com.br/4hNiG2x",
          "Goiânia": "https://cielolink.com.br/4e0R2xc",
          "Palmas": "https://cielolink.com.br/4kEvokX",
          "São Paulo": "https://cielolink.com.br/4kbqN8K"
      "Campinas": "https://cielolink.com.br/49Vqe14",
        "Pescoço": {
          "Brasília": "https://cielolink.com.br/4rpyNX5",
          "Campinas": "https://cielolink.com.br/49GEfzH",
          "Goiânia": "https://cielolink.com.br/3TmRlss",
          "Palmas": "https://cielolink.com.br/4htLaOz",
          "São Paulo": "https://cielolink.com.br/4kagiCH"
    "Corporal Por Região": {
        "Abdome": {
          "Brasília": "https://cielolink.com.br/4ltYPr0",
          "Campinas": "https://cielolink.com.br/4hNP19u",
          "Goiânia": "https://cielolink.com.br/3SJG05E",
          "Palmas": "https://cielolink.com.br/442qoAM",
          "São Paulo": "https://cielolink.com.br/4kZQudA"
  },
        "Flancos": {
          "Brasília": "https://cielolink.com.br/4137fvY",
          "Campinas": "https://cielolink.com.br/43ZgOxR",
          "Goiânia": "https://cielolink.com.br/4l7ONKW",
          "Palmas": "https://cielolink.com.br/4mtqtmV",
          "São Paulo": "https://cielolink.com.br/4k72hFF"
      "São Paulo": "https://cielolink.com.br/3UwrWhb"
        "Interno de Coxa": {
          "Brasília": "https://cielolink.com.br/3P4eilw",
          "Campinas": "https://cielolink.com.br/4oVCkf1",
          "Goiânia": "https://cielolink.com.br/4l0t870",
          "Palmas": "https://cielolink.com.br/44vVv7J",
          "São Paulo": "https://cielolink.com.br/43Yd5RH"
      "Goiânia": "https://cielolink.com.br/4kWJPjS",
        "Braços Região do Tchau": {
          "Brasília": "https://cielolink.com.br/4rr6Ga4",
          "Campinas": "https://cielolink.com.br/3WIGD1q",
          "Goiânia": "https://cielolink.com.br/4kNv5Ej",
          "Palmas": "https://cielolink.com.br/44tQmx0",
          "São Paulo": "https://cielolink.com.br/3ZMX12H"
      "Goiânia": "https://cielolink.com.br/3HBDoo6",
        "Colo": {
          "Brasília": "https://cielolink.com.br/4b6u4Vw",
          "Campinas": "https://cielolink.com.br/3LokIdr",
          "Goiânia": "https://cielolink.com.br/3FAFMeh",
          "Palmas": "https://cielolink.com.br/421rBXD",
          "São Paulo": "https://cielolink.com.br/4kgUxRK"
      "Goiânia": "https://cielolink.com.br/4e0R2xc",
        "Mãos": {
          "Brasília": "https://cielolink.com.br/4sFedTA",
        },
        "Terço Inferior (Contorno Facial)": {
          "Brasília": "https://cielolink.com.br/4sACUka",
        },
        "Bichectomia": {
          "Brasília": "https://cielolink.com.br/4lKeYJb",
        },
        "Gordura do Sutiã": {
          "Brasília": "https://cielolink.com.br/4b8z8sB",
        },
        "Gordura Pré-Axilar": {
          "Brasília": "https://cielolink.com.br/4bC5SdP",
        },
        "Bananinha": {
          "Brasília": "https://cielolink.com.br/4bgR5Fv",
        },
        "Monte de Vênus": {
          "Brasília": "https://cielolink.com.br/4rrTWjm",
        },
        "Rejuvenescimento Íntimo": {
          "Brasília": "https://cielolink.com.br/3OXFe6x",
        },
        "Joelho": {
          "Brasília": "https://cielolink.com.br/4rtSr4q",
        },
        "Mãos": {
          "Brasília": "https://cielolink.com.br/4sFedTA",
        }
      "Goiânia": "https://cielolink.com.br/4l7ONKW",
      "Palmas": "https://cielolink.com.br/4mtqtmV",
      "São Paulo": "https://cielolink.com.br/4k72hFF"
    },
    "Interno de Coxa": {
      "Brasília": "https://cielolink.com.br/3P4eilw",
      "Campinas": "https://cielolink.com.br/4oVCkf1",
      "Goiânia": "https://cielolink.com.br/4l0t870",
      "Palmas": "https://cielolink.com.br/44vVv7J",
      "São Paulo": "https://cielolink.com.br/43Yd5RH"
    },
    "Braços Região do Tchau": {
      "Brasília": "https://cielolink.com.br/4rr6Ga4",
      "Campinas": "https://cielolink.com.br/3WIGD1q",
      "Goiânia": "https://cielolink.com.br/4kNv5Ej",
      "Palmas": "https://cielolink.com.br/44tQmx0",
      "São Paulo": "https://cielolink.com.br/3ZMX12H"
    },
    "Colo": {
      "Brasília": "https://cielolink.com.br/4b6u4Vw",
      "Campinas": "https://cielolink.com.br/3LokIdr",
      "Goiânia": "https://cielolink.com.br/3FAFMeh",
      "Palmas": "https://cielolink.com.br/421rBXD",
      "São Paulo": "https://cielolink.com.br/4kgUxRK"
    },
    "Mãos": {
      "Brasília": "https://cielolink.com.br/4sFedTA",
    },
    "Terço Inferior (Contorno Facial)": {
      "Brasília": "https://cielolink.com.br/4sACUka",
    },
    "Bichectomia": {
      "Brasília": "https://cielolink.com.br/4lKeYJb",
    },
    "Gordura do Sutiã": {
      "Brasília": "https://cielolink.com.br/4b8z8sB",
    },
    "Gordura Pré-Axilar": {
      "Brasília": "https://cielolink.com.br/4bC5SdP",
    },
    "Bananinha": {
      "Brasília": "https://cielolink.com.br/4bgR5Fv",
    },
    "Monte de Vênus": {
      "Brasília": "https://cielolink.com.br/4rrTWjm",
    },
    "Rejuvenescimento Íntimo": {
      "Brasília": "https://cielolink.com.br/3OXFe6x",
    },
    "Joelho": {
      "Brasília": "https://cielolink.com.br/4rtSr4q",
      "Campinas": "https://cielolink.com.br/4ow6VQF",
      "Goiânia": "https://cielolink.com.br/43QLO3L",
      "Palmas": "https://cielolink.com.br/44cXY5M",
      "São Paulo": "https://cielolink.com.br/4k83M6q"
    }
  },
  "Lavieen": {
    "Facial completo": {
      "Brasília": "https://cielolink.com.br/4et2Nwv",
      "Campinas": "https://cielolink.com.br/4nRfu7u",
      "Goiânia": "https://cielolink.com.br/4e3tVC7",
      "Palmas": "https://cielolink.com.br/3ZOPUa6",
      "São Paulo": "https://cielolink.com.br/4emce0L"
    },
    "Melasma": {
      "Brasília": "https://cielolink.com.br/4lq229L",
      "Campinas": "https://cielolink.com.br/4qVchGD",
      "Goiânia": "https://cielolink.com.br/3FAKNU9",
      "Palmas": "https://cielolink.com.br/4lHjZ3Z",
      "São Paulo": "https://cielolink.com.br/46cJNjI"
    },
    "BB Laser Facial": {
      "Brasília": "https://cielolink.com.br/3FRMJI0",
      "Campinas": "https://cielolink.com.br/3JQmHGW",
      "Goiânia": "https://cielolink.com.br/3SPZWDV",
      "Palmas": "https://cielolink.com.br/3TEUqEs",
      "São Paulo": "https://cielolink.com.br/4l2Wq5I"
    },
    "Olheiras": {
      "Brasília": "https://cielolink.com.br/44lhygk",
      "Campinas": "https://cielolink.com.br/4oDzdc4",
      "Goiânia": "https://cielolink.com.br/3T9mPT7",
      "Palmas": "https://cielolink.com.br/3GbM7gn",
      "São Paulo": "https://cielolink.com.br/4emll1t"
    },
    "Capilar": {
      "Brasília": "https://cielolink.com.br/4lkw0vN",
      "Campinas": "https://cielolink.com.br/47S34Gf",
      "Goiânia": "https://cielolink.com.br/43WHyOD",
      "Palmas": "https://cielolink.com.br/3HVBYoy",
      "São Paulo": "https://cielolink.com.br/45FebmO"
    },
    "Mãos": {
      "Brasília": "https://cielolink.com.br/3ZO2Qgm",
      "Campinas": "https://cielolink.com.br/4hWmuyk",
      "Goiânia": "https://cielolink.com.br/3G0OsdM",
      "Palmas": "https://cielolink.com.br/4k2G6Ap",
      "São Paulo": "https://cielolink.com.br/4nzR2bZ"
    }
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



// Busca link correto
function normalizar(texto = "") {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function buscarLink(procedimentoBase, regiao, unidadeNome) {
  return LINKS?.[procedimentoBase]?.[regiao]?.[unidadeNome] || null;
}

let estado = {
  etapa: "inicio",
  procedimentoDigitado: null,
  procedimentoBase: null,
  regiao: null,
  unidade: null
};

function resetarEstado() {
  estado = {
    etapa: "inicio",
    procedimentoDigitado: null,
    procedimentoBase: null,
    regiao: null,
    unidade: null
  };
}

function adicionarMensagem(texto, tipo) {
  const div = document.createElement("div");
  div.className = `msg ${tipo}`;
  div.innerText = texto;
  document.getElementById("messages").appendChild(div);
  div.scrollIntoView();
}

async function enviarMensagem() {
  const input = document.getElementById("userInput");
  const texto = input.value.trim();

  if (!texto) return;

  adicionarMensagem(texto, "user");
  input.value = "";

  await responder(texto.toLowerCase());
}

// Mensagem inicial ao abrir o chat
window.addEventListener('DOMContentLoaded', function() {
  const mensagens = document.getElementById('messages');
  if (mensagens && mensagens.children.length === 0) {
    adicionarMensagem(
      `Oi, eu sou a Lia 😊\n\nEstou aqui para te ajudar a comprar seu procedimento.\n\nQual procedimento você quer fazer?\n\nExemplo: Botox, Ultraformer, Lavieen`,
      "lia"
    );
  }
});

const MSG_UNIDADE = `Perfeito 😊

Escolha a unidade:

1️⃣ Brasília
2️⃣ Campinas
3️⃣ Goiânia
4️⃣ Palmas
5️⃣ São Paulo`;

function definirProcedimento(base, regiao) {
  estado.procedimentoBase = base;
  estado.regiao = regiao;
  estado.etapa = "unidade";
  adicionarMensagem(MSG_UNIDADE, "lia");
}

async function responder(texto) {

  // Dúvidas técnicas: intercepta e responde com mensagem padrão
  const duvidasTecnicas = [
    "como funciona",
    "dói",
    "doi",
    "quanto tempo dura",
    "quantas sessões",
    "quantas sessoes",
    "é seguro",
    "e seguro",
    "efeitos colaterais",
    "recuperação",
    "recuperacao",
    "resultado",
    "antes e depois",
    "posso fazer"
  ];
  const textoNormalizado = normalizar(texto);
  if (duvidasTecnicas.some(frase => textoNormalizado.includes(normalizar(frase)))) {
    adicionarMensagem(
      "Essa parte é melhor nossa equipe te explicar certinho 😊\n\nClique no botão 'WhatsApp' aqui embaixo que te direciono direto para a unidade.",
      "lia"
    );
    resetarEstado();
    return;
  }

  const chave = normalizar(texto);

  // ── ETAPA INICIO ────────────────────────────────────────────────
  if (estado.etapa === "inicio") {
    estado.procedimentoDigitado = texto;

    // Específico reconhecido diretamente
    if (procedimentos[chave]) {
      definirProcedimento(procedimentos[chave].base, procedimentos[chave].regiao);
      return;
    }

    // Ambíguo: Botox
    if (BOTOX_AMBIGUO.includes(chave)) {
      estado.etapa = "botox_regiao";
      adicionarMensagem(
`Você quer qual Botox?

1️⃣ Botox facial
2️⃣ Botox suor axilar`,
        "lia"
      );
      return;
    }

    // Ambíguo: Lavieen
    if (LAVIEEN_AMBIGUO.includes(chave)) {
      estado.etapa = "lavieen_regiao";
      adicionarMensagem(
`Qual Lavieen você quer?

1️⃣ Facial completo
2️⃣ Melasma
3️⃣ BB Laser Facial
4️⃣ Olheiras
5️⃣ Capilar
6️⃣ Mãos`,
        "lia"
      );
      return;
    }

    // Ambíguo: Ultraformer
    if (ULTRAFORMER_AMBIGUO.includes(chave)) {
      estado.etapa = "ultraformer_regiao";
      adicionarMensagem(
`Qual região do Ultraformer MPT você quer?

1️⃣ Full Face
2️⃣ Papada
3️⃣ Pálpebras
4️⃣ Pescoço
5️⃣ Abdome
6️⃣ Flancos
7️⃣ Interno de Coxa
8️⃣ Braços Região do Tchau
9️⃣ Colo
🔟 Mãos`,
        "lia"
      );
      return;
    }

    // Ambíguo: Microagulhamento
    if (MICROAGULHAMENTO_AMBIGUO.includes(chave)) {
      definirProcedimento("Microagulhamento Robótico", "Microagulhamento Robótico");
      return;
    }

    adicionarMensagem(
      `Oi, eu sou a Lia 😊\n\nEstou aqui para te ajudar a comprar seu procedimento.\n\nQual procedimento você quer fazer?\n\nExemplo: Botox, Ultraformer, Lavieen`,
      "lia"
    );
    return;
  }

  // ── BOTOX DESAMBIGUAÇÃO ─────────────────────────────────────────
  if (estado.etapa === "botox_regiao") {
    const opcoes = {
      "1": { base: "Botox", regiao: "Facial" },
      "2": { base: "Botox", regiao: "Axilar Suor" },
      "botox facial":       { base: "Botox", regiao: "Facial" },
      "facial":             { base: "Botox", regiao: "Facial" },
      "botox suor":         { base: "Botox", regiao: "Axilar Suor" },
      "suor":               { base: "Botox", regiao: "Axilar Suor" },
      "axilar":             { base: "Botox", regiao: "Axilar Suor" }
    };
    const op = opcoes[chave];
    if (!op) {
      adicionarMensagem("Escolha 1 para Botox facial ou 2 para Botox suor axilar.", "lia");
      return;
    }
    definirProcedimento(op.base, op.regiao);
    return;
  }

  // ── LAVIEEN DESAMBIGUAÇÃO ───────────────────────────────────────
  if (estado.etapa === "lavieen_regiao") {
    const opcoes = {
      "1": { base: "Lavieen", regiao: "Facial completo" },
      "2": { base: "Lavieen", regiao: "Melasma" },
      "3": { base: "Lavieen", regiao: "BB Laser Facial" },
      "4": { base: "Lavieen", regiao: "Olheiras" },
      "5": { base: "Lavieen", regiao: "Capilar" },
      "6": { base: "Lavieen", regiao: "Mãos" },
      "facial":      { base: "Lavieen", regiao: "Facial completo" },
      "melasma":     { base: "Lavieen", regiao: "Melasma" },
      "bb laser":    { base: "Lavieen", regiao: "BB Laser Facial" },
      "olheiras":    { base: "Lavieen", regiao: "Olheiras" },
      "capilar":     { base: "Lavieen", regiao: "Capilar" },
      "maos":        { base: "Lavieen", regiao: "Mãos" }
    };
    const op = opcoes[chave];
    if (!op) {
      adicionarMensagem("Escolha uma opção de 1 a 6.", "lia");
      return;
    }
    definirProcedimento(op.base, op.regiao);
    return;
  }

  // ── ULTRAFORMER DESAMBIGUAÇÃO ───────────────────────────────────
  if (estado.etapa === "ultraformer_regiao") {
    const opcoes = {
      "1":                 { base: "Ultraformer MPT", regiao: "Full Face" },
      "2":                 { base: "Ultraformer MPT", regiao: "Papada" },
      "3":                 { base: "Ultraformer MPT", regiao: "Pálpebras" },
      "4":                 { base: "Ultraformer MPT", regiao: "Pescoço" },
      "5":                 { base: "Ultraformer MPT", regiao: "Abdome" },
      "6":                 { base: "Ultraformer MPT", regiao: "Flancos" },
      "7":                 { base: "Ultraformer MPT", regiao: "Interno de Coxa" },
      "8":                 { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "9":                 { base: "Ultraformer MPT", regiao: "Colo" },
      "10":                { base: "Ultraformer MPT", regiao: "Mãos" },
      "full face":         { base: "Ultraformer MPT", regiao: "Full Face" },
      "papada":            { base: "Ultraformer MPT", regiao: "Papada" },
      "palpebras":         { base: "Ultraformer MPT", regiao: "Pálpebras" },
      "pescoco":           { base: "Ultraformer MPT", regiao: "Pescoço" },
      "abdome":            { base: "Ultraformer MPT", regiao: "Abdome" },
      "flancos":           { base: "Ultraformer MPT", regiao: "Flancos" },
      "interno de coxa":   { base: "Ultraformer MPT", regiao: "Interno de Coxa" },
      "bracos":            { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "bracos regiao do tchau": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "colo":              { base: "Ultraformer MPT", regiao: "Colo" },
      "maos":              { base: "Ultraformer MPT", regiao: "Mãos" }
    };
    const op = opcoes[chave];
    if (!op) {
      adicionarMensagem("Escolha uma opção de 1 a 10.", "lia");
      return;
    }
    definirProcedimento(op.base, op.regiao);
    return;
  }

  // ── UNIDADE ─────────────────────────────────────────────────────
  if (estado.etapa === "unidade") {
    if (!unidades[texto]) {
      adicionarMensagem("Escolha uma opção de 1 a 5.", "lia");
      return;
    }
    estado.unidade = texto;
    estado.etapa = "pagamento";
    adicionarMensagem(
`Você prefere:

1️⃣ Pix
2️⃣ Cartão`,
      "lia"
    );
    return;
  }

  // ── PAGAMENTO ────────────────────────────────────────────────────
  if (estado.etapa === "pagamento") {
    const unidade = unidades[estado.unidade];

    if (texto === "1") {
      adicionarMensagem(
`Perfeito 😊\n\nChave Pix:\n${unidade.pix}\n\nApós o pagamento, envie o comprovante 😊\n\nSe precisar falar com a unidade, clique no botão “WhatsApp das unidades” aqui na tela.`,
        "lia"
      );

    } else if (texto === "2") {
      const link = buscarLink(estado.procedimentoBase, estado.regiao, unidade.nome);

      if (!link) {
        adicionarMensagem(
`Esse procedimento não está disponível para essa unidade nessa campanha.`,
          "lia"
        );
        return;
      }

      adicionarMensagem(
`Perfeito 😊\n\nFinalize sua compra:\n${link}\n\nApós o pagamento, envie o comprovante 😊\n\nSe precisar falar com a unidade, clique no botão “WhatsApp das unidades” aqui na tela.`,
        "lia"
      );

    } else {
      adicionarMensagem("Escolha 1 para Pix ou 2 para Cartão.", "lia");
      return;
    }

    resetarEstado();
    return;
  }
}