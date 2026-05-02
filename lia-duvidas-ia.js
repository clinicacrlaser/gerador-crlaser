// lia-duvidas-ia.js - Frontend Lia IA

const liaMessages = document.getElementById('liaMessages');
const liaForm = document.getElementById('liaForm');
const liaInput = document.getElementById('liaInput');

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
  adicionarMensagem('<span style="color:#aaa">Aguarde, consultando IA...</span>', 'lia');
  try {
    const resp = await fetch('/api/lia-duvidas-ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta })
    });
    const data = await resp.json();
    // Remove "Aguarde" msg
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
