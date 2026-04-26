// ════════════════════════════════════════════════════════════════
// CÉREBRO CENTRAL — resolverFluxoCentral V2
// Implementa as 15 regras. Nunca retorna null — sempre resolve.
// Prioridade: HUMANO>CONTATO>POS_PAGAMENTO>COMPRA>PRECO>INFO>DUVIDA>SAUDACAO>FALLBACK
// ════════════════════════════════════════════════════════════════
function resolverFluxoCentral(pergunta = '', contexto = {}, extras = {}) {
  const msg = normalizeText(pergunta);

  // ════ EXTRAIR DADOS CANÔNICOS (7 campos) ════
  const cidadeAtual = extras.cidadeDetectada || contexto.liaContext?.cidade || contexto.cidadeAtual || contexto.cidadeCompra || contexto.cidade || null;
  const procBaseAtual = extras.procedimentoBaseMensagem || contexto.liaContext?.procedimentoBase || contexto.procedimentoBase || null;
  const procFinalAtual = (extras.procedimentoSelecionadoMensagem && !['Botox', 'Ultraformer MPT', 'Lavieen'].includes(extras.procedimentoSelecionadoMensagem))
    ? extras.procedimentoSelecionadoMensagem
    : (contexto.liaContext?.procedimentoFinal || contexto.procedimentoFinal || contexto.procedimento_selecionado || contexto.procedimento || null);
  const pagamentoMensagem = detectarFormaPagamento(pergunta);
  const pagamentoAtual = pagamentoMensagem || extrairFormaPagamentoContexto(contexto) || null;
  const etapaAtual = contexto.intencao || null;
  const ultimaPergunta = contexto.ultimaPerguntaBot || '';
  const falhas = Number(contexto.falhasInterpretacao || 0);
  const cidadeNorm = cidadeAtual ? normalizeText(cidadeAtual) : null;
  const unidadeAtual = cidadeNorm ? unidades.find((u) => u.cidade === cidadeNorm) : null;

  // Helper: contexto canônico de saída
  const ctxSaida = (extra = {}) => ({
    ...contexto,
    cidade: cidadeAtual || contexto.cidade || null,
    cidadeAtual: cidadeAtual || contexto.cidadeAtual || null,
    cidadeCompra: extra.cidadeCompra !== undefined ? extra.cidadeCompra : (cidadeAtual || contexto.cidadeCompra || null),
    formaPagamento: pagamentoAtual || contexto.formaPagamento || null,
    pagamento: pagamentoAtual || contexto.pagamento || null,
    procedimentoBase: procBaseAtual || contexto.procedimentoBase || null,
    procedimentoFinal: procFinalAtual || contexto.procedimentoFinal || null,
    procedimento: procFinalAtual || contexto.procedimento || null,
    procedimentoAtual: procFinalAtual || contexto.procedimentoAtual || null,
    procedimento_selecionado: procFinalAtual || contexto.procedimento_selecionado || null,
    ...extra
  });

  // ════ REGRA 9: Respostas curtas SOMENTE via última pergunta ════
  const decisaoCurta = interpretarRespostaCurtaPorUltimaPergunta(pergunta, contexto);

  if (decisaoCurta === 'PAGAMENTO_PIX') {
    if (!cidadeAtual) {
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_sistema', formaPagamento: 'pix', pagamento: 'pix', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const r = gerarRespostaPix(cidadeAtual);
    return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, formaPagamento: 'pix', pagamento: 'pix', aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
  }

  if (decisaoCurta === 'PAGAMENTO_CARTAO') {
    if (!cidadeAtual) {
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_sistema', formaPagamento: 'cartao', pagamento: 'cartao', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const procEsp = procFinalAtual && !['Botox', 'Ultraformer MPT', 'Lavieen'].includes(procFinalAtual) ? procFinalAtual : null;
    if (procEsp) {
      const linkResp = gerarRespostaOfertaCampanha(procEsp, cidadeAtual, 'texto');
      if (linkResp) {
        const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
        return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, formaPagamento: 'cartao', pagamento: 'cartao', aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
      }
    }
    const r = 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?';
    return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_procedimento_cartao', cidadeCompra: cidadeAtual, formaPagamento: 'cartao', pagamento: 'cartao', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
  }

  if (decisaoCurta === 'ESCOLHA_1') {
    if (cidadeAtual && procFinalAtual && pagamentoAtual) {
      const linkResp = gerarRespostaOfertaCampanha(procFinalAtual, cidadeAtual, 'texto');
      if (linkResp) {
        const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
        return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
      }
    }
    if (!cidadeAtual) {
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    if (!pagamentoAtual) {
      const r = RESPOSTA_FORMA_PAGAMENTO;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_pagamento', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const r = RESPOSTA_OPCOES_COMPRA;
    return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_opcoes', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
  }

  if (decisaoCurta === 'ESCOLHA_2') {
    const base = procBaseAtual || 'procedimento';
    const r = base === 'botox'
      ? 'Perfeito 😊\n\nQual sua dúvida sobre o Botox?'
      : 'Perfeito 😊\n\nMe fala sua dúvida e eu te explico de forma direta.';
    return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
  }

  // ════ REGRA 10: Dados completos → link imediato ════
  if (cidadeAtual && procFinalAtual && pagamentoAtual && !contexto.linkEnviado && !detectarConfirmacaoPagamento(pergunta)) {
    const procResolvido = resolverProcedimentoPorBase(normalizarProcedimentoBase(procFinalAtual), procFinalAtual) || procFinalAtual;
    const linkResp = gerarRespostaOfertaCampanha(procFinalAtual, cidadeAtual, 'texto') || gerarRespostaOfertaCampanha(procResolvido, cidadeAtual, 'texto');
    if (linkResp) {
      const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
  }

  // ════ REGRA 8: Após link enviado → WhatsApp da unidade ════
  if (contexto.linkEnviado && (detectarPerguntaSuportePosLink(pergunta) || detectarPedidoContatoComprovante(pergunta) || detectarConfirmacaoPagamento(pergunta) || msg.includes('comprovante') || msg.includes('whatsapp'))) {
    if (!cidadeAtual) {
      const r = 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', aguardandoComprovante: true, aguardando_comprovante: true, ultimaPerguntaBot: r }) };
    }
    const r = gerarRespostaComprovanteUnidade(cidadeAtual) || gerarRespostaSuportePosLink(cidadeAtual);
    if (r) return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true }) };
  }

  // ════ REGRA 12: 2 falhas → WhatsApp ════
  if (falhas >= 2) {
    if (cidadeAtual) {
      const wpp = respostaWhatsappPorCidade(cidadeAtual);
      if (wpp) return { resposta: `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\n${wpp}`, contexto: { ...contexto, falhasInterpretacao: 0, cidade: cidadeAtual, cidadeAtual } };
    }
    const r = `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\nMe fala sua cidade que te passo o WhatsApp da unidade.`;
    return { resposta: r, contexto: { ...contexto, falhasInterpretacao: 0, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', ultimaPerguntaBot: r } };
  }

  // ════ ETAPAS ATIVAS DO FLUXO ════

  // Aguardando região do Ultraformer
  if (etapaAtual === 'aguardando_regiao_ultraformer' || (procBaseAtual === 'ultraformer' && normalizeText(ultimaPergunta) === normalizeText(RESPOSTA_ULTRAFORMER_SEM_REGIAO))) {
    if (detectarRespostaRegiaoUltraformerRosto(pergunta)) {
      const r = RESPOSTA_ULTRAFORMER_FULL_FACE_CONTEXTO_REGIAO;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer', procedimentoFinal: 'Ultraformer MPT Full Face', procedimento: 'Ultraformer MPT Full Face', procedimentoAtual: 'Ultraformer MPT Full Face', procedimento_selecionado: 'Ultraformer MPT Full Face', ultimaPerguntaBot: r }) };
    }
    const procRegiao = detectarProcedimento(pergunta);
    if (procRegiao) {
      const r = `Perfeito 😊\nVocê quer:\n1️⃣ Ver a oferta\n2️⃣ Tirar uma dúvida?`;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer', procedimentoFinal: procRegiao, procedimento: procRegiao, procedimentoAtual: procRegiao, procedimento_selecionado: procRegiao, ultimaPerguntaBot: r }) };
    }
    const novasFalhasReg = falhasInterpretacaoAtualizadas(contexto);
    return { resposta: RESPOSTA_ULTRAFORMER_SEM_REGIAO, contexto: ctxSaida({ intencao: 'aguardando_regiao_ultraformer', falhasInterpretacao: novasFalhasReg, ultimaPerguntaBot: RESPOSTA_ULTRAFORMER_SEM_REGIAO }) };
  }

  // Confirmação de pagamento / link já enviado
  if (etapaAtual === 'fluxo_pagamento_aguardando_confirmacao') {
    if (detectarConfirmacaoPagamento(pergunta) || detectarPedidoContatoComprovante(pergunta) || detectarPerguntaSuportePosLink(pergunta) || msg.includes('comprovante') || msg.includes('paguei') || msg.includes('feito')) {
      if (!cidadeAtual) {
        const r = 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
        return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', aguardandoComprovante: true, aguardando_comprovante: true, ultimaPerguntaBot: r }) };
      }
      const r = gerarRespostaComprovanteUnidade(cidadeAtual);
      if (r) return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true }) };
    }
    const r = 'Perfeito 😊\n\nSe precisar de ajuda com o comprovante ou agendamento, me chama aqui.';
    return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
  }

  // Aguardando comprovante
  if (etapaAtual === 'aguardando_cidade_comprovante') {
    if (cidadeAtual) {
      const r = gerarRespostaComprovanteUnidade(cidadeAtual);
      if (r) return { resposta: r, contexto: ctxSaida({ cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, statusPagamento: 'confirmado' }) };
    }
    const r = 'Qual unidade você comprou?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
    return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', aguardandoComprovante: true, aguardando_comprovante: true, ultimaPerguntaBot: r }) };
  }

  // Opções compra (1=sistema / 2=equipe)
  if (etapaAtual === 'fluxo_compra_opcoes') {
    if (detectarEscolhaSistema(pergunta)) {
      const r = RESPOSTA_FORMA_PAGAMENTO;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_pagamento', intencaoCompra: 'sistema', cidadeCompra: cidadeAtual, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    if (detectarEscolhaEquipe(pergunta)) {
      if (cidadeAtual) {
        const wpp = respostaWhatsappPorCidade(cidadeAtual);
        if (wpp) return { resposta: wpp, contexto: { cidade: cidadeAtual, cidadeAtual, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: cidadeAtual } };
      }
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_equipe', ultimaPerguntaBot: r }) };
    }
    const novasFalhasOpc = falhasInterpretacaoAtualizadas(contexto);
    if (novasFalhasOpc >= 2 && cidadeAtual) {
      const wpp = respostaWhatsappPorCidade(cidadeAtual);
      if (wpp) return { resposta: `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\n${wpp}`, contexto: { ...contexto, falhasInterpretacao: 0 } };
    }
    return { resposta: RESPOSTA_OPCOES_COMPRA, contexto: { ...contexto, falhasInterpretacao: novasFalhasOpc, ultimaPerguntaBot: RESPOSTA_OPCOES_COMPRA } };
  }

  // Aguardando cidade (equipe)
  if (etapaAtual === 'fluxo_compra_aguardando_cidade_equipe') {
    if (cidadeAtual) {
      const wpp = respostaWhatsappPorCidade(cidadeAtual);
      if (wpp) return { resposta: wpp, contexto: { cidade: cidadeAtual, cidadeAtual, intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: cidadeAtual } };
    }
    const novasFalhasEq = falhasInterpretacaoAtualizadas(contexto);
    return { resposta: RESPOSTA_QUAL_UNIDADE, contexto: { ...contexto, falhasInterpretacao: novasFalhasEq, ultimaPerguntaBot: RESPOSTA_QUAL_UNIDADE } };
  }

  // Aguardando cidade (sistema)
  if (etapaAtual === 'fluxo_compra_aguardando_cidade_sistema' || etapaAtual === 'aguardando_cidade_para_confirmacao_oferta') {
    if (cidadeAtual) {
      const formaSalva = extrairFormaPagamentoContexto(contexto);
      if (formaSalva === 'pix') {
        const r = gerarRespostaPix(cidadeAtual);
        return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
      }
      if (formaSalva === 'cartao' && procFinalAtual && !['Botox', 'Ultraformer MPT', 'Lavieen'].includes(procFinalAtual)) {
        const linkResp = gerarRespostaOfertaCampanha(procFinalAtual, cidadeAtual, 'texto');
        if (linkResp) {
          const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
          return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
        }
      }
      const r = RESPOSTA_FORMA_PAGAMENTO;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_pagamento', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const novasFalhasCid = falhasInterpretacaoAtualizadas(contexto);
    if (novasFalhasCid >= 2) {
      const r = `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\nMe fala sua cidade que te passo o WhatsApp da unidade.`;
      return { resposta: r, contexto: { ...contexto, falhasInterpretacao: 0, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', ultimaPerguntaBot: r } };
    }
    return { resposta: RESPOSTA_QUAL_UNIDADE, contexto: { ...contexto, falhasInterpretacao: novasFalhasCid, ultimaPerguntaBot: RESPOSTA_QUAL_UNIDADE } };
  }

  // Aguardando forma de pagamento
  if (etapaAtual === 'fluxo_compra_aguardando_pagamento' || etapaAtual === 'confirmacao_oferta_aguardando_pagamento') {
    const formaPgto = interpretarFormaPagamentoPorRespostaCurta(pergunta) || detectarFormaPagamento(pergunta) || extrairFormaPagamentoContexto(contexto);
    const cidadeCompra = contexto.cidadeCompra || cidadeAtual;
    if (!cidadeCompra) {
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    if (formaPgto === 'pix') {
      const r = gerarRespostaPix(cidadeCompra);
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra, formaPagamento: 'pix', pagamento: 'pix', aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    if (formaPgto === 'cartao') {
      const procEspCartao = procFinalAtual && !['Botox', 'Ultraformer MPT', 'Lavieen'].includes(procFinalAtual) ? procFinalAtual : null;
      if (procEspCartao) {
        const linkResp = gerarRespostaOfertaCampanha(procEspCartao, cidadeCompra, 'texto');
        if (linkResp) {
          const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
          return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra, formaPagamento: 'cartao', pagamento: 'cartao', aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
        }
      }
      const r = 'Sem problema 😊\n\nQual procedimento você quer finalizar no cartão?';
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_procedimento_cartao', cidadeCompra, formaPagamento: 'cartao', pagamento: 'cartao', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const novasFalhasPgt = falhasInterpretacaoAtualizadas(contexto);
    if (novasFalhasPgt >= 2 && cidadeCompra) {
      const wpp = respostaWhatsappPorCidade(cidadeCompra);
      if (wpp) return { resposta: `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\n${wpp}`, contexto: { ...contexto, falhasInterpretacao: 0 } };
    }
    return { resposta: RESPOSTA_FORMA_PAGAMENTO, contexto: { ...contexto, falhasInterpretacao: novasFalhasPgt, ultimaPerguntaBot: RESPOSTA_FORMA_PAGAMENTO } };
  }

  // Aguardando procedimento (cartão)
  if (etapaAtual === 'fluxo_pagamento_aguardando_procedimento_cartao') {
    const cidadeCompra = contexto.cidadeCompra || cidadeAtual;
    let procResolvido = procFinalAtual && !['Botox', 'Ultraformer MPT', 'Lavieen'].includes(procFinalAtual) ? procFinalAtual : null;
    if (!procResolvido && detectarRespostaRegiaoUltraformerRosto(pergunta) && (procBaseAtual === 'ultraformer' || normalizeText(contexto.procedimentoBase || '') === 'ultraformer')) {
      procResolvido = 'Ultraformer MPT Full Face';
    }
    if (!procResolvido) {
      procResolvido = resolverProcedimentoCompraPorContexto({ ...contexto, procedimento: extras.procedimentoSelecionadoMensagem || contexto.procedimento, procedimento_selecionado: extras.procedimentoSelecionadoMensagem || contexto.procedimento_selecionado });
    }
    if (procResolvido && cidadeCompra) {
      const linkResp = gerarRespostaOfertaCampanha(procResolvido, cidadeCompra, 'texto');
      if (linkResp) {
        const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
        return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra, procedimentoFinal: procResolvido, procedimento: procResolvido, procedimentoAtual: procResolvido, procedimento_selecionado: procResolvido, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
      }
    }
    const novasFalhasPrc = falhasInterpretacaoAtualizadas(contexto);
    if (novasFalhasPrc >= 2 && cidadeCompra) {
      const wpp = respostaWhatsappPorCidade(cidadeCompra);
      if (wpp) return { resposta: `${RESPOSTA_DIRECIONAR_EQUIPE_PREVENTIVO}\n\n${wpp}`, contexto: { ...contexto, falhasInterpretacao: 0 } };
    }
    return { resposta: 'Qual procedimento você quer finalizar no cartão?', contexto: { ...contexto, falhasInterpretacao: novasFalhasPrc, ultimaPerguntaBot: 'Qual procedimento você quer finalizar no cartão?' } };
  }

  // Aguardando cidade para contato / WhatsApp
  if (etapaAtual === 'aguardando_cidade_whatsapp' || etapaAtual === 'aguardando_cidade_contato_direto' || etapaAtual === 'aguardando_apenas_cidade') {
    if (cidadeAtual) {
      const tipoLink = contexto.tipoLink;
      if (tipoLink === 'humano') {
        const r = respostaHumanoPorCidade(cidadeAtual);
        if (r) return { resposta: r, contexto: { cidade: cidadeAtual, cidadeAtual } };
      }
      if (tipoLink === 'oferta_semana') {
        const r = respostaOfertaSemanaPorCidade(cidadeAtual);
        if (r) return { resposta: r, contexto: { cidade: cidadeAtual, cidadeAtual } };
      }
      if (etapaAtual === 'aguardando_apenas_cidade') {
        const u = unidades.find((un) => un.cidade === normalizeText(cidadeAtual));
        if (u) return { resposta: `📍 ${u.nomeCompleto}\n\n${u.endereco}\n\n📞 ${u.telefone}`, contexto: { cidade: cidadeAtual, cidadeAtual } };
      }
      const r = respostaContatoDiretoPorCidade(cidadeAtual);
      if (r) return { resposta: r, contexto: { cidade: cidadeAtual, cidadeAtual } };
      const wpp = respostaWhatsappPorCidade(cidadeAtual);
      if (wpp) return { resposta: wpp, contexto: { cidade: cidadeAtual, cidadeAtual } };
    }
    return { resposta: RESPOSTA_CIDADE, contexto: { ...contexto, ultimaPerguntaBot: RESPOSTA_CIDADE } };
  }

  // Endereço ou telefone (após cidade detectada)
  if (etapaAtual === 'aguardando_endereco_ou_telefone') {
    const intOp = identificarIntencaoOperacional(pergunta) || (msg.includes('endereco') ? 'endereco' : 'telefone');
    if (cidadeAtual) {
      const opResp = responderIntencaoOperacional(intOp, unidadeAtual);
      if (opResp) return { resposta: opResp.resposta, contexto: { ...contexto, ...opResp.contexto, cidade: cidadeAtual, cidadeAtual } };
    }
    return { resposta: RESPOSTA_CIDADE, contexto: { ...contexto, intencao: 'aguardando_apenas_cidade', ultimaPerguntaBot: RESPOSTA_CIDADE } };
  }

  // Compra finalizada
  if (etapaAtual === 'compra_finalizada_sistema' || etapaAtual === 'compra_finalizada_equipe') {
    const r = 'Perfeito 😊\n\nSe precisar de ajuda, me chama aqui.';
    return { resposta: r, contexto: ctxSaida({ ultimaPerguntaBot: r }) };
  }

  // ════ CLASSIFICAÇÃO FRESCA DE INTENÇÃO (Regra 1) ════
  const intencaoCentral = classificarIntencaoCentral(pergunta, contexto);

  // 1. HUMANO
  if (intencaoCentral === INTENCOES_CENTRAIS.HUMANO) {
    if (!cidadeAtual) {
      const r = 'Perfeito 😊\n\nVou te direcionar direto para a equipe 👇\n\nMe fala sua cidade que te envio o contato da unidade mais próxima.';
      return { resposta: r, contexto: { ...contexto, intencao: 'aguardando_cidade_whatsapp', tipoLink: 'humano', tentativas_pergunta: 0, ultimaPerguntaBot: r } };
    }
    const r = respostaHumanoPorCidade(cidadeAtual);
    if (r) return { resposta: r, contexto: { cidade: cidadeAtual, cidadeAtual, tentativas_pergunta: 0 } };
  }

  // 2. CONTATO
  if (intencaoCentral === INTENCOES_CENTRAIS.CONTATO) {
    const intOper = identificarIntencaoOperacional(pergunta);
    if (cidadeAtual) {
      if (intOper) {
        const opResp = responderIntencaoOperacional(intOper, unidadeAtual);
        if (opResp) return { resposta: opResp.resposta, contexto: { ...contexto, ...opResp.contexto, cidade: cidadeAtual, cidadeAtual, tentativas_pergunta: 0 } };
      }
      const r = respostaContatoDiretoPorCidade(cidadeAtual);
      if (r) return { resposta: r, contexto: { ...contexto, cidade: cidadeAtual, cidadeAtual, tentativas_pergunta: 0 } };
    }
    const r = RESPOSTA_CIDADE;
    return { resposta: r, contexto: { ...contexto, intencao: 'aguardando_apenas_cidade', ultimaPerguntaBot: r, tentativas_pergunta: 0 } };
  }

  // 3. POS_PAGAMENTO
  if (intencaoCentral === INTENCOES_CENTRAIS.POS_PAGAMENTO) {
    if (!cidadeAtual) {
      const r = 'Perfeito 😊\n\nMe confirma a unidade para eu te passar o WhatsApp correto:\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
      return { resposta: r, contexto: { ...contexto, intencao: 'aguardando_cidade_comprovante', linkEnviado: true, aguardandoComprovante: true, aguardando_comprovante: true, ultimaPerguntaBot: r } };
    }
    const r = gerarRespostaComprovanteUnidade(cidadeAtual) || gerarRespostaSuportePosLink(cidadeAtual);
    if (r) return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_cidade_comprovante', cidadeCompra: cidadeAtual, linkEnviado: true, aguardandoComprovante: true, aguardando_comprovante: true }) };
  }

  // 4. COMPRA (estrita — Regra 6)
  if (intencaoCentral === INTENCOES_CENTRAIS.COMPRA) {
    if (cidadeAtual && procFinalAtual && pagamentoAtual) {
      const linkResp = gerarRespostaOfertaCampanha(procFinalAtual, cidadeAtual, 'texto');
      if (linkResp) {
        const r = `${linkResp}\n\nDepois do pagamento, envie o comprovante no WhatsApp da unidade para agendar.`;
        return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_pagamento_aguardando_confirmacao', cidadeCompra: cidadeAtual, aguardandoComprovante: true, aguardando_comprovante: true, status_compra: 'em andamento', ultimaPerguntaBot: r }) };
      }
    }
    if (!cidadeAtual) {
      const r = RESPOSTA_QUAL_UNIDADE;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_cidade_sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    if (!pagamentoAtual) {
      const r = RESPOSTA_FORMA_PAGAMENTO;
      return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_aguardando_pagamento', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
    }
    const r = RESPOSTA_OPCOES_COMPRA;
    return { resposta: r, contexto: ctxSaida({ intencao: 'fluxo_compra_opcoes', cidadeCompra: cidadeAtual, intencaoCompra: 'sistema', status_compra: 'em andamento', ultimaPerguntaBot: r }) };
  }

  // 5. PRECO — orienta para o sistema (Regra 5)
  if (intencaoCentral === INTENCOES_CENTRAIS.PRECO) {
    const r = RESPOSTA_PRECO_SISTEMA;
    return { resposta: r, contexto: { ...contexto, intencao: 'aguardando_interesse', ultimaPerguntaBot: r } };
  }

  // 6. INFORMACAO_PROCEDIMENTO — explicação curta + 1/2 (Regra 7)
  if (intencaoCentral === INTENCOES_CENTRAIS.INFORMACAO_PROCEDIMENTO) {
    if (detectarPerguntaAparelhoDireta(pergunta) || (detectarConsultaAparelho(pergunta) && (procBaseAtual === 'ultraformer' || detectarTermoUltraAproximado(pergunta)))) {
      const r = 'Usamos Ultraformer MPT original da Medsystems 😊\n\nVocê quer:\n1️⃣ Ver a oferta\n2️⃣ Tirar dúvida?';
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer', ultimaPerguntaBot: r }) };
    }
    if (detectarPerguntaTemBotoxDireta(pergunta)) {
      const r = 'Temos sim 😊\n\nVocê quer:\n1️⃣ Ver a oferta\n2️⃣ Tirar dúvida?';
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'botox', ultimaPerguntaBot: r }) };
    }
    if (detectarConsultaInformativaBotox(pergunta) || (detectarTemaBotoxFacial(pergunta) && !detectarPerguntaTemBotoxDireta(pergunta))) {
      const r = RESPOSTA_BOTOX_EXPLICACAO_DIRETA;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'botox', procedimentoAtual: 'botox', ultimaPerguntaBot: r }) };
    }
    const reconhecimento = processarMensagemLia(pergunta);
    if (reconhecimento && reconhecimento.intent === 'ULTRAFORMER_FULL_FACE') {
      const r = reconhecimento.resposta;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer', procedimentoFinal: 'Ultraformer MPT Full Face', procedimento: 'Ultraformer MPT Full Face', procedimentoAtual: 'Ultraformer MPT Full Face', procedimento_selecionado: 'Ultraformer MPT Full Face', ultimaPerguntaBot: r }) };
    }
    if (reconhecimento && reconhecimento.intent === 'ULTRAFORMER_GENERICO') {
      const r = reconhecimento.resposta;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_regiao_ultraformer', procedimentoBase: 'ultraformer', ultimaPerguntaBot: RESPOSTA_ULTRAFORMER_SEM_REGIAO }) };
    }
    if (procBaseAtual === 'ultraformer' || extras.procedimentoBaseMensagem === 'ultraformer') {
      const r = RESPOSTA_ULTRAFORMER_FULL_FACE_DIRETA;
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoBase: 'ultraformer', ultimaPerguntaBot: r }) };
    }
    const r = `Perfeito 😊\n\n${RESPOSTA_ESCOLHA_DIRETA_PADRAO}`;
    return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
  }

  // 7. DUVIDA_TECNICA
  if (intencaoCentral === INTENCOES_CENTRAIS.DUVIDA_TECNICA) {
    const itemFaq = encontrarFaq(pergunta);
    if (itemFaq) {
      const preservarCompleto = Array.isArray(itemFaq.gatilhos) && itemFaq.gatilhos.includes('pontos botox');
      const r = preservarCompleto ? itemFaq.resposta : respostaCurtaComConducao(itemFaq.resposta);
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
    }
    const itemCorrecao = encontrarCorrecao(pergunta);
    if (itemCorrecao) {
      const r = respostaCurtaComConducao(itemCorrecao);
      return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
    }
    const itemUltra = encontrarBlocoUltraformer(pergunta, contexto);
    if (itemUltra) { const r = respostaCurtaComConducao(itemUltra.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemUltra.procedimento || 'ultraformer', ultimaPerguntaBot: r }) }; }
    const itemBio = encontrarBlocoBioestimulador(pergunta, contexto);
    if (itemBio) { const r = respostaCurtaComConducao(itemBio.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemBio.procedimento || 'bioestimulador', ultimaPerguntaBot: r }) }; }
    const itemPreench = encontrarBlocoPreenchedor(pergunta, contexto);
    if (itemPreench) { const r = respostaCurtaComConducao(itemPreench.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemPreench.procedimento || 'preenchedor', ultimaPerguntaBot: r }) }; }
    const itemLav = encontrarBlocoLavieen(pergunta, contexto);
    if (itemLav) { const r = respostaCurtaComConducao(itemLav.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemLav.procedimento || 'lavieen', ultimaPerguntaBot: r }) }; }
    const itemEnd = encontrarBlocoEndymed(pergunta, contexto);
    if (itemEnd) { const r = respostaCurtaComConducao(itemEnd.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemEnd.procedimento || 'endymed', ultimaPerguntaBot: r }) }; }
    const itemSciz = encontrarBlocoScizer(pergunta, contexto);
    if (itemSciz) { const r = respostaCurtaComConducao(itemSciz.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', procedimentoAtual: itemSciz.procedimento || 'scizer', ultimaPerguntaBot: r }) }; }
    const itemSug = encontrarSugestao(pergunta);
    if (itemSug) { const r = respostaCurtaComConducao(itemSug.resposta); return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) }; }
    const r = `Perfeito 😊\n\nMe fala sua dúvida de forma direta que eu te respondo agora.\n\n${RESPOSTA_ESCOLHA_DIRETA_PADRAO}`;
    return { resposta: r, contexto: ctxSaida({ intencao: 'aguardando_interesse', ultimaPerguntaBot: r }) };
  }

  // 8. SAUDACAO
  if (intencaoCentral === INTENCOES_CENTRAIS.SAUDACAO) {
    return { resposta: respostaSaudacao(pergunta), contexto };
  }

  // 9. FALLBACK
  const rFallback = `Consigo te ajudar sim 😊\n\n${RESPOSTA_ESCOLHA_DIRETA_PADRAO}`;
  return { resposta: rFallback, contexto: ctxSaida({ intencao: 'aguardando_interesse', falhasInterpretacao: falhas + 1, ultimaPerguntaBot: rFallback }) };
}

