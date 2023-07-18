<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-lg">
    <q-page-container class="q-pt-none">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import MapBox from "components/MapBox.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    // MapBox,
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
