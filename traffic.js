let trafficCluster = L.markerClusterGroup();

function trafficData() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://psychic-couscous.onrender.com/ltaproxy?url=" +
      "http://datamall2.mytransport.sg/ltaodataservice/TrafficIncidents",
    headers: {
      AccountKey: "zFmn2o2zS8yMQH/GZ0cCEQ==",
      Accept: "application/json",
    },
  };

  axios.request(config).then((response) => {
    let trafficMarker = response.data.value;
    for (let x of trafficMarker) {
      let lat = x.Latitude;
      let lng = x.Longitude;
      let coords = [lat, lng];
      let incidents = L.marker(coords, { icon: incidentIcon });
      incidents.bindPopup(`
     <h4>${x.Message.toUpperCase()}<h4>`);
      incidents.addTo(trafficCluster);
      trafficCluster.addTo(map);
    }
  });

  let clearIncidents = document
    .querySelector("#incident_btn")
    .addEventListener("click", () => {
      if (map.hasLayer(trafficCluster)) {
        map.removeLayer(trafficCluster);
      } else {
        map.addLayer(trafficCluster);
      }
    });
}

window.addEventListener("DOMContentLoaded", () => {
  trafficData();
  setInterval(function () {
    map.removeLayer(trafficCluster);
    trafficData();
  }, 1000 * 300);
});
