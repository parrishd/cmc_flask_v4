<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center water-quality-header">Upload Water Quality</div>
    </div>

    <div>
      <div class="col q-mt-lg">
        There are two different methods for uploading data to the Data Explorer: Single sample event uploads through
        a data entry form OR multiple sample event uploads by uploading a spreadsheet file. The file for the latter
        method needs to adhere to a very specific file format, a template for which can be downloaded here.
        Additional details can be found in the Data Explorer User's Manual.
      </div>
      <div class="col q-mt-xl">
        Choose the type of upload you would like to do today:
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Form"
          text-color="white"
          @click="waterQualityFormClick"
        />
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Bulk File"
          text-color="white"
          @click="waterQualityBulkClick"
        />
      </div>
    </div>

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
// ui functions here
function waterQualityFormClick() {
  console.log('water quality form button click');
}
function waterQualityBulkClick() {
  console.log('water quality bulk upload button click');
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
</style>
