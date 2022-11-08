<template>
  <div id="map"/>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import {onMounted, reactive} from "vue";
import stations from '/src/assets/stations.json'


let locs = reactive({
  "type": "FeatureCollection",
  "features": []
});

let selectedStation = reactive({})
let map = reactive({})

let updateStation = (station) => {
  selectedStation = station
}

const getStations = () => {
  console.log(map);
  console.log("stations data!");
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
  locs = locations
  createMap()
}

const createMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg';
  map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-76.4, 37.8],
    zoom: 6.55
  });
  map.addControl(new mapboxgl.NavigationControl());
  map.on("load", function () {
    map.addSource("places", {
      "type": "geojson",
      "data": locs
    });
    updateStationsOnMap("yoooooooooo test working!")
  });
}

const updateStationsOnMap = () => {
  map.getSource("places").setData(locs);
  const setStation = () => {
    selectedStation = e.features[0].properties;
  }
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
      console.log("adding layer with id here");
      console.log(layerID);
      map.addLayer({
        "id": layerID,
        "type": 'circle',
        "source": "places",
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


// const showMap = () => {
//   mapboxgl.accessToken = 'pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg';
//
//   const map = new mapboxgl.Map({
//     container: 'map',
// // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//     style: 'mapbox://styles/mapbox/outdoors-v11',
//     center: [-121.403732, 40.492392],
//     zoom: 10
//   });
//
//   map.on('load', () => {
//     map.addSource('national-park', {
//       'type': 'geojson',
//       'data': {
//         'type': 'FeatureCollection',
//         'features': [
//           {
//             'type': 'Feature',
//             'geometry': {
//               'type': 'Polygon',
//               'coordinates': [
//                 [
//                   [-121.353637, 40.584978],
//                   [-121.284551, 40.584758],
//                   [-121.275349, 40.541646],
//                   [-121.246768, 40.541017],
//                   [-121.251343, 40.423383],
//                   [-121.32687, 40.423768],
//                   [-121.360619, 40.43479],
//                   [-121.363694, 40.409124],
//                   [-121.439713, 40.409197],
//                   [-121.439711, 40.423791],
//                   [-121.572133, 40.423548],
//                   [-121.577415, 40.550766],
//                   [-121.539486, 40.558107],
//                   [-121.520284, 40.572459],
//                   [-121.487219, 40.550822],
//                   [-121.446951, 40.56319],
//                   [-121.370644, 40.563267],
//                   [-121.353637, 40.584978]
//                 ]
//               ]
//             }
//           },
//           {
//             'type': 'Feature',
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-121.415061, 40.506229]
//             }
//           },
//           {
//             'type': 'Feature',
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-121.505184, 40.488084]
//             }
//           },
//           {
//             'type': 'Feature',
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-121.354465, 40.488737]
//             }
//           }
//         ]
//       }
//     });
//
//     map.addLayer({
//       'id': 'park-boundary',
//       'type': 'fill',
//       'source': 'national-park',
//       'paint': {
//         'fill-color': '#888888',
//         'fill-opacity': 0.4
//       },
//       'filter': ['==', '$type', 'Polygon']
//     });
//
//     map.addLayer({
//       'id': 'park-volcanoes',
//       'type': 'circle',
//       'source': 'national-park',
//       'paint': {
//         'circle-radius': 6,
//         'circle-color': '#B42222'
//       },
//       'filter': ['==', '$type', 'Point']
//     });
//   })
// };

onMounted(() => {
  getStations();
})
</script>

<style scoped>
#map {
  height: 70vh;
}
</style>
