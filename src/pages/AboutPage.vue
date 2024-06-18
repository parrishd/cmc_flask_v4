<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-xl">
      <div class="col about-header">About</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg about-text">
        <p>
          The CMC Data Explorer is a tool for storing and sharing data collected
          by the network of water quality and benthic macroinvertebrate
          monitoring programs working with the
          <a href="https://www.chesapeakemonitoringcoop.org" target="_blank"
            >Chesapeake Monitoring Cooperative</a
          >
          The CMC is funded through 6-year cooperative agreements with the EPA’s
          Chesapeake Bay Program (CBP). The first agreement (2015-2021)
          supported the development of the Chesapeake Data Explorer by Green Fin
          Studios and the Environmental Data Center at the Chesapeake Bay
          National Estuarine Research Reserve - Va, Virginia Institute of Marine
          Science (CBNERR-VA/VIMS). The second agreement (2021-2027) supports
          updates and ongoing maintenance by CBNERR-VA/VIMS.
        </p>

        <p>
          All data shared with the CMC Data Explorer are publicly accessible and
          can be downloaded from the homepage map. Data are annually uploaded to
          the Chesapeake Bay Program through their Data Upload and Evaluation
          Tool (DUET) and to the EPA’s Water Quality Exchange (WQX). Data are
          also utilized by State agencies through their data solicitation
          notices.
        </p>

        <p>
          Visit the CMC website for more information about the
          <a
            href="https://www.chesapeakemonitoringcoop.org/about/cmc-team/"
            target="_blank"
            >CMC Team</a
          >
          or
          <a
            href="https://www.chesapeakemonitoringcoop.org/about/members/"
            target="_blank"
            >participating monitoring organizations.</a
          >
        </p>
      </div>
    </div>

    <div class="row q-mt-lg q-mb-xl">
      <div class="col">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          infinite
          height="300px"
          class="rounded-borders"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div
              class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap"
            >
              <q-img
                style="max-width: 240px"
                class="rounded-borders col-3"
                src="images/sponsors/alliance.png"
                loading="lazy"
              />
              <q-img
                style="max-width: 160px"
                class="rounded-borders col-3 q-mx-md"
                src="images/sponsors/iwl.png"
                loading="lazy"
              />
              <q-img
                style="max-width: 160px"
                class="rounded-borders col-3 q-mx-md"
                src="images/sponsors/allarm.png"
                loading="lazy"
              />
              <q-img
                style="max-width: 240px"
                class="rounded-borders col-3"
                src="images/sponsors/umces.png"
                loading="lazy"
              />
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div
              class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap"
            >
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-4"
                src="images/sponsors/CBNERR_Logo_Blue.jpg"
                loading="lazy"
              />
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-6 q-mx-md"
                src="images/sponsors/GreenFin.png"
                loading="lazy"
              />
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-6"
                src="images/sponsors/VIMS-Full-color_logo.jpg"
                loading="lazy"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
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
const slide = ref(1);

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

.about-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.about-text {
  color: $vims-medium-blue;
  font-size: 1.25em;
}

.sponsor-log {
  max-width: 240px !important;
}
</style>
