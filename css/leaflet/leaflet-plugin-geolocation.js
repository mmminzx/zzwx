L.Geolocation = L.extend({

    /**
     * Centered map on a clients coordinates
     * @param {L.Map} map
     */
    getGeolocation: function (map) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                map.setView(L.latLng(position.coords.latitude, position.coords.longitude),map.getZoom());
            });
        } else {
            alert('Your browser does not support Geolocation API');
        }
    }

});