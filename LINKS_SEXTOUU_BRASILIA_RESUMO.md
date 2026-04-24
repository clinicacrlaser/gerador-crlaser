# 🎯 LINKS DE PAGAMENTO SEXTOUU - BRASÍLIA

## ✅ IMPLEMENTAÇÃO COMPLETA

---

## 1️⃣ ONDE OS LINKS FORAM INSERIDOS

### Arquivo: `api/lia-v2.js`

**Localização 1 - Mapeamento de Links (Linhas ~95-130):**
```javascript
// ════ LINKS DE PAGAMENTO - CAMPANHA SEXTOUU - BRASÍLIA ════
const LINKS_CAMPANHA_SEXTOUU_BRASILIA = {
  'Ultraformer MPT Full Face': 'https://cielolink.com.br/3IdBDxq',
  'Ultraformer MPT Terço Inferior': 'https://cielolink.com.br/4eilQJG',
  'Ultraformer MPT Papada': 'https://cielolink.com.br/40hOlS4',
  // ... 30+ procedimentos
}
```

**Localização 2 - Função de Geração de Resposta (Linhas ~810-830):**
```javascript
function gerarRespostaOfertaCampanha(procedimento = '', cidade = '') {
  // Busca o link no mapeamento
  // Se existir, gera HTML com botão clicável
  // Se não, retorna null
}
```

**Localização 3 - Função de Detecção de Procedimento (Linhas ~830-845):**
```javascript
function detectarProcedimento(texto = '') {
  // Detecta o nome do procedimento no texto do cliente
  // Busca exata pelo nome completo
}
```

**Localização 4 - Integração no Fluxo (Linhas ~1510-1545):**
```javascript
if (contexto.intencao === 'fluxo_compra_aguardando_cidade_sistema') {
  const procedimentoDetectado = detectarProcedimento(pergunta);
  
  if (procedimentoDetectado && cidadeAtual === 'brasilia') {
    const respostaOferta = gerarRespostaOfertaCampanha(procedimentoDetectado, cidadeAtual);
    if (respostaOferta) {
      // Enviar link
    }
  }
}
```

---

## 2️⃣ COMO O SISTEMA ESCOLHE O LINK

### Fluxo de Decisão:

```
Cliente: "quero comprar"
   ↓
Cliente: "sistema"
   ↓
Cliente: "Brasília" ou "Ultraformer MPT Full Face"
   ↓
✅ Sistema DETECTA procedimento? → SIM
   ✅ Cidade é Brasília? → SIM
      ✅ Existe link para esse procedimento? → SIM
         → ENVIAR LINK + BOTÃO "Finalizar Compra"
      ❌ Existe link? → NÃO
         → Enviar mensagem "Ainda não temos o link"
         → Redirecionar para WhatsApp
   ❌ Cidade não é Brasília?
      → Perguntar forma de pagamento (Pix/Cartão)
❌ Não detectou procedimento?
   → Perguntar forma de pagamento (Pix/Cartão)
```

### Processo de Detecção:

1. **Normalização de texto:** Remove acentos, maiúsculas, espaços extras
2. **Busca exata:** Procura o nome completo do procedimento na mensagem
3. **Verificação de cidade:** Valida se é Brasília
4. **Busca de link:** Consulta `LINKS_CAMPANHA_SEXTOUU_BRASILIA`
5. **Geração de resposta:** Cria HTML com botão se link existir

---

## 3️⃣ EXEMPLO FUNCIONANDO

### TESTE: Sistema → Brasília → Ultraformer MPT Full Face

```
👤 Cliente: quero comprar

🤖 Lia: Você pode comprar aqui comigo, de forma mais rápida e prática, 
        ou falar direto com a equipe da unidade 😊
        
        Após a compra, é só enviar o comprovante para a unidade de 
        atendimento e solicitar o agendamento.
        
        📍 Como fica mais fácil para você?
        
        1️⃣ Comprar aqui pelo sistema
        2️⃣ Falar com a equipe da unidade

👤 Cliente: sistema

🤖 Lia: Qual unidade fica melhor pra você?
        
        Brasília, Campinas, Goiânia, Palmas ou São Paulo?

👤 Cliente: Brasília Ultraformer MPT Full Face

🤖 Lia: Perfeito 😊

        Você pode finalizar sua compra aqui 👇

        [🛒 Finalizar Compra]

        Após o pagamento, é só enviar o comprovante para a 
        unidade e solicitar o agendamento.

✅ SUCESSO - Cliente clica no botão e vai direto para o link de pagamento
```

---

## 📊 MAPEAMENTO COMPLETO - BRASÍLIA SEXTOUU

### Ultraformer (18 procedimentos):
| Procedimento | Link |
|-------------|------|
| Ultraformer MPT Full Face | https://cielolink.com.br/3IdBDxq |
| Ultraformer MPT Terço Inferior | https://cielolink.com.br/4eilQJG |
| Ultraformer MPT Papada | https://cielolink.com.br/40hOlS4 |
| Ultraformer MPT Bichectomia | https://cielolink.com.br/3Ta289v |
| Ultraformer MPT Pescoço | https://cielolink.com.br/4nfB2eQ |
| Ultraformer MPT Colo | https://cielolink.com.br/3Ta4F3v |
| Ultraformer MPT Pálpebras | https://cielolink.com.br/4nhX5l2 |
| Ultraformer MPT Abdome | https://cielolink.com.br/3HXv3eI |
| Ultraformer MPT Flancos | https://cielolink.com.br/40mfAej |
| Ultraformer MPT Braços | https://cielolink.com.br/4eiTq2d |
| Ultraformer MPT Gordura Sutiã | https://cielolink.com.br/4nwe0Rc |
| Ultraformer MPT Gordura Pré-Axilar | https://cielolink.com.br/44tNCjc |
| Ultraformer MPT Bananinha | https://cielolink.com.br/40hTl9i |
| Ultraformer MPT Interno Coxa | https://cielolink.com.br/46cVlDv |
| Ultraformer MPT Monte Vênus | https://cielolink.com.br/4nzzzAr |
| Ultraformer MPT Rejuvenescimento Íntimo | https://cielolink.com.br/44xkBmM |
| Ultraformer MPT Joelho | https://cielolink.com.br/3FTixw9 |
| Ultraformer MPT Mãos | https://cielolink.com.br/3TEQSlC |

### Lavieen (9 procedimentos):
| Procedimento | Link |
|-------------|------|
| Lavieen Facial Completo | https://cielolink.com.br/4et2Nwv |
| Lavieen Facial + Pescoço | https://cielolink.com.br/3Id8zWT |
| Lavieen Pescoço + Colo | https://cielolink.com.br/45z4lmh |
| Lavieen Face + Pescoço + Colo | https://cielolink.com.br/3ZLbuwb |
| Lavieen BB Laser | https://cielolink.com.br/3FRMJI0 |
| Lavieen Melasma | https://cielolink.com.br/4lq229L |
| Lavieen Olheiras | https://cielolink.com.br/44lhygk |
| Lavieen Capilar | https://cielolink.com.br/4lkw0vN |
| Lavieen Mãos | https://cielolink.com.br/3ZO2Qgm |

### Outros (4 procedimentos):
| Procedimento | Link |
|-------------|------|
| Botox Facial | https://cielolink.com.br/4t0kASi |
| Botox Suor | https://cielolink.com.br/41RXUHO |
| Preenchedor Facial | https://cielolink.com.br/4mcm7ls |
| Bioestimulador Diamond | https://cielolink.com.br/3HUzUx6 |

**Total: 31 procedimentos mapeados**

---

## 🧪 VALIDAÇÃO

✅ Teste local executado: `_test_sextouu_brasilia.mjs`  
✅ 6 casos de teste validados  
✅ Detecção de procedimento funcional  
✅ Geração de HTML com botão funcional  
✅ Lógica de redirecionamento ativa  

---

## 🔄 FLUXO ALTERNATIVO: Sem Link

Se o procedimento não tiver link (ou for em outra cidade):

```
👤 Cliente: Brasília Algum procedimento sem link

🤖 Lia: Ainda não temos o link direto dessa oferta 😊

        Vou te direcionar para a equipe da unidade 👇
        
        [Falar com a equipe no WhatsApp]
```

---

## 📈 RESUMO DA IMPLEMENTAÇÃO

| Aspecto | Detalhes |
|--------|----------|
| **Arquivo** | api/lia-v2.js |
| **Procedimentos mapeados** | 31 (Ultraformer, Lavieen, Botox, etc) |
| **Cidades com links** | Brasília (Sextouu) |
| **Função de detecção** | `detectarProcedimento()` |
| **Função de geração** | `gerarRespostaOfertaCampanha()` |
| **Estado do fluxo** | `fluxo_compra_aguardando_cidade_sistema` |
| **Resultado com link** | HTML com botão "🛒 Finalizar Compra" |
| **Resultado sem link** | Redirecionamento para WhatsApp |

---

## 🚀 STATUS: PRONTO PARA PRODUÇÃO

✅ Implementação concluída  
✅ Links mapeados (31 procedimentos)  
✅ Lógica de detecção testada  
✅ Fluxo integrado ao chatbot  
✅ Fallback para WhatsApp configurado  
✅ Commits feitos e pusheados  

**Nota:** Outras cidades podem ser adicionadas seguindo o mesmo padrão (criar constante `LINKS_CAMPANHA_SEXTOUU_[CIDADE]` e adicionar validação no código).

---

## 📝 PRÓXIMOS PASSOS (Opcional)

1. Adicionar links para outras cidades (Campinas, Goiânia, Palmas, São Paulo)
2. Implementar tracking de cliques nos links
3. Adicionar histórico de procedimentos comprados
4. Implementar webhooks de confirmação de pagamento
