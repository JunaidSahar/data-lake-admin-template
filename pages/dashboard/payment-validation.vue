<template>
  <div>
    <!-- Filter Sidebar -->

    <FiltersFilterSideBar>
      <div class="px-5 space-y-6">
        <!-- search by email input -->

        <FiltersSearchInput
          :data-list="paymentValidation"
          filter-label="Search by email"
          @changeValueEmit="
            (value) => {
              searchFilterValue = value;
            }
          "
          @upplyFilterEmit="getData"
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
          :table-data="paymentValidation"
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
const paymentValidation = ref([]);
const totalDataCount = ref();
const totalNumberOfPages = ref();
const currentPage = ref(1);
const isLoaded = ref(false);
const searchFilterValue = ref("");

// Define list of data columns
const dataList = [
  "Product Name",
  "Source",
  "Order Date Time",
  "Expiry Date Time",
  "Al Nafi Payment Id",
  "Qarz E Hasna",
  "User Email",
  "Amount",
  "Is valid",
  "Candidate Name",
];

// Define authorization variables
const authorizationPrefix = "Bearer ";
const accessToken = getCookie("access_token");

// Define function to fetch data
function getData() {
  axios
    .get(
      config.public.API_BASE_URL +
        `payments/paymentvalidation/?page=${currentPage.value}&q=${searchFilterValue.value}`,
      {
        headers: {
          Authorization: authorizationPrefix + accessToken,
        },
      }
    )
    .then((response) => {
      // Extract data from the response
      const responseData = response.data.results;
      paymentValidation.value = responseData;
      totalDataCount.value = response.data.count;
      totalNumberOfPages.value = Math.ceil(response.data.count / 10);
      isLoaded.value = true;
    });
}

// Fetch initial data
getData();
</script>
