const request = require('request')

const forecast = (latitude, longitude, callback, ) => {
	const apiToken = '727a89d517040f69f736f1bb1a4ed8e4'
	const url = 'http://api.weatherstack.com/current?access_key=' + apiToken + '&query=' + longitude + ',' + latitude + '&units=f'

	request({ url, json: true }, (error, { body } = {}) => {	
		if (error) { callback('Unable to connect to weather service!', undefined) }
		else if (body.error) { callback('Unable to find location', undefined) }
		else {
			const { temperature, feelslike, humidity } = body.current
			callback(undefined, {
				description: body.current.weather_descriptions[0],
				temperature,
				feelslike,
				humidity
			})			
		}
	})
}

module.exports = forecast