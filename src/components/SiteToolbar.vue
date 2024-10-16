<template>
  <q-toolbar class="header-height bg-white text-dark-blue">
    <q-toolbar-title>
      <div class="row q-px-xl q-mx-xl full-height">
        <div class="col-2 q-my-auto">
          <a href="/">
            <q-img
              src="/logo.png"
              loading="lazy"
              spinner-color="primary"
              height="45px"
              style="max-width: 250px"
              fit="contain"
            />
          </a>

          <!--          <img src="/logo.png" class="header-logo" alt="CMC Logo" />-->
        </div>
        <div class="col q-px-md nav-links">
          <a href="/about">ABOUT</a>
          <a href="/resources">RESOURCES</a>
          <a href="/contact">CONTACT</a>
          <a href="/data-ethics">DATA ETHICS</a>
          <a href="/admin">MANAGE DATA</a>

          <q-btn-dropdown
            v-if="loggedIn"
            stretch
            flat
            label="ADMIN"
            color="primary"
            style="font-weight: normal; font-size: medium"
          >
            <div class="q-pa-md" style="width: 350px">
              <q-list separator>
                <q-expansion-item
                  expand-separator
                  label="Data"
                  href="/data-toolset"
                >
                  <q-list separator>
                    <q-item clickable href="/data-upload-water-quality">
                      <q-item-section>Upload Water Quality</q-item-section>
                    </q-item>

                    <q-item clickable href="/data-upload-review-water-quality">
                      <q-item-section
                        >Edit & Review Water Quality</q-item-section
                      >
                    </q-item>

                    <q-item clickable href="/data-upload-macroinvertebrates">
                      <q-item-section>Upload Macroinvertebrates</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      href="/data-upload-review-macroinvertebrates"
                    >
                      <q-item-section
                        >Edit & Review Macroinvertebrates</q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  label="Manage"
                  href="/manage"
                >
                  <q-list separator>
                    <q-item clickable href="/manage-users">
                      <q-item-section>Manage Users</q-item-section>
                    </q-item>

                    <q-item clickable href="/manage-groups">
                      <q-item-section>Manage Groups</q-item-section>
                    </q-item>

                    <q-item clickable href="/manage-stations">
                      <q-item-section>Manage Stations</q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>

                <!--                <q-expansion-item-->
                <!--                    expand-separator-->
                <!--                    label="Resources"-->
                <!--                >-->
                <!--                  <q-card>-->
                <!--                    <q-card-section>-->
                <!--                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti-->
                <!--                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste-->
                <!--                      eveniet doloribus ullam aliquid.-->
                <!--                    </q-card-section>-->
                <!--                  </q-card>-->
                <!--                </q-expansion-item>-->
              </q-list>
            </div>
          </q-btn-dropdown>
          <!--          <a v-if="loggedIn" href="/data-toolset">DATA</a>-->
          <!--          <a v-if="loggedIn" href="/profile">PROFILE</a>-->
          <!--          <a v-if="loggedIn" href="/manage">MANAGE</a>-->
          <!--          <a v-if="loggedIn" href="/admin">ADMIN</a>-->
        </div>
        <div v-if="loggedIn" class="col-5 flex justify-end">
          <q-btn
            class="q-mr-sm action-button"
            color="primary"
            label="REGISTER"
            @click="registerButtonClick"
            outline
          />
          <q-btn
            class="action-button"
            color="primary"
            label="LOGIN"
            @click="loginButtonClick"
            outline
          />
        </div>
        <div v-if="loggedIn" class="col-2 flex justify-end">
          <q-btn
            color="primary"
            icon="fa-solid fa-user"
            size="md"
            class="q-px-none q-my-auto"
            round
            outline
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item href="/profile" clickable v-close-popup>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item @click="logoutButtonClick" clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "stores/user";

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
const _router = useRouter();
const _userStore = useUserStore();

/****************************
 * Ref/UI Variables
 ***************************/
// ref/ui variables here

/****************************
 * Computed Properties
 ***************************/
const loggedIn = computed(() => {
  return _userStore.authenticated;
  // return true;
});

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
function loginButtonClick() {
  _router.push({ name: "login" });
}

function registerButtonClick() {
  _router.push({ name: "register" });
}

function logoutButtonClick() {
  console.log("logout button click");
  _userStore.deAuthenticate();
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.header-height {
  height: 80px;
}

.header-logo {
  height: 60px;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    color: $vims-medium-blue;
    text-decoration: none;
    font-size: medium;
  }
}

.action-button-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
}
.action-button {
  width: 150px;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
