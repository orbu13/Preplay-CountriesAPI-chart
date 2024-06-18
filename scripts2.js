const weatherApiKey = "d7a3d1e78f67d26675cc6ce8d41b7167"
const countriesTable = document.querySelector("#countriesTable")
const countriesContainer = document.querySelector(".countriesContainer")
const weatherModel = document.querySelector(".weatherModel")
const weatherModelContent = document.querySelector(".weatherModelContent")

function getWeather(e){ 
    console.log(e.target.id);
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.id}&appid=${weatherApiKey}`

    fetch(apiURL)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        weatherModelContent.innerHTML = ""

        weatherModel.style.display = "block"

        const weatherCityName = document.createElement("h2")
        const weatherCityNameElement = data.name
        weatherCityName.innerText = weatherCityNameElement 
        weatherModelContent.appendChild(weatherCityName)

        const weatherDescription = document.createElement("p")
        const weatherDescriptionElement = data.weather[0].description
        weatherDescription.innerText = weatherDescriptionElement
        weatherModelContent.appendChild(weatherDescription)

        const weatherHumidity = document.createElement("p")
        const weatherHumidityElement = data.main.humidity
        weatherHumidity.innerText = "humidity: " + weatherHumidityElement + "%"
        weatherModelContent.appendChild(weatherHumidity)

        const weatherTemp = document.createElement("p")
        const weatherTempElement = data.main.temp
        weatherTemp.innerText = "temp: " + weatherTempElement + "℉"
        weatherModelContent.appendChild(weatherTemp)

        const weatherWind = document.createElement("p")
        const weatherWindElement = data.wind.speed
        weatherWind.innerText = "speed: " + weatherWindElement + " " + "miles per hour"
        weatherModelContent.appendChild(weatherWind)

        const weatherImg = document.createElement("img")
        const weatherImgElement = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherImg.src = weatherImgElement
        weatherModelContent.appendChild(weatherImg)
    })
}

function closeModel(event){
    event.target.parentElement.style.display = "none"
    console.log(event.target);
}

fetch("https://restcountries.com/v3.1/all")
.then(function(res){
    console.log(res);
    return res.json()
})
.then(function(data){
    console.log(data);
    data.forEach(element => {
        const countryRow = document.createElement("tr")
        const countryName = document.createElement("td")
        countryName.innerText = element.name.official

        const countryCapitalElement = document.createElement("td")
        countryCapitalElement.classList.add("countryCapitalElement")
        if(element.capital != undefined){
            const capitalButton = document.createElement("button")
            capitalButton.innerText = "check weather"
            capitalButton.classList.add("capitalButton")
            capitalButton.id = element.capital[0]
            capitalButton.addEventListener("click", getWeather)
            const countryCapital = element.capital[0]
            countryCapitalElement.innerText = countryCapital
            countryCapitalElement.appendChild(capitalButton)
        }

        const countryCoatOfArmsElementContainer = document.createElement("td")
        countryCoatOfArmsElementContainer.classList.add("countryCoatOfArmsElementContainer")
        const countryCoatOfArmsElement = document.createElement("img")
        if(element.coatOfArms.svg != undefined){
            const countryCoatOfArms = element.coatOfArms.svg
            countryCoatOfArmsElement.src = countryCoatOfArms
            countryCoatOfArmsElementContainer.appendChild(countryCoatOfArmsElement)
        } 

        const countryContinents = document.createElement("td")
        const countryCurrenciesElement = element.continents[0]
        countryContinents.innerText = countryCurrenciesElement

        const countryCurrencies = document.createElement("td")
        for(let key in element.currencies){
            // console.log(key);
            // console.log(element.currencies[key]);
            const countryCurrenciesElement = element.currencies[key].name + " " + element.currencies[key].symbol
            countryCurrencies.innerText = countryCurrenciesElement
        }

        const countryFlag = document.createElement("td")
        const countryFlagElement = element.flag
        countryFlag.innerText = countryFlagElement

        const countryLanguages = document.createElement("td")
        for(let key in element.languages){
            const countryLanguagesElement = element.languages[key]
            countryLanguages.innerText = countryLanguagesElement
        }

        const countryPopulation = document.createElement("td")
        const countryPopulationElement = element.population
        countryPopulation.innerText = countryPopulationElement
        
        const countryStartOfWeek = document.createElement("td")
        const countryStartOfWeekElement = element.startOfWeek
        countryStartOfWeek.innerText = countryStartOfWeekElement



        countriesTable.appendChild(countryRow)
        countryRow.appendChild(countryName)
        countryRow.appendChild(countryCapitalElement)
        countryRow.appendChild(countryCoatOfArmsElementContainer)
        countryRow.appendChild(countryContinents)
        countryRow.appendChild(countryCurrencies)
        countryRow.appendChild(countryFlag)
        countryRow.appendChild(countryLanguages)
        countryRow.appendChild(countryPopulation)
        countryRow.appendChild(countryStartOfWeek)
    });
})