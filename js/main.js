var clientApp = angular.module('tictactoe', [
    'ngRoute',
    'Board'
]);

clientApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'js/app/index.html',
                    controller: 'HomeController'
                }).
                when('/board', {
                    templateUrl: 'js/app/board/index.html',
                    controller: 'BoardController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        console.log('dsf',$routeProvider);
    }
]);
