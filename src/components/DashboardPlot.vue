<template>
  <div class="plot-container">
    <div class="row q-mt-lg">
      <div class="col-3" v-show="paramType !== 'Parameter'">
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
      <div class="col-4 q-ml-md" v-show="paramOptionsPlot.length > 1">
        <q-btn
          color="primary"
          class="full-width"
          icon="fas fa-plus q-mr-sm"
          @click="addParameter"
          v-show="paramType !== 'Parameter' && dataType === 'Water Quality'"
        >
          Add Second Parameter to Plot
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div
        class="col q-ml-sm"
        v-show="
          paramType !== 'Parameter' &&
          selectedParamPlot.value !== '' &&
          selectedParamPlot.value !== null
        "
      >
        <div class="q-mt-sm tooltip-text">
          Code: {{ selectedParamPlot.value }}, Method:
          {{ selectedParamPlot.equipment }}, Tier
          {{ selectedParamPlot.tier }}
        </div>
      </div>
    </div>
    <div class="row q-mt-lg" v-show="showSecondParam">
      <div class="col-3">
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
      <div class="col-4 q-ml-md">
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
    <div class="row" v-show="showSecondParam">
      <div class="col q-ml-sm" v-show="paramType !== 'Parameter'">
        <div class="q-mt-sm tooltip-text">
          Code: {{ selectedParamPlot2.value }}, Method:
          {{ selectedParamPlot2.equipment }}, Tier
          {{ selectedParamPlot2.tier }}
        </div>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12">
        <q-btn
          color="primary"
          icon="fas fa-camera"
          @click="downloadPlot(`chart-${plotIndex}`)"
        >
          <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
            <div class="q-pa-md" style="max-width: 360px">
              <div class="q-mt-sm tooltip-text">Download Plot as Image</div>
            </div>
          </q-tooltip>
          &nbsp; Download Plot as Image
        </q-btn>
        <q-btn
          color="primary"
          icon="fas fa-download"
          @click="downloadPlotData(`chart-${plotIndex}`)"
          class="q-ml-md"
        >
          <q-tooltip anchor="bottom left" self="top left" class="bg-grey-2">
            <div class="q-pa-md" style="max-width: 360px">
              <div class="q-mt-sm tooltip-text">
                Download data shown in plot as .csv file.
              </div>
            </div>
          </q-tooltip>
          &nbsp; Download Data Shown in Plot
        </q-btn>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div :id="`chart-${plotIndex}`" class="chart"></div>
      </div>
    </div>
    <div class="row q-mt-lg" v-if="plotStats.length > 0">
      <div class="col-12">
        <div style="color: teal" class="col text-h6">Plot Statistics</div>
        <div class="q-pa-md">
          <q-table
            flat
            bordered
            title=""
            :rows="plotStats"
            :columns="columns"
            row-key="name"
            hide-bottom
            ><template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="font-size: 16px; color: teal; font-weight: bold"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template></q-table
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch, toRefs } from "vue";
import Plotly, { filterObject, get, list, plot } from "plotly.js-dist";
import { data } from "autoprefixer";

const props = defineProps([
  "plotData",
  "plotIndex",
  "paramType",
  "dataType",
  "stationName",
]);
const { plotData } = toRefs(props);
const { plotIndex } = toRefs(props);
const { paramType } = toRefs(props);
const { dataType } = toRefs(props);
const { stationName } = toRefs(props);

//const trace1 = ref([]);
const width = window.innerWidth;
const selectedParamPlot = ref([]);
const selectedParamPlot2 = ref([]);
const paramOptionsPlot = ref([]);
const paramLabel = ref("Select Parameter(s)");
const showSecondParam = ref(false);
const plotStats = ref([]);
const dataOnPlot = ref([]);
const columns = [
  {
    name: "name",
    required: true,
    label: "Parameter",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "min",
    align: "left",
    label: "Minimum",
    field: "min",
    sortable: true,
  },
  {
    name: "max",
    align: "left",
    label: "Maximum",
    field: "max",
    sortable: true,
  },
  { name: "mean", align: "left", label: "Mean", field: "mean", sortable: true },
  {
    name: "count",
    align: "left",
    label: "Count",
    field: "count",
    sortable: true,
  },
];

watch(
  () => plotData.value,
  (newVal, oldVal) => {
    console.log("plotData", newVal);
    getUniqueParams(newVal);
  }
);
const downloadPlot = (plot) => {
  //update plot title
  let update = {
    title: stationName.value,
  };

  Plotly.relayout(plot, update);

  Plotly.downloadImage(plot, {
    filename: "cmc-plot",
    format: "png",
    width: 1000,
    height: 400,
  });
  update = {
    title: "",
  };

  Plotly.relayout(plot, update);
};

const downloadPlotData = () => {
  let data = dataOnPlot.value;
  console.log("data on plot", data);
  //create new array pivotData with x as datetime and additional properties for each unique name value
  let pivotData = [];
  data.forEach((d) => {
    let index = pivotData.findIndex((p) => p.x === d.x);
    if (index === -1) {
      pivotData.push({
        x: d.x,
        [d.name]: d.y,
      });
    } else {
      pivotData[index][d.name] = d.y;
    }
  });
  console.log(pivotData);
  //format datetime in pivotData as "yyyy-MM-dd HH:mm:ss"
  pivotData.forEach((d) => {
    d.date = new Date(d.x).toISOString().slice(0, 10);
    d.time = new Date(d.x).toISOString().slice(11, 16);
  });

  //dowload pivotData as csv file
  let csv = "data:text/csv;charset=utf-8,";
  let header = "Date,Time,";
  let names = [];
  pivotData.forEach((d) => {
    for (const [key, value] of Object.entries(d)) {
      if ((key !== "x") & (key !== "date") & (key !== "time")) {
        if (!names.includes(key)) {
          names.push(key);
          header += key + ",";
        }
      }
    }
  });
  csv += header + "\n";
  pivotData.forEach((d) => {
    let row = d.date + "," + d.time + ",";
    names.forEach((name) => {
      console.log(name, d[name]);
      if (d[name]) {
        row += d[name] + ",";
      } else if (d[name] === 0) {
        row += "0,";
      } else {
        row += ",";
      }
    });
    csv += row + "\n";
  });

  console.log("csv", csv);
  var encodedUri = encodeURI(csv);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "cmc-plot-data.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
};
const addParameter = () => {
  showSecondParam.value = !showSecondParam.value;
  if (selectedParamPlot2.value === selectedParamPlot.value) {
    //set selectedParamPlot2 to the next parameter in the paramOptionsPlot array
    let index = paramOptionsPlot.value.findIndex(
      (p) => p.value === selectedParamPlot.value
    );
    if (index === paramOptionsPlot.value.length - 1) {
      selectedParamPlot2.value = paramOptionsPlot.value[0];
    } else {
      selectedParamPlot2.value = paramOptionsPlot.value[index + 1];
    }
  }
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
    selectedParamPlot2.value = paramOptionsPlot.value[1];
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
          name: sample.parameterName + " (" + sample.parameterUnits + ")",
          units: sample.parameterUnits,
          tier: sample.parameterTier,
          equipment: sample.parameterEquipment,
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex((t) => t.value === value.value) === index
      );
    //create new unique params array. loop through uniqueparams. if name is not in the array, add it to the array with units and value. if name is in the array,
    // concatenate the value to the nalue with a comma separator.

    //check if uniqueParams legngth is greater than 1. If so, concatenate the value and equipment properties for each parameter code
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
  if (uniqueParams.length > 1) {
    selectedParamPlot2.value = uniqueParams[1];
  }
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
  () => width.value,
  (newVal, oldVal) => {
    resizePlot();
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
const resizePlot = () => {
  let chartId = "chart-" + plotIndex.value;
  if (document.getElementById(chartId) === null) {
    return;
  }
  Plotly.Plots.resize(document.getElementById(chartId));
};

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
      mode: "markers",
      type: "scatter",
      name: param.name,
      marker: { size: 12 },
      showlegend: true,
    };
    console.log(trace);
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
      //remove spaces from searchArray
      searchArray = searchArray.map((s) => s.trim());

      console.log("searchArray", searchArray);
      console.log("plotData.value", plotData.value);
      filteredData = plotData.value.filter((sample) =>
        searchArray.includes(sample.parameterCode)
      );
      console.log("filteredData", filteredData);
    } else {
      let searchArray = param.value.split(",");
      searchArray = searchArray.map((s) => s.trim());
      let searchArray2 = param2.value.split(",");
      searchArray2 = searchArray2.map((s) => s.trim());

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
      nticks: 5,
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
      nticks: 5,
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
      marker: { size: 12, symbol: "diamond" },
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
  console.log("updatePlot");
  console.log("trace", trace);
  //console.log("trace2", trace2);
  console.log("param", param);
  //console.log("param", param2);

  if (trace.length === 0) {
    return;
  }
  if (typeof param === "undefined") {
    return;
  }
  console.log("updatePlot");
  //let ylab = param.name + " (" + param.units + ")";

  let ylab2 = "";
  let orientation = "v";
  if (typeof param2 !== "undefined") {
    ylab2 = param2.name;
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
        text: param.name,

        font: {
          size: 20,
        },
      },
      nticks: 5,
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
      tickmode: "sync",
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
      t: 50,
      pad: 0,
    },
    showlegend: true,
    //add padding to top of legend
    colorway: colorway,
    //add title to plot
    title: "",

    legend: {
      y: 0.85,
      x: 1.15,
      bgcolor: "transparent",
    },
  };
  const chartId = "chart-" + plotIndex.value;
  const config = {
    displayModeBar: true, // this is the line that hides the bar.
  };
  if (dataType.value === "Benthic Macroinvertebrates") {
    console.log("layout", layout);

    Plotly.newPlot("chart-" + plotIndex.value, [trace], layout, config);
    calcStats(chartId);
    listenPlotZoom(chartId);
    return;
  }
  if (showSecondParam.value) {
    console.log("layout", layout);
    Plotly.newPlot(chartId, [trace, fit, trace2, fit2], layout, config);
    calcStats(chartId);
    listenPlotZoom(chartId);
    return;
  }
  if (paramType.value === "Parameter") {
    console.log("layout", layout);
    Plotly.newPlot(chartId, trace, layout, config);
    calcStats(chartId);
    listenPlotZoom(chartId);

    return;
  } else {
    Plotly.newPlot("chart-" + plotIndex.value, [trace, fit], layout, config);
    calcStats(chartId);
    listenPlotZoom(chartId);
    return;
  }
};
const listenPlotZoom = (chartId) => {
  let plotDiv = document.getElementById(chartId);
  plotDiv.on("plotly_relayout", function (eventdata) {
    console.log(eventdata);
    calcStats(chartId);
  });
};
const calcStats = (chartId) => {
  let x_range = document.getElementById(chartId).layout.xaxis.range;
  let y_range = document.getElementById(chartId).layout.yaxis.range;
  let y_range2 = [];
  if (typeof document.getElementById(chartId).layout.yaxis2 !== "undefined") {
    y_range2 = document.getElementById(chartId).layout.yaxis2.range;
  }

  let plotData = document.getElementById(chartId).data;
  let data = [];
  //loop through plotData and filter only data that has mode = "markers"
  let count = 0;
  plotData.forEach((trace) => {
    if (trace.mode === "markers") {
      let y_range_trace = y_range;
      if (count === 1) {
        y_range_trace = y_range2;
      }
      trace.x.forEach((x, index) => {
        if (x >= x_range[0] && x <= x_range[1]) {
          if (
            trace.y[index] >= y_range_trace[0] &&
            trace.y[index] <= y_range_trace[1]
          ) {
            data.push({
              x: x,
              y: trace.y[index],
              name: trace.name,
            });
          }
        }
      });
      count += 1;
    }
  });
  dataOnPlot.value = data;
  //calculate mean, min and max for each parameter
  let stats = [];
  data.forEach((d) => {
    let index = stats.findIndex((s) => s.name === d.name);
    if (index === -1) {
      stats.push({
        name: d.name,
        count: 1,
        sum: d.y,
        min: d.y,
        max: d.y,
      });
    } else {
      stats[index].count += 1;
      stats[index].sum += d.y;
      if (d.y < stats[index].min) {
        stats[index].min = d.y;
      }
      if (d.y > stats[index].max) {
        stats[index].max = d.y;
      }
    }
  });
  console.log("stats", stats);
  stats.forEach((s) => {
    s.mean = (s.sum / s.count).toFixed(2);
    s.min = s.min.toFixed(2);
    s.max = s.max.toFixed(2);
  });
  plotStats.value = stats;
};

onMounted(() => {
  console.log("onMounted");
  getUniqueParams(plotData.value);
  filterSamples(selectedParamPlot.value);
  window.addEventListener("resize", resizePlot);
  resizePlot();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizePlot);
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
