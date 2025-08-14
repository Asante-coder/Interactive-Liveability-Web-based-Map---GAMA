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


Accra_districts: L.tileLayer.wms('https://756e6211cd1c.ngrok-free.app/geoserver/accra_distict/wms', {
  layers: 'accra_distict:Accra_districts',
  format: 'image/png',
  transparent: true,  // Enable transparency (optional)
  version: '1.1.0',
  crs: L.CRS.EPSG4326,  // Match the SRS in your WMS (EPSG:4326)
  attribution: 'Authors'
})

};

L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

