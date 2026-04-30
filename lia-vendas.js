// Torna URLs em links clicáveis (apenas para mensagens da Lia)
function transformarLinks(texto) {
  return texto.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}
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

const mapaWhats = {
  "brasilia": "https://wa.me/5561981316493",
  "campinas": "https://wa.me/5519991818366",
  "goiania": "https://wa.me/5562985499102",
  "palmas": "https://wa.me/5563981226319",
  "sao paulo": "https://wa.me/5511967292039"
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
  "mpt maos":                    { base: "Ultraformer MPT",              regiao: "Mãos" },
  "ultraformer terco inferior":  { base: "Ultraformer MPT",              regiao: "Terço Inferior (Contorno Facial)" },
  "mpt terco inferior":          { base: "Ultraformer MPT",              regiao: "Terço Inferior (Contorno Facial)" },
  "ultraformer bichectomia":     { base: "Ultraformer MPT",              regiao: "Bichectomia" },
  "mpt bichectomia":             { base: "Ultraformer MPT",              regiao: "Bichectomia" },
  "ultraformer gordura do sutia":{ base: "Ultraformer MPT",              regiao: "Gordura do Sutiã" },
  "mpt gordura do sutia":        { base: "Ultraformer MPT",              regiao: "Gordura do Sutiã" },
  "ultraformer gordura pre-axilar": { base: "Ultraformer MPT",           regiao: "Gordura Pré-Axilar" },
  "mpt gordura pre-axilar":      { base: "Ultraformer MPT",              regiao: "Gordura Pré-Axilar" },
  "ultraformer bananinha":       { base: "Ultraformer MPT",              regiao: "Bananinha" },
  "mpt bananinha":               { base: "Ultraformer MPT",              regiao: "Bananinha" },
  "ultraformer monte de venus":  { base: "Ultraformer MPT",              regiao: "Monte de Vênus" },
  "mpt monte de venus":          { base: "Ultraformer MPT",              regiao: "Monte de Vênus" },
  "ultraformer rejuvenescimento intimo": { base: "Ultraformer MPT",      regiao: "Rejuvenescimento Íntimo" },
  "mpt rejuvenescimento intimo": { base: "Ultraformer MPT",              regiao: "Rejuvenescimento Íntimo" },
  "ultraformer joelho":          { base: "Ultraformer MPT",              regiao: "Joelho" },
  "mpt joelho":                  { base: "Ultraformer MPT",              regiao: "Joelho" }
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
    "Full Face": { "Brasília": "https://cielolink.com.br/4bl7OGp", "Campinas": "https://cielolink.com.br/4tMDvjY", "Goiânia": "https://cielolink.com.br/4uqhpnY", "Palmas": "https://cielolink.com.br/3Pg9XeW", "São Paulo": "https://cielolink.com.br/3Pwtg3I" },
    "Terço Inferior (Contorno Facial)": { "Brasília": "https://cielolink.com.br/4sACUka", "Campinas": "https://cielolink.com.br/42GGkXy", "Goiânia": "https://cielolink.com.br/3NdhYAS", "Palmas": "https://cielolink.com.br/4lvR8AM", "São Paulo": "https://cielolink.com.br/4w0JsLA" },
    "Papada": { "Brasília": "https://cielolink.com.br/4uqFdbb", "Campinas": "https://cielolink.com.br/4ufiXjA", "Goiânia": "https://cielolink.com.br/3OWFlPI", "Palmas": "https://cielolink.com.br/3P0PURP", "São Paulo": "https://cielolink.com.br/4rxKmvF" },
    "Bichectomia": { "Brasília": "https://cielolink.com.br/4lKeYJb", "Campinas": "https://cielolink.com.br/4cV5MgK", "Goiânia": "https://cielolink.com.br/4loG1JD", "Palmas": "https://cielolink.com.br/4rwTpwB", "São Paulo": "https://cielolink.com.br/4se67lq" },
    "Pescoço": { "Brasília": "https://cielolink.com.br/4rpyNX5", "Campinas": "https://cielolink.com.br/42BcGTB", "Goiânia": "https://cielolink.com.br/47wto9F", "Palmas": "https://cielolink.com.br/4lvvzQO", "São Paulo": "https://cielolink.com.br/3P6xQ8P" },
    "Colo": { "Brasília": "https://cielolink.com.br/4b6u4Vw", "Campinas": "https://cielolink.com.br/4t6ExpQ", "Goiânia": "https://cielolink.com.br/4b5t3gq", "Palmas": "https://cielolink.com.br/4232q6w", "São Paulo": "https://cielolink.com.br/46QG0s4" },
    "Pálpebras": { "Brasília": "https://cielolink.com.br/4b6AzaT", "Campinas": "https://cielolink.com.br/4mZaZsv", "Goiânia": "https://cielolink.com.br/4lsk5xd", "Palmas": "https://cielolink.com.br/4rLSJE5", "São Paulo": "https://cielolink.com.br/4bfM0gF" },
    "Abdome": { "Brasília": "https://cielolink.com.br/4ltYPr0", "Campinas": "https://cielolink.com.br/4t4dZp4", "Goiânia": "https://cielolink.com.br/4rsq072", "Palmas": "https://cielolink.com.br/3NfYFXC", "São Paulo": "https://cielolink.com.br/4s8AQ3h" },
    "Flancos": { "Brasília": "https://cielolink.com.br/4137fvY", "Campinas": "https://cielolink.com.br/490WUVK", "Goiânia": "https://cielolink.com.br/4djoUH3", "Palmas": "https://cielolink.com.br/4sECPfc", "São Paulo": "https://cielolink.com.br/4rr3CdY" },
    "Braços Região do Tchau": { "Brasília": "https://cielolink.com.br/4rr6Ga4", "Campinas": "https://cielolink.com.br/4ucoirX", "Goiânia": "https://cielolink.com.br/4bmjvfV", "Palmas": "https://cielolink.com.br/46RfXkw", "São Paulo": "https://cielolink.com.br/3NwqlaM" },
    "Gordura do Sutiã": { "Brasília": "https://cielolink.com.br/4b8z8sB", "Campinas": "https://cielolink.com.br/4unm2hT", "Goiânia": "https://cielolink.com.br/4bhjBoX", "Palmas": "https://cielolink.com.br/4lnaFTG", "São Paulo": "https://cielolink.com.br/47AssRx" },
    "Gordura Pré-Axilar": { "Brasília": "https://cielolink.com.br/4bC5SdP", "Campinas": "https://cielolink.com.br/4uinEcE", "Goiânia": "https://cielolink.com.br/3OWE0sd", "Palmas": "https://cielolink.com.br/4cKvxlB", "São Paulo": "https://cielolink.com.br/4uFtoye" },
    "Bananinha": { "Brasília": "https://cielolink.com.br/4bgR5Fv", "Campinas": "https://cielolink.com.br/4tBkC3f", "Goiânia": "https://cielolink.com.br/4uuMxmo", "Palmas": "https://cielolink.com.br/4s8STpW", "São Paulo": "https://cielolink.com.br/4s3epMB" },
    "Interno de Coxa": { "Brasília": "https://cielolink.com.br/3P4eilw", "Campinas": "https://cielolink.com.br/4uhYTNI", "Goiânia": "https://cielolink.com.br/47FtNGK", "Palmas": "https://cielolink.com.br/40ZYMto", "São Paulo": "https://cielolink.com.br/46SAnJR" },
    "Monte de Vênus": { "Brasília": "https://cielolink.com.br/4rrTWjm", "Campinas": "https://cielolink.com.br/4n8VVZx", "Goiânia": "https://cielolink.com.br/4dgL8td", "Palmas": "https://cielolink.com.br/415jZSI", "São Paulo": "https://cielolink.com.br/3PeblyH" },
    "Rejuvenescimento Íntimo": { "Brasília": "https://cielolink.com.br/3OXFe6x", "Campinas": "https://cielolink.com.br/4cVNdsQ", "Goiânia": "https://cielolink.com.br/4urvq4S", "Palmas": "https://cielolink.com.br/4sGnWZU", "São Paulo": "https://cielolink.com.br/4ursPIa" },
    "Joelho": { "Brasília": "https://cielolink.com.br/4rtSr4q", "Campinas": "https://cielolink.com.br/49hYZwB", "Goiânia": "https://cielolink.com.br/3NvmN8G", "Palmas": "https://cielolink.com.br/4ddGU5K", "São Paulo": "https://cielolink.com.br/3PgTXcC" },
    "Mãos": { "Brasília": "https://cielolink.com.br/4sFedTA", "Campinas": "https://cielolink.com.br/41ZHYn4", "Goiânia": "https://cielolink.com.br/3Nlqz4v", "Palmas": "https://cielolink.com.br/4loaIih", "São Paulo": "https://cielolink.com.br/40ZDXyf" }
  },
  "Lavieen": {
    "Facial completo": { "Brasília": "https://cielolink.com.br/4rwLbVv", "Campinas": "https://cielolink.com.br/4ddzH5d", "Palmas": "https://cielolink.com.br/4rlVGe1", "São Paulo": "https://cielolink.com.br/4s3iy37", "Goiânia": "https://cielolink.com.br/47uV3I1" },
    "Face + Pescoço": { "Brasília": "https://cielolink.com.br/4n95pnB", "Campinas": "https://cielolink.com.br/3QHPIrm", "Palmas": "https://cielolink.com.br/4di89vS", "São Paulo": "https://cielolink.com.br/3P1emm5", "Goiânia": "https://cielolink.com.br/4bhnj1W" },
    "Pescoço + Colo": { "Brasília": "https://cielolink.com.br/4uinWku", "Campinas": "https://cielolink.com.br/3PaoJ7m", "Palmas": "https://cielolink.com.br/4uJ7Ctx", "São Paulo": "https://cielolink.com.br/4ltm9oO", "Goiânia": "https://cielolink.com.br/3QGKpbE" },
    "Face + Pescoço + Colo": { "Brasília": "https://cielolink.com.br/3Pl1Mhv", "Campinas": "https://cielolink.com.br/3QHKMTm", "Palmas": "https://cielolink.com.br/4sIWURL", "São Paulo": "https://cielolink.com.br/4t1yXp9", "Goiânia": "https://cielolink.com.br/4bnyUN9" },
    "BBLaser Facial": { "Brasília": "https://cielolink.com.br/46UAzsa", "Campinas": "https://cielolink.com.br/4mZpzjW", "Palmas": "https://cielolink.com.br/4b7OnC6", "São Paulo": "https://cielolink.com.br/3Njtx9u", "Goiânia": "https://cielolink.com.br/4rx5H8d" },
    "Melasma": { "Brasília": "https://cielolink.com.br/4rq5qEl", "Campinas": "https://cielolink.com.br/49i0ESR", "Palmas": "https://cielolink.com.br/4sBqPv6", "São Paulo": "https://cielolink.com.br/46R9gio", "Goiânia": "https://cielolink.com.br/4ur9jve" },
    "Olheiras": { "Brasília": "https://cielolink.com.br/40tKi54", "Campinas": "https://cielolink.com.br/4w6BlNF", "Palmas": "https://cielolink.com.br/4lnBGX6", "São Paulo": "https://cielolink.com.br/4cPcNQd", "Goiânia": "https://cielolink.com.br/4bjPwoS" },
    "Capilar": { "Brasília": "https://cielolink.com.br/4sLSPMP", "Campinas": "https://cielolink.com.br/4tGdl2b", "Palmas": "https://cielolink.com.br/4syXJMM", "São Paulo": "https://cielolink.com.br/4uffgue", "Goiânia": "https://cielolink.com.br/4lt89LV" },
    "Mãos": { "Brasília": "https://cielolink.com.br/4ls4cH1", "Campinas": "https://cielolink.com.br/4uhYsTp", "Palmas": "https://cielolink.com.br/47xmDV5", "São Paulo": "https://cielolink.com.br/48uzmsj", "Goiânia": "https://cielolink.com.br/4bleST8" }
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
    "custo"
  ];

  return termos.some((termo) => textoNorm.includes(termo));
}

function ehIntencaoCompraClara(texto) {
  const textoNorm = normalizar(texto);
  const termosCompra = [
    "quero comprar",
    "quero fechar",
    "vou comprar",
    "comprar",
    "fechar",
    "pagar",
    "pagamento",
    "pix",
    "cartao",
    "link de pagamento"
  ];

  return termosCompra.some((termo) => textoNorm.includes(termo));
}

function ehDuvidaTecnica(texto) {
  const textoNorm = normalizar(texto);
  const termosTecnicos = [
    "o que e",
    "explicacao",
    "indicacao",
    "resultado",
    "contraindic",
    "doi",
    "duracao",
    "dura",
    "sessao",
    "sessoes",
    "efeito",
    "risco",
    "comparacao",
    "diferenca",
    "funciona",
    "serve para",
    "melhor tratamento",
    "melhor procedimento",
    "qual melhor",
    "qual procedimento"
  ];

  return termosTecnicos.some((termo) => textoNorm.includes(termo));
}

function identificarUnidadePorTexto(texto) {
  const chave = normalizar(texto);
  if (unidades[chave]) return unidades[chave];

  if (chave.includes("brasilia")) return unidades["1"];
  if (chave.includes("campinas")) return unidades["2"];
  if (chave.includes("goiania")) return unidades["3"];
  if (chave.includes("palmas")) return unidades["4"];
  if (chave.includes("sao paulo")) return unidades["5"];

  return null;
}

function buscarLinkWhatsApp(texto) {
  const chave = normalizar(texto);
  if (mapaWhats[chave]) return mapaWhats[chave];

  if (chave.includes("brasilia")) return mapaWhats["brasilia"];
  if (chave.includes("campinas")) return mapaWhats["campinas"];
  if (chave.includes("goiania")) return mapaWhats["goiania"];
  if (chave.includes("palmas")) return mapaWhats["palmas"];
  if (chave.includes("sao paulo")) return mapaWhats["sao paulo"];

  return null;
}

function ehMensagemAgradecimento(texto) {
  const chave = normalizar(texto).replace(/[.,!?;:]/g, "").trim();
  const agradecimentos = new Set([
    "obrigado",
    "obrigada",
    "valeu",
    "obg",
    "agradeco"
  ]);

  return agradecimentos.has(chave);
}

function ehMensagemEncerramento(texto) {
  const chave = normalizar(texto).replace(/[.,!?;:]/g, "").trim();
  const encerramentos = new Set([
    "ok",
    "certo",
    "entendi",
    "obrigado",
    "obrigada",
    "no momento nao",
    "no momento nao quero mais nada",
    "agora nao",
    "nao quero mais nada",
    "so isso",
    "era so isso"
  ]);

  return encerramentos.has(chave);
}

function ehTrocaDeProcedimento(texto) {
  const textoNorm = normalizar(texto);
  const gatilhos = [
    "ultraformer",
    "mpt",
    "lavieen",
    "botox",
    "preenchimento",
    "bioestimulador"
  ];

  return gatilhos.some((gatilho) => textoNorm.includes(gatilho));
}

let estado = {
  etapa: "inicio",
  procedimentoDigitado: null,
  procedimentoBase: null,
  regiao: null,
  unidade: null
};

let aguardandoContinuidade = false;
let aguardandoUnidadeHumano = false;
let aguardandoUnidadeParaTelefone = false;

function resetarEstado() {
  estado = { etapa: "inicio", procedimentoDigitado: null, procedimentoBase: null, regiao: null, unidade: null };
}

function perguntarUnidade() {
  adicionarMensagemNoChat("Perfeito 😊\n\nMe diga a unidade:\n\n1️⃣ Brasília\n2️⃣ Campinas\n3️⃣ Goiânia\n4️⃣ Palmas\n5️⃣ São Paulo", "lia");
}

function perguntarRegiaoUltraformer() {
  adicionarMensagemNoChat("Qual região do Ultraformer MPT você quer?\n\n1️⃣ Full Face\n2️⃣ Terço Inferior (Contorno Facial)\n3️⃣ Papada\n4️⃣ Bichectomia\n5️⃣ Pescoço\n6️⃣ Colo\n7️⃣ Pálpebras\n8️⃣ Abdome\n9️⃣ Flancos\n🔟 Braços Região do Tchau\n1️⃣1️⃣ Gordura do Sutiã\n1️⃣2️⃣ Gordura Pré-Axilar\n1️⃣3️⃣ Bananinha\n1️⃣4️⃣ Interno de Coxa\n1️⃣5️⃣ Monte de Vênus\n1️⃣6️⃣ Rejuvenescimento Íntimo\n1️⃣7️⃣ Joelho\n1️⃣8️⃣ Mãos", "lia");
}

function contemAlgum(textoNorm, termos) {
  return termos.some((termo) => textoNorm.includes(termo));
}

const SINONIMOS_PROCEDIMENTO = {
  botoxFacial: ["botox", "toxina", "rugas", "linhas", "testa", "pe de galinha"],
  preenchedor: ["preenchimento", "preenchedor", "acido hialuronico", "labios", "boca", "olheira", "bigode chines"],
  ultraformer: ["ultra", "ultraformer", "mpt", "flacidez", "lifting", "pele caida", "rosto caido", "papada"],
  lavieen: ["lavieen", "melasma", "mancha", "manchas", "pele manchada"],
  scizer: ["gordura", "gordura localizada", "barriga", "flanco", "culote"],
  endymed: ["flacidez leve", "pele mole", "braco mole", "pescoco"]
};

function analisarTextoProcedimento(texto) {
  const textoNorm = normalizar(texto);

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.endymed)) {
    estado.procedimentoBase = "Endymed Radiofrequência 3DEEP";
    estado.regiao = "Endymed Radiofrequência 3DEEP";
    estado.etapa = "unidade";
    perguntarUnidade();
    return true;
  }

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.scizer)) {
    estado.procedimentoBase = "Scizer";
    estado.regiao = "Corporal Por Região";
    estado.etapa = "unidade";
    perguntarUnidade();
    return true;
  }

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.ultraformer)) {
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

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.botoxFacial)) {
    const mencionaBotox = textoNorm.includes("botox");
    const mencionaTipoEspecifico = textoNorm.includes("facial") || textoNorm.includes("suor") || textoNorm.includes("axilar");

    if (mencionaBotox && !mencionaTipoEspecifico) {
      estado.etapa = "tipoBotox";
      adicionarMensagemNoChat("Você quer qual Botox?\n\n1️⃣ Botox facial\n2️⃣ Botox suor axilar", "lia");
      return true;
    }

    if (textoNorm.includes("suor") || textoNorm.includes("axilar")) {
      estado.procedimentoBase = "Botox";
      estado.regiao = "Axilar Suor";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }

    if (textoNorm.includes("facial") || contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.botoxFacial.filter((termo) => termo !== "botox"))) {
      estado.procedimentoBase = "Botox";
      estado.regiao = "Facial";
      estado.etapa = "unidade";
      perguntarUnidade();
      return true;
    }
  }

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.lavieen)) {
    if (textoNorm.includes("melasma") || textoNorm.includes("mancha") || textoNorm.includes("pele manchada")) {
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

  if (contemAlgum(textoNorm, SINONIMOS_PROCEDIMENTO.preenchedor) || textoNorm.includes("hialuronico")) {
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
    bolha.style.background = "#163047";
    bolha.style.border = "1px solid rgba(24,199,209,0.35)";
    bolha.style.color = "#ffffff";
  } else {
    bolha.style.background = "#0f1e2e";
    bolha.style.border = "1px solid rgba(255,255,255,0.12)";
    bolha.style.color = "#ffffff";
  }

  if (tipo === "lia" && typeof texto === "object" && texto.tipo === "pagamento" && texto.linkPagamento) {
    bolha.innerHTML = `${texto.texto.replace(/\n/g, '<br>')}<br><button type="button" class="btn-link-pagamento" style="margin-top:16px;background:#00c6ff;border:none;padding:12px 20px;border-radius:8px;cursor:pointer;font-weight:700;color:#0b1a2a;font-size:16px;pointer-events:auto;">Abrir pagamento</button>`;
    const btn = bolha.querySelector('.btn-link-pagamento');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        window.open(texto.linkPagamento, '_blank', 'noopener,noreferrer');
      });
    }
  } else if (tipo === "lia") {
    bolha.innerHTML = transformarLinks(typeof texto === "string" ? texto : "");
  } else {
    bolha.textContent = texto;
  }

  div.appendChild(bolha);
  liaMessages.appendChild(div);

  const botoesCopiar = bolha.querySelectorAll(".btn-copiar-pix[data-pix]");
  botoesCopiar.forEach((botao) => {
    if (botao.dataset.bound === "1") return;
    botao.dataset.bound = "1";
    botao.addEventListener("click", async () => {
      const pix = botao.dataset.pix || "";
      const textoOriginal = botao.textContent || "Copiar Pix";
      let copiado = false;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(pix);
          copiado = true;
        }
      } catch (e) {
        copiado = false;
      }

      if (!copiado) {
        const campo = document.createElement("textarea");
        campo.value = pix;
        campo.style.position = "fixed";
        campo.style.opacity = "0";
        document.body.appendChild(campo);
        campo.focus();
        campo.select();
        try {
          copiado = document.execCommand("copy");
        } catch (e) {
          copiado = false;
        }
        document.body.removeChild(campo);
      }

      if (copiado) {
        botao.textContent = "Pix copiado ✅";
        setTimeout(() => {
          botao.textContent = textoOriginal;
        }, 1800);
      }
    });
  });

  liaMessages.scrollTop = liaMessages.scrollHeight;
  setTimeout(() => {
    liaMessages.scrollTop = liaMessages.scrollHeight;
  }, 50);
}

async function responderLia(texto) {
  const chave = normalizar(texto);

  // NOVO: Se usuário digitou um novo procedimento, resetar estado antes de processar
  // Não reseta se for só número
  const palavrasChaveProc = [
    "botox", "ultraformer", "mpt", "lavieen", "scizer", "endymed", "bioestimulador", "preench", "microagulhamento", "depilacao", "depilação", "luz pulsada"
  ];
  const ehApenasNumero = /^[0-9]+$/.test(texto.trim());
  const textoNorm = normalizar(texto);
  if (!ehApenasNumero && palavrasChaveProc.some(p => textoNorm.includes(p))) {
    resetarEstado();
  }

  if (ehMensagemEncerramento(texto) && !ehIntencaoCompraClara(texto)) {
    aguardandoContinuidade = false;
    aguardandoUnidadeHumano = false;
    aguardandoUnidadeParaTelefone = false;
    resetarEstado();
    adicionarMensagemNoChat("Perfeito 😊\n\nFico à disposição.", "lia");
    return;
  }

  if (ehMensagemAgradecimento(texto)) {
    aguardandoContinuidade = false;
    aguardandoUnidadeHumano = false;
    aguardandoUnidadeParaTelefone = false;
    resetarEstado();
    adicionarMensagemNoChat("Por nada 😊\n\nVamos fechar mais algum?", "lia");
    return;
  }

  if (estado.etapa !== "inicio" && ehTrocaDeProcedimento(texto)) {
    aguardandoContinuidade = false;
    aguardandoUnidadeHumano = false;
    aguardandoUnidadeParaTelefone = false;
    resetarEstado();

    adicionarMensagemNoChat("Perfeito 😊\n\nVamos começar.\n\nMe diga qual procedimento você quer comprar.", "lia");

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
      estado.etapa = "tipoBotox";
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
  }

  if (aguardandoUnidadeHumano) {
    const unidade = identificarUnidadePorTexto(texto);
    if (unidade) {
      const whatsappLink = montarLinkWhatsApp(unidade.whatsapp);
      adicionarMensagemNoChat(`Perfeito 😊\n\nWhatsApp da unidade ${unidade.nome}:\n<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer">${whatsappLink}</a>`, "lia");
      aguardandoUnidadeHumano = false;
      return;
    }

    adicionarMensagemNoChat("Me diga sua unidade para eu te enviar o WhatsApp correto:\n\n1️⃣ Brasília\n2️⃣ Campinas\n3️⃣ Goiânia\n4️⃣ Palmas\n5️⃣ São Paulo", "lia");
    return;
  }

  if (aguardandoUnidadeParaTelefone) {
    const whatsappLink = buscarLinkWhatsApp(texto);
    if (whatsappLink) {
      adicionarMensagemNoChat(`Perfeito 😊\n\nFale com a unidade pelo WhatsApp:\n<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer">${whatsappLink}</a>`, "lia");
      aguardandoUnidadeParaTelefone = false;
      resetarEstado();
      return;
    }

    adicionarMensagemNoChat("Me diga sua unidade:\n\n1️⃣ Brasília\n2️⃣ Campinas\n3️⃣ Goiânia\n4️⃣ Palmas\n5️⃣ São Paulo", "lia");
    return;
  }

  if (estado.etapa === "inicio" && ehDuvidaTecnica(texto) && !ehIntencaoCompraClara(texto)) {
    adicionarMensagemNoChat("Ainda estou em treinamento para dúvidas 😊\n\nPara te orientar melhor, fale direto com a unidade.\n\nQuer que eu te passe o WhatsApp?", "lia");
    aguardandoUnidadeHumano = true;
    return;
  }

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
      estado.etapa = "tipoBotox";
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

    adicionarMensagemNoChat("Me diga o procedimento que você quer comprar 😊\nExemplo: Botox, Ultraformer, Lavieen", "lia");
    return;
  }

  if (estado.etapa === "tipoBotox" || estado.etapa === "botox_regiao") {
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
    const opcoes = {
      "1": { base: "Ultraformer MPT", regiao: "Full Face" },
      "2": { base: "Ultraformer MPT", regiao: "Terço Inferior (Contorno Facial)" },
      "3": { base: "Ultraformer MPT", regiao: "Papada" },
      "4": { base: "Ultraformer MPT", regiao: "Bichectomia" },
      "5": { base: "Ultraformer MPT", regiao: "Pescoço" },
      "6": { base: "Ultraformer MPT", regiao: "Colo" },
      "7": { base: "Ultraformer MPT", regiao: "Pálpebras" },
      "8": { base: "Ultraformer MPT", regiao: "Abdome" },
      "9": { base: "Ultraformer MPT", regiao: "Flancos" },
      "10": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "11": { base: "Ultraformer MPT", regiao: "Gordura do Sutiã" },
      "12": { base: "Ultraformer MPT", regiao: "Gordura Pré-Axilar" },
      "13": { base: "Ultraformer MPT", regiao: "Bananinha" },
      "14": { base: "Ultraformer MPT", regiao: "Interno de Coxa" },
      "15": { base: "Ultraformer MPT", regiao: "Monte de Vênus" },
      "16": { base: "Ultraformer MPT", regiao: "Rejuvenescimento Íntimo" },
      "17": { base: "Ultraformer MPT", regiao: "Joelho" },
      "18": { base: "Ultraformer MPT", regiao: "Mãos" },
      "full face": { base: "Ultraformer MPT", regiao: "Full Face" },
      "terco inferior": { base: "Ultraformer MPT", regiao: "Terço Inferior (Contorno Facial)" },
      "contorno facial": { base: "Ultraformer MPT", regiao: "Terço Inferior (Contorno Facial)" },
      "terco inferior (contorno facial)": { base: "Ultraformer MPT", regiao: "Terço Inferior (Contorno Facial)" },
      "papada": { base: "Ultraformer MPT", regiao: "Papada" },
      "bichectomia": { base: "Ultraformer MPT", regiao: "Bichectomia" },
      "pescoco": { base: "Ultraformer MPT", regiao: "Pescoço" },
      "colo": { base: "Ultraformer MPT", regiao: "Colo" },
      "palpebras": { base: "Ultraformer MPT", regiao: "Pálpebras" },
      "abdome": { base: "Ultraformer MPT", regiao: "Abdome" },
      "flancos": { base: "Ultraformer MPT", regiao: "Flancos" },
      "bracos": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "bracos regiao do tchau": { base: "Ultraformer MPT", regiao: "Braços Região do Tchau" },
      "gordura do sutia": { base: "Ultraformer MPT", regiao: "Gordura do Sutiã" },
      "gordura pre-axilar": { base: "Ultraformer MPT", regiao: "Gordura Pré-Axilar" },
      "gordura pre axilar": { base: "Ultraformer MPT", regiao: "Gordura Pré-Axilar" },
      "bananinha": { base: "Ultraformer MPT", regiao: "Bananinha" },
      "interno de coxa": { base: "Ultraformer MPT", regiao: "Interno de Coxa" },
      "monte de venus": { base: "Ultraformer MPT", regiao: "Monte de Vênus" },
      "rejuvenescimento intimo": { base: "Ultraformer MPT", regiao: "Rejuvenescimento Íntimo" },
      "joelho": { base: "Ultraformer MPT", regiao: "Joelho" },
      "maos": { base: "Ultraformer MPT", regiao: "Mãos" }
    };
    const op = opcoes[chave];
    if (!op) { adicionarMensagemNoChat("Escolha uma opção de 1 a 18.", "lia"); return; }
    estado.procedimentoBase = op.base; estado.regiao = op.regiao; estado.etapa = "unidade"; perguntarUnidade();
    return;
  }

  if (estado.etapa === "unidade") {
    if (!unidades[texto]) { adicionarMensagemNoChat("Escolha uma opção de 1 a 5.", "lia"); return; }
    estado.unidade = texto; estado.etapa = "pagamento"; adicionarMensagemNoChat("Como você prefere pagar?\n\n1️⃣ Pix\n2️⃣ Cartão", "lia");
    return;
  }

  if (estado.etapa === "pagamento") {
    const unidade = unidades[estado.unidade];
    if (texto === "1") {
      adicionarMensagemNoChat(`Perfeito 😊\n\nChave Pix:\n${unidade.pix}\n\n<button type="button" class="btn-copiar-pix" data-pix="${unidade.pix}" style="margin-top:8px;background:#00c6ff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:700;color:#0b1a2a;">Copiar Pix</button>\n\nApós o pagamento, envie o comprovante.\n\nSe precisar do telefone da unidade, me diga qual é 😊`, "lia");
      aguardandoContinuidade = true;
      resetarEstado();
    } else if (texto === "2") {
      const link = buscarLink(estado.procedimentoBase, estado.regiao, unidade.nome);
      if (!link) { adicionarMensagemNoChat("Esse procedimento não está disponível para essa unidade nessa campanha.", "lia"); return; }
      adicionarMensagemNoChat({
        tipo: "pagamento",
        texto: `Perfeito 😊\n\nFinalize sua compra pelo botão abaixo:`,
        linkPagamento: link
      }, "lia");
      aguardandoUnidadeParaTelefone = true;
    } else { adicionarMensagemNoChat("Escolha 1 para Pix ou 2 para Cartão.", "lia"); return; }
    return;
  }
}

async function enviarMensagem() {
  const liaInput = document.getElementById("liaInput");
  const btnEnviarLia = document.getElementById("btnEnviarLia");
  if (!liaInput) return;

  liaInput.disabled = false;
  liaInput.readOnly = false;
  if (btnEnviarLia) btnEnviarLia.disabled = false;

  const texto = liaInput.value.trim();
  if (!texto) return;

  adicionarMensagemNoChat(texto, "user");
  liaInput.value = "";

  try {
    await responderLia(texto.toLowerCase());
  } finally {
    liaInput.disabled = false;
    liaInput.readOnly = false;
    liaInput.value = "";
    liaInput.focus();
    if (btnEnviarLia) btnEnviarLia.disabled = false;
  }
}

function garantirModalLia() {
  const modalExistente = document.getElementById("liaChat");
  if (modalExistente) return;

  if (!document.getElementById("liaChatMobileStyle")) {
    const responsiveStyle = document.createElement("style");
    responsiveStyle.id = "liaChatMobileStyle";
    responsiveStyle.textContent = `
      @media (max-width: 768px) {
        #liaChat {
          width: 100% !important;
          height: 50vh !important;
          max-height: 50vh !important;
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          border-radius: 16px 16px 0 0 !important;
          overflow: hidden !important;
        }

        #liaMessages {
          max-height: calc(50vh - 130px) !important;
          overflow-y: auto !important;
        }

        #liaInputBar {
          padding-bottom: max(10px, env(safe-area-inset-bottom));
        }
      }
    `;
    document.head.appendChild(responsiveStyle);
  }

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
    '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <img src="./assets/lia.png" alt="Lia" style="width:40px;height:40px;border-radius:50%;"/>',
    '    <span>Compre com a Lia</span>',
    '  </div>',
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
      liaOverlay.style.pointerEvents = "none";
    }
    if (window.matchMedia("(max-width: 768px)").matches) {
      liaChat.style.bottom = "0px";
      liaChat.style.pointerEvents = "auto";
      liaChat.style.zIndex = "1000000";
      liaInput.style.pointerEvents = "auto";
      liaInput.style.position = "relative";
      liaInput.style.zIndex = "1000001";
      btnEnviarLia.style.pointerEvents = "auto";
      btnEnviarLia.style.position = "relative";
      btnEnviarLia.style.zIndex = "1000001";
    }
    liaInput.disabled = false;
    liaInput.readOnly = false;
    btnEnviarLia.disabled = false;
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
  btnEnviarLia.disabled = false;
  liaInput.disabled = false;
  liaInput.readOnly = false;
  liaChat.style.pointerEvents = "auto";
  liaInput.style.pointerEvents = "auto";
  liaInput.style.position = "relative";
  liaInput.style.zIndex = "1000001";
  btnEnviarLia.style.pointerEvents = "auto";
  btnEnviarLia.style.position = "relative";
  btnEnviarLia.style.zIndex = "1000001";
  liaInput.style.background = "#0f1e2e";
  liaInput.style.color = "#ffffff";
  btnEnviarLia.addEventListener("click", enviarMensagem);
  liaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  });

  if (!liaMessages.dataset.liaInicializada) {
    adicionarMensagemNoChat(
      `Oi, eu sou a Lia 😊\n\nEstou aqui para te ajudar a comprar seu procedimento.\n\nQual procedimento você quer fazer?\n\nExemplo: Botox, Ultraformer, Lavieen`,
      "lia"
    );
    liaMessages.dataset.liaInicializada = "1";
  }

  if (window.visualViewport) {
    const ajustarChatParaTeclado = () => {
      if (!window.matchMedia("(max-width: 768px)").matches) return;
      if (liaChat.style.display === "none") return;

      const viewport = window.visualViewport;
      const tecladoAberto = Math.max(0, window.innerHeight - (viewport.height + viewport.offsetTop));
      liaChat.style.bottom = `${tecladoAberto}px`;
    };

    window.visualViewport.addEventListener("resize", ajustarChatParaTeclado);
    window.visualViewport.addEventListener("scroll", ajustarChatParaTeclado);
  }
}

window.enviarMensagem = enviarMensagem;

// Inicializa ao carregar o DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLiaVendasUI);
} else {
  initLiaVendasUI();
}
