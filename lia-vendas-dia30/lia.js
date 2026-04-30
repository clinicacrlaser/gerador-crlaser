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
const LINKS = {};

      // --- Leitura dinâmica dos links da planilha CSV ---
      const LINKS_PLANILHA = {};

      async function carregarLinksDaPlanilha() {
        try {
          const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSMLLe9MqYlnau3P3ll77nwt8tTyqN-bwmL94Pse5TzgxFr3w5kwexu80Jxc932lzjV8tv1dK4Fp2rx/pub?output=csv');
          if (!response.ok) throw new Error('Erro ao baixar CSV');
          const csv = await response.text();
          parseCSVLinks(csv);
        } catch (e) {
          console.warn('Não foi possível carregar os links da planilha:', e);
        }
      }

      function parseCSVLinks(csv) {
        // Parser simples, mas robusto para CSV com vírgulas e aspas
        const linhas = csv.split(/\r?\n/).filter(Boolean);
        if (linhas.length < 2) return;
        const cabecalho = linhas[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        for (let i = 1; i < linhas.length; i++) {
          let linha = linhas[i];
          // Suporte a campos entre aspas com vírgula
          const campos = [];
          let atual = '', dentroAspas = false;
          for (let c = 0; c < linha.length; c++) {
            const char = linha[c];
            if (char === '"') dentroAspas = !dentroAspas;
            else if (char === ',' && !dentroAspas) { campos.push(atual); atual = ''; }
            else atual += char;
          }
          campos.push(atual);
          if (campos.length < 3) continue;
          const procedimento = campos[0].trim().replace(/^"|"$/g, '');
          const regiao = campos[1].trim().replace(/^"|"$/g, '');
          for (let j = 2; j < campos.length; j++) {
            const cidade = cabecalho[j];
            let url = (campos[j] || '').trim().replace(/^"|"$/g, '');
            if (!url || url === '-' || url === '–' || !/^https?:\/\//.test(url)) continue;
            if (!LINKS_PLANILHA[procedimento]) LINKS_PLANILHA[procedimento] = {};
            if (!LINKS_PLANILHA[procedimento][regiao]) LINKS_PLANILHA[procedimento][regiao] = {};
            LINKS_PLANILHA[procedimento][regiao][cidade] = url;
          }
        }
      }

// Carregar links ao iniciar
carregarLinksDaPlanilha();



// Busca link correto
function normalizar(texto = "") {
  return String(texto)
    .toLowerCase()
    .normalize("NFD");

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