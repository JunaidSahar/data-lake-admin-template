<template>
  <div class="relative flex z-20">
    <!-- Sidebar -->
    <div
      class="absolute flex top-0 z-20"
      style="height: calc(100vh - 64px)"
      :class="[right ? 'left-0 flex-row' : 'right-0 flex-row']"
    >
      <!--Drawer -->
      <button
        @click.prevent="toggle()"
        class="w-12 h-48 p-1 my-auto text-headingColor dark:text-slate-300 bg-slate-300 dark:bg-slate-800 text-center focus:outline-none transition-color duration-300"
      >
        <span
          :class="[right ? '-rotate-90' : 'rotate-90']"
          class="block transform origin-center font-bold"
        >
          Filters
        </span>
      </button>

      <!-- Sidebar Content -->
      <div
        ref="content"
        class="transition-all duration-700 bg-white dark:bg-bgDarkColor gap-4 dark:border-slate-800 border-l border-strokeColor overflow-hidden flex flex-col items-center justify-center"
        :class="[open ? 'max-w-lg' : 'max-w-0']"
      >
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const open = ref(false);
const dimmer = ref(true);
const right = ref(false);

function toggle() {
  open.value = !open.value;
}
</script>
