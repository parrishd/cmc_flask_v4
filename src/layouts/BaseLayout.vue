<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-lg">

    <q-card class="q-pa-lg" style="min-width: 1200px; min-height: 600px;">
      <MapBox/>
    </q-card>

        <q-page-container>
          <router-view />
        </q-page-container>

  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import MapBox from "components/MapBox.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    MapBox,
  },

  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
