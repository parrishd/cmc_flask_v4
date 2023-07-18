<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center forgot-password-header">
        Forgot Password?
      </div>
    </div>

    <div class="row">
      <div class="col q-mt-lg forgot-password-text">
        If you've forgotten your password no worries. We can help you retrieve
        it. Please provide your email and we'll shoot you an email with recovery
        instructions.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col">
        <q-input label="Email" outlined />
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col text-center">
        <q-btn label="Submit" style="width: 300px" color="primary" />
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

.forgot-password-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.forgot-password-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}
</style>
