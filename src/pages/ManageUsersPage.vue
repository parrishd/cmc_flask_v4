<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row q-mt-lg">
      <div class="col text-center users-header">Manage Users</div>
    </div>

    <div class="row q-mt-md">
      <div class="col text-subtitle1">
        On this page you can manage the individuals that belong to the Virginia
        Institute of Marine Science monitoring group. You can search for a
        particular individual by using the "Filter" box at the top of the table.
        Click "View Details/Edit" to edith the information for an individual. If
        you need to Retire an individual, click "Retire User". Use the "Bulk
        File" button to upload a large number of users to your group. A template
        for the file can be downloaded <a href="#">here</a>.
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input label="Search Users" outlined dense>
          <template v-slot:append>
            <q-icon
              name="fa-solid fa-search"
              size=".75em"
              @click="searchClick"
            />
          </template>
        </q-input>
      </div>
      <div class="col text-right">
        <q-btn color="primary" class="q-mr-md q-py-sm" no-caps>
          <q-icon left size="1.25em" name="fa-solid fa-upload" />
          <div>Bulk File</div>
        </q-btn>
        <q-btn color="primary" class="q-mr-md q-py-sm" no-caps>
          <q-icon left size="1.25em" name="fa-solid fa-download" />
          <div>Download Users</div>
        </q-btn>
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-table :rows="rows" :columns="columns" row-key="id" flat bordered>
          <template v-slot:body-cell-view_action="props">
            <q-td :props="props">
              <q-btn color="primary" no-caps>
                <q-icon left size="1.25em" name="fa-solid fa-user-pen" />
                <div>View Details/Edit</div>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-status_action="props">
            <q-td :props="props">
              <q-btn color="negative" no-caps>
                <q-icon left size="1.25em" name="fa-solid fa-ban" />
                <div>Retire User</div>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
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
const columns = [
  {
    name: "first_name",
    required: true,
    label: "First Name",
    align: "left",
    field: "first_name",
    sortable: true,
  },
  {
    name: "last_name",
    align: "left",
    label: "Last Name",
    field: "last_name",
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Role",
    field: "role",
    sortable: true,
  },
  {
    name: "state",
    align: "left",
    label: "State",
    field: "state",
  },
  {
    name: "group",
    align: "left",
    label: "Group",
    field: "group",
  },
  {
    name: "view_action",
    align: "left",
    label: "",
    field: "view_action",
  },
  {
    name: "status_action",
    align: "left",
    label: "Status",
    field: "status_action",
  },
];

const rows = [
  {
    id: 1,
    first_name: "David",
    last_name: "Parrish",
    role: "Coordinator",
    state: "VA",
    group: "Virginia Institute of Marine Science",
    view_action: "",
    status_action: "",
  },
  {
    id: 1,
    first_name: "Gina",
    last_name: "Sawaya",
    role: "Monitor",
    state: "VA",
    group: "James River Association",
    view_action: "",
    status_action: "",
  },
  {
    id: 1,
    first_name: "Rob",
    last_name: "Jarvis",
    role: "Monitor",
    state: "VA",
    group: "VIMS",
    view_action: "",
    status_action: "",
  },
  {
    id: 1,
    first_name: "Cassia",
    last_name: "Pianca",
    role: "Coordinator",
    state: "VA",
    group: "VIMS",
    view_action: "",
    status_action: "",
  },
];

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
function searchClick() {
  console.log("search click");
}

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
