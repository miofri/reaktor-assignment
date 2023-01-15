const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema(
	{
		serialNumber: String,
		model: String,
		manufacturer: String,
		mac: String,
		ipv4: String,
		ipv6: String,
		firmware: String,
		positionY: String,
		positionX: String,
		altitude: String,
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

droneSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 600 });

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
