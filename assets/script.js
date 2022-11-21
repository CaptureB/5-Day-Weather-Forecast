$(document).ready(function () {

    //Making Variables, API key for Open Weather//

    const APIkey = "0a71ef47646bdf99202bf67a17049362"
    let city = $("h2#city");
    let day = $("h3#day");
    let temp = $("span#temprature");
    let humid = $("span#humidty");
    let windSpeed = $("span#wind");
    let listCity = $("div.listCity");
    let imgWeather = $("img#weather-icon");

    let searchCity = $("#search-city");

    let previousCity = [];

    function loadCity() {
        let savedCity = JSON.parse(localStorage.getItem("previousCity"));

        if (savedCity) {
            previousCity = savedCity;
        }
    }

    function savedCity () {
        localStorage.setItem("previousCity", JSON.stringify(previousCity));
    }

    function URLFromInputs(city) {
        if (city) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        }
    }

    function URLFromId(id) {
        return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
    }

    function showCities(previousCity) {
        listCity.empty();
        previousCity.splice(5);
        var selectCities = [...previousCity];
        selectCities.sort(compare);
        selectCities.forEach(function (location){
            var divCity = $('<div>').addClass('col-12 city');
            var divBtn = $('<button>').addClass('btn city-btn').text(location.city);
            divCity.append(divBtn);
            listCity.append(divCity);
        });
    
    function getWeather(queryURL) {
        $.ajax({
            URL: queryURL, method: "GET"
        }).then(function (response) {
            var city = response.name;
            var id =response.id;

            if (previousCity[0]) {
                previousCity = $grep(previousCity, function (savedCity){
                    return id !== savedCity.id;
                })
            }

            previousCity.unshift({ city, id});
            savedCity();
            showCities(previousCity);


            city.text(response.name);
            var formatDate = moment.unix(response.dt).format('L');
            day.text(formatDate);
            var imgWeather = response.weather[0].icon;
            imgWeather.attr('src', `http://openweathermap.org/img/wn/${weatherIcon}.png`).attr('alt', response.weather[0].description);
            temp.html(((response.main.temp - 273.15))) * 1.8 + 32).toFixed(1));
            humid.text(response.main.humid);
            windSpeed.text((response.wind.speed * 2.237)).toFixed(1);

            con


        })
    }
    }
});
