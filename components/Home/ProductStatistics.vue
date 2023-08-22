<template>
  <div class="w-full">
    <div class="pb-5 flex gap-6">
      <div class="max-w-sm">
        <span class="text-paragraphColor dark:text-slate-400"
          >Total amount of payments in Rupees</span
        >
        <h5
          class="text-2xl font-semibold text-headingColor dark:text-slate-300"
        >
          {{useFormatNumPKR(totalAmountPKR)}}
        </h5>
      </div>
      <div class="max-w-sm">
        <span class="text-paragraphColor dark:text-slate-400"
          >Total amount of payments in USD</span
        >
        <h5
          class="text-2xl font-semibold text-headingColor dark:text-slate-300"
        >
          {{ useFormatNumPKR(totalAmountUSD) }}
        </h5>
      </div>
    </div>
    <div
      class="border-strokeColor dark:border-slate-800 grid grid-cols-4 gap-4"
    >
      <div
        class="space-y-2 p-4 border border-strokeColor dark:border-slate-800"
        v-for="(items, index) in analytics_product"
        :key="index"
      >
      <div class="w-fit p-2" :class="items.bgColor">
        <Icon :name="items.icon" class="w-7 h-7" :class="items.iconColor" />
      </div>
        <p class="text-sm text-paragraphColor dark:text-slate-400">
          {{ items.title }}
        </p>
        <h5 class="text-xl font-semibold text-headingColor dark:text-slate-300">
          {{ items.value }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { getCookie } from "~/mixins/cookies";
const config = useRuntimeConfig();
let x = "Bearer ";
let y = getCookie("access_token");
const totalAmountPKR = ref("");
const totalAmountUSD = ref("");
const paymentData = ref();
const analytics_product = ref([
  {
    icon: "streamline:money-graph-bar-increase-up-product-performance-increase-arrow-graph-business-chart",
    title: "Product with max revenue",
    value: "",
    bgColor: "bg-yellow-200",
    iconColor: "text-yellow-700"
  },
  {
    icon: "iconoir:send-dollars",
    title: "Max revenue",
    value: "",
    bgColor: "bg-purple-200",
    iconColor: "text-purple-700"
  },
  {
    icon: "streamline:money-graph-bar-decrease-arrow-product-performance-down-decrease-graph-business-chart",
    title: "Product with min revenue",
    value: "",
    bgColor: "bg-cyan-200",
    iconColor: "text-cyan-700"
  },
  {
    icon: "iconoir:receive-dollars",
    title: "Min revenue",
    value: "",
    bgColor: "bg-red-200",
    iconColor: "text-red-400"
  },
  {
    icon: "ic:baseline-vertical-align-top",
    title: "Most payments product",
    value: "",
    bgColor: "bg-green-200",
    iconColor: "text-green-700"
  },
  {
    icon: "solar:sort-from-bottom-to-top-outline",
    title: "Most payments count",
    value: "",
    bgColor: "bg-lime-200",
    iconColor: "text-lime-700"
  },
  {
    icon: "ic:baseline-vertical-align-bottom",
    title: "Least payments product",
    value: "",
    bgColor: "bg-blue-200",
    iconColor: "text-blue-700"
  },
  {
    icon: "solar:sort-from-top-to-bottom-bold",
    title: "Least payments count",
    value: "",
    bgColor: "bg-slate-200",
    iconColor: "text-slate-700"
  },
]);

axios
  .get(config.public.API_BASE_URL + "payments/productanalytics/", {
    headers: {
      Authorization: x + y,
    },
  })
  .then((res) => {
    paymentData.value = res.data;
    totalAmountPKR.value = paymentData.value.total_payments_pkr;
    totalAmountUSD.value = paymentData.value.total_payments_usd;

    // product analytics

    analytics_product.value[0].value =
      paymentData.value.product_with_max_revenue;
    analytics_product.value[1].value = paymentData.value.max_revenue;
    analytics_product.value[2].value =
      paymentData.value.product_with_min_revenue;
    analytics_product.value[3].value = paymentData.value.min_revenue;
    analytics_product.value[4].value = paymentData.value.most_payments_product;
    analytics_product.value[5].value = paymentData.value.most_payments_count;
    analytics_product.value[6].value = paymentData.value.least_payments_product;
    analytics_product.value[7].value = paymentData.value.least_payments_count;
  });
</script>
