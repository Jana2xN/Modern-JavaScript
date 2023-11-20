// Check if script is read by the browser!
console.log("script is running")
// import data from different files
import WMO_CODES from "./wmo_codes.js";
import API from "./config.js";

// Getting my button element
const button = document.querySelector('#submit-search');
// Getting my input field element
const inputField = document.querySelector('#cityName');
//getting my container element
const cityNameContainer = document.querySelector('.city-info')
// Weekdays listed in the order used by the Date object in javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// In case I want to switch to a different format:
const weekdays2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Check if weekdays are correctly displayed
console.log(weekdays);
// check if API is correctly imported
console.log(API)

// add eventlistener to input field
function fetchWeatherData(city) {
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + city + "&days=7&aqi=no&alerts=no")
        .then(response => response.json())
        .then(data => processWeatherData(data))
        .catch(error => handleAPIError());
}

// add eventlistener to button
button.addEventListener('click', function() {
    const theNameOfTheCity = document.querySelector("#cityName").value;
    console.log("clicked")
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
            console.log("check if code stops")
        } else {
            const container = document.querySelector(".container");
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            };

            container.innerHTML = ""
            // container.children.forEach(child => {
            //     container.remove(child);
            // })
            
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;

            for(let i= 0; i < 5; i++) {
                const container = document.querySelector('.container');

                const date = new Date()
                // console.log(weekdays[(date.getDay() + i) % 7])
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
            
                // Create the elements with Data
                const card = document.createElement('div');
                card.classList.add("card");
            
                if (i === 0) card.classList.add("main-card");
            
                container.appendChild(card);
            
                const imageBox = document.createElement('div');
                imageBox.classList.add("imgBx");
                card.appendChild(imageBox);
            
                const cardImg = document.createElement('img');
                cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                imageBox.appendChild(cardImg);
                
                const contentBox = document.createElement("div");
                contentBox.classList.add("contentBx");
                card.appendChild(contentBox);
            
                const cardHeader = document.createElement("h2");
                cardHeader.innerHTML = dayOfTheWeek;
                contentBox.appendChild(cardHeader);
            
                console.log(data.forecast.forecastday[i].day.condition.text);
                const tempDescription = document.createElement("h4");
                tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                contentBox.appendChild(tempDescription);
            
                const currentTempBox = document.createElement("div");
                currentTempBox.classList.add("color");
                contentBox.appendChild(currentTempBox)
            
                const currentTempHeader = document.createElement("h3");
                currentTempHeader.innerHTML = "Temp:"
                currentTempBox.appendChild(currentTempHeader);
            
                const currentTemp = document.createElement("span");
                currentTemp.classList.add("current-temp");

                // OLD structure from different API
                // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                // if(i === 0) averageTemp = result.current.temperature_2m;
                currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentTemp);
            
                const minMaxTemperatures = document.createElement("div");
                minMaxTemperatures.classList.add("details");
                contentBox.appendChild(minMaxTemperatures);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMaxTemperatures.appendChild(minMaxTempHeader);
            
                const minTemp = document.createElement("span");
                minTemp.classList.add("min-temp")
                minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMaxTemperatures.appendChild(minTemp);
            
                const maxTemp = document.createElement("span");
                maxTemp.classList.add("max-temp")
                maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMaxTemperatures.appendChild(maxTemp);
            }
        }
    })
    .catch(err => {
        //not working
        // alert("Hey are you sure you are not holding up your map upside down?")
    })
})

// This is a weather web application made for educational purposes. Please do not commercialize this project in any way whatsoever.
// Made by a BeCode technical coach whom had a lot of fun making "bad code", and improved by the very learners of this class.
// I want to mention that this is a fully working app, but can be optimized by: 
// cleaning up, 
// refactoring the code, 
// renaming the variables, 
// removing redundant code,
// removing unnecessary comments,
// storing information into variables for easier and more readable use 