<template>
  <div class="space-y-1">
    <p class="font-semibold text-headingColor text-sm dark:text-slate-400">{{ filterLabel }}</p>
    <div class="relative">
      <input
        @input="(e) => $emit('changeValueEmit', e.target.value)"
        type="date"
        class="w-64 py-2 px-4 border border-strokeColor focus:outline-none dark:bg-bgDarkColor dark:border-slate-800 text-paragraphColor dark:text-slate-400"
        placeholder="Search by email"
      />
    </div>
    <slot></slot>
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
