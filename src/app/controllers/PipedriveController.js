const PipeDriveApi = require('@services/pipedriveApi');
const OrderController = require('./OrderController');
let orders = [];

class PipedriveController {
	// Lists all business
	async listAllBusiness(req, res) {
		try {
			const { data } = await PipeDriveApi.get("/deals");
			let business = [];

			if (data.data) {
				data.data.forEach(client => {
					const { title, value, status, won_time, person_id: { name } } = client;
					business.push({ title, value, status, won_time, name });
				});
			}

			return res.status(200).json(business);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	// Get all business with WON status and set new Bling order
	async execute(req, res) {
		try {			
			const { data } = await PipeDriveApi.get("/deals", { status: "won" });

			if (data.data) {
				data.data.forEach(async client => {
					const { title, value, person_id: { name } } = client;

					var client_name = name,
						sell_id = Math.ceil(Math.random() * (1000 - 1) + 1),
						product_desc = title,
						price_product = value,
						price_tranche = value;

					// Create a new order in Bling
					await OrderController.insertOrder(
						client_name,
						sell_id,
						product_desc,
						price_product,
						price_tranche
					);
				});
			}

			return res.status(200).json({ success: true });
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new PipedriveController();
