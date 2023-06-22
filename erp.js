const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
  },
  series: [],
  noData: {
    text: "Error 404. Just kidding. It's loading I hope...",
  },
};

const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
chart.render();

var groupBy = function (data, key) {
  return data.reduce((storage, item) => {
    var group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage;
  }, {});
};

let searchBtn = document.querySelector("#erp_search");
let erpData = [];
let gantryData = [];

function loadERP(page) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://psychic-couscous.onrender.com/ltaproxy?url=" +
      "http://datamall2.mytransport.sg/ltaodataservice/ERPRates" +
      `?$skip=${(page - 1) * 500}&$top=500`,
    headers: {
      AccountKey: "zFmn2o2zS8yMQH/GZ0cCEQ==",
      Accept: "application/json",
    },
  };

  axios.request(config).then((response) => {
    let result = response.data.value;
    erpData.push(...result);
    if (result.length === 500) {
      loadERP(page + 1);
    } else {
      let groupedData = groupBy(erpData, "ZoneID");
      gantryData.push(groupedData);
    }
  });
}

window.addEventListener("DOMContentLoaded", loadERP(1));

function displayData(gantry, vehicle, day) {
  let selectedVehicle = gantryData[0][gantry].filter(
    (x) => x.VehicleType === vehicle
  );
  if (day === "Weekdays") {
    let transformedData = selectedVehicle.filter(
      (x) => x.DayType === "Weekdays"
    );
    let mappedData = transformedData.map((x) => {
      return {
        x: x.StartTime,
        y: x.ChargeAmount,
      };
    });

    chart.updateSeries([
      {
        name: "ERP Charge",
        data: mappedData,
      },
    ]);
  } else {
    let transformedData = selectedVehicle.filter(
      (x) => x.DayType === "Saturday"
    );
    let mappedData = transformedData.map((x) => {
      return {
        x: x.StartTime,
        y: x.ChargeAmount,
      };
    });

    chart.updateSeries([
      {
        name: "ERP Charge",
        data: mappedData,
      },
    ]);
  }
}

searchBtn.addEventListener("click", () => {
  let selectedGantry = document.querySelector("#gantry_container select").value;
  let selectedVehicle = document.querySelector(
    "#vehicle_container select"
  ).value;
  let selectedDay = document.querySelector("#day_container select").value;

  displayData(selectedGantry, selectedVehicle, selectedDay);
});
