var map = L.map('map').setView([5.675362, -0.210071], 10);


// ********
// Linear measurement

// *********
L.control.ruler().addTo(map);



// ********
// Draw interactions

// *********
map.pm.addControls({
        position: 'bottomright',
        editControls: false
    });

var drawnItems = new L.FeatureGroup().addTo(map);
    map.on("pm:create", function (e) {
        var type = e.shape,
            layer = e.layer;

        if (type === 'Marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });

map.on('pm:remove', function(e) {
        console.log('Layer removed:', e.layer);
    });

    map.on('pm:globaleditmodetoggled', function(e) {
        console.log('Edit mode toggled:', e.enabled);
    });


//Basemap OSM and Study Area
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});


var ug = L.marker([5.650999, -0.183458]).bindPopup('<b>Department of Geography & Resource Development</b><br>University of Ghana..'),
    accra    = L.marker([5.551150, -0.204982]).bindPopup('Accra Cental.'),
    tema    = L.marker([5.645210, -0.001596]).bindPopup('<b>Tema</b><br>Community 1.'),
    weija    = L.marker([5.564385, -0.332169]).bindPopup('Weija.');
    oyibi    = L.marker([5.813361, -0.119713]).bindPopup('Oyibi.');

var places = L.layerGroup([ug, accra, tema, weija, oyibi]);

new L.Control.Geocoder().addTo(map);

// =========================
// Indicators & Layers
// =========================


// var basemaps = {
  
// 'Health_Density': L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
//   layers: 'gama_health_3',
//   format: 'image/png',
//   transparent: true,  
//   version: '1.1.0',
//   crs: L.CRS.EPSG4326,  
//   attribution: 'Authors',
//   styles: 'kde_health'
// }),

// "Health_facilities": L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
//   layers: 'gama_project:Health Facilities',
//   format: 'image/png',
//   transparent: true,  
//   version: '1.1.0',
//   crs: L.CRS.EPSG4326,  
//   attribution: 'Authors',
 
// }),

// GAMA_MAP: L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
//   layers: 'gama_project:GAMA_Map',
//   format: 'image/png',
//   transparent: true,  
//   version: '1.1.0',
//   crs: L.CRS.EPSG4326,  
//   attribution: 'Authors',
 
// }),

// GAMA_Boundaries: L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
//   layers: 'gama_project:GAMA_Boundaries',
//   format: 'image/png',
//   transparent: true,  
//   version: '1.1.0',
//   crs: L.CRS.EPSG4326,  
//   attribution: 'Authors',
 
// }),
// 'GAMA Boundary, then Health Facilities': L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
//   layers: 'GAMA_Boundaries,Health Facilities',
//   format: 'image/png',
//   transparent: true,  
//   version: '1.1.0',
//   crs: L.CRS.EPSG4326,  
//   attribution: 'Authors',
//   })

// };



// L.control.layers(basemaps).addTo(map);



// basemaps.Topography.addTo(map);

L.control.scale({
    metric: true, // Display metric units (e.g., meters, kilometers)
    imperial: true, // Display imperial units (e.g., feet, miles)
    maxWidth: 200, // Maximum width of the scale bar in pixels
    position: 'bottomleft' // Position on the map (e.g., 'bottomleft', 'bottomright')
}).addTo(map)


// =====================
// Load GeoJSON Files
// =====================


//  L.control.layers(overlayMaps).addTo(map);

var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
    "Places": places
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


function loadGeoJSON(name, filePath, options) {
  fetch(filePath)
    .then(res => res.json())
    .then(data => {
      var layer = L.geoJSON(data, options);
      overlayMaps[name] = layer;                      
      layerControl.addOverlay(layer, name);           
      
    })
    .catch(err => console.error(`Error loading ${name}:`, err));
}

loadGeoJSON("GAMA Map", "data/gama_gmap.geojson", { 
   style: {
    color: "orange",
    weight: 2,
    fillOpacity: 0.4
  },
  
onEachFeature: function (feature, layer) {
    if (feature.properties) {
      // Show district name on hover
      layer.bindTooltip(
        `District: ${feature.properties.ADM2_EN|| "N/A"}`,
        { permanent: false, direction: "top" }
      );
    }
  }  
});  
loadGeoJSON("GAMA Health", "data/health_facilities_gama.geojson", { 
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 2,
      fillColor: "red",
      color: "darkred",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  },

  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      // Show district name on hover
      layer.bindTooltip(
        `Name: ${feature.properties.NAME || "N/A"}<br> 
        Type: ${feature.properties.UnitTypeNa || "N/A"}`,
        { permanent: false, direction: "top", cursor:"pointer" }
      );
    }
  }  
});

loadGeoJSON("GAMA Schools", "data/schools_gama.geojson", { 
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 2,
      fillColor: "green",
      color: "darkred",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  });
},
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      // Show district name on hover
      layer.bindTooltip(
        `Name: ${feature.properties.name || "N/A"}<br> 
        Type: ${feature.properties.amenty || "N/A"}`,
        { permanent: false, direction: "top" }
      );
    }
  } 
});
//   loadGeoJSON("GAMA Transport", "data/gama_transport.geojson", { 
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng, {
//       radius: 2,
//       fillColor: "black",
//       color: "darkred",
//       weight: 1,
//       opacity: 1,
//       fillOpacity: 0.8
//     });
//   }
// });



