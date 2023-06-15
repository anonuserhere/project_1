const MRT_url =
  "https://gist.githubusercontent.com/raphodn/aca68c6e5b704d021fe0b0d8a376f4aa/raw/40d3d455da164bf8046a1fc6e51a5dc1ed2a0fa6/singapore-mrt.min.geojson";

async function loadMrt() {
  let response = await axios.get(MRT_url);
  let names = [];

  let mrtList = document.createElement("select");

  for (let i = 0; i < response.data.features.length; i++) {
    let name = response.data.features[i].properties.name;
    names.push(name);
    names.sort();
  }

  for (let j = 0; j < names.length; j++) {
    let name = names[j];
    let mrtOption = document.createElement("option");
    mrtOption.innerText = name.toUpperCase();
    mrtOption.value = name;
    mrtList.appendChild(mrtOption);
    document.querySelector("#mrt_list").appendChild(mrtList);
  }

  let mrtLayer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`
          <h5>
            ${feature.properties.name.toUpperCase()} (${
        feature.properties.lines
      })
          </h5>`);
    },
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: MRTIcon });
    },
  }).addTo(map);

  mrtLayer.setStyle({
    color: "purple",
  });

  const clearMRT = document
    .querySelector("#mrt_btn")
    .addEventListener("click", () => {
      if (map.hasLayer(mrtLayer)) {
        map.removeLayer(mrtLayer);
      } else {
        map.addLayer(mrtLayer);
      }
    });

  document.querySelector("#mrt_search").addEventListener("click", () => {
    let selected = document.querySelector("#mrt_list select").value;
    function findMRT(selected) {
      for (let i = 0; i < mrtLayer.getLayers().length; i++) {
        let marker = mrtLayer.getLayers()[i];

        if (marker.feature.properties.name === selected) {
          map.flyTo(marker.getLatLng(), 14);
          marker.openPopup();
        }
      }
    }
    findMRT(selected);
  });
}

window.addEventListener("DOMContentLoaded", loadMrt);
