import { Queue } from './queue.mjs';
import {apiKey} from './config.js';

const apiUrl ='https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const locationFoundElement = document.getElementById('locationFound')
const inCelsius = document.getElementById('incelsius')
var weatherIcon = document.getElementById('weathericon')

const recentSearch = document.getElementById('recentSearch');
const searchHistory = new Queue();

locationInput.addEventListener('focus', ()=>{
    displaySearchHistory();
    recentSearch.style.display = "block";
})

locationInput.addEventListener('blur', ()=>{
    setTimeout(() => {
        recentSearch.style.display = 'none';
    }, 100);
})

const displaySearchHistory = () => {
    recentSearch.innerHTML = '<b> Recent Searches </b>';
    for (let i = searchHistory.length - 1; i>=0; i--){
        const searchItem = document.createElement('div');
        const search = searchHistory.elements[i];
        searchItem.className = 'search-item';
        searchItem.textContent = search;
        searchItem.addEventListener('click', () => {
            locationInput.value = search
            recentSearch.style.display = 'none';
        })
        recentSearch.appendChild(searchItem);
    }
}


searchButton.addEventListener('click', ()=>{
    const location = locationInput.value;
    if (locationInput.value){
        let units = 'imperial'
        if (inCelsius.checked) {
            units = 'metric';
        }
        fetchWeather(location, units);
    }
    locationInput.value = ''
})

function fetchWeather(location, units){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${units}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationFoundElement.textContent = ''
            if (data.name){
            locationElement.textContent = data.name;
            }
            temperatureElement.textContent = `Current temp: ${Math.round(data.main.temp)}°${units==='metric' ? 'C' : 'F'}`;
            descriptionElement.textContent = "Current weather: "+data.weather[0].description;
            const thing = Math.trunc(data.weather[0].id / 100);
            if (thing == 5 || thing == 3){
                weatherIcon.src = 'images/rain.png'
            }
            else if (thing == 6){
                weatherIcon.src = 'images/snow.png'
            }
            else if (thing == 2){
                weatherIcon.src = 'images/thunder.png'
            }
            else if (data.weather[0].id > 803){
                weatherIcon.src = 'images/cloudy.png'
            }
            else if (data.weather[0].id == 800){
                weatherIcon.src = 'images/sunny.png'
            }
            else if (thing == 8){
                weatherIcon.src = 'images/partly cloudy.png'
            }

            if (searchHistory.length > 5){
                searchHistory.dequeue() 
            }
            searchHistory.enqueue(data.name)
            
        })
        .catch(error => {
            locationFoundElement.textContent = `${location} not found.`
            console.error('Error fetching weather data:', error);
        })
}