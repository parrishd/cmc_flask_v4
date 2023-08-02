<template>
  <div class="q-mt-xl">
    <q-table
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-header
      hide-bottom
    />
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
const columns = [
  { name: 'groupName', field: 'groupName', align: 'left' },
  { name: 'groupDescription', field: 'groupDescription', align: 'left' },
  { name: 'groupEmail', field: 'groupEmail', align: 'left' },
  { name: 'cmcMembers', field: 'cmcMembers', align: 'left' },
]

const rows = [
  {
    groupName: 'Alliance for Aquatic Resource Monitoring',
    groupDescription: `Dickinson College's Alliance for Aquatic Resource Monitoring in Carlisle, PA.`,
    groupEmail: 'allarm@dicinson.edu',
    cmcMembers: 'Stephanie Letourneau; Isabel Ruff'
  },
  {
    groupName: 'Alliance for the Chesapeake Bay',
    groupDescription:
      `RiverTrends VA - monthly sampling for air and water temp, dissolved oxygen, pH, water clarity,
      salinity and sometimes bacteria`,
    groupEmail: 'sstern@allianceforthebay.org',
    cmcMembers: 'Monitoring Intern; Sophie Stern'
  },
  {
    groupName: 'Antietam Watershed Association',
    groupDescription: `ALLARM partner group in Waynesboro, PA`,
    groupEmail: 'letourns@dickinson.edu',
    cmcMembers: 'Stephanie Letourneau'
  },

]


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
