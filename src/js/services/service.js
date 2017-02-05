(function(angular) {

    angular.module('flickr-maps').service('service', serviceFn);

    serviceFn.$inject = ['$http', '$q','$httpParamSerializer'];

    function serviceFn($http, $q, $httpParamSerializer) {
        this.getPhotosforCords = getPhotosforCords;
        this.createPhotoUrls = createPhotoUrls;


        function getPhotosforCords(lat, lng, page) {
            var def = $q.defer();

            var params = {};
            params.lat = lat;
            params.lon = lng;
            params.per_page = 4;
            params.page = page;
            updateParams('flickr.photos.search', params);

            $http.get(baseURL, {params: params}).then(function(response){
            	var data = eval(response.data);
            	def.resolve(data);
            });

            return def.promise;
        }

        function createPhotoUrls(photos){
        	for (var i = 0; i < photos.length; i++) {
        		photos[i].url = "https://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+"_q.jpg";
        		photos[i].url_large = "https://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+"_b.jpg";
        	}
        }
    }

    var baseURL = 'https://api.flickr.com/services/rest/';

    function updateParams(method, params) {
        params.api_key = '2ef87984a35b522d5fe520b1c03fea03';
        params.method = method;
        params.format = 'json';
    }

    function jsonFlickrApi(data){
    	return data;
    }

})(window.angular);
