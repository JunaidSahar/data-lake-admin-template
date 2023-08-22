<template>
  <div>
    <!-- Filter Sidebar -->
    <!-- {{ renewalPayments }} -->
    <FiltersFilterSideBar>
      <div class="px-5 space-y-6">
        <!-- search by email input -->

        <FiltersSearchInput
          :data-list="renewalPayments"
          filter-label="Search by email"
          @changeValueEmit="
            (value) => {
              searchFilterValue = value;
            }
          "
          @upplyFilterEmit="getData"
        />

        <!-- Filter by expiration date -->

        <div
          class="w-64 py-2 px-4 border border-strokeColor dark:bg-bgDarkColor dark:border-slate-800"
        >
          <p class="font-semibold text-headingColor dark:text-slate-400">
            Day {{ range }}
          </p>

          <FiltersRangeInput
            filter-label="Filter expiration by date"
            @changeValueEmit="
              (value) => {
                range = value;
                getData();
              }
            "
          />

          <!-- Filter by exact date -->

          <div class="flex gap-2 items-center">
            <input
              type="checkbox"
              v-model="exact"
              @change="getData()"
              :true-value="true"
              :false-value="false"
              class="accent-slate-500 dark:accent-slate-600"
            />
            <span class="text-sm font-medium text-headingColor dark:text-slate-500"
              >Exact day expirations</span
            >
          </div>
        </div>

        <!-- Filter by user status active or not -->

        <div
          class="flex gap-2 items-center justify-between p-3 border border-strokeColor dark:border-slate-800"
        >
          <div class="flex gap-2 items-center">
            <input
              type="checkbox"
              v-model="active"
              @change="getData()"
              :true-value="true"
              :false-value="false"
              class="accent-slate-500 dark:accent-slate-600"
            />
            <span class="text-sm font-medium text-headingColor dark:text-slate-400"
              >Is active user</span
            >
          </div>
          <span
            class="text-sm font-medium text-headingColor cursor-pointer hover:underline dark:text-slate-400"
            @click="(active = null), getData()"
            >Clear</span
          >
        </div>

        <!-- Filter by product plan -->

        <FiltersSelectInput
          filter-label="Select payment plan"
          @changeValueEmit="
            (value) => {
              (selectedPlan = value), getData();
            }
          "
          :options="paymentPlanOptions"
        />
      </div>
    </FiltersFilterSideBar>

    <!-- Filter Sidebar End -->

    <!-- Main Container -->

    <div class="p-6">
      <h1 class="pb-8 uppercase font-semibold text-2xl text-headingColor dark:text-slate-300">
        {{ useRoute().matched[0].components.default.__name }}
      </h1>

      <!-- Table -->

      <template v-if="isLoaded">
        <PaymentTable
          :row-list="dataList"
          :table-data="renewalPayments"
          :total-data-count="totalDataCount"
          :total-number-of-pages="totalNumberOfPages"
          :current-pages="currentPage"
          @increase-by="
            (n) => {
              ((isLoaded = false), (currentPage += n)), getData();
            }
          "
          @decrease-by="
            (n) => {
              ((isLoaded = false), (currentPage -= n)), getData();
            }
          "
        />
      </template>
      <!-- Table End -->

      <!-- Loader -->

      <div v-else class="w-full flex items-center justify-center h-[550px]">
        <Icon
          name="eos-icons:bubble-loading"
          class="w-12 h-12 text-paragraphColor dark:text-slate-500"
        />
      </div>

      <!-- Loader End -->
    </div>

    <!-- Main Container End -->
  </div>
</template>

<script setup>
// Import necessary middleware
import axios from "axios";
import { getCookie } from "@/mixins/cookies";

// Load runtime configuration
const config = useRuntimeConfig();

// Define reactive variables
const renewalPayments = ref([]);
const totalDataCount = ref();
const totalNumberOfPages = ref();
const currentPage = ref(1);
const isLoaded = ref(false);
const searchFilterValue = ref("");
const selectedPlan = ref("");
const range = ref("");
const exact = ref(null);
const active = ref(null);

// Define list of data columns
const dataList = [
  "Product Name",
  "Source",
  "Order Date Time",
  "Expiry Date Time",
  "Al Nafi Payment Id",
  "Is Qarz E Hasna",
  "User Email",
  "Amount",
  "Plan",
  "Is Active",
  "Phone Number",
];

// Define options for source and payment plans
const paymentPlanOptions = [
  "none",
  "yearly",
  "halfyearly",
  "quarterly",
  "monthly",
];

// Define authorization variables
const authorizationPrefix = "Bearer ";
const accessToken = getCookie("access_token");

// Define function to fetch data
function getData() {
  axios
    .get(
      config.public.API_BASE_URL +
        `payments/searchalnafipayment/?page=${currentPage.value}&q=${searchFilterValue.value}&expiration_date=${range.value}&exact=${exact.value}&plan=${selectedPlan.value}&is_active=${active.value}`,
      {
        headers: {
          Authorization: authorizationPrefix + accessToken,
        },
      }
    )
    .then((response) => {
      // Extract data from the response
      const responseData = response.data.results;
      renewalPayments.value = responseData;
      totalDataCount.value = response.data.count;
      totalNumberOfPages.value = Math.ceil(response.data.count / 10);
      isLoaded.value = true;
    });
}

// Fetch initial data
getData();
</script>
