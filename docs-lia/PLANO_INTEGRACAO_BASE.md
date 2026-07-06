# Plano de Integração da Base de Conhecimento da Lia

## Objetivo

Este documento define como a base de conhecimento organizada em docs-lia/base-procedimentos deve ser integrada futuramente à Lia, sem depender de prompt gigante e sem aumentar risco de erro.

## Situação atual

A base de conhecimento já foi organizada por procedimento.

Arquivos criados:

- ultraformer-mpt.md
- botox.md
- bioestimulador-diamond.md
- preenchedor-acido-hialuronico.md
- endymed.md
- scizer.md
- laser-lavieen.md
- microagulhamento-robotico.md
- laser-harmony.md
- depilacao-a-laser.md
- procedimentos-proibidos-e-substitutos.md

## Princípio principal

A Lia deve responder com base nos arquivos de conhecimento, respeitando regras invioláveis.

Ela não deve inventar procedimento, preço, disponibilidade, unidade, resultado ou indicação.

## Ordem de prioridade da resposta

Quando receber uma pergunta, a Lia deve seguir esta ordem:

1. Identificar se a pergunta envolve procedimento proibido, não ofertado ou substituto.
2. Identificar o procedimento principal relacionado.
3. Consultar a base do procedimento correspondente.
4. Responder de forma curta, humana e objetiva.
5. Só falar de preço se o paciente perguntar preço, valor, promoção, desconto ou compra.
6. Só direcionar para WhatsApp quando houver intenção de agendar, comprar, falar com atendimento humano ou confirmar unidade.

## Base de procedimentos proibidos

A base procedimentos-proibidos-e-substitutos.md deve ter prioridade sobre as demais quando a pergunta envolver:

- Sculptra
- PMMA
- Rinomodelação
- Preenchimento de glabela
- Fios de PDO
- Criolipólise
- Morpheus8
- Laser de CO2

## Procedimentos principais

Cada procedimento deve ter um arquivo próprio.

A Lia deve usar o arquivo mais relacionado à pergunta do paciente.

Exemplos:

Pergunta sobre Liftera, HIFU ou Ulthera:
usar ultraformer-mpt.md.

Pergunta sobre suor axilar:
usar botox.md.

Pergunta sobre Sculptra:
usar procedimentos-proibidos-e-substitutos.md e bioestimulador-diamond.md.

Pergunta sobre gordura localizada ou criolipólise:
usar procedimentos-proibidos-e-substitutos.md e scizer.md.

Pergunta sobre Morpheus8:
usar procedimentos-proibidos-e-substitutos.md e microagulhamento-robotico.md.

## O que a Lia não pode fazer

A Lia não pode:

- inventar procedimento;
- prometer resultado;
- diagnosticar;
- dizer que todos podem fazer;
- dizer que existe disponibilidade em unidade sem confirmação;
- prometer preço sem regra;
- dizer que Lavieen é igual CO2;
- dizer que Microagulhamento Robótico é igual Morpheus8;
- dizer que a CR Laser® faz Sculptra;
- recomendar PMMA;
- recomendar preenchimento de glabela;
- recomendar rinomodelação;
- recomendar criolipólise como procedimento da CR Laser®.

## Estratégia de integração futura

A integração ao código deve ser feita em etapas pequenas.

### Etapa 1

Criar uma função de identificação de procedimento pela pergunta do paciente.

### Etapa 2

Criar um carregador simples da base correspondente ao procedimento.

### Etapa 3

Enviar para a IA apenas a base relevante, e não todos os arquivos ao mesmo tempo.

### Etapa 4

Manter filtro de segurança na saída da Lia.

### Etapa 5

Rodar CASOS_TESTE.md antes de qualquer promoção para produção.

## Regra de segurança

Nenhum código deve ser alterado sem backup e sem commit limpo antes.

Toda mudança de código deve ser pequena, testável e reversível.

## Critério de sucesso

A integração será considerada pronta quando a Lia:

- reconhecer os principais sinônimos;
- responder corretamente perguntas básicas;
- bloquear procedimentos não ofertados;
- não inventar disponibilidade;
- não abrir finais desnecessários;
- passar nos casos de teste definidos em CASOS_TESTE.md.
