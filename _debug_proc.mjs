import { normalizarProcedimentoBase, resolverProcedimentoPorBase, gerarRespostaOfertaCampanha } from './api/lia-v2.js';
const base = normalizarProcedimentoBase('botox');
console.log('base:', base);
const canonical = resolverProcedimentoPorBase(base, 'botox');
console.log('canonical:', canonical);
if (canonical) {
  const link = gerarRespostaOfertaCampanha(canonical, 'campinas', 'texto');
  console.log('link:', link ? 'FOUND: ' + canonical : 'null');
}
