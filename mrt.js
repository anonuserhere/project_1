let MRT_url =
  "https://gist.githubusercontent.com/raphodn/aca68c6e5b704d021fe0b0d8a376f4aa/raw/40d3d455da164bf8046a1fc6e51a5dc1ed2a0fa6/singapore-mrt.min.geojson";

async function loadMrt() {
  let response = await axios.get(MRT_url);
  let mrtLayer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`
          <h4>
            ${feature.properties.name} (${feature.properties.lines})
          </h4>`);
    },
  }).addTo(map);

  mrtLayer.setStyle({
    color: "purple",
  });

  let clearBtn = document
    .querySelector("#mrt_btn")
    .addEventListener("click", () => {
      if (map.hasLayer(mrtLayer)) {
        map.removeLayer(mrtLayer);
      } else {
        map.addLayer(mrtLayer);
      }
    });
}

window.addEventListener("DOMContentLoaded", loadMrt);
