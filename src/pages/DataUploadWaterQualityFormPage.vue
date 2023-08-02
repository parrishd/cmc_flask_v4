<template>
  <q-page>
    <div class="q-px-xl q-mx-xl">
      <div class="row q-mx-xl q-px-xl">
        <div class="col">
          <div class="q-mt-xl q-pa-xl even-container">
            <div class="text-center water-quality-header">Upload Water Quality Data Form</div>
            <div class="text-subtitle1">
              Welcome to the data upload page! Using the fields below, you can enter data into the Chesapeake Data
              Explorer for Sampling Sites belonging to Virginia Institute of Marine Science.
            </div>
            <q-select v-model="site" label="Sampling Site" :options="siteOptions" class="q-mb-md" outlined/>

            <!--Date & Time Row-->
            <div class="row q-mb-md">

              <!--Date Selector-->
              <div class="col">
                <q-input outlined v-model="sampleDate" label="Sample Date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="sampleDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!--Time Selector-->
              <div class="col q-ml-md q-mb-xl">
                <q-input outlined v-model="sampleTime" label="Sample Time" mask="time" :rules="['time']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="sampleTime">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl odd-section-container">
            <div class="q-mb-sm text-center water-quality-header">Conditions During Sampling</div>
            <div class="q-my-xl text-subtitle1">
              First choose the set of conditions that you would like to include on the form.
              Next, use the added fields to describe conditions at the sampling location at the time sampling occurred.
            </div>
            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="conditions" :options="conditionOptions" label="Conditions Set" class="col"/>
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl even-container">
            <div class="q-mb-sm text-center water-quality-header">Calibration</div>
            <div class="q-my-xl text-subtitle1">
              Use the fields in this section to input calibration information.
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="oxygenSodiumThiosulfate"
                label="Dissolved Oxygen Sodium Thiosulfate Check (mg/L)"
                class="col"
              />
              <div class="col">
                <strong>Note:</strong> Conduct second test if results are &lt; 9.4 or &gt; 10.0. Do not run DO test if 2 sodium thiosulfate
                check results are not within 0.4 mg/l of each other.
              </div>
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="probeTemp"
                label="DO Probe Calibration Temperature (deg C)"
                class="col"
              />
              <q-input
                outlined
                v-model="probePressure"
                label="DO Probe Calibration Barometric Pressure (mmHg)"
                class="col"
              />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="probeTheoretical"
                label="DO Probe Calibration Theoretical Value (mg/L)"
                class="col"
              />
              <q-input
                outlined
                v-model="calibrationValue"
                label="DO Probe Calibration Value (mg/L)"
                class="col"
              />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="postSampleTemperature"
                label="DO Probe Post-Sample Temperature (deg C)"
                class="col"
              />
              <q-input
                outlined
                v-model="postSamplePressure"
                label="DO Probe Post-Sample Barometric Pressure (mmHg)"
                class="col"
              />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="postSampleTheoreticalValue"
                label="DO Probe Post-Sample Theoretical Value (mg/L)"
                class="col"
              />
              <q-input
                outlined
                v-model="postSampleValue"
                label="DO Probe Post-Sample Value (mg/L)"
                class="col"
              />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="bacteriaTemp"
                label="Bacteria Incubation Temperature (deg C)"
                class="col"
              />
              <q-input
                outlined
                v-model="bacteriaTime"
                label="Bacteria Incubation Time (hours)"
                class="col"
              />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input
                outlined
                v-model="bacteriaBlank"
                label="Bacteria (E.Coli) Blank (MPN)"
                class="col"
              />
              <div class="col"></div>
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl odd-section-container">
            <div class="q-mb-sm text-center water-quality-header">Surface Sample</div>
            <div class="q-mt-xl text-subtitle1">
              Use the fields in this section to input data that is taken at the surface (default is 0.3m).
            </div>

            <div class="q-mt-md">
              <div class="row q-mb-xl q-pb-xl">
                <q-select
                  outlined
                  v-model="surfaceDepth"
                  :options="surfaceDepthOptions"
                  label="Surface Sample Depth (m)"
                  class="col"
                />
                <div class="col"></div>
              </div>
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showAlkalinityTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showAlkalinityProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showAlkalinityQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="alkalinity"
                  label="Alkalinity (Titration) (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showAlkalinityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="alkalinityProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showAlkalinityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="alkalinityQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showAlkalinityTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="alkalinityTwo"
                  label="Alkalinity (Titration) (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showAlkalinityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="alkalinityProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showAlkalinityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="alkalinityQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showAirTemperatureTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showAirTemperatureProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showAirTemperatureQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="airTemperature"
                  label="Air Temperature (deg C)"
                  class="col"
                />
                <q-select
                  v-if="showAirTemperatureProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="airTemperatureProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showAirTemperatureQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="airTemperatureQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showAirTemperatureTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="airTemperatureTwo"
                  label="Air Temperature (deg C)"
                  class="col"
                />
                <q-select
                  v-if="showAirTemperatureProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="airTemperatureProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showAirTemperatureQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="airTemperatureQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showDissolvedOxygenTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showDissolvedOxygenProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showDissolvedOxygenQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="dissolvedOxygen"
                  label="Dissolved Oxygen (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showDissolvedOxygenProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="dissolvedOxygenProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showDissolvedOxygenQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="dissolvedOxygenQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showDissolvedOxygenTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="dissolvedOxygenTwo"
                  label="Dissolved Oxygen (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showDissolvedOxygenProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="dissolvedOxygenProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showDissolvedOxygenQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="dissolvedOxygenQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showNitrateNitrogenTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showNitrateNitrogenProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showNitrateNitrogenQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="nitrateNitrogen"
                  label="Nitrate-nitrogen (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showNitrateNitrogenProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="nitrateNitrogenProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showNitrateNitrogenQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="nitrateNitrogenQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showNitrateNitrogenTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="nitrateNitrogenTwo"
                  label="Nitrate-nitrogen (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showNitrateNitrogenProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="nitrateNitrogenProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showNitrateNitrogenQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="nitrateNitrogenQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showOrthophosphateTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showOrthophosphateProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showOrthophosphateQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="orthophosphate"
                  label="Orthophosphate (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showOrthophosphateProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="orthophosphateProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showOrthophosphateQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="orthophosphateQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showOrthophosphateTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="orthophosphateTwo"
                  label="Orthophosphate (mg/L)"
                  class="col"
                />
                <q-select
                  v-if="showOrthophosphateProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="orthophosphateProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showOrthophosphateQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="orthophosphateQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showPhTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showPhProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showPhQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="ph"
                  label="pH (SU)"
                  class="col"
                />
                <q-select
                  v-if="showPhProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="phProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showPhQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="phQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showPhTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="phTwo"
                  label="pH (SU)"
                  class="col"
                />
                <q-select
                  v-if="showPhProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="phProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showPhQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="phQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showSalinityTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showSalinityProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showSalinityQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="salinity"
                  label="Salinity (ppt)"
                  class="col"
                />
                <q-select
                  v-if="showSalinityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="salinityProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showSalinityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="salinityQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showSalinityTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="salinityTwo"
                  label="Salinity (ppt)"
                  class="col"
                />
                <q-select
                  v-if="showSalinityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="salinityProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showSalinityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="salinityQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showTotalDepthTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showTotalDepthProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showTotalDepthQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="totalDepth"
                  label="Total Depth (M)"
                  class="col"
                />
                <q-select
                  v-if="showTotalDepthProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="totalDepthProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTotalDepthQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="totalDepthQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showTotalDepthTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="totalDepthTwo"
                  label="Total Depth (M)"
                  class="col"
                />
                <q-select
                  v-if="showTotalDepthProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="totalDepthProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTotalDepthQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="totalDepthQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showTurbidityTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showTurbidityProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showTurbidityQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="turbidity"
                  label="Turbidity (NTU)"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="turbidityProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="turbidityQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showTurbidityTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="turbidityTwo"
                  label="Turbidity (NTU)"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="turbidityProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="turbidityQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showTurbidityTubeTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showTurbidityTubeProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showTurbidityTubeQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="turbidityTube"
                  label="Turbidity Tube (cm)"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityTubeProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="turbidityTubeProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityTubeQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="turbidityTubeQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showTurbidityTubeTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="turbidityTubeTwo"
                  label="Turbidity Tube (cm)"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityTubeProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="turbidityTubeProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showTurbidityTubeQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="turbidityTubeQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>

            <div class="q-mt-xl">
              <div class="q-mb-sm">
                <q-btn dense round color="primary" @click="showWaterTemperatureTwo = true">
                  <q-icon class="fa-solid fa-plus" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add an Additional Value</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #d9534f" @click="showWaterTemperatureProblemCode = true">
                  <q-icon class="fa-solid fa-exclamation" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Problem Code</q-tooltip>
                </q-btn>
                <q-btn dense round class="q-ml-sm" style="background-color: #eb8c00" @click="showWaterTemperatureQualifier = true">
                  <q-icon class="fa-solid fa-asterisk" style="color: white" size="14px"/>
                  <q-tooltip anchor="top middle" self="top middle">Add Qualifier</q-tooltip>
                </q-btn>
              </div>
              <div class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="waterTemperature"
                  label="Water Temperature (deg C)"
                  class="col"
                />
                <q-select
                  v-if="showWaterTemperatureProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="waterTemperatureProblemCode"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showWaterTemperatureQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="waterTemperatureQualifier"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
              <div v-if="showWaterTemperatureTwo" class="row q-gutter-x-md q-mb-md">
                <q-input
                  outlined
                  v-model="waterTemperatureTwo"
                  label="Water Temperature (deg C)"
                  class="col"
                />
                <q-select
                  v-if="showWaterTemperatureProblemCode"
                  outlined
                  :options="problemCodeOptions"
                  v-model="waterTemperatureProblemCodeTwo"
                  label="Add Problem Code"
                  class="col"
                />
                <q-select
                  v-if="showWaterTemperatureQualifier"
                  outlined
                  :options="qualifierOptions"
                  v-model="waterTemperatureQualifierTwo"
                  label="Add Qualifier Code"
                  class="col"
                />
              </div>
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl even-container">
            <div class="q-mb-sm text-center water-quality-header">Volunteer Hours</div>
            <div class="q-mt-xl text-subtitle1">
              Use the fields in this section to enter volunteer hours spent monitoring. Be sure to select yourself,
              as well as, any additional monitors participating in this sampling event.
            </div>
            <div class="row q-gutter-x-md q-my-md">
              <q-select outlined v-model="volunteerOne" :options="volunteerOptions" label="Choose Monitor" class="col" />
              <q-input outlined v-model="volunteerOneHours" label="Enter Monitoring Hours for selected User" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-select outlined v-model="volunteerTwo" :options="volunteerOptions" label="Choose Monitor" class="col" />
              <q-input outlined v-model="volunteerTwoHours" label="Enter Monitoring Hours for selected User" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-select outlined v-model="volunteerThree" :options="volunteerOptions" label="Choose Monitor" class="col" />
              <q-input outlined v-model="volunteerThreeHours" label="Enter Monitoring Hours for selected User" class="col" />
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl odd-section-container">
            <div class="q-mb-sm text-center water-quality-header">Comments</div>
            <div class="row q-gutter-x-md q-my-md">
              <q-input
                outlined
                type="textarea"
                v-model="comments"
                label="Comments"
                class="col"
              />
            </div>
          </div>
          <div class="flex justify-center q-my-xl q-pb-xl">
            <q-btn
              label="Save"
              style="width: 265px; height: 60px; background-color: #8AAAE5"
              text-color="white"
              @click="submitButtonClick"
            />
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
// all component imports here
import { ref } from "vue";
import { useRouter } from "vue-router";

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
const _router = useRouter();

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here
const siteOptions = ['A2', 'GI'];
const site = ref('');
const sampleDate = ref('');
const sampleTime = ref('');
const conditionOptions = ['ACB', 'ALLARM', 'ALL'];
const conditions = ref('');
const oxygenSodiumThiosulfate = ref('');
const probeTemp = ref('');
const probePressure = ref('');
const probeTheoretical = ref('');
const calibrationValue = ref('');
const postSampleTemperature = ref('');
const postSamplePressure = ref('');
const postSampleTheoreticalValue = ref('');
const postSampleValue = ref('');
const bacteriaTemp = ref('');
const bacteriaTime = ref('');
const bacteriaBlank = ref('');
const surfaceDepth = ref('0.3 m');
const surfaceDepthOptions = ['0.3 m', '0.5 m', '1.0 m'];
const problemCodeOptions = [
  'RR - No Sample Received',
  'Q - Analyte present; Estimated reported value; Concentration is below range',
  'C - Instrument Failure',
  'F - Post-Calibration Failure'
];
const qualifierOptions = ['<', '>', 'E'];
const alkalinity = ref('');
const showAlkalinityTwo = ref(false);
const alkalinityTwo = ref('');
const alkalinityProblemCode = ref('');
const alkalinityProblemCodeTwo = ref('');
const showAlkalinityProblemCode = ref(false);
const alkalinityQualifier = ref('');
const alkalinityQualifierTwo = ref('');
const showAlkalinityQualifier = ref(false);
const airTemperature = ref('');
const showAirTemperatureTwo = ref(false);
const airTemperatureTwo = ref('');
const airTemperatureProblemCode = ref('');
const airTemperatureProblemCodeTwo = ref('');
const showAirTemperatureProblemCode = ref(false);
const airTemperatureQualifier = ref('');
const airTemperatureQualifierTwo = ref('');
const showAirTemperatureQualifier = ref(false);
const dissolvedOxygen = ref('');
const showDissolvedOxygenTwo = ref(false);
const dissolvedOxygenTwo = ref('');
const dissolvedOxygenProblemCode = ref('');
const dissolvedOxygenProblemCodeTwo = ref('');
const showDissolvedOxygenProblemCode = ref(false);
const dissolvedOxygenQualifier = ref('');
const dissolvedOxygenQualifierTwo = ref('');
const showDissolvedOxygenQualifier = ref(false);
const nitrateNitrogen = ref('');
const showNitrateNitrogenTwo = ref(false);
const nitrateNitrogenTwo = ref('');
const nitrateNitrogenProblemCode = ref('');
const nitrateNitrogenProblemCodeTwo = ref('');
const showNitrateNitrogenProblemCode = ref(false);
const nitrateNitrogenQualifier = ref('');
const nitrateNitrogenQualifierTwo = ref('');
const showNitrateNitrogenQualifier = ref(false);
const orthophosphate = ref('');
const showOrthophosphateTwo = ref(false);
const orthophosphateTwo = ref('');
const orthophosphateProblemCode = ref('');
const orthophosphateProblemCodeTwo = ref('');
const showOrthophosphateProblemCode = ref(false);
const orthophosphateQualifier = ref('');
const orthophosphateQualifierTwo = ref('');
const showOrthophosphateQualifier = ref(false);
const ph = ref('');
const showPhTwo = ref(false);
const phTwo = ref('');
const phProblemCode = ref('');
const phProblemCodeTwo = ref('');
const showPhProblemCode = ref(false);
const phQualifier = ref('');
const phQualifierTwo = ref('');
const showPhQualifier = ref(false);
const salinity = ref('');
const showSalinityTwo = ref(false);
const salinityTwo = ref('');
const salinityProblemCode = ref('');
const salinityProblemCodeTwo = ref('');
const showSalinityProblemCode = ref(false);
const salinityQualifier = ref('');
const salinityQualifierTwo = ref('');
const showSalinityQualifier = ref(false);
const totalDepth = ref('');
const showTotalDepthTwo = ref(false);
const totalDepthTwo = ref('');
const totalDepthProblemCode = ref('');
const totalDepthProblemCodeTwo = ref('');
const showTotalDepthProblemCode = ref(false);
const totalDepthQualifier = ref('');
const totalDepthQualifierTwo = ref('');
const showTotalDepthQualifier = ref(false);
const turbidity = ref('');
const showTurbidityTwo = ref(false);
const turbidityTwo = ref('');
const turbidityProblemCode = ref('');
const turbidityProblemCodeTwo = ref('');
const showTurbidityProblemCode = ref(false);
const turbidityQualifier = ref('');
const turbidityQualifierTwo = ref('');
const showTurbidityQualifier = ref(false);
const turbidityTube = ref('');
const showTurbidityTubeTwo = ref(false);
const turbidityTubeTwo = ref('');
const turbidityTubeProblemCode = ref('');
const turbidityTubeProblemCodeTwo = ref('');
const showTurbidityTubeProblemCode = ref(false);
const turbidityTubeQualifier = ref('');
const turbidityTubeQualifierTwo = ref('');
const showTurbidityTubeQualifier = ref(false);
const waterTemperature = ref('');
const showWaterTemperatureTwo = ref(false);
const waterTemperatureTwo = ref('');
const waterTemperatureProblemCode = ref('');
const waterTemperatureProblemCodeTwo = ref('');
const showWaterTemperatureProblemCode = ref(false);
const waterTemperatureQualifier = ref('');
const waterTemperatureQualifierTwo = ref('');
const showWaterTemperatureQualifier = ref(false);
const volunteerOptions = [
  'Dan Clements',
  'Dave Parrish',
  'Kevin Haigis',
  'Rob Jarvis',
  'Dave Jasinski',
  'Donna Jefferson',
  'Cassie Pianca',
  'Isadora Sageng',
  'Gina Sawaya',
  'Lisa Spallitta',
  'Jack Turner',
  'Rachel Watts'
];
const volunteerOne = ref('');
const volunteerOneHours = ref('');
const volunteerTwo = ref('');
const volunteerTwoHours = ref('');
const volunteerThree = ref('');
const volunteerThreeHours = ref('');
const comments = ref('');

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
function submitButtonClick() {
  console.log('Form data has been saved');
  _router.push({ name: "dataUploadReviewWaterQuality" });
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.water-quality-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.odd-section-container {
  background-color: #8AAAE542;

  .q-field, .q-select,
  .q-input {
    background-color: white !important;
  }
}

.odd-section-container, .even-container {
  padding-left: 125px;
  padding-right: 125px;
}
</style>
