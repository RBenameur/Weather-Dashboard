var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var city = 'London';

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


function fetchCurrentWeather() {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function(data) {
        
        console.log(data);

    });
};

function init() {

    fetchCurrentWeather();
};

init();