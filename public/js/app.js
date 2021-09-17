const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const fromGeoButton = document.querySelector('#weather-from-geolocation')
const searchButton = document.querySelector('#search-button')

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const location = search.value
	searchButton.setAttribute('disabled', 'disabled')
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (!data.error) {
				messageOne.textContent = data.location
				const forcastMessage = data.forecast + ', ' + data.temperature + ' degrees, feels like ' + data.feelslike + ' with ' + data.humidity + '% humidity'
				messageTwo.textContent = forcastMessage
			}
			else { messageOne.textContent = data.error }
			searchButton.removeAttribute('disabled')
		})
	})
})

fromGeoButton.addEventListener('click', (event) => {
	event.preventDefault()
	if (!navigator.geolocation) { return alert('Geolocation is not supported by your browser.') }
	fromGeoButton.setAttribute('disabled', 'disabled')
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''	
	navigator.geolocation.getCurrentPosition((position) => {
		fetch('/geoweather?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude).then((response) => {
			response.json().then((data) => {
				if (!data.error) {
					messageOne.textContent = 'Weather at Your Location'
					const forcastMessage = data.forecast + ', ' + data.temperature + ' degrees, feels like ' + data.feelslike + ' with ' + data.humidity + '% humidity'
					messageTwo.textContent = forcastMessage
				}
				else { messageOne.textContent = data.error }
				fromGeoButton.removeAttribute('disabled')
			})
		})
	})
})
