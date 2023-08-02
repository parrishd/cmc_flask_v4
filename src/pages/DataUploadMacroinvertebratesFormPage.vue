<template>
  <q-page>
    <div class="q-px-xl q-mx-xl">
      <div class="row q-mx-xl q-px-xl">
        <div class="col">
          <div class="q-mt-xl q-pa-xl even-container">
            <div class="q-mb-sm text-center macroinvertebrate-upload-header">
              Upload Macroinvertebrates Data Form
            </div>
            <div class="q-my-xl text-subtitle1">
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
                <q-input outlined v-model="sampleTime" label="Sample Time" mask="time" :rules="['time']" format24h="false">
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
            <div class="q-mb-sm text-center macroinvertebrate-upload-header">Conditions During Sampling</div>
            <div class="q-my-xl text-subtitle1">
              First choose the set of conditions that you would like to include on the form.
              Next, use the added fields to describe conditions at the sampling location at the time sampling occurred.
            </div>
            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="vegetated" label="Vegetated" class="col"/>
              <q-input outlined v-model="snagLogs" label="Snags/Logs" class="col" />
              <q-input outlined v-model="aquaticMatter" label="Aquatic Veg/Decaying Matter" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="siltSandGravel" label="Silt/Sand/Gravel" class="col"/>
              <q-input outlined v-model="vegetatedJabs" label="Vegetated Jabs" class="col" />
              <q-input outlined v-model="snagsLogsJabs" label="Snags/Logs Jabs" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="aquaticMatterJabs" label="Aquatic Veg/Decaying Matter Jabs" class="col"/>
              <q-input outlined v-model="siltSandGravelJabs" label="Silt/Sand/Gravel Jabs" class="col" />
              <q-select outlined v-model="streamFlow" :options="streamFlowOptions" label="Stream Flow" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="weatherConditions" :options="weatherConditionsOptions" label="Weather Conditions" class="col" />
              <q-input outlined v-model="weatherConditionsLast72" label="Weather Last 72 Hours" class="col" />
              <q-select outlined v-model="fishWaterQuality" :options="fishWaterQualityOptions" label="Fish Water Quality Indicators" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="fishMovementBarriers" :options="fishMovementBarriersOptions" label="Barriers to Fish Movement" class="col" />
              <q-select outlined v-model="surfaceWaterAppearance" :options="surfaceWaterAppearanceOptions" label="Surface Water Appearance" class="col" />
              <q-select outlined v-model="streamBedDeposit" :options="streamBedDepositOptions" label="Stream Bed Deposit" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="odor" :options="odorOptions" label="Odor" class="col" />
              <q-select outlined v-model="streamStability" :options="streamStabilityOptions" label="Stability of Stream" class="col" />
              <q-select outlined v-model="algaeColor" :options="algaeColorOptions" label="Algae Color" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="algaeLocated" :options="algaeLocatedOptions" label="Algae Located" class="col" />
              <q-input outlined v-model="percentAlgae" label="Percent Algae" class="col" />
              <q-select outlined v-model="streamChannelShade" :options="streamChannelShadeOptions" label="Stream Channel Shade" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="percentTrees" label="Percent Trees" class="col" />
              <q-input outlined v-model="percentShrubs" label="Percent Shrubs" class="col" />
              <q-input outlined v-model="percentGrass" label="Percent Grass" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="otherBankComposition" label="Define Other Bank Composition" class="col" />
              <q-input outlined v-model="percentSilt" label="Percent Silt" class="col" />
              <q-input outlined v-model="percentSand" label="Percent Sand" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="percentGravel" label="Percent Gravel" class="col" />
              <q-input outlined v-model="percentCobbles" label="Percent Cobbles" class="col" />
              <q-input outlined v-model="percentBoulders" label="Percent Boulders" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="oilGasDrilling" :options="levelOptions" label="Oil and Gas Drilling" class="col" />
              <q-select outlined v-model="housingDevelopment" :options="levelOptions" label="Housing Development" class="col" />
              <q-select outlined v-model="forest" :options="levelOptions" label="Forest" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="loggingLevel" :options="levelOptions" label="Logging" class="col" />
              <q-select outlined v-model="urbanUseLevel" :options="levelOptions" label="Urban Use" class="col" />
              <q-select outlined v-model="sanitaryLandfillLevel" :options="levelOptions" label="Sanitary Landfill" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="activeConstruction" :options="levelOptions" label="Active Construction" class="col" />
              <q-select outlined v-model="mining" :options="levelOptions" label="Mining" class="col" />
              <q-input outlined v-model="miningType" label="Type of Mining" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="cropland" :options="levelOptions" label="Cropland" class="col" />
              <q-input outlined v-model="croplandType" label="Type of Cropland" class="col" />
              <q-select outlined v-model="trashDump" :options="levelOptions" label="Trash Dump" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="fields" :options="levelOptions" label="Fields" class="col" />
              <q-select outlined v-model="livestockPasture" :options="levelOptions" label="Livestock Pasture" class="col" />
              <q-select outlined v-model="otherUse" :options="levelOptions" label="Other Land Use" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined type="textarea" v-model="otherUseDefinition" label="Define Other Land Use" class="col" />
              <q-input outlined type="textarea" v-model="litterDefinition" label="Describe the amount and type of litter" class="col" />
              <q-input outlined type="textarea" v-model="threats" label="Indicate Current and Potential Threats" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-select outlined v-model="streamErosion" :options="erosionOptions" label="Stream Channel Erosion" class="col" />
              <q-input outlined v-model="channelWidth" label="Channel Width" class="col" />
              <q-input outlined v-model="areaSampledOne" label="Area 1 Sampled" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="areaSampledTwo" label="Area 2 Sampled" class="col" />
              <q-input outlined v-model="areaSampledThree" label="Area 3 Sampled" class="col" />
              <q-input outlined v-model="areaSampledFour" label="Area 4 Sampled" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="squirtNumber" label="Number of Squirts" class="col" />
              <q-input outlined v-model="dischargePipes" label="Discharge Pipes" class="col" />
              <q-input outlined v-model="dischargePipesNumber" label="Number of Discharge Pipes" class="col" />
            </div>

            <div class="row q-gutter-x-md q-mb-md">
              <q-input outlined v-model="pipesType" label="Types of Pipes" class="col" />
              <q-select
                outlined
                v-model="bottomType"
                :options="bottomTypeOptions"
                label="Bottom Type"
                class="col"
              />
            </div>

            <div class="flex justify-center q-mt-xl q-mb-lg">
              <q-btn
                label="Save"
                style="width: 265px; height: 60px; background-color: #8AAAE5"
                text-color="white"
                @click="submitButtonClick"
              />
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl even-container">
            <div class="q-mb-sm text-center macroinvertebrate-upload-header">Collection Times</div>

            <div class="row q-gutter-x-md q-my-xl">
              <div class="col q-pa-md">
                <q-field
                  outlined
                  :model-value="netOneSlider"
                  label="Collection Time (Net 1) (0-90 Seconds)"
                  stack-label
                >
                  <template v-slot:control>
                    <q-slider v-model="netOneSlider" :min="0" :max="90" label label-always class="q-mt-xl q-mx-md" />
                  </template>
                </q-field>
              </div>

              <div class="col q-pa-md">
                <q-field
                  outlined
                  :model-value="netTwoSlider"
                  label="Collection Time (Net 2) (0-90 Seconds)"
                  stack-label
                >
                  <template v-slot:control>
                    <q-slider v-model="netTwoSlider" :min="0" :max="90" label label-always class="q-mt-xl q-mx-md" />
                  </template>
                </q-field>
              </div>
            </div>

            <div class="row q-gutter-x-md q-my-xl">
              <div class="col q-pa-md">
                <q-field
                  outlined
                  :model-value="netThreeSlider"
                  label="Collection Time (Net 3) (0-90 Seconds)"
                  stack-label
                >
                  <template v-slot:control>
                    <q-slider v-model="netThreeSlider" :min="0" :max="90" label label-always class="q-mt-xl q-mx-md" />
                  </template>
                </q-field>
              </div>

              <div class="col q-pa-md">
                <q-field
                  outlined
                  :model-value="netFourSlider"
                  label="Collection Time (Net 4) (0-90 Seconds)"
                  stack-label
                >
                  <template v-slot:control>
                    <q-slider v-model="netFourSlider" :min="0" :max="90" label label-always class="q-mt-xl q-mx-md" />
                  </template>
                </q-field>
              </div>
            </div>

            <div class="flex justify-center q-mt-xl q-mb-lg">
              <q-btn
                label="Save"
                style="width: 265px; height: 60px; background-color: #8AAAE5"
                text-color="white"
                @click="submitButtonClick"
              />
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl odd-section-container">
            <div class="q-mb-sm text-center macroinvertebrate-upload-header">Macroinvertebrate Tallies</div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="worms" label="Worms" class="col" />
              <q-input outlined v-model="flatworms" label="Flatworms" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="leeches" label="Leeches" class="col" />
              <q-input outlined v-model="crayfish" label="Crayfish" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="snowbugs" label="Snowbugs" class="col" />
              <q-input outlined v-model="scuds" label="Scuds" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="stoneflies" label="Stoneflies" class="col" />
              <q-input outlined v-model="mayflies" label="Mayflies" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="hellgrammitesFishfliesAlderflies" label="Hellgrammites, Fishflies, and Alderflies" class="col" />
              <q-input outlined v-model="commonNetspinners" label="Common Netspinners" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="caddisFlies" label="Most Caddisflies" class="col" />
              <q-input outlined v-model="beetles" label="Beetles" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="midges" label="Midges" class="col" />
              <q-input outlined v-model="blackflies" label="Blackflies" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="trueFlies" label="Most True Flies" class="col" />
              <q-input outlined v-model="gilledSnails" label="Gilled Snails" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="lungedSnails" label="Lunged Snails" class="col" />
              <q-input outlined v-model="clams" label="Clams" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="otherOrganisms" label="Other Organisms" class="col" />
              <q-input outlined v-model="freshwaterShrimp" label="Freshwater Shrimp" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="dragonfliesDamselflies" label="Dragonflies and Damselflies (Not Gomphidae)" class="col" />
              <q-input outlined v-model="gomphidaeDragonflies" label="Gomphidae Dragonflies" class="col" />
            </div>

            <div class="row q-gutter-x-md q-my-md">
              <q-input outlined v-model="trueBugs" label="True Bugs" class="col" />
              <q-input outlined v-model="otherOrganismDefinition" label="Define Other Organisms" class="col" />
            </div>

            <div class="flex justify-center q-mt-xl q-mb-lg">
              <q-btn
                label="Save"
                style="width: 265px; height: 60px; background-color: #8AAAE5"
                text-color="white"
                @click="submitButtonClick"
              />
            </div>
          </div>

          <div class="q-mt-xl q-pa-xl even-container">
            <div class="text-center macroinvertebrate-upload-header">Metrics</div>
            <div class="q-my-xl text-subtitle1">
              These metric calculations will update automatically as the user inputs counts in the
              'Macroinvertebrates Tallies' section of this form.
            </div>
          </div>

          <div class="q-my-xl q-pa-xl odd-section-container">
            <div class="q-mb-sm text-center macroinvertebrate-upload-header">Volunteer Hours</div>

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

            <div class="row q-gutter-x-md q-my-md">
              <q-input
                outlined
                type="textarea"
                v-model="comments"
                label="Comments"
                class="col"
              />
            </div>

            <div class="flex justify-center q-mt-xl q-mb-lg">
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
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { ref } from 'vue';
import { useRouter } from 'vue-router'
;
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
const vegetated = ref('');
const snagLogs = ref('');
const aquaticMatter = ref('');
const siltSandGravel = ref('');
const vegetatedJabs = ref('');
const snagsLogsJabs = ref('');
const aquaticMatterJabs = ref('');
const siltSandGravelJabs = ref('');
const streamFlowOptions = ['Negligible', 'Low', 'Normal', 'High'];
const streamFlow = ref('');
const weatherConditionsOptions = ['Sunny', 'Partly Cloudy', 'Overcast', 'Fog/Haze'];
const weatherConditions = ref('');
const weatherConditionsLast72 = ref('');
const fishWaterQualityOptions = ['No Fish', 'Scattered Individuals', 'Scattered Schools', 'Trout', 'Bass', 'Catfish', 'Carp'];
const fishWaterQuality = ref('');
const fishMovementBarriersOptions = ['No Barriers', 'Beaver Dams', 'Man-made Dams', 'Waterfalls'];
const fishMovementBarriers = ref('');
const surfaceWaterAppearanceOptions = ['Clear', 'Clear But Tea-Colored', 'Colored Sheen', 'Foamy', 'Milky', 'Muddy', 'Black', 'Gray', 'Other'];
const surfaceWaterAppearance = ref('');
const streamBedDepositOptions = ['Gray', 'Orange Red', 'Yellow', 'Black', 'Brown', 'Silt', 'Sand', 'Other'];
const streamBedDeposit = ref('');
const odorOptions = ['No Odor', 'Musky', 'Oil', 'Sewage', 'Other'];
const odor = ref('');
const streamStabilityOptions = ['No Spots', 'A Few Spots', 'Many Spots'];
const streamStability = ref('');
const algaeColorOptions = ['Light Green', 'Dark Green', 'Brown Coated', 'No Algae'];
const algaeColor = ref('');
const algaeLocatedOptions = ['In Spots', 'Everywhere', 'No Algae'];
const algaeLocated = ref('');
const percentAlgae = ref('');
const streamChannelShadeOptions = ['Full', 'High', 'Moderate', 'Slight'];
const streamChannelShade = ref('');
const percentTrees = ref('');
const percentShrubs = ref('');
const percentGrass = ref('');
const otherBankComposition = ref('');
const percentSilt = ref('');
const percentSand = ref('');
const percentGravel = ref('');
const percentCobbles = ref('');
const percentBoulders = ref('');
const levelOptions = ['High', 'Moderate', 'Slight', 'No Potential'];
const oilGasDrilling = ref('');
const housingDevelopment = ref('');
const forest = ref('');
const loggingLevel = ref('');
const urbanUseLevel = ref('');
const sanitaryLandfillLevel = ref('');
const activeConstruction = ref('');
const mining = ref('');
const miningType = ref('');
const cropland = ref('');
const croplandType = ref('');
const trashDump = ref('');
const fields = ref('');
const livestockPasture = ref('');
const otherUse = ref('');
const otherUseDefinition = ref('');
const litterDefinition = ref('');
const threats = ref('');
const erosionOptions = ['Severe', 'High', 'Moderate', 'Slight'];
const streamErosion = ref('');
const channelWidth = ref('');
const areaSampledOne = ref('');
const areaSampledTwo = ref('');
const areaSampledThree = ref('');
const areaSampledFour = ref('');
const squirtNumber = ref('');
const dischargePipes = ref('');
const dischargePipesNumber = ref('');
const pipesType = ref('');
const netOneSlider = ref(0);
const netTwoSlider = ref(0);
const netThreeSlider = ref(0);
const netFourSlider = ref(0);
const bottomTypeOptions = ['Muddy', 'Rocky'];
const bottomType = ref('');
const worms = ref('');
const flatworms = ref('');
const leeches = ref('');
const crayfish = ref('');
const snowbugs = ref('');
const scuds = ref('');
const stoneflies = ref('');
const mayflies = ref('');
const hellgrammitesFishfliesAlderflies = ref('');
const commonNetspinners = ref('');
const caddisFlies = ref('');
const beetles = ref('');
const midges = ref('');
const blackflies = ref('');
const trueFlies = ref('');
const gilledSnails = ref('');
const lungedSnails = ref('');
const clams = ref('');
const otherOrganisms = ref('');
const freshwaterShrimp = ref('');
const dragonfliesDamselflies = ref('');
const gomphidaeDragonflies = ref('');
const trueBugs = ref('');
const otherOrganismDefinition = ref('');
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
function submitButtonClick() {
  console.log("Submit Button Click");
  _router.push({ name: "dataUploadReviewMacroinvertebrates" });
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.macroinvertebrate-upload-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.odd-section-container {
  background-color: #8AAAE542;

  .q-field, .q-select,
  .q-input, .q-btn {
    background-color: white !important;
  }

  .q-btn {
    color: $vims-medium-blue !important;
  }
}

.odd-section-container, .even-container {
  padding-left: 125px;
  padding-right: 125px;
}


</style>
