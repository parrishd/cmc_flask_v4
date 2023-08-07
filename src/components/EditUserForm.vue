<template>
  <q-dialog presistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <div class="q-pa-md">
        <q-card-section>
          <div class="text-h4 text-center text-bold q-mb-lg edit-header">
            Edit User: {{ user.firstName }} {{ user.lastName }}
          </div>

          <q-input v-model="email" label="Email" class="q-mb-md" outlined />
          <q-input v-model="firstName" label="First Name" class="q-mb-md" outlined />
          <q-input v-model="lastName" label="Last Name" class="q-mb-md" outlined />
          <div class="row items-center q-mb-md">
            <q-checkbox v-model="monitor" label="Monitor" />
            <q-checkbox v-model="coordinator" label="Coordinator" />
          </div>
          <q-input v-model="code" label="Code" type="textarea" class="q-mb-md" outlined />
          <q-input v-model="cellPhone" label="Cell Phone" class="q-mb-md" outlined />
          <q-input v-model="homePhone" label="Home Phone" class="q-mb-md" outlined />
          <q-input v-model="emergencyPhone" label="Emergency Phone" class="q-mb-md" outlined />
          <q-input v-model="addressFirst" label="Address First" class="q-mb-md" outlined />
          <q-input v-model="addressSecond" label="Address Second" class="q-mb-md" outlined />
          <q-input v-model="city" label="City" class="q-mb-md" outlined />
          <q-select v-model="state" label="State" :options="stateOptions" class="q-mb-md" outlined />
          <q-input v-model="zip" label="Zip" class="q-mb-md" outlined />
          <q-select v-model="group" label="Group" :options="groupOptions" class="q-mb-md" outlined />
          <div class="row items-center q-mb-md">
            <q-date v-model="certificationDate" title="Certification Date" class="q-mb-md" outlined />
          </div>
          <q-checkbox v-model="status" label="Status" class="q-mb-md" />


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
            @click="saveUser" />
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
import { ref, defineProps, defineEmits } from 'vue';

/*****************************
 * Lazy/Async components
 ****************************/
// lazy loaded components/imports here

/****************************
 * Emit Definitions
 ***************************/
// emits defined here
const emit = defineEmits(['update:visible']);

const closeDialog = () => {
  emit('update:visibile', false);
}

/****************************
 * Component Props
 ***************************/
// props defined here
const props = defineProps({
  visibile: Boolean,
  user: Object,
})

/****************************
 * Local/'Use' Variables
 ***************************/
// local/use variables here

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const monitor = ref(false);
const coordinator = ref(false);
const code = ref('');
const cellPhone = ref('');
const homePhone = ref('');
const emergencyPhone = ref('');
const addressFirst = ref('');
const addressSecond = ref('');
const city = ref('');
const state = ref('');
const stateOptions = ['Delaware', 'Maryland', 'Pennsylvania', 'Virginia', 'West Virginia'];
const zip = ref('');
const group = ref('');
const groupOptions = ['Virginia Institute of Marine Science', 'Virginia Save Our Streams', 'ShoreRivers', 'James River Association'];
const certificationDate = ref(null);
const status = ref('');


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
function saveUser() {
  console.log('User details submitted');
  emit('update:visibile', false);
}


/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';

.edit-header {
  color: $vims-medium-blue;
}
</style>
