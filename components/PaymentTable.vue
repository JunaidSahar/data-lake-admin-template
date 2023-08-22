<template>
  <div>
    <div
      class="relative overflow-x-auto border border-strokeColor dark:border-slate-800 bg-white dark:bg-bgDarkColor"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-headingColor bg-slate-200 dark:bg-slate-800 uppercase dark:text-slate-300"
        >
          <tr>
            <th
              scope="col"
              class="px-6 py-3 min-w-[250px]"
              v-for="(list, index) in props.rowList"
              :key="index"
            >
              {{ list }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b dark:border-slate-800 border-strokeColor text-headingColor dark:text-slate-400 font-medium text-sm"
            v-for="(item, index) in props.tableData"
            :key="index"
          >
            <td class="px-6 py-4">{{ item.product_id || "_" }}</td>
            <td class="px-6 py-4">{{ item.source || "_" }}</td>
            <td class="px-6 py-4">
              {{ moment(item.order_datetime).format("MMM D,YYYY hh :mm A") }}
            </td>
            <td class="px-6 py-4" v-if="item.expiration_datetime">
              {{
                moment(item.expiration_datetime).format("MMM D,YYYY hh :mm A")
              }}
            </td>
            <td class="px-6 py-4">{{ item.alnafi_payment_id || "_" }}</td>
            <td class="px-6 py-4" v-if="'qarz' in item">
              {{ item.qarz ? "Yers" : "No" }}
            </td>
            <td class="px-6 py-4">{{ item.user_id || "_" }}</td>
            <td class="px-6 py-4">{{ item.amount || "_" }}</td>
            <td class="px-6 py-4" v-if="item.is_valid_payment">
              {{ item.is_valid_payment.reasons.find((e) => e) }}
            </td>
            <td class="px-6 py-4">{{ item.payment_cycle || "_" }}</td>
            <td class="px-6 py-4" v-if="item.candidate_name">
              {{ item.candidate_name || "_" }}
            </td>
            <td class="px-6 py-4" v-if="'is_active' in item">
              {{ item.is_active ? "Yes" : "No" }}
            </td>
            <td class="px-6 py-4" v-if="'phone' in item">
              {{ item.phone || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="list-style-none flex justify-end py-3">
        <li>
          <a
            @click="$emit('decreaseBy', 1)"
            v-if="currentPages !== 1"
            class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
            >Previous</a
          >
        </li>
        <li>
          <a
            class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
            >1</a
          >
        </li>
        <li aria-current="page">
          <a
            class="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
            href="#!"
            >2
            <span
              class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
              >(current)</span
            >
          </a>
        </li>
        <li>
          <a
            class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
            >3</a
          >
        </li>
        <li>
          <a
            @click="$emit('increaseBy', 1)"
            class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import moment from "moment";
const props = defineProps({
  rowList: {
    type: Array,
    default: [],
  },
  tableData: {
    type: Array,
    default: [],
  },
  totalDataCount: {
    type: String,
    default: "",
  },
  totalNumberOfPages: {
    type: String,
    default: "",
  },
  currentPages: {
    type: Number,
    default: 1,
  },
});
</script>
