(function(angular) {

    angular.module('flickr-maps').directive('mapEmbed', directiveFn);

    directiveFn.$inject = ['mapApiService'];

    function directiveFn(mapApiService) {
        return {
            restrict: 'E',
            scope: {
                cords: '='
            },
            bindToController: true,
            templateUrl: 'src/js/directives/mapEmbed/mapEmbed.html',
            controller: controllerFn,
            controllerAs: 'mapEmbedVm',
            link: linkFn
        };

        function linkFn($scope, element, attrs) {
            var mapEmbedVm = $scope.mapEmbedVm;
            var tag = document.createElement('script');
            tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Xr5IjKLB2mON_9KJA7PZbEVb6FMH-WQ&callback=mapApiLoaded&libraries=places";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            mapApiService.onApiReady(function() {
                mapEmbedVm.cords.lat = parseFloat(mapEmbedVm.cords.lat);
                mapEmbedVm.cords.lng = parseFloat(mapEmbedVm.cords.lng);

                mapEmbedVm.map = new google.maps.Map(element.children()[1], {
                    center: mapEmbedVm.cords,
                    zoom: 12
                });
                mapEmbedVm.marker = new google.maps.Marker({
                    position: mapEmbedVm.cords,
                    map: mapEmbedVm.map,
                    draggable: true
                });

                mapEmbedVm.marker.addListener('dragend', function(data) {
                    mapEmbedVm.cords.lat = data.latLng.lat();
                    mapEmbedVm.cords.lng = data.latLng.lng();
                    $scope.$emit('mapCordinatesChanged');
                    mapEmbedVm.autocompleteText = '';
                });

                mapEmbedVm.autocomplete = new google.maps.places.Autocomplete(element.children()[0]);

                mapEmbedVm.autocomplete.addListener('place_changed', function() {
                    mapEmbedVm.marker.setVisible(false);
                    var place = mapEmbedVm.autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }

                    if (place.geometry.viewport) {
                        mapEmbedVm.map.fitBounds(place.geometry.viewport);
                    } else {
                        mapEmbedVm.map.setCenter(place.geometry.location);
                        mapEmbedVm.map.setZoom(17);
                    }
                    mapEmbedVm.marker.setPosition(place.geometry.location);
                    mapEmbedVm.marker.setVisible(true);

                    mapEmbedVm.cords.lat = place.geometry.location.lat();
                    mapEmbedVm.cords.lng = place.geometry.location.lng();
                    $scope.$emit('mapCordinatesChanged');
                });

            });
        }
    }

    controllerFn.$inject = ['$scope', '$rootScope'];

    function controllerFn($scope, $rootScope) {
        var mapEmbedVm = this;
    }

})(window.angular);
