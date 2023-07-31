<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center data-header">
        Edit & Review Macroinvertebrates
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col data-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col q-pr-sm">
        <q-input label="All Stations" outlined />
      </div>

      <div class="col q-px-sm">
        <q-input
          v-model="startDate"
          label="Start Date"
          mask="date"
          :rules="['date']"
          outlined
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="endDate" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col q-px-sm">
        <q-input
          v-model="endDate"
          label="End Date"
          mask="date"
          :rules="['date']"
          outlined
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="endDate" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col q-pl-sm text-right" style="max-width: 136px">
        <q-btn label="Get Samples" style="height: 56px" color="primary" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col data-text">
        Use the dropdown list to choose the sampling station for which you will
        be editing data.
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-9 q-pr-md">
        <q-table :rows="rows" :columns="columns" row-key="name" />
      </div>
      <div class="col q-pl-md">
        <div>
          <q-btn
            label="Download Data"
            color="primary"
            icon="fa-solid fa-download"
            style="width: 100%"
          />
        </div>

        <div class="q-mt-lg">
          <q-btn
            label="Delete Selected"
            color="negative"
            icon="fa-solid fa-trash"
            style="width: 100%"
          />
          <q-btn
            label="Publish Selected"
            color="primary"
            icon="fa-solid fa-pen-to-square"
            class="q-mt-sm"
            style="width: 100%"
          />
        </div>

        <div class="q-mt-lg">
          <q-btn
            label="Hide Plot"
            color="primary"
            icon="fa-solid fa-eye-slash"
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <!-- Plot -->
    <div class="row q-my-xl">
      <div class="col-2 radio-container">
        <q-radio v-model="plotParam" val="salinity" label="Salinity" />
        <q-radio v-model="plotParam" val="ph" label="pH" />
        <q-radio v-model="plotParam" val="conductivity" label="Conductivity" />
        <q-radio
          v-model="plotParam"
          val="chloriphyll_a"
          label="Chlorophyll a"
        />
        <q-radio
          v-model="plotParam"
          val="nitrate_nitrogen"
          label="Nitrate-nitrogen"
        />
        <q-radio
          v-model="plotParam"
          val="nitrite_nitrate"
          label="Nitrite-nitrate"
        />
        <q-radio
          v-model="plotParam"
          val="dissolved_oxygen"
          label="Disolved oxygen"
        />
        <q-radio
          v-model="plotParam"
          val="bacteria_ecoli"
          label="Bacteria (E. Coli)"
        />
        <q-radio
          v-model="plotParam"
          val="air_temperature"
          label="Air Temperature"
        />
        <q-radio v-model="plotParam" val="total_depth" label="Total Depth" />
        <q-radio v-model="plotParam" val="water_clarity" label="Salinity" />
        <q-radio
          v-model="plotParam"
          val="orthophosphate"
          label="Orthophosphate"
        />
        <q-radio
          v-model="plotParam"
          val="water_temperature"
          label="Water Temperature"
        />
      </div>
      <div class="col-10 q-pl-lg">
        <canvas ref="plotChartRef" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { onMounted, ref } from "vue";

import Chart from "chart.js/auto";

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
const columns = [
  {
    name: "station",
    required: true,
    label: "Station",
    align: "left",
    field: "station",
    sortable: true,
  },
  {
    name: "time",
    align: "left",
    label: "Sample Time",
    field: "time",
    sortable: true,
  },
  {
    name: "group",
    align: "left",
    label: "Group",
    field: "group",
    sortable: true,
  },
  {
    name: "samples_to_publish",
    align: "left",
    label: "Samples to Publish",
    field: "samples_to_publish",
  },
];

const rows = [
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "9",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "6",
  },
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "2",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "9",
  },
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "6",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "2",
  },
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "9",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "6",
  },
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "2",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "9",
  },
  {
    station: "Station 1",
    time: "6/6/23 10:00",
    group: "Groups 1",
    samples_to_publish: "6",
  },
  {
    station: "Station 2",
    time: "6/6/23 13:30",
    group: "Groups 2",
    samples_to_publish: "2",
  },
];

const plotParam = ref("salinity");

let chartInstance = null;
const plotChartRef = ref(null);

// Chart.js configuration
const chartConfig = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Salinity",
        backgroundColor: "rgb(7, 92, 122, 0.25)",
        borderColor: "#075C7A",
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

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
function submitButtonClick() {
  console.log("submitButtonClick");
}

function createChart() {
  if (plotChartRef.value) {
    chartInstance = new Chart(plotChartRef.value, chartConfig);
  }
}

/****************************
 * View Lifecycle Methods
 ***************************/
onMounted(() => {
  createChart();
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.data-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.data-text {
  color: $vims-medium-blue;
  font-size: 1.25em;

  a {
    color: $vims-medium-blue;
    text-decoration: none;
    font-weight: bold;
  }
}

.stat-count-text {
  color: $vims-medium-blue;
  font-size: 2.7em;
  font-weight: 600;
}

.stat-desc-text {
  color: $vims-dark-gray;
  font-size: 1.25em;
  font-weight: 500;
}

.radio-container {
  display: flex;
  flex-direction: column;
}
</style>
