var map = L.map('map').setView([5.675362, -0.210071], 10);

//Basemap OSM and Study Area
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:GAMA_Map',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326, 
  attribution: 'Authors',
}).addTo(map)

var marker = L.marker([5.650999, -0.183458]).addTo(map);
marker.bindPopup("<b>Department of Geography & Resource Development</b><br>University of Ghana.").openPopup();

var marker = L.marker([5.551150, -0.204982]).addTo(map);
marker.bindPopup("Accra Cental").openPopup();


var marker = L.marker([5.645210, -0.001596]).addTo(map);
marker.bindPopup("<b>Tema</b><br>Community 1").openPopup();

var marker = L.marker([5.564385, -0.332169]).addTo(map);
marker.bindPopup("Weija").openPopup();

var marker = L.marker([5.705493, -0.301719]).addTo(map);
marker.bindPopup("Amasaman").openPopup();

var marker = L.marker([5.813361, -0.119713]).addTo(map);
marker.bindPopup("Oyibi").openPopup();



// =========================
// Indicators & Layers
// =========================


var basemaps = {
  
'Health_Density': L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_health_3',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  
  attribution: 'Authors',
  styles: 'kde_health'
}),

"Health_facilities": L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:Health Facilities',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  
  attribution: 'Authors',
 
}),

GAMA_MAP: L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:GAMA_Map',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  
  attribution: 'Authors',
 
}),

GAMA_Boundaries: L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:GAMA_Boundaries',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  
  attribution: 'Authors',
 
}),
'GAMA Boundary, then Health Facilities': L.tileLayer.wms('https://36a327b79c02.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'GAMA_Boundaries,Health Facilities',
  format: 'image/png',
  transparent: true,  
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  
  attribution: 'Authors',
  })

};



L.control.layers(basemaps).addTo(map);



// basemaps.Topography.addTo(map);

L.control.scale({
    metric: true, // Display metric units (e.g., meters, kilometers)
    imperial: true, // Display imperial units (e.g., feet, miles)
    maxWidth: 200, // Maximum width of the scale bar in pixels
    position: 'bottomleft' // Position on the map (e.g., 'bottomleft', 'bottomright')
}).addTo(map);


