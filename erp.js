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
      console.log(erpData);
      groupedData = groupBy(erpData, "ZoneID");
      console.log(groupedData);
    }
  });
}

window.addEventListener("DOMContentLoaded", loadERP(1));
