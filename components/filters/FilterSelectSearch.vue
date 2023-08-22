<template>
  <div class="space-y-1">
    <p class="font-semibold text-headingColor dark:text-slate-400 text-sm">
      {{ filterLabel }}
    </p>
    <div class="relative">
      <div
        @click="isOpenSearchSuggestions = !isOpenSearchSuggestions"
        class="w-64 cursor-pointer py-2 select-none truncate px-4 border border-strokeColor text-paragraphColor dark:text-slate-400 font-medium dark:placeholder:text-slate-600 dark:bg-bgDarkColor dark:border-slate-800"
      >
        {{ placeholder }}
      </div>
      <div
        v-if="isOpenSearchSuggestions"
        class="absolute top-12 z-30 p-2 w-full bg-slate- dark:bg-bgDarkColor bg-white border dark:border-slate-800 border-strokeColor max-h-56 overflow-y-scroll"
      >
        <input
          type="search"
          class="py-2 w-full sticky top-0 px-4 border border-strokeColor dark:text-slate-400 dark:placeholder:text-slate-600 placeholder:text-sm dark:focus:outline-slate-300 focus:outline-none dark:bg-bgDarkColor dark:border-slate-800"
          placeholder="Search by email"
          @input="
            (e) => {
              $emit('changeValueEmit', e.target.value);
            }
          "
        />
        <ul class="space-y-2 my-4 text-sm overflow-hidden font-medium">
          <li
            v-for="(list, index) in dataList"
            :key="index"
            @click="
              $emit('updateValueEmit', list), (isOpenSearchSuggestions = false)
            "
            class="hover:bg-slate-200 text-headingColor dark:text-slate-400 cursor-pointer dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            {{ list }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
const isOpenSearchSuggestions = ref(false);
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  filterLabel: {
    type: String,
    default: "Select",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
});

defineEmits(["changeValueEmit", "updateValueEmit"]);
</script>
