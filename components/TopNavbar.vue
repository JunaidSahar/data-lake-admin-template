<template>
  <div
    class="bg-white relative flex items-center justify-between h-16 px-6 border-b border-strokeColor dark:bg-bgDarkColor dark:border-slate-800"
  >
    <div
      @click="goBack()"
      class="text-paragraphColor dark:text-slate-400 cursor-pointer hover:underline text-sm flex items-center justify-center rounded-full"
    >
      <Icon name="material-symbols:arrow-back-ios" />
      Back to previous
    </div>
    <div class="h-full flex items-center px-4 justify-between">
      <div>
        <h6
          @click="isOpenOption = !isOpenOption"
          class="relative flex cursor-pointer items-center gap-2 text-sm font-semibold px-4 py-1 border-strokeColor dark:border-slate-600 dark:text-slate-400 border rounded-full"
        >
          <Icon
            :name="
              colorMode.value == 'light'
                ? 'iconamoon:mode-dark-light'
                : 'iconamoon:mode-light'
            "
          />
          <span>{{
            colorMode.value == "light" ? "Light Mode" : "Dark Mode"
          }}</span>
        </h6>
        <ul
          v-if="isOpenOption"
          class="absolute z-50 top-16 right-10 p-4 space-y-4 border border-strokeColor w-48 bg-white dark:bg-bgDarkColor dark:border-slate-600 dark:text-slate-500"
        >
          <li
            @click="colorMode.preference = 'system'"
            class="cursor-pointer hover:underline"
          >
            System
          </li>
          <li
            @click="colorMode.preference = 'dark'"
            class="cursor-pointer hover:underline"
          >
            Dark
          </li>
          <li
            @click="colorMode.preference = 'light'"
            class="cursor-pointer hover:underline"
          >
            Light
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = ref(useColorMode());
const isOpenOption = ref(false);
function goBack() {
  history.back(); // Simulate a back button click
}
</script>
