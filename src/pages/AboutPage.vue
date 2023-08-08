<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-xl">
      <div class="col about-header">
        Working together to understand the health of our waters
      </div>
    </div>

    <div class="row q-my-lg q-pa-md justify-center">
      <iframe width="800" height="400"
              src="https://www.youtube.com/embed/7oWA6sWWnAM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
      </iframe>
    </div>

    <div class="row">
      <div class="col q-mt-lg about-text">
        <p>
          The Chesapeake Monitoring Cooperative (CMC) is a group of leading
          organizations that provide technical, programmatic, and outreach
          support in order to integrate volunteer-based and non-traditional
          water quality and benthic macroinvertebrate monitoring data monitoring
          data into the Chesapeake Bay Program partnership. Currently there are
          many sources of data, including data collected by volunteers, local
          governments and NGOs, that are not being used to track Bay health.
          Data contribution by this network of volunteer and non-traditional
          sources will provide valuable information and create a comprehensive
          understanding of the Chesapeake Bay watershed, the health of the bay,
          and the success of restoration efforts.
        </p>

        <p>
          The EPA’s Chesapeake Bay Program (CBP) requested and funded the
          development of The Chesapeake Data Explorer. Green Fin Studios and the
          Environmental Data Center at the Chesapeake Bay National Estuaring
          Research Reserve - Va, Virginia Institute of Marine Science (VIMS)
          developed and continues to manage the Chesapeake Data Explorer.
        </p>

        <p>
          The CMC membership includes: The Alliance for the Chesapeake Bay,
          Izaac Walton League, Dickinson College’s Alliance for Aquatic Resource
          Monitoring, the University of Maryland Center for Environmental
          Science, Green Fin Studios and the Virginia Institute of Marine
          Science (VIMS).
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
              class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
            >
              <q-img
                style="max-width: 240px"
                class="rounded-borders col-6"
                src="images/sponsors/alliance.png"
              />
              <q-img
                style="max-width: 160px"
                class="rounded-borders col-6 q-mx-md"
                src="images/sponsors/iwl.png"
              />
              <q-img
                style="max-width: 160px"
                class="rounded-borders col-6 q-mx-md"
                src="images/sponsors/allarm.png"
              />
              <q-img
                style="max-width: 240px"
                class="rounded-borders col-6"
                src="images/sponsors/umces.png"
              />
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
            >
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-6"
                src="images/sponsors/CBNERR_Logo_Blue.jpg"
              />
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-6 q-mx-md"
                src="images/sponsors/GreenFin.png"
              />
              <q-img
                style="max-width: 280px"
                class="rounded-borders col-6"
                src="images/sponsors/VIMS-Full-color_logo.jpg"
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

