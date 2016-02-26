cityScape.controller("cityViewController", function ($http, $routeParams, $location) {
    _CVC = this;
    var threeLetterCode = $routeParams.city;
    var cityCode;

    // Load clock onto partial
    CoolClock.findAndCreateClocks();
    startTime();

    // Redirects back to Las Vegas if any other url besides the ones listed are typed
    if (    (threeLetterCode != "las") && (threeLetterCode != "lax") && (threeLetterCode != "nyc") &&
            (threeLetterCode != "sea") && (threeLetterCode != "sfo") && (threeLetterCode != "yvr")      ) 
    {
        $location.path('/');
    }

    // City id's for weather API
    var las = 5506956;
    var lax = 5368361;
    var nyc = 5128581;
    var sea = 5809844;
    var sfo = 5391959;
    var yvr = 6173331;

    if (threeLetterCode == "las") { cityCode = las; }
    if (threeLetterCode == "lax") { cityCode = lax; }
    if (threeLetterCode == "nyc") { cityCode = nyc; }
    if (threeLetterCode == "sea") { cityCode = sea; }
    if (threeLetterCode == "sfo") { cityCode = sfo; }
    if (threeLetterCode == "yvr") { cityCode = yvr; }

    // Weather API call for data
    var retrieve = "http://api.openweathermap.org/data/2.5/weather?id=" + cityCode + "&APPID=e32e64d4596f50d32a9cc2a4427137a7"
    $http.get(retrieve).then(function (res) {
        var temperature = res.data.main.temp;

        _CVC.cityName = res.data.name;
        _CVC.description = capitalizeEveryWord(res.data.weather[0].description);
        _CVC.celsius = Math.round(temperature - 273.15);
        _CVC.fahrenheit = Math.round(temperature * 9/5 - 459.67);
        _CVC.weatherIcon = "weather-icon "+ setWeatherIcon(res.data.weather[0].id);
        // console.log("City:", _CVC.cityName, "Skies:", _CVC.description, "C:", _CVC.celsius, "F:", _CVC.fahrenheit);
    });

    // Sets the video based on the url link
    // Loads up videos quicker with the if checks in the function
    this.getVideo = function() {
        var video_name;
        if (threeLetterCode == "las") { video_name = "vegas" }
        if (threeLetterCode == "lax") { video_name = "la_skyline" }
        if (threeLetterCode == "nyc") { video_name = "nyc_skyline" }
        if (threeLetterCode == "sea") { video_name = "sea_day" }
        if (threeLetterCode == "sfo") { video_name = "sfo" }
        if (threeLetterCode == "yvr") { video_name = "yvr" }
        return "static/mp4/" + video_name + ".mp4";
    }

    // Sets the weather icon in the video based on weather.id from weatherAPI
    function setWeatherIcon(weatherId) {
        if (weatherId >= 200 && weatherId <= 232) {
            // thunderstorm
            return "ion-ios-thunderstorm-outline";
        }
        else if ( (weatherId >= 300 && weatherId <= 321) ||
                  (weatherId >= 500 && weatherId <= 531) ) {
            // rain
            return "ion-ios-rainy-outline";
        }
        else if (weatherId >= 600 && weatherId <= 622) {
            // snow
            return "ion-ios-snowy";
        }
        else if (weatherId == 800) {
            // check time - night or day
            // ion-ios-sunny-outline
            // ion-ios-moon-outline
            return "ion-ios-moon-outline"
        }
        else if (weatherId >= 801 && weatherId <= 804) {
            // Cloudy
            // DAYTIME   + CLOUDY = "ion-ios-partlysunny-outline"
            // NIGHTTIME + CLOUDY = "ion-ios-moon-outline"
            return "ion-ios-cloud-outline"
        }
        else if (weatherId >= 900 && weatherId <= 906) {
            // Danger
            return "ion-android-warning";
        }
        else {
            // Weather codes that do not have a matching icon
            return "ion-ios-cloud-outline";
        }
    }

    // Capitalizes the weather description
    function capitalizeEveryWord(s) {
        var sarr = s.split(" ");
        var newString = "";
        for (word in sarr) {
            sarr[word] = sarr[word].charAt(0).toUpperCase() + sarr[word].slice(1);
            newString += (sarr[word] + " ");
        }
        return newString;
    }

    // Start the digital clock on the video
    function startTime() {
        var today = new Date();
        var hh = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var dd = (hh >= 12) ? "PM" : "AM";
        var h = ((hh + 11) % 12) + 1;
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('digital_clock').innerHTML =
        h + ":" + m + " " + dd;
        var t = setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

});