<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col q-mt-lg text-center groups-header">Manage Groups</div>
    </div>

    <div class="row">
      <div class="col q-mt-lg text-center groups-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, elit et volutpat elementum.
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="Show All Groups"
          text-color="white"
          @click="showAllButtonClick"
        />
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-ml-md save-image-btn"
          label="Download All Groups"
          text-color="white"
          @click="downloadButtonClick"
        />
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col q-pr-md">
        <q-input v-model="name" label="Name" outlined />
      </div>
      <div class="col q-px-md">
        <q-input v-model="description" label="Description" outlined />
      </div>
      <div class="col q-px-md">
        <q-input v-model="email" label="Email" outlined />
      </div>
      <div class="col q-pl-md">
        <q-input v-model="cmcMembers" label="CMC Members" outlined />
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col text-center">
        <q-btn
          style="width: 265px; height: 60px; background-color: #8AAAE5"
          class="q-mr-md cancel-image-btn"
          label="View Details / Edit"
          text-color="white"
          @click="viewDetailsButtonClick"
        />
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col q-mt-lg text-center groups-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, elit et volutpat elementum.
      </div>

    </div>
    <div class="row q-mt-xl" v-if="showAllGroups">
      <div class="col justify-center">
        <AllGroupsTable />
      </div>
    </div>

    <EditGroupForm v-model="dialog" :visibile="dialog" @update:visibile="val => (dialog = val)" />

  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { ref } from "vue";
import EditGroupForm from "components/EditGroupForm.vue";
import AllGroupsTable from "components/AllGroupsTable.vue";
import {exportFile} from "quasar";

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
const name = ref("");
const description = ref("");
const email = ref("");
const cmcMembers = ref("");
const dialog = ref(false);
const showAllGroups = ref (false);

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
function showAllButtonClick() {
  showAllGroups.value = !showAllGroups.value;
};
function viewDetailsButtonClick() {
  console.log("view details / edit button click.");
  dialog.value = true
};

const columns = [
    { name: "name", label: "All Groups Table Data" },
];
const rows = [
  { name: "group one" },
];

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

const downloadButtonClick = () => {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))].concat(
    rows.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[ col.field === void 0 ? col.name : col.field ],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.groups-header {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

</style>
