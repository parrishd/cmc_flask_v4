<template>
  <div class="map-container">
    <!-- MapBox GL JS instance -->
    <div id="map" />
    <!-- Toggle between data type by loading different source and layers -->
    <div class="data-type-widget">
      <q-card class="my-card">
        <q-card-section>
          <p>Station Type</p>

          <q-option-group
            v-model="stationTypeGroup"
            :options="stationTypeOptions"
            color="primary"
          ></q-option-group>
        </q-card-section>
      </q-card>
    </div>

    <!-- Foo widget to show sampling events, not hooked up to reactive data -->
    <div class="map-overlay">
      <q-card class="my-card">
        <q-card-section>
          <q-list>
            <p>Total Sampling Events</p>

            <p>
              <span class="dot-red"></span>
              &#60; 10
            </p>
            <p>
              <span class="dot-yellow"></span>
              10 - 100
            </p>
            <p>
              <span class="dot-green"> </span>
              &#62; 100
            </p>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- toggle raster or vector map style. Check uncheck to show polygon data-->
    <div class="map-style">
      <q-card class="my-card">
        <q-card-section>
          <q-option-group
            v-model="mapStyle"
            :options="mapStyleOptions"
            color="primary"
          ></q-option-group>

          <q-checkbox v-model="showWatersheds"> Watersheds</q-checkbox>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted, reactive, ref, watch } from "vue";
import stations from "/src/assets/stations.json";
import stationsSecondSet from "/src/assets/station-richness-data.json";

// *** Variables and constants ***

// instance of MapBox GL JS
let map = reactive({});

let isPolygonsClickEventSet = ref(false);
// shows hides polygons that represent 50 states per foo geojson file
let showWatersheds = ref(true);

// used to persist the polygons layer pop up in case we toggle data type
let isShowingPolygonPopUp = ref(false);

// group of options to select to show map as aerial (raster) vs vector street map
let mapStyle = ref("vector");
const mapStyleOptions = ref([
  {
    label: "Street Map",
    value: "vector",
  },
  {
    label: "Aerial",
    value: "raster",
  },
]);

// group of options to select data type via radio toggle
let stationTypeGroup = ref("benthic");
const stationTypeOptions = ref([
  {
    label: "Benthic",
    value: "benthic",
  },
  {
    label: "Water Quality",
    value: "water",
  },
]);

let waterLayerIdsMap = new Map();
let benthicLayerIdsMap = new Map();

// locs static foo data for demo on markers
let locs = reactive({
  type: "FeatureCollection",
  features: [],
});

// locs static foo data for demo on markers
let locsBenthic = reactive({
  type: "FeatureCollection",
  features: [],
});

// *** Watch properties ***
watch(showWatersheds, () => {
  console.log("showWatersheds: " + showWatersheds.value);
  togglePolygons();
});

// https://github.com/mapbox/mapbox-gl-js/issues/8660
// https://github.com/mapbox/mapbox-gl-js/issues/2267
// links above is for issues with layers and sources when toggling map styles
watch(mapStyle, () => {
  console.log('mapStyle.value " + mapStyle.value');
  if (mapStyle.value) {
    if (mapStyle.value === "raster") {
      map.setStyle("mapbox://styles/mapbox/satellite-streets-v12");
    } else {
      map.setStyle("mapbox://styles/mapbox/streets-v12");
    }
  }
});

// toggle between data source to display, shown as data type toggle on the map
watch(stationTypeGroup, () => {
  console.log("stationTypeOptions.value " + stationTypeGroup.value);
  if (stationTypeGroup.value) {
    // on data type toggle only remove if popup is for station type layers
    // otherwise if its polygons, the popup is tracked with isShowingPolygonPopUp to not remove it
    if (isShowingPolygonPopUp.value === false) {
      console.log("why not here?");
      removePopUps();
    } else {
      console.log("Strange");
      console.log(isShowingPolygonPopUp.value);
    }
    updateMarkersOnMap();
  }
});

//  *** Functions ***

// used to populate static data from foo json files
const getStations = () => {
  console.log(map);
  console.log("stations data!");
  // let's create two data sets for toggling between data types widget

  // call first one for water locations == locs
  let locations = {
    type: "FeatureCollection",
    features: [],
  };

  stations.forEach((s) => {
    let station = {
      type: "Feature",
      properties: {
        project: s.project,
        selected: false,
        code: s.code,
        name: s.name,
        id: s.id,
        latitude: s.latitude,
        longitude: s.longitude,
        huc12Name: s.huc12Name,
        huc6Name: s.huc6Name,
        cbseg2003: s.cbseg2003,
        cityCounty: s.cityCounty,
      },
      geometry: {
        type: "Point",
        coordinates: [s.longitude, s.latitude],
      },
      id: s.id,
    };
    locations.features.push(station);

    // console.log(s.project, s.id);
  });

  // we will call second one for benthic as locationsBenthic ==  locsBenthic
  let locationsBenthic = {
    type: "FeatureCollection",
    features: [],
  };

  stationsSecondSet.forEach((s) => {
    let station = {
      type: "Feature",
      properties: {
        project: s.State,
        selected: false,
        code: s.StationId,
        name: s.Name,
        id: s.StationId,
        latitude: s.Lat,
        longitude: s.Long,
        huc6Name: s.Huc6Name,
      },
      geometry: {
        type: "Point",
        coordinates: [s.Long, s.Lat],
      },
      id: s.id,
    };
    locationsBenthic.features.push(station);

    // console.log(s.project, s.id);
  });

  locsBenthic = locationsBenthic;
  locs = locations;
  createMap();
};

const createMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg";
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11",
    center: [-76.4, 37.8],
    zoom: 6.55,
  });
  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", () => {
    addStatesPolygons();
    updateMarkersOnMap();
  });
  // map.on('styledata', () => {
  //   console.log('A styledata event occurred.');
  // });
  // https://github.com/mapbox/mapbox-gl-js/issues/3979
  // link above is a hack for updating layers once map style changes
  map.on("style.load", () => {
    console.log("A styledata event occurred.");

    if (showWatersheds.value === true) {
      // re-add polygons in case check box was still on
      addStatesPolygons();
    }
    // re-add all the markers per whatever data type is selected
    updateMarkersOnMap();
  });
};

const togglePolygons = () => {
  if (showWatersheds.value === true) {
    console.log("should be showing the polygons for states");
    addStatesPolygons();
    updateMarkersOnMap();
  } else {
    console.log("should be hiding the polygons");
    removePolygons();
    removePopUps();
  }
};

// removes the layers associated with geojsons states polygons and removes source after
const removePolygons = () => {
  if (map.getSource("states")) {
    const layerForPolygon = "states-layer";
    const layerForPolygonOutline = "states-layer-outline";

    if (map.getLayer(layerForPolygonOutline)) {
      console.log("removing layer for layerForPolygonOutline");
      map.removeLayer(layerForPolygonOutline);
    }

    if (map.getLayer(layerForPolygon)) {
      console.log("removing layer for layerForPolygon");
      // map.off('click', 'states-layer', onClickPolygon);
      // map.off('mouseenter', 'states-layer')
      // map.off('mouseleave', 'states-layer')
      map.removeLayer(layerForPolygon);
    }

    // finally remove the source after removing layers and callbacks
    map.removeSource("states");
  }
};

// Add a data source containing GeoJSON data.
// https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
const addStatesPolygons = () => {
  if (!map.getSource("states")) {
    console.log("states exist already thats why we get an error!");
    // Add a source for the state polygons.
    map.addSource("states", {
      type: "geojson",
      data: "https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson",
    });

    // Add a clear layer showing that will be used for on click events
    map.addLayer({
      id: "states-layer",
      type: "fill",
      source: "states",
      paint: {
        "fill-color": "rgba(0, 0, 0, 0.0)",
        // 'fill-outline-color': 'rgba(200, 100, 240, 1)',
      },
    });
    // Add an outline layer that will be visible and will outline geojson states polygons
    map.addLayer({
      id: "states-layer-outline",
      type: "line",
      source: "states",
      paint: {
        "line-color": "rgba(200, 100, 0, 0.9)",
        "line-width": 3,
      },
    });

    if (isPolygonsClickEventSet.value === false) {
      isPolygonsClickEventSet.value = true;
      // When a click event occurs on a feature in the states layer,
      // open a popup at the location of the click, with description
      // HTML from the click event's properties.
      map.on("mouseenter", "states-layer", onMouseEnterEvent);
      map.on("mouseleave", "states-layer", onMouseLeaveEvent);
      map.on("click", "states-layer", (e) => {
        console.log("On click polygon event");
        removePopUps();
        const popup = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(map);

        // flag used to persist this pop up if data type changes as those pop ups need to be removed.
        isShowingPolygonPopUp.value = true;
        popup.on("close", () => {
          console.log("Why tho here? we set it false on close..");
          isShowingPolygonPopUp.value = false;
        });
      });
    }

    // map.on('click', 'states-layer', onClickPolygon)
  }
};

// Change the cursor to a pointer when
// the mouse is over the layer.
const onMouseEnterEvent = () => {
  map.getCanvas().style.cursor = "pointer";
};

// Change the cursor back to a pointer
// when it leaves the layer.
const onMouseLeaveEvent = () => {
  map.getCanvas().style.cursor = "";
};

// When a click event occurs on a feature in the states layer,
// open a popup at the location of the click, with description
// HTML from the click event's properties.
// const onClickPolygon = (e) => {
//   console.log(e)
//   console.log('On click polygon event');
//
//   removePopUps();
//   const popup = new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(e.features[0].properties.name)
//     .addTo(map);
//
//   // flag used to persist this pop up if data type changes as those pop ups need to be removed.
//   console.log("Why tho here?");
//   isShowingPolygonPopUp.value = true;
//   popup.on('close', () => {
//     isShowingPolygonPopUp.value = false
//   })
//   console.log("yoyoyoy testing foo");
// }

// checks per data type id and then loops over the data to find and remove each layer prior to removing the source
// used to clear out map on toggle of data source
const removeLayerAndSources = () => {
  if (map.getSource("water")) {
    console.log("remove water layer");

    locs.features.forEach((f) => {
      let project = f.properties["project"];
      let layerID = "poi-" + project;
      if (map.getLayer(layerID)) {
        map.removeLayer(layerID);
      }
    });
    map.removeSource("water"); // remove
  }

  if (map.getSource("benthic")) {
    console.log("remove benthic layer");

    locsBenthic.features.forEach((f) => {
      let project = f.properties["project"];
      let layerID = "poi-" + project;
      if (map.getLayer(layerID)) {
        map.removeLayer(layerID);
      }
    });
    map.removeSource("benthic"); // remove
  }
};

const onClickWaterLayer = (e) => {
  // // map.on('click', layerID, (e) => {
  // console.log("1 Click on layer. ");
  //
  // // const features = map.queryRenderedFeatures(e.point, {
  // //   layers: [layerID] // replace with your layer name
  // // });
  // // if (!features.length) {
  // //   return;
  // // }
  // // const feature = features[0];
  // // remove pop up before adding new one
  // removePopUps();
  //
  // // const popup = new mapboxgl.Popup({offset: [0, -15]})
  // //   .setLngLat(feature.geometry.coordinates)
  // //   .setHTML(
  // //     `<h3> Station </h3>
  // //    <p>${feature.properties.code} - ${feature.properties.name}</p>`
  // //   );
  // if (e.features[0].length) {
  //   console.log('here features length : ' + e.features[0].length)
  //   const popup = new mapboxgl.Popup()
  //     .setLngLat(e.lngLat)
  //     .setHTML(
  //       `<div>
  //               <p>${e.features[0].properties.code} - ${e.features[0].properties.name}</p>
  //               <button id='button-id'>View Details</button>
  //              </div>`
  //     );
  //   setTimeout(() => (
  //       document.getElementById('button-id').addEventListener('click', testFoo)),
  //     50
  //   );
  //   popup.addTo(map);
  //
  // } else {
  //   console.log('boooooooo');
  // }
  // // todo: check if i can create a pop up component with 1-btn in it, is there a way to get components raw html.
  //
  // // const popup = new mapboxgl.Popup({offset: [0, -15]})
  // //   .setLngLat(feature.geometry.coordinates)
  // //   .setHTML(
  // //     `<div>
  // //       <p>Some Text</p>
  // //       <q-btn  @click="alert('hello world')" >Button Title</q-btn>
  // //      </div>`
  // //   );
  //
  //
  // // popup.addTo(map);
  // // setupMouseEventListeners(layerID);
  // // });
};

const setupWaterData = (e) => {
  console.log("updateMarkersOnMap for water");
  map.addSource("water", {
    type: "geojson",
    data: locs,
  });

  map.getSource("water").setData(locs);

  let color = "#ff11f3";
  locs.features.forEach((f, index) => {
    let project = f.properties["project"];
    let layerID = "poi-" + project;

    if (project === "DFLO") {
      color = "#ff11f3";
    } else if (project === "CMON") {
      color = "#c19e00";
    } else if (project === "MAIN") {
      color = "#bf1f2f";
    } else if (project === "TRIB") {
      color = "#ff9933";
    } else if (project === "CBIB") {
      color = "#20c6b6";
    } else {
      color = "#9c51b6";
    }
    // Add a layer for this symbol type if it hasn't been added already.
    if (!map.getLayer(layerID)) {
      map.addLayer({
        id: layerID,
        type: "circle",
        source: "water",
        paint: {
          // 'circle-radius': 7,
          "circle-color": color,
          "circle-radius": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            22,
            7,
          ],
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": 0.5,
        },
        filter: ["==", "project", project],
      });

      // using a dictionary to keep track of layers with click events already attached
      if (!waterLayerIdsMap.has(layerID)) {
        console.log("Should only add once for this layer: " + layerID);
        waterLayerIdsMap.set(layerID, true);

        // setup on click event to show appropriate pop up
        map.on("click", layerID, (e) => {
          console.log("1 Click on layer: " + layerID);

          const features = map.queryRenderedFeatures(e.point, {
            layers: [layerID], // replace with your layer name
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];
          // remove pop up before adding new one
          removePopUps();

          const popup = new mapboxgl.Popup({ offset: [0, -10] })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div>
                <p>${feature.properties.code} - ${feature.properties.name}</p>
                <button id='button-id'>View Details</button>
               </div>`
            );
          setTimeout(
            () =>
              document
                .getElementById("button-id")
                .addEventListener("click", testFoo),
            50
          );

          // todo: check if i can create a pop up component with 1-btn in it, is there a way to get components raw html.
          popup.addTo(map);
          setupMouseEventListeners(layerID);
        });
      }
    }
  });
};

const setupBenthicData = () => {
  console.log("updateMarkersOnMap for benthic");
  map.addSource("benthic", {
    type: "geojson",
    data: locsBenthic,
  });
  map.getSource("benthic").setData(locsBenthic);

  let color = "#20c";

  locsBenthic.features.forEach((f, index) => {
    let project = f.properties["project"];
    let layerID = "poi-" + project;

    // Add a layer for this symbol type if it hasn't been added already.
    if (!map.getLayer(layerID)) {
      map.addLayer({
        id: layerID,
        type: "circle",
        source: "benthic",
        paint: {
          // 'circle-radius': 7,
          "circle-color": color,
          "circle-radius": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            22,
            7,
          ],
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": 0.5,
        },
        filter: ["==", "project", project],
      });

      // using a dictionary to keep track of layers with click events already attached
      if (!benthicLayerIdsMap.has(layerID)) {
        console.log(
          "benthicLayerIdsMap should only add once for this layer: " + layerID
        );
        benthicLayerIdsMap.set(layerID, true);

        // setup on click event to show appropriate pop up
        map.on("click", layerID, (e) => {
          console.log("2 Click on layer : " + layerID);
          const features = map.queryRenderedFeatures(e.point, {
            layers: [layerID], // replace with your layer name
          });

          if (!features.length) {
            return;
          }

          const feature = features[0];
          // remove pop up before adding new one
          removePopUps();

          const popupContent = `
              <div style="padding: 10px 20px 10px 20px">
                <div style="color: #075C7A; font-size: 1.95em; font-weight: 700;">
                  Station
                </div>
                <div style="margin-top: 10px; padding-left: 20px; font-size: 1.35em; font-weight: 400;">
                  WESBRABIGRUN1.89 - West Branch-Big Run
                </div>
                <div style="margin-top:10px; color: #075C7A; font-size: 1.95em; font-weight: 700;">
                  Monitored By
                </div>
                <div style="margin-top: 10px; padding-left: 20px; font-size: 1.35em; font-weight: 400;">
                  Centre County Pennsylvania Senior Environmental Corps
                </div>
                <div style="margin-top: 10px">
                  <button style="background-color: #075C7A; color: white; padding: 8px 10px 8px 10px; border: none; border-radius: 5px;">
                    View Station Details
                  </button>
                </div>
              </div>
            `;

          const popup = new mapboxgl.Popup({
            offset: [0, 0],
            maxWidth: "400px",
          })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(popupContent);

          popup.addTo(map);
          setupMouseEventListeners(layerID);
        });
      }
    }
  });
};

const updateMarkersOnMap = () => {
  console.log("updateMarkersOnMap");
  removeLayerAndSources();

  if (stationTypeGroup.value === "water") {
    setupWaterData();
  } else {
    // here show benthic foo static data from a station-richness-data json
    setupBenthicData();
  }
};

const testFoo = () => {
  console.log("testFoo clicked!");
};

const setupMouseEventListeners = (layerID) => {
  map.on("mouseenter", layerID, function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", layerID, function () {
    map.getCanvas().style.cursor = "";
  });
};

const removePopUps = () => {
  console.log("removePopUps");

  const popups = document.getElementsByClassName("mapboxgl-popup");
  if (popups.length) {
    popups[0].remove();
  }
};

onMounted(() => {
  getStations();
});
</script>

<style scoped>
.map-container {
  position: relative;
  //height: 100%;
}

.map-style {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 180px;
  top: 154px;
  left: 0px;
  padding: 4px;
}

.data-type-widget {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 180px;
  top: 0px;
  left: 0px;
  padding: 4px;
}

.map-overlay {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 180px;
  bottom: 0px;
  left: 0px;
  padding: 4px;
}

#map {
  //height: 70vh;
  height: 82vh;
}

.dot-green {
  height: 15px;
  width: 15px;
  background-color: #21ba45;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}

.dot-red {
  height: 15px;
  width: 15px;
  background-color: #e91e63;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}

.dot-yellow {
  height: 15px;
  width: 15px;
  background-color: #1b5e20;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
</style>
