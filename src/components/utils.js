
export const COTACAO_USD_BRL = 5.00;

// Formata valores em reais
export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor) || 0);
}

// Converte o preço recebido em dólar pela API para reais.
// Cotação demonstrativa: altere COTACAO_USD_BRL quando desejar.
export function converterParaReal(valorEmDolar) {
  return Number((Number(valorEmDolar) * COTACAO_USD_BRL).toFixed(2));
}

// Traduz categorias da Fake Store API
export function nomeCategoria(categoria) {
  const categorias = {
    "jewelery": "Joias",
    "electronics": "Eletrônicos",
    "men's clothing": "Moda masculina",
    "women's clothing": "Moda feminina",
    "anel": "Anel",
    "brincos": "Brincos",
    "colar": "Colar",
    "pulseira": "Pulseira",
  };

  return categorias[categoria] || categoria;
}
