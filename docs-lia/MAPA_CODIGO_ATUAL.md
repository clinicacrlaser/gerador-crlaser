# Mapa do Código Atual da Lia

## Objetivo

Este documento registra onde estão as partes principais da Lia no código atual, antes da integração com a nova base de conhecimento.

## Arquivos principais

Os arquivos mais relevantes para a Lia hoje são:

- [lia-duvidas-ia.html](lia-duvidas-ia.html): página isolada do chat da Lia.
- [lia-duvidas-ia.js](lia-duvidas-ia.js): frontend do chat, envio de mensagens, exibição de respostas e limpeza de texto.
- [api/lia-duvidas-ia.js](api/lia-duvidas-ia.js): backend da API da Lia, regras de segurança, reconhecimento de procedimentos e chamada para a IA.
- [lia-vendas.js](lia-vendas.js): fluxo de vendas e links de WhatsApp, com lógica de compra e atendimento.
- [script.js](script.js): botões flutuantes, barra de ações, abertura de WhatsApp e integração com o painel da Lia.
- [index.html](index.html): estrutura da página principal, botões, modal de WhatsApp e elementos visuais que envolvem a Lia.

## O que identificar em [api/lia-duvidas-ia.js](api/lia-duvidas-ia.js)

### Prompt principal da Lia

- O prompt principal fica dentro da função `callOpenAI`.
- Esse prompt define:
  - papel da Lia;
  - tom de resposta;
  - regras de agendamento;
  - regra de preço e compra;
  - fallback de segurança;
  - instruções de resposta baseadas na base de conhecimento.

### Procedimentos permitidos

- A lista de procedimentos permitidos está em `PROCEDIMENTOS_PERMITIDOS`.
- Hoje o código considera como permitidos principalmente:
  - Botox
  - Ultraformer MPT
  - Laser Lavieen
  - Preenchedor de Ácido Hialurônico
  - Bioestimulador Diamond
  - Scizer
  - Endymed
  - Microagulhamento Robótico

### Procedimentos proibidos

- A lista de procedimentos proibidos está em `PROCEDIMENTOS_PROIBIDOS`.
- Hoje há regra explícita para evitar afirmar que a CR Laser® oferece certos procedimentos.

### Sinônimos

- Os sinônimos e equivalências estão em `SINONIMOS`.
- Essa estrutura é usada por `normalizarProcedimento` para transformar termos do usuário em um procedimento conhecido.

### Regras específicas de procedimentos

- Regras para Sculptra, PMMA, Morpheus8, CO2, criolipólise, rinomodelação e fios de PDO aparecem no fluxo principal do handler, antes da chamada para a IA.
- Há respostas diretas para alguns casos, como:
  - Sculptra → redireciona para Bioestimulador Diamond.
  - Morpheus8 → redireciona para Microagulhamento Robótico.
  - Criolipólise → redireciona para Scizer.
  - CO2 → compara com Lavieen e Pixel em alguns casos.

### Filtros de saída

- Há limpeza de resposta em `removerFinaisAbertos` e `limparResposta`.
- Esses filtros removem frases abertas, caracteres quebrados e espaços irregulares.

### Regras para evitar finais abertos

- O backend remove frases de fechamento abertas como “Se quiser, posso te explicar melhor...”.
- Isso é feito em `removerFinaisAbertos` e aplicado antes do retorno final para o frontend.

### Onde a resposta é enviada para a IA

- A chamada para a IA acontece em `callOpenAI`.
- Essa função monta um prompt com:
  - instruções de segurança;
  - base reduzida de linhas relevantes;
  - pergunta do usuário.

### Onde a resposta é tratada antes de voltar para o frontend

- No final do handler, a resposta recebida é:
  - limpa com `removerFinaisAbertos`;
  - normalizada com `limparResposta`;
  - devolvida dentro de JSON no campo `resposta`.

## O que identificar em [lia-duvidas-ia.js](lia-duvidas-ia.js)

### Envio da mensagem do usuário

- A interação começa em `liaForm.addEventListener('submit', async (e) => ...)`.
- O frontend lê o texto do input, monta a mensagem do usuário e envia para a API em `/api/lia-duvidas-ia`.

### Exibição da resposta da Lia

- A resposta da API é exibida na tela via `adicionarMensagem`.
- O conteúdo é renderizado como HTML em `msg.innerHTML`.

### Limpeza de texto

- A função `limparTextoLia` remove caracteres quebrados, quebras estranhas e frases finais inconvenientes.
- Ela também injeta a frase padrão final quando necessário.

### Mensagens padrão

- `mostrarMensagemInicial` exibe a saudação inicial do chat da Lia.
- Em caso de erro ou resposta vazia, o frontend mostra mensagens de fallback.

### Botões, eventos e comportamento do chat

- O chat é um formulário simples com campo de input e botão Enviar.
- Não há botões de ação complexos neste arquivo; o comportamento principal é envio, espera e renderização.

## O que identificar em [lia-duvidas-ia.html](lia-duvidas-ia.html)

### Estrutura geral da página

- A página é uma estrutura simples em HTML com:
  - título;
  - container do chat;
  - área de mensagens;
  - formulário de envio.

### Modal ou aviso inicial

- Não há modal de aviso inicial neste arquivo.
- O aviso inicial é exibido pelo JavaScript do frontend.

### Área do chat

- O container de mensagens recebe o id `liaMessages`.
- O formulário recebe `liaForm` e o input `liaInput`.

### Campo de digitação e botões principais

- O campo de digitação é o input com id `liaInput`.
- O botão principal é o botão de submit do formulário.

## Arquivos relacionados à Lia de compras e botões

### [lia-vendas.js](lia-vendas.js)

- Está ligado ao fluxo de vendas e ao atendimento.
- Tem lógica para montar links de WhatsApp e para interagir com o fluxo de compra.
- Não é o núcleo do chat de dúvidas, mas pode influenciar o comportamento da Lia de vendas e de redirecionamento.

### [script.js](script.js)

- Cria e controla botões flutuantes da Lia.
- Gerencia barra de botões, WhatsApp e painel flutuante.
- É um ponto sensível de risco porque mexe no layout e no comportamento do site.

### [index.html](index.html)

- Mantém a estrutura visível do site principal.
- Contém botões e modais relacionados a WhatsApp e compra.
- Também é um ponto sensível porque altera a interface do usuário.

## Riscos atuais antes da integração

Os principais riscos são:

- prompt muito grande e misturado com regras de negócio;
- regras de procedimento, segurança e vendas espalhadas no mesmo fluxo;
- risco de quebrar respostas que já funcionam;
- risco de alterar a Lia de compras ou botões sem querer;
- risco de mexer em layout e interface quando a etapa desejada é apenas integrar a base de conhecimento.

## Estratégia recomendada para integração futura

A forma mais segura de integrar a base é:

1. Criar uma função pequena para identificar procedimento a partir da pergunta.
2. Criar um mapa simples entre procedimento e arquivo da base.
3. Ler apenas o arquivo relevante da base.
4. Injetar esse conteúdo no prompt da IA sem expandir demais o contexto.
5. Manter os filtros de segurança já existentes.
6. Testar com [CASOS_TESTE.md](CASOS_TESTE.md).
7. Só promover para produção após passar nos testes.

## Arquivos que não devem ser mexidos sem autorização

Os arquivos abaixo são críticos e devem ser tratados com cuidado:

- [lia-duvidas-ia.html](lia-duvidas-ia.html)
- [lia-duvidas-ia.js](lia-duvidas-ia.js)
- [api/lia-duvidas-ia.js](api/lia-duvidas-ia.js)
- [lia-vendas.js](lia-vendas.js)
- [script.js](script.js)
- [index.html](index.html)
