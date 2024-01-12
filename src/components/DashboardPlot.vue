<template>
  <div class="plot-container">
    <div class="row q-mt-lg">
      <div class="col-4">
        <q-select
          label-color="primary"
          label="Parameters (pick all that apply)"
          v-model="selectedParamPlot"
          :options="paramOptionsPlot"
          outlined
          dense
        ></q-select>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12">
        <div id="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, toRefs } from "vue";
import Plotly from "plotly.js-dist";

const trace1 = {
  x: [
    "2013-10-04 22:23:00",
    "2013-11-04 22:23:00",
    "2013-12-04 22:23:00",
    "2014-01-04 22:23:00",
    "2014-02-04 22:23:00",
    "2014-03-04 22:23:00",
    "2014-04-04 22:23:00",
    "2014-05-04 22:23:00",
    "2014-06-04 22:23:00",
    "2014-07-04 22:23:00",
    "2014-08-04 22:23:00",
    "2014-09-04 22:23:00",
  ],
  y: [23.6, 30.7, 19.6, 20.7, 26.6, 23.7, 34.6, 30.7, 24.6, 20.7, 14.6, 10.7],
  type: "scatter",
};

const data = [trace1];
const selectedParamPlot = ref("WT.1");
const paramOptionsPlot = ref(["WT.1", "PH.1", "DO.1"]);
onMounted(() => {
  var layout = {
    yaxis: {
      title: {
        text: "Water Temperature (Celsius)",

        font: {
          size: 20,
        },
      },
      tickfont: {
        size: 16, // Set the desired size for x-axis tick values
      },
    },
    xaxis: {
      tickfont: {
        size: 16, // Set the desired size for x-axis tick values
      },
    },
    margin: {
      l: 70,
      r: 0,
      b: 50,
      t: 15,
      pad: 4,
    },
  };
  Plotly.newPlot("chart", data, layout);
  //Plotly.plot("chart", data);
});
</script>

<style scoped>
.plot-container {
  position: relative;
}

.plot {
  height: 400px;
}
</style>
