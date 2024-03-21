<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center resources-header">Resources</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg resources-text"></div>
    </div>

    <div class="row q-mt-xl">
      <!-- Manual -->
      <div class="col-4">
        <div class="flex justify-center resource-image-container">
          <q-img
            src="/images/resources/manual-resources.svg"
            style="width: 175px; height: 175px"
          />
        </div>
        <div class="text-center resource-header">Manual</div>
        <div class="q-px-md resource-links">
          <a href="/resource-documents/UserGuide.pdf" target="_blank">
            Chesapeake Data Explorer Manual
          </a>
          <a href="/resource-documents/parameters.csv"> Parameters List </a>
          <a href="/resource-documents/problemCodes.csv"> Problem Code List </a>
          <a href="/resource-documents/qualifierCodes.csv">
            Qualifier Code List
          </a>
          <a href="/resource-documents/water_quality_condition_categories.csv">
            Water Quality Condition Code List
          </a>
          <a href="/resource-documents/benthic_condition_categories.csv">
            Benthic Condition Code List
          </a>
        </div>
      </div>

      <!-- Homepage Tutorials -->
      <div class="col-4">
        <div class="flex justify-center resource-image-container">
          <q-img
            src="/images/resources/homepage-tutorials-resources.svg"
            style="width: 175px; height: 175px"
          />
        </div>
        <div class="text-center resource-header">Homepage Tutorials</div>
        <div class="q-px-md resource-links">
          <a href="https://www.youtube.com/watch?v=aJyH7YivEO4" target="_blank">
            Homepage walk through
          </a>
          <a href="https://youtu.be/CEn4mx3IAw0" target="_blank">
            Query page
          </a>
          <a href="https://youtu.be/BvJ7eQ-bdZQ" target="_blank">
            Water quality data download
          </a>
          <a href="https://youtu.be/8NZeRRLLFEo" target="_blank">
            Metadata files
          </a>
        </div>
      </div>

      <!-- Manual -->
      <div class="col-4">
        <div class="flex justify-center resource-image-container">
          <q-img
            src="/images/resources/data-upload-resources.svg"
            style="width: 185px; height: 185px"
          />
        </div>
        <div class="text-center resource-header">Data Upload Tutorials</div>
        <div class="q-px-md resource-links">
          <a href="https://youtu.be/of0vuk5VcZs" target="_blank">
            Creating a user account
          </a>
          <a href="https://youtu.be/WgZYOinH5WU" target="_blank">
            Submitting a station
          </a>
          <a href="https://youtu.be/dI3UFrtjdAw" target="_blank">
            Uploading water quality data online form
          </a>
        </div>
      </div>
    </div>

    <div class="row q-my-xl">
      <!-- Coordinator Tutorials -->
      <div class="col-4">
        <div class="flex justify-center resource-image-container">
          <q-img
            src="/images/resources/coordinated-tutorials-resources.svg"
            style="width: 185px; height: 185px"
            fit="contain"
          />
        </div>
        <div class="text-center resource-header">Coordinator Tutorials</div>
        <div class="q-px-md resource-links">
          <a href="https://youtu.be/vWifRVhwAAQ" target="_blank">
            Water Quality Bulk Upload Template
          </a>
          <a href="https://youtu.be/O0PuTPcoOLQ" target="_blank">
            Bulk Upload Process
          </a>
        </div>
      </div>

      <!-- Manual -->
      <div class="col-4">
        <div class="flex justify-center resource-image-container">
          <q-img
            src="/images/resources/data-translation-resources.svg"
            style="width: 185px; height: 185px"
          />
        </div>
        <div class="text-center resource-header">Data Translation Macro</div>
        <div class="q-px-md resource-links">
          <a href="resource-documents/macroGuide.pdf" target="_blank">
            Data Translation Macro Guide
          </a>
          <a href="resource-documents/macroTemplate.xlsm">
            Data Translation Macro
          </a>
        </div>
      </div>
      <div class="col-4" />
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

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
import ContactForm from "components/ContactForm.vue";
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.resources-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.resources-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}

.resource-image-container {
  height: 200px;
}

.resource-header {
  color: $vims-medium-blue;
  font-size: 2em;
  font-weight: 600;
}

.resource-links {
  a {
    margin-top: 4px;
    display: block;
    text-decoration: none;
    font-size: 1.25em;
    color: $vims-medium-blue;
  }

  a:hover {
    color: $vims-medium-blue;
  }
}
</style>
