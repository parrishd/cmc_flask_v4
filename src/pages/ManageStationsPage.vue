<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center stations-header">Manage Stations</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg text-center stations-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, elit et volutpat elementum.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Add New Station"
          text-color="white"
          @click="newStationButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Upload Bulk Stations"
          text-color="white"
          @click="uploadBulkButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Download Stations"
          text-color="white"
          @click="downloadButtonClick"
        />
      </div>
    </div>

    <div class="row q-mt-xl q-mx-xl q-px-xl">
      <div class="col q-pr-md">
        <q-input v-model="searchQuery" placeholder="Search Stations in Table" outlined />
      </div>
    </div>

    <div class="row q-mt-xl q-mx-xl q-px-xl">
      <ManageStationsTable />

      <div id="map" class="q-ml-auto q-mr-md"/>

    </div>

  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import ManageStationsTable from "components/ManageStationsTable.vue";
import {reactive, ref, onMounted} from "vue";
import mapboxgl from "mapbox-gl";

/*****************************
 * Lazy/Async components
 ****************************/
// lazy loaded components/imports here

/****************************
 * Emit Definitions
 ***************************/
// emits defined here

/****************************
 * Component Props
 ***************************/
// props defined here

/****************************
 * Local/'Use' Variables
 ***************************/
// local/use variables here

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here
let searchQuery = ref('');
let map = reactive({});

/****************************
 * Computed Properties
 ***************************/
// computed properties here

/***************************
 * Watched properties
 **************************/
// watched properties here

/****************************
 * Exposed/Interface Functions
 ***************************/
// exposed/interface functions here

/****************************
 * UI Functions
 ***************************/
// ui functions here
function newStationButtonClick() {
  console.log("new station button click");
}
function uploadBulkButtonClick() {
  console.log("upload bulk stations button click");
}
function downloadButtonClick() {
  console.log("download stations button click");
}

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
};

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
onMounted(() => {
  createMap();
});

</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.stations-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

#map {
  width: 40%;
  height: 400px;
}
</style>
