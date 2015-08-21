(function () {
    'use strict';

    angular
        .module('angular-pagechage', [])
        .directive('pageChange', pageChange);

    pageChange.$inject = ['$rootScope','$state'];

    /* @ngInject */
    function pageChange($rootScope,$state) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs, controller) {



            scope.$on('$stateChangeStart',
                function (event, toState, fromState, toParams, fromParams) {
                    // event.preventDefault();
                    // transitionTo() promise will be rejected with 
                    // a 'transition prevented' error


                 

                        var selector = $(element).find("[ng-model]");

                        $(selector).each(function (i, obj) {

                            var model = angular.element($(obj)).controller('ngModel')

                            if (!model.$pristine) {
                                event.preventDefault()
                                scope.$evalAsync(attrs.pageChange, {
                                    $event: event,
                                    $toState: toState,
                                    $fromState: fromState,
                                    $toParams: toParams,
                                    $fromParams: fromParams,
                                    $cancel:scope
                                });
                                return false
                            }
                        });
                  

                })
            
             scope.$on("$destroy", function() {
                 console.log("inn")
      
    });




        }
    }

})();