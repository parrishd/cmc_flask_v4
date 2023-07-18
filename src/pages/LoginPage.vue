<template>
  <q-page class="q-pa-xl">
    <div class="background-image" />
    <q-card style="max-width: 480px" class="q-mx-auto q-pb-lg q-mt-xl">
      <q-card-section class="text-center">
        <q-img src="images/cmc-data-exp-logo.png" style="max-width: 300px" />
      </q-card-section>

      <q-card-section>
        <div class="q-px-xl">
          <q-input v-model="email" label="Email" />
        </div>
        <div class="q-px-xl q-mt-lg">
          <q-input v-model="password" label="Password" />
        </div>
        <div class="q-px-xl q-mt-xl">
          <q-btn label="Login" style="width: 100%" color="primary" />
        </div>
        <div class="q-px-xl q-mt-lg text-center">
          <a href="/forgot-password" class="forgot-password-text">
            Forgot Password?
          </a>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-center sign-up-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
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
// local/use variables here

/****************************
 * Ref/UI Variables
 ***************************/
const email = ref("");
const password = ref("");

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

//.page-background {
//  //background-image: url("images/login-bg.webp");
//  //background-size: cover;
//  //background-position: center;
//}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/login-bg.webp");
  background-size: cover;
  background-position: center;
  opacity: 0.25; /* Adjust the desired opacity value */
  z-index: -1;
}

.forgot-password-text {
  text-decoration: none;
  color: $vims-medium-blue;
}

.sign-up-text {
  color: $vims-light-gray;

  a {
    color: $vims-light-gray;
  }
}
</style>
