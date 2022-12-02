<template>
  <div id="map"/>
  <div class="data-type-widget">
    <q-card class="my-card">
      <q-card-section >
        <p>Station Type</p>

        <q-option-group
          v-model="stationTypeGroup"
          :options="stationTypeOptions"
          color="primary"
        ></q-option-group>
      </q-card-section>
    </q-card>
  </div>
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

<!--  toggle raster or vector map style. Check uncheck to show polygon data-->
  <div class="map-style">
    <q-card class="my-card">
      <q-card-section >
        <q-option-group
          v-model="mapStyle"
          :options="mapStyleOptions"
          color="primary"
        ></q-option-group>

        <q-checkbox v-model="showWatersheds"> Watersheds</q-checkbox>

      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import {onMounted, reactive, ref, watch} from "vue";
import stations from '/src/assets/stations.json'
import stationsSecondSet from '/src/assets/station-richness-data.json'

let showWatersheds = ref(true);
// group of options to select to show map as aerial (raster) vs vector street map
let mapStyle = ref('vector');

let mapStyleOptions = ref([
  {
    label: 'Street Map',
    value: 'vector'
  },
  {
    label: 'Aerial',
    value: 'raster'
  }
]);

// group of options to select data type via radio toggle
let stationTypeGroup = ref('benthic');

 let stationTypeOptions = ref([
  {
    label: 'Benthic',
    value: 'benthic'
  },
  {
    label: 'Water Quality',
    value: 'water'
  }
]);

// locs static foo data for demo on markers
let locs = reactive({
  "type": "FeatureCollection",
  "features": []
});

// locs static foo data for demo on markers
let locsBenthic = reactive({
  "type": "FeatureCollection",
  "features": []
});

let selectedStation = reactive({})
let map = reactive({})

let updateStation = (station) => {
  selectedStation = station
}

watch(showWatersheds, () => {
  if (showWatersheds.value) {
    console.log('should be showing the polygon for Maine state');
    addStatesPolygons();
  } else {
    console.log('should be hiding the polygon for Maine state');
    removePolygons();
  }
});

watch(mapStyle, () => {
  console.log("mapStyle.value " + mapStyle.value );
  if (mapStyle.value) {
    if (mapStyle.value === 'raster') {
      map.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
    } else {
      map.setStyle('mapbox://styles/mapbox/streets-v12');
    }
    // map.setStyle('mapbox://styles/mapbox/'
    console.log("We selected different map style!");
  }
  updateMarkersOnMap();
});

watch(stationTypeGroup, () => {
  console.log("stationTypeOptions.value " + stationTypeGroup.value );
  if (stationTypeGroup.value) {
    updateMarkersOnMap("yoooooooooo test working!");

    console.log("We selected data type!");
  }
});

// ==================== Funcs below, todo: get a template for this project
// used to populate static data from foo json files
const getStations = () => {
  console.log(map);
  console.log("stations data!");
  // lets create too data sets for toggling between data types widget

  // call first one for water locations == locs
  let locations = {
    "type": "FeatureCollection",
    "features": []
  }

  stations.forEach(s => {
    let station = {
      "type": "Feature",
      "properties": {
        "project": s.project,
        "selected": false,
        "code": s.code,
        "name": s.name,
        "id": s.id,
        "latitude": s.latitude,
        "longitude": s.longitude,
        "huc12Name": s.huc12Name,
        "huc6Name": s.huc6Name,
        "cbseg2003": s.cbseg2003,
        "cityCounty": s.cityCounty
      },
      "geometry": {
        "type": "Point",
        "coordinates": [s.longitude, s.latitude]
      },
      "id": s.id
    }
    locations.features.push(station);

    // console.log(s.project, s.id);
  });

  // we will call second one for benthic as locationsBenthic ==  locsBenthic
  let locationsBenthic = {
    "type": "FeatureCollection",
    "features": []
  }

  stationsSecondSet.forEach(s => {
    let station = {
      "type": "Feature",
      "properties": {
        "project": s.State,
        "selected": false,
        "code": s.StationId,
        "name": s.Name,
        "id": s.StationId,
        "latitude": s.Lat,
        "longitude": s.Long,
        "huc6Name": s.Huc6Name,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [s.Long, s.Lat]
      },
      "id": s.id
    }
    locationsBenthic.features.push(station);

    // console.log(s.project, s.id);
  });

  locsBenthic = locationsBenthic
  locs = locations
  createMap()
};

const createMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg';
  map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-76.4, 37.8],
    zoom: 6.55
  });
  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', () => {
    populateMap();
    updateMarkersOnMap("yoooooooooo test working!");
  });

};

const populateMap = () => {
  // Add a data source containing GeoJSON data.
  // https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
  addStatesPolygons();
};
const removePolygons = () => {
  if (map.getSource("states")) {
    const layerForPolygon = 'states-layer';
      const layerForPolygonOutline = 'outline';

    if (map.getLayer(layerForPolygonOutline)) {
        map.removeLayer(layerForPolygonOutline);
      }

    if (map.getLayer(layerForPolygon)) {
      map.removeLayer(layerForPolygon);
    }
    map.removeSource('states');  // remove
  }
}

const addStatesPolygons = () => {
  // Add a source for the state polygons.
  map.addSource('states', {
    'type': 'geojson',
    'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
  });

// Add a layer showing the state polygons.
  map.addLayer({
    'id': 'states-layer',
    'type': 'fill',
    'source': 'states',
    'paint': {
      'fill-color': 'rgba(200, 100, 240, 0.4)',
      'fill-outline-color': 'rgba(200, 100, 240, 1)'
    }
  });

// When a click event occurs on a feature in the states layer,
// open a popup at the location of the click, with description
// HTML from the click event's properties.
  map.on('click', 'states-layer', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.name)
      .addTo(map);
  });

// Change the cursor to a pointer when
// the mouse is over the states layer.
  map.on('mouseenter', 'states-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

// Change the cursor back to a pointer
// when it leaves the states layer.
  map.on('mouseleave', 'states-layer', () => {
    map.getCanvas().style.cursor = '';
  });
};

// const addPolygons = () => {
//   map.addSource('maine', {
//     'type': 'geojson',
//     'data': {
//       'type': 'Feature',
//       'geometry': {
//         'type': 'Polygon',
// // These coordinates outline Maine.
//         'coordinates': [
//           [
//             [-67.13734, 45.13745],
//             [-66.96466, 44.8097],
//             [-68.03252, 44.3252],
//             [-69.06, 43.98],
//             [-70.11617, 43.68405],
//             [-70.64573, 43.09008],
//             [-70.75102, 43.08003],
//             [-70.79761, 43.21973],
//             [-70.98176, 43.36789],
//             [-70.94416, 43.46633],
//             [-71.08482, 45.30524],
//             [-70.66002, 45.46022],
//             [-70.30495, 45.91479],
//             [-70.00014, 46.69317],
//             [-69.23708, 47.44777],
//             [-68.90478, 47.18479],
//             [-68.2343, 47.35462],
//             [-67.79035, 47.06624],
//             [-67.79141, 45.70258],
//             [-67.13734, 45.13745]
//           ]
//         ]
//       }
//     }
//   });
//
// // Add a new layer to visualize the polygon.
//   map.addLayer({
//     'id': 'maine',
//     'type': 'fill',
//     'source': 'maine', // reference the data source
//     'layout': {},
//     'paint': {
//       'fill-color': '#0080ff', // blue color fill
//       'fill-opacity': 0.5
//     }
//   });
// // Add a black outline around the polygon.
//   map.addLayer({
//     'id': 'outline',
//     'type': 'line',
//     'source': 'maine',
//     'layout': {},
//     'paint': {
//       'line-color': '#000',
//       'line-width': 3
//     }
//   });
//
//   map.on('click', 'maine', (e) => {
//     const features = map.queryRenderedFeatures(e.point, {
//       layers: ['maine'] // replace with your layer name
//     });
//     if (!features.length) {
//       return;
//     }
//     const feature = features[0];
//     console.log("here is that feature!")
//     console.log(feature)
//     const popup = new mapboxgl.Popup({offset: [0, -15]})
//       .setLngLat(feature.geometry.coordinates[0])
//       .setHTML(
//         `<h3> Test </h3>
//              <p>Maine state polygon demo</p>`
//       )
//       .addTo(map);
//   });
//
//   map.on('mouseenter', 'maine', function () {
//     map.getCanvas().style.cursor = 'pointer';
//   });
//   map.on('mouseleave', 'maine', function () {
//     map.getCanvas().style.cursor = '';
//   });
// };

// checks per data type id and then loops over the data to find and remove each layer prior to removing the source
// used to clear out map on toggle of data source
const removeLayerAndSources = () => {
  if (map.getSource("water")) {
    locs.features.forEach((f) => {
      let project = f.properties['project'];
      let layerID = 'poi-' + project;
      if (map.getLayer(layerID)) {
        map.removeLayer(layerID);
      }
    });
    map.removeSource('water');  // remove
  }

  if (map.getSource("benthic")) {
    locsBenthic.features.forEach((f) => {
      let project = f.properties['project'];
      let layerID = 'poi-' + project;
      if (map.getLayer(layerID)) {
        map.removeLayer(layerID);
      }
    });
    map.removeSource('benthic');  // remove
  }
};

const updateMarkersOnMap = () => {
  console.log('updateMarkersOnMap');
  removeLayerAndSources();

  if (stationTypeGroup.value === 'water') {
    map.addSource("water", {
      "type": "geojson",
      "data": locs
    });

    map.getSource("water").setData(locs);

    let color = '#ff11f3'
    locs.features.forEach((f, index) => {
      let project = f.properties['project'];
      let layerID = 'poi-' + project;

      if (project === 'DFLO') {
        color = '#ff11f3'
      } else if (project === 'CMON') {
        color = '#c19e00'
      } else if (project === 'MAIN') {
        color = '#bf1f2f'
      } else if (project === 'TRIB') {
        color = '#ff9933'
      } else if (project === 'CBIB') {
        color = '#20c6b6'
      } else {
        color = '#9c51b6'
      }
      // Add a layer for this symbol type if it hasn't been added already.
      if (!map.getLayer(layerID)) {
        map.addLayer({
          "id": layerID,
          "type": 'circle',
          "source": "water",
          "paint": {
            // 'circle-radius': 7,
            'circle-color': color,
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              22,
              7
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.5
          },
          "filter": ["==", "project", project]
        });
      }

      map.on('click', layerID, (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [layerID] // replace with your layer name
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];
        console.log("here is that feature!")
        console.log(feature)
        const popup = new mapboxgl.Popup({offset: [0, -15]})
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3> Station </h3>
             <p>${feature.properties.code} - ${feature.properties.name}</p>`
          )
          .addTo(map);
      });

      map.on('mouseenter', layerID, function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', layerID, function () {
        map.getCanvas().style.cursor = '';
      });
    })
  } else { // here show benthic foo static data from a station-richness-data json
    map.addSource("benthic", {
      "type": "geojson",
      "data": locsBenthic
    });

    map.getSource("benthic").setData(locsBenthic);
    const setStation = () => {
      selectedStation = e.features[0].properties;
    }
    let  color = '#20c'

    locsBenthic.features.forEach((f, index) => {
      let project = f.properties['project'];
      let layerID = 'poi-' + project;

      // Add a layer for this symbol type if it hasn't been added already.
      if (!map.getLayer(layerID)) {
        console.log("adding layer with id here");
        console.log(layerID);
        map.addLayer({
          "id": layerID,
          "type": 'circle',
          "source": "benthic",
          "paint": {
            // 'circle-radius': 7,
            'circle-color': color,
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              22,
              7
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.5
          },
          "filter": ["==", "project", project]

        });
      }

      map.on('click', layerID, (e) => {
        console.log(`A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`);
        const features = map.queryRenderedFeatures(e.point, {
          layers: [layerID] // replace with your layer name
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];
        console.log("here is that feature!")
        console.log(feature)
        const popup = new mapboxgl.Popup({offset: [0, -15]})
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3> Station </h3>
             <p>${feature.properties.code} - ${feature.properties.name}</p>`
          )
          .addTo(map);
      });

      map.on('mouseenter', layerID, function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', layerID, function () {
        map.getCanvas().style.cursor = '';
      });
    })
  }

};


onMounted(() => {
  getStations();
})
</script>

<style scoped>
.map-style {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  top: 196px;
  left: 16px;
  padding: 20px;
}

.data-type-widget {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  top: 44px;
  left: 16px;
  padding: 20px;
}

.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  bottom: 38px;
  left: 16px;
  padding: 20px;
}

#map {
  height: 70vh;
}
.dot-green {
  height: 15px;
  width: 15px;
  background-color: #21BA45;
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
