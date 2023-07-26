<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center manage-header">Manage</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg manage-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, elit et volutpat elementum,
        quam ex lacinia augue, ut fermentum ligula turpis id sem. Morbi ac diam et sem varius fringilla.
        Donec ultricies gravida mi, et scelerisque urna placerat at. Vivamus tincidunt sem in augue euismod,
        in ullamcorper diam cursus. Suspendisse non lacinia urna, ac elementum sapien.
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
import ContactForm from "components/ContactForm.vue";
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.manage-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.manage-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}
</style>
