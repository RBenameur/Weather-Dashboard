var currentTime = moment().format('(DD/MM/YYYY)');

var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var baseURL = 'https://api.openweathermap.org/data/2.5/';

var currentURL = baseURL + `weather?&appid=${apiKey}&units=metric&`;

var forecastURL = baseURL + `forecast?&appid=${apiKey}&units=metric&`;

//var city = 'London';

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function fetchForecastWeather(lon, lat) {   
    $.get(forecastURL + `lat=${lat}&lon=${lon}`).then(function(data) {
        var forecastArr = data.list;

        for (var index in forecastArr) {

            var dateTxt = forecastArr[index].dt_txt;

            var isNoon = dateTxt.includes('12:');

            //console.log(isNoon)

            if(isNoon) {
                console.log(forecastArr[index]);

            };
            
        };

        //data.list;
    });

}
function fetchCurrentWeather(search) {
    $.get(currentURL + `q=${search}`).then(function(data) {
        //console.log(data);
        
        var main = data.main;
        var convertedWindSpd = data.wind.speed * 3.6;

        $('#today').html(`
        <h3 class="mt-1 h3">${data.name} ${currentTime} <span>${data.weather[0].icon}</span></h3>
        <p>Temp: ${main.temp}&#8451;</p>
        <p>Wind: ${convertedWindSpd.toFixed(2)} KPH</p>
        <p>Humidity: ${main.humidity} %</p>
        `);

        var coord = data.coord;

        fetchForecastWeather(coord.lon, coord.lat);
    });
};

// function when search button is clicked
function searchBtnClicked(event) {
    
    event.preventDefault();
    //console.log('clicked');

    var searchInput = $('#search-input');

    var searchVal = searchInput.val().toLowerCase();

    //console.log(searchVal);

    if(searchVal) {
        fetchCurrentWeather(searchVal);

        searchInput.val('');
    };

}

function init() {

    $('#search-button').on('click', searchBtnClicked);

};

init();