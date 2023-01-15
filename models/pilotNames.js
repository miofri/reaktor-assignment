const mongoose = require('mongoose');

const pilotSchema = new mongoose.Schema(
	{
		pilotId: String,
		firstName: String,
		lastName: String,
		phoneNumber: String,
		email: String,
		expireAt: {
			type: Date,
			default: Date.now
		}
	}, {
	timestamps: {
		createdAt: true
	},
}
)

pilotSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 600 });

const Pilot = mongoose.model('Pilot', pilotSchema);

module.exports = Pilot;
