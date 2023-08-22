<template>
  <div class="space-y-1">
    <p class="font-semibold text-headingColor dark:text-slate-400 text-sm">{{ filterLabel }}</p>
    <div class="relative">
      <input
        @input="
          (e) => {
            $emit('changeValueEmit', e.target.value);
          }
        "
        @focus="$emit('changeValueEmit')"
        type="search"
        class="w-64 py-2 px-4 border border-strokeColor dark:placeholder:text-slate-600 placeholder:text-sm dark:focus:outline-slate-300 focus:outline-none dark:bg-bgDarkColor dark:border-slate-800"
        placeholder="Search by email"
      />
      <div
        @click="$emit('upplyFilterEmit')"
        class="absolute top-0 p-2 bg-slate-300 dark:bg-slate-800 text-paragraphColor dark:text-slate-500 h-full w-12 flex items-center justify-center right-0 cursor-pointer"
      >
        <Icon name="ph:magnifying-glass-bold" class="w-5 h-5" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  filterLabel: {
    type: String,
    default: "Select",
  },
});

defineEmits(["changeValueEmit", "upplyFilterEmit"]);
</script>
