// Remove caracteres quebrados das respostas da Lia (frontend)
function limparTextoLia(texto) {
  let t = String(texto || "");
  // 1. Remove caracteres quebrados e combinações
  t = t.replace(/\uFFFD|�|ï¿½/g, "");
  t = t.replace(/�\.|\.�|\. �|� | � /g, "");
  // 2. Remove linhas/parágrafos contendo apenas ponto
  t = t.replace(/(<br><br>\.|<br>\.|\.\s*<br>|<br>\.\s*<br>|\n\.\n|^\.\s*$)/g, "");
  // 3. Remove linha isolada com ponto
  t = t.split(/(<br>|\n)/).filter(l => l.trim() !== ".").join("");
  // 4. Troca '..' por '.'
  t = t.replace(/\.\./g, ".");
  // 5. Espaços antes de pontuação
  t = t.replace(/\s+([.,!?])/g, "$1");
  t = t.replace(/\s{2,}/g, " ");
  // Garante <br><br> antes da frase final, se necessário
  const fraseFinal = 'Pode mandar sua dúvida de forma objetiva, que eu respondo com base nas informações da CR Laser® 😊';
  if (t.includes(fraseFinal)) {
    t = t.replace(fraseFinal, '').trim();
    if (t.endsWith('.')) {
      t = t + '<br><br>' + fraseFinal;
    } else if (t.length > 0) {
      t = t + '.<br><br>' + fraseFinal;
    } else {
      t = fraseFinal;
    }
  }
  return t.trim();
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
  adicionarMensagem('Oi, eu sou a Lia, assistente virtual da CR Laser® 😊<br>Me envie sua dúvida sobre os procedimentos.', 'lia');
}

liaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pergunta = liaInput.value.trim();
  if (!pergunta) return;
  adicionarMensagem(pergunta, 'user');
  liaInput.value = '';
  adicionarMensagem('<span style="color:#aaa">Aguarde, consultando IA...</span>', 'lia');
  try {
    // Monta histórico para enviar (sem tags HTML)
    const historicoParaAPI = historico.slice(-6).map(m => ({ tipo: m.tipo, texto: m.texto }));
    const resp = await fetch('/api/lia-duvidas-ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta, historico: historicoParaAPI })
    });
    const data = await resp.json();
    liaMessages.removeChild(liaMessages.lastChild);
    if (data && data.resposta) {
      adicionarMensagem(limparTextoLia(data.resposta), 'lia');
    } else {
      adicionarMensagem(limparTextoLia('Ainda estou em treinamento para responder essa dúvida com segurança 😊<br>Por favor, fale com o WhatsApp da sua unidade de atendimento.'), 'lia');
    }
  } catch (e) {
    liaMessages.removeChild(liaMessages.lastChild);
    adicionarMensagem('Não consegui consultar a IA agora. Tente novamente em alguns instantes ou fale com sua unidade.', 'lia');
  }
});

mostrarMensagemInicial();
