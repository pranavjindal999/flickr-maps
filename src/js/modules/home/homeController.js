(function(angular) {

   angular.module('flickr-maps').controller('homeController', homeController);

   homeController.$inject = ['$scope', '$rootScope', 'service', '$state'];

   function homeController($scope, $rootScope, service, $state){
   		var homeVm = this;

   		homeVm.getNSetPhotos = function(page){
   			homeVm.isLoading = true;
   			service.getPhotosforCords(homeVm.cords.lat, homeVm.cords.lng, page).then(function(data){
   				homeVm.pages = data.photos.pages;
   				homeVm.photos = data.photos.photo;
   				homeVm.page = data.photos.page;
   				service.createPhotoUrls(homeVm.photos);
   				homeVm.isLoading = false;
   				$state.transitionTo('home', {lat: homeVm.cords.lat, lng: homeVm.cords.lng, page: homeVm.page}, { notify: false });
   			});
   		}

   		if(!$state.params.lat || !$state.params.lng){
   			$state.params.lng= 77.22739580000007;
   			$state.params.lat = 28.6618976;  
   			$state.params.page = 1 			
   		}
   		homeVm.cords = { lat: $state.params.lat, lng: $state.params.lng };
   		homeVm.getNSetPhotos($state.params.page);

   		homeVm.openImage = function(url){
   			$scope.$emit('openViewer', url);
   		}

   		$scope.$on('mapCordinatesChanged', function(){
   			homeVm.getNSetPhotos(1);
   		});
   }

})(window.angular);