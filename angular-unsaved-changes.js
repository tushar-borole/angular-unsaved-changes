(function () {
    'use strict';

    angular
        .module('angular-unsaved-changes', [])
        .directive('pageChange', pageChange);

    pageChange.$inject = ['$rootScope', '$state'];

    /* @ngInject */
    function pageChange($rootScope, $state) {
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




                    var selector = $(element).find("[page-change-element]");

                    $(selector).each(function (i, obj) {

                        var model = angular.element($(obj)).controller('ngModel')

                        if (model.$isChanged && model.$dirty) {
                            event.preventDefault();
                            scope.$evalAsync(attrs.pageChange, {
                                $event: event,
                                $toState: toState,
                                $fromState: fromState,
                                $toParams: toParams,
                                $fromParams: fromParams,
                                $cancel: scope
                            });
                            return false
                        }
                    });


                })





        }
    }

})();

(function () {
    'use strict';

    angular
        .module('angular-unsaved-changes')
        .directive('pageChangeElement', pageChangeElement);

    pageChangeElement.$inject = ['$rootScope'];

    /* @ngInject */
    function pageChangeElement($rootScope) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            function isEmpty(val) {
                return (val === undefined || val == null || val.length <= 0) ? null : val;
            }

            scope.$watch(attrs.ngModel, function (value) {

                value = isEmpty(value)

                if (ngModel.$pristine) { //if form is touched or not

                    ngModel.$initialValue = value;





                }


                if (value == ngModel.$initialValue) {
                    ngModel.$isChanged = false;

                } else {
                    ngModel.$isChanged = true;
                }
                console.log(ngModel.$isChanged)


            });

        }
    }

})();