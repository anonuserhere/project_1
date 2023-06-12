function loadData() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=01139",
    headers: {
      AccountKey: "zFmn2o2zS8yMQH/GZ0cCEQ==",
      Accept: "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", loadData);
