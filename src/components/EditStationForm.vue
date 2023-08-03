<template>
  <q-dialog presistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <div class="q-pa-md">
        <q-card-section>
          <div class="text-h4 text-center text-bold q-mb-lg edit-header">
            Edit Station: {{ station.stationName }}
          </div>

          <q-input v-model="stationName" label="Station Name" class="q-mb-md" outlined />
          <q-input v-model="stationCode" label="Code" class="q-mb-md" outlined />
          <q-input v-model="stationLongName" label="Station Long Name" class="q-mb-md" outlined />
          <q-input v-model="stationDescription" label="Description" type="textarea" class="q-mb-md" outlined />
          <q-select v-model="samplingMethod" :options="samplingMethodOptions" label="Sampling Methods" class="q-mb-md" outlined />
          <q-input v-model="latitude" label="Latitude" class="q-mb-md" outlined />
          <q-input v-model="longitude" label="Longitude" class="q-mb-md" outlined />
          <q-input v-model="huc" label="HUC 12" class="q-mb-md" outlined />
          <q-input v-model="waterbody" label="Waterbody" class="q-mb-md" outlined />
          <q-input v-model="fipsCode" label="FIPS Code" class="q-mb-md" outlined />
          <q-select v-model="tidal" label="Tidal" :options="tidalOptions" class="q-mb-md" outlined />
          <q-input v-model="comments" type="textarea" label="Comments" class="q-mb-md" outlined />


        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            style="width: 225px; height: 60px; background-color: #4B4545"
            class="q-mr-md"
            text-color="white"
            label="Cancel"
            v-close-popup
          />
          <q-btn
            label="Save"
            class="q-ml-md"
            style="width: 225px; height: 60px; background-color: #8AAAE5"
            text-color="white"
            @click="saveStation" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { ref, defineProps, defineEmits } from 'vue';

/*****************************
 * Lazy/Async components
 ****************************/
// lazy loaded components/imports here

/****************************
 * Emit Definitions
 ***************************/
// emits defined here
const emit = defineEmits(['update:visible']);

const closeDialog = () => {
  emit('update:visibile', false);
}

/****************************
 * Component Props
 ***************************/
// props defined here
const props = defineProps({
  visibile: Boolean,
  station: Object,
})

/****************************
 * Local/'Use' Variables
 ***************************/
// local/use variables here

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here
const stationName = ref('');
const stationCode = ref('');
const stationLongName = ref('');
const stationDescription = ref('');
const samplingMethod = ref('');
const samplingMethodOptions = ['Shoreline', 'Wade in mid-channel', 'Bridge/Dock mid-channel', 'Boat mid-channel'];
const groupDescription = ref('');
const latitude = ref('');
const longitude = ref('');
const city = ref('');
const state = ref('');
const huc = ref('');
const waterbody = ref('');
const fipsCode = ref('');
const tidal = ref('');
const tidalOptions = ['Nontidal', 'Tidal'];
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
function saveStation() {
  console.log('Station details submitted');
  emit('update:visibile', false);
}


/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';

.edit-header {
  color: $vims-medium-blue;
}
</style>
