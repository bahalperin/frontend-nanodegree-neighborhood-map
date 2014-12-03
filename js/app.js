function appViewModel() {
    var self = this;
    var boston,
        map,
        infowindow;

    function initialize() {
        boston = new google.maps.LatLng(42.3581, -71.0636);

        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: boston,
            zoom: 14,
            disableDefaultUI: true
        });
    };

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                place.marker = createMarker(results[i]);
                self.searchResults.push(place);
            }
        }
    };
    
    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
        });
        google.maps.event.addListener(marker, 'click', function () {
            /*
            self.searchResults().forEach(function(result) {
                result.marker.setAnimation(null);
            })
            infowindow.setContent("<p>" + place.name + "</p>");
            infowindow.open(map, this);
            map.panTo(marker.position);
            self.chosenResult(place);
            document.getElementById(place.id).scrollIntoView();
            marker.setAnimation(google.maps.Animation.BOUNCE);
            */
            var placeId = '#' + place.id;
            $(placeId).trigger('click');

        });
        return marker;
    };

    self.splitAddress = function (address) {
        var firstComma = address.indexOf(',');
        var street = address.slice(0, firstComma);
        var cityState = address.slice(firstComma + 1);
        return [street, cityState];
    };

    self.displayInfo = function (place) {
        console.log(place);
        infowindow.setContent("<p>" + place.name + "</p>");
        infowindow.open(map, place.marker);
        map.panTo(place.marker.position);
    };
    initialize();

    self.query = ko.observable();
    self.searchResults = ko.observableArray([]);
    self.chosenResult = ko.observable();
    self.allMarkers = ko.observableArray([]);
    self.search = function () {
        self.searchResults([]);
        self.allMarkers([]);
        var request = {
            location: boston,
            radius: '500',
            query: self.query()
        };
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    };
    self.goToResult = function (searchResult) {
        self.searchResults().forEach(function(result) {
            result.marker.setAnimation(null);
        });
        console.log(searchResult);
        self.chosenResult(searchResult);
        document.getElementById(searchResult.id).scrollIntoView();
        searchResult.marker.setAnimation(google.maps.Animation.BOUNCE);
    };
};

ko.applyBindings(new appViewModel());