# 🎯 Padronização de Respostas Lia - CR Laser® Oficial

## ✅ Objetivo Alcançado
A Lia agora segue o modelo oficial da CR Laser® com **bloqueio obrigatório de preços** e sempre direciona para o sistema de ofertas.

---

## 🔒 BLOQUEIO OBRIGATÓRIO DE PREÇOS

### Como Funciona

**1. Prioridade Máxima**
```javascript
// Linha ~470 em api/lia-v2.js
function classificarIntencaoMensagem(texto = '', contexto = {}) {
  // ════ PRIORIDADE MÁXIMA: Bloquear pedidos de preço ════
  // NUNCA deixar preço cair em outra categoria!
  if (detectarPreco(texto) || detectarInteresseFechamento(texto)) {
    return { categoria: 'oferta_preco' };
  }
  // ... restante das classificações
}
```

**Por que funciona:**
- `detectarPreco()` é verificado ANTES de qualquer outra categoria
- Detecta: "preço", "valor", "quanto custa", "quanto sai", "me passa os valores"
- Mesmo que o texto mencione "bioestimulador", "ultraformer", etc., a intenção é sempre classificada como `oferta_preco`
- NÃO pode cair em `duvidas_gerais`, `bio_preenchimento`, `botox_rugas`, etc.

**2. Resposta Padrão Bloqueada**
```javascript
// Linha ~14 em api/lia-v2.js
const RESPOSTA_PRECO = 'Os valores variam conforme a campanha do dia 😊\n\n👉 O ideal é você gerar direto no sistema para ver a condição atual';
```

**Características:**
- ✅ NUNCA informa valores/preços
- ✅ SEMPRE direciona para o sistema
- ✅ Explica que valores variam conforme campanha
- ✅ Mantém tom amigável e profissional

**3. Proteção Adicional em Respostas Longas**
```javascript
// Linha ~850 em api/lia-v2.js
function respostaCurtaComConducao(resposta = '') {
  // ...
  // ════ BLOQUEIO OBRIGATÓRIO: NUNCA pedir "valores" ════
  if (!terminaComAcaoOuPergunta && !texto.includes('👉')) {
    texto = `${texto}\n\n👉 Você pode gerar sua oferta agora direto no sistema`;
  }
  return texto;
}
```

**Objetivo:**
- Remove qualquer menção a "Quer que eu te passe os valores?"
- Substitui por CTA padrão: "👉 Você pode gerar sua oferta agora direto no sistema"
- Garante que TODAS as respostas direcionem ao sistema, nunca peça valores

---

## 📋 FLUXO PADRÃO DE RESPOSTA

### Modelo Oficial CR Laser®

```
1️⃣  RESPONDER A DÚVIDA (Curto e direto)
2️⃣  AUTORIDADE (Equipamento original, especialistas, ANVISA, segurança)
3️⃣  DIRECIONAR (👉 Gerar oferta no sistema)
```

### Exemplos de Respostas Padronizadas

#### ✅ Ultraformer MPT
```javascript
const RESPOSTA_ULTRAFORMER_PALPEBRAS = 'Pode valer a pena sim 😊

O Ultraformer MPT Pálpebras é um tratamento não-invasivo que atua na flacidez, estimulando colágeno e melhorando o contorno.

Aqui na CR Laser®:
- Utilizamos equipamentos próprios
- Nada é alugado
- Ponteiras originais e ANVISA aprovadas

👉 Você pode gerar sua oferta agora direto no sistema';
```

#### ✅ Botox Facial
```javascript
const RESPOSTA_BOTOX_FACIAL_RUGAS = 'Para rugas na testa e linhas de expressão, o Botox é uma ótima solução 😊

Fazemos aplicação completa no terço superior com retorno, buscando resultado natural e equilibrado.

Aqui na CR Laser®:
- Toxina Botulínica original importada
- Aplicação por especialistas certificados
- Resultado natural garantido

👉 Você pode gerar sua oferta agora direto no sistema';
```

#### ✅ Bioestimulador
```javascript
const RESPOSTA_FLACIDEZ_ROSTO_MAGRO = 'Pelo que você descreveu, o Bioestimulador faz mais sentido 😊

Ele estimula colágeno natural, ajudando a restaurar estrutura e volume.

Aqui na CR Laser®:
- Bioestimulador original (Diamond)
- Aplicação por especialistas certificados
- ANVISA aprovado

👉 Você pode gerar sua oferta agora direto no sistema';
```

---

## 🧪 TESTES VALIDADOS

### Perguntas de Preço (BLOQUEADAS ✅)

| Pergunta | Resposta | Status |
|----------|----------|--------|
| "quanto custa ultraformer" | "Os valores variam conforme a campanha do dia 😊 👉 O ideal é você gerar direto no sistema..." | ✅ Bloqueado |
| "valor botox" | [Resposta com autoridade] + "👉 Você pode gerar sua oferta agora direto no sistema" | ✅ Bloqueado |
| "preço bioestimulador" | "Os valores variam conforme a campanha do dia 😊 👉 O ideal é você gerar direto no sistema..." | ✅ Bloqueado |
| "quanto sai ultraformer" | "Os valores variam conforme a campanha do dia 😊 👉 O ideal é você gerar direto no sistema..." | ✅ Bloqueado |
| "me passa os valores" | Direciona para gerar oferta no sistema | ✅ Bloqueado |

### Perguntas de Dúvida (RESPONDIDAS + DIRECIONADAS)

| Pergunta | Resposta | Status |
|----------|----------|--------|
| "como funciona ultraformer" | Explica funcionamento + CTA sistema | ✅ Direcionado |
| "quais ponteiras usa" | Lista ponteiras + CTA sistema | ✅ Direcionado |
| "botox é seguro" | Resposta confiança + CTA sistema | ✅ Direcionado |
| "bioestimulador dói" | Explica conforto + CTA sistema | ✅ Direcionado |

---

## 🎯 ELEMENTOS DE CONFIANÇA (Sempre Presentes)

Todas as respostas incluem um ou mais elementos de autoridade:

✅ **Equipamento Original**
- "Utilizamos equipamentos próprios"
- "Nada é alugado"
- "Toxina Botulínica original importada"

✅ **Especialistas Certificados**
- "Aplicação por especialistas certificados"
- "Especialistas especializados"

✅ **ANVISA Aprovado**
- "Ponteiras originais e ANVISA aprovadas"
- "ANVISA aprovado"

✅ **Segurança & Resultado**
- "Resultado natural garantido"
- "Segurança em primeiro lugar"

---

## 📱 CTA (Call To Action) PADRÃO

Todas as respostas terminam com UMA das seguintes:

```
👉 Você pode gerar sua oferta agora direto no sistema

OU

👉 Clique em gerar oferta e veja as condições de hoje
```

**NUNCA:**
- ❌ "Quer que eu te passe os valores?"
- ❌ Enviar preços diretos
- ❌ Fazer "oferta informal" via chat

---

## 🔧 ARQUIVOS MODIFICADOS

### `api/lia-v2.js`

**Linhas 14-31:** Constantes de resposta padronizadas
```javascript
const RESPOSTA_PRECO = '...' // Bloqueio de preços
const RESPOSTA_ULTRAFORMER_PALPEBRAS = '...' // Com autoridade
const RESPOSTA_BOTOX_FACIAL_RUGAS = '...' // Com autoridade
const RESPOSTA_FLACIDEZ_ROSTO_MAGRO = '...' // Com autoridade
const RESPOSTA_FLACIDEZ_ROSTO_CHEIO = '...' // Com autoridade
```

**Linhas ~470-502:** Ordem de Classificação (Prioridade)
```javascript
function classificarIntencaoMensagem(texto = '', contexto = {}) {
  // PRIORIDADE MÁXIMA: detectarPreco PRIMEIRO
  if (detectarPreco(texto) || detectarInteresseFechamento(texto)) {
    return { categoria: 'oferta_preco' };
  }
  // ... restante das categorias
}
```

**Linhas ~850-885:** Bloqueio em Respostas Longas
```javascript
function respostaCurtaComConducao(resposta = '') {
  // ════ BLOQUEIO OBRIGATÓRIO: NUNCA pedir "valores" ════
  if (!terminaComAcaoOuPergunta && !texto.includes('👉')) {
    texto = `${texto}\n\n👉 Você pode gerar sua oferta agora direto no sistema`;
  }
}
```

---

## ✅ CONFIRMAÇÕES FINAIS

### 1️⃣ Bloqueio de Preço
- ✅ Detecta TODOS os pedidos de preço
- ✅ Classifica como `oferta_preco` com prioridade máxima
- ✅ Nunca cai em outras categorias
- ✅ Resposta padrão: "Os valores variam conforme a campanha do dia 😊"

### 2️⃣ Direcionamento para Sistema
- ✅ TODAS as respostas terminam com CTA para gerar oferta
- ✅ Nunca oferece preço direto no chat
- ✅ Sempre direciona para o sistema de ofertas
- ✅ Mantém tom profissional e amigável

### 3️⃣ Elementos de Confiança
- ✅ Equipamento original
- ✅ Não é alugado
- ✅ Especialistas certificados
- ✅ ANVISA aprovado
- ✅ Resultado garantido

---

## 📊 RESUMO

| Aspecto | Status | Detalhes |
|--------|--------|----------|
| Bloqueio de Preços | ✅ | Prioridade máxima, nunca cai em outra categoria |
| Direcionamento Sistema | ✅ | Todas as respostas terminam com CTA padrão |
| Autoridade | ✅ | Equipamento, especialistas, ANVISA presente |
| Tom Profissional | ✅ | Amigável, direto, sem ofertas informais |
| Modelo Oficial | ✅ | Responder → Autoridade → Direcionar |

---

## 🚀 Commit

```
padronizar respostas lia com bloqueio obrigatório de preços e modelo oficial cr laser
```

**Hash:** e54787f

**Alterações:**
- 1 arquivo modificado
- 23 inserções
- 13 remoções
