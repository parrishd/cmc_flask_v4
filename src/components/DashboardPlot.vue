<template>
  <div class="plot-container">
    <div class="row q-mt-lg">
      <div class="col-4" v-show="paramType !== 'Parameter'">
        <q-select
          label-color="primary"
          :label="paramLabel"
          v-model="selectedParamPlot"
          :options="paramOptionsPlot"
          option-value="value"
          option-label="name"
          outlined
          dense
        ></q-select>
      </div>

      <div class="col q-ml-sm" v-show="paramType !== 'Parameter'">
        <q-icon
          class="fa-solid fa-circle-info q-mt-sm"
          size="24px"
          color="primary"
        >
          <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
            <div class="q-pa-md" style="max-width: 360px">
              <div class="tooltip-header">
                {{ selectedParamPlot.name }} Metadata
              </div>
              <div class="q-mt-sm tooltip-text">
                <li>Code: {{ selectedParamPlot.value }}</li>
                <li>Equipment: {{ selectedParamPlot.equipment }}</li>
              </div>
            </div>
          </q-tooltip>
        </q-icon>
      </div>
      <div class="col-4 text-right">
        <q-btn
          color="primary"
          class="full-width"
          icon="fas fa-plus q-mr-sm"
          @click="addParameter"
          v-show="paramType !== 'Parameter'"
        >
          Add Second Parameter to Plot
        </q-btn>
      </div>
    </div>

    <div class="row q-mt-lg" v-show="showSecondParam">
      <div class="col-4">
        <q-select
          label-color="primary"
          :label="paramLabel"
          v-model="selectedParamPlot2"
          :options="paramOptionsPlot"
          option-value="value"
          option-label="name"
          outlined
          dense
        ></q-select>
      </div>
      <div class="col q-ml-sm">
        <q-icon
          class="fa-solid fa-circle-info q-mt-sm"
          size="24px"
          color="primary"
        >
          <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
            <div class="q-pa-md" style="max-width: 360px">
              <div class="tooltip-header">
                {{ selectedParamPlot2.name }} Metadata
              </div>
              <div class="q-mt-sm tooltip-text">
                <li>Code: {{ selectedParamPlot2.value }}</li>
                <li>Equipment: {{ selectedParamPlot2.equipment }}</li>
              </div>
            </div>
          </q-tooltip>
        </q-icon>
      </div>

      <div class="col-4 text-right">
        <q-btn
          color="teal"
          class="full-width"
          icon="fas fa-minus q-mr-md"
          @click="addParameter"
        >
          Remove Parameter from Plot
        </q-btn>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col">
        <q-btn
          color="primary"
          icon="fas fa-download"
          @click="downloadPlot(`chart-${plotIndex}`)"
        >
          <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
            <div class="q-pa-md" style="max-width: 360px">
              <div class="q-mt-sm tooltip-text">Download Plot as Image</div>
            </div>
          </q-tooltip>
          &nbsp; Downlod Plot as Image
        </q-btn>
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
import Plotly, { filterObject, get, plot } from "plotly.js-dist";
import { data } from "autoprefixer";

const props = defineProps(["plotData", "plotIndex", "paramType", "dataType"]);
const { plotData } = toRefs(props);
const { plotIndex } = toRefs(props);
const { paramType } = toRefs(props);
const { dataType } = toRefs(props);

//const trace1 = ref([]);
const selectedParamPlot = ref([]);
const selectedParamPlot2 = ref([]);
const paramOptionsPlot = ref([]);
const paramLabel = ref("Select Parameter(s)");
const showSecondParam = ref(false);

watch(
  () => plotData.value,
  (newVal, oldVal) => {
    console.log("plotData", newVal);
    getUniqueParams(newVal);
  }
);
const downloadPlot = (plot) => {
  Plotly.downloadImage(plot, {
    filename: "cmc-plot",
    format: "png",
    width: 1000,
    height: 400,
  });
};
const addParameter = () => {
  showSecondParam.value = !showSecondParam.value;
  console.log("addParameter", showSecondParam.value);
  console.log("showSecondParam", showSecondParam.value);
  console.log("selectedParamPlot", selectedParamPlot.value);
  console.log("selectedParamPlot", selectedParamPlot2.value);
  filterSamples(selectedParamPlot.value, selectedParamPlot2.value);
};
const removeParameter = () => {
  showSecondParam.value = !showSecondParam.value;
};

// Get unique parameter code values from the plotData object. Set unique parameter code as options for the select dropdown. Ther
// should only be one instance of each parameter code in the new object. selectedParamPlot as the first parameter code in the options array.
const getUniqueParams = (data) => {
  if (data.length === 0) {
    return;
  }

  if (dataType.value === "Benthic Macroinvertebrates") {
    paramOptionsPlot.value = [
      { value: "speciesCount", name: "Number of Species", units: "N/A" },
      { value: "totalCount", name: "Total Count", units: "N/A" },
    ];
    selectedParamPlot.value = paramOptionsPlot.value[0];
    selectedParamPlot2.value = paramOptionsPlot2.value[1];
    return;
  }
  console.log("getUniqueParams", data);
  let uniqueParams = [];
  console.log("paramType", paramType.value);
  if (paramType.value == "Sample Depth") {
    uniqueParams = data
      .map((sample) => {
        return {
          value: sample.parameterCode,
          name: sample.parameterName,
          units: sample.parameterUnits,
          equipment: sample.parameterEquipment,
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex((t) => t.value === value.value) === index
      );
    //create new unique params array. loop through uniqueparams. if name is not in the array, add it to the array with units and value. if name is in the array,
    // concatenate the value to the nalue with a comma separator.
    let uniqueParams2 = [];
    uniqueParams.forEach((param) => {
      if (uniqueParams2.length === 0) {
        uniqueParams2.push(param);
      } else {
        let index = uniqueParams2.findIndex(
          (p) => p.name === param.name && p.units === param.units
        );
        if (index === -1) {
          uniqueParams2.push(param);
        } else {
          uniqueParams2[index].value += ", " + param.value;
          uniqueParams2[index].equipment += ", " + param.equipment;
        }
      }
    });
    console.log("uniqueParams", uniqueParams2);
    uniqueParams = uniqueParams2;
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
  //sort uniqueParams by name
  uniqueParams.sort((a, b) => (a.name > b.name ? 1 : -1));
  paramOptionsPlot.value = uniqueParams;
  selectedParamPlot.value = uniqueParams[0];
  selectedParamPlot2.value = uniqueParams[1];
};

watch(
  () => selectedParamPlot.value,
  (newVal, oldVal) => {
    console.log("selectedParamPlot", newVal);
    if (showSecondParam.value) {
      filterSamples(newVal, selectedParamPlot2.value);
    } else {
      filterSamples(newVal);
    }
  }
);
watch(
  () => selectedParamPlot2.value,
  (newVal, oldVal) => {
    console.log("selectedParamPlot2", newVal);
    filterSamples(selectedParamPlot.value, newVal);
  }
);
watch(
  () => plotIndex.value,
  (newVal, oldVal) => {
    console.log("plotIndex", newVal);
    filterSamples(selectedParamPlot.value);
  }
);
watch(
  () => paramType.value,
  (newVal, oldVal) => {
    console.log("paramType", newVal);
    if (newVal === "Parameter") {
      paramLabel.value = "Select Sample Depth";
    } else {
      paramLabel.value = "Select Parameter(s)";
    }
  }
);

function linearRegression(x, y) {
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_xx += x[i] * x[i];
    sum_yy += y[i] * y[i];
  }

  lr["sl"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  lr["off"] = (sum_y - lr.sl * sum_x) / n;
  lr["r2"] = Math.pow(
    (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
    2
  );

  return lr;
}

const filterSamples = (param, param2) => {
  console.log("filterSamples", param);
  console.log("param", param);
  console.log("param2", param2);
  let trace = {};
  let trace2 = {};
  let fit = {};
  let fit2 = {};
  if (typeof param === "undefined" || param.length === 0) {
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
  let filteredData = [];
  let filteredData2 = [];
  if (paramType.value === "Sample Depth") {
    //console.log("param2", param2);
    if (param2 === "" || typeof param2 === "undefined") {
      console.log("param", param);
      console.log("param.value", param.value);
      let searchArray = param.value.split(",");
      filteredData = plotData.value.filter((sample) =>
        searchArray.includes(sample.parameterCode)
      );
    } else {
      let searchArray = param.value.split(",");
      let searchArray2 = param2.value.split(",");
      filteredData = plotData.value.filter((sample) =>
        searchArray.includes(sample.parameterCode)
      );
      filteredData2 = plotData.value.filter((sample) =>
        searchArray2.includes(sample.parameterCode)
      );
    }
  } else {
    //let searchArray = param.value.split(",");
    console.log("plotData.value", plotData.value);
    filteredData = plotData.value;
    param = {
      value: plotData.value[0].parameterCode,
      name: plotData.value[0].parameterName,
      units: plotData.value[0].parameterUnits,
    };
  }
  let data = [];
  if (filteredData.length > 0) {
    if (paramType.value === "Parameter") {
      //add trace for each unique depth value in filteredData
      console.log("filteredData", filteredData);
      //get unique parameter names from samples as label in object and collapse all parameter codes for that parameter name concatenated by comma as value
      let uniqueDepths = filteredData.reduce((acc, sample) => {
        if (!acc.find((s) => s === sample.depth)) {
          acc.push(sample.depth);
        }
        return acc;
      }, []);

      console.log("uniqueDepths", uniqueDepths);
      //sort uniqueDepths
      uniqueDepths.sort((a, b) => (a > b ? 1 : -1));
      uniqueDepths.forEach((depth) => {
        console.log("depth", depth);
        let depthData = filteredData.filter((sample) => sample.depth === depth);
        console.log("depthData", depthData);
        trace = {
          x: depthData.map((sample) =>
            // format the sample.DateTime as "yyyy-MM-dd HH:mm"
            new Date(sample.dateTime).toISOString().slice(0, 16)
          ),
          y: depthData.map((sample) => sample.value),
          mode: "markers",
          type: "scatter",
          name: depth + " m",
          marker: { size: 12 },
          showlegend: true,
        };
        var x_data_64 = depthData.map((sample) =>
          // format the sample.DateTime as "yyyy-MM-dd HH:mm"
          new Date(sample.dateTime).toISOString().slice(0, 16)
        );
        // convert x_data to integers
        x_data_64 = x_data_64.map((x) => new Date(x).getTime());
        var y_data_64 = trace.y;
        var lr = linearRegression(x_data_64, y_data_64);
        //console.log(lr);
        var fit_from = Math.min(...x_data_64);
        var fit_to = Math.max(...x_data_64);

        fit = {
          x: [fit_from, fit_to],
          y: [fit_from * lr.sl + lr.off, fit_to * lr.sl + lr.off],
          mode: "lines",
          type: "scatter",
          name: param.name + " trend", //"R^2 = ".concat((Math.round(lr.r2 * 10000) / 10000).toString()),
          visible: "legendonly",
        };
        data.push(trace);
        data.push(fit);
      });
      console.log("data", data);
    }
    trace = {
      x: filteredData.map((sample) =>
        // format the sample.DateTime as "yyyy-MM-dd HH:mm"
        new Date(sample.dateTime).toISOString().slice(0, 16)
      ),
      y: filteredData.map((sample) => sample.value),
      mode: "markers",
      type: "scatter",
      name: param.name,
      marker: { size: 12 },
      showlegend: true,
    };
    var x_data_64 = filteredData.map((sample) =>
      // format the sample.DateTime as "yyyy-MM-dd HH:mm"
      new Date(sample.dateTime).toISOString().slice(0, 16)
    );
    // convert x_data to integers
    x_data_64 = x_data_64.map((x) => new Date(x).getTime());
    var y_data_64 = trace.y;
    var lr = linearRegression(x_data_64, y_data_64);
    //console.log(lr);

    var fit_from = Math.min(...x_data_64);
    var fit_to = Math.max(...x_data_64);

    fit = {
      x: [fit_from, fit_to],
      y: [fit_from * lr.sl + lr.off, fit_to * lr.sl + lr.off],
      mode: "lines",
      type: "scatter",
      name: param.name + " trend", //"R^2 = ".concat((Math.round(lr.r2 * 10000) / 10000).toString()),
      visible: "legendonly",
    };

    //console.log(fit);
  }
  if (filteredData2.length > 0) {
    trace2 = {
      x: filteredData2.map((sample) =>
        // format the sample.DateTime as "yyyy-MM-dd HH:mm"
        new Date(sample.dateTime).toISOString().slice(0, 16)
      ),
      y: filteredData2.map((sample) => sample.value),
      mode: "markers",
      type: "scatter",
      name: param2.name,
      yaxis: "y2",
      marker: { size: 12 },
      showlegend: true,
    };
    var x_data_64 = filteredData2.map((sample) =>
      // format the sample.DateTime as "yyyy-MM-dd HH:mm"
      new Date(sample.dateTime).toISOString().slice(0, 16)
    );
    // convert x_data to integers
    x_data_64 = x_data_64.map((x) => new Date(x).getTime());
    var y_data_64 = trace2.y;
    var lr = linearRegression(x_data_64, y_data_64);
    //console.log(lr);

    var fit_from = Math.min(...x_data_64);
    var fit_to = Math.max(...x_data_64);

    fit2 = {
      x: [fit_from, fit_to],
      y: [fit_from * lr.sl + lr.off, fit_to * lr.sl + lr.off],
      mode: "lines",
      type: "scatter",
      yaxis: "y2",
      name: param2.name + " trend", //"R^2 = ".concat((Math.round(lr.r2 * 10000) / 10000).toString()),
      visible: "legendonly",
    };
  }
  console.log("trace", trace);
  if (showSecondParam.value) {
    updatePlot(trace, param, fit, trace2, param2, fit2);
    return;
  } else {
    if (paramType.value === "Parameter") {
      updatePlot(data, param);
      return;
    } else {
      updatePlot(trace, param, fit);
      return;
    }
  }
};

const updatePlot = (trace, param, fit, trace2, param2, fit2) => {
  //console.log("updatePlot");
  //console.log("trace", trace);
  //console.log("trace2", trace2);
  //console.log("param", param);
  //console.log("param", param2);

  if (trace.length === 0) {
    return;
  }
  if (typeof param === "undefined") {
    return;
  }
  console.log("updatePlot");
  //let ylab = param.name + " (" + param.units + ")";
  if (dataType.value === "Benthic Macroinvertebrates") {
    ylab = param.name;
  }
  let ylab2 = "";
  let orientation = "v";
  if (typeof param2 !== "undefined") {
    ylab2 = param2.name + " (" + param2.units + ")";
  }
  let colorway = [];
  if (paramType.value === "Sample Depth") {
    colorway = ["#1f77b4", "#1f77b4", "#ff7f0e", "#ff7f0e"];
  } else {
    //create 25 length array of unique, nice hex colors for colorway array
    colorway = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
    ];
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
    yaxis2: {
      title: {
        text: ylab2,

        font: {
          size: 20,
        },
      },
      tickfont: {
        size: 16, // Set the desired size for x-axis tick values
      },
      overlaying: "y",
      side: "right",
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
    showlegend: true,
    //add padding to top of legend
    colorway: colorway,

    legend: {
      y: 0.85,
      x: 1.1,
      bgcolor: "transparent",
      //tracegroupgap: 100,
    },
  };
  if (showSecondParam.value) {
    console.log("layout", layout);
    Plotly.newPlot(
      "chart-" + plotIndex.value,
      [trace, fit, trace2, fit2],
      layout
    );
    return;
  }
  if (paramType.value === "Parameter") {
    console.log("layout", layout);
    Plotly.newPlot("chart-" + plotIndex.value, trace, layout);
    return;
  } else {
    Plotly.newPlot("chart-" + plotIndex.value, [trace, fit], layout);
    return;
  }
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
