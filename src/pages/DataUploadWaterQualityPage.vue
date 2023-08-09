<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center data-header">
        Upload Water Quality
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col data-text">
        There are two different methods for uploading data to the Data Explorer:
        Single sample event data uploads through a data entry form OR multiple
        sample event uploads by uploading a spreadsheet file. The file for the
        latter methods needs to adhere to a very specific file format. A
        template for which can be downloaded <a href="#">here</a>. Additional
        details can be found in the Data Explorer User's Manual.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col data-text">
        Choose the type of upload you would like to do today:
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 220px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md"
          text-color="white"
          label="FORM"
          @click="formButtonClick"
        />
        <q-btn
          style="width: 220px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md"
          text-color="white"
          label="BULK FILE"
          @click="bulkFileButtonClick"
        />
      </div>
    </div>
    <input
      ref="fileInputRef"
      type="file"
      style="display: none"
      @change="handleFileChange"
    />
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { useRouter } from "vue-router";
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
const _router = useRouter();

/****************************
 * Ref/UI Variables
 ***************************/
const fileInputRef = ref(null);

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
function formButtonClick() {
  _router.push({ name: "dataUploadWaterQualityForm" });
}

function bulkFileButtonClick() {
  // _router.push({ name: "dataUploadReview" });
  fileInputRef.value.click();
}

function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  console.log("Selected File:", selectedFile);
  _router.push({ name: "dataUploadReviewWaterQuality" });
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
