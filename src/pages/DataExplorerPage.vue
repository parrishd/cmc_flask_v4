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
            :selectedDataType="selectedDataTypeForLegend"
            :selectedGeoType="selectedGeoType"
            @selected-station="receiveEmit"
            :mapOptions="{
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [-77.636161, 39.77338],
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
                option-value="value"
                option-label="value"
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
                option-value="value"
                option-label="value"
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
                option-value="value"
                option-label="value"
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
                option-value="value"
                option-label="value"
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
                option-value="value"
                option-label="name"
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
                option-value="value"
                option-label="value"
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
                option-value="value"
                option-label="name"
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
                label="Start Date"
                v-model="formattedStartDateMap"
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
                        v-model="formattedStartDateMap"
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
            <div class="col-6 q-pl-xs">
              <!--              <q-select label="End Date" outlined dense></q-select>-->
              <q-input
                label="End Date"
                v-model="formattedEndDateMap"
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
                        v-model="formattedEndDateMap"
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
          <div class="row q-mt-sm">
            <div class="col text-center">
              <q-btn
                label="Filter Map"
                @click="getStationsFromCMC(false)"
                color="primary"
                style="width: 90%"
              />
            </div>
            <div class="col text-center">
              <q-btn
                label="Clear Filters"
                @click="clearFilters"
                color="primary"
                style="width: 90%"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <div v-show="showQueryError" style="color: red">
                The filters you selected returned no stations. Clicking "Filter
                Map" after selecting each new filter may help.
              </div>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col text-center">
              <q-btn
                label="Download Data"
                color="primary"
                style="width: 90%"
                @click="downloadDialog = true"
              />
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="downloadDialog" >
        <q-card style="width: 800px; max-width: 90vw;" bg-grey-9 text-white>
          <q-card-section>
            <div class="text-h6">Download</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 80vh;" class="scroll">
            <p>
              Your {{selectedDataType}} download will include <span style="font-size: 28px;color: #075C7A;">{{ sampleCount }}</span> samples. The download will consist of all samples:
              <ul>
                <li v-show="selectedStates.length > 0"> that were collected in the following states: {{ selectedStates.map(({ value }) => value).join(", ") }}</li>
                <li v-show="selectedCounties.length > 0">that were collected in the following counties: {{ selectedCounties.map(({ value }) => value).join(", ") }}</li>
                <li v-show="selectedWatershed.length > 0">that were collected in the following watersheds: {{ selectedWatershed.map(({ value }) => value).join(",") }}</li>
                <li v-show="selectedSubwatershed.length > 0">that were collected in the following subwatersheds: {{ selectedSubwatershed.map(({ value }) => value).join(", ") }}</li>
                <li v-show="selectedGroups.length > 0">that were collected by the following groups: {{ selectedGroups.map(({ value }) => value).join(", ") }}</li>
                <li v-show="selectedStations.length > 0">that were collected at the following stations: {{ selectedStations.map(({ value }) => value).join(", ") }}</li>
                <li v-show="selectedParams.length > 0">that are associated with the following parameters: {{ selectedParams.map(({ name }) => name).join(", ") }}</li>
                <li v-show="formattedStartDateMap">that were collected after {{ formattedStartDateMap }}</li>
                <li v-show="formattedEndDateMap">that were collected before {{ formattedEndDateMap }}</li>
              </ul>
            </p>
            <div class="row q-mt-md">
              <div class="col">
                Choose optional metadata to include with download
              </div>
            </div>
            <div class="row q-mt-sm">
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
            <q-separator class="q-mt-md"/>
            <q-card-section>
              <div style="font-size:20px">Help us learn about you</div>
              <div class="row q-mt-md">
                <div class="col">
                  <!--, val => !!val || 'Email is required']"-->
                  <q-input v-model="email" label="Email" :dense="dense"
                    :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
                  />
                  <q-select  v-model="selectedOccupation" :options="occupationOptions" label="Occupation" />
                  <q-select class="q-mt-md" v-model="selectedPurpose" :options="purposeOptions" label="Purpose" />
                  <q-input
                    v-model="comments"
                    class="q-mt-md"
                    label="Comments"
                    type="textarea"
                  />
                </div>
              </div>
            </q-card-section>


            <div class="row q-mt-sm">
              <div class="col">

              </div>
            </div>

            <div class="row q-mt-sm">
              <div class="col">
                Please acknowledge data use prior to download:
              </div>
            </div>

            <div class="row q-mt-sm">
              <div class="col" style="max-width: 40px">
                <q-checkbox v-model="dataUseAcknowledgment" />
              </div>
              <div class="col q-pt-xs text-caption">
                I as the data user acknowledge that the data belong to the
                original data provider and will properly credit the data
                provider(s) in any product that uses their data.
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup :disabled="!dataUseAcknowledgment"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="row q-mt-lg">
        <div class="col">
          <q-separator />
        </div>
      </div>

      <!-- results -->
      <div class="row q-py-lg q-px-md results-title">
        <div class="col title-font">Currently Viewing</div>
        <div class="col-2" style="max-width: 70px">
          <q-icon class="fa-solid fa-circle-info" size="24px" color="primary">
            <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
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

          <!--            <q-icon class="fa-solid fa-arrow-left" size="24px" />-->
          <q-btn
            v-show="tableCollapsed"
            icon="fa-solid fa-arrow-down"
            @click="tableCollapsed = !tableCollapsed"
            round
            flat
            color="primary"
            class=""
          />

          <!--              <q-icon class="fa-solid fa-arrow-right" size="24px" />-->
          <q-btn
            v-show="!tableCollapsed"
            icon="fa-solid fa-arrow-up"
            @click="tableCollapsed = !tableCollapsed"
            round
            flat
            color="primary"
            class=""
          />
        </div>
      </div>
      <div v-show="!tableCollapsed" class="row">
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
              <div
                class="result-details-header-text-1"
                v-show="showStationDetails"
              >
                {{ selectedStationDetails.code }}
              </div>
              <div
                class="result-details-header-text-1"
                v-show="!showStationDetails"
              >
                Select a station on the map or table above to view details.
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails"
              >
                Monitored by: {{ selectedStationDetails.groupNames }}
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails"
              >
                Location: {{ selectedStationDetails.latitude }},
                {{ selectedStationDetails.longitude }}
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails"
              >
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
          <div v-show="showStationDetails">
            <!-- details -->
            <div class="row q-mt-md">
              <div class="col-3 q-pr-xl" v-show="selectedDataType=='Water Quality'">
                <q-select
                  label="Data Type"
                  v-model="selectedParamTypePlot"
                  :options="paramTypeOptions"
                  outlined
                  bg-color="white"
                ></q-select>
              </div>
              <div class="col-3 q-pr-xl q-pl-xl" v-show="selectedDataType=='Water Quality'">
                <q-select
                  :label="
                    selectedParamTypePlot === 'Depth'
                      ? 'Depth (m)'
                      : 'Parameter'
                  "
                  v-model="primaryFilterPlot"
                  :options="filterOptionsPlot"
                  outlined
                  bg-color="white"
                />
              </div>
              <div class="col-3  ">
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
              <div class="col-3 q-pl-md">
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
              <div class="col-5">
                <q-btn
                  label="Filter Samples for station"
                  @click="getSamples(selectedStationDetails.id)"
                  color="primary"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div
                class="col-12 q-pr-xl"
                v-for="count in plotCount"
                :key="`plot-${count}`"
              >
                <DashboardPlot
                  :plotData="samplesForPlot"
                  :plotIndex="count"
                  :paramType="selectedParamTypePlot"
                  :dataType="selectedDataType"
                ></DashboardPlot>
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-10"></div>
              <div class="col-2">
                <div class="q-pa-md q-gutter-sm">

                <q-btn
                  round
                  color="teal"
                  icon="fas fa-minus"
                  @click="removePlot"
                />
                <q-btn
                  round
                  color="primary"
                  icon="fas fa-plus"
                  @click="addPlot"
                />
              </div>
              </div>
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
import _ from "lodash";

// import MapBox from "components/MapBoxOriginal.vue";
import MapBox from "components/MapBox.vue";
import DashboardPlot from "components/DashboardPlot.vue";

//import stations from "/src/assets/cmcV3_stations.json";
import { date } from "quasar";
import { EvaluationParameters, get } from "plotly.js-dist";

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
const selectedStationDetails = ref({});

const loading = ref[true];

const columns = [
  {
    name: "StationCode",
    required: true,
    label: "Station Name",
    align: "left",
    field: "StationCode",
    sortable: true,
  },
  {
    name: "GroupNames",
    align: "left",
    label: "Organization(s)",
    field: "GroupNames",
    sortable: true,
  },
  // {
  //   name: "Subwatershed",
  //   align: "left",
  //   label: "Water Body",
  //   field: "Subwatershed",
  //   sortable: true,
  // },
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
  // {
  //   name: "status",
  //   align: "left",
  //   label: "Status",
  //   field: "status",
  // },
];
const tableKey = ref(0);

//const stateOptions = computed(() => {
//  return [...new Set(filteredStations.value.map((s) => s.State))].sort();
//});
//const countyOptions = computed(() => {
//  return [...new Set(filteredStations.value.map((s) => s.CityCounty))].sort();
//});
//const watershedOptions = computed(() => {
//return watersheds as array sorted
//  return [...new Set(watersheds.value.map((s) => s.value))].sort();
//});
//const subwatershedOptions = computed(() => {
//  return [...new Set(filteredStations.value.map((s) => s.Subwatershed))].sort();
//});

/****************************
 * Ref/UI Variables
 ***************************/
const dataTypes = ["Water Quality", "Benthic Macroinvertebrates"];
const paramTypeOptions = ["Depth", "Parameter"];
const geoTypesOptions = ["Watershed", "Political"];
const occupationOptions = [
  "Coastal Resource Manager",
  "Federal Agency",
  "State Agency",
  "Local Government",
  "Non-Profit",
  "General Public",
  "Private Sector",
  "K-12 Student",
  "Undergraduate Student",
  "Graduate Student",
  "Scientist",
  "Educator",
  "Researcher",
  "Other",
];
const purposeOptions = [
  "Research",
  "Class Project",
  "Data Synthesis",
  "Regulatory",
  "Consulting",
  "Resource Management",
  "Education",
  "Outreach",
  "Other",
];
const collapsed = ref(false);
const tableCollapsed = ref(false);
const showCityState = ref(false);
const showWatersheds = ref(true);
const optionalMetaGroups = ref(false);
const optionalMetaStations = ref(false);
const optionalMetaParams = ref(false);
const optionalMetaCalibration = ref(false);
const dataUseAcknowledgment = ref(false);
const primaryFilterPlot = ref(null);
const filterOptionsPlot = ref([]);
const selectedGeoType = ref("Watershed");
const selectedDataType = ref("Water Quality");
const selectedDataTypeForLegend = ref("Water Quality");
const selectedParamTypePlot = ref("Depth");
const selectedStates = ref([]);
const selectedStations = ref([]);
const selectedCounties = ref([]);
const selectedWatershed = ref([]);
const selectedSubwatershed = ref([]);
const selectedGroups = ref([]);
const selectedParams = ref([]);
const selectedPurpose = ref("");
const selectedOccupation = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const comments = ref("");
const showQueryError = ref(false);
const stationDetailsContainer = ref();
const stations = ref(null);
const paramOptions = ref([]);
const paramsForMapFilter = ref([]);
const loadMaxDate = ref(new Date());
const loadMinDate = ref(new Date("11/1/1995"));
const watershedOptions = ref([]);
const subwatershedOptions = ref([]);
const stateOptions = ref([]);
const countyOptions = ref([]);
const dateFormat = "YYYY-MM-DD";
const STATIONS = "stations";
const samples = ref([]);
const samplesForPlot = ref([]);
const plotCount = ref(1);
const downloadDialog = ref(false); //show the download modal
const disabledDownload = ref(true); //disable the download button
//console.log(JSON.parse(localStorage.getItem(STATIONS)));
const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

if (
  typeof localStorage.getItem(STATIONS) !== null &&
  localStorage.getItem(STATIONS) !== ""
) {
  if (isJson(localStorage.getItem(STATIONS))) {
    console.log("isjson");
    try {
      console.log("trying this");
      stations.value = JSON.parse(localStorage.getItem(STATIONS));
      console.log(stations.value);
    } catch (e) {
      console.log("could not parse stations in local storage");
      console.log(e);
    }
  }
}
const rows = ref([]);
// const filteredStations = ref([
//   {
//     Name: "P7",
//     CityCounty: "Wicomico County",
//     EndDate: "11/06/2022",
//     GroupNames: "Nanticoke Watershed Alliance",
//     GroupCodes: "NWA",
//     Lat: 38.4555,
//     Long: -75.7569,
//     SamplesCount: 1539,
//     StartDate: "03/27/2017",
//     State: "Maryland",
//     StationId: 166,
//     WaterBody: "Barren Creek-Nanticoke River",
//     formattedEndDate: "November 6, 2022",
//     formattedStartDate: "March 27, 2017",
//     status: "historic",
//   },
// ]);
const filteredStations = ref([]);

//stations.value = localStorage.getItem(STATIONS);
//if (!stations.value) {
// stations.value = [
//   {
//     StationId: 148,
//     StationCode: "NWA.MANA3",
//     Lat: 38.4828,
//     Long: -75.8232,
//     EndDate: "11/07/2022",
//     StartDate: "03/27/2017",
//     GroupName: "Nanticoke Watershed Alliance",
//     GroupCode: "NWA",
//     SamplesCount: 3206,
//     Status: "Current",
//   },
// ];
//}

//Make a mask for the q-input in the form of ####-##-##
const dateMask = dateFormat.replace(/[DMY]/g, "#");

const formattedStartDateMap = ref(
  date.formatDate(loadMinDate.value, dateFormat)
);
const formattedEndDateMap = ref(date.formatDate(loadMaxDate.value, dateFormat));
//Format the date for display in the q-input.
const formattedStartDatePlot = ref(
  date.formatDate(new Date(props.startDatePlot), dateFormat)
);
const formattedEndDatePlot = ref(
  date.formatDate(new Date(props.endDatePlot), dateFormat)
);

/****************************
 * Functions
 ***************************/

//add a plot to the page
const addPlot = () => {
  plotCount.value++;
};
const removePlot = () => {
  if (plotCount.value > 1) {
    plotCount.value--;
  }
};
const validateEmail = (email) => {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

const getStationsFromCMC = async (load) => {
  if (!load) {
    stateOptions.value = [];
    countyOptions.value = [];
    watershedOptions.value = [];
    subwatershedOptions.value = [];
    paramOptions.value = [];
  }
  if(selectedDataType.value !== selectedDataTypeForLegend.value){
    selectedDataTypeForLegend.value = selectedDataType.value;
  }
  console.log("getStationsFromCMC");
  console.log(selectedWatershed.value);
  const groupCodesCsv = selectedGroups.value
    .map(({ value }) => value)
    .join(",");

  const paramIdsCsv = selectedParams.value.map(({ value }) => value).join(",");
  const watershedsCsv = selectedWatershed.value
    .map(({ value }) => value)
    .join(",");
  console.log("watersheds");
  console.log(watershedsCsv);
  const countiesCsv = selectedCounties.value
    .map(({ value }) => value)
    .join(",");
  const statesCsv = selectedStates.value.map(({ value }) => value).join(",");

  console.log("selectedStations.value");
  console.log(selectedStations.value);
  const stationsCsv = selectedStations.value
    .map(({ value }) => value)
    .join(",");
  const subwatershedsCsv = selectedSubwatershed.value
    .map(({ value }) => value)
    .join(",");

  const payload = {
    dataType: selectedDataType.value,
    groups: groupCodesCsv,
    stations: stationsCsv,
    states: statesCsv,
    counties: countiesCsv,
    watersheds: watershedsCsv,
    subwatersheds: subwatershedsCsv,
    parameters: paramIdsCsv,
    startDate: formattedStartDateMap.value,
    endDate: formattedEndDateMap.value,
  };
  console.log("getting stations from CMC");
  console.log("current time1: " + new Date().toLocaleTimeString());
  console.log(payload);

  axios
    .post(
      "https://cmc.vims.edu/DashboardApi/FetchStationsForMap",
      //"https://cmc.vims.edu/odata/FetchStationsForDashboardMap",
      payload
    )
    .then((res) => {
      console.log("current time2: " + new Date().toLocaleTimeString());
      const res_str = JSON.stringify(res.data);
      console.log("res_str");
      console.log(res_str);
      stations.value = res.data;
      console.log(res.data.length);
      console.log(res.data);
      if (load & (res.data.length > 0)) {
        localStorage.setItem(STATIONS, res_str);
      }
    })
    .catch((error) => {
      if (load) {
        stations.value = JSON.parse(localStorage.getItem(STATIONS));
      }
      console.log("getStationsFromCMC error");
      console.log(error);
    });
  //const res = await axios.get("/src/assets/spatial/stations.json", payload);

  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSubWatershedsForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {
        subwatershedOptions.value = response.data;
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchWatershedsForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {
        watershedOptions.value = response.data;
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchParametersForMap", payload)
    .then((response) => {
      console.log("paramOptions.value");
      if (response.data.length > 0) {
        paramOptions.value = response.data;
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchCountiesForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {
        countyOptions.value = response.data;
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchStatesForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {
        stateOptions.value = response.data;
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
};

const aggregateStations = () => {
  if (stations.value === null || stations.value.length === 0) {
    return;
  }
  console.log("aggregate stations");
  console.log(stations.value);
  console.log("agg time: " + new Date().toLocaleTimeString());
  let transformedStations = stations.value.map(transformStation);

  //define max date as EndDate of the most recent station in transformedStations
  let maxDate = new Date(
    Math.max.apply(
      null,
      transformedStations.map((s) => new Date(s.EndDate))
    )
  );

  //define min date as StartDate of the oldest station in transformedStations. exclude nulls
  let minDate = new Date(
    Math.min.apply(
      null,
      transformedStations.map((s) => new Date(s.StartDate))
    )
  );
  console.log("AGG time2: " + new Date().toLocaleTimeString());

  formattedStartDateMap.value = date.formatDate(minDate, dateFormat);
  formattedEndDateMap.value = date.formatDate(maxDate, dateFormat);
  let aggregatedStations = [];

  //this will aggregate stations with the same station id and concatenate group names and
  //get minium StartDate and maximum EndDate
  transformedStations.forEach((station) => {
    station.GroupNames = station.GroupName;
    const existingStation = aggregatedStations.find(
      (s) => s.StationId === station.StationId
    );

    //check if station StartDate is less

    if (existingStation) {
      existingStation.GroupNames = `${existingStation.GroupName}, ${station.GroupName}`;
      existingStation.GroupCodes = `${existingStation.GroupCode}, ${station.GroupCode}`;
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
  console.log("agg time3: " + new Date().toLocaleTimeString());

  filteredStations.value = aggregatedStations;
};

const getUniqueValues = (data, param, reset) => {
  console.log("getUniqueParams", data);
  let uniqueParams = [];
  if (param == "Parameter") {
    //push unique parameterCode in samples to uniqueParams array. Only include one instance of each parameterCode
    //in the uniqueParams array.
    uniqueParams = data.reduce((acc, sample) => {
      if (!acc.includes(sample.parameterCode)) {
        acc.push(sample.parameterCode);
      }
      return acc;
    }, []);
  } else if (param == "Depth") {
    uniqueParams = data.reduce((acc, sample) => {
      if (!acc.includes(sample.depth)) {
        acc.push(sample.depth);
      }
      return acc;
    }, []);
  }
  console.log("uniqueParams", uniqueParams);
  filterOptionsPlot.value = uniqueParams;
  //set the primaryFilterPlot to the first value in the uniqueParams array
  if (
    primaryFilterPlot.value == null ||
    primaryFilterPlot.value == "" ||
    reset
  ) {
    primaryFilterPlot.value = uniqueParams[0];
  }
};

/****************************
 * Computed Properties
 ***************************/
// computed properties here

const groupOptions = computed(() => {
  if (stations.value !== null && stations.value.length > 0) {
    console.log("stations.value");
    console.log(stations.value);
    let subStations = stations.value.map(transformStation);
    subStations = subStations.map((s) => ({
      name: s.GroupName,
      value: s.GroupCode,
    }));

    console.log("subStations");
    console.log(subStations);

    //get unique stations by stationCode
    const uniqueGroups = new Map(subStations.map((o) => [o.name, o])).values();

    console.log("uniqueGroups");
    console.log(uniqueGroups);

    const sortedOptions = [...uniqueGroups].sort((a, b) =>
      a.name.localeCompare(b.name)
    ); //;

    console.log("sortedOptions");
    console.log(sortedOptions);

    return [...sortedOptions];
  } else {
    return [];
  }
});

//create stationIdOptions from filteredStations with value and labl as StationCode
const stationIdOptions = computed(() => {
  if (filteredStations.value !== null && filteredStations.value.length > 0) {
    const options = filteredStations.value.map((s) => ({
      value: s.StationCode,
    }));

    //sort fi
    const sortedOptions = [...options].sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    return [...sortedOptions];
  } else {
    return [];
  }
});

const showStationDetails = computed(() => {
  return Object.keys(selectedStationDetails.value).length > 0;
});

// const stationIdOptions = computed(() => {
//   return [...new Set(filteredStations.value.map((s) => s.StationCode))].sort(
//     (a, b) => a - b
//   );
// });

//const paramOptions = ref(["WT.1", "PH.1", "DO.1"]);

//computed(() => {
//   const allParameters = filteredStations.value.map((s) =>
//     s.ParameterCodes.split(",").map((param) => param.trim())
//   );
//   const flattenedParamCodes = allParameters.flat();

//   return [...new Set(flattenedParamCodes)].sort();
// });

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

watch(selectedParamTypePlot, () => {
  console.log("selectedParamTypePlot changed");
  console.log(selectedParamTypePlot.value);
  //if the selectedParamTypePlot is Depth, then filter the filterOptionsPlot to only include unique depths from samples.
  //the unique depth should only include one instance of each depth value.
  getUniqueValues(samples.value, selectedParamTypePlot.value, true);
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

watch(paramsForMapFilter, () => {
  console.log("paramsForMapFilter changed");
  console.log(paramsForMapFilter.value);
});

watch(paramOptions, () => {
  console.log("paramsOptions changed");
  console.log(paramOptions.value);
});

watch(groupOptions, () => {
  console.log("groupOptions changed");
  console.log(groupOptions.value);
});

watch(stations, () => {
  if (stations.value.length > 0 && stations.value !== null) {
    console.log("stations changed");
    console.log(stations.value);
    aggregateStations();
  }
});

watch(filteredStations, () => {
  console.log("filteredStations changed");
  console.log(filteredStations.value);
  rows.value.splice(0, rows.value.length, ...filteredStations.value);
  console.log("rows");
  console.log(rows);
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
  formattedEndDateMap,
  formattedStartDateMap,
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
  formattedStartDateMap.value = date.formatDate(loadMinDate.value, dateFormat);
  formattedEndDateMap.value = date.formatDate(loadMaxDate.value, dateFormat);
  getStationsFromCMC(true);
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

// function applyFilters() {
//   const filterFunctions = [
//     matchWatershed,
//     matchSubwatershed,
//     matchState,
//     matchCounty,
//     matchGroup,
//     matchStation,
//     matchParams,
//     matchStartDate,
//     matchEndDate,
//   ];

//   const noFilterApplied = filterFunctions.every(
//     (filter) => filter.length === 0
//   );

//   if (noFilterApplied) {
//     filteredStations.value = stations.value.map(transformStation);
//     return;
//   }

//   filteredStations.value = stations.value
//     .filter((s) => filterFunctions.every((filter) => filter(s)))
//     .map(transformStation);
// }
// function checkDate(val) {
//   return Quasar.utils.date.isValid(val) || "Invalid date.";
// }

// const dateRule = [
//   (v) => (v === null || isValidDate(v) ? true : "Invalid Date"),
// ];

function isValidDate(value) {
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegEx.test(value);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-us", options);
}

function transformStation(station) {
  //let transformStation = {};
  let transformStation = station;
  // station.forEach((item) => {
  //   transformStation[item["Key"]] = item["Value"];
  // });
  const formattedStartDate = formatDate(transformStation.StartDate);
  const formattedEndDate = formatDate(transformStation.EndDate);

  return {
    ...transformStation,
    formattedStartDate: formattedStartDate,
    formattedEndDate: formattedEndDate,
  };
}

function getSamples(stationId) {
  console.log("getSamples");
  if (!stationId) {
    return;
  }
  const payload = {
    stationId: stationId,
    startDate: formattedStartDatePlot.value,
    endDate: formattedEndDatePlot.value,
    dataType: selectedDataType.value,
  };
  console.log("payload");
  console.log(payload);
  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSamplesForPlot", payload)
    .then((response) => {
      console.log("fetch samples for plot");
      console.log(response.data);
      if (response.data.length > 0) {
        samples.value = response.data;

        if(selectedDataType.value === "Water Quality"){
          getUniqueValues(response.data, selectedParamTypePlot.value);
          filterSamples(
            response.data,
            selectedParamTypePlot.value,
            primaryFilterPlot.value
          );
        }else{
          //get count of response.data.value for each unique response.sampleDate in response.data and write to new array
          //get unique sampleDates
          let uniqueSampleDates = response.data.reduce((acc, sample) => {
            if (!acc.includes(sample.dateTime)) {
              acc.push(sample.dateTime);
            }
            return acc;
          }, []);
          console.log("uniqueSampleDates");
          console.log(uniqueSampleDates);
          //sum the value for each unique sampleDate and write to new array
          let aggSamples = uniqueSampleDates.map((date) => {
            let sumCount = response.data.reduce((acc, sample) => {
              if (sample.dateTime === date) {
                acc += sample.value;
              }
              return acc;
            }, 0);
            let speciesCount = response.data.reduce((acc, sample) => {
              console.log("sample",sample);
              if (sample.dateTime === date) {
                acc += 1;
              }
              return acc;
            }, 0);
            return { sampleDate: date, totalCount: sumCount, speciesCount: speciesCount};
          });

          console.log("aggSamples");
          console.log(aggSamples);
          samplesForPlot.value = aggSamples;
        }
      } else {
        console.log("no samples returned");
      }
    })
    .catch((error) => console.log(error));
}

function filterSamples(data, paramType, value) {
  console.log("filterSamples");
  console.log(data);
  console.log(value);
  if (paramType == "Parameter") {
    samplesForPlot.value = data.filter((s) => s.parameterCode === value);
  } else if (paramType == "Depth") {
    samplesForPlot.value = data.filter((s) => s.depth === value);
  }
}

function transformParameter(param) {
  let transformParameter = {};
  param.forEach((item) => {
    transformParameter[item["Key"]] = item["Value"];
  });

  return transformParameter;
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
  getSamples(station.id);
}

/****************************
 * View Lifecycle Methods
 ***************************/

onMounted(() => {
  if (stations.value !== null) {
    aggregateStations();
  }

  clearFilters();
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
