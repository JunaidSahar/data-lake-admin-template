<template>
  <div class="space-y-2">
    <p class="font-semibold text-headingColor dark:text-slate-400 text-sm">
      {{ filterLabel }}
    </p>
    <input
      id="default-range"
      type="range"
      value="0"
      max="31"
      min="1"
      @input="
        (e) => {
          $emit('changeValueEmit', e.target.value);
        }
      "
      class="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  filterLabel: {
    type: String,
    default: "Select",
  },
});

defineEmits(["changeValueEmit"]);
</script>
