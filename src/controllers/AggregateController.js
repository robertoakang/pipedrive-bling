const BlingApi = require('@services/blingApi'),
	  moment = require('moment');

const Deal = require('@source/database/models/Deal');

class AggregateController {
	async aggregate(req, res) {
		const now = moment().format('YYYY-MM-DD');
		const { data } = await BlingApi.get("/pedidos/json");
		const { pedidos, erros } = data.retorno;
		if(erros) {
			res.status(500).json(erros);
		}

		var total_value = 0;

		pedidos.forEach(order => {
			let { pedido: { data, totalvenda } } = order;
			// Transform value in int
			totalvenda = +totalvenda;

			// Check which order was requested today, if true sum total
			if (data === now) {
				total_value += totalvenda;
			}
		});

		// Check if was already saved
		const existsDeal = await Deal.findOne({
			date: now,
		});

		// If daily profit already saved, update it
		if (existsDeal) {
			const { _id } = existsDeal;
			const updateDoc = await Deal.findByIdAndUpdate(_id,
				{ total_value, date: now }, { new: true, }
			);
			return res.status(200).json(updateDoc);
		}

		// Save in MongoDb if not exists
		const savedDeal = await Deal.create({ total_value, date: now });
		return res.status(200).json(savedDeal);
	}

	async getAggregates(req, res) {
		const deals = await Deal.find({});
		return res.status(200).json(deals);
	}

	async getAggregateByDate(req, res) {
		let date = moment(`${req.params.date}`);
		if(!req.params.date || !date.isValid()) {
			res.status(400).json({
				success:false, 
				error:"Missing or invalid params - please try YYYY-MM-DD [date]"
			});
		}
		const deal = await Deal.findOne({ date: req.params.date });
		return res.status(200).json(deal);
	}
}

module.exports = new AggregateController();
