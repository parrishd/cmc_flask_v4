<template>
  <div class="q-my-lg q-pa-md">
    <q-table
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10]"
      hide-bottom
    >

      <template v-slot:top>
        <div style="display: flex; align-items: center;">
          <q-toolbar-title>Users</q-toolbar-title>

          <q-input outlined v-model="searchQuery" class="q-mx-xl" label="Search Users..." :dense="true">
            <template v-slot:append>
              <q-icon v-if="searchQuery !== ''" name="close" @click="searchQuery = ''" class="cursor-pointer" />
              <q-icon name="search" @click="searchUsers(searchQuery)" class="cursor-pointer"/>
            </template>
          </q-input>

          <q-btn color="primary" @click="bulkFileUpload">
            <q-icon class="fa-regular fa-circle-arrow-up" size="14px"/>
            <span class="q-ml-sm">Bulk File</span>
          </q-btn>

          <q-btn class="q-ml-sm" color="primary" @click="downloadTable">
            <q-icon class="fa-solid fa-arrow-down-to-bracket" size="14px"/>
            <span class="q-ml-sm">Download Users</span>
          </q-btn>
        </div>
      </template>

      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <q-btn color="primary" @click="goToDetails(props.row.id)">
            <q-icon class="fa-solid fa-list" size="14px"/>
            <span class="q-ml-sm">View Details / Edit</span>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-registered="props">
        <q-td :props="props">
          <q-btn v-if="props.row.registered" color="green" @click="retireUser(props.row.id)">
            <q-icon class="fa-solid fa-ban" size="14px"/>
            <span class="q-ml-sm">Retire User</span>
          </q-btn>

          <q-btn v-else color="black" @click="registerUser(props.row.id)">
            <q-icon class="fa-solid fa-plus" size="14px"/>
            <span class="q-ml-sm">Register</span>
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
import { ref } from "vue";
import { exportFile } from 'quasar';

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
  { name: 'firstName', label: 'First Name', field: 'firstName', align: 'left' },
  { name: 'lastName', label: 'Last Name', field: 'lastName', align: 'left' },
  { name: 'role', label: 'Role', field: 'role', align: 'left' },
  { name: 'state', label: 'State', field: 'state', align: 'left' },
  { name: 'group', label: 'Group', field: 'group', align: 'left' },
  { name: 'details', field: 'details', align: 'left' },
  { name: 'registered', label: 'Status', field: 'registered', align: 'left' }
]

const rows = [
  {
    id: 1,
    firstName: 'Bruce',
    lastName: 'Wayne',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 2,
    firstName: 'Kristin',
    lastName: 'Wells',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Parker',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 4,
    firstName: 'Selina',
    lastName: 'Kyle',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 5,
    firstName: 'Bruce',
    lastName: 'Banner',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 6,
    firstName: 'Clark',
    lastName: 'Kent',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 7,
    firstName: 'Tony',
    lastName: 'Stark',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 8,
    firstName: 'James',
    lastName: 'Howlett',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 9,
    firstName: 'Bobby',
    lastName: 'Drake',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: true
  },
  {
    id: 10,
    firstName: 'Stephen',
    lastName: 'Strange',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: 'View Details / Edit',
    registered: false
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
const searchQuery = ref('');

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
const goToDetails = (id) => {
  console.log(`Navigate to details of user with id: ${id}`);
}

const retireUser = (id) => {
  console.log(`Retire user with id: ${id}`);
}

const registerUser = (id) => {
  console.log(`Register user with id: ${id}`);
}

const searchUsers = (searchQuery) => {
  console.log(`Search users for: ${searchQuery}`);
}

function bulkFileUpload() {
  console.log('Bulk file button click');
}

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const downloadTable = () => {
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

</style>
