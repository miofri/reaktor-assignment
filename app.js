const express = require('express');
const app = express();
const cors = require('cors');
const pilotRouter = require('./controllers/pilot')
const { request, response } = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config')

mongoose.connect(config.MONGOURI)
	.then(() => { return console.log('Connected to MongoDB') })
	.catch(error => console.log('MongoDB error: ', error)
	)

app.use(express.static('build'))

app.use(express.json());
app.use(cors());
app.use(pilotRouter)

module.exports = app
