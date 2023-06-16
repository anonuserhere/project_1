let busStopCluster = L.markerClusterGroup();
let busStopData = [];

function loadData(page) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      // "https://corsproxy.io/?" +
      "https://psychic-couscous.onrender.com/ltaproxy?url=" +
      "http://datamall2.mytransport.sg/ltaodataservice/BusStops" +
      `?$skip=${(page - 1) * 500}&$top=500`,
    headers: {
      AccountKey: "zFmn2o2zS8yMQH/GZ0cCEQ==",
      Accept: "application/json",
    },
  };

  axios.request(config).then((response) => {
    let busStopMarker = response.data.value;
    busStopData.push(...busStopMarker);
    if (busStopMarker.length === 500) {
      loadData(page + 1);
    } else {
      for (let x of busStopData) {
        let lat = x.Latitude;
        let lng = x.Longitude;
        let newCoords = [lat, lng];
        let busStop = L.marker(newCoords, { icon: busIcon });
        busStop.bindPopup(`
        <h4>Bus Stop Code: ${x.BusStopCode}</h4><br>
        <h5>${x.RoadName.toUpperCase()}<br>
            ${x.Description.toUpperCase()}</h5>`);
        busStop.addTo(busStopCluster);
        busStopCluster.addTo(map);
      }
    }
    let clearBusStop = document
      .querySelector("#busStop_btn")
      .addEventListener("click", () => {
        if (map.hasLayer(busStopCluster)) {
          map.removeLayer(busStopCluster);
        } else {
          map.addLayer(busStopCluster);
        }
      });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadData(1);
});
