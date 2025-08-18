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
})

};

http://localhost:8080/geoserver/gama_project/wms?service=WMS&version=1.1.0&request=GetMap&layers=gama_project%3Agama_health_3&bbox=-0.5202026369999544%2C5.469726562000062%2C0.0737036130000456%2C5.879882812000062&width=768&height=530&srs=EPSG%3A4326&styles=&format=application/openlayers


L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

