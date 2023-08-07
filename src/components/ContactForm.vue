<template>
  <div class="q-mt-xl">
    <!-- Email/Password -->
    <div class="row">
      <div class="col q-pr-md">
        <q-input v-model="name" label="Name" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="phone" label="Phone" outlined />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="email" label="Email" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="agency" label="Agency" outlined />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col">
        <q-input
          v-model="comments"
          label="Additional Comments"
          type="textarea"
          outlined
        />
      </div>
    </div>

    <div class="row q-my-lg">
      <div class="col text-center">
        <q-btn label="Submit" color="primary" style="width: 265px; height: 60px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*****************************
 * Imports
 ****************************/
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
// todo: load from API
const states = ref(["Alabama", "Alaska", "Arizona", "Arkansas", "..."]);
const groups = ref([
  "Caledon State Park",
  "Chesapeake Bay Foundation",
  "Maymont Foudation",
  "...",
]);

const name = ref("");
const phone = ref("");
const email = ref("");
const agency = ref("");
const comments = ref("");

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

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped></style>
