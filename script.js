var apiKey = '87b24c5018ab113f42b86c0bdc18e42a' ;

var city = 'London';

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


function fetchCurrentWeather(search) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`).then(function(data) {
        
        console.log(data);

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