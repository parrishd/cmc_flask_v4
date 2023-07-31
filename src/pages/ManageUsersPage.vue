<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center users-header">Manage Users</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg text-subtitle1">
        On this page you can manage the individuals that belong to the Virginia
        Institute of Marine Science monitoring group. You can search for a
        particular individual by using the "Filter" box at the top of the table.
        Click "View Details/Edit" to edith the information for an individual. If
        you need to Retire an individual, click "Retire User". Use the "Bulk
        File" button to upload a large number of users to your group. A template
        for the file can be downloaded <a href="#">here</a>.

      </div>
    </div>

    <ManageUsersTable />
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import ManageUsersTable from "components/ManageUsersTable.vue";

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

.users-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}
</style>
