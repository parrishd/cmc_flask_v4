<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row  justify-center">
      <div class="col-4 q-my-xl column q-gutter-md items-center">
          <div class="user-title">
            Jennifer Eldridge
          </div>
          <div class="column items-center profile-info">
            <p class="q-mb-none">Last Login: 7.13.23</p>
            <p>Member Since: 12.23.20</p>
          </div>

          <q-img
            style="width: 250px"
            src="images/VIMSProfileHeadshot.png"
            fit="contain"
          />

          <div class="q-py-xl profile-table">
            <!--todo: should the table be made into a component?-->
            <q-table
              flat bordered
              :rows="rows"
              :columns="columns"
              row-key="name"
              :separator="'vertical'"
              :rows-per-page-options="[10]"
              hide-header
              hide-bottom
            >
              <template v-slot:body-cell-propertyName="props">
                <q-td :props="props" class="bold-font">
                  {{ props.row.propertyName }}
                </q-td>
              </template>
              <template v-slot:body-cell-propertyValue="props">
                <q-td :props="props">
                  {{ props.row.propertyValue }}
                </q-td>
              </template>
            </q-table>
          </div>
          <div class="row q-my-md">
            <div class="col text-center">
              <q-btn label="Edit Profile" color="primary" style="width: 265px; height: 60px" @click="editProfileButtonClick"/>
            </div>
          </div>
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
const columns = [
  {
    field: 'propertyName',
    name: 'propertyName',
    align: 'left'
  },
  {
    field: 'propertyValue',
    name: 'propertyValue',
    align: 'left'
  }
];

const rows = [
  {
    propertyName: 'User Name',
    propertyValue: 'jennifer@v4development.com'
  },
  {
    propertyName: 'First Name',
    propertyValue: 'Jennifer'
  },
  {
    propertyName: 'Last Name',
    propertyValue: 'Eldridge'
  },
  {
    propertyName: 'Role',
    propertyValue: 'Coordinator'
  },
  {
    propertyName: 'Group',
    propertyValue: 'Virginia Institute of Marine Science'
  },
  {
    propertyName: 'Volunteer Hours',
    propertyValue: '1.000000000'
  },
  {
    propertyName: 'Cell Phone',
    propertyValue: '1.888.888.8888'
  },
  {
    propertyName: 'Home Phone',
    propertyValue: '1.888.888.8888'
  },
  {
    propertyName: 'Emergency Phone',
    propertyValue: '1.888.888.8888'
  },
  {
    propertyName: 'Address',
    propertyValue: '123 Test St. Richmond, VA 23223'
  },
]

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
function editProfileButtonClick() {
  _router.push({ name: "editProfile" });
}


/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.user-title {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.clickable-avatar {
  cursor: pointer;
}

.profile-table {
  td {
    font-size: 1.25em;
  }

  .bold-font {
    font-weight: 900;
  }
}

</style>
