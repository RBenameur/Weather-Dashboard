var currentTime = moment().format('(DD/MM/YYYY)');

var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var baseURL = 'https://api.openweathermap.org/data/2.5/';

var currentURL = baseURL + `weather?&appid=${apiKey}&units=metric&`;

var forecastURL = baseURL + `forecast?&appid=${apiKey}&units=metric&`;

//var city = 'London';

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// function to populate elements from current and 5 day forecast where they are the same
function populateEls (obj) {

    var main = obj.main;

    var convertedWindSpd = obj.wind.speed * 3.6;

    return (`
    <p>Temp: ${main.temp}&#8451;</p>
    <p>Wind: ${convertedWindSpd.toFixed(2)} KPH</p>
    <p>Humidity: ${main.humidity} %</p>
    `)
}

// function getting 5 day forecast data
function fetchForecastWeather(lon, lat) {   
    $.get(forecastURL + `lat=${lat}&lon=${lon}`).then(function(data) {

        var count = 1;
        
        var cardContainer =  $('.card-container');

        cardContainer.html('');

        var forecastArr = data.list;

        for (var index in forecastArr) {

            var dateTxt = forecastArr[index].dt_txt;

            var isNoon = dateTxt.includes('12:');

            //console.log(isNoon)

            if(isNoon) {
                //console.log(forecastArr[index]);

                var futureDate = moment().add(count, 'days').format('DD/MM/YYYY');

                console.log(futureDate);
                cardContainer.append(`
                <div class="card">
                  <div class="card-body">
                    <h5 class="mt-1 h5">${futureDate}</h5>
                    <div>ICON</div>
                    ${populateEls(forecastArr[index])}
                  </div>
                </div>
                `);

                count++;
            };
            
        };

        //data.list;
    });

};

//function getting data for current date
function fetchCurrentWeather(search) {
    $.get(currentURL + `q=${search}`).then(function(data) {
        //console.log(data);
        
        // var main = data.main;
        // var convertedWindSpd = data.wind.speed * 3.6;

        $('#today').html(`
        <h3 class="mt-1 h3">${data.name} ${currentTime} <span>${data.weather[0].icon}</span></h3>
        ${populateEls(data)}
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