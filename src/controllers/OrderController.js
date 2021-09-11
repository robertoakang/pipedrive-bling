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
		clientName,
		sellId,
		productDesc,
		priceProduct,
		priceTranche
	) {
		try {			
			var requestBody = {
				xml: insertNewOrder (
					clientName,
					sellId,
					productDesc,
					priceProduct,
					priceTranche
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
