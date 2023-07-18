<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="">
        <div class="text-h6 q-px-md">Terms and Conditions</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-scroll-area style="height: 460px; width: 460px" class="q-px-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
          omnis vel numquam exercitationem aut, natus minima, porro labore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
          omnis vel numquam exercitationem aut, natus minima, porro labore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
          omnis vel numquam exercitationem aut, natus minima, porro labore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore.
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="q-px-lg q-py-none q-mb-md text-right">
        <q-btn flat label="OK" color="primary" @click="okButtonClick" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
/*****************************
 * Imports
 ****************************/
import { ref, watch } from "vue";

/*****************************
 * Lazy/Async components
 ****************************/
// lazy loaded components/imports here

/****************************
 * Emit Definitions
 ***************************/
const emit = defineEmits(["close"]);

/****************************
 * Component Props
 ***************************/
const props = defineProps({
  open: Boolean,
});

/****************************
 * Local/'Use' Variables
 ***************************/
// local/use variables here

/****************************
 * Ref/UI Variables
 ***************************/
const dialog = ref(false);

/****************************
 * Computed Properties
 ***************************/
// computed properties here

/***************************
 * Watched properties
 **************************/
watch(
  () => props.open,
  () => {
    dialog.value = props.open;
  }
);

/****************************
 * Exposed/Interface Functions
 ***************************/
// exposed/interface functions here

/****************************
 * UI Functions
 ***************************/
function okButtonClick() {
  emit("close");
}

/****************************
 * View Lifecycle Methods
 ***************************/
// view lifecycle methods here
</script>

<style lang="scss" scoped></style>
