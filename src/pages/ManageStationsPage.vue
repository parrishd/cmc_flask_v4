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
    <input
      ref="fileInputRef"
      type="file"
      style="display: none"
      @change="handleFileChange"
    />

    <div class="row q-mt-xl q-mx-xl q-px-xl">
      <div class="col q-pr-md">
        <q-input v-model="searchQuery" placeholder="Search Stations in Table" outlined />
      </div>
    </div>

    <div class="row q-mt-xl q-mx-xl q-px-xl">
      <ManageStationsTable @edit-row="onEditRow" />

      <div id="map" class="q-ml-auto q-mr-md"/>
    </div>

    <AddStationForm v-model="addNewDialog" :visibile="addNewDialog" @update:visibile="val => (addNewDialog = val)" />
    <EditStationForm v-model="dialog" :station="selectedStation" :visibile="dialog" @update:visibile="val => (dialog = val)" />

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
import {exportFile} from "quasar";
import EditStationForm from "components/EditStationForm.vue";
import AddStationForm from "components/AddStationForm.vue";

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
const dialog = ref(false);
const addNewDialog = ref(false);
const selectedStation = ref(null);
const fileInputRef = ref(null);

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
  addNewDialog.value = true;
}
function uploadBulkButtonClick() {
  console.log("upload bulk stations button click");
  fileInputRef.value.click();
}

function handleFileChange() {
  const selectedFile = event.target.files[0];
  console.log("Selected File:", selectedFile);
}

const onEditRow = (row) => {
  selectedStation.value = row;
  dialog.value = true;
}

const columns = [
  { name: "name", label: "Stations Table Data" },
];
const rows = [
  { name: "Station One" },
];

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

const downloadButtonClick = () => {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))].concat(
    rows.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[ col.field === void 0 ? col.name : col.field ],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
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
