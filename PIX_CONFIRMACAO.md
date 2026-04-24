# ✅ CHAVES DE PIX REAIS - CONFIRMAÇÃO

## 📍 Onde os PIX foram inseridos

**Arquivo:** `api/lia-v2.js` - **Linhas 36-40**

```javascript
// ════ CHAVES DE PIX REAIS - CR LASER® ════
const PIX_BRASILIA = 'Pix CR Laser® Brasília:\n\n🔽🔽\n\n43.713.316/0001-33';
const PIX_CAMPINAS = 'Pix CR Laser® Campinas:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n60.970.806/0001-34';
const PIX_GOIANIA = 'PIX CR Laser® Goiânia:\n\n🔽🔽\n\n39.252.455/0001-30';
const PIX_PALMAS = 'PIX CR Laser® Palmas:\n\n🔽🔽\n\n18.986.800/0001-99';
const PIX_SAO_PAULO = 'Pix CR Laser® São Paulo:\n\nObs.: O Pix é o CNPJ\n\n🔽🔽\n\n54.153.510/0001-28';
```

---

## ✅ Confirmação: Cada Cidade Envia o PIX Correto

### 1️⃣ Brasília → 43.713.316/0001-33

**Fluxo:**
```
Cliente: quero comprar
Lia: [oferece opções]

Cliente: sistema
Lia: [pede cidade]

Cliente: Brasília
Lia: [pede forma pagamento]

Cliente: Pix
Lia: ✅ Envia o Pix de Brasília
```

**Resposta que será enviada:**
```
Pix CR Laser® Brasília:

🔽🔽

43.713.316/0001-33

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento 😊
```

---

### 2️⃣ Campinas → 60.970.806/0001-34

**Fluxo:**
```
Cliente: quero comprar
Lia: [oferece opções]

Cliente: sistema
Lia: [pede cidade]

Cliente: Campinas
Lia: [pede forma pagamento]

Cliente: Pix
Lia: ✅ Envia o Pix de Campinas
```

**Resposta que será enviada:**
```
Pix CR Laser® Campinas:

Obs.: O Pix é o CNPJ

🔽🔽

60.970.806/0001-34

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento 😊
```

---

### 3️⃣ Goiânia → 39.252.455/0001-30

**Fluxo:**
```
Cliente: quero comprar
Lia: [oferece opções]

Cliente: sistema
Lia: [pede cidade]

Cliente: Goiânia
Lia: [pede forma pagamento]

Cliente: Pix
Lia: ✅ Envia o Pix de Goiânia
```

**Resposta que será enviada:**
```
PIX CR Laser® Goiânia:

🔽🔽

39.252.455/0001-30

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento 😊
```

---

### 4️⃣ Palmas → 18.986.800/0001-99

**Fluxo:**
```
Cliente: quero comprar
Lia: [oferece opções]

Cliente: sistema
Lia: [pede cidade]

Cliente: Palmas
Lia: [pede forma pagamento]

Cliente: Pix
Lia: ✅ Envia o Pix de Palmas
```

**Resposta que será enviada:**
```
PIX CR Laser® Palmas:

🔽🔽

18.986.800/0001-99

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento 😊
```

---

### 5️⃣ São Paulo → 54.153.510/0001-28

**Fluxo:**
```
Cliente: quero comprar
Lia: [oferece opções]

Cliente: sistema
Lia: [pede cidade]

Cliente: São Paulo
Lia: [pede forma pagamento]

Cliente: Pix
Lia: ✅ Envia o Pix de São Paulo
```

**Resposta que será enviada:**
```
Pix CR Laser® São Paulo:

Obs.: O Pix é o CNPJ

🔽🔽

54.153.510/0001-28

Após o pagamento, é só enviar o comprovante para a unidade e solicitar o agendamento 😊
```

---

## 🧪 EXEMPLOS FUNCIONANDO

### 📝 Teste 1: Sistema → Palmas → Pix

```
👤 Cliente: quero comprar

🤖 Lia: Você pode comprar aqui comigo, de forma mais rápida e prática, 
        ou falar direto com a equipe da unidade 😊
        
        Após a compra, é só enviar o comprovante para a unidade de 
        atendimento e solicitar o agendamento.
        
        ➖️➖️➖️➖️
        📍 Como fica mais fácil para você?
        
        1️⃣ Comprar aqui pelo sistema
        2️⃣ Falar com a equipe da unidade

👤 Cliente: sistema

🤖 Lia: Qual unidade fica melhor pra você?
        
        Brasília, Campinas, Goiânia, Palmas ou São Paulo?

👤 Cliente: Palmas

🤖 Lia: Perfeito 😊
        
        Qual será a forma de pagamento?
        
        1️⃣ Pix
        2️⃣ Cartão

👤 Cliente: Pix

🤖 Lia: PIX CR Laser® Palmas:

        🔽🔽

        18.986.800/0001-99

        Após o pagamento, é só enviar o comprovante para a unidade 
        e solicitar o agendamento 😊

✅ VENDA INICIADA - CLIENTE TEM A CHAVE PIX CORRETA
```

---

### 📝 Teste 2: Sistema → Campinas → Pix

```
👤 Cliente: quero comprar

🤖 Lia: Você pode comprar aqui comigo, de forma mais rápida e prática, 
        ou falar direto com a equipe da unidade 😊
        
        Após a compra, é só enviar o comprovante para a unidade de 
        atendimento e solicitar o agendamento.
        
        ➖️➖️➖️➖️
        📍 Como fica mais fácil para você?
        
        1️⃣ Comprar aqui pelo sistema
        2️⃣ Falar com a equipe da unidade

👤 Cliente: sistema

🤖 Lia: Qual unidade fica melhor pra você?
        
        Brasília, Campinas, Goiânia, Palmas ou São Paulo?

👤 Cliente: Campinas

🤖 Lia: Perfeito 😊
        
        Qual será a forma de pagamento?
        
        1️⃣ Pix
        2️⃣ Cartão

👤 Cliente: Pix

🤖 Lia: Pix CR Laser® Campinas:

        Obs.: O Pix é o CNPJ

        🔽🔽

        60.970.806/0001-34

        Após o pagamento, é só enviar o comprovante para a unidade 
        e solicitar o agendamento 😊

✅ VENDA INICIADA - CLIENTE TEM A CHAVE PIX CORRETA
```

---

## 📊 TABELA DE CORRESPONDÊNCIA

| Cidade | CNPJ PIX | Confirmação |
|--------|----------|-------------|
| Brasília | 43.713.316/0001-33 | ✅ Configurado |
| Campinas | 60.970.806/0001-34 | ✅ Configurado |
| Goiânia | 39.252.455/0001-30 | ✅ Configurado |
| Palmas | 18.986.800/0001-99 | ✅ Configurado |
| São Paulo | 54.153.510/0001-28 | ✅ Configurado |

---

## 🔄 FLUXO DA LÓGICA

```javascript
// Usuário escolhe Pix
if (formaPagamento === 'pix') {
  // Busca o PIX da cidade
  const pix = PIX_POR_CIDADE[cidadeNorm];
  
  // Retorna:
  // "[Nome] Pix da Cidade:\n\n🔽🔽\n\n[CNPJ]\n\nApós o pagamento, ..."
  
  return gerarRespostaPix(cidadeCompra);
}
```

---

## ✅ RESUMO

- ✅ **5 Chaves reais de Pix** inseridas nas constantes
- ✅ **Cada cidade** envia o PIX correto
- ✅ **Formatação** padronizada com emojis e CNPJ
- ✅ **Confirmação** clara de próximos passos
- ✅ **Layout** mantido intacto
- ✅ **Fluxo** testado e funcionando

---

**Status:** 🚀 Pronto para Produção  
**Commit:** f9cef3a - feat: adicionar chaves reais de Pix para todas as unidades CR Laser®  
**Data:** 24/04/2026

