<template>
  <div id="map" />
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import { onMounted} from "vue";

const showMap = () => {
  console.log("Shows map woot woot!");
  mapboxgl.accessToken = 'pk.eyJ1IjoibXlha2F2ZW5rYSIsImEiOiJjbDlxMDJrNmcwMmE2M3dxeDYyZWE0OWQ0In0.dKzXgJu-ZUH3epnFzxvllg';


  const map = new mapboxgl.Map({
    container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-121.403732, 40.492392],
    zoom: 10
  });

  map.on('load', () => {
    map.addSource('national-park', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                [
                  [-121.353637, 40.584978],
                  [-121.284551, 40.584758],
                  [-121.275349, 40.541646],
                  [-121.246768, 40.541017],
                  [-121.251343, 40.423383],
                  [-121.32687, 40.423768],
                  [-121.360619, 40.43479],
                  [-121.363694, 40.409124],
                  [-121.439713, 40.409197],
                  [-121.439711, 40.423791],
                  [-121.572133, 40.423548],
                  [-121.577415, 40.550766],
                  [-121.539486, 40.558107],
                  [-121.520284, 40.572459],
                  [-121.487219, 40.550822],
                  [-121.446951, 40.56319],
                  [-121.370644, 40.563267],
                  [-121.353637, 40.584978]
                ]
              ]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-121.415061, 40.506229]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-121.505184, 40.488084]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-121.354465, 40.488737]
            }
          }
        ]
      }
    });

    map.addLayer({
      'id': 'park-boundary',
      'type': 'fill',
      'source': 'national-park',
      'paint': {
        'fill-color': '#888888',
        'fill-opacity': 0.4
      },
      'filter': ['==', '$type', 'Polygon']
    });

    map.addLayer({
      'id': 'park-volcanoes',
      'type': 'circle',
      'source': 'national-park',
      'paint': {
        'circle-radius': 6,
        'circle-color': '#B42222'
      },
      'filter': ['==', '$type', 'Point']
    });
  })

  // const map = new mapboxgl.Map({
  //   container: 'map', // container ID
  //   style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
  //   projection: 'globe' // display the map as a 3D globe
  // });
  // const marker1 = new mapboxgl.Marker()
  //   .setLngLat([12.554729, 55.70651])
  //   .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
//   const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
//     .setLngLat([-76.3230560000, 39.3030560000])
//     .addTo(map);
//    if (map != null) {
//      console.log("map does exist...");

     // map.on('style.load', () => {
       // map.setFog({}); // Set the default atmosphere style
       // map.addSource("usa", {
       //   type: "geojson",
       //   data:
       //     "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json",
       // });
       // map.addLayer({
       //   id: "usa-fill",
       //   type: "fill",
       //   source: "usa",
       //   paint: {
       //     "fill-color": "red",
       //   },
       // });
   //     map.on("click", "usa-fill", function (e) {
   //       new mapboxgl.Popup()
   //         .setLngLat(e.lngLat)
   //         .setHTML('Hello World.')
   //         .addTo(map);
   //     });
   //
   //
   //   });
   // } else {
   //   console.log("map doesnt exist :(");
   // }
};

  onMounted( () => {
    showMap();
})
</script>

<style scoped>
#map {
  height: 70vh;
}
</style>
