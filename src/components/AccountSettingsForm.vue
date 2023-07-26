<template>
  <div class="q-my-xl q-pb-sm">

    <div class="row">
      <div class="col q-pr-md">
        <q-input v-model="email" label="Email" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="firstName" label="First Name" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="lastName" label="Last Name" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="cellPhone" label="Cell Phone" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="homePhone" label="Home Phone" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="emergencyPhone" label="Emergency Phone" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="addressFirst" label="Address First" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="addressSecond" label="Address Second" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="userState" label="State" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="zip" label="Zip" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="group" label="Select Group" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="role" label="Role" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="volunteerHours" label="Volunteer Hours" outlined />
      </div>
      <div class="col q-pl-md">
      </div>
    </div>

    <div class="row q-my-xl">
      <div class="col text-center">
        <q-btn
          style="width: 265px; height: 60px; background-color: #4B4545"
          class="q-mr-md cancel-image-btn"
          label="Cancel"
          text-color="white"
          @click="cancelSettingsButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Save"
          text-color="white"
          @click="saveSettingsButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { ref } from "vue";

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
// ref/ui variables here
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const cellPhone = ref("");
const homePhone = ref("");
const emergencyPhone = ref("");
const addressFirst = ref("");
const addressSecond = ref("");
const userState = ref("");
const zip = ref("");
const group = ref("");
const role = ref("");
const volunteerHours = ref("");

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
function saveSettingsButtonClick() {
  console.log('save settings button click');
};

function cancelSettingsButtonClick() {
  console.log('cancel settings button click');
};

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped></style>
