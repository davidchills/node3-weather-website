//console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const location = search.value
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (!data.error) {
				//console.log(data)
				// console.log("Forcast: " + data.forecast)
				// console.log("Temperature: " +data.temperature)
				// console.log("Feels Like: " + data.feelslike)
				// console.log("Address: " + data.address)
				// console.log("Location: " + data.location)
				messageOne.textContent = data.location
				const forcastMessage = data.forecast + ', ' + data.temperature + ' degrees, feels like ' + data.feelslike
				messageTwo.textContent = forcastMessage
			}
			else { 
				messageOne.textContent = data.error 
			}
		})
	})
})