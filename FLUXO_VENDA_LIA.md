# 📋 Fluxo de Venda - Lia Chatbot

## 🎯 Objetivo
Implementar um fluxo completo de venda dentro da Lia, oferecendo duas opções ao cliente:
1. **Comprar pelo sistema** (com pagamento via Pix ou Cartão)
2. **Falar com a equipe** (via WhatsApp)

---

## 📍 Localização do Código

### Arquivo Principal
**Arquivo:** `api/lia-v2.js`

### O que foi adicionado:

#### 1️⃣ **Constantes de Respostas**  
**Linhas:** ~17-34 (após CONTEXTO_ULTRAFORMER_PALPEBRAS)

```javascript
const RESPOSTA_OPCOES_COMPRA = 'Você pode comprar aqui comigo, de forma mais rápida e prática, ou falar direto com a equipe da unidade 😊\n\nApós a compra, é só enviar o comprovante para a unidade de atendimento e solicitar o agendamento.\n\n➖️➖️➖️➖️\n📍 Como fica mais fácil para você?\n\n1️⃣ Comprar aqui pelo sistema\n2️⃣ Falar com a equipe da unidade';
const RESPOSTA_QUAL_UNIDADE = 'Qual unidade fica melhor pra você?\n\nBrasília, Campinas, Goiânia, Palmas ou São Paulo?';
const RESPOSTA_FORMA_PAGAMENTO = 'Perfeito 😊\n\nQual será a forma de pagamento?\n\n1️⃣ Pix\n2️⃣ Cartão';
```

#### 2️⃣ **Constantes de PIX (Placeholders)**
**Linhas:** ~36-44

```javascript
const PIX_BRASILIA = 'INSERIR_PIX_BRASILIA';
const PIX_CAMPINAS = 'INSERIR_PIX_CAMPINAS';
const PIX_GOIANIA = 'INSERIR_PIX_GOIANIA';
const PIX_PALMAS = 'INSERIR_PIX_PALMAS';
const PIX_SAO_PAULO = 'INSERIR_PIX_SAO_PAULO';
```

#### 3️⃣ **Constantes de Links de Cartão (Placeholders)**
**Linhas:** ~46-54

```javascript
const LINK_CARTAO_BRASILIA = 'INSERIR_LINK_CARTAO_BRASILIA';
const LINK_CARTAO_CAMPINAS = 'INSERIR_LINK_CARTAO_CAMPINAS';
const LINK_CARTAO_GOIANIA = 'INSERIR_LINK_CARTAO_GOIANIA';
const LINK_CARTAO_PALMAS = 'INSERIR_LINK_CARTAO_PALMAS';
const LINK_CARTAO_SAO_PAULO = 'INSERIR_LINK_CARTAO_SAO_PAULO';
```

#### 4️⃣ **Mapeadores por Cidade**
**Linhas:** ~56-65

```javascript
const PIX_POR_CIDADE = {
  brasilia: PIX_BRASILIA,
  campinas: PIX_CAMPINAS,
  goiania: PIX_GOIANIA,
  palmas: PIX_PALMAS,
  saopaulo: PIX_SAO_PAULO
};

const LINK_CARTAO_POR_CIDADE = {
  brasilia: LINK_CARTAO_BRASILIA,
  campinas: LINK_CARTAO_CAMPINAS,
  goiania: LINK_CARTAO_GOIANIA,
  palmas: LINK_CARTAO_PALMAS,
  saopaulo: LINK_CARTAO_SAO_PAULO
};
```

#### 5️⃣ **Funções de Detecção**
**Linhas:** ~205-265 (após `detectarIntencaoHumano`)

```javascript
// Detectar intenção de compra
function detectarIntencaoCompra(texto = '') { ... }

// Detectar escolha: Equipe
function detectarEscolhaEquipe(texto = '') { ... }

// Detectar escolha: Sistema
function detectarEscolhaSistema(texto = '') { ... }

// Detectar forma de pagamento
function detectarFormaPagamento(texto = '') { ... }

// Gerar resposta com chave Pix
function gerarRespostaPix(cidade = '') { ... }

// Gerar resposta com link de cartão
function gerarRespostaCartao(cidade = '') { ... }
```

#### 6️⃣ **Lógica do Fluxo no Handler Principal**
**Linhas:** ~1273-1372 (após `intencaoInterpretada.categoria === 'humano'`)

- **Detecção de "quero comprar"** → Oferece opções (equipe/sistema)
- **Contexto `fluxo_compra_opcoes`** → Processa escolha do usuário
- **Contexto `fluxo_compra_aguardando_cidade_equipe`** → Espera cidade, envia WhatsApp
- **Contexto `fluxo_compra_aguardando_cidade_sistema`** → Espera cidade, pergunta forma pagamento
- **Contexto `fluxo_compra_aguardando_pagamento`** → Espera opção pagamento, envia Pix ou link

---

## 🔧 Onde Trocar PIX e LINKS

### Opção 1: Trocar as Constantes (Recomendado)
**Arquivo:** `api/lia-v2.js` - **Linhas 36-54**

Substitua os placeholders pelos dados reais:

```javascript
// Exemplo:
const PIX_BRASILIA = 'sua-chave-pix-brasilia-aqui';
const PIX_CAMPINAS = 'sua-chave-pix-campinas-aqui';
const PIX_GOIANIA = 'sua-chave-pix-goiania-aqui';
const PIX_PALMAS = 'sua-chave-pix-palmas-aqui';
const PIX_SAO_PAULO = 'sua-chave-pix-sao-paulo-aqui';

const LINK_CARTAO_BRASILIA = 'https://link-pagamento-brasilia.com';
const LINK_CARTAO_CAMPINAS = 'https://link-pagamento-campinas.com';
const LINK_CARTAO_GOIANIA = 'https://link-pagamento-goiania.com';
const LINK_CARTAO_PALMAS = 'https://link-pagamento-palmas.com';
const LINK_CARTAO_SAO_PAULO = 'https://link-pagamento-sao-paulo.com';
```

---

## 🧪 Exemplos de Teste

### Teste 1: Comprar pelo Sistema (Palmas, Pix)

**Usuário diz:** `quero comprar`  
**Lia responde:**
```
Você pode comprar aqui comigo, de forma mais rápida e prática, ou falar direto com a equipe da unidade 😊

Após a compra, é só enviar o comprovante para a unidade de atendimento e solicitar o agendamento.

➖️➖️➖️➖️
📍 Como fica mais fácil para você?

1️⃣ Comprar aqui pelo sistema
2️⃣ Falar com a equipe da unidade
```

---

**Usuário diz:** `sistema` (ou `1`)  
**Lia responde:**
```
Qual unidade fica melhor pra você?

Brasília, Campinas, Goiânia, Palmas ou São Paulo?
```

---

**Usuário diz:** `Palmas`  
**Lia responde:**
```
Perfeito 😊

Qual será a forma de pagamento?

1️⃣ Pix
2️⃣ Cartão
```

---

**Usuário diz:** `Pix` (ou `1`)  
**Lia responde:**
```
Chave PIX de Palmas:

[PIX_PALMAS]

Após o pagamento, envie o comprovante para a unidade e solicite o agendamento 😊
```

**Contexto final:** `{ cidade: 'palmas', intencao: 'compra_finalizada_sistema', intencaoCompra: 'sistema', formaPagamento: 'pix' }`

---

### Teste 2: Falar com Equipe (Campinas)

**Usuário diz:** `quero comprar`  
**Lia responde:** (mesmo de antes)

---

**Usuário diz:** `equipe` (ou `2`)  
**Lia responde:**
```
Qual unidade fica melhor pra você?

Brasília, Campinas, Goiânia, Palmas ou São Paulo?
```

---

**Usuário diz:** `Campinas`  
**Lia responde:**
```
Perfeito 😊

Vou te direcionar direto para a equipe 👇

É só clicar aqui e falar com a equipe da unidade de Campinas 👇

[BOTÃO: Falar com a equipe no WhatsApp](link WhatsApp Campinas)
```

**Contexto final:** `{ cidade: 'campinas', intencao: 'compra_finalizada_equipe', intencaoCompra: 'equipe', cidadeCompra: 'campinas' }`

---

## 📊 Fluxograma

```
"quero comprar/fechar/aproveitar"
         ↓
   [oferece opções]
    /          \
Sistema      Equipe
  ↓             ↓
Pede cidade  Pede cidade (se não tiver)
  ↓             ↓
Pergunta  Manda WhatsApp
pagamento    (FIM)
  ↓
Pix/Cartão
  ↓
Envia
Pix ou link
  (FIM)
```

---

## ⚙️ Contexto Guardado

A Lia mantém no contexto:
- `intencao` - Estado atual do fluxo (ex: `fluxo_compra_opcoes`, `fluxo_compra_aguardando_pagamento`)
- `intencaoCompra` - Escolha do cliente (`'equipe'` ou `'sistema'`)
- `cidade` / `cidadeCompra` - Cidade detectada
- `formaPagamento` - Forma escolhida (`'pix'` ou `'cartao'`)

---

## ✅ Validações Implementadas

- ✅ Detecta variações: "quero comprar", "quero fechar", "quero aproveitar", "quero pagar", "vou querer", "quero essa oferta"
- ✅ Detecta opções: "1", "sistema", "aqui", "2", "equipe", "atendente", "whatsapp"
- ✅ Detecta forma pagamento: "1", "pix", "2", "cartão", "cartao"
- ✅ Mantém contexto entre mensagens
- ✅ Não quebra fluxo WhatsApp existente
- ✅ Suporta 5 unidades (Brasília, Campinas, Goiânia, Palmas, São Paulo)
- ✅ Layout e design mantidos intactos

---

## 🚀 Próximos Passos

1. **Preencher PIX:**  
   Substitua `INSERIR_PIX_*` pelas chaves reais

2. **Preencher Links de Cartão:**  
   Substitua `INSERIR_LINK_CARTAO_*` pelos links reais

3. **Deploy:**  
   Faça commit e push para produção

4. **Testar:**  
   Acesse o chat e teste os dois cenários

---

## 📝 Notas

- O fluxo é **não-linear**: usuário pode ir para equipe ou sistema a qualquer momento
- **Não há limite** de tentativas: se usuário não entender, Lia repete a pergunta
- **Contexto é persistido** entre mensagens no mesmo chat
- **PIX pode ser qualquer coisa**: CPF, email, telefone ou chave aleatória
- **Links de Cartão** devem ser URLs válidas (ex: Stripe, Square, seu gateway)

---

**Criado em:** 24/04/2026  
**Versão:** 1.0  
**Status:** ✅ Pronto para testes
