var map = L.map('map').setView([5.575362, -0.210071], 10);




L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

var basemaps = {
  

  OSM:L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }),


Health_KDE: L.tileLayer.wms('https://03d015978db5.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:gama_health_3',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors',
  styles: 'kde_health'
}),

Health_facilities: L.tileLayer.wms('https://03d015978db5.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:Health Facilities',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors',
 
}),

GAMA_MAP: L.tileLayer.wms('https://03d015978db5.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:GAMA_Map',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors',
 
}),

GAMA_Boundaries: L.tileLayer.wms('https://03d015978db5.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'gama_project:GAMA_Boundaries',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors',
 
}),
'GAMA Boundary, then Health Facilities': L.tileLayer.wms('https://03d015978db5.ngrok-free.app/geoserver/gama_project/wms', {
  layers: 'GAMA_Boundaries,Health Facilities',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors',
    }),


};




L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

