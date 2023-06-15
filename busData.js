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

    var dt = new Date();
    time.innerHTML = `Current time: <br> ${dt}`;

    axios.request(config).then((response) => {
      let result = response.data.Services;
      title.innerText = `BUS STOP CODE: ${selectedBS}`;
      outputArea.innerHTML = "";

      for (let j = 0; j < result.length; j++) {
        let el = document.createElement("div");
        el.innerHTML = `Bus Service: <h3>${result[j].ServiceNo}</h3> <br>
                        Next Bus: ${result[j].NextBus.EstimatedArrival.slice(
                          11,
                          19
                        )} <br>
                        Subsequent: ${result[j].NextBus2.EstimatedArrival.slice(
                          11,
                          19
                        )} <br>
                        Following: ${result[j].NextBus3.EstimatedArrival.slice(
                          11,
                          19
                        )} 
                        <br><br>`;
        outputArea.appendChild(el);
      }
    });
  }
  loadBusService();
});
