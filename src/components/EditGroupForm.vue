<template>
  <q-dialog presistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <div class="q-pa-md">
        <q-card-section>
          <div class="text-h4 text-center text-bold q-mb-lg edit-group-header">
            Edit Group
          </div>

          <q-input v-model="groupName" label="Group Name" class="q-mb-md" outlined />
          <q-input v-model="groupCode" label="Group Code" class="q-mb-md" outlined />
          <q-input v-model="contactName" label="Contact Name" class="q-mb-md" outlined />
          <q-input v-model="contactEmail" label="Contact Email" class="q-mb-md" outlined />
          <q-input v-model="contactCellPhone" label="Contact Cell Phone" class="q-mb-md" outlined />
          <q-input v-model="contactOfficePhone" label="Contact Office Phone" class="q-mb-md" outlined />
          <q-input v-model="groupDescription" label="Description" type="textarea" class="q-mb-md" outlined />
          <q-input v-model="groupUrl" label="Group URL" class="q-mb-md" outlined />
          <q-input v-model="addressFirst" label="Address - First Line" class="q-mb-md" outlined />
          <q-input v-model="addressSecond" label="Address - Second Line" class="q-mb-md" outlined />
          <q-input v-model="city" label="City" class="q-mb-md" outlined />
          <q-select v-model="state" label="State" :options="stateOptions" class="q-mb-md" outlined />
          <q-input v-model="zipCode" label="Zip Code" class="q-mb-md" outlined />
          <q-input v-model="dataUseDate" label="Data Use Form Date" class="q-mb-md" outlined />
          <q-select v-model="benthicMethod" label="Benthic Method" :options="benthicOptions" outlined />


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
            label="Save"
            class="q-ml-md"
            style="width: 225px; height: 60px; background-color: #8AAAE5"
            text-color="white"
            @click="saveGroup" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import { ref } from 'vue';

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
const groupName = ref('');
const groupCode = ref('');
const contactName = ref('');
const contactEmail = ref('');
const contactCellPhone = ref('');
const contactOfficePhone = ref('');
const groupDescription = ref('');
const groupUrl = ref('');
const addressFirst = ref('');
const addressSecond = ref('');
const city = ref('');
const state = ref('');
const zipCode = ref('');
const dataUseDate = ref('');
const benthicMethod = ref('');
const stateOptions = ['Delware', 'Maryland', 'Pennsylvania', 'Virginia', 'West Virginia'];
const benthicOptions = ['Izaac Walton League', 'AllARM', 'Tier 2'];


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
function saveGroup() {
  console.log('Group details submitted')
}
function closeDialog() {
  console.log("close edit details button click");
};

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';

.edit-group-header {
  color: $vims-medium-blue;
}
</style>
