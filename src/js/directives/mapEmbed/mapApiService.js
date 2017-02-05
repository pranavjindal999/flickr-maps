(function(angular) {

   angular.module('flickr-maps').service('mapApiService', serviceFn);

   serviceFn.$inject = ['$q', '$window'];

   function serviceFn($q, $window){
        var apiReadyDef = $q.defer();

        $window.mapApiLoaded = function() {
            apiReadyDef.resolve();
        }

        this.onApiReady = function(callback) {
            apiReadyDef.promise.then(callback);
        }
   }

})(window.angular);