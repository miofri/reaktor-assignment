const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)

})
// Finding if a point is inside a circle: https://math.stackexchange.com/questions/198764/how-to-know-if-a-point-is-inside-a-circle
