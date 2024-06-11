const apiKey ='4840b059127797b29d0d835ce79cc29d';
const apiUrl ='https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const inCelsius = document.getElementById('incelsius')

searchButton.addEventListener('click', ()=>{
    const location = locationInput.value;
    locationInput.value = ''
    if (location){
        let units = 'imperial'
        if (inCelsius.checked) {
            units = 'metric';
        }
        fetchWeather(location, units);
    }
})

function fetchWeather(location, units){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${units}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `Current temp: ${Math.round(data.main.temp)}°${units==='metric' ? 'C' : 'F'}`;
            descriptionElement.textContent = "Current weather: "+data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        })
}