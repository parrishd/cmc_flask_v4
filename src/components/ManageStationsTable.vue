<template>
  <div>
    <q-table
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-bottom
    >
      <template v-slot:body-cell-editAction="props">
        <q-td :props="props">
          <q-btn color="primary" @click="editDetails(props.row.id)">
            <q-icon class="fa-solid fa-pen-to-square" size="14px"/>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-isActive="props">
        <q-td :props="props">
          <q-btn v-if="props.row.isActive" color="red" @click="deActivateUser(props.row.stationName)" no-caps>
            <q-icon class="fa-solid fa-ban" size="14px"/>
            <span class="q-ml-sm">De-Activate User</span>
          </q-btn>

          <q-btn v-else color="primary" text-color="white" @click="activateUser(props.row.stationName)" no-caps>
            <q-icon class="fa-solid fa-plus" size="14px"/>
            <span class="q-ml-sm">Activate User</span>
          </q-btn>
        </q-td>
      </template>

    </q-table>
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
  { name: 'stationName', label: 'Name', field: 'stationName', align: 'left' },
  { name: 'groupNames', label: 'Group Name(s)', field: 'groupNames', align: 'left' },
  { name: 'latitude', label: 'Latitude', field: 'latitude', align: 'left' },
  { name: 'longitude', label: 'Longitude', field: 'longitude', align: 'left' },
  { name: 'editAction', field: 'edit', align: 'left' },
  { name: 'isActive', field: 'isActive', align: 'left' },
]

const rows = [
  {
    stationName: '35',
    groupNames: 'Virginia Institute of Marine Science',
    latitude: '37.52',
    longitude: '-77.47',
    editAction: '',
    isActive: false
  },
  {
    stationName: '35',
    groupNames: 'Virginia Institute of Marine Science',
    latitude: '37.52',
    longitude: '-77.47',
    editAction: '',
    isActive: true
  },
  {
    stationName: '35',
    groupNames: 'Virginia Institute of Marine Science',
    latitude: '37.52',
    longitude: '-77.47',
    editAction: '',
    isActive: true
  },
  {
    stationName: '35',
    groupNames: 'Virginia Institute of Marine Science',
    latitude: '37.52',
    longitude: '-77.47',
    editAction: '',
    isActive: false
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
const editDetails = (stationName) => {
  console.log(`edit details for station: ${stationName}`);
}
const deActivateUser = (id) => {
  console.log(`De-Activate station: ${stationName}`);
}
const activateUser = (id) => {
  console.log(`Activate station: ${stationName}`);
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped></style>
