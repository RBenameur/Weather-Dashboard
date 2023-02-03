var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var baseURL = 'https://api.openweathermap.org/data/2.5/';

var weatherURL = baseURL + `weather?&appid=${apiKey}&units=metric&q=`;

var forecastURL = baseURL + `forecast?&appid=${apiKey}&units=metric&`;

//var city = 'London';

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


function fetchCurrentWeather(search) {
    $.get(weatherURL + search).then(function(data) {
        console.log(data);
        
        var main = data.main;
        var convertedWindSpd = data.wind.speed * 3.6;
        var currentTime = moment().format('(DD/MM/YYYY)');


        $('#today').html(`
        <h3 class="mt-1 h3">${data.name} ${currentTime} <span>${data.weather[0].icon}</span></h3>
        <p>Temp: ${main.temp}&#8451;</p>
        <p>${convertedWindSpd.toFixed(2)} KPH</p>
        <p>${main.humidity} %</p>
        `);


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