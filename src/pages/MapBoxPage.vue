<template>
  <q-card class="q-pa-lg" style="min-width: 600px; min-height: 600px">
    <MapBox />
  </q-card>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import MapBox from "components/MapBox.vue";

export default defineComponent({
  name: "MapBoxPage",
  components: {
    MapBox,
  },
});
</script>

<style scoped></style>
