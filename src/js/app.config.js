(function(angular) {

    angular.module('flickr-maps', ['ui.router']);

    angular.module('flickr-maps').config(configFn);

    configFn.$inject = ['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider'];

    function configFn($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('home', {
                url: '/?lat&lng&page',
                views: {
                    "header": {
                        templateUrl: "src/js/modules/header/header.html",
                        controller: 'headerController',
                        controllerAs: 'headerVm'
                    },
                    "main": {
                        templateUrl: "src/js/modules/home/home.html",
                        controller: 'homeController',
                        controllerAs: 'homeVm'
                    },
                    "footer": {
                        templateUrl: "src/js/modules/footer/footer.html"
                    }
                }
            });

        $urlMatcherFactoryProvider.caseInsensitive(true);
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
    }

})(window.angular);
