<template>
  <div class="plot-container">
    <div class="row q-mt-lg">
      <div class="col-4">
        <q-select
          label-color="primary"
          label="Parameters (pick all that apply)"
          v-model="selectedParamPlot"
          :options="paramOptionsPlot"
          option-value="value"
          option-label="name"
          outlined
          dense
        ></q-select>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12">
        <div :id="`chart-${plotIndex}`" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, toRefs } from "vue";
import Plotly, { filterObject, get } from "plotly.js-dist";
import { data } from "autoprefixer";

const props = defineProps(["plotData", "plotIndex", "paramType", "dataType"]);
const { plotData } = toRefs(props);
const { plotIndex } = toRefs(props);
const { paramType } = toRefs(props);
const { dataType } = toRefs(props);

//const trace1 = ref([]);
const selectedParamPlot = ref([]);
const paramOptionsPlot = ref([]);

watch(
  () => plotData.value,
  (newVal, oldVal) => {
    console.log("plotData", newVal);
    getUniqueParams(newVal);
  }
);

// Get unique parameter code values from the plotData object. Set unique parameter code as options for the select dropdown. Ther
// should only be one instance of each parameter code in the new object. selectedParamPlot as the first parameter code in the options array.
const getUniqueParams = (data) => {
  if (data.length === 0) {
    return;
  }
  console.log("getUniqueParams", data);
  console.log("dataType", dataType.value);

  if (dataType.value === "Benthic Macroinvertebrates") {
    paramOptionsPlot.value = [
      { value: "speciesCount", name: "Number of Species", units: "N/A" },
      { value: "totalCount", name: "Total Count", units: "N/A" },
    ];
    selectedParamPlot.value = paramOptionsPlot.value[0];
    return;
  }
  console.log("getUniqueParams", data);
  let uniqueParams = []; //loop throught the data and get the unique parameter (code,name,units) values
  console.log("paramType", paramType.value);
  if (paramType.value == "Depth") {
    uniqueParams = data
      .map((sample) => {
        return {
          value: sample.parameterCode,
          name: sample.parameterName,
          units: sample.parameterUnits,
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex((t) => t.value === value.value) === index
      );
  } else {
    uniqueParams = data
      .map((sample) => {
        return {
          value: sample.depth,
          name: sample.depth,
          units: "m",
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex((t) => t.value === value.value) === index
      );
  }
  console.log("uniqueParams", uniqueParams);
  paramOptionsPlot.value = uniqueParams;
  selectedParamPlot.value = uniqueParams[0];
};

watch(
  () => selectedParamPlot.value,
  (newVal, oldVal) => {
    console.log("selectedParamPlot", newVal);
    filterSamples(newVal);
  }
);
watch(
  () => plotIndex.value,
  (newVal, oldVal) => {
    console.log("plotIndex", newVal);
    filterSamples(selectedParamPlot.value);
  }
);

const filterSamples = (param) => {
  let trace = {};
  if (typeof param === "undefined") {
    return;
  }
  if (dataType.value === "Benthic Macroinvertebrates") {
    let y = [];
    if (param.value == "speciesCount") {
      y = plotData.value.map((sample) => sample.speciesCount);
    } else {
      y = plotData.value.map((sample) => sample.totalCount);
    }
    console.log("y", y);
    console.log("plotData.value", plotData.value);
    trace = {
      x: plotData.value.map((sample) =>
        // format the sample.DateTime as "yyyy-MM-dd HH:mm"
        new Date(sample.sampleDate).toISOString().slice(0, 16)
      ),
      y: y,
      type: "scatter",
    };
    //order trace by x
    //trace.x.sort();
    updatePlot(trace, param);
    return;
  }
  console.log("filterSamples", param);
  if (typeof param === "undefined") {
    return;
  }
  let filteredData = [];
  if (paramType.value === "Depth") {
    filteredData = plotData.value.filter(
      (sample) => sample.parameterCode === param.value
    );
  } else {
    filteredData = plotData.value.filter(
      (sample) => sample.depth === param.value
    );
  }
  console.log("filteredData", filteredData);
  trace = {
    x: filteredData.map((sample) =>
      // format the sample.DateTime as "yyyy-MM-dd HH:mm"
      new Date(sample.dateTime).toISOString().slice(0, 16)
    ),
    y: filteredData.map((sample) => sample.value),
    type: "scatter",
  };
  //order trace by x
  //trace.x.sort();
  updatePlot(trace, param);
};

const updatePlot = (trace, param) => {
  if (trace.x.length === 0) {
    return;
  }
  if (typeof param === "undefined") {
    return;
  }
  console.log("updatePlot");
  let ylab = param.name + " (" + param.units + ")";
  if (dataType.value === "Benthic Macroinvertebrates") {
    ylab = param.name;
  }

  const layout = {
    yaxis: {
      title: {
        text: param.name + " (" + param.units + ")",

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
  Plotly.newPlot("chart-" + plotIndex.value, [trace], layout);
};

onMounted(() => {
  console.log("onMounted");
  getUniqueParams(plotData.value);
  filterSamples(selectedParamPlot.value);
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
