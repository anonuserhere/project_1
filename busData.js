document.querySelector("#busStop_search").addEventListener("click", () => {
  let selectedBS = document.querySelector("#busStop_input").value;
  function loadBusService() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://psychic-couscous.onrender.com/ltaproxy?url=" +
        "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=" +
        `${selectedBS}`,
      headers: {
        AccountKey: "zFmn2o2zS8yMQH/GZ0cCEQ==",
        Accept: "application/json",
      },
    };

    axios.request(config).then((response) => {
      let result = response.data.Services;
      console.log(result);
      let buses = [];

      for (let i = 0; i < result.length; i++) {
        buses.push(
          {
            busNo: result[i].ServiceNo,
            busLat: result[i].NextBus.Latitude,
            busLng: result[i].NextBus.Longitude,
            busTime: result[i].NextBus.EstimatedArrival,
          },
          {
            busNo: result[i].ServiceNo,
            bus2Lat: result[i].NextBus2.Latitude,
            bus2Lng: result[i].NextBus2.Longitude,
            bus2Time: result[i].NextBus2.EstimatedArrival,
          },
          {
            busNo: result[i].ServiceNo,
            bus3Lat: result[i].NextBus3.Latitude,
            bus3Lng: result[i].NextBus3.Longitude,
            bus3Time: result[i].NextBus3.EstimatedArrival,
          }
        );
      }
      console.log(buses);
    });
  }
  loadBusService();
});
