let viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: Cesium.createWorldTerrain()
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true,
    shouldAnimate: true
});




document.getElementsByClassName('cesium-viewer-bottom')[0].style.display = 'none'

viewer.camera.setView({
    destination : Cesium.Cartesian3.fromDegrees(28.96, 41.01, 8000),
    orientation: {
        heading : Cesium.Math.toRadians(0.0), 
        pitch : Cesium.Math.toRadians(-90),   
        roll : 0                            
    }
});



let mapboxButton = document.getElementById('mapbox').onclick = ()=> {
    viewer.scene.imageryLayers.removeAll();
    let MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2VsYWhhdHRpbiIsImEiOiJjbGJ4anh4NDgwN3BwM25ybWwzbG9sdDJpIn0.GjNP1CgfPTcojfCI95vsCA";
    let MAPBOX_STYLE_ID = "cjqglqul3i0cc2sqi6ixvmo3p";
    let MAPBOX_USERNAME = "selahattin";

    let url = `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`
    let customImageryProvider = new Cesium.UrlTemplateImageryProvider({ url: url });
    viewer.imageryLayers.addImageryProvider(customImageryProvider);
}

let esriButton = document.getElementById('esri').onclick = ()=> {
    viewer.scene.imageryLayers.removeAll();
    const esri = new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    });

    viewer.imageryLayers.addImageryProvider(esri);

}


let sAhmetButton = document.getElementById('sultanahmet').onclick = () => {
    flyTo(28.97669, 41.00551, 550, 3)
}


let ayasofyaButton = document.getElementById('ayasofya').onclick = () => {
    flyTo(28.98, 41.00850, 550, 3)
}

let topkapiButton = document.getElementById('topkapi').onclick = () => {
    flyTo(28.98337, 41.01180, 750, 5)
}


let flyTo = (lat, lon, alt, duration) => {
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(lat, lon, alt),
        orientation : {
            heading : Cesium.Math.toRadians(0),
            pitch : Cesium.Math.toRadians(-90.0),
            roll : 0.0
        },
        duration: duration
    });
}