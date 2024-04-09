<template>
  <div class="footer-container q-py-lg">
    <div class="row">
      <div class="col sponsor-container">
        <a href="https://www.vims.edu/cbnerr/" target="_blank">
          <q-img
            style="width: 200px"
            src="images/sponsors/CBNERR_logo_white.png"
            fit="contain"
          />
        </a>
        <a href="https://www.vims.edu" target="_blank">
          <q-img
            style="width: 180px"
            class="q-mt-md"
            src="images/sponsors/vims_logo_white.png"
            fit="contain"
          />
        </a>
        <a href="https://www.chesapeakemonitoringcoop.org" target="_blank">
          <q-img
            style="width: 140px"
            class="q-mt-sm"
            src="images/sponsors/cmc_logo_white.png"
            fit="contain"
          />
        </a>
      </div>
    </div>

    <!-- <div class="row q-my-lg">
      <div class="col social-container">
        <a href="https://www.facebook.com/fbvims" target="_blank"
          ><i class="fa-brands fa-facebook"
        /></a>
        <a href="https://twitter.com/VIMS_News" target="_blank"
          ><i class="fa-brands fa-twitter"></i
        ></a>
        <a
          href="https://www.linkedin.com/school/virginia-institute-of-marine-science/"
          target="_blank"
        >
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://www.youtube.com/@VAInstituteofMarineScience"
          target="_blank"
        >
          <i class="fa-brands fa-youtube"></i>
        </a>
      </div>
    </div>-->

    <div class="row q-mt-xl">
      <div class="col text-center footer-links">
        <a href="/about">ABOUT</a>
        <a href="/contact">CONTACT</a>
        <a href="/resources">RESOURCES</a>
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col text-center text-white">
        All Rights Reserved - Chesapeake Monitoring Cooperative
      </div>
    </div>
  </div>
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

.footer-container {
  background-color: $vims-medium-blue;
}

.sponsor-container {
  margin-left: -50px;
  display: flex;
  gap: 80px;
  justify-content: center;
}

.social-container {
  display: flex;
  gap: 10px;
  justify-content: center;

  i {
    color: white;
    width: 36px;
    border: 1px solid $vims-dark-blue;
    border-radius: 4px;
    padding: 10px;
  }

  i:hover {
    opacity: 0.6;
  }
}

.footer-links {
  display: flex;
  gap: 40px;
  justify-content: center;

  a {
    color: white;
    text-decoration: none;
    font-size: medium;
  }
}
</style>
