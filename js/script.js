var responseIntro = document.getElementById("responseIntro");
var responseData = document.getElementById("responseData");
var img = document.getElementById("img");
var inputCity = document.getElementById("inputCity");

function getResponse(url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(this.readyState === 4) {
            if(this.status === 200) {
                console.log(this.responseText);
                printData(this.responseText);
            }
        } 
    }

    xhr.open("GET", url, true);
    xhr.send();
}

function printData(response) {
    var jsResponse = JSON.parse(response);
    console.log(jsResponse);
    

    responseIntro.innerHTML = 
    `
    <p>City: ${jsResponse.name}</p>
    <p>Country: ${jsResponse.sys.country}</p>
    <p>Weather: ${jsResponse.weather[0].main}</p>
    <p>Description: ${jsResponse.weather[0].description}</p>
    `;

    responseData.innerHTML = 
    `
    <p>Temperature: ${(jsResponse.main.temp - 273.15).toFixed(2)} °C</p>
    <p>Max temperature: ${(jsResponse.main.temp_max - 273.15).toFixed(2)} °C</p>
    <p>Min temperature: ${(jsResponse.main.temp_min - 273.15).toFixed(2)} °C</p>
    <p>Feels like: ${(jsResponse.main.feels_like - 273.15).toFixed(2)} °C</p>
    <p>Pressure: ${jsResponse.main.pressure} hPa</p>
    <p>Humidity: ${jsResponse.main.humidity} %</p>
    <p>Wind speed: ${jsResponse.wind.speed} m/s</p>
    `;

    if(jsResponse.weather[0].main === "Thunderstorm") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/11d@2x.png">`;
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } else if (jsResponse.weather[0].main === "Drizzle") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/09d@2x.png">`;
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    } else if (jsResponse.weather[0].main === "Rain") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/10d@2x.png">`;
        document.body.style.backgroundImage = "url('images/shower_rain.jpg')";
    } else if(jsResponse.weather[0].main === "Snow") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/13d@2x.png">`;
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if (
        jsResponse.weather[0].main === "Mist" || 
        jsResponse.weather[0].main === "Smoke" || 
        jsResponse.weather[0].main === "Haze" || 
        jsResponse.weather[0].main === "Dust" ||
        jsResponse.weather[0].main === "Fog" ||
        jsResponse.weather[0].main === "Sand" ||
        jsResponse.weather[0].main === "Ash" ||
        jsResponse.weather[0].main === "Squall" ||
        jsResponse.weather[0].main === "Tornado") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/50d@2x.png">`;
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    } else if (jsResponse.weather[0].main === "Clear") {
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/01d@2x.png">`;
        document.body.style.backgroundImage = "url('images/clear_sky.jpg')";
    } else if (jsResponse.weather[0].main === "Clouds") {

        if(jsResponse.weather[0].description === "few clouds") {
            img.innerHTML = `<img src="http://openweathermap.org/img/wn/02d@2x.png">`;
            document.body.style.backgroundImage = "url('images/few_clouds.jpg')";
        } else if (jsResponse.weather[0].description === "scattered clouds") {
            img.innerHTML = `<img src="http://openweathermap.org/img/wn/03d@2x.png">`;
            document.body.style.backgroundImage = "url('images/scattered_clouds.jpg')";
        } else if (jsResponse.weather[0].description === "broken clouds") {
            img.innerHTML = `<img src="http://openweathermap.org/img/wn/04d@2x.png">`;
            document.body.style.backgroundImage = "url('images/broken_clouds.jpg')";
        } else if (jsResponse.weather[0].description === "overcast clouds") {
            img.innerHTML = `<img src="http://openweathermap.org/img/wn/04d@2x.png">`;
            document.body.style.backgroundImage = "url('images/overcast_clouds.jpg')";
        }
    }
}

function chooseCity() {
    getResponse('https://api.openweathermap.org/data/2.5/weather?q='+inputCity.value+'&appid=cb171f7a6418d871af72da048dd0e04a');
    console.log(inputCity.value);
    inputCity.value = "";
}








