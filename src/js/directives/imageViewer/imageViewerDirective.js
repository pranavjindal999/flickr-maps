(function(angular) {

    angular.module('flickr-maps').directive('imageViewer', directiveFn);

    function directiveFn() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'src/js/directives/imageViewer/imageViewer.html',
            controller:  controllerFn,
            controllerAs: 'imageViewerVm'
        };
    }

    controllerFn.$inject =['$scope', '$rootScope'];
    
    function controllerFn($scope, $rootScope){
        var imageViewerVm = this;

        $rootScope.$on('openViewer', function (event, srcURL) {
            imageViewerVm.visible = true;
            imageViewerVm.url = srcURL;
        })
    }


})(window.angular);
