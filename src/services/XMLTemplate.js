const insertNewOrder = (
  client_name,
  sell_id,
  product_desc,
  price_product,
  price_tranche
) =>
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<pedido>' +
  '<cliente>' +
  `<nome>${client_name}</nome>` +
  '</cliente>' +
  '<itens>' +
  '<item>' +
  `<codigo>${sell_id}</codigo>` +
  `<descricao>${product_desc}</descricao>` +
  '<un>Un</un>' +
  '<qtde>1</qtde>' +
  `<vlr_unit>${price_product}</vlr_unit>` +
  '</item>' +
  '</itens>' +
  '<parcelas>' +
  '<parcela>' +
  `<vlr>${price_tranche}</vlr>` +
  '</parcela>' +
  '</parcelas>' +
  '</pedido>';

module.exports = insertNewOrder;
