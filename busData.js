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
      let outputArea = document.querySelector("#busTime");

      for (let j = 0; j < result.length; j++) {
        let el = document.createElement("option");
        el.innerText = `${result[j].ServiceNo}`;
        outputArea.appendChild(el);
      }
    });
  }
  loadBusService();
});
