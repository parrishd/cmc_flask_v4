<template>
  <q-page class="q-px-none q-mx-none">
    <div class="q-px-xl q-mx-xl">
      <!-- stats bar -->
      <div class="row q-mt-lg viewing-stats">
        <div class="col-2">Currently Viewing:</div>
        <div class="col">
          <q-icon class="fa-solid fa-file-lines q-mr-sm" size="32px" />
          {{ sampleCount }} Samples
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
          <MapBox
            :mapData="filteredStations"
            :showLegend="true"
            :collapsed="collapsed"
            :selectedDataType="selectedDataType"
            :selectedGeoType="selectedGeoType"
            @selected-station="receiveEmit"
            :mapOptions="{
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [-76.5616315, 37.849295],
              zoom: 6,
            }"
            :key="100"
          />
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
              <q-icon
                class="fa-solid fa-circle-info"
                size="18px"
                color="primary"
              >
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
                label="Boundary Layer"
                v-model="selectedGeoType"
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
                outlined
                dense
                mask="MM-DD-YYYY"
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
              <q-btn
                label="Clear Filters"
                @click="clearFilters"
                color="primary"
                style="width: 90%"
              />
            </div>
            <div class="col text-center">
              <q-btn label="Download Data" color="primary" style="width: 90%" />
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
        <div class="col title-font">Currently Viewing</div>
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
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="StationId"
            flat
            bordered
          />
        </div>
      </div>

      <!-- selected data details -->
      <div
        class="row q-mt-xl result-details-container"
        ref="stationDetailsContainer"
      >
        <div class="col">
          <!-- header -->
          <div class="row q-py-md q-px-lg result-details-header">
            <!--            <div class="col-1">-->
            <!--              <q-icon class="fa-solid fa-location-dot" size="64px" />-->
            <!--            </div>-->
            <div class="col">
              <q-icon
                class="fa-solid fa-location-dot float-left q-mr-lg"
                size="110px"
              />
              <div class="result-details-header-text-1">
                {{ selectedStationDetails.code }}
              </div>
              <div class="result-details-header-text-2">
                Monitored by: {{ selectedStationDetails.groupNames }}
              </div>
              <div class="result-details-header-text-2">
                Location: {{ selectedStationDetails.latitude }},
                {{ selectedStationDetails.longitude }}
              </div>
              <div class="result-details-header-text-2" style="">
                Date Range: {{ selectedStationDetails.startDate }} -
                {{ selectedStationDetails.endDate }}
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
            <div class="col-3 q-pr-xl">
              <q-select
                label="Data Type"
                v-model="selectedParamTypePlot"
                :options="paramTypeOptions"
                outlined
                bg-color="white"
              ></q-select>
            </div>
            <div class="col-3 q-pr-xl q-pl-xl">
              <q-select
                label="Depth"
                v-model="selectedDepthPlot"
                :options="depthOptionsPlot"
                outlined
                bg-color="white"
              />
            </div>
            <div class="col-3 q-pr-xl q-pl-xl">
              <q-input
                label="Start Date"
                v-model="formattedStartDatePlot"
                :mask="dateMask"
                id="date-input"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="formattedStartDatePlot"
                        :mask="dateFormat"
                        today-btn
                      >
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
            <div class="col-3 q-pl-xl">
              <q-input
                label="End Date"
                v-model="formattedEndDatePlot"
                :mask="dateMask"
                id="date-input"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="formattedEndDatePlot"
                        :mask="dateFormat"
                        today-btn
                      >
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
            <div class="col-12 q-pr-xl">
              <DashboardPlot></DashboardPlot>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-10 q-pr-xl"></div>
            <div class="col-2 q-pr-xl">
              <q-btn
                label="Add Plot"
                color="primary"
                icon-right="fas fa-plus"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mt-xl"></div>
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { computed, onMounted, ref, watch } from "vue";
import axios from "axios";
// import MapBox from "components/MapBoxOriginal.vue";
import MapBox from "components/MapBox.vue";
import DashboardPlot from "components/DashboardPlot.vue";

//import stations from "/src/assets/cmcV3_stations.json";
import { date } from "quasar";

const emit = defineEmits(["update:endDatePlot", "update:startDatePlot"]);

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
const props = defineProps({
  endDatePlot: {
    type: String,
    default: "2021-01-01",
  },
  startDatePlot: {
    type: String,
    default: "2015-01-01",
  },
});

/****************************
 * Local/'Use' Variables
 ***************************/
const selectedStationDetails = ref({
  code: "LACA.P7",
  name: "P7",
  nameLong: "P7",
  groupNames: "Lake Anna Civic Association",
  id: "522",
  latitude: "38.22682",
  longitude: "-77.98037",
  huc6Name: "Lake Anna",
  startDate: "January 1, 2015",
  endDate: "December 31, 2020",
  description: "Lake Anna, Spotsylvania County, VA",
});

const loading = ref[true];

const filteredStations = ref([
  {
    Name: "P7",
    CityCounty: "Wicomico County",
    EndDate: "11/06/2022",
    GroupNames: "Nanticoke Watershed Alliance",
    Lat: 38.4555,
    Long: -75.7569,
    SamplesCount: 1539,
    StartDate: "03/27/2017",
    State: "Maryland",
    StationId: 166,
    WaterBody: "Barren Creek-Nanticoke River",
    formattedEndDate: "November 6, 2022",
    formattedStartDate: "March 27, 2017",
    status: "historic",
  },
]);

const columns = [
  {
    name: "StationId",
    required: true,
    label: "Station Name",
    align: "left",
    field: "StationId",
    sortable: true,
  },
  {
    name: "GroupNames",
    align: "left",
    label: "Organization(s)",
    field: "GroupNames",
    sortable: true,
  },
  {
    name: "Subwatershed",
    align: "left",
    label: "Water Body",
    field: "Subwatershed",
    sortable: true,
  },
  {
    name: "formattedStartDate",
    align: "left",
    label: "First Sampled",
    field: "formattedStartDate",
  },
  {
    name: "formattedEndDate",
    align: "left",
    label: "Most Recent Sampled",
    field: "formattedEndDate",
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
  },
];
const tableKey = ref(0);
const rows = filteredStations.value;

const dataTypes = ["Water Quality", "Benthic Macroinvertebrates"];
const paramTypeOptions = ["Depth", "Parameter"];
const geoTypesOptions = ["Watershed", "Political"];
const stateOptions = computed(() => {
  return [...new Set(filteredStations.value.map((s) => s.State))].sort();
});
const countyOptions = computed(() => {
  return [...new Set(filteredStations.value.map((s) => s.CityCounty))].sort();
});
const watershedOptions = computed(() => {
  return [...new Set(filteredStations.value.map((s) => s.Watershed))].sort();
});
const subwatershedOptions = computed(() => {
  return [...new Set(filteredStations.value.map((s) => s.Subwatershed))].sort();
});

const groupOptions = computed(() => {
  const allGroups = filteredStations.value.map((s) =>
    s.GroupNames.split(",").map((group) => group.trim())
  );
  const flattenedGroups = allGroups.flat();

  return [...new Set(flattenedGroups)].sort();
});

const stationIdOptions = computed(() => {
  return [...new Set(filteredStations.value.map((s) => s.StationId))].sort(
    (a, b) => a - b
  );
});

const paramOptions = ref(["WT.1", "PH.1", "DO.1"]);

//computed(() => {
//   const allParameters = filteredStations.value.map((s) =>
//     s.ParameterCodes.split(",").map((param) => param.trim())
//   );
//   const flattenedParamCodes = allParameters.flat();

//   return [...new Set(flattenedParamCodes)].sort();
// });

console.log("filteredStations.value samplesCount");
console.log(filteredStations.value);

const sampleCount = computed(() => {
  const sampleSum = filteredStations.value.reduce((sum, s) => {
    return sum + (s.SamplesCount || 0);
  }, 0);
  return new Intl.NumberFormat().format(sampleSum);
});

const organizationsCount = computed(() => {
  return new Intl.NumberFormat().format(groupOptions.value.length);
});

const stationsCount = computed(() => {
  return new Intl.NumberFormat().format(stationIdOptions.value.length);
});

/****************************
 * Ref/UI Variables
 ***************************/
const collapsed = ref(false);
const showCityState = ref(true);
const showWatersheds = ref(false);
const startDate = ref(null);
const endDate = ref("2024/01/02");
const optionalMetaGroups = ref(false);
const optionalMetaStations = ref(false);
const optionalMetaParams = ref(false);
const optionalMetaCalibration = ref(false);
const dataUseAcknowledgment = ref(false);
const selectedParamPlot = ref("WT.1");
const selectedDepthPlot = ref(0.3);
const selectedGeoType = ref("Watershed");
const selectedDataType = ref("Water Quality");
const selectedParamTypePlot = ref("Depth");
const selectedStates = ref([]);
const selectedStations = ref([]);
const selectedCounties = ref([]);
const selectedWatershed = ref([]);
const selectedSubwatershed = ref([]);
const selectedGroups = ref([]);
const selectedParams = ref([]);
const paramOptionsPlot = ref(["DO.1", "PH.1", "WT.1"]);
const depthOptionsPlot = ref([0.3, 1]);
const stationDetailsContainer = ref();
const stations = ref(null);

// Simple POST request with a JSON body using fetch
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;charset=utf-8",
  },
  body: JSON.stringify({ groups: "LACA", stations: "LACA.EX-5" }),
};

const getStationsFromCMC = async (type) => {
  const payload = {
    groups: "",
    stations: "",
  };
  console.log("getting stations from CMC");
  console.log(type);
  try {
    const res = await axios.post(
      "https://cmc.vims.edu/DashboardApi/FetchStationsForMap",
      payload
    );
    stations.value = res.data;
  } catch (error) {
    console.log("getStationsFromCMC error");
    console.log(error);
  }
};

getStationsFromCMC("wq");

//Establish date formatting
const dateFormat = "YYYY-MM-DD";

//Make a mask for the q-input in the form of ####-##-##
const dateMask = dateFormat.replace(/[DMY]/g, "#");

//Format the date for display in the q-input.
const formattedStartDatePlot = ref(
  date.formatDate(new Date(props.startDatePlot), dateFormat)
);
const formattedEndDatePlot = ref(
  date.formatDate(new Date(props.endDatePlot), dateFormat)
);

formattedStartDatePlot.value = date.formatDate(
  new Date(selectedStationDetails.value.startDate),
  dateFormat
);
formattedEndDatePlot.value = date.formatDate(
  new Date(selectedStationDetails.value.endDate),
  dateFormat
);

/****************************
 * Computed Properties
 ***************************/
// computed properties here

/***************************
 * Watched properties
 **************************/
// watched properties here
//Watchers to emit the updated date when changed.
watch(formattedStartDatePlot, (newDateValue) => {
  //construct new date ISO string from the formattedEndDate.
  const newDate = date.extractDate(newDateValue, dateFormat);
  //convert to iso string
  const updatedDate = newDate.toISOString();
  emit("update:startDatePlot", updatedDate);
});

watch(formattedEndDatePlot, (newDateValue) => {
  //construct new date ISO string from the formattedEndDate.
  const newDate = date.extractDate(newDateValue, dateFormat);
  //convert to iso string
  const updatedDate = newDate.toISOString();
  emit("update:endDatePlot", updatedDate);
});

watch(selectedGeoType, () => {
  if (selectedGeoType.value === "Watershed") {
    showCityState.value = false;
    showWatersheds.value = true;
  } else if (selectedGeoType.value === "Political") {
    showWatersheds.value = false;
    showCityState.value = true;
  } else {
    showWatersheds.value = false;
    showCityState.value = false;
  }
});

watch(stations, () => {
  console.log("stations changed");
  console.log(stations.value);
  let transformedStations = stations.value.map(transformStation);
  let aggregatedStations = [];

  //this will aggregate stations with the same station id and concatenate group names and
  //get minium StartDate and maximum EndDate
  transformedStations.forEach((station) => {
    const existingStation = aggregatedStations.find(
      (s) => s.StationId === station.StationId
    );

    if (existingStation) {
      existingStation.GroupNames = `${existingStation.GroupNames}, ${station.GroupNames}`;
      existingStation.StartDate = new Date(
        Math.min(
          new Date(existingStation.StartDate),
          new Date(station.StartDate)
        )
      ).toISOString();
      existingStation.formattedStartDate = formatDate(
        existingStation.StartDate
      );
      existingStation.EndDate = new Date(
        Math.max(new Date(existingStation.EndDate), new Date(station.EndDate))
      ).toISOString();
      existingStation.formattedEndDate = formatDate(existingStation.EndDate);

      existingStation.SamplesCount += station.SamplesCount;
      //use station status from the station with the most recent end date
      // if (
      //   new Date(existingStation.EndDate) > new Date(station.EndDate) &&
      //   station.status === "Current"
      // ) {
      //   existingStation.status = station.status;
      // }
    } else {
      aggregatedStations.push(station);
    }
  });

  filteredStations.value = aggregatedStations;
});

watch(filteredStations, () => {
  console.log("filteredStations changed");
  console.log(filteredStations.value);
  rows.splice(0, rows.length, ...filteredStations.value);
});

const filterRefs = [
  selectedGeoType,
  selectedStates,
  selectedStations,
  selectedCounties,
  selectedWatershed,
  selectedSubwatershed,
  selectedGroups,
  selectedParams,
  startDate,
  endDate,
];

//for (const refItem of filterRefs) {
//  watch(refItem, applyFilters);
//}

/****************************
 * Exposed/Interface Functions
 ***************************/
// exposed/interface functions here

/****************************
 * UI Functions
 ***************************/

function clearFilters() {
  selectedDataType.value = "Water Quality";
  selectedGeoType.value = "Watershed";
  selectedStates.value = [];
  selectedStations.value = [];
  selectedCounties.value = [];
  selectedWatershed.value = [];
  selectedSubwatershed.value = [];
  selectedGroups.value = [];
  selectedParams.value = [];
  startDate.value = null;
  endDate.value = null;

  filteredStations.value = stations.value.map(transformStation);
}

const matchWatershed = (s) =>
  selectedWatershed.value.length === 0 ||
  selectedWatershed.value.includes(s.Watershed);
const matchSubwatershed = (s) =>
  selectedSubwatershed.value.length === 0 ||
  selectedSubwatershed.value.includes(s.Subwatershed);
const matchState = (s) =>
  selectedStates.value.length === 0 || selectedStates.value.includes(s.State);
const matchCounty = (s) =>
  selectedCounties.value.length === 0 ||
  selectedCounties.value.includes(s.CityCounty);
const matchGroup = (s) => {
  if (selectedGroups.value.length === 0) {
    return true;
  }
  const groupsArray = s.GroupNames.split(",").map((str) => str.trim());

  return selectedGroups.value.some((group) => groupsArray.includes(group));
};
const matchStation = (s) =>
  selectedStations.value.length === 0 ||
  selectedStations.value.includes(s.StationId);
const matchParams = (s) => {
  if (selectedParams.value.length === 0) {
    return true;
  }
  const paramsArray = s.ParameterCodes.split(",").map((str) => str.trim());

  return selectedParams.value.some((param) => paramsArray.includes(param));
};
const matchStartDate = (s) => {
  if (!startDate.value) return true;

  const [year, month, day] = startDate.value.split("/").map(Number);
  const selectedStartDate = new Date(year, month - 1, day);

  const stationStartDate = new Date(s.StartDate.split("T")[0]);

  return stationStartDate >= selectedStartDate;
};
const matchEndDate = (s) => {
  if (!endDate.value) return true;

  const [year, month, day] = endDate.value.split("/").map(Number);
  const selectedEndDate = new Date(year, month - 1, day);

  const stationEndDate = new Date(s.EndDate.split("T")[0]);

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
    matchEndDate,
  ];

  const noFilterApplied = filterFunctions.every(
    (filter) => filter.length === 0
  );

  if (noFilterApplied) {
    filteredStations.value = stations.value.map(transformStation);
    return;
  }

  filteredStations.value = stations.value
    .filter((s) => filterFunctions.every((filter) => filter(s)))
    .map(transformStation);
}
function checkDate(val) {
  return Quasar.utils.date.isValid(val) || "Invalid date.";
}

const dateRule = [
  (v) => (v === null || isValidDate(v) ? true : "Invalid Date"),
];

function isValidDate(value) {
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegEx.test(value);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-us", options);
}

function transformStation(station) {
  let transformStation = {};
  station.forEach((item) => {
    transformStation[item["Key"]] = item["Value"];
  });
  const formattedStartDate = formatDate(transformStation.StartDate);
  const formattedEndDate = formatDate(transformStation.EndDate);

  return {
    ...transformStation,
    formattedStartDate: formattedStartDate,
    formattedEndDate: formattedEndDate,
  };
}

function receiveEmit(station) {
  console.log("receiveEmit");
  console.log(station);

  selectedStationDetails.value = station;
  console.log("selectedStationDetails");
  console.log(selectedStationDetails);
  stationDetailsContainer.value.scrollIntoView({ behavior: "smooth" });
  console.log("station end date");
  console.log(station.endDate);
  console.log(date.formatDate(new Date(station.endDate), dateFormat));

  formattedEndDatePlot.value = date.formatDate(
    new Date(station.endDate),
    dateFormat
  );

  formattedStartDatePlot.value = date.formatDate(
    new Date(station.startDate),
    dateFormat
  );
}

/****************************
 * View Lifecycle Methods
 ***************************/

onMounted(() => {
  //applyFilters();
  // setTimeout(() => {
  //   collapsed.value = false;
  // }, 500);
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
  font-size: 24px;
  font-weight: 600;
}
.result-details-header-text-2 {
  color: #dddddd;
  font-size: 18px;
  font-weight: 500;
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
