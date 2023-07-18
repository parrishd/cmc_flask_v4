<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary">
      <SiteToolbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <site-footer>
      <SiteFooter />
    </site-footer>
  </q-layout>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import SiteToolbar from "components/SiteToolbar.vue";
import SiteFooter from "components/SiteFooter.vue";

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

<style lang="scss" scoped></style>
