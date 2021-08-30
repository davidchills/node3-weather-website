const request = require('request')

const forecast = (latitude, longitude, callback, ) => {
	const apiToken = '727a89d517040f69f736f1bb1a4ed8e4'
	const url = 'http://api.weatherstack.com/current?access_key=' + apiToken + '&query=' + longitude + ',' + latitude + '&units=f'

	//request({ url: url, json: true }, (error, response) => {
	request({ url, json: true }, (error, { body } = {}) => {	
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		}
		else if (body.error) {
			callback('Unable to find location', undefined)
		}
		else {
			const { temperature, feelslike } = body.current
			// callback(undefined, {
			// 	description: body.current.weather_descriptions[0],
			// 	temperature: body.current.temperature,
			// 	feelslike: body.current.feelslike
			// })
			callback(undefined, {
				description: body.current.weather_descriptions[0],
				temperature,
				feelslike
				//forcast: body.current.weather_descriptions[0] + ', ' + temperature + ' feels like ' + feelslike
			})			
		}
	})

}

module.exports = forecast