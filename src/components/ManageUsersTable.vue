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

          <q-btn color="primary" @click="bulkFileUpload" no-caps>
            <q-icon class="fa-regular fa-circle-arrow-up" size="14px"/>
            <span class="q-ml-sm">Bulk File</span>
          </q-btn>

          <q-btn class="q-ml-sm" color="primary" @click="downloadTable" no-caps>
            <q-icon class="fa-solid fa-arrow-down-to-bracket" size="14px"/>
            <span class="q-ml-sm">Download Users</span>
          </q-btn>
        </div>
      </template>

      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <q-btn color="primary" @click="goToDetails(props.row.id)" no-caps>
            <q-icon class="fa-solid fa-list" size="14px"/>
            <span class="q-ml-sm">View Details / Edit</span>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-isRegistered="props">
        <q-td :props="props">
          <q-btn v-if="props.row.isRegistered" color="green" @click="retireUser(props.row.id)" no-caps>
            <q-icon class="fa-solid fa-ban" size="14px"/>
            <span class="q-ml-sm">Retire User</span>
          </q-btn>

          <q-btn v-else style="background-color: #4B4545" text-color="white" @click="registerUser(props.row)" no-caps>
            <q-icon class="fa-solid fa-plus" size="14px"/>
            <span class="q-ml-sm">Register</span>
          </q-btn>


        </q-td>
      </template>

    </q-table>
    <q-dialog v-model="dialog" presistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </q-card-section>

        <div class="q-pa-lg">
          <q-card-section>
            <div class="text-h5 text-center text-bold q-mb-lg register-popup-header">
              Are you sure you want to register?
            </div>

            <div class="q-mb-md">
              <span class="text-bold">User:</span> {{selectedUser.firstName}} {{selectedUser.lastName}}
            </div>

            <div class="q-mb-lg no-wrap">
              Please enter an Email for this user. An email will be sent to begin their registration process
              and allow the user to reset the password for this account. After resetting the password,
              the user will be able to login.
            </div>

            <q-input v-model="registrationEmail" label="Email" outlined />

              <div class="text-subtitle1 text-bold q-mt-lg q-mb-xs">Role</div>

              <div class="row items-center q-pa-md">
                <q-toggle v-model="registrationMonitorInput"/>
                <div class="text-subtitle1 text-bold">Monitor</div>
                <q-toggle v-model="registrationCoordinatorInput" class="q-ml-md"/>
                <div class="text-subtitle1 text-bold">Coordinator</div>
              </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              style="width: 225px; height: 60px; background-color: #4B4545"
              class="q-mr-md"
              text-color="white"
              label="Cancel"
              v-close-popup
            />
            <q-btn
              label="Register"
              class="q-ml-md"
              style="width: 225px; height: 60px; background-color: #8AAAE5"
              text-color="white"
              @click="registerUserSubmit(selectedUser, registrationEmail)" />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </div>
  <input
    ref="fileInputRef"
    type="file"
    style="display: none"
    @change="handleFileChange"
  />
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
  { name: 'isRegistered', label: 'Status', field: 'isRegistered', align: 'left' }
]

const rows = [
  {
    id: 1,
    firstName: 'Bruce',
    lastName: 'Wayne',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 2,
    firstName: 'Kristin',
    lastName: 'Wells',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Parker',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 4,
    firstName: 'Selina',
    lastName: 'Kyle',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 5,
    firstName: 'Bruce',
    lastName: 'Banner',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 6,
    firstName: 'Clark',
    lastName: 'Kent',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 7,
    firstName: 'Tony',
    lastName: 'Stark',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 8,
    firstName: 'James',
    lastName: 'Howlett',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 9,
    firstName: 'Bobby',
    lastName: 'Drake',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: true
  },
  {
    id: 10,
    firstName: 'Stephen',
    lastName: 'Strange',
    role: 'Monitor',
    state: 'VA',
    group: 'Virginia Institute of Marine Science',
    details: '',
    isRegistered: false
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
let searchQuery = ref('');
let dialog = ref(false);
let selectedUser = ref({});
let registrationEmail = ref('');
let registrationMonitorInput = ref(false);
let registrationCoordinatorInput = ref(false);
const fileInputRef = ref(null);
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

function handleFileChange() {
  const selectedFile = event.target.files[0];
  console.log("Selected File:", selectedFile);
}
const goToDetails = (id) => {
  console.log(`Navigate to details of user with id: ${id}`);
}

const retireUser = (id) => {
  console.log(`Retire user with id: ${id}`);
}

const registerUser = (user) => {
  console.log(`Register user with id: ${user.firstName}`);
  selectedUser.value = user
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

const registerUserSubmit = (selectedUser, registrationEmail) => {
  console.log(`${selectedUser.firstName} has been registered and an email has been sent to ${registrationEmail}`);
  dialog.value = false
}

const searchUsers = (searchQuery) => {
  console.log(`Search users for: ${searchQuery}`);
}

function bulkFileUpload() {
  console.log('Bulk file button click');
  fileInputRef.value.click();
}

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
@import "src/css/app.scss";

.register-popup-header {
  color: $vims-medium-blue;
}
</style>
