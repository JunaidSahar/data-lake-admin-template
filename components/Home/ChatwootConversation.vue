<template>
  <div class="border-strokeColor dark:border-slate-800 border gap-4 p-8">
    <div class="grid grid-cols-6 gap-2">
      <div
        v-for="(items, index) in chatwootTbs"
        :key="index"
        class="p-4 cursor-pointer"
        :class="
          items.metric === selectedMetricType
            ? 'border border-b border-strokeColor bg-slate-100 dark:bg-slate-900 dark:border-slate-800'
            : 'border border-b border-strokeColor dark:border-slate-800'
        "
        @click="handleChangeMetricsType(items.metric)"
      >
        <p class="text-sm text-paragraphColor dark:text-slate-400">
          {{ items.title }}
        </p>
        <h5 class="text-xl font-semibold text-headingColor dark:text-slate-300">
          {{ items.value }}
        </h5>
      </div>
    </div>
    <div class="flex gap-2 py-3">
      <div class="flex flex-col gap-2 font-medium">
        <select
          v-if="selectedDay > 7 || selectedDay == ''"
          v-model="selectedDataFilterType"
          @change="getConversationData"
          class="block w-full px-4 py-2 text-headingColor dark:text-slate-400 font-semibold bg-white dark:bg-bgDarkColor border border-strokeColor dark:border-slate-800"
        >
          <option value="day" selected>Day</option>
          <option value="week">Week</option>
          <option v-if="selectedDay > 30 || selectedDay == ''" value="month">
            Month
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-2 font-medium">
        <select
          v-model="selectedDay"
          @change="getConversationData"
          class="block w-full px-4 py-2 text-headingColor dark:text-slate-400 font-semibold bg-white border border-strokeColor dark:bg-bgDarkColor dark:border-slate-800"
        >
          <option :value="7" selected>Last 7 days</option>
          <option :value="30">Last 30 days</option>
          <option :value="90">Last 3 months</option>
          <option value="">Overall</option>
        </select>
      </div>
    </div>
    <div class="mt-6" v-if="!isLoading">
      <apexchart
        type="area"
        height="300px"
        :options="chartOptions.chartOptions"
        :series="chartOptions.series"
      >
      </apexchart>
    </div>
    <div v-else class="h-96 w-full flex items-center justify-center">
      <h5
        class="flex gap-3 items-center text-lg text-headingColor dark:text-slate-400"
      >
        <Icon name="eos-icons:bubble-loading" />
        Loading
      </h5>
    </div>
  </div>
</template>

<script setup>
import { getCookie } from "~/mixins/cookies";
import axios from "axios";
const chatwootData = ref([]);
const config = useRuntimeConfig();
let x = "Bearer ";
let y = getCookie("access_token");
const conversationCount = ref();
const conversationDate = ref();
const selectedDay = ref(7);
const selectedDataFilterType = ref("day");
const chatwootTbs = ref([
  {
    title: "Conversations Count",
    value: "",
    metric: "conversations_count",
  },
  {
    title: "Incoming Messages Count",
    value: "",
    metric: "incoming_messages_count",
  },
  {
    title: "Outgoing Messages Count",
    value: "",
    metric: "outgoing_messages_count",
  },
  {
    title: "Avg First Response Time",
    value: "",
  },
  {
    title: "Avg Resolution Time",
    value: "",
    metric: "avg_resolution_time",
  },
  {
    title: "Resolution Count",
    value: "",
    metric: "res_count",
  },
]);

const selectedMetricType = ref(chatwootTbs.value[0].metric);
const isLoading = ref(false);
function getConversationData() {
  isLoading.value = true;
  axios
    .get(
      config.public.API_BASE_URL +
        `chatwoot/conversationreport/?metric=${selectedMetricType.value}&days=${selectedDay.value}`,
      {
        headers: {
          Authorization: x + y,
        },
      }
    )
    .then((responsce) => {
      isLoading.value = false;
      chatwootData.value = responsce.data;
      chatwootTbs.value[0].value = chatwootData.value.data.conversations_count;
      chatwootTbs.value[1].value =
        chatwootData.value.data.incoming_messages_count;
      chatwootTbs.value[2].value =
        chatwootData.value.data.outgoing_messages_count;
      chatwootTbs.value[3].value =
        chatwootData.value.data.avg_first_response_time;
      chatwootTbs.value[4].value = chatwootData.value.data.avg_resolution_time;
      chatwootTbs.value[5].value = chatwootData.value.data.resolutions_count;
      if (selectedDataFilterType.value == "day") {
        conversationCount.value =
          chatwootData.value?.data_per_date.map((c) => c.value);
        conversationDate.value = chatwootData.value?.data_per_date.map(
          (c) => c.timestamp
        );
      } else if (selectedDataFilterType.value == "week") {
        conversationCount.value =
          chatwootData.value?.data_per_week.map((c) => c.value);
        conversationDate.value = chatwootData.value?.data_per_week.map(
          (c) => c.timestamp
        );
      } else {
        conversationCount.value =
          chatwootData.value?.data_per_month.map((c) => c.value);
        conversationDate.value =
          chatwootData.value?.data_per_month.map((c) => c.timestamp);
      }
    });
}

function handleChangeMetricsType(metric) {
  selectedMetricType.value = metric;
  getConversationData()
}

getConversationData();
const chartOptions = computed(() => {
  return {
    series: [{ name: "Al Nafi:", data: conversationCount.value }],
    chartOptions: {
      grid: {
        borderColor: "#ffffff",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "100%", borderRadius: [0] },
      },
      colors: ["#ffffff", "#90e0ef"],
      chart: {
        type: "area",
        height: 370,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: "inherit",
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: "area",
        tickAmount: 12,
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
        categories: conversationDate.value,
      },
      yaxis: {
        show: true,
        min: 0,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 1,
        lineCap: "butt",
        colors: ["#90e0ef"],
      },
      tooltip: { theme: "light" },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    },
  };
});
</script>
