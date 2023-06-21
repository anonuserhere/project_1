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
      console.log(groupedData);
    }
  });
}

window.addEventListener("DOMContentLoaded", loadERP(1));

//     const ay1_gantry = groupedData.AY1.filter(
//       (timing) => timing.VehicleType === "Taxis"
//     );
//     console.log(ay1_gantry);
//     let mappedData = ay1_gantry.map((x) => {
//       return {
//         x: x.StartTime,
//         y: x.ChargeAmount,
//       };
//     });
//     console.log(mappedData);
//     chart.updateSeries([
//       {
//         name: "Damage",
//         data: mappedData,
//       },
//     ]);
//   }
// });

searchBtn.addEventListener("click", () => {
  let gantry = document.querySelector("#gantry_container select").value;
  let vehicle = document.querySelector("#vehicle_container select").value;
  let day = document.querySelector("#day_container select").value;
});
