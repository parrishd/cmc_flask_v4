<template>
  <div class="map-container">
    <!-- MapBox GL JS instance -->

    <div
      :id="
        Object.prototype.hasOwnProperty.call(mapOptions, 'container')
          ? mapOptions.container
          : 'map'
      "
    ></div>
    <div v-if="showLegend">
      <!--
      <div class="map-overlay">
        <q-card class="my-card">
          <q-card-section>
            <q-list>
              <p>Sampling Status</p>

              <p>
                <span class="dot-purple"></span>
                &nbsp;Current
              </p>

              <p>
                <span class="dot-gray"></span>
                &nbsp;Historic
              </p>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      -->

      <!-- toggle raster or vector map style. Check uncheck to show polygon data-->
      <div class="legend-style">
        <q-card class="my-card">
          <q-card-section>
            <div style="font-size: 16px" large>Data Layers</div>
            <q-checkbox v-model="showStations" class="q-mt-sm">
              {{ selectedDataType }}</q-checkbox
            >
            <!--add padding to left of this div-->
            <div style="padding-left: 30px; padding-top: 5px">
              <p>
                <span
                  :class="{
                    'dot-purple': selectedDataType == 'Water Quality',
                    'dot-orange': selectedDataType != 'Water Quality',
                  }"
                ></span>
                &nbsp;Active Sites
              </p>

              <p>
                <span class="dot-gray"></span>
                &nbsp;Inactive Sites
              </p>
            </div>
            <div class="row" v-show="selectedGeoType == 'Watershed'">
              <q-checkbox v-model="showPolygon1">
                Watersheds (HUC 8)</q-checkbox
              >
            </div>
            <div class="row" v-show="selectedGeoType == 'Watershed'">
              <q-checkbox v-model="showPolygon2">
                SubWatersheds (HUC 12)</q-checkbox
              >
            </div>
            <div class="row" v-show="selectedGeoType !== 'Watershed'">
              <q-checkbox v-model="showPolygon1"> States</q-checkbox>
            </div>
            <div class="row" v-show="selectedGeoType !== 'Watershed'">
              <q-checkbox v-model="showPolygon2"> Counties</q-checkbox>
            </div>
          </q-card-section>
          <q-card-section>
            <div style="font-size: 16px" large>Basemap</div>
            <q-option-group
              class="q-mt-sm"
              v-model="mapStyle"
              :options="mapStyleOptions"
              color="primary"
            ></q-option-group>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import counties from "../assets/spatial/counties_simple.json";
import states from "../assets/spatial/states_simple.json";
import huc8 from "../assets/spatial/huc8_simple.json";
import huc12 from "../assets/spatial/huc12_simple.json";
import { onMounted, reactive, ref, watch, toRefs, onUnmounted } from "vue";
import { data } from "autoprefixer";

// *** Component Props ***
const props = defineProps([
  "mapData",
  "mapOptions",
  "showLegend",
  "collapsed",
  "selectedDataType",
  "selectedGeoType",
]);
const { mapData } = toRefs(props);
const { mapOptions } = toRefs(props);
const { showLegend } = toRefs(props);
const { collapsed } = toRefs(props);
const { selectedDataType } = toRefs(props);
const { selectedGeoType } = toRefs(props);
const DataTypeSwitched = ref(false);
const currentStyle = ref("mapbox://styles/mapbox/streets-v9");

const emit = defineEmits(["selectedStation"]);

// *** Variables and constants ***

// instance of MapBox GL JS
let map = reactive({});

// shows hides polygons that represent 50 states per foo geojson file
let showPolygon1 = ref(true);
let showPolygon2 = ref(false);
let showStations = ref(true);

// used to persist the polygons layer pop up in case we toggle data type
//let isShowingPolygonPopUp = ref(false);

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

// locs static foo data for demo on markers
let locs = reactive({
  type: "FeatureCollection",
  features: [],
});

// *** Watch properties ***
watch(mapData, () => {
  if (mapData.value.length > 0) {
    removePopUps();
    getStations();
  } else {
    removeStations();
  }
});

if (showLegend.value === true) {
  watch(collapsed, () => {
    console.log("collapsed: " + collapsed.value);

    setTimeout(() => (map.resize(), 50));
  });
}

watch(showPolygon1, () => {
  togglePolygon1();
});

watch(showPolygon2, () => {
  togglePolygon2();
});

watch(showStations, () => {
  toggleStations();
});

watch(selectedGeoType, () => {
  togglePolygon1();
  togglePolygon2();
});
watch(selectedDataType, () => {
  console.log("dataTypeSwitched1: " + DataTypeSwitched.value);
  DataTypeSwitched.value = true;
  console.log("dataTypeSwitched1: " + DataTypeSwitched.value);
  //toggleStations();
});

// https://github.com/mapbox/mapbox-gl-js/issues/8660
// https://github.com/mapbox/mapbox-gl-js/issues/2267
// links above is for issues with layers and sources when toggling map styles
watch(mapStyle, () => {
  DataTypeSwitched.value = true;
  if (mapStyle.value) {
    if (mapStyle.value === "raster") {
      //map.setStyle("mapbox://styles/mapbox/satellite-streets-v12");

      getStations("aerial");
    } else {
      getStations("streets");
      //map.setStyle("mapbox://styles/mapbox/streets-v12");
    }
  }
});

//  *** Functions ***

// used to populate static data from foo json files
const getStations = (base) => {
  if (mapData.value) {
    let locations = {
      type: "FeatureCollection",
      features: [],
    };
    let color = "#F09300";
    if (selectedDataType.value == "Water Quality") {
      color = "#990799";
    }
    mapData.value.forEach((s) => {
      let station = {
        type: "Feature",
        properties: {
          selected: false,
          code: s.StationCode,
          nameLong: s.StationName,
          groupNames: s.GroupNames,
          id: s.StationId,
          latitude: s.Lat,
          longitude: s.Long,
          status: s.Status,
          startDate: s.formattedStartDate,
          endDate: s.formattedEndDate,
          watershed: s.Subwatershed,
          color: s.Status === "Current" ? color : "#5A5A5A",
        },
        geometry: {
          type: "Point",
          coordinates: [s.Long, s.Lat],
        },
        id: s.id,
      };
      locations.features.push(station);
    });
    locs = locations;
    console.log("here is the map", Object.keys(map).length);
    let zoom = 10;
    let center = [-77.636161, 39.77338];
    let style = "mapbox://styles/mapbox/streets-v9";
    if (Object.keys(map).length > 0) {
      zoom = map.getZoom();
      center = map.getCenter();
      style = currentStyle.value;
    }
    if (base === "aerial") {
      style = "mapbox://styles/mapbox/satellite-streets-v12";
    } else if (base === "streets") {
      style = "mapbox://styles/mapbox/streets-v9";
    }

    createMap(zoom, center, style);
  }
};

const createMap = (zoom, center, style) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg";
  mapOptions.value.zoom = zoom;
  mapOptions.value.center = center;
  mapOptions.value.style = style; // "mapbox://styles/mapbox/streets-v12";
  currentStyle.value = style;
  map = new mapboxgl.Map(mapOptions.value);

  map.addControl(new mapboxgl.NavigationControl());

  map.on("style.load", () => {
    if (showPolygon1.value === true) {
      // re-add polygons in case check box was still on
      addPolygon1();
    }
    if (showPolygon2.value === true) {
      // re-add polygons in case check box was still on
      addPolygon2();
    }
    // re-add all the markers per whatever data type is selected
    updateMarkersOnMap();
  });
};

const togglePolygon1 = () => {
  removePopUps();
  if (showPolygon1.value === true) {
    DataTypeSwitched.value = true;
    addPolygon1();
    updateMarkersOnMap();
  } else {
    removePolygon1();
    removePopUps();
  }
};
const togglePolygon2 = () => {
  removePopUps();
  if (showPolygon2.value === true) {
    DataTypeSwitched.value = true;
    addPolygon2();
    updateMarkersOnMap();
  } else {
    removePolygon2();
    removePopUps();
  }
};

const toggleStations = () => {
  removePopUps();
  if (showStations.value === true) {
    setupStationsOnMap();
  } else {
    removeStations();
  }
};

// removes the layers associated with geojsons states polygons and removes source after
const removePolygon1 = () => {
  if (map.getSource("polygon1")) {
    const layer = "polygon1";
    const layerForPolygon = "polygon1-layer";
    const layerForPolygonOutline = "polygon1-layer-outline";

    if (map.getLayer(layerForPolygonOutline)) {
      map.removeLayer(layerForPolygonOutline);
    }

    if (map.getLayer(layerForPolygon)) {
      // map.off('click', 'states-layer', onClickPolygon);
      // map.off('mouseenter', 'states-layer')
      // map.off('mouseleave', 'states-layer')
      map.removeLayer(layerForPolygon);
    }

    // finally remove the source after removing layers and callbacks
    map.removeSource(layer);
  }
};

// removes the layers associated with geojsons states polygons and removes source after
const removePolygon2 = () => {
  if (map.getSource("polygon2")) {
    const layer = "polygon2";
    const layerForPolygon = "polygon2-layer";
    const layerForPolygonOutline = "polygon2-layer-outline";

    if (map.getLayer(layerForPolygonOutline)) {
      map.removeLayer(layerForPolygonOutline);
    }

    if (map.getLayer(layerForPolygon)) {
      // map.off('click', 'states-layer', onClickPolygon);
      // map.off('mouseenter', 'states-layer')
      // map.off('mouseleave', 'states-layer')
      map.removeLayer(layerForPolygon);
    }

    // finally remove the source after removing layers and callbacks
    map.removeSource(layer);
  }
};

// Add a data source containing GeoJSON data.
// https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
const addPolygon1 = () => {
  let polygons = states;
  if (selectedGeoType.value === "Watershed") {
    polygons = huc8;
  }
  if (map.getSource("polygon1")) {
    removePolygon1();
  }
  map.addSource("polygon1", {
    type: "geojson",
    data: polygons,
  });

  // Add a clear layer showing that will be used for on click events
  map.addLayer({
    id: "polygon1-layer",
    type: "fill",
    source: "polygon1",
    paint: {
      "fill-color": "rgba(0, 0, 0, 0.0)",
      // 'fill-outline-color': 'rgba(200, 100, 240, 1)',
    },
  });

  // Add an outline layer that will be visible and will outline geojson states polygons
  map.addLayer({
    id: "polygon1-layer-outline",
    type: "line",
    source: "polygon1",
    paint: {
      "line-color": "rgba(7, 153, 153, 0.9)",
      "line-width": 3,
    },
  });
  // When a click event occurs on a feature in the states layer,
  // open a popup at the location of the click, with description
  // HTML from the click event's properties.
  map.on("mouseenter", "polygon1-layer", onMouseEnterEvent);
  map.on("mouseleave", "polygon1-layer", onMouseLeaveEvent);
  map.on("click", "polygon1-layer", (e) => {
    map.fire("closeAllStationsPopups");
    map.fire("closeAllPolygonPopups");
    let polyName = e.features[0].properties.STATE_NAME;
    if (selectedGeoType.value === "Watershed") {
      polyName =
        e.features[0].properties.ACTNAME +
        " (" +
        e.features[0].properties.HUC8 +
        ")";
    }
    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(polyName)
      .addTo(map);
    map.on("closeAllPolygonPopups", () => {
      popup.remove();
    });
    //map.fire("closeAllPolygonPopups");
  });
};
// Add a data source containing GeoJSON data.
// https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
const addPolygon2 = () => {
  let polygons = counties;
  if (selectedGeoType.value === "Watershed") {
    polygons = huc12;
  }
  if (map.getSource("polygon2")) {
    ("removing polygon2 layer and source");
    removePolygon2();
  }
  map.addSource("polygon2", {
    type: "geojson",
    data: polygons,
  });

  // Add a clear layer showing that will be used for on click events
  map.addLayer({
    id: "polygon2-layer",
    type: "fill",
    source: "polygon2",
    paint: {
      "fill-color": "rgba(0, 0, 0, 0.0)",
      // 'fill-outline-color': 'rgba(200, 100, 240, 1)',
    },
  });

  // Add an outline layer that will be visible and will outline geojson states polygons
  map.addLayer({
    id: "polygon2-layer-outline",
    type: "line",
    source: "polygon2",
    paint: {
      "line-color": "rgba(7, 153, 153, 0.9)",
      "line-width": 1,
    },
  });

  // When a click event occurs on a feature in the states layer,
  // open a popup at the location of the click, with description
  // HTML from the click event's properties.
  map.on("mouseenter", "polygon2-layer", onMouseEnterEvent);
  map.on("mouseleave", "polygon2-layer", onMouseLeaveEvent);
  map.on("click", "polygon2-layer", (e) => {
    map.fire("closeAllStationsPopups");
    map.fire("closeAllPolygonPopups");
    let polyName = e.features[0].properties.NAMELSAD20;
    if (selectedGeoType.value === "Watershed") {
      polyName =
        e.features[0].properties.NAME +
        " (" +
        e.features[0].properties.HUC12 +
        ")";
    }
    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(polyName)
      .addTo(map);
    map.on("closeAllPolygonPopups", () => {
      popup.remove();
    });
  });
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

// checks per data type id and then loops over the data to find and remove each layer prior to removing the source
// used to clear out map on toggle of data source
const removeStations = () => {
  if (map.getSource("stations")) {
    map.removeLayer("places");
    map.removeSource("stations"); // remove
  }
};

function stationDetailsClicked(station) {
  emit("selectedStation", station);
}

const setupStationsOnMap = () => {
  if (locs.features.length === 0) {
    return;
  }
  if (Object.keys(map).length === 0) {
    return;
  }
  if (map.getSource("stations")) {
    removeStations();
  }
  map.addSource("stations", {
    type: "geojson",
    data: locs,
  });
  map.getSource("stations").setData(locs);

  console.log("dataTypeSwitched: " + DataTypeSwitched.value);
  if (DataTypeSwitched.value === true) {
    DataTypeSwitched.value = false;
  } else {
    let minLong = 0;
    let maxLong = -100;
    let minLat = 40;
    let maxLat = 30;
    locs.features.forEach((f, index) => {
      if (f.properties["longitude"] < minLong) {
        minLong = f.properties["longitude"];
      }
      if (f.properties["latitude"] < minLat) {
        minLat = f.properties["latitude"];
      }
      if (f.properties["longitude"] > maxLong) {
        maxLong = f.properties["longitude"];
      }
      if (f.properties["latitude"] > maxLat) {
        maxLat = f.properties["latitude"];
      }
    });
    //console log time stamp

    //if (showLegend.value === true) {
    let centerLat = (minLat + maxLat) / 2; // + 1.8;
    let centerLong = (minLong + maxLong) / 2;
    let centerCoordinates = { lng: centerLong, lat: centerLat };
    map.setCenter(centerCoordinates);

    let max_bound =
      Math.max(Math.abs(minLong - maxLong), Math.abs(minLat - maxLat)) * 111;
    let zoom = 12.1 - Math.log(max_bound);
    map.setZoom(zoom);
  }
  let locColor = "#990799";
  if (selectedDataType.value === "Benthic Macroinvertebrates") {
    locColor = "#F09300";
  }
  map.addLayer({
    id: "places",
    type: "circle",
    source: "stations",
    paint: {
      // 'circle-radius': 7,
      "circle-color": [
        "match",
        ["get", "status"], // get the property
        "Historic",
        "#5A5A5A", // if 'GP' then yellow
        "Current",
        locColor, // if 'XX' then black
        "white",
      ], // white otherwise
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        22,
        7,
      ],
      "circle-stroke-color": "white",
      "circle-stroke-width": 1,
      "circle-opacity": 0.8,
    },
  });
  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "places", (e) => {
    // Copy coordinates array.
    map.fire("closeAllPolygonPopups");
    map.fire("closeAllStationPopups");
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.id;
    const feature = e.features[0];

    const stationDetails = {
      code: feature.properties.code,
      groupNames: feature.properties.groupNames,
      id: feature.properties.id,
      latitude: feature.properties.latitude,
      longitude: feature.properties.longitude,
      status: feature.properties.status,
      startDate: feature.properties.startDate,
      endDate: feature.properties.endDate,
      color: feature.properties.color,
      nameLong: feature.properties.nameLong,
      watershed: feature.properties.watershed,
    };
    const innerHtmlContent = `
        <div class="row q-mt-md" style=''>
        <div class="col">
          <div class="row q-py-md q-px-lg map-details-header">
            <div class="col-2">
              <q-icon
                class="fa-solid fa-location-dot"
                style="font-size:70px; color: ${feature.properties.color};"
              />
            </div>
            <div class="col-10">

              <div
                class="map-details-header-text-1 q-ml-md"

              >
                 ${feature.properties.code}
              </div>

               <div
                class="map-details-header-text-2 q-ml-md"

              >
                 ${feature.properties.groupNames}
              </div>
               <br/>
              <div
                class="map-details-header-text-2 q-ml-md"
              >
                 ${feature.properties.latitude.toFixed(
                   3
                 )}, ${feature.properties.longitude.toFixed(3)}
              </div>
              <div
                class="map-details-header-text-2 q-ml-md"

              >
               ${feature.properties.startDate} - ${feature.properties.endDate}

              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    const divElement = document.createElement("div");
    const assignBtn = document.createElement("div");
    assignBtn.innerHTML = ` <button class='q-mt-sm' style="background-color: #075C7A;cursor:pointer; color: white; padding: 8px 10px 8px 10px; border: none; border-radius: 5px;">
              View Station Details
            </button>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(assignBtn);

    assignBtn.addEventListener("click", () => {
      stationDetailsClicked(stationDetails);
    });

    const popup = new mapboxgl.Popup({
      offset: [0, 0],
      maxWidth: "400px",
    })
      .setLngLat(feature.geometry.coordinates)
      .setDOMContent(divElement);

    // Add a custom event listener to the map
    map.on("closeAllStationPopups", () => {
      popup.remove();
    });
    popup.addTo(map);
    //setupMouseEventListeners(layerID);

    //new mapboxgl.Popup().setLngLat(coordinates).setHTML(divElement).addTo(map);
  });
  //}

  if (showStations.value === false) {
    removeStations();
  }
};

const updateMarkersOnMap = () => {
  console.log("updateMarkersOnMap");
  removeStations();

  console.log("*** data setup after update***");
  setupStationsOnMap();
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
  map.fire("closeAllPolygonPopups");
  map.fire("closeAllStationPopups");
};

onMounted(() => {
  getStations();
});
onUnmounted(() => {
  console.log("unmounted");
  map.remove();
});
</script>

<style scoped>
.map-container {
  position: relative;
}

.legend-style {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 220px;
  top: 5px; /* 154px if want to adjust below data type widget */
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
  height: 640px; /* 82vh if want %height */
}

#map1 {
  height: 450px;
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
.dot-blue-green {
  height: 15px;
  width: 15px;
  background-color: #0c9482;
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

.dot-orange {
  height: 15px;
  width: 15px;
  background-color: #f09300;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}

.dot-purple {
  height: 15px;
  width: 15px;
  background-color: #990799;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}

.dot-gray {
  height: 15px;
  width: 15px;
  background-color: #5a5a5a;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
</style>
