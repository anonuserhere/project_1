let map = L.map("map").setView([1.3569, 103.8123], 11);
let popup = L.popup();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(
      `Latitude: ${e.latlng.lat.toFixed(4)}<br />
       Longitude: ${e.latlng.lng.toFixed(4)}`
    )
    .openOn(map);
}

map.on("click", onMapClick);

var incidentIconClass = L.Icon.extend({
  options: {
    iconSize: [30, 40],
    iconAnchor: [10, 10],
    popupAnchor: [-3, -50],
  },
});

var MRTIconClass = L.Icon.extend({
  options: {
    iconSize: [30, 40],
    iconAnchor: [10, 10],
    popupAnchor: [-3, -30],
  },
});

var MRTIcon = new MRTIconClass({
  iconUrl: "icons/MRT_logo.png",
});

var incidentIcon = new incidentIconClass({
  iconUrl: "icons/exclamation_mark.png",
});
