<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center data-header">Upload Data</div>
    </div>

    <div class="row q-mt-xl">
      <div class="col data-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </div>

    -- Form --

    <q-btn label="Submit" @click="submitButtonClick" />
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here

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
  console.log("submitButtonClick");
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
  font-size: 1.25em;

  a {
    color: $vims-medium-blue;
    text-decoration: none;
    font-weight: bold;
  }
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
