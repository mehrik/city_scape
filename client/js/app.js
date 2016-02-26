var cityScape = angular.module('cityScape', ['ngRoute']);

cityScape.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        redirectTo: "/las"
    })
    .when('/:city', {
        templateUrl: "views/partials/city_scape.html",
        controller: "cityViewController as CVC"
    });
});

