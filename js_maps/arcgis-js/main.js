const geoJsonDAta = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [28, 41],
            },
            properties: {
                name: 'IBB-1',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [29, 40],
            },
            properties: {
                name: 'IBB-2',
            },
        },
    ],
};

require(['esri/Map', 'esri/views/MapView', 'esri/layers/GeoJSONLayer'], (Map, MapView, GeoJSONLayer) => {

    const map = new Map({
        basemap: 'topo-vector',
    });

    const mapView = new MapView({
        map: map,
        center: [29, 41],
        zoom: 8,
        container: 'map',
    });


    const blob = new Blob([JSON.stringify(geoJsonDAta)],
        {
            type: 'application/json'
        });


    const url = URL.createObjectURL(blob);

    const geoJsonLayer = new GeoJSONLayer({
        url,
        outfiled: ['name']
    });

    map.add(geoJsonLayer);

    mapView.on('click', (event) => {
        let screenPoint = {
            x: event.x,
            y: event.y
        };

        mapView.hitTest(screenPoint).then(function (response) {
            if (response.results.length) {
                let graphic = response.results.filter(function (result){
                    return result.graphic.layer === geoJsonLayer;
                })[0].graphic;
                
                console.log(graphic.attributes.name);
            }
        })
    }

    );

})