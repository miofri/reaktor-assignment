require('dotenv').config()

const PORT = process.env.PORT || 8080;
const MONGOURI = process.env.URL
module.exports = {
	PORT,
	MONGOURI
}
