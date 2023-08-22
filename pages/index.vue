<script setup>
import axios from "axios";
import { getCookie } from "~/mixins/cookies";
const config = useRuntimeConfig();
let x = "Bearer ";
let y = getCookie("access_token");
const allPayments = ref();
const easypaisaPayment = ref();
const EasypaisaPaymentsComparisons = ref([]);
const stripePayment = ref();
const stripePaymentsComparisons = ref([]);
const UBL_DDPayment = ref();
const UBL_DDPaymentsComparisons = ref([]);
const UBL_IPGPayment = ref();
const UBL_IPGPaymentsComparisons = ref([]);

axios
  .get(config.public.API_BASE_URL + "payments/totalpayments/", {
    headers: {
      Authorization: x + y,
    },
  })
  .then((res) => {
    easypaisaPayment.value = res.data.Easypaisa;
    stripePayment.value = res.data.Stripe;
    UBL_DDPayment.value = res.data.UBL_DD;
    UBL_IPGPayment.value = res.data.UBL_IPG;
    allPayments.value =
      easypaisaPayment.value +
      stripePayment.value +
      UBL_DDPayment.value +
      UBL_IPGPayment.value;
    EasypaisaPaymentsComparisons.value.push(allPayments.value);
    EasypaisaPaymentsComparisons.value.push(easypaisaPayment.value);
    stripePaymentsComparisons.value.push(allPayments.value);
    stripePaymentsComparisons.value.push(stripePayment.value);
    UBL_DDPaymentsComparisons.value.push(allPayments.value);
    UBL_DDPaymentsComparisons.value.push(UBL_DDPayment.value);
    UBL_IPGPaymentsComparisons.value.push(allPayments.value);
    UBL_IPGPaymentsComparisons.value.push(UBL_IPGPayment.value);
  });

const comparisionData = ref([
  {
    title: "Overall Total transactions of Easypaisa",
    value: easypaisaPayment,
    comparisions: EasypaisaPaymentsComparisons,
  },
  {
    title: "Overall Total transactions of Stripe",
    value: stripePayment,
    comparisions: stripePaymentsComparisons,
  },
  {
    title: "Overall Total transactions of UBL DD",
    value: UBL_DDPayment,
    comparisions: UBL_DDPaymentsComparisons,
  },
  {
    title: "Overall Total transactions of UBL IPG",
    value: UBL_IPGPayment,
    comparisions: UBL_IPGPaymentsComparisons,
  },
]);
</script>

<template>
  <div class="p-6">
    <div>
      <h2
        class="text-xl font-semibold pb-4 text-headingColor dark:text-slate-400"
      >
        Payments Statistics
      </h2>
      <div class="w-full flex justify-between gap-4">
        <div class="w-6/12 grid-cols-2 grid gap-4">
          <DontChart
            v-for="(item, index) in comparisionData"
            :key="index"
            :options="{
              series: item.comparisions,
              chart: {
                type: 'donut',
              },

              stroke: {
                colors: ['none'],
              },
              legend: {
                show: false,
              },
              labels: ['All count', 'Payments count'],
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: 'top',
                    },
                  },
                },
              ],
            }"
            :title="item.title"
            :value="item.value"
          />
        </div>
        <div class="w-6/12 grid">
          <DontChart
            height="270px"
            :series="[
              stripePayment,
              easypaisaPayment,
              UBL_DDPayment,
              UBL_IPGPayment,
            ]"
            :options="{
              chart: {
                type: 'donut',
              },
              legend: {
                show: false,
              },
              stroke: {
                colors: ['none'],
              },
              labels: ['Easypaisa', 'Payments count'],
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: 'top',
                    },
                  },
                },
              ],
            }"
            title="Overall Total number of Transactions"
            :value="allPayments"
            title-font-size="text-lg"
            value-font-size="text-5xl"
          />
        </div>
      </div>
      <h2
        class="text-xl font-semibold py-4 text-headingColor dark:text-slate-400"
      >
        Products Statistics
      </h2>
      <HomeProductStatistics />
      <h2
        class="text-xl font-semibold py-4 text-headingColor dark:text-slate-400"
      >
        Chatwoot Statistics
      </h2>
      <LazyHomeChatwootConversation />
    </div>
  </div>
</template>
