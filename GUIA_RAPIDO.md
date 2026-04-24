# 🎯 GUIA RÁPIDO - FLUXO DE VENDA LIA

## 📍 Localização

```
📁 Repositório: https://github.com/clinicacrlaser/gerador-crlaser
📄 Arquivo: api/lia-v2.js
📝 Linhas: 17-1372 (principais seções em 36-54 e 205-265 e 1273-1372)
```

---

## 🔧 4 PASSOS PARA ATIVAR

### Passo 1: Abrir Arquivo
```bash
code api/lia-v2.js
```

### Passo 2: Ir para Linha 36
**Pressione:** `Ctrl+G` → Digite `36` → Enter

### Passo 3: Preencher PIX
Troque os placeholders:
```javascript
// ❌ ANTES
const PIX_BRASILIA = 'INSERIR_PIX_BRASILIA'

// ✅ DEPOIS
const PIX_BRASILIA = 'sua-chave-aqui'
```

### Passo 4: Preencher Links de Cartão
Troque os placeholders:
```javascript
// ❌ ANTES
const LINK_CARTAO_BRASILIA = 'INSERIR_LINK_CARTAO_BRASILIA'

// ✅ DEPOIS
const LINK_CARTAO_BRASILIA = 'https://seu-link-aqui.com'
```

### Passo 5: Commit e Push
```bash
git add api/lia-v2.js
git commit -m "feat: ativar fluxo de venda com PIX e cartão"
git push
```

---

## 🧪 TESTAR AGORA

### Option A: Localmente
1. Abra `file:///C:/Users/clini/Code CR Laser V2/index.html`
2. Clique em "Fale com a Lia"
3. Digite: `quero comprar`

### Option B: Em Produção
1. Acesse: https://gerador-crlaser.vercel.app
2. Espere deploy (~2 min após push)
3. Digite: `quero comprar` no chat

---

## 📋 CHECKLISTA

- [ ] Preenchi PIX para Brasília
- [ ] Preenchi PIX para Campinas
- [ ] Preenchi PIX para Goiânia
- [ ] Preenchi PIX para Palmas
- [ ] Preenchi PIX para São Paulo
- [ ] Preenchi Link de Cartão para Brasília
- [ ] Preenchi Link de Cartão para Campinas
- [ ] Preenchi Link de Cartão para Goiânia
- [ ] Preenchi Link de Cartão para Palmas
- [ ] Preenchi Link de Cartão para São Paulo
- [ ] Fiz commit
- [ ] Fiz push
- [ ] Testei em produção

---

## 📞 CAMPOS A PREENCHER

| Campo | Linha | Descrição |
|-------|-------|-----------|
| `PIX_BRASILIA` | 36 | Chave Pix de Brasília |
| `PIX_CAMPINAS` | 37 | Chave Pix de Campinas |
| `PIX_GOIANIA` | 38 | Chave Pix de Goiânia |
| `PIX_PALMAS` | 39 | Chave Pix de Palmas |
| `PIX_SAO_PAULO` | 40 | Chave Pix de São Paulo |
| `LINK_CARTAO_BRASILIA` | 46 | Link de pagamento Brasília |
| `LINK_CARTAO_CAMPINAS` | 47 | Link de pagamento Campinas |
| `LINK_CARTAO_GOIANIA` | 48 | Link de pagamento Goiânia |
| `LINK_CARTAO_PALMAS` | 49 | Link de pagamento Palmas |
| `LINK_CARTAO_SAO_PAULO` | 50 | Link de pagamento São Paulo |

---

## 🎬 DEMONSTRAÇÃO RÁPIDA

### Cenário 1: Comprar via Pix
```
Usuário: quero comprar
Lia: [oferece opções]
Usuário: 1
Lia: [pede cidade]
Usuário: Palmas
Lia: [pede forma pagamento]
Usuário: 1
Lia: [envia chave Pix de Palmas]
✅ FIM
```

### Cenário 2: Falar com Equipe
```
Usuário: quero comprar
Lia: [oferece opções]
Usuário: 2
Lia: [pede cidade]
Usuário: campinas
Lia: [envia link WhatsApp de Campinas]
✅ FIM
```

---

## 📊 ESTRUTURA DE DADOS

### Contexto Guardado
```json
{
  "intencao": "fluxo_compra_aguardando_pagamento",
  "intencaoCompra": "sistema",
  "cidade": "palmas",
  "cidadeCompra": "palmas",
  "formaPagamento": "pix"
}
```

### Fluxo de Estados
```
fluxo_compra_opcoes
    ↓ (escolhe)
    ├─→ fluxo_compra_aguardando_cidade_equipe → compra_finalizada_equipe
    └─→ fluxo_compra_aguardando_cidade_sistema → fluxo_compra_aguardando_pagamento → compra_finalizada_sistema
```

---

## ❌ PROBLEMAS COMUNS

### "Não está funcionando"
**Solução:** Verifique se fez push
```bash
git log --oneline -5
# Deve mostrar seu commit recente
```

### "Mostra INSERIR_PIX_PALMAS"
**Solução:** Você não preencheu os placeholders
```bash
# Verifique linhas 36-54
grep "INSERIR_PIX" api/lia-v2.js
# Se aparecer, edite o arquivo
```

### "Não entendo qual cidade"
**Solução:** A Lia suporta apenas:
- Brasília
- Campinas
- Goiânia
- Palmas
- São Paulo

---

## 🆘 SUPORTE RÁPIDO

**Documentação Completa:** `FLUXO_VENDA_LIA.md`  
**Exemplos de Teste:** `TESTES_FLUXO_VENDA.json`  
**Resumo Executivo:** `RESUMO_FLUXO_VENDA.md`

---

## 📌 PONTOS IMPORTANTES

✅ **PIX pode ser:**
- CPF: `12345678900`
- Email: `email@domain.com`
- Telefone: `+5562987654321`
- Chave aleatória: `abc-def-ghi-jkl`

✅ **Links de Cartão devem:**
- Começar com `https://`
- Levar para página de pagamento
- Aceitar variáveis de preço (se necessário)

✅ **O fluxo:**
- Não quebra com typos (detecta variações)
- Repete perguntas se não entender
- Guarda contexto entre mensagens
- Bloqueia pedidos de preço

✅ **Deve fazer:**
1. Editar linhas 36-54
2. Commit com `git commit`
3. Push com `git push`
4. Esperar ~2 min para deploy
5. Testar em produção

---

**⏰ Tempo Estimado:** 5 minutos  
**Dificuldade:** ⭐ Fácil  
**Impacto:** Alto - Ativa nova fonte de receita

