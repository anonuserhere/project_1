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

    let outputArea = document.querySelector(".offcanvas-body");
    let title = document.querySelector(".offcanvas-title");
    let time = document.querySelector("#time");

    var dateTime = new Date();
    time.innerHTML = `Current time: <br> ${dateTime}`;
    let currentTime = dateTime.getTime();

    axios.request(config).then((response) => {
      let result = response.data.Services;
      title.innerText = `BUS STOP CODE: ${selectedBS}`;
      outputArea.innerHTML = "";

      for (let j = 0; j < result.length; j++) {
        let el = document.createElement("div");
        let arrivalTime = new Date(result[j].NextBus.EstimatedArrival);
        let arrivalTime2 = new Date(result[j].NextBus2.EstimatedArrival);
        let arrivalTime3 = new Date(result[j].NextBus3.EstimatedArrival);
        let z = Math.round((arrivalTime.getTime() - currentTime) / 60000);
        let z1 = Math.round((arrivalTime2.getTime() - currentTime) / 60000);
        let z2 = Math.round((arrivalTime3.getTime() - currentTime) / 60000);

        el.innerHTML = `Bus Service: <h3>${result[j].ServiceNo}</h3> <br>
                        Next Bus: ${result[j].NextBus.EstimatedArrival.slice(
                          11,
                          19
                        )} (Estimated : ${z} minutes) <br>
                        Subsequent: ${result[j].NextBus2.EstimatedArrival.slice(
                          11,
                          19
                        )} (Estimated : ${z1} minutes) <br>
                        Following: ${result[j].NextBus3.EstimatedArrival.slice(
                          11,
                          19
                        )} (Estimated : ${z2} minutes)
        <br><br>`;
        outputArea.appendChild(el);
      }
    });
  }
  loadBusService();
});
