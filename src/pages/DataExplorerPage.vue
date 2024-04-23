<template>
  <q-page class="q-px-none q-mx-none">
    <div class="q-px-xl q-mx-xl">

      <!-- stats bar -->
      <div class="row q-mt-lg viewing-stats">
        <!--<div class="col-1">Currently Viewing:</div>-->
        <div class="col-12 col-md-3">
          <q-icon class="fa-solid fa-file-lines q-mr-sm" size="32px" />
          <span class='vertical-middle' style="font-size:20px">{{ sampleCount }} Samples</span>
        </div>
        <div class="col-12 col-md-3">
          <q-icon class="fa-solid fa-building q-mr-sm" size="32px" />
          <span class='vertical-middle' style="font-size:20px">{{ organizationsCount }} Organizations</span>
        </div>
        <div class="col-12 col-md-3">
          <q-icon class="fa-solid fa-location-dot q-mr-sm" size="32px" />
          <span class='vertical-middle' style="font-size:20px">{{ stationsCount }} Total Stations</span>
        </div>
        <div class="col-12 col-md-3">
          <q-icon class="fa-solid fa-location-dot q-mr-sm" size="32px" :class="{
                    'dot-purple': selectedDataType == 'Water Quality',
                    'dot-orange': selectedDataType != 'Water Quality',
                  }" />
          <span class='vertical-middle' style="font-size:20px"
                >{{ activeStationsCount }} Active Stations</span>
          <q-icon class="fa-solid fa-circle-info q-ml-xl" size="22px">
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
                  data users. The statistics above the map reflect the stations and
                  associated data currently being viewed on the map and in the table below. Active stations are those that have been sampled in the last 5 years.
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
                size="22px"
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
          <div class="row">
            <div class="col">
              <q-label style='color:teal' class="text-h6">Map Data Layers</q-label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-y-md">
                  <q-btn-toggle
                    v-model="selectedDataType"
                    spread
                    no-caps
                    rounded
                    toggle-color="primary"
                    color="white"
                    text-color="black"
                    :options="dataTypes"
                  ></q-btn-toggle>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-y-md">
                  <q-btn-toggle
                    v-model="selectedGeoType"
                    spread
                    no-caps
                    rounded
                    toggle-color="primary"
                    color="white"
                    text-color="black"
                    :options="geoTypesOptions"
                  ></q-btn-toggle>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Data Type"
                v-model="selectedDataType"
                :options="dataTypes"
                outlined
                color="teal"
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
                color="teal"
                dense
              ></q-select>
            </div>
          </div>-->
          <div class="row">
            <div class="col">
              <q-label style='color:teal' class="text-h6">Station Filters</q-label>
            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col">
              <q-select
                label="States (pick all that apply)"
                v-model="selectedStates"
                :options="stateFilteredOptions"
                ref="qselectState"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'state')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedStates.length > 0" @click="selectedStates =[]" class="cursor-pointer" />
                </template>
            </q-select>

            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col">
              <q-select
                label="City/County (pick all that apply)"
                v-model="selectedCounties"
                :options="countyFilteredOptions"
                ref="qselectCounty"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'county')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedCounties.length > 0" @click="selectedCounties =[]" class="cursor-pointer" />
                </template>
              </q-select>

            </div>
          </div>
          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col">
              <q-select
                label="Watersheds (pick all that apply)"
                v-model="selectedWatershed"
                :options="watershedFilteredOptions"
                ref="qselectWatershed"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'watershed')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedWatershed.length > 0" @click="selectedWatershed =[]" class="cursor-pointer" />
                </template>
              </q-select>
            </div>
          </div>
          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col">
              <q-select
                label="Subwatersheds (pick all that apply)"
                v-model="selectedSubwatershed"
                ref="qselectSubwatershed"
                :options="subwatershedFilteredOptions"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'subwatershed')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedSubwatershed.length > 0" @click="selectedSubwatershed =[]" class="cursor-pointer" />
                </template>
            </q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Groups (pick all that apply)"
                v-model="selectedGroups"
                :options="groupFilteredOptions"
                ref="qselectGroup"
                option-value="value"
                option-label="name"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'group')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedGroups.length > 0" @click="selectedGroups =[]" class="cursor-pointer" />
                </template>
            </q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Stations (pick all that apply)"
                v-model="selectedStations"
                :options="stationIdFilteredOptions"
                ref="qselectStation"
                option-value="value"
                option-label="name"
                multiple
                outlined
                dense
                use-input
                color="teal"
                input-debounce="0"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'station')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedStations.length > 0" @click="selectedStations =[]" class="cursor-pointer" />
                </template>
              </q-select>
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <q-select
                label="Parameters (pick all that apply)"
                v-model="selectedParams"
                :options="paramFilteredOptions"
                ref="qselectParameter"
                option-value="value"
                option-label="name"
                multiple
                outlined
                dense
                use-input
                input-debounce="0"
                v-show="selectedDataType == 'Water Quality'"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'parameter')"
              >
                <template v-slot:append>
                  <q-icon name="close" v-show="selectedParams.length > 0" @click="selectedParams =[]" class="cursor-pointer" />
                </template>
              </q-select>
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
          <div class="row q-mt-lg">
            <div class="col text-center">
              <q-btn
                label="Filter Map"
                @click="getStationsFromCMC(false)"
                color="primary"
                style="width: 90%"
                :loading="filtering"
                icon="fas fa-filter"
                >
                <template v-slot:loading>
                  <q-spinner-gears /><span class="q-ml-sm">Filtering</span>
                </template>
              </q-btn>

            </div>
            <div class="col text-center">
              <q-btn
                label="Clear Filters"
                @click="clearFilters"
                color="primary"
                style="width: 90%"
                icon="fas fa-eraser"
              >
              </q-btn>
            </div>
          </div>
          <div class="row q-mt-sm">
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
                icon="fas fa-download"
              />
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="downloadDialog" >
        <q-card style="width: 800px; max-width: 90vw;" bg-grey-9 text-white>
          <q-card-section>

            <div class="row">
              <div class="col">
                <div class="text-h6">Download</div>
              </div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  dense
                  icon="close"
                  class="q-mr-sm"
                  v-close-popup>
                </q-btn>
              </div>
          </div>
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
              <div class="col-6" >

                <q-checkbox
                  v-model="optionalMetaCalibration"
                  label="Calibration Samples"
                  v-show="selectedDataType == 'Water Quality'"
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
            <q-btn flat :loading="downloading" label="Accept" color="primary" icon="download" :disabled="!dataUseAcknowledgment" @click="downloadData">
              <template v-slot:loading>
                <q-spinner-gears /><span class="q-ml-sm">ACCEPT</span>
              </template>
            </q-btn>

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
        <div style='color:teal'  class="col text-h6">Currently Viewing</div>
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
            @row-click="onRowClick"

          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="font-size:16px; color:teal; font-weight: bold;"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
          </q-table>
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
                class="result-details-header-text-1 q-mt-lg"
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
              <!--<div class="col-3 q-pr-xl" v-show="selectedDataType=='Water Quality'">
                <q-select
                  label="Data Type"
                  v-model="selectedParamTypePlot"
                  :options="paramTypeOptions"
                  outlined
                  bg-color="white"
                ></q-select>
              </div>-->
              <div class="col-4" >
                <q-select
                  label="Sample Depth"
                  v-model="primaryFilterPlot"
                  :options="filterOptionsPlot"
                  option-value="value"
                  option-label="name"
                  outlined
                  bg-color="white"
                  style="width: 90%"
                />
              </div>
              <div class="col-4">
                <q-input
                  label="Start Date"
                  v-model="formattedStartDatePlot"
                  :mask="dateMask"
                  id="date-input"
                  outlined
                  style="width: 90%"
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
              <div class="col-4">
                <q-input
                  label="End Date"
                  v-model="formattedEndDatePlot"
                  :mask="dateMask"
                  id="date-input"
                  outlined
                  style="width: 90%"
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
            <!--<div class="row q-mt-md">
              <div class="col-5">
                <q-btn
                  label="Filter Samples for station"
                  @click="filterSamples(samples,selectedParamTypePlot,primaryFilterPlot.value);"
                  color="primary"
                />
              </div>
            </div>-->
            <div class="row q-mt-lg">
              <div class="col">
                <q-separator />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div
                class="col-12 q-pr-xl"
                v-for="count in plotCount"
                :key="`plot-${count}`"
              >
                <DashboardPlot
                  :plotData="samplesForPlot"
                  :stationName="selectedStationDetails.name"
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
import { EvaluationParameters, coerceSelectionMarkerOpacity, format, get, lengthToDegrees } from "plotly.js-dist";

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
  {
    name: "SamplesCount",
    align: "left",
    label: "Number of Samples",
    field: "SamplesCount",
  },
  // {
  //   name: "status",
  //   align: "left",
  //   label: "Status",
  //   field: "status",
  // },
];
const tableKey = ref(0);



/****************************
 * Ref/UI Variables
 ***************************/
const dataTypes = [
  {label: 'Water Quality', value: 'Water Quality'},
  {label: 'Benthic Macroinvertebrates', value: 'Benthic Macroinvertebrates'}
];

const paramTypeOptions = ["Sample Depth", "Parameter"];
const geoTypesOptions = [{ label: "Watershed", value: "Watershed" },
{ label: "Political", value: "Political" }];
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
const model = ref("one");
const secondModel = ref("one");
const qselectWatershed = ref(null);
const qselectSubwatershed = ref(null);
const qselectState = ref(null);
const qselectCounty = ref(null);
const qselectGroup = ref(null);
const qselectStation = ref(null);
const qselectParameter = ref(null);
const collapsed = ref(false);
const tableCollapsed = ref(false);
const showCityState = ref(false);
const showWatersheds = ref(true);
const optionalMetaGroups = ref(false);
const optionalMetaStations = ref(false);
const optionalMetaParams = ref(false);
const optionalMetaCalibration = ref(false);
const dataUseAcknowledgment = ref(false);
const primaryFilterPlot = ref('');
const filterOptionsPlot = ref([]);
const selectedGeoType = ref("Watershed");
const selectedDataType = ref("Water Quality");
const selectedDataTypeForLegend = ref("Water Quality");
const selectedParamTypePlot = ref("Sample Depth");
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

const paramsForMapFilter = ref([]);
const loadMaxDate = ref(new Date());
const loadMinDate = ref(new Date("1/1/1901"));
const watershedOptions = ref([]);
const watershedFilteredOptions = ref([]);
const subwatershedOptions = ref([]);
const subwatershedFilteredOptions = ref([]);
const stateOptions = ref([]);
const stateFilteredOptions = ref([]);
const countyOptions = ref([]);
const countyFilteredOptions = ref([]);
const groupFilteredOptions = ref([]);
const stationIdFilteredOptions = ref([]);
const paramOptions = ref([]);
const paramFilteredOptions = ref([]);
const dateFormat = "YYYY-MM-DD";
const STATIONS = "stations";
const samples = ref([]);
const samplesForPlot = ref([]);
const plotCount = ref(1);
const downloadDialog = ref(false); //show the download modal
const disabledDownload = ref(true); //disable the download button
const downloading = ref(false); //show the spinner
const filtering = ref(false); //show the spinner
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
  new Date(loadMinDate.value).toISOString().substring(0, 10)
);
const formattedEndDateMap = ref(
  new Date(loadMaxDate.value).toISOString().substring(0, 10)
);
//Format the date for display in the q-input.
const formattedStartDatePlot = ref(
  new Date(props.startDatePlot).toISOString().substring(0, 10)
);
const formattedEndDatePlot = ref(
  new Date(props.endDatePlot).toISOString().substring(0, 10)

);
/****************************
 * Functions
 ***************************/
 //const clearFilter = () => {
  //console.log('clearFilter',qselect.value)
  //console.log(qselect.value.modelValue)
      //if (qselect.value !== void 0) {
      //  qselect.value.updateInputValue('')
      //}
    //}
 const onRowClick = ((evt, row) => {
  console.log("row", row);
  console.log(selectedStationDetails.value);
  const station = {
    id: row.StationId,
    code: row.StationCode,
    groupNames: row.GroupNames,
    latitude: row.Lat,
    longitude: row.Long,
    startDate: row.formattedStartDate,
    endDate: row.formattedEndDate,
  };
  receiveEmit(station);
 });
 const filterFn = (val, update, abort, type) =>{
  if (val === '') {

    update(() => {
      if(type === 'watershed'){
        watershedFilteredOptions.value = watershedOptions.value
      }else if(type === 'subwatershed'){
        subwatershedFilteredOptions.value = subwatershedOptions.value
      }else if(type === 'state'){
        stateFilteredOptions.value = stateOptions.value
      }else if(type === 'county'){
        countyFilteredOptions.value = countyOptions.value
      }else if(type === 'group'){
        groupFilteredOptions.value = groupOptions.value
      }else if(type === 'station'){
        stationIdFilteredOptions.value = stationIdOptions.value
      }else if(type === 'parameter'){
        paramFilteredOptions.value = paramOptions.value
      }

    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    if(type === 'watershed'){
      watershedFilteredOptions.value = watershedOptions.value.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
    }else if(type === 'subwatershed'){
      subwatershedFilteredOptions.value = subwatershedOptions.value.filter(v => v.value.toLowerCase().indexOf(needle) > -1);
    }else if(type === 'state'){
      stateFilteredOptions.value = stateOptions.value.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
    }else if(type === 'county'){
      countyFilteredOptions.value = countyOptions.value.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
    }else if(type === 'group'){
      groupFilteredOptions.value = groupOptions.value.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
    }else if(type === 'station'){
      stationIdFilteredOptions.value = stationIdOptions.value.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
    }else if(type === 'parameter'){
      paramFilteredOptions.value = paramOptions.value.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
    }

  })
}

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

const formPayload =  () => {
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
  return payload;
};

const addDayToDate = (oldDate) => {
  console.log('adddaytodate',oldDate);
  let newDate = new Date(oldDate);
  newDate.setDate(newDate.getDate() + 1);
  console.log('newDate',newDate);
  newDate = new Date(newDate).toISOString().substring(0, 10);
  console.log('newDate',newDate);
  return newDate;
};


const downloadData = () => {
  const payload = formPayload();
  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined') {

    payload.endDate = addDayToDate(payload.endDate);
  }

  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSamplesForDownload", payload)
    .then((response) => {
      if (response.data.length > 0) {

        console.log("getSamplesForDownload");
        console.log(response.data);
        const samplesForDownload = response.data;
        //write response.data to csv download and include headers

        //let csv = Object.keys(response.data[0]).join(",") + "\n";
        const csv = samplesForDownload.map((row) =>
          Object.values(row).join(",")
        )
        csv.unshift(Object.keys(samplesForDownload[0]).join(","));
        const csvString = csv.join("\n");
        console.log('csvString',csvString);
        const blob = new Blob([csvString], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cmc_data.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        console.log("getParametersForDownload", samplesForDownload);
        //get unique parameter codes as comma separated string from samplesForDownload
        let paramCodes = [];
        let groupCodes = [];
        let stationCodes = [];
        samplesForDownload.forEach((sample) => {
          if (!paramCodes.includes(sample.ParameterCode)) {
            paramCodes.push(sample.ParameterCode);
          }
          if (!groupCodes.includes(sample.GroupCode)) {
            groupCodes.push(sample.GroupCode);
          }
          if (!stationCodes.includes(sample.StationCode)) {
            stationCodes.push(sample.StationCode);
          }
        });
        //change paramCodes into comma separated string
        paramCodes = paramCodes.join(",");
        paramCodes = {"parameters":paramCodes};
        groupCodes = groupCodes.join(",");
        groupCodes = {"groups":groupCodes};
        stationCodes = stationCodes.join(",");
        stationCodes = {"stations":stationCodes};
        console.log("paramCodes", paramCodes);
        console.log("groupCodes", groupCodes);
        console.log("optionalMetaParams", optionalMetaParams.value);
        console.log("optionalMetaGroups", optionalMetaGroups.value);
        if(optionalMetaParams.value){



          axios
          .post("https://cmc.vims.edu/DashboardApi/FetchParametersForDashboardDownload", paramCodes)
          .then((response) => {

            console.log("getParametersForDownload", response.data);

            if (response.data.length > 0) {
              //loop through each element in each object in response.data and replace comma with empty string

              let obj= JSON.stringify(response.data);
              obj= obj.replace(/(?=,(?!"))(,(?!{))/g,"");
              response.data= JSON.parse(obj)

              //
              const csv = response.data.map((row) =>
                Object.values(row).join(",")
              )
              console.log('csv-parameters',csv)              //
              csv.unshift(Object.keys(response.data[0]).join(","));
              const csvString = csv.join("\n");
              console.log('csvString',csvString);
              const blob = new Blob([csvString], {
                type: "text/csv",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cmc_parameters_metadata.csv";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          })
        }
        if(optionalMetaGroups.value){
          //get parameterIds from payload
          console.log("getGroupsForDownload", groupCodes);
          axios
          .post("https://cmc.vims.edu/DashboardApi/FetchGroupsForDashboardDownload", groupCodes)
          .then((response) => {
            console.log("getGroupsForDownload", response.data);
            if (response.data.length > 0) {
              //loop through each element in each object in response.data and replace comma with empty string

              let obj= JSON.stringify(response.data);
              obj= obj.replace(/(?=,(?!"))(,(?!{))/g,"");
              response.data= JSON.parse(obj)

              //
              const csv = response.data.map((row) =>
                Object.values(row).join(",")
              )
              console.log('csv-groups',csv)              //
              csv.unshift(Object.keys(response.data[0]).join(","));
              const csvString = csv.join("\n");
              console.log('csvString',csvString);
              const blob = new Blob([csvString], {
                type: "text/csv",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cmc_groups_metadata.csv";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          })
        }
        if(optionalMetaStations.value){
          //get parameterIds from payload
          console.log("getStationsForDownload", stationCodes);
          axios
          .post("https://cmc.vims.edu/DashboardApi/FetchStationsForDashboardDownload", stationCodes)
          .then((response) => {
            console.log("getStationsForDownload", response.data);
            if (response.data.length > 0) {
              //loop through each element in each object in response.data and replace comma with empty string

              let obj= JSON.stringify(response.data);
              obj= obj.replace(/(?=,(?!"))(,(?!{))/g,"");
              response.data= JSON.parse(obj)

              //
              const csv = response.data.map((row) =>
                Object.values(row).join(",")
              )
              console.log('csv-stations',csv)              //
              csv.unshift(Object.keys(response.data[0]).join(","));
              const csvString = csv.join("\n");
              console.log('csvString',csvString);
              const blob = new Blob([csvString], {
                type: "text/csv",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cmc_stations_metadata.csv";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          })
        }
        if(optionalMetaCalibration.value){
          //get parameterIds from payload
          console.log("getCalibrationForDownload", payload);
          axios
          .post("https://cmc.vims.edu/DashboardApi/FetchCalibrationForDashboardDownload", payload)
          .then((response) => {
            console.log("getCalibrationForDownload", response.data);
            if (response.data.length > 0) {
              //loop through each element in each object in response.data and replace comma with empty string

              let obj= JSON.stringify(response.data);
              obj= obj.replace(/(?=,(?!"))(,(?!{))/g,"");
              response.data= JSON.parse(obj)

              //
              const csv = response.data.map((row) =>
                Object.values(row).join(",")
              )
              console.log('csv-calibration',csv)              //
              csv.unshift(Object.keys(response.data[0]).join(","));
              const csvString = csv.join("\n");
              console.log('csvString',csvString);
              const blob = new Blob([csvString], {
                type: "text/csv",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cmc_calibration_metadata.csv";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          })
        }
        downloading.value = false;
      } else {
        downloading.value = false;
        console.log("getSamplesForDownload error");
        console.log(error);
      }
    })
    .catch((error) => console.log(error));

};

const getStationsFromCMC = async (load) => {
  if (!load) {
    stateOptions.value = [];
    groupOptions.value = [];
    countyOptions.value = [];
    stationIdOptions.value = [];
    watershedOptions.value = [];
    subwatershedOptions.value = [];
    paramOptions.value = [];
  }
  if(selectedDataType.value !== selectedDataTypeForLegend.value){
    selectedDataTypeForLegend.value = selectedDataType.value;
  }
  const payload = formPayload();
  filtering.value = true;

  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined' && !load) {

    payload.endDate = addDayToDate(payload.endDate);
  }
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
      filtering.value = false;
    })
    .catch((error) => {
      if (load) {
        stations.value = JSON.parse(localStorage.getItem(STATIONS));
      }
      console.log("getStationsFromCMC error");
      console.log(error);
      filtering.value = false;
    });
  //const res = await axios.get("/src/assets/spatial/stations.json", payload);

  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSubWatershedsForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {
        subwatershedOptions.value = response.data;
        console.log("subwatershedOptions.value", subwatershedOptions.value);
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
  if(selectedDataType.value === 'Water Quality'){
    axios
    .post("https://cmc.vims.edu/DashboardApi/FetchParametersForMap", payload)
    .then((response) => {
      console.log("paramOptions.value", response.data);
      console.log(response.data);
      if (response.data.length > 0) {

        paramOptions.value = response.data;
        //collapse parameters by name and concatenate value with comma delimiter
        paramOptions.value = _.chain(paramOptions.value)
          .groupBy("name")
          .map((value, key) => ({
            name: key,
            value: value.map((v) => v.value).join(", "),
          }))
          .value();
        //order paramOptions by name
        paramOptions.value.sort((a, b) => a.name.localeCompare(b.name));
        showQueryError.value = false;
      } else {
        showQueryError.value = true;
      }
    })
    .catch((error) => console.log(error));
  }
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

  formattedStartDateMap.value = new Date(minDate).toISOString().substring(0, 10);
  formattedEndDateMap.value = new Date(maxDate).toISOString().substring(0, 10);
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
  //sort aggregatedStations by StationCode
  aggregatedStations.sort((a, b) => a.StationCode.localeCompare(b.StationCode));
  filteredStations.value = aggregatedStations;
};

const getUniqueValues = (data, param) => {
  console.log("getUniqueParams", data);
  let uniqueParams = [];
  if (param == "Parameter") {
    //get unique parameter names from samples as label in object and collapse all parameter codes for that parameter name concatenated by comma as value
    uniqueParams = data.reduce((acc, sample) => {
      if (!acc.find((s) => s.name === sample.parameterName )) {
        acc.push({
          name: sample.parameterName,
          value: sample.parameterCode,
        });
      } else if(acc.find((s) => s.name === sample.parameterName && s.value.split(",").indexOf(sample.parameterCode) < 0)){
        //find the object with the same name and concatenate the value with a comma
        acc.find((s) => s.name === sample.parameterName).value += ", " + sample.parameterCode;
      }
      //sort acc
      //acc.sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, []);


  } else if (param == "Sample Depth") {
    uniqueParams = data.reduce((acc, sample) => {
      if (!acc.find((s) => s.name === String(sample.depth))) {
        acc.push({
          name: String(sample.depth),
          value: sample.depth,
        });
      }
      //sort acc
     // acc.sort((a, b) => a - b);
      return acc;
    }, []);
  }
  console.log("uniqueParams", uniqueParams);
  //sort uniqueParams by name
  uniqueParams.sort((a, b) => a.name.localeCompare(b.name));

  filterOptionsPlot.value = uniqueParams;

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
    console.log("filteredStations.value", filteredStations.value);
    const options = filteredStations.value.map((s) => ({
      value: s.StationCode,
      name: s.StationCode.substring(s.StationCode.indexOf('.')+1) + " (" + s.StationCode.split(".")[0] + ")",
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

const activeStationsCount = computed(() => {
  return new Intl.NumberFormat().format(filteredStations.value.filter(v=>v.Status=="Current").length);
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

//set the primaryFilterPlot to the first value in the uniqueParams array

watch(filterOptionsPlot, () => {
  primaryFilterPlot.value = filterOptionsPlot.value[0];
  filterSamples(
            samples.value,
            selectedParamTypePlot.value,
            primaryFilterPlot.value.value
          );
});
watch(primaryFilterPlot, () => {
  filterSamples(
            samples.value,
            selectedParamTypePlot.value,
            primaryFilterPlot.value.value
          );
});
watch(formattedEndDatePlot, () => {
  filterSamples(
            samples.value,
            selectedParamTypePlot.value,
            primaryFilterPlot.value.value
          );
});
watch(formattedStartDatePlot, () => {
  filterSamples(
            samples.value,
            selectedParamTypePlot.value,
            primaryFilterPlot.value.value
          );
});
watch(selectedWatershed, () => {
 qselectWatershed.value.updateInputValue('');
});
watch(selectedSubwatershed, () => {
  qselectSubwatershed.value.updateInputValue('');
});
watch(selectedStates, () => {
  if(qselectState.value !== null){
    qselectState.value.updateInputValue('');
  }
});
watch(selectedCounties, () => {
  if(qselectState.value !== null){
    qselectCounty.value.updateInputValue('');
  }
});
watch(selectedGroups, () => {
  qselectGroup.value.updateInputValue('');
});
watch(selectedStations, () => {
  qselectStation.value.updateInputValue('');
});
watch(selectedParams, () => {
  qselectParameter.value.updateInputValue('');
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
  //if the selectedParamTypePlot is Depth, then filter the filterOptionsPlot to only include unique depths from samples.
  //the unique depth should only include one instance of each depth value.
  getUniqueValues(samples.value, selectedParamTypePlot.value);
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

watch(selectedDataType, () => {
  selectedStates.value = [];
  selectedStations.value = [];
  selectedCounties.value = [];
  selectedWatershed.value = [];
  selectedSubwatershed.value = [];
  selectedGroups.value = [];
  selectedParams.value = [];
  formattedStartDateMap.value = new Date(loadMinDate.value).toISOString().substring(0, 10);
  formattedEndDateMap.value = new Date(loadMaxDate.value).toISOString().substring(0, 10);
  getStationsFromCMC(true);
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
  formattedStartDateMap.value = new Date(loadMinDate.value).toISOString().substring(0, 10);
  formattedEndDateMap.value = new Date(loadMaxDate.value).toISOString().substring(0, 10);
  stations.value = JSON.parse(localStorage.getItem(STATIONS));
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
//check if formattedEndDatePlot.value is a valid date


  const payload = {
    stationId: stationId,
    startDate: formattedStartDatePlot.value,
    endDate: formattedEndDatePlot.value,
    dataType: selectedDataType.value,
  };

  console.log("payload",payload);

  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined') {

    payload.endDate = addDayToDate(payload.endDate);
  }
  console.log("payload2");
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
              //console.log("sample",sample);
              if (sample.dateTime === date) {
                acc += 1;
              }
              return acc;
            }, 0);
            return { sampleDate: date, totalCount: sumCount, speciesCount: speciesCount};
          });

          console.log("aggSamples");
          console.log(aggSamples);
          samples.value = aggSamples;
          samplesForPlot.value = aggSamples;
        }
      } else {
        console.log("no samples returned");
      }
    })
    .catch((error) => console.log(error));
}

function filterSamples(data, paramType, value) {
  if(selectedDataType.value === "Water Quality"){
    if (paramType == "Parameter") {

      console.log(value.split(","));

      data = data.filter((s) => value.split(",").includes(s.parameterCode));
      console.log("samplesForPlot!!!!!!!",samplesForPlot.value);
    } else if (paramType == "Sample Depth") {
      data = data.filter((s) => s.depth === value);
    }
  }
  console.log("samplesForPlot",samplesForPlot.value);
  console.log("formattedStartDatePlot",formattedStartDatePlot.value);
  console.log("formattedEndDatePlot",formattedEndDatePlot.value);
  //filter samples by startDate and endDate
  samplesForPlot.value = data.filter((s) => {
    console.log('s',s)
    let sampleDate = new Date();
    //sampleDate = new Date(s.dateTime);
    if(selectedDataType.value === 'Water Quality'){
      sampleDate = new Date(s.dateTime);
    }else{
      sampleDate = new Date(s.sampleDate);
    }
    const startDate = new Date(formattedStartDatePlot.value);
    let endDate = new Date(formattedEndDatePlot.value);
    endDate.setDate(endDate.getDate() + 1);
    console.log("sampleDate",sampleDate);
    console.log("startDate",startDate);
    console.log("endDate",endDate);
    return sampleDate >= startDate && sampleDate <= endDate;
  });
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
  selectedStationDetails.value.name= station.code.substring(station.code.indexOf('.')+1)

  console.log("selectedStationDetails");
  console.log(selectedStationDetails);
  stationDetailsContainer.value.scrollIntoView({ behavior: "smooth" });
  console.log("station end date");
  console.log(station.endDate);

  formattedEndDatePlot.value = new Date(station.endDate).toISOString().substring(0, 10);

  formattedStartDatePlot.value = new Date(station.startDate).toISOString().substring(0, 10);
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
  .dot-orange {

    color: #8b6508;
  }

  .dot-purple {

    color: #990799;
  }
</style>
