var routerApp = angular.module('routerApp', ['ui.router', 'angular-pagechage']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home/page1');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        url: '/home',
        templateUrl: 'partial-home.html'
    })

    // nested list with custom controller
    .state('home.page1', {
        url: '/page1',
        templateUrl: 'page1.html',
        controller: function ($scope, $state) {
            $scope.chageStatus = true
            $scope.chageMe = function ($event, $toState, $toParams, $fromState, $fromParams,$cancel) {
               
                var r = confirm("Press a button");
                if (r == true) {
                    $cancel.$destroy();
                    $state.go($toState.name)
                } else {

                }


            }

        }
    })

    // nested list with just some random string data
    .state('home.page2', {
        url: '/page2',
        templateUrl: 'page2.html'
    })


});

routerApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});