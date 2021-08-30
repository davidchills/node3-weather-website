const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const { request } = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve, so any html pages in the public directory can be served.
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Dave Hills'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Dave Hills'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		message: 'This is the help page.',
		name: 'Dave Hills'
	})
})

//app.get('/', (req, res) => { res.send('<h1>Weather</h1>') })
//app.get('/help', (reg, res) => { res.send([{ name: 'Andrew', age: 27 },{ name: 'Sara', age: 22 }]) })
//app.get('/about', (reg, res) => { res.send('<h1>About</h1>') })

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You need to provide and address!'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}
			res.send({
				forecast: forecastData.description,
				temperature: forecastData.temperature,
				feelslike: forecastData.feelslike,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a seach term'
		})
	}
	console.log(req.query)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Help article not found.',
		name: 'Dave Hills'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Page not found.',
		name: 'Dave Hills'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
