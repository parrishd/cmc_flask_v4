<template>
  <q-page class="q-px-none q-mx-none">
    <div class="q-px-xl q-mx-xl">
      <!-- stats bar -->
      <div class="row q-mt-lg viewing-stats">
        <div class="col-2">Currently Viewing:</div>
        <div class="col">
          <q-icon class="fa-solid fa-file-lines q-mr-sm" size="32px" />
          {{ sampleCount }} Water Samples
        </div>
        <div class="col q-ml-md">
          <q-icon class="fa-solid fa-building q-mr-sm" size="32px" />
          {{ organizationsCount }} Organizations
        </div>
        <div class="col q-ml-md">
          <q-icon class="fa-solid fa-location-dot" size="32px" />
          {{ stationsCount }} Stations
        </div>
        <div class="col text-right">
          <q-icon class="fa-solid fa-circle-info" size="18px">
            <q-tooltip
              anchor="bottom left"
              self="top left"
              class="bg-grey-2"
              :offset="[360, 10]"
            >
              <div class="q-pa-md" style="max-width: 360px">
                <div class="tooltip-header">Data Explorer Information</div>
                <div class="q-mt-sm tooltip-text">
                  The Data Explorer is a tool for storing and sharing data
                  collected by a network of water quality and benthic
                  macroinvertebrate monitors working with the Chesapeake
                  Monitoring Cooperative. These data are publicly accessible and
                  are shared directly with the Chesapeake Bay Program and other
                  data users.
                </div>
              </div>
            </q-tooltip>
          </q-icon>
        </div>
      </div>

      <!-- map/form -->
      <div class="row q-mt-lg">
        <!-- map -->
        <div class="col">
          <MapBox :mapData="filteredStations" />
        </div>

        <!-- form -->
        <div v-if="collapsed">
          <div class="col-1 q-px-md">
            <!--            <q-icon class="fa-solid fa-arrow-left" size="24px" />-->
            <q-btn
              icon="fa-solid fa-arrow-left"
              @click="collapsed = !collapsed"
              round
              flat
              color="primary"
            />
          </div>
        </div>
        <div v-else class="col-4 q-px-md">
          <div class="row">
            <div class="col">
              <!--              <q-icon class="fa-solid fa-arrow-right" size="24px" />-->
              <q-btn
                icon="fa-solid fa-arrow-right"
                @click="collapsed = !collapsed"
                round
                flat
                color="primary"
              />
            </div>
            <div class="col text-right">
              <q-icon class="fa-solid fa-circle-info" size="18px" color="primary">
                <q-tooltip
                  anchor="bottom left"
                  self="top left"
                  class="bg-grey-2"
                  :offset="[360, 10]"
                >
                  <div class="q-pa-md" style="max-width: 360px">
                    <div class="tooltip-header">Data Query Form</div>
                    <div class="q-mt-sm tooltip-text">
                      On this page you can download data from the CMC Data
                      Explorer database. Use the form below to build a query
                      that will identify the specific data you want to download.
                      As you step through the form, each selection will narrow
                      down the possible options in the other form items. At the
                      bottom of the form, use the check boxes to select the
                      associated metadata you would like to include with your
                      download. When you are finished making your selection,
                      click Get Results to request queried dataset. Selections
                      made in this form will immediately update the stations
                      shown on the map and stations table based on the
                      selections in the form.
                    </div>
                  </div>
                </q-tooltip>
              </q-icon>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Data Type"
                v-model="selectedDataType"
                :options="dataTypes"
                outlined
                dense
              ></q-select>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Boundary Type"
                v-model="geoTypes"
                :options="geoTypesOptions"
                outlined
                dense
              ></q-select>
            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col">
              <q-select
                label="States (pick all that apply)"
                v-model="selectedStates"
                :options="stateOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col">
              <q-select
                label="City/County (pick all that apply)"
                v-model="selectedCounties"
                :options="countyOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>
          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col">
              <q-select
                label="Watersheds (pick all that apply)"
                v-model="selectedWatershed"
                :options="watershedOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>
          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col">
              <q-select
                label="Subwatersheds (pick all that apply)"
                v-model="selectedSubwatershed"
                :options="subwatershedOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Groups (pick all that apply)"
                v-model="selectedGroups"
                :options="groupOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Stations (pick all that apply)"
                v-model="selectedStations"
                :options="stationIdOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Parameters (pick all that apply)"
                v-model="selectedParams"
                :options="paramOptions"
                multiple
                outlined
                dense
              ></q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col-6 q-pr-xs">
              <!--              <q-select label="Start Date" outlined dense></q-select>-->
              <q-input
                v-model="startDate"
                label="Start Date"
                mask="date"
                :rules="dateRule"
                outlined
                dense
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="startDate" minimal>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6 q-pl-xs">
              <!--              <q-select label="End Date" outlined dense></q-select>-->
              <q-input
                v-model="endDate"
                label="End Date"
                mask="date"
                :rules="dateRule"
                outlined
                dense
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
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
            <div class="col">
              Please acknowledge data use prior to download:
            </div>
          </div>

          <div class="row">
            <div class="col" style="max-width: 40px">
              <q-checkbox v-model="dataUseAcknowledgment" />
            </div>
            <div class="col q-pt-xs text-caption">
              I as the data user acknowledge that the data belong to the
              original data provider and will properly credit the data
              provider(s) in any product that uses their data.
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col text-center">
              <q-btn label="Clear Filters" @click="clearFilters" color="primary" style="width: 90%" />
            </div>
            <div class="col text-center">
              <q-btn label="Get Results" @click="applyFilters" color="primary" style="width: 90%" />
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
          <q-icon class="fa-solid fa-sliders" size="24px" color="primary"/>
        </div>
        <div class="col text-center" style="max-width: 48px">
          <q-icon class="fa-solid fa-circle-info" size="24px" color="primary">
            <q-tooltip
              anchor="bottom left"
              self="top left"
              class="bg-grey-2"
              :offset="[360, 10]"
            >
              <div class="q-pa-md" style="max-width: 360px">
                <div class="tooltip-header">Stations Table</div>
                <div class="q-mt-sm tooltip-text">
                  The stations table shows the results from the information
                  selected on the data query form above. The search box at the
                  top right of the table allows the user to filter the displayed
                  data based on attributes such as station name, organization,
                  waterbody name, date or station status (ex. active or
                  inactive). Using the search box will also update the map and
                  query form.
                </div>
              </div>
            </q-tooltip>
          </q-icon>
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
<!--            <div class="col-1">-->
<!--              <q-icon class="fa-solid fa-location-dot" size="64px" />-->
<!--            </div>-->
            <div class="col">
              <q-icon class="fa-solid fa-location-dot float-left q-mr-lg" size="64px" />
              <div class="result-details-header-text-1">

                WESBRABIGRUN1.89 - West Branch-Big Run
              </div>
              <div class="result-details-header-text-2">
                Monitored by: Centre County Pennsylvania Senior Environmental
                Corps
              </div>
            </div>
            <div class="col-1 text-right">
              <q-icon class="fa-solid fa-circle-info" size="24px">
                <q-tooltip
                  anchor="bottom left"
                  self="top left"
                  class="bg-grey-2"
                  :offset="[360, 10]"
                >
                  <div class="q-pa-md" style="max-width: 360px">
                    <div class="tooltip-header">Station Details</div>
                    <div class="q-mt-sm tooltip-text">
                      The station details panel reflects the station selection
                      on map or table above. In this panel, you can visualize or
                      download water quality monitoring data for this station.
                      When selecting a parameter or changing the date range, the
                      interactive time series plot will update. Click on the
                      Download button to download data for the time period shown
                      in the plot.
                    </div>
                  </div>
                </q-tooltip>
              </q-icon>
            </div>
          </div>

          <!-- details -->
          <div class="row q-mt-md">
            <!-- details info -->
            <div class="col-9 q-pr-xl">
              <div class="row">
                <div class="col">
                  Use the Water Quality or Benthic Macroinvertebrates buttons to
                  select the type of data you want to view for this station.
                  Click a Quick Plots option to choose commonly viewed water
                  quality data types. Click Export Plot to download the graph.
                  Click Download Data to be taken to a data query page for this
                  station.
                </div>
              </div>

              <div class="row q-mt-lg">
                <div class="col">
                  <q-btn
                    label="Water Quality"
                    color="primary"
                    class="q-mr-md"
                  />
                  <q-btn
                    label="Benthic Macroinvertebrates"
                    color="primary"
                    class="q-ml-md"
                  />
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
                    <q-btn
                      label="Export Plot"
                      color="primary"
                      class="q-mr-md"
                    />
                    <q-btn
                      label="Download Data"
                      color="primary"
                      class="q-ml-md"
                    />
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47822.29913316174!2d-75.98405185!3d41.4849043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c53bd22acb2935%3A0x3ac68806abf8bd8e!2sBowman%20Creek!5e0!3m2!1sen!2sus!4v1691578563483!5m2!1sen!2sus"
                  width="300"
                  height="225"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
<!--                <q-img-->
<!--                  src="/images/station/station-map-temp.png"-->
<!--                  style="height: 150px; max-width: 160px"-->
<!--                />-->
              </div>
            </div>
          </div>

          <!-- graph -->
          <div class="row q-mt-xl">
            <div class="col">
              Values displayed on graph are daily means of duplicate samples
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col" style="height: 280px">
              <canvas ref="plotChartRef" />
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
              Please note that parameters are consolidated in the plot where
              sampling methodologies may be different. Please click the "Show
              Details" button for more information.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- database statistics -->
    <div class="row q-mt-xl q-py-lg db-stats-container">
      <div class="col">
        <div class="row">
          <div class="col text-center text-h4 text-bold">
            Database Statistics
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col text-center">
            The summary statistics below provide an overview of the current
            scope of the Data Explorer.
          </div>
        </div>

        <div class="row q-px-xl q-mt-xl text-center">
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-file-lines" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">765,564</div>
            <div class="db-stat-label">WATER QUALITY RECORDS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-memo-pad" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">4,348</div>
            <div class="db-stat-label">BENTHIC MACROINVERTEBRATE RECORDS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-water" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">658</div>
            <div class="db-stat-label">RIVERS/STREAMS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-location-dot" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">2,286</div>
            <div class="db-stat-label">STATIONS</div>
          </div>
        </div>
        <div class="row q-px-xl q-pb-xl q-mt-xl text-center">
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-location-pin" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">861</div>
            <div class="db-stat-label">BENTHIC STATIONS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-user" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">764</div>
            <div class="db-stat-label">MONITORS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-clock" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">43,452</div>
            <div class="db-stat-label">MONITORING HOURS</div>
          </div>
          <div class="col">
            <div>
              <q-icon class="fa-solid fa-building" size="64px" />
            </div>
            <div class="q-mt-xs db-stat-value">137</div>
            <div class="db-stat-label">ORGANIZATIONS</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import {computed, onMounted, ref, watch} from "vue";
// import MapBox from "components/MapBoxOriginal.vue";
import MapBox from "components/MapBox.vue";
import Chart from "chart.js/auto";
import stations from "/src/assets/cmcV3_stations.json";

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
const filteredStations = ref([...stations]);

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
    water_body: "Appomattox River",
    first_sampled: "June 1st, 2018",
    most_recent_sample: "June 31st, 2023",
    status: "Inactive",
  },
];

let chartInstance = null;
const chartConfig = {
  type: "bar",
  data: {
    labels: ["40", "45", "50", "55", "60", "65", "70"],
    datasets: [
      {
        label: "D",
        data: [25, 36, 54, 65, 59, 56, 55, 25],
        fill: true,
        borderColor: "#075C7A",
        backgroundColor: "rgb(7, 92, 122, 0.25)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        barPercentage: 0.25,
      },
      {
        label: "D",
        data: [42, 56, 34, 35, 69, 36, 45, 8],
        fill: true,
        borderColor: "#075C7A",
        backgroundColor: "rgb(7, 92, 122, 0.25)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        barPercentage: 0.25,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // scaleShowVerticalLines: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    // scales: {
    //   xAxes: [
    //     {
    //       gridLines: {
    //         display: false,
    //       },
    //     },
    //   ],
    // },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const dataTypes = ["Water Quality", "Benthic Macroinvertebrates"];
const geoTypesOptions = ["Watershed Boundary", "Political Boundary"];
const stateOptions = computed(() => {
  return [...new Set(filteredStations.value.map(s => s.State))].sort();
});
const countyOptions = computed(() => {
  return [...new Set(filteredStations.value.map(s => s.CityCounty))].sort();
});
const watershedOptions = computed(() => {
  return [...new Set(filteredStations.value.map(s => s.Watershed))].sort();
});
const subwatershedOptions = computed(() => {
  return [...new Set(filteredStations.value.map(s => s.Subwatershed))].sort();
});

const groupOptions = computed(() => {
  const allGroups =  filteredStations.value.map(s => s.GroupNames.split(',').map(group => group.trim()));
  const flattenedGroups = allGroups.flat();

  return [...new Set(flattenedGroups)].sort();
});

const stationIdOptions = computed(() => {
  return [...new Set(filteredStations.value.map(s => s.StationId))].sort((a, b) => a - b);
});

const paramOptions = computed(() => {
  const allParameters = filteredStations.value.map(s => s.ParameterCodes.split(',').map(param => param.trim()));
  const flattenedParamCodes = allParameters.flat();

  return [...new Set(flattenedParamCodes)].sort();
});

const sampleCount = computed(() => {
  const sampleSum = filteredStations.value.reduce((sum, s) => {
    return sum + (s.SamplesCount || 0);
  }, 0);
  return new Intl.NumberFormat().format(sampleSum);
})

const organizationsCount = computed(() => {
  return new Intl.NumberFormat().format(groupOptions.value.length);
});

const stationsCount = computed(() => {
  return new Intl.NumberFormat().format(stationIdOptions.value.length);
});

/****************************
 * Ref/UI Variables
 ***************************/
const plotChartRef = ref(null);

const collapsed = ref(true);
const showCityState = ref(false);
const showWatersheds = ref(false);

const startDate = ref(null);
const startDateInput = ref(null);
const endDate = ref(null);

const optionalMetaGroups = ref(false);
const optionalMetaStations = ref(false);
const optionalMetaParams = ref(false);
const optionalMetaCalibration = ref(false);
const dataUseAcknowledgment = ref(false);
const geoTypes = ref("");
const selectedDataType = ref([]);
const selectedStates = ref([]);
const selectedStations = ref([]);
const selectedCounties = ref([]);
const selectedWatershed = ref([]);
const selectedSubwatershed = ref([]);
const selectedGroups = ref([]);
const selectedParams = ref([]);


/****************************
 * Computed Properties
 ***************************/
// computed properties here

/***************************
 * Watched properties
 **************************/
// watched properties here
watch(geoTypes, () => {
  if (geoTypes.value === 'Watershed Boundary') {
    showCityState.value = false;
    showWatersheds.value = true;
  } else if (geoTypes.value === 'Political Boundary') {
    showWatersheds.value = false;
    showCityState.value = true;
  } else {
    showWatersheds.value = false;
    showCityState.value = false;
  }
});
/****************************
 * Exposed/Interface Functions
 ***************************/
// exposed/interface functions here

/****************************
 * UI Functions
 ***************************/
function createChart() {
  if (plotChartRef.value) {
    chartInstance = new Chart(plotChartRef.value, chartConfig);
  }
}

function clearFilters() {
  geoTypes.value = "";
  selectedStates.value = [];
  selectedStations.value = [];
  selectedCounties.value = [];
  selectedWatershed.value = [];
  selectedSubwatershed.value = [];
  selectedGroups.value = [];
  selectedParams.value = [];

  startDate.value = null;
  endDate.value = null;

  filteredStations.value = [...stations];
}

const matchWatershed = (s) => selectedWatershed.value.length === 0 || selectedWatershed.value.includes(s.Watershed);
const matchSubwatershed = (s) => selectedSubwatershed.value.length === 0 ||
  selectedSubwatershed.value.includes(s.Subwatershed);
const matchState = (s) => selectedStates.value.length === 0 || selectedStates.value.includes(s.State);
const matchCounty = (s) => selectedCounties.value.length === 0 || selectedCounties.value.includes(s.CityCounty);
const matchGroup = (s) => {
  if (selectedGroups.value.length === 0) {
    return true;
  }
  const groupsArray = s.GroupNames.split(',').map(str => str.trim());

  return selectedGroups.value.some(group => groupsArray.includes(group));
}
const matchStation = (s) => selectedStations.value.length === 0 || selectedStations.value.includes(s.StationId);
const matchParams = (s) => {
  if (selectedParams.value.length === 0) {
    return true;
  }
  const paramsArray = s.ParameterCodes.split(',').map(str => str.trim());
  console.log('selected params:vvvvvvv');
  console.log(selectedParams);
  console.log('params array:vvvvvvv');
  console.log(paramsArray);

  return selectedParams.value.some(param => paramsArray.includes(param));
}
const matchStartDate = (s) => {
  if (!startDate.value) return true;

  const [year, month, day] = startDate.value.split('/').map(Number);
  const selectedStartDate = new Date(year, month - 1, day);

  const stationStartDate = new Date(s.StartDate.split('T')[0]);

  return stationStartDate >= selectedStartDate;
};
const matchEndDate = (s) => {
  if (!endDate.value) return true;

  const [year, month, day] = endDate.value.split('/').map(Number);
  const selectedEndDate = new Date(year, month - 1, day);

  const stationEndDate = new Date(s.EndDate.split('T')[0]);

  return stationEndDate <= selectedEndDate;
};

function applyFilters() {

  const filterFunctions = [
    matchWatershed,
    matchSubwatershed,
    matchState,
    matchCounty,
    matchGroup,
    matchStation,
    matchParams,
    matchStartDate,
    matchEndDate
  ];
  const noFilterApplied = filterFunctions.every(filter => filter.length === 0);

  if (noFilterApplied) {
    filteredStations.value = [...stations];
    return;
  }

  filteredStations.value = stations.filter(s => filterFunctions.every(filter => filter(s)));
}

const dateRule = [(v) => (v === null || isValidDate(v) ? true : 'Invalid Date')];

function isValidDate(value) {
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegEx.test(value);
}

/****************************
 * View Lifecycle Methods
 ***************************/
onMounted(() => {
  createChart();

  setTimeout(() => {
    collapsed.value = false;
  }, 500);
});
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

.db-stats-container {
  background-color: $vims-light-blue;
  color: $vims-medium-blue;
}
.db-stat-value {
  font-size: 32px;
  font-weight: 700;
}
.db-stat-label {
  font-size: 16px;
  font-weight: 500;
  color: $vims-dark-gray;
}

.tooltip-header {
  font-size: 24px;
  font-weight: 500;
  color: $vims-medium-blue;
}
.tooltip-text {
  font-size: 16px;
  color: $vims-dark-gray;
}
</style>
