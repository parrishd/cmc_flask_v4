<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center data-header">Data Toolset</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg manage-text">
        The Data Toolset enables users to upload water quality and benthic macroinvertebrate sampling data.
        Once data are uploaded to the system users can review, edit, and publish water quality and benthic
        macroinvertebrate data.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Upload Water Quality"
          text-color="white"
          @click="waterQualityButtonClick"
        />
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Edit & Review Water Quality"
          text-color="white"
          @click="waterQualityReviewButtonClick"
        />
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Upload Macroinvertebrates"
          text-color="white"
          @click="macroinvertebratesButtonClick"
        />
        <q-btn
          style="width: 300px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Edit & Review Macroinvertebrates"
          text-color="white"
          @click="macroinvertebratesReviewButtonClick"
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
function waterQualityButtonClick() {
  _router.push({name: "dataUploadWaterQuality"})
}
function waterQualityReviewButtonClick() {
  _router.push({name: "dataUploadReviewWaterQuality"})
}
function macroinvertebratesButtonClick() {
  _router.push({name: "dataUploadMacroinvertebrate"})
}
function macroinvertebratesReviewButtonClick() {
  _router.push({name: "dataUploadReviewMacroinvertebrates"})
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
</style>
