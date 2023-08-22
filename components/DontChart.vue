<script setup lang="ts">
const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
  title: {
    type: String,
    default: "Title",
  },
  value: {
    type: Number,
    default: "Value",
  },
  series: {
    type: Array,
    default: []
  },
  height: {
    type: String,
    default: '120px'
  },
  titleFontSize: {
    type: String,
    default: 'text-sm'
  },
  valueFontSize: {
    type: String,
    default: 'text-3xl'
  }
});
</script>
<template>
  <div class="bg-white dark:bg-bgDarkColor border border-strokeColor dark:border-slate-800 flex p-4 gap-4">
    <div class="w-4/12">
      <apexchart
        type="donut"
        :height="props.height"
        :options="props.options"
        :series="props.series"
      >
      </apexchart>
    </div>
    <div class="w-8/12">
      <span :class="props.titleFontSize" class="text-paragraphColor dark:text-slate-400">{{ props.title }}</span>
      <h3 :class="props.valueFontSize" class="font-semibold text-headingColor dark:text-slate-300">
        {{ props.value }}
      </h3>
    </div>
  </div>
</template>
