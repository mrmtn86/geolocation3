function GoogleMap() {
    var map;
    var markers = [];


    this.initialize = function () {
        map = showMap();
    };

    this.cihazPozisyonGuncelle = function(pozisyon){
      deleteMarkers();

        cihazPozisyonAyarla(pozisyon);
    };

    function cihazPozisyonAyarla(pozison){
        addMarker(pozison);
    }

    this.yerGuncelle = function (telefon) {

        deleteMarkers();

        var arrayLength = telefon.yerList.length;
        for (var i = 0; i < arrayLength; i++) {
            yer = telefon.yerList[i];
            var pos = {
                lat: Number(yer.latitude),
                lng: Number(yer.longitude)
            };
            addMarker(pos);
        }
    };

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.setCenter(location);
        markers.push(marker);
        return marker;
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

// Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

// Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }


    var showMap = function () {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var cihazPozisyon = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map = new google.maps.Map(document.getElementById('map'), {
                    center:cihazPozisyon,
                    disableDefaultUI: true,
                    zoom: 17
                });
                cihazPozisyonAyarla(cihazPozisyon);

            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        return map;
    };

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
}