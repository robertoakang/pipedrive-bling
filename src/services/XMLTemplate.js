const insertNewOrder = (
  clientName,
  sellId,
  productDesc,
  priceProduct,
  priceTranche
) =>
  '<?xml version="1.0" encoding="UTF-8"?>' +
  "<pedido>" +
  "<cliente>" +
  `<nome>${clientName}</nome>` +
  "</cliente>" +
  "<itens>" +
  "<item>" +
  `<codigo>${sellId}</codigo>` +
  `<descricao>${productDesc}</descricao>` +
  "<un>Un</un>" +
  "<qtde>1</qtde>" +
  `<vlr_unit>${priceProduct}</vlr_unit>` +
  "</item>" +
  "</itens>" +
  "<parcelas>" +
  "<parcela>" +
  `<vlr>${priceTranche}</vlr>` +
  "</parcela>" +
  "</parcelas>" +
  "</pedido>";

module.exports = insertNewOrder;
