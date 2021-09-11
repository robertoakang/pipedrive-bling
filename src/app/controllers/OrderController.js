const BlingApi = require('@services/blingApi');
const insertNewOrder = require('@services/XMLTemplate');

class OrderController {
	// Get all orders requested
	async getOrder(req, res) {
		const { data } = await BlingApi.get("/pedidos/json");
		const { pedidos, erros } = data.retorno;
		if(erros) {
			res.status(500).json(erros);
		}

		res.status(200).json(pedidos);
	}

	// Insert a new order
	async insertOrder(
		client_name,
		sell_id,
		product_desc,
		price_product,
		price_tranche
	) {
		try {			
			var requestBody = {
				xml: insertNewOrder (
					client_name,
					sell_id,
					product_desc,
					price_product,
					price_tranche
				)
			};

			// Store new Order
			await BlingApi.post('/pedido/json', requestBody, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new OrderController();
