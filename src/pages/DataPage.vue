<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center data-header">
        Chesapeake Data Explorer
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center data-text">
        Virginia Institute of Marine Science's Activity this month
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col flex justify-end">
        <div class="text-center">
          <div>
            <q-icon name="fa-solid fa-user" color="primary" size="4.4em" />
          </div>
          <div class="stat-count-text">14</div>
          <div class="stat-desc-text">NEW USERS</div>
        </div>
      </div>
      <div style="max-width: 160px" class="col"><!-- spacer --></div>
      <div class="col flex justify-start">
        <div class="text-center">
          <div>
            <q-icon
              name="fa-solid fa-microscope"
              color="primary"
              size="4.4em"
            />
          </div>
          <div class="stat-count-text">139</div>
          <div class="stat-desc-text">NEW SAMPLES</div>
        </div>
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center data-text">Admin Quick Links</div>
    </div>

    <div class="row q-mt-lg">
      <div class="col text-center">
        <q-btn
          style="width: 220px; height: 60px"
          class="q-mr-md"
          color="primary"
          label="UPLOAD DATA"
          @click="uploadDataButtonClick"
        />
        <q-btn
          style="width: 220px; height: 60px"
          class="q-ml-md"
          color="primary"
          label="CONTACT SERVICE"
          @click="contactServiceButtonClick"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
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
const _router = useRouter();

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here

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
function uploadDataButtonClick() {
  _router.push({ name: "dataUpload" });
}

function contactServiceButtonClick() {
  console.log("contact service button click");
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.data-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.data-text {
  color: $vims-medium-blue;
  font-size: 1.7em;
  font-weight: 600;
}

.stat-count-text {
  color: $vims-medium-blue;
  font-size: 2.7em;
  font-weight: 600;
}

.stat-desc-text {
  color: $vims-dark-gray;
  font-size: 1.25em;
  font-weight: 500;
}
</style>
