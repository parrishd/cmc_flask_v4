<template>
  <q-page class="q-px-xl q-mx-xl">
    <div class="row justify-center">
      <div class="col q-mt-xl column q-gutter-md items-center">
        <div class="edit-profile-title">
          Edit Profile
        </div>
        <div class="column items-center profile-directions">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <q-img
          style="width: 250px"
          src="images/VIMSProfileHeadshot.png"
          fit="contain"
        />

        <div class="q-py-xl column items-center photo-upload">
          <p class="q-mb-lg photo-upload-text">Upload a different photo</p>
          <q-uploader
            color="primary"
            style="max-width: 300px"
          />
          <div class="row q-mt-xl">
            <div class="col text-center">
              <q-btn
                style="width: 265px; height: 60px; background-color: #4B4545"
                class="q-mr-md cancel-image-btn"
                label="Cancel"
                text-color="white"
                @click="cancelImageButtonClick"
              />
              <q-btn
                style="width: 265px; height: 60px; background-color: #8AAAE5"
                class="q-ml-md save-image-btn"
                label="Save"
                text-color="white"
                @click="saveImageButtonClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Account Settings Section-->
    <div class="row justify-center account-setting-form">
      <div class="column items-center">
        <div class="edit-profile-title">
          Account Settings
        </div>
        <div class="column items-center profile-directions">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
    <AccountSettingsForm />
  </q-page>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
// all component imports here
import AccountSettingsForm from "components/AccountSettingsForm.vue";

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
function saveImageButtonClick() {
  console.log('save image button click');
};

function cancelImageButtonClick() {
  console.log('cancel image button click');
};

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>


<style lang="scss" scoped>
@import "src/css/app.scss";

.edit-profile-title {
  color: $vims-medium-blue;
  font-size: 3.75em;
  font-weight: 900;
}

.photo-upload-text {
  font-size: 1.375em;
}

.account-setting-form {
  width: 100%;
}
</style>
