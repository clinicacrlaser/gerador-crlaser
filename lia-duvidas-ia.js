// ===== CONTEXTO DE PROCEDIMENTO EM FOCO =====
let procedimentoEmFoco = "";
const SINONIMOS_PROC = [
  { palavras: ["botox", "botx"], nome: "Botox" },
  { palavras: ["ultraformer", "mpt", "ultrafomer"], nome: "Ultraformer MPT" },
  { palavras: ["lavieen", "laser lavieen"], nome: "Laser Lavieen" },
  { palavras: ["preenchedor", "preenchimento", "ácido hialurônico", "acido hialuronico"], nome: "Preenchedor de Ácido Hialurônico" },
  { palavras: ["diamond", "dimond", "diamont", "bioestimulador"], nome: "Bioestimulador Diamond" },
  { palavras: ["scizer"], nome: "Scizer" },
  { palavras: ["endymed", "ifine", "shapper", "small"], nome: "Endymed" },
  { palavras: ["microagulhamento", "microagulhamento robótico", "microagulhamento robotico"], nome: "Microagulhamento Robótico" }
];

function detectarProcedimento(texto) {
  const t = texto.toLowerCase();
  for (const item of SINONIMOS_PROC) {
    for (const palavra of item.palavras) {
      if (t.includes(palavra)) return item.nome;
    }
  }
  return null;
}
// lia-duvidas-ia.js - Frontend Lia IA

const liaMessages = document.getElementById('liaMessages');
const liaForm = document.getElementById('liaForm');
const liaInput = document.getElementById('liaInput');

// Histórico de mensagens (máximo 6)
let historico = [];

function adicionarMensagem(texto, tipo = 'lia') {
  const msg = document.createElement('div');
  msg.className = 'lia-msg ' + tipo;
  msg.innerHTML = texto.replace(/\n/g, '<br>');
  liaMessages.appendChild(msg);
  liaMessages.scrollTop = liaMessages.scrollHeight;
}

function mostrarMensagemInicial() {
  adicionarMensagem('Oi, eu sou a Lia, assistente virtual da CR Laser® 😊<br><br>Estou aqui para tirar dúvidas sobre os procedimentos da CR Laser®.<br><br>Digite sua dúvida abaixo.', 'lia');
}

liaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pergunta = liaInput.value.trim();
  if (!pergunta) return;
  adicionarMensagem(pergunta, 'user');
  liaInput.value = '';
  // Detecta e atualiza procedimento em foco
  const procDetectado = detectarProcedimento(pergunta);
  if (procDetectado) procedimentoEmFoco = procDetectado;
  adicionarMensagem('<span style="color:#aaa">Aguarde, consultando IA...</span>', 'lia');
  try {
    // Monta histórico para enviar (sem tags HTML)
    const historicoParaAPI = historico.slice(-6).map(m => ({ tipo: m.tipo, texto: m.texto }));
    const resp = await fetch('/api/lia-duvidas-ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta, historico: historicoParaAPI, procedimentoEmFoco })
    });
    const data = await resp.json();
    liaMessages.removeChild(liaMessages.lastChild);
    if (data && data.resposta) {
      adicionarMensagem(data.resposta, 'lia');
    } else {
      adicionarMensagem('Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.', 'lia');
    }
  } catch (e) {
    liaMessages.removeChild(liaMessages.lastChild);
    adicionarMensagem('Não consegui consultar a IA agora. Tente novamente em alguns instantes ou fale com sua unidade.', 'lia');
  }
});

mostrarMensagemInicial();
