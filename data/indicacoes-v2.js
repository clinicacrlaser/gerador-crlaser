// Blocos de indicação de tratamento por problema relatado pelo cliente.
// A ordem importa: blocos mais específicos (flacidez_corpo) antes dos mais genéricos (flacidez_rosto).
export const indicacoes = [
  {
    problema: 'flacidez_corpo',
    gatilhos: [
      'flacidez no corpo',
      'flacidez corporal',
      'corpo flacido',
      'flacidez na perna',
      'flacidez na barriga',
      'flacidez no braco',
      'pele flacida no corpo',
      'flacida no corpo',
      'flacido no corpo',
      'pele mole no corpo'
    ],
    resposta: 'Para flacidez corporal usamos bastante Endymed 😊\n\nEle estimula colágeno e ajuda a melhorar firmeza e textura da pele.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'flacidez_rosto',
    gatilhos: [
      // frase completa
      'tenho flacidez no rosto',
      'flacidez no rosto',
      'rosto com flacidez',
      'pele flacida no rosto',
      'rosto flacido',
      'flacidez facial',
      'tenho flacidez',
      'estou com flacidez',
      // palavras-chave isoladas (capturam "tá flácida", "estou flácido" etc.)
      'flacidez',
      'flacida',
      'flacido',
      // pele caída / solta
      'pele caiu',
      'pele caida',
      'pele mole',
      'pele frouxa',
      'frouxa',
      'rosto caido',
      'pele esta caindo',
      // firmeza
      'perdi firmeza',
      'sem firmeza',
      'perdi elasticidade',
      // emagrecimento
      'depois de emagrecer',
      'depois de dieta',
      'depois de usar mounjaro',
      'apos emagrecimento',
      'emagreci e fiquei',
      'emagreci',
      'mounjaro'
    ],
    resposta: 'Depende um pouco do seu tipo de rosto 😊\n\n👉 Se for uma flacidez com mais volume, o Ultraformer MPT costuma ser uma ótima opção\n👉 Se for uma flacidez com perda de estrutura, o Bioestimulador funciona muito bem\n\nEm muitos casos, combinar os dois é o ideal.\n\nSe quiser, posso te orientar melhor para o seu caso 😉'
  },
  {
    problema: 'rugas',
    gatilhos: [
      'tenho rugas',
      'muitas rugas',
      'rugas no rosto',
      'linhas de expressao',
      'linha de expressao',
      'linhas no rosto',
      'linhas finas'
    ],
    resposta: 'Para linhas de expressão, normalmente indicamos aplicação facial 😊\n\nAjuda a suavizar as rugas e deixar o rosto mais descansado.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'gordura',
    gatilhos: [
      'gordura localizada',
      'gordura no abdomen',
      'gordura na barriga',
      'gordura nas costas',
      'gordura nos flancos',
      'gordura no culote'
    ],
    resposta: 'Para gordura localizada, o Ultraformer MPT costuma ter um resultado muito interessante 😊\n\nAjuda a reduzir e melhorar o contorno.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'papada',
    gatilhos: [
      'tenho papada',
      'estou com papada',
      'papada demais',
      'muita papada',
      'papada grande',
      'papada pronunciada'
    ],
    resposta: 'Depende do tipo de papada 😊\n\n👉 Se for gordura, o Ultraformer MPT costuma ser o mais indicado\n👉 Se for flacidez, podemos usar Bioestimulador ou Endymed\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'celulite',
    gatilhos: [
      'tenho celulite',
      'estou com celulite',
      'celulite',
      'muita celulite'
    ],
    resposta: 'Para celulite, usamos bastante Endymed 😊\n\nAjuda na textura da pele e melhora o aspecto da região.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'perda_volume',
    gatilhos: [
      'perda de volume',
      'perdi volume',
      'rosto murcho',
      'rosto esta murcho',
      'meu rosto esta murcho',
      'rosto murchou',
      'rosto sem volume',
      'rosto afundou',
      'bochecha murcha',
      'bochecha afundou',
      'perdi colagem',
      'perdi colageno'
    ],
    resposta: 'Quando há perda de volume, o Bioestimulador costuma ser uma ótima opção 😊\n\nEle ajuda a recuperar a estrutura e melhorar a firmeza da pele.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'manchas',
    gatilhos: [
      'manchas no rosto',
      'pele manchada',
      'tenho manchas',
      'manchas na pele',
      'mancha no rosto',
      'manchas na face',
      'rosto manchado'
    ],
    resposta: 'Para manchas, normalmente usamos tecnologias como laser 😊\n\nMas o ideal é avaliar melhor o tipo da sua pele para indicar com mais precisão.\n\nSe quiser, posso te orientar melhor para o seu caso 😊'
  },
  {
    problema: 'vago',
    gatilhos: [
      'quero melhorar meu rosto',
      'quero melhorar minha pele',
      'quero tratar meu rosto',
      'quero tratar minha pele',
      'o que posso fazer para meu rosto',
      'o que posso fazer para minha pele',
      'quero me tratar',
      'quero cuidar do meu rosto',
      'quero cuidar da minha pele'
    ],
    resposta: 'O que mais te incomoda hoje? 😊\n\nFlacidez, rugas, manchas ou algo mais específico?'
  }
];
