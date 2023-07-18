<template>
  <div class="q-mt-xl">
    <!-- Email/Password -->
    <div class="row">
      <div class="col q-pr-md">
        <q-input v-model="email" label="Email" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="password" label="Password" outlined />
      </div>
    </div>

    <!-- Contact Info -->
    <div class="row q-mt-lg">
      <div class="col text-h6 text-primary">Contact Info</div>
    </div>
    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="firstName" label="First Name" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="lastName" label="Last Name" outlined />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="cellPhone" label="Cell Phone" outlined />
      </div>
      <div class="col q-px-md">
        <q-input v-model="homePhone" label="Home Phone" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="emergencyPhone" label="Emergency Phone" outlined />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="address1" label="Address 1" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="address2" label="Address 2" outlined />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-input v-model="city" label="City" outlined />
      </div>
      <div class="col q-px-md">
        <q-select v-model="state" :options="states" label="State" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="zipCode" label="Zip Code" outlined />
      </div>
    </div>

    <!-- Profile Info -->
    <div class="row q-mt-lg">
      <div class="col text-h6 text-primary">Profile Info</div>
    </div>
    <div class="row q-mt-md">
      <div class="col q-pr-md">
        <q-select v-model="group" :options="groups" label="Group" outlined />
      </div>
      <div class="col q-pl-md">
        <q-file v-model="profileImage" label="Profile Image" outlined />
      </div>
    </div>

    <div class="row q-my-lg">
      <div class="col text-right">
        I have read the
        <a href="#" @click.prevent="termsConditionsLinkClick" class="terms-link"
          >Terms and Conditions</a
        >
        <q-checkbox v-model="termsConditions" class="q-mr-lg" />
        <q-btn label="Register" color="primary" style="width: 160px" />
      </div>
    </div>

    <TermsConditionsDialog :open="termsDialogOpen" @close="termsDialogClose" />
  </div>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { ref, defineAsyncComponent } from "vue";

/*****************************
 * Lazy/Async components
 ****************************/
const TermsConditionsDialog = defineAsyncComponent(() =>
  import("components/TermsConditionsDialog.vue")
);

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

const email = ref("");
const password = ref("");

const firstName = ref("");
const lastName = ref("");

const cellPhone = ref("");
const homePhone = ref("");
const emergencyPhone = ref("");
const address1 = ref("");
const address2 = ref("");
const city = ref("");
const state = ref("");
const zipCode = ref("");

const group = ref("");
const profileImage = ref(null);
const termsConditions = ref(false);

const termsDialogOpen = ref(false);

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
function termsConditionsLinkClick() {
  console.log("clicked");
  termsDialogOpen.value = true;
}

function termsDialogClose() {
  console.log("and here");
  termsDialogOpen.value = false;
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.terms-link {
  text-decoration: none;
  color: $vims-medium-blue;
  font-weight: 500;
}
</style>
