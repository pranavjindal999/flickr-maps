(function(angular) {
    angular.module('flickr-maps').directive('spinner', directiveFn);

    function directiveFn() {
        return {
            restrict: 'E',
            templateUrl: 'src/js/directives/spinner/spinner.html',
        };
    }
})(window.angular);