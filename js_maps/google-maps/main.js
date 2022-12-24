let map;
const istanbul = {lat : 41, lng : 29};


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        mapTypeId: 'OSM',
        center : istanbul,
        zoom :13
    });

    map.mapTypes.set(
        'OSM',
        new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
				// "Wrap" x (longitude) at 180th meridian properly
				// NB: Don't touch coord.x: because coord param is by reference, and changing its x property breaks something in Google's lib
				var tilesPerGlobe = 1 << zoom;
				var x = coord.x % tilesPerGlobe;
				if (x < 0) {
					x = tilesPerGlobe + x;
				}
				// Wrap y (latitude) in a like manner if you want to enable vertical infinite scrolling

				return (
					'https://tile.openstreetmap.org/' +
					zoom +
					'/' +
					x +
					'/' +
					coord.y +
					'.png'
				);
			},
            tileSize: new google.maps.Size(256, 256),
            name: 'OpenStreetMap',
            maxZoom: 18
        })
    )
    const marker = new google.maps.Marker({
        position : istanbul,
        map,
        title: "istanbul"
    });

    marker.addListener('click', () => {
        console.log(marker.getTitle())
    });

}



window.initMap = initMap;