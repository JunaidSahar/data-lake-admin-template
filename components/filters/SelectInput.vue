<template>
  <div class="space-y-1">
    <p class="font-semibold text-headingColor dark:text-slate-400 text-sm">{{ filterLabel }}</p>
    <div class="relative">
      <select
        @input="(e) => $emit('changeValueEmit', e.target.value)"
        type="select"
        class="w-64 py-2 px-4 border border-strokeColor focus:outline-none dark:bg-bgDarkColor dark:border-slate-800 text-paragraphColor dark:text-slate-400"
        placeholder="Search by email"
      >
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  filterLabel: {
    type: String,
    default: "Select",
  },
});

defineEmits(["changeValueEmit"]);
</script>
