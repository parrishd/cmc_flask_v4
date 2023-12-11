<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center contact-header">Contact</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg contact-text">
        For more information on citizen and non-agency monitoring in Virginia,
        visit Virginia DEQ's Citizen Monitoring website. If you have questions
        or comments about the Chesapeake Monitoring Cooperative (CMC) or the
        Chesapeake Data Explorer or are interested in having your organization
        participate in the CMC, please contact Liz Chudoba, CMC Project Manager,
        or visit the CMC website. 
      </div>
    </div>

    <!-- Registration Form -->
    <ContactForm />
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import ContactForm from "components/ContactForm.vue";

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
import RegistrationForm from "components/RegistrationForm.vue";
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.contact-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.contact-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}
</style>
