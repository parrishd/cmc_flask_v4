<template>
  <div class="footer-container q-py-lg">
    <div class="row">
      <div class="col sponsor-container">
        <q-img
          style="width: 180px"
          src="images/sponsors/CBNERR_Logo_Blue.jpg"
          fit="contain"
        />
        <q-img
          style="width: 180px"
          src="images/sponsors/VIMS-Full-color_logo.jpg"
          fit="contain"
        />
        <q-img
          style="width: 180px"
          src="images/sponsors/GreenFin.png"
          fit="contain"
        />
      </div>
    </div>

    <div class="row q-my-lg">
      <div class="col social-container">
        <a href="#"><i class="fa-brands fa-facebook" /></a>
        <a href="#"><i class="fa-brands fa-twitter"></i></a>
        <a href="#"><i class="fa-brands fa-linkedin"></i></a>
        <a href="#"><i class="fa-brands fa-youtube"></i></a>
      </div>
    </div>

    <div class="row">
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
