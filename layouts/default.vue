<template>
  <div class="bg-white dark:bg-bgDarkColor min-h-screen">
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <Icon name="ic:twotone-menu" />
    </button>

    <aside
      id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
      aria-label="Sidebar"
    >
      <div
        class="h-full py-4 overflow-y-auto bg-white dark:bg-bgDarkColor sideNav"
      >
        <Navbar />
      </div>
    </aside>

    <div class="md:ml-64">
      <TopNavbar />
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "~~/stores/userStore";

const userStore = useUserStore();
const router = useRouter();
if (!userStore.isAuthenticated) {
  router.push("/auth/sign-in?redirect=/");
}
</script>

<style>
body::-webkit-scrollbar {
  width: 0.3em;
}

body::-webkit-scrollbar-track {
  background-color: #e6e6e9;
}

body::-webkit-scrollbar-thumb {
  background-color: #9999a1;
}
.sideNav::-webkit-scrollbar-thumb {
  background-color: #9999a1;
}

.sideNav::-webkit-scrollbar {
  width: 0.3em;
}

.sideNav::-webkit-scrollbar-track {
  background-color: #e6e6e9;
}

input[type="range"]::-webkit-slider-thumb {
  /* Styles for the thumb */
  appearance: none; /* Remove the default styling */
  width: 16px; /* Adjust the width of the thumb */
  height: 16px; /* Adjust the height of the thumb */
  background-color: #6b7280; /* Change this to the desired thumb color */
  border-radius: 50%; /* Make the thumb a circle */
  border: none; /* Remove any borders */
  cursor: pointer; /* Change the cursor to a pointer */
  transition: background-color 0.3s; /* Add a transition effect for smooth changes */
}

/* Adjust the thumb color when the slider is active */
input[type="range"]:active::-webkit-slider-thumb {
  background-color: #4b5563; /* Change this to the desired thumb color on active state */
}

input[type="range"]::-webkit-slider-thumb {
  /* Styles for the thumb */
  appearance: none; /* Remove the default styling */
  width: 16px; /* Adjust the width of the thumb */
  height: 16px; /* Adjust the height of the thumb */
  background-color: #6b7280; /* Change this to the desired thumb color */
  border-radius: 50%; /* Make the thumb a circle */
  border: none; /* Remove any borders */
  cursor: pointer; /* Change the cursor to a pointer */
  transition: background-color 0.3s; /* Add a transition effect for smooth changes */
}
</style>
