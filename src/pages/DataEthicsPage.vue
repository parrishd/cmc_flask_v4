<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg resources-header">Data Ethics</div>
    </div>

    <div class="row q-mt-lg">
      <div class="col about-text">
        <p>
          All data available on the CMC Data Explorer are owned by the data
          provider(s) and not the Chesapeake Monitoring Cooperative.
        </p>
        <p>
          Data users are responsible for properly citing the original data
          provider. Contact information for data providers can be found HERE.
        </p>
        <ul>
          <li>
            Author/Rightsholder.
            <i>Title of data set including date range (Version number)</i>
            [Description of form]. Accessed from https:// (date data was
            accessed/downloaded).
          </li>
          <li>
            Example: Alliance for the Chesapeake Bay.
            <i>Water Quality (or Benthic Macroinvertebrate) Data 2017-2018 </i
            >[Data File]. Accessed from https://cmc.vims.edu/ (May 2, 2019).
          </li>
        </ul>
        <p>
          Data are identified by method and quality assurance level using the
          CMC tiered framework as part of the integration process by the CMC
          service providers. Data users are responsible for using provided data
          in a manner consistent to the quality assurance of the provided data.
        </p>
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

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
.about-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}

.resources-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}
</style>
