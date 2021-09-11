const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
		total_value: {
			type: Number,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

DealSchema.index({
    'date': 1
});

module.exports = mongoose.model('Deal', DealSchema);
