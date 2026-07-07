function normalizarTexto(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function identificarProcedimentoLia(texto) {
  const textoNormalizado = normalizarTexto(texto);

  const proibidos = [
    'pmma',
    'sculptra',
    'rinomodelacao',
    'preenchimento de glabela',
    'fio de pdo',
    'fios de pdo',
    'criolipolise',
    'morpheus8',
    'laser de co2',
    'co2'
  ];

  const regras = [
    {
      procedimento: 'procedimentos-proibidos-e-substitutos',
      arquivoBase: 'docs-lia/base-procedimentos/procedimentos-proibidos-e-substitutos.md',
      termos: proibidos,
      confianca: 'alta',
      motivoBase: 'Termo de procedimento proibido ou substituto'
    },
    {
      procedimento: 'ultraformer-mpt',
      arquivoBase: 'docs-lia/base-procedimentos/ultraformer-mpt.md',
      termos: ['ultraformer', 'ultraformer mpt', 'mpt', 'ultra mpt', 'ultrassom microfocado', 'hifu', 'liftera', 'ulthera', 'lifting sem cirurgia', 'papada', 'flacidez facial', 'flacidez do pescoço'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Ultraformer MPT'
    },
    {
      procedimento: 'botox',
      arquivoBase: 'docs-lia/base-procedimentos/botox.md',
      termos: ['botox', 'toxina botulinica', 'toxina', 'botox facial', 'botox axilar', 'suor axilar', 'pés de galinha', 'testa', 'glabela'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Botox'
    },
    {
      procedimento: 'bioestimulador-diamond',
      arquivoBase: 'docs-lia/base-procedimentos/bioestimulador-diamond.md',
      termos: ['bioestimulador', 'diamond', 'bioestimulador diamond', 'radiesse', 'hidroxiapatita de calcio', 'haca', 'colageno', 'flacidez de pele', 'sculptra'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Bioestimulador Diamond'
    },
    {
      procedimento: 'preenchedor-acido-hialuronico',
      arquivoBase: 'docs-lia/base-procedimentos/preenchedor-acido-hialuronico.md',
      termos: ['preenchedor', 'preenchimento', 'acido hialuronico', 'preenchimento labial', 'labios', 'olheiras', 'bigode chines', 'md codes', 'contorno facial', 'rinomodelacao', 'glabela'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Preenchedor com Ácido Hialurônico'
    },
    {
      procedimento: 'endymed',
      arquivoBase: 'docs-lia/base-procedimentos/endymed.md',
      termos: ['endymed', 'endymed 3deep', 'radiofrequencia', 'endymed small', 'endymed shapper', 'endymed ifine', 'endymed intensif', 'pele sobrando', 'flacidez sem gordura'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Endymed'
    },
    {
      procedimento: 'scizer',
      arquivoBase: 'docs-lia/base-procedimentos/scizer.md',
      termos: ['scizer', 'gordura localizada', 'gordura corporal', 'abdome', 'flancos', 'barriga', 'pneuzinho', 'criolipolise'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Scizer'
    },
    {
      procedimento: 'laser-lavieen',
      arquivoBase: 'docs-lia/base-procedimentos/laser-lavieen.md',
      termos: ['lavieen', 'laser lavieen', 'bb laser', 'bb glow', 'glow', 'manchas', 'melasma', 'poros', 'textura da pele', 'olheiras', 'maos'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Laser Lavieen'
    },
    {
      procedimento: 'microagulhamento-robotico',
      arquivoBase: 'docs-lia/base-procedimentos/microagulhamento-robotico.md',
      termos: ['microagulhamento', 'microagulhamento robotico', 'cicatriz de acne', 'cicatrizes de acne', 'poros', 'textura da pele', 'morpheus8', 'morpheus'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Microagulhamento Robótico'
    },
    {
      procedimento: 'laser-harmony',
      arquivoBase: 'docs-lia/base-procedimentos/laser-harmony.md',
      termos: ['harmony', 'laser harmony', 'laser para manchas', 'laser para rejuvenescimento', 'laser para vasos'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Laser Harmony'
    },
    {
      procedimento: 'depilacao-a-laser',
      arquivoBase: 'docs-lia/base-procedimentos/depilacao-a-laser.md',
      termos: ['depilacao', 'depilacao a laser', 'laser para pelos', 'remocao de pelos', 'axilas', 'virilha', 'perianal', 'buco', 'mento'],
      confianca: 'alta',
      motivoBase: 'Encontrou termo relacionado a Depilação a Laser'
    }
  ];

  for (const regra of regras) {
    const encontrou = regra.termos.some((termo) => textoNormalizado.includes(termo));
    if (encontrou) {
      return {
        procedimento: regra.procedimento,
        arquivoBase: regra.arquivoBase,
        confianca: regra.confianca,
        motivo: `${regra.motivoBase}: ${regra.termos.find((termo) => textoNormalizado.includes(termo))}`
      };
    }
  }

  return {
    procedimento: null,
    arquivoBase: null,
    confianca: 'baixa',
    motivo: 'Nenhum procedimento identificado'
  };
}

export {
  identificarProcedimentoLia,
  normalizarTexto
};

/*
Testes manuais comentados:
- identificarProcedimentoLia('tem sculptra?') -> { procedimento: 'procedimentos-proibidos-e-substitutos', arquivoBase: 'docs-lia/base-procedimentos/procedimentos-proibidos-e-substitutos.md', confianca: 'alta', motivo: 'Termo de procedimento proibido ou substituto: sculptra' }
- identificarProcedimentoLia('faz pmma?') -> { procedimento: 'procedimentos-proibidos-e-substitutos', arquivoBase: 'docs-lia/base-procedimentos/procedimentos-proibidos-e-substitutos.md', confianca: 'alta', motivo: 'Termo de procedimento proibido ou substituto: pmma' }
- identificarProcedimentoLia('tem morpheus8?') -> { procedimento: 'procedimentos-proibidos-e-substitutos', arquivoBase: 'docs-lia/base-procedimentos/procedimentos-proibidos-e-substitutos.md', confianca: 'alta', motivo: 'Termo de procedimento proibido ou substituto: morpheus8' }
- identificarProcedimentoLia('tem botox?') -> { procedimento: 'botox', arquivoBase: 'docs-lia/base-procedimentos/botox.md', confianca: 'alta', motivo: 'Encontrou termo relacionado a Botox: botox' }
- identificarProcedimentoLia('tem ultraformer?') -> { procedimento: 'ultraformer-mpt', arquivoBase: 'docs-lia/base-procedimentos/ultraformer-mpt.md', confianca: 'alta', motivo: 'Encontrou termo relacionado a Ultraformer MPT: ultraformer' }
*/
