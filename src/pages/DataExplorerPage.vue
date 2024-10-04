<template>
  <q-page class="q-px-none q-mx-none">
    <div class="q-px-sm q-mx-sm">
      <!-- stats bar -->
      <div class="viewing-stats q-mt-md">
        <div class="row">
          <!--<div class="col-1">Currently Viewing:</div>-->
            <div class="col">
              <q-icon class="fa-solid fa-file-lines" size="24px" />
              <span class='vertical-middle' style="font-size:18px">{{ sampleCount }} Samples</span>
            </div>
            <div class="col">
              <q-icon class="fa-solid fa-building" size="24px" />
              <span class='vertical-middle' style="font-size:18px">{{ organizationsCount }} Organizations</span>
            </div>
            <div class="col">
              <q-icon class="fa-solid fa-location-dot" size="24px" />
              <span class='vertical-middle' style="font-size:18px">{{ stationsCount }} Total Stations</span>
            </div>
            <div class="col">
              <q-icon class="fa-solid fa-location-dot" size="24px" :class="{
                        'dot-purple': selectedDataType == 'Water Quality',
                        'dot-orange': selectedDataType != 'Water Quality',
                      }" />
              <span class='vertical-middle' style="font-size:18px"
                    >{{ activeStationsCount }} Active Stations</span>
            </div>
            <div class="col ">
              <q-icon class="fa-solid fa-calendar" size="24px" />
              <span class='vertical-middle' style="font-size:18px">{{ formattedStartDateStats }} - {{formattedEndDateStats}}</span>
            </div>
            <div class="col-1">
              <q-icon class="fa-solid fa-circle-info q-ml-md" size="22px" @click="helpClick('main')">
              </q-icon>
            </div>
        </div>
      </div>

      <!-- map/form -->
      <div class="row q-mt-md">
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


          </div>
          <div class="row">
            <div class="col-md-10">
              <q-label style='color:teal' class="text-h6">Map Data Layers</q-label>
            </div>
            <div class="col-md-1 text-right q-mt-sm">
              <q-icon
                class="fa-solid fa-circle-info"
                size="22px"
                color="primary"
                @click="helpClick('mapDataLayers')"
              >

              </q-icon>
            </div>
            <div class="col-1">
              <!--              <q-icon class="fa-solid fa-arrow-right" size="24px" />-->
              <q-btn
                icon="fa-solid fa-arrow-right"
                @click="collapsed = !collapsed"
                round
                flat
                color="primary"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="q-pa-sm">
                <div class="q-gutter-y-md">
                  <q-btn-toggle
                    v-model="selectedDataType"
                    spread
                    no-caps
                    rounded
                    dense
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
              <div class="q-pa-sm">
                <div class="q-gutter-y-md">
                  <q-btn-toggle
                    v-model="selectedGeoType"
                    spread
                    no-caps
                    rounded
                    dense
                    toggle-color="primary"
                    color="white"
                    text-color="black"
                    :options="geoTypesOptions"
                  ></q-btn-toggle>
                </div>
              </div>
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-md-6">
              <q-label style='color:teal' class="text-h6">Data Filters</q-label>
            </div>
            <div class="col-md-5 text-center">
              <q-btn
                label="Clear Filters"
                @click="clearFilters"
                color="red"
                style="width: 90%; "
                icon="fas fa-eraser"
              >
              </q-btn>
            </div>
            <div class="col-1 text-right  q-mt-sm">
              <q-icon
                class="fa-solid fa-circle-info"
                size="22px"
                color="primary"
                @click="helpClick('dataFilters')"
              >

              </q-icon>
            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col-11">
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
                color="teal"
                menu-anchor="bottom left"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'state')"
                >

              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedStates.length > 0"
                @click="selectedStates =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>
          <div v-if="showCityState" class="row q-mt-md">
            <div class="col-11">
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
                color="teal"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'county')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedCounties.length > 0"
                @click="selectedCounties =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>
          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col-11">
              <q-select
                label="Watersheds (HUC 6) (pick all that apply)"
                v-model="selectedWatershed"
                :options="watershedFilteredOptions"
                ref="qselectWatershed"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                color="teal"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'watershed')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedWatershed.length > 0"
                @click="selectedWatershed =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>

          <div v-if="showWatersheds" class="row q-mt-md">
            <div class="col-11">
              <q-select
                label="Subwatersheds (HUC 12) (pick all that apply)"
                v-model="selectedSubwatershed"
                ref="qselectSubwatershed"
                :options="subwatershedFilteredOptions"
                option-value="value"
                option-label="value"
                multiple
                outlined
                dense
                color="teal"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'subwatershed')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedSubwatershed.length > 0"
                @click="selectedSubwatershed =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col-11">
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
                color="teal"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'group')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedGroups.length > 0"
                @click="selectedGroups =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col-11">
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
                color="teal"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'station')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedStations.length > 0"
                @click="selectedStations =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col-11">
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
                color="teal"
                v-show="selectedDataType == 'Water Quality'"
                @filter="(val, update, abort) => filterFn(val, update, abort, 'parameter')"
              >
              </q-select>
            </div>
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="selectedParams.length > 0"
                @click="selectedParams =[]"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col-5 q-pr-xs">
              <!--              <q-select label="Start Date" outlined dense></q-select>-->
              <q-input
                label="Start Date"
                v-model="formattedStartDateMap"
                dense
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
                        :options="dateOptionsFn"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="red"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-1 q-pr-xs"></div>
            <div class="col-5 q-pl-xs">
              <!--              <q-select label="End Date" outlined dense></q-select>-->
              <q-input
                label="End Date"
                v-model="formattedEndDateMap"
                dense
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
                        :options="dateOptionsFn"

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
            <div class="col-1">
              <q-btn
                icon="close"
                name="close" v-show="(formattedEndDateMap != '' || formattedStartDateMap != '') && showDateClose"
                @click="formattedEndDateMap = ''; formattedStartDateMap = '';"
                class="cursor-pointer"
                color="red"
                flat
              />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col">
              <div v-show="showDateRangeMapError" style="color: red; font-size:20px;">
                The start date must be before the end date and the start date cannot be later than today.
              </div>
            </div>
          </div>
          <div class="row q-mt-sm ">
            <div class="col text-center">
              <q-btn
                label="&nbsp Filter Map"
                @click="getStationsFromCMC(false)"
                color="teal"
                style="width:100%;height:30px;font-size:20px;"
                :loading="filtering"
                icon="fas fa-filter"
                >
                <template v-slot:loading>
                  <q-spinner-gears /><span class="q-ml-md">Filtering</span>
                </template>
              </q-btn>

            </div>

          </div>
          <div class="row q-mt-sm">
            <div class="col">
              <div v-show="showQueryError" style="color: red; font-size:20px;">
                There are no data that match the filters you selected. Click "Filter Map" after selecting each new filter to help your search.
              </div>
            </div>
          </div>

          <div class="row q-mt-sm">
            <div class="col text-center">
              <q-btn
                label="Download Data"
                color="primary"
                style="width: 100%;font-size:16px;"
                @click="getStationsFromCMC(false,true);"
                icon="fas fa-download"
              />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col">
              <div v-show="showDownloadError" style="color: red; font-size:20px;">
                Your download request is too large ({{ sampleCount }} samples). Please use additional filters to request less than 100,000 samples.
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="helpDialog" >
        <q-card style="width: 800px; max-width: 90vw; height: 95vh;" bg-grey-9 text-white>
          <q-card-section>
            <div class="row q-py-md q-px-lg result-details-header">
              <div class="col-md-11">
                <div class="text-h6">{{ helpTitle }}</div>
              </div>
              <div class="col-md-1">
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
          <q-card-section>
            <div class='row q-px-lg q-py-md'>
              <div class='col-11 '>
                <div style="font-size:20px"><p v-for="item in helpContent" :key="item.id">{{ item.content }}</p></div>
              </div>

            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="downloadDialog" >
        <q-card style="width: 800px; max-width: 90vw; height: 95vh;" bg-grey-9 text-white>
          <q-card-section>

            <div class="row">
              <div class="col-md-10">
                <div class="text-h6">Download</div>
              </div>
              <div class="col-md-1 text-right q-mt-sm">
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
                    <div class="tooltip-header">Data Download</div>
                    <div class="q-mt-sm tooltip-text">
                      The filters used on the map will select the data for download. The summary at the top of this page shows you basic statistics about the data you are about to download.

                    </div>
                  </div>
                </q-tooltip>
              </q-icon>
            </div>
              <div class="col-md-1 text-right">
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

          <q-card-section style="height:200px" class="scroll">

            <p style = 'font-size: 16px;'>
               Your <span style="color: #075C7A;">{{selectedDataType}}</span> download from <span style="color: #075C7A;">{{ formattedStartDateStats }}</span> to <span style="color: #075C7A;">{{formattedEndDateStats}}</span> will include:
              <ul>
                <li><span style="color: #075C7A;">{{ sampleCount }}</span> samples</li>
                <li><span style="color: #075C7A;">{{ organizationsCount }}</span> organizations</li>
                <li><span style="color: #075C7A;">{{ stationsCount }}</span> stations</li>
                <li><span style="color: #075C7A;">Parameter List</span>: {{ listParameters() }}</li>
              </ul>
            </p>
          </q-card-section>

          <q-card-section>
            <div class="row q-mt-md">
              <div class="col-11" style="font-size:20px">
                Choose optional metadata to include with download
              </div>
              <div class = "col-1">
                <q-icon class="fa-solid fa-circle-info" size="24px" color="primary">
                  <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
                    <div class="q-pa-md" style="max-width: 360px">
                      <div class="tooltip-header">Metadata</div>
                      <div class="q-mt-sm tooltip-text">
                        Clicking the select boxes in this section will allow you to download a separate file with
                        metadata associated with the samples you are downloading. These metadata include
                        additional information about the groups, stations, and parameters. Selecting calibration parameters will include
                        available calibration samples as a separate file as well.
                      </div>
                    </div>
                  </q-tooltip>
                </q-icon>
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
              <div class="col-6" >
                <q-checkbox
                  v-model="optionalMetaCalibration"
                  label="Calibration Samples"
                  v-show="selectedDataType == 'Water Quality'"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class='row q-mt-md'>
              <div class='col-11 '>
                <div style="font-size:20px">Help us learn about how you plan to use these data.</div>
              </div>
              <div class = "col-1">
                <q-icon class="fa-solid fa-circle-info" size="24px" color="primary">
                  <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
                    <div class="q-pa-md" style="max-width: 360px">
                      <div class="tooltip-header">Data Use Information</div>
                      <div class="q-mt-sm tooltip-text">
                        We would like to learn more about how you plan to use these data.
                        We require that you provide your email address, role, the purpose for the requested data, and
                        an acknowledgement of the proper data citation requirements prior to retrieving the requested data.
                        This information will help us understand who is using the data and how it is being used.
                        We will not share your email address or any other information with any third parties.
                      </div>
                    </div>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col">
                <!--, val => !!val || 'Email is required']"-->
                <q-input v-model="email" label="Email *"
                  :rules="[(val) => validateEmail(val) || 'Must be a valid email.', val => !!val || 'Field is required']"
                />
                <q-select  v-model="selectedRole" :options="roleOptions" label="Role *" :rules="[val => !!val || 'Field is required']" />
                <q-select class="q-mt-md" v-model="selectedPurpose" :options="purposeOptions" label="Purpose *" :rules="[val => !!val || 'Field is required']" />
                <q-select class="q-mt-md" v-model="selectedLocation" :options="locationOptions" label="Location *" :rules="[val => !!val || 'Field is required']" />
                <q-input
                  v-model="comments"
                  class="q-mt-md"
                  label="Comments"
                  type="textarea"
                />
              </div>
            </div>
          </q-card-section>


          <q-card-section>
            <div class="row q-mt-sm">
              <div class="col">

              </div>
            </div>

            <div class="row q-mt-md">
              <div class="col" style="font-size:20px">
                Please acknowledge data use prior to download
              </div>
            </div>


            <div class="row q-mt-md">
              <div class="col" style="max-width: 40px">
                <q-checkbox v-model="dataUseAcknowledgment" />
              </div>
              <div class="col ">
                I as the data user acknowledge that the data belong to the
                original data provider and will properly credit the data
                provider(s) in any product that uses their data.
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <!---->
            <q-btn flat :disabled="!dataUseAcknowledgment || email =='' || selectedRole == '' || selectedPurpose == '' || selectedLocation == ''" :loading="downloading" label="Accept" color="primary" icon="download"
                     @click="downloadData">
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
        <div class="col-2" style="max-width: 80px">
          <q-icon class="fa-solid fa-circle-info" size="24px" color="primary" @click="helpClick('stationsTable')"></q-icon>

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
            v-model:pagination="pagination"
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
                size="160px"
                v-bind:style= "[{ 'color': selectedStationDetails.color }]"
                style="-webkit-text-stroke-width: 2px;
   -webkit-text-stroke-color: white;"
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
                v-show="showStationDetails && selectedStationDetails.nameLong"
              >
                Name: {{ selectedStationDetails.nameLong }}
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails && selectedStationDetails.groupNames"
              >
                Monitored by: {{ selectedStationDetails.groupNames }}
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails && ((selectedStationDetails.latitude||selectedStationDetails.longitude))"
              >
                Location: {{ selectedStationDetails.latitude }},
                {{ selectedStationDetails.longitude }}
              </div>
              <div
                class="result-details-header-text-2"
                v-show="showStationDetails && selectedStationDetails.watershed"
              >
                Watershed: {{ selectedStationDetails.watershed }}
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
              <q-icon class="fa-solid fa-circle-info" size="24px" @click="helpClick('stationDetails')">
              </q-icon>
            </div>
          </div>
          <div v-show="showStationDetails">
            <!-- details -->
            <div class="row q-mt-md">
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
              <div></div>
            </div>
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
              <div class="col-8"></div>
              <div class="col-2">
                <q-btn
                  style="width: 90%"
                  color="teal"
                  icon="fas fa-minus"
                  @click="removePlot"
                  v-show="plotCount > 1"
                  label="Remove Plot"
                />

              </div>
              <div class="col-2">

                <q-btn
                  style="width: 90%"
                  color="primary"
                  icon="fas fa-plus"
                  @click="addPlot"
                  label="Add Plot"
                />
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
import { computed, onMounted, ref, resolveComponent, watch } from "vue";
import axios from "axios";
import _ from "lodash";

// import MapBox from "components/MapBoxOriginal.vue";
import MapBox from "components/MapBox.vue";
import DashboardPlot from "components/DashboardPlot.vue";

//import stations from "/src/assets/cmcV3_stations.json";
import { date } from "quasar";
import { EvaluationParameters, coerceSelectionMarkerOpacity, format, get, lengthToDegrees, write } from "plotly.js-dist";

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
    label: "First Sample",
    field: "formattedStartDate",
    sort: (a, b) => new Date(a) - new Date(b),
    sortable: true,
  },
  {
    name: "formattedEndDate",
    align: "left",
    label: "Most Recent Sample",
    field: "formattedEndDate",
    sort: (a, b) => new Date(a) - new Date(b),
    sortable: true,
  },

  {
    name: "SamplesCount",
    align: "left",
    label: "Number of Samples",
    field: "SamplesCount",
    sortable: true,
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
const roleOptions = [
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
const locationOptions = [
  "Maryland",
  "Virginia",
  "Delaware",
  "West Virginia",
  "Pennsylvania",
  "New York",
  "District of Columbia",
  "Outside of the Chesapeake Bay Watershed",
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
const selectedLocation = ref("");
const selectedRole= ref("");
const email = ref("");
const comments = ref("");
const showQueryError = ref(false);
const showDateRangeMapError = ref(false);
const showDownloadError = ref(false);
const stationDetailsContainer = ref();
const stations = ref(null);
const stationDetailsInfoShowing = ref(false);
const dataTableInfoShowing = ref(false);
const dataFiltersInfoShowing = ref(false);
const headerInfoShowing = ref(false);
const mapDataLayerInfoShowing = ref(false);
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
const dateFormat = "MM/DD/YYYY";
const STATIONS = "stations";
const BENTHIC_STATIONS = "benthic_stations";
const CMC_EMAIL = "cmc_email";
const CMC_ROLE = "cmc_role";
const CMC_PURPOSE = "cmc_purpose";
const CMC_LOCATION = "cmc_location";
const CMC_COMMENTS = "cmc_comments";
const samples = ref([]);
const samplesForPlot = ref([]);
const plotCount = ref(1);
const downloadDialog = ref(false); //show the download modal
const helpDialog = ref(false); //show the help modal
const helpTitle = ref('');
const helpContent = ref([{message:'foo'},{message:'bar'}]);
const disabledDownload = ref(true); //disable the download button
const downloading = ref(false); //show the spinner
const filtering = ref(false); //show the spinner
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
    try {
      stations.value = JSON.parse(localStorage.getItem(STATIONS));
    } catch (e) {
      console.log("could not parse stations in local storage");
      console.log(e);
    }
  }
}
if (
  typeof localStorage.getItem(CMC_EMAIL) !== null &&
  localStorage.getItem(CMC_EMAIL) !== ""
) {
  email.value = localStorage.getItem(CMC_EMAIL);
}



if (
  typeof localStorage.getItem(CMC_ROLE) !== null &&
  localStorage.getItem(CMC_ROLE) !== ""
) {
  selectedRole.value = localStorage.getItem(CMC_ROLE);
}

if (
  typeof localStorage.getItem(CMC_PURPOSE) !== null &&
  localStorage.getItem(CMC_PURPOSE) !== ""
) {
  selectedPurpose.value = localStorage.getItem(CMC_PURPOSE);
}

if (
  typeof localStorage.getItem(CMC_LOCATION) !== null &&
  localStorage.getItem(CMC_LOCATION) !== ""
) {
  selectedLocation.value = localStorage.getItem(CMC_LOCATION);
}

if (
  typeof localStorage.getItem(CMC_COMMENTS) !== null &&
  localStorage.getItem(CMC_COMMENTS) !== ""
) {
  comments.value = localStorage.getItem(CMC_COMMENTS);
}

const pagination = ref({
  sortBy: 'StationCode',
  descending: false,
  rowsPerPage: 5,
});

const rows = ref([]);
const filteredStations = ref([]);

//Make a mask for the q-input in the form of ####-##-##
const dateMask = dateFormat.replace(/[DMY]/g, "#");
const showDateClose = ref(false);

const formattedStartDateStats = ref(

  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(loadMinDate.value)));

const formattedStartDateMap = ref('');
const formattedLoadStartDate = ref(
  new Date(loadMinDate.value).toISOString().substring(0, 10)
);
const formattedEndDateStats = ref(
  new Date(loadMaxDate.value).toISOString().substring(0, 10)
);
const formattedStartDateLimit = ref(
  new Date(loadMinDate.value).toISOString().substring(0, 10)
);
const formattedEndDateLimit = ref(
  new Date(loadMaxDate.value).toISOString().substring(0, 10)
);
const formattedEndDateMap = ref('');
const formattedLoadEndDate = ref(
  new Date(loadMaxDate.value).toISOString().substring(0, 10)
);
//Format the date for display in the q-input.
const formattedStartDatePlot = ref(
  //new Date(props.startDatePlot).toISOString().substring(0, 10)
  //format the date to be in the format of MM/DD/YYYY
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(props.startDatePlot))

);
const formattedEndDatePlot = ref(
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(props.endDatePlot))

);
/****************************
 * Functions
 ***************************/
const helpClick = ((source) => {
  let title = '';
  let content = '';
  if (source == 'main'){
    title = 'CMC Data Explorer';
    content = [{id:1,content:'The CMC Data Explorer lets you view and share water quality and benthic macroinvertebrate data. The stats to the left show details from the monitoring stations shown on the map. Active stations have samples uploaded to the database within the last 5 years.'}];
  }else if(source == 'mapDataLayers'){
    title = 'Map Data Layers';
    content = [{id:1,content:'Explore and download water quality or benthic macroinvertebrate data using the map. Choose layers like watersheds or political boundaries to customize your view. The map legend will adjust as you toggle layers on and off.'}];
  }else if(source == 'dataFilters'){
    title = 'Data Filters';
    content = [{id:1,content:'Use the filters to select the data you want to view or download. After each selection, click "Filter Map" to update the map and see new options. Multiple selections within a filter show results that match any of your choices, while different filters narrow the results further.'},
               {id:2,content:'Click "Clear Filters" to reset all, or the "X" to remove individual filters.'}];
  }else if(source == 'stationsTable'){
    title = 'Stations Table';
    content = [{id:1,content:'This table lists the stations shown on the map based on your selected filters. Click a station to see more details below.'}];
  }else if(source == 'stationDetails'){
    title = 'Station Details';
    content = [{id:1,content:'View or download data from the selected station. Choose a depth or date range, then select up to two parameters per plot. Use the "+" to add another plot.'}];
  }else if(source == 'firstVisit'){
    title = 'Welcome to the CMC Data Explorer';
    content = [{id:1,content:'The CMC Data Explorer is a tool for storing, sharing, and visualizing data collected by the network of water quality and benthic macroinvertebrate monitoring programs working with the Chesapeake Monitoring Cooperative. On this page you can view and download data stored in the CMC Data Explorer database.'}];
  }

  helpTitle.value = title;
  helpContent.value = content;
  helpDialog.value = true;
});
const onRowClick = ((evt, row) => {
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
 const dateOptionsFn = (date) => {
    let startDate = '1901-01-01';
    let endDate = new Date().toISOString().substring(0, 10);
    if (formattedStartDateLimit.value !== '' && formattedStartDateLimit.value !== null && formattedStartDateLimit.value !== 'undefined') {
      startDate = formattedStartDateLimit.value;
    }
    if (formattedEndDateLimit.value !== '' && formattedEndDateLimit.value !== null && formattedEndDateLimit.value !== 'undefined') {
      endDate = formattedEndDateLimit.value;
    }
    //format startDate and endDate to be in the format of "YYYY/MM/DD"
    startDate = startDate.split('-')
    startDate = startDate[0] + '/' + startDate[1] + '/' + startDate[2]
    endDate = endDate.split('-')
    endDate = endDate[0] + '/' + endDate[1] + '/' + endDate[2]
    return date >= startDate && date <= endDate;
 };
 const listParameters = () => {

  if(paramFilteredOptions.value.length < 1 & selectedParams.value.length === 0){
    let params = '';

    paramOptions.value.forEach((param) => {
      if(params.split(',').includes(param.name)){
        return;
      }else{
        params += param.name + ', ';
      }
    })
    return params;
  }
  if(selectedParams.value.length === 0){
    return paramFilteredOptions.value.map(({name}) => name).join(", ")
  }
  return selectedParams.value.map(({name}) => name).join(", ");
 };
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
  const groupCodesCsv = selectedGroups.value
    .map(({ value }) => value)
    .join(",");

  const paramIdsCsv = selectedParams.value.map(({ value }) => value).join(",");
  const watershedsCsv = selectedWatershed.value
    .map(({ value }) => value)
    .join(",");
  const countiesCsv = selectedCounties.value
    .map(({ value }) => value)
    .join(",");
  const statesCsv = selectedStates.value.map(({ value }) => value).join(",");
  const stationsCsv = selectedStations.value
    .map(({ value }) => value)
    .join(",");

  const subwatershedsCsv = selectedSubwatershed.value
    .map(({ value }) => value)
    .join(",");

  let formattedStartDateMapString = formattedStartDateMap.value; //MM/DD/YYYY
  //format the date to be in the format of YYYY-MM-DD

  console.log('formatted start date',formattedStartDateMapString);
  if(formattedStartDateMapString == ''){
    formattedStartDateMapString = new Date('1901-01-01').toISOString().substring(0, 10);
  }else{
    formattedStartDateMapString = new Date(formattedStartDateMapString).toISOString().substring(0, 10);
  }
  console.log('formatted start date',formattedStartDateMapString);



  let formattedEndDateMapString = formattedEndDateMap.value;
  console.log('formatted end date',formattedEndDateMapString);
  if(formattedEndDateMapString == ''){
    formattedEndDateMapString = new Date().toISOString().substring(0, 10);
  }else{
    formattedEndDateMapString = new Date(formattedEndDateMapString).toISOString().substring(0, 10);
  }
  console.log('formatted end date',formattedEndDateMapString);


  const payload = {
    dataType: selectedDataType.value,
    groups: groupCodesCsv,
    stations: stationsCsv,
    states: statesCsv,
    counties: countiesCsv,
    watersheds: watershedsCsv,
    subwatersheds: subwatershedsCsv,
    parameters: paramIdsCsv,
    startDate: formattedStartDateMapString,
    endDate: formattedEndDateMapString,
  };
  return payload;
};

const addDayToDate = (oldDate) => {
  let newDate = new Date(oldDate);
  newDate.setDate(newDate.getDate() + 1);
  newDate = new Date(newDate).toISOString().substring(0, 10);
  return newDate;
};

const writeCSV = (data,pivot,payload) => {
  if(!pivot){
    const csv = data.map((row) =>
      Object.values(row).join(",")
    )
    csv.unshift(Object.keys(data[0]).join(","));
    const csvString = csv.join("\n");
    const blob = new Blob([csvString], {
      type: "text/csv",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    //append todays date to the file name

    a.download = "cmc_samples_" + new Date().toISOString().substring(0, 10) + ".csv";

    a.click();
    window.URL.revokeObjectURL(url);
  }else{
    axios.post("https://cmc.vims.edu/DashboardApi/FetchConditionsForDownload", payload)
      .then((response) => {
        const conditions = response.data;


        // loop through the data and pivot by creating a new object for each unique StationCode,GroupCode,DateTime,SampleDepth, and SampleId.
        // Each object will have the ParameterCode as the key and the value as the parameter value.
        // Concatenate the ParameterCode and '_Problem' as another key with the value as the Problem value.
        // Concatenate the QualifierCode and '_Qualifier' as another key with the value as the Problem value.
        // So, each object will have the following keys: StationCode,GroupCode,DateTime,SampleDepth,SampleId,ParameterCode1,ParameterCode2,...,ParameterCodeN,ParameterCode1_Problem,ParameterCode2_Problem,...,ParameterCodeN_Problem,ParameterCode1_Qualifier,ParameterCode2_Qualifier,...,ParameterCodeN_Qualifier
        // Then, loop through the objects and create a csv string with the keys as the header and the values as the rows.
        // Write the csv string to a csv file and download it.
        let csv = [];
        let headers = [];
        let header = '';
        let csvString = '';
        let csvRow = '';
        let csvRowArray = [];

        data.forEach((row) => {
          let newRow = {};
          //check if combination of the following keys exists in the csv array: StationCode,GroupCode,DateTime,SampleDepth,SampleId
          let exists = false;
          csv.forEach((csvRow) => {
            if(csvRow.StationCode === row.StationCode && csvRow.GroupCode === row.GroupCode && csvRow.DateTime === row.DateTime &&
              csvRow.SampleDepth === row.SampleDepth && csvRow.SampleId === row.SampleId && csvRow.Comments === row.Comments){
              exists = true;
            }
          });
          if(!exists){
            newRow['StationCode'] = row.StationCode;
            newRow['GroupCode'] = row.GroupCode;
            newRow['DateTime'] = row.DateTime;
            newRow['SampleDepth'] = row.SampleDepth;
            newRow['SampleId'] = row.SampleId;
            newRow['Comments'] = row.Comments;
            if(!headers.includes('StationCode')){
              headers.push('StationCode');
              headers.push('GroupCode');
              headers.push('DateTime');
              headers.push('SampleDepth');
              headers.push('SampleId');
              headers.push('Comments');
            }
            csv.push(newRow);
          }
          //find the index of the object in the csv array that has the same StationCode,GroupCode,DateTime,SampleDepth,SampleId
          let index = csv.findIndex((csvRow) => {
            return csvRow.StationCode === row.StationCode && csvRow.GroupCode === row.GroupCode && csvRow.DateTime === row.DateTime &&
                    csvRow.SampleDepth === row.SampleDepth && csvRow.SampleId === row.SampleId && row.Comments === csvRow.Comments;
          });

          //if the object exists, add the ParameterCode, Problem, and Qualifier to the object
          if(index > -1){
            //check if the Value is undefined and set it to an empty string if it is
            if(row.Value === undefined){
              row.Value = '';
            }
            if(row.ProblemCode === undefined){
              row.ProblemCode = '';
            }
            if(row.QualifierCode === undefined){
              row.QualifierCode = '';
            }
            csv[index][row.ParameterCode] = row.Value;
            csv[index][row.ParameterCode + '_Problem'] = row.ProblemCode;
            csv[index][row.ParameterCode + '_Qualifier'] = row.QualifierCode;
            if(!headers.includes(row.ParameterCode)){
              headers.push(row.ParameterCode);
              headers.push(row.ParameterCode + '_Problem');
              headers.push(row.ParameterCode + '_Qualifier');
            }
          }


        });
        //check if condtions data exists
        if(conditions.length>0){
          // do the same for the conditions data except no need for problem and qualifier
        conditions.forEach((row) => {

            //find all the indexes of the object in the csv array that has the same StationCode,GroupCode,DateTime,SampleDepth,SampleId
            let indexes = csv.reduce((acc, e, i) => {
              if (e.StationCode === row.StationCode && e.GroupCode === row.GroupCode && e.DateTime === row.DateTime) {
                acc.push(i);
              }
              return acc;
            }, []);

            //check all indexes, if the object exists, add the ParameterCode as and Value  as value to the object
            indexes.forEach((index) => {
              if(index > -1){
                //check if the Value is undefined and set it to an empty string if it is
                if(row.Value === undefined){
                  row.Value = '';
                }
                csv[index][row.ParameterCode] = row.Value;
                if(!headers.includes(row.ParameterCode)){
                  headers.push(row.ParameterCode);
                }
              }
            });
          });
        }





        //headers = headers.sort();
        // move comments to the end of the headers array
        let commentsIndex = headers.indexOf('Comments');
        headers.splice(commentsIndex,1);
        headers.push('Comments');
        headers.forEach((header) => {
          csvRow += header + ',';
        });
        csvRow = csvRow.slice(0,-1);
        csvString += csvRow + '\n';
        csv.forEach((row) => {
          //check if undefined values exist and set them to empty strings
          headers.forEach((header) => {
            if(row[header] === undefined){
              row[header] = '';
            }
          });
          csvRow = '';
          headers.forEach((header) => {
            csvRow += row[header] + ',';
          });
          csvRow = csvRow.slice(0,-1);
          csvString += csvRow + '\n';
        });
        const blob = new Blob([csvString], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement
        ("a");
        a.href = url;
        a.download = "cmc_samples" + new Date().toISOString().substring(0, 10) + ".csv";

        a.click();
        window.URL.revokeObjectURL(url);
        if(!optionalMetaParams.value && !optionalMetaCalibration.value && !optionalMetaGroups.value && !optionalMetaStations.value){
          downloading.value = false;
        }
      });


  }


};

const downloadData = () => {
  downloading.value = true;
  console.log('email set', email.value);
  localStorage.setItem(CMC_EMAIL, email.value);
  let emailTest = localStorage.getItem(CMC_EMAIL);
  console.log('email test', emailTest);
  localStorage.setItem(CMC_ROLE, selectedRole.value);
  localStorage.setItem(CMC_PURPOSE, selectedPurpose.value);
  localStorage.setItem(CMC_LOCATION, selectedLocation.value);
  localStorage.setItem(CMC_COMMENTS, comments.value);

  console.log('email test2', localStorage.getItem(CMC_EMAIL));

  const payload = formPayload();
  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined') {
    payload.endDate = addDayToDate(payload.endDate);
  }

    axios
      .post("https://cmc.vims.edu/DashboardApi/FetchSamplesForDownload", payload)
      .then((response) => {
        if (response.data.length > 0) {
          const samplesForDownload = response.data;
          //write response.data to csv download and include headers

          //let csv = Object.keys(response.data[0]).join(",") + "\n";
          if(selectedDataType.value === 'Water Quality'){
            writeCSV(samplesForDownload,true,payload);
          }else{
            writeCSV(samplesForDownload,false);
          }


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
            if (!stationCodes.includes(sample.StationId)) {
              stationCodes.push(sample.StationId);
            }
          });
          //change paramCodes into comma separated string
          paramCodes = paramCodes.join(",");
          paramCodes = {"parameters":paramCodes};
          groupCodes = groupCodes.join(",");
          groupCodes = {"groups":groupCodes};
          stationCodes = stationCodes.join(",");
          stationCodes = {"stations":stationCodes};

          const requests = [];
          if(optionalMetaParams.value){
              requests.push(
                axios
                .post("https://cmc.vims.edu/DashboardApi/FetchParametersForDashboardDownload", paramCodes)
              )
          }

          if(optionalMetaGroups.value){
            requests.push(
              axios
              .post("https://cmc.vims.edu/DashboardApi/FetchGroupsForDashboardDownload", groupCodes)
            )
          }

          if(optionalMetaStations.value){
            requests.push(
              axios
              .post("https://cmc.vims.edu/DashboardApi/FetchStationsForDashboardDownload", stationCodes)
            )
          }

          if(optionalMetaCalibration.value && selectedDataType.value === 'Water Quality'){
            requests.push(
              axios
              .post("https://cmc.vims.edu/DashboardApi/FetchCalibrationForDashboardDownload", payload)
            )
          }
          Promise.all(requests).then(function(values) {
            for (let i = 0; i < values.length; i++) {
              let endpoint = values[i].config.url.split("/")[4];
              let filename = '';
              if(endpoint === 'FetchParametersForDashboardDownload'){
                filename = 'parameters';
              } else if(endpoint === 'FetchGroupsForDashboardDownload'){
                filename = 'groups';
              } else if(endpoint === 'FetchStationsForDashboardDownload'){
                filename = 'stations';
              } else if(endpoint === 'FetchCalibrationForDashboardDownload'){
                filename = 'calibration';
              }
              let response = values[i];

              if (response.data.length > 0) {
                //loop through each element in each object in response.data and replace comma with empty string

                let obj= JSON.stringify(response.data);

                obj= obj.replace(/(?=,(?!"))(,(?!{))/g,"");
                let json = JSON.parse(obj)

                //
                const csv = json.map((row) =>
                  Object.values(row).join(",")
                )         //
                csv.unshift(Object.keys(json[0]).join(","));
                const csvString = csv.join("\n");
                const blob = new Blob([csvString], {
                  type: "text/csv",
                });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.setAttribute("id", "btn"+i.toString());
                a.class="download-btn";
                a.href = url;
                a.download = filename +"_"+ new Date().toISOString().substring(0, 10) + ".csv";
                document.body.appendChild(a);
                downloading.value = false;
              }

            }
            downloading.value = false;
          });


        } else {
          downloading.value = false;
        }
      })
      .catch((error) => console.log(error));

};
const getStationsFromCMC = async (load,download) => {
  if (!load) {
    stateOptions.value = [];
    groupOptions.value = [];
    countyOptions.value = [];
    stationIdOptions.value = [];
    watershedOptions.value = [];
    subwatershedOptions.value = [];
    paramOptions.value = [];
  }
  if(load){
    checkFirstVisit();
    function checkFirstVisit(){
      console.log('checkfirstvisit');
      console.log(localStorage.getItem('was_visited'));
      if(localStorage.getItem('was_visited')>=1){
        localStorage.setItem('was_visited', parseInt(localStorage.getItem('was_visited'))+1);
        return;
      }else{
        localStorage.setItem('was_visited', 1);
        helpClick('firstVisit');
      }
    }

    //get benthic stations in background on load and set in local storage
    const payloadBenthic = {
      dataType: 'Benthic Macroinvertebrates',
      groups: '',
      stations: '',
      states: '',
      counties: '',
      watersheds: '',
      subwatersheds: '',
      parameters: '',
      startDate: "1901-01-01", endDate: "2024-10-04"
    };
    axios
    .post(
      "https://cmc.vims.edu/DashboardApi/FetchStationsForMap",
      payloadBenthic
    )
    .then((res) => {
      const res_str = JSON.stringify(res.data);
      console.log('benthic stations',res.data);

      localStorage.setItem(BENTHIC_STATIONS, res_str);
    })
  }
  const payload = formPayload();
  filtering.value = true;

  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined' && !load) {
    payload.endDate = addDayToDate(payload.endDate);
  }
  console.log('payload',payload);
  axios
    .post(
      "https://cmc.vims.edu/DashboardApi/FetchStationsForMap",
      payload
    )
    .then((res) => {
      if(res.data.length === 0){
        showQueryError.value = true;
        return
      }
      const res_str = JSON.stringify(res.data);

      stations.value = res.data;

      //sum samplesCount for all stations
      let sampleCountVal = stations.value.reduce((acc, station) => {
        return acc + station.SamplesCount;
      }, 0);

      //convert the number of samples to a number
      if(download){

        if(sampleCountVal > 100000){
          downloadDialog.value = false;
          showDownloadError.value = true;
          filtering.value = false;
        }else{
          downloadDialog.value = true;
          showDownloadError.value = false;
          filtering.value = false;
        }

      }else{
        filtering.value = false;
      }

      if (load & (res.data.length > 0)) {

        localStorage.setItem(STATIONS, res_str);

        // get min date as StartDate of the oldest station in transformedStations. exclude nulls
        loadMinDate.value = new Date(
          Math.min.apply(
            null,
            res.data.map((s) => new Date(s.StartDate))
          )
        );
        formattedLoadStartDate.value = new Date(loadMinDate.value).toISOString().substring(0, 10)

        // get max date as EndDate of the most recent station in transformedStations
        loadMaxDate.value = new Date(
          Math.max.apply(
            null,
            res.data.map((s) => new Date(s.EndDate))
          )
        );
        formattedLoadEndDate.value = new Date(loadMaxDate.value).toISOString().substring(0, 10)
        showDateClose.value = true;
        filtering.value = false;


      }
    })
    .catch((error) => {
      if (load) {
        stations.value = JSON.parse(localStorage.getItem(STATIONS));
      }
      filtering.value = false;
    });

  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSubWatershedsForMap", payload)
    .then((response) => {
      if (response.data.length > 0) {

        subwatershedOptions.value = response.data;

        //remove null values from the array
        subwatershedOptions.value = subwatershedOptions.value.filter((subwatershed) => subwatershed.value !== null && subwatershed.value !== '');
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
        watershedOptions.value = watershedOptions.value.filter((watershed) => watershed.value !== null && watershed.value !== '');

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
        countyOptions.value = countyOptions.value.filter((county) => county.value !== null && county.value !== '');
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
        stateOptions.value = stateOptions.value.filter((state) => state.value !== null && state.value !== '');
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

  formattedStartDateStats.value = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(minDate));

  formattedEndDateStats.value = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(maxDate));

  formattedStartDateLimit.value = new Date(minDate).toISOString().substring(0, 10);
  formattedEndDateLimit.value = new Date(maxDate).toISOString().substring(0, 10);

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
      if(existingStation.Status === 'Current' || station.Status === 'Current'){
        existingStation.Status = 'Current';
      }
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
  //sort aggregatedStations by StationCode
  aggregatedStations.sort((a, b) => a.StationCode.localeCompare(b.StationCode));

  filteredStations.value = aggregatedStations;
};

const getUniqueValues = (data, param) => {
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

      return acc;
    }, []);
    // data.forEach((sample) => {
    //   if(sample.depth === null){
    //     uniqueParams.push({
    //       name: 'No Depth',
    //       value: null
    //     });
    //   }else if(sample.depth === ''){
    //     uniqueParams.push({
    //       name: 'No Depth',
    //       value: ''
    //     });
    //   }
    // });
  }
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
    let subStations = stations.value.map(transformStation);
    subStations = subStations.map((s) => ({
      name: s.GroupName,
      value: s.GroupCode,
    }));

    //get unique stations by stationCode
    const uniqueGroups = new Map(subStations.map((o) => [o.name, o])).values();


    const sortedOptions = [...uniqueGroups].sort((a, b) =>
      a.name.localeCompare(b.name)
    ); //;

    return [...sortedOptions];
  } else {
    return [];
  }
});

//create stationIdOptions from filteredStations with value and labl as StationCode
const stationIdOptions = computed(() => {
  if (filteredStations.value !== null && filteredStations.value.length > 0) {
    const options = filteredStations.value.map((s) => ({
      value: s.StationId.toString(), //as string,
      name: s.StationCode.substring(s.StationCode.indexOf('.')+1).replace(',','') + " (" + s.StationCode.split(".")[0].replace(',','') + ")",
    }));

    //sort options by value
    const sortedOptions = [...options].sort((a, b) =>
      a.name.localeCompare(b.name)
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

watch(formattedEndDateMap, (newDateValue) => {
  console.log('new end date value',newDateValue);
  if((newDateValue !== '' && newDateValue !== null && typeof newDateValue !== 'undefined')){
    //check if endDate is less than startDate
    if(new Date(newDateValue) < new Date(formattedStartDateMap.value) || new Date(newDateValue) > new Date()){
      showDateRangeMapError.value = true;
    }else{
      showDateRangeMapError.value = false;
    }
  }
});

watch(formattedStartDateMap, (newDateValue) => {
  console.log('new start date value',newDateValue);
  if((newDateValue !== '' && newDateValue !== null && typeof newDateValue !== 'undefined')){
    //check if endDate is less than startDate
    if(new Date(newDateValue) > new Date(formattedEndDateMap.value) || new Date(newDateValue) > new Date()){
      showDateRangeMapError.value = true;
    }else{
      showDateRangeMapError.value = false;
    }
  }
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




watch(stations, () => {
  if (stations.value.length > 0 && stations.value !== null) {
    aggregateStations();
  }
});

watch(filteredStations, () => {
  rows.value.splice(0, rows.value.length, ...filteredStations.value);
});

watch(selectedDataType, () => {
  selectedDataTypeForLegend.value = selectedDataType.value;
  stations.value = [];
  filteredStations.value = [];
  selectedStates.value = [];
  selectedStations.value = [];
  selectedCounties.value = [];
  selectedWatershed.value = [];
  selectedSubwatershed.value = [];
  selectedGroups.value = [];
  selectedParams.value = [];
  formattedStartDateMap.value = '';
  formattedEndDateMap.value = '';
  if(selectedDataType.value === 'Water Quality'){
    stations.value = JSON.parse(localStorage.getItem(STATIONS));
  }else{
    stations.value = JSON.parse(localStorage.getItem(BENTHIC_STATIONS));
  }

  //getStationsFromCMC(false,false);
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

  //selectedDataType.value = "Water Quality";

  //selectedGeoType.value = "Watershed";
  selectedStates.value = [];
  selectedStations.value = [];
  selectedCounties.value = [];
  selectedWatershed.value = [];
  selectedSubwatershed.value = [];
  selectedGroups.value = [];
  selectedParams.value = [];
  formattedStartDateMap.value = '';
  formattedEndDateMap.value = '';
  if(selectedDataType.value === 'Water Quality'){
    stations.value = JSON.parse(localStorage.getItem(STATIONS));
  }else{
    stations.value = JSON.parse(localStorage.getItem(BENTHIC_STATIONS));
  }
  getStationsFromCMC(true);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-us", options);

}

function transformStation(station) {
  let transformStation = station;
  const formattedStartDate = formatDate(transformStation.StartDate);
  const formattedEndDate = formatDate(transformStation.EndDate);

  return {
    ...transformStation,
    formattedStartDate: formattedStartDate,
    formattedEndDate: formattedEndDate,
  };
}

function getSamples(stationId) {
  if (!stationId) {
    return;
  }
  const payload = {
    stationId: stationId,
    startDate: formattedStartDatePlot.value,
    endDate: formattedEndDatePlot.value,
    dataType: selectedDataType.value,
  };

  if (payload.endDate !== '' && payload.endDate !== null && typeof payload.endDate !== 'undefined') {

    payload.endDate = addDayToDate(payload.endDate);
  }

  axios
    .post("https://cmc.vims.edu/DashboardApi/FetchSamplesForPlot", payload)
    .then((response) => {
      if (response.data.length > 0) {
        samples.value = response.data;
        console.log('samples!!!!',samples.value);

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
          //sum the value for each unique sampleDate and write to new array
          let aggSamples = uniqueSampleDates.map((date) => {
            let sumCount = response.data.reduce((acc, sample) => {
              if (sample.dateTime === date) {
                acc += sample.value;
              }
              return acc;
            }, 0);
            let speciesCount = response.data.reduce((acc, sample) => {
              if (sample.dateTime === date) {
                acc += 1;
              }
              return acc;
            }, 0);
            return { sampleDate: date, totalCount: sumCount, speciesCount: speciesCount};
          });

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
      data = data.filter((s) => value.split(",").includes(s.parameterCode));
    } else if (paramType == "Sample Depth") {
      data = data.filter((s) => s.depth === value);
    }
  }
  //filter samples by startDate and endDate
  samplesForPlot.value = data.filter((s) => {
    let sampleDate = new Date();
    //sampleDate = new Date(s.dateTime);
    if(selectedDataType.value === 'Water Quality'){
      sampleDate = new Date(s.dateTime);
    }else{
      sampleDate = new Date(s.sampleDate);
    }
    const startDate = new Date(formattedStartDatePlot.value);
    let endDate = new Date(formattedEndDatePlot.value);
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

  selectedStationDetails.value = station;
  selectedStationDetails.value.name= station.code.substring(station.code.indexOf('.')+1)

  stationDetailsContainer.value.scrollIntoView({ behavior: "smooth" });
  //format the station.endDate to be in the format of MM/DD/YYYY

  //if staion.endDate is equal to station.startDate, then add one day to the station.endDate

  console.log('end date',station.endDate);

  if(station.endDate === station.startDate){
    formattedEndDatePlot.value = new Date(station.endDate);
    formattedEndDatePlot.value.setDate(formattedEndDatePlot.value.getDate() + 1);
    console.log('formatted PLLOOOOT end date',formattedEndDatePlot.value);
    formattedEndDatePlot.value = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(formattedEndDatePlot.value);
  }else{
    formattedEndDatePlot.value = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(station.endDate));
  }
  //format the date to be in the format of MM/DD/YYYY
  formattedStartDatePlot.value = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(station.startDate));



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

    color: #F09300
  }

  .dot-purple {

    color: #990799;
  }
</style>
