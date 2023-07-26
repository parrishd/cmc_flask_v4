<template>
  <q-page class="q-px-xl q-mx-xl">
    <!-- stats bar -->
    <div class="row q-mt-lg viewing-stats">
      <div class="col-2">Currently Viewing:</div>
      <div class="col">
        <q-icon class="fa-solid fa-file-lines q-mr-sm" size="32px" />
        673 Water Samples
      </div>
      <div class="col q-ml-md">
        <q-icon class="fa-solid fa-building q-mr-sm" size="32px" />
        43 Organizations
      </div>
      <div class="col q-ml-md">
        <q-icon class="fa-solid fa-location-dot" size="32px" />
        137 Stations
      </div>
      <div class="col text-right">
        <q-icon class="fa-solid fa-circle-info" size="18px" />
      </div>
    </div>

    <!-- map/form -->
    <div class="row q-mt-lg">
      <!-- map -->
      <div class="col-8">
        <MapBox />
      </div>

      <!-- form -->
      <div class="col-4 q-px-md">
        <div class="row">
          <div class="col">
            <q-icon class="fa-solid fa-arrow-right" size="24px" />
          </div>
          <div class="col text-right">
            <q-icon class="fa-solid fa-circle-info" size="18px" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col">
            <q-select label="Data Type" outlined dense></q-select>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col">
            <q-select label="Geographical Type" outlined dense></q-select>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col">
            <q-select
              label="States (pick all that apply)"
              outlined
              dense
            ></q-select>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col">
            <q-select
              label="City/County (pick all that apply)"
              outlined
              dense
            ></q-select>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col">
            <q-select
              label="Groups (pick all that apply)"
              outlined
              dense
            ></q-select>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col">
            <q-select
              label="Stations (pick all that apply)"
              outlined
              dense
            ></q-select>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col">
            <q-select
              label="Parameters (pick all that apply)"
              outlined
              dense
            ></q-select>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-6 q-pr-xs">
            <q-select label="Start Date" outlined dense></q-select>
          </div>
          <div class="col-6 q-pl-xs">
            <q-select label="End Date" outlined dense></q-select>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col">
            Choose optional metadata to include with download
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6">
            <q-checkbox v-model="optionalMetaGroups" label="Groups" />
          </div>
          <div class="col-6">
            <q-checkbox v-model="optionalMetaStations" label="Stations" />
          </div>
          <div class="col-6">
            <q-checkbox v-model="optionalMetaParams" label="Parameters" />
          </div>
          <div class="col-6">
            <q-checkbox
              v-model="optionalMetaCalibration"
              label="Calibration Samples"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">Please acknowledge data use prior to download:</div>
        </div>

        <div class="row">
          <div class="col" style="max-width: 40px">
            <q-checkbox v-model="dataUseAcknowledgment" />
          </div>
          <div class="col q-pt-xs text-caption">
            I as the data user acknowledge that the data belong to the original
            data provider and will properly credit the data provider(s) in any
            product that uses their data.
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col text-center">
            <q-btn label="Clear Filters" style="width: 90%" />
          </div>
          <div class="col text-center">
            <q-btn label="Get Results" style="width: 90%" />
          </div>
        </div>
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-separator />
      </div>
    </div>

    <!-- results -->
    <div class="row q-py-lg q-px-md results-title">
      <div class="col title-font">Data Explorer Results</div>
      <div class="col-4 q-px-lg text-right">
        <q-input outlined dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col text-center" style="max-width: 48px">
        <q-icon class="fa-solid fa-sliders" size="24px" />
      </div>
      <div class="col text-center" style="max-width: 48px">
        <q-icon class="fa-solid fa-circle-info" size="24px" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-table :rows="rows" :columns="columns" row-key="id" flat bordered />
      </div>
    </div>

    <!-- selected data details -->
    <div class="row q-mt-xl result-details-container">
      <div class="col">
        <!-- header -->
        <div class="row q-py-md q-px-lg result-details-header">
          <div class="col-1">
            <q-icon class="fa-solid fa-location-dot" size="64px" />
          </div>
          <div class="col">
            <div class="result-details-header-text-1">
              WESBRABIGRUN1.89 - West Branch-Big Run
            </div>
            <div class="result-details-header-text-2">
              Monitored by: Centre County Pennsylvania Senior Environmental
              Corps
            </div>
          </div>
          <div class="col-1 text-right">
            <q-icon class="fa-solid fa-circle-info" size="24px" />
          </div>
        </div>

        <!-- details -->
        <div class="row q-mt-md">
          <!-- details info -->
          <div class="col-9 q-pr-xl">
            <div class="row">
              <div class="col">
                Use the Water Quality or Benthic Macroinvertebrates buttons to
                select the type of data you want to view for this station. Click
                a Quick Plots option to choose commonly viewed water quality
                data types. Click Export Plot to download the graph. Click
                Download Data to be taken to a data query page for this station.
              </div>
            </div>

            <div class="row q-mt-lg">
              <div class="col">
                <q-btn label="View All Results" />
                <!--              <q-btn label="View All Results" />-->
              </div>
            </div>

            <div class="row q-mt-lg">
              <div class="col">
                <div class="text-subtitle1 text-bold">Quick Plots</div>
                <div class="text-subtitle1">
                  pH SU | Dissolved oxygen mg/L | Water temperature deg C
                </div>
              </div>
            </div>

            <div class="row q-mt-lg">
              <div class="col">
                <div class="text-subtitle1 text-bold">
                  Water Quality Parameters
                </div>
                <div class="q-mt-sm">
                  <q-btn label="Export Plot" class="q-mr-lg" />
                  <q-btn label="Download Data" />
                </div>
              </div>
            </div>

            <div class="row q-mt-lg">
              <div class="col-6 q-pr-md">
                <q-select label="Salinity Plots" outlined dense />
              </div>
              <div class="col-6 q-pl-md">
                <q-select label="Depth" outlined dense />
              </div>
            </div>
          </div>

          <!-- details card -->
          <div class="col-3 q-py-md station-profile-container">
            <div>
              <q-avatar size="76px">
                <img src="/images/station/station-profile-photo.png" />
              </q-avatar>
            </div>
            <div class="q-mt-sm" style="font-weight: bold; font-size: 20px">
              Station Profile
            </div>
            <div class="q-mt-sm"><b>Description:</b> Bowmans Creek</div>
            <div class="q-mt-sm"><b>Location:</b> 41.42556, -76.030278</div>
            <div class="q-mt-sm"><b>First Sampled:</b> May 4, 2011</div>
            <div class="q-mt-sm">
              <b>Most Recent Sample:</b> October 14, 2012
            </div>
            <div class="q-mt-md">
              <q-img
                src="/images/station/station-map-temp.png"
                style="height: 150px; max-width: 160px"
              />
            </div>
          </div>
        </div>

        <!-- graph -->
        <div class="row q-mt-lg">
          <div class="col">
            Values displayed on graph are daily means of duplicate samples
          </div>
        </div>
        <div class="row">Chart Here</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { ref } from "vue";
import MapBox from "components/MapBox.vue";

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
const columns = [
  {
    name: "station",
    required: true,
    label: "Station Name",
    align: "left",
    field: "station",
    sortable: true,
  },
  {
    name: "organization",
    align: "left",
    label: "Organization",
    field: "organization",
    sortable: true,
  },
  {
    name: "water_body",
    align: "left",
    label: "Water Body",
    field: "water_body",
    sortable: true,
  },
  {
    name: "first_sampled",
    align: "left",
    label: "First Sampled",
    field: "first_sampled",
  },
  {
    name: "most_recent_sample",
    align: "left",
    label: "Most Recent Sampled",
    field: "most_recent_sample",
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
  },
];

const rows = [
  {
    id: 1,
    station: "AO1",
    organization: "James River Association",
    water_body: "Appamattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st 2023",
    status: "Inactive",
  },
  {
    id: 2,
    station: "AO1",
    organization: "James River Association",
    water_body: "Appamattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st 2023",
    status: "Inactive",
  },
  {
    id: 3,
    station: "AO1",
    organization: "James River Association",
    water_body: "Appamattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st 2023",
    status: "Inactive",
  },
  {
    id: 4,
    station: "AO1",
    organization: "James River Association",
    water_body: "Appamattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st 2023",
    status: "Inactive",
  },
  {
    id: 5,
    station: "AO1",
    organization: "James River Association",
    water_body: "Appamattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st 2023",
    status: "Inactive",
  },
];

/****************************
 * Ref/UI Variables
 ***************************/
const optionalMetaGroups = ref(false);
const optionalMetaStations = ref(false);
const optionalMetaParams = ref(false);
const optionalMetaCalibration = ref(false);
const dataUseAcknowledgment = ref(false);

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

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
.viewing-stats {
  border: 2px solid $vims-medium-blue;
  padding: 24px;
  color: $vims-medium-blue;
  align-items: center;

  div {
    font-size: 16px;
    font-weight: bold;
  }
}

.results-title {
  align-items: center;
}
.title-font {
  font-size: 16px;
  font-weight: bold;
}

.result-details-container {
  border: 2px solid $vims-medium-blue;
  padding: 16px;
}
.result-details-header {
  background-color: $vims-medium-blue;
  align-items: center;
  color: white;
}
.result-details-header-text-1 {
  font-size: 18px;
  font-weight: 600;
}
.result-details-header-text-2 {
  color: #dddddd;
  font-size: 18px;
  font-weight: 500;
}

.station-profile-container {
  background-color: $vims-medium-blue;
  //margin-left: 12px;

  div {
    text-align: center;
    color: white;
  }
}
</style>
