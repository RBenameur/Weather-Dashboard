var currentTime = moment().format('(DD/MM/YYYY)');

var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var baseURL = 'https://api.openweathermap.org/data/2.5/';

var currentURL = baseURL + `weather?&appid=${apiKey}&units=metric&`;

var forecastURL = baseURL + `forecast?&appid=${apiKey}&units=metric&`;

// function to populate elements from current and 5 day forecast where they are the same
function populateEls (obj) {

    var main = obj.main;

    var convertedWindSpd = obj.wind.speed * 3.6;

    return (`
    <p>Temp: ${main.temp}&#8451;</p>
    <p>Wind: ${convertedWindSpd.toFixed(2)} KPH</p>
    <p>Humidity: ${main.humidity} %</p>
    `)
};

//function to return img element with source to icon for weather for specific day
function outputImg (data) {

    return `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}"></img>`

};

// function getting 5 day forecast data
function fetchForecastWeather(lon, lat) {   
    $.get(forecastURL + `lat=${lat}&lon=${lon}`).then(function(data) {
        
        $('#forecast').removeClass('invisible')

        var count = 1;

        var cardContainer =  $('.card-container');

        cardContainer.html('');

        var forecastArr = data.list;

        for (var index in forecastArr) {

            var dateTxt = forecastArr[index].dt_txt;

            var isNoon = dateTxt.includes('12:');

            if(isNoon) {

                var futureDate = moment().add(count, 'days').format('DD/MM/YYYY');

                var currentItem = forecastArr[index];

                cardContainer.append(`
                <div class="card">
                  <div class="card-body">
                    <h5 class="mt-1 h5">${futureDate}</h5>
                    ${outputImg(currentItem)}
                    ${populateEls(currentItem)}
                  </div>
                </div>
                `);

                count++;
            };
            
        };

    });

};

//function getting data for current date
function fetchCurrentWeather(search) {
    $.get(currentURL + `q=${search}`).then(function(data) {

        $('#today').html(`
        <h3 class="mt-1 h3">${data.name} ${currentTime} ${outputImg(data)}</h3>
        ${populateEls(data)}
        `).removeClass('invisible');

        var coord = data.coord;

        fetchForecastWeather(coord.lon, coord.lat);
    });
};

// function when search button is clicked
function searchBtnClicked(event) {
    
    event.preventDefault();

    var searchInput = $('#search-input');

    var searchVal = searchInput.val().toLowerCase();

    if(searchVal) {
        fetchCurrentWeather(searchVal);

        var returnedLocalStorage = getLocalStorage();

        returnedLocalStorage[searchVal] = searchVal;

        localStorage.setItem('weather-history', JSON.stringify(returnedLocalStorage));

        searchInput.val('');
    };

};
 
// function to return search history from local storage 
function getLocalStorage() {

    return JSON.parse(localStorage.getItem('weather-history')) || {};

};

function init() {
    
    var historyEl = $('#history');
    
    historyEl.html('');

    var history = getLocalStorage();
    
    if(history) {

        for (var item in history) {

            //console.log(history[item]);

            historyEl.append(`
            <button class="historyBtn btn btn-secondary m-1">${history[item]}</button>
            `);

        };
    };

    $('.historyBtn').on('click', function (event) {
        //console.log(event.target.innerHTML)
        fetchCurrentWeather(event.target.innerHTML);

    });

    $('#search-button').on('click', searchBtnClicked);

};

init();