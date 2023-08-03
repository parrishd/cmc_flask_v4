<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center manage-header">Manage Toolset</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg manage-text">
        The manage toolset equips users with the tools to manage the supporting information for their monitoring
        programs. The manage toolset includes a tool to manage group information, including the parameters each group
        collects. Here, users can also manage their group members' information, including activation of new users.
        Users can also create and manage information about the stations where their group collects water quality
        information.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Manage Users"
          text-color="white"
          @click="manageUsersButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Manage Groups"
          text-color="white"
          @click="manageGroupsButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Manage Stations"
          text-color="white"
          @click="manageStationsButtonClick"
        />
      </div>
    </div>

  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { useRouter } from "vue-router";

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
const _router = useRouter();

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
function manageUsersButtonClick() {
  _router.push({ name: "manageUsers" });
}

function manageGroupsButtonClick() {
  _router.push({ name: "manageGroups" })
}

function manageStationsButtonClick() {
  _router.push({ name: "manageStations" })
}
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
