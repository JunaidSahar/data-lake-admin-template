<template>
  <div
    class="md:flex flex-col md:flex-row md:min-h-screen border-r border-strokeColor bg-white dark:bg-bgDarkColor dark:border-slate-800"
  >
    <div class="flex flex-col w-full flex-shrink-0">
      <nav
        class="flex-grow md:flex flex-col justify-between px-7 pb-4 md:pb-0 md:overflow-y-auto space-y-3"
      >
        <div class="space-y-3" v-if="paymentNavlinks">
          <NuxtLink
            to="/"
            class="text-lg font-semibold uppercase text-primaryDark dark:text-slate-300"
            >Al Baseer</NuxtLink
          >
          <h3 class="font-semibold text-headingColor dark:text-slate-400 pt-2">
            Payment
          </h3>
          <NuxtLink
            v-for="(links, index) in paymentNavlinks"
            :key="index"
            class="flex items-center text-sm gap-2 px-2 py-2 mt-2 text-paragraphColor dark:text-slate-500 font-medium focus:bg-primaryLight text-smokyGrey focus:text-primaryDark"
            :to="links.path"
          >
            <Icon :name="links.image" />
            {{ links.name }}
          </NuxtLink>
          <h3 class="font-semibold text-headingColor pt-5 dark:text-slate-400">
            Users
          </h3>
          <NuxtLink
            v-for="(links, index) in userNavlinks"
            :key="index"
            class="flex items-center text-sm gap-2 px-2 py-2 mt-2 text-paragraphColor dark:text-slate-500 font-medium focus:bg-primaryLight text-smokyGrey focus:text-primaryDark"
            :to="links.path"
          >
            <Icon :name="links.image" />
            {{ links.name }}
          </NuxtLink>
          <h3 class="font-semibold text-headingColor pt-5 dark:text-slate-400">
            Marketing
          </h3>
          <NuxtLink
            v-for="(links, index) in marketingNavlinks"
            :key="index"
            class="flex items-center text-sm gap-2 px-2 py-2 mt-2 text-paragraphColor dark:text-slate-500 font-medium focus:bg-primaryLight text-smokyGrey focus:text-primaryDark"
            :to="links.path"
          >
            <Icon :name="links.image" />
            {{ links.name }}
          </NuxtLink>
          <h3 class="font-semibold text-headingColor pt-5 dark:text-slate-400">
            Security
          </h3>
          <NuxtLink
            v-for="(links, index) in securityNavlinks"
            :key="index"
            class="flex items-center text-sm gap-2 px-2 py-2 mt-2 text-paragraphColor dark:text-slate-500 font-medium focus:bg-primaryLight text-smokyGrey focus:text-primaryDark"
            to="#"
          >
            <Icon :name="links.image" />
            {{ links.name }}
          </NuxtLink>
          <h3 class="font-semibold text-headingColor pt-5 dark:text-slate-400">
            Other
          </h3>
          <NuxtLink
            v-for="(links, index) in otherNavlinks"
            :key="index"
            class="flex items-center text-sm gap-2 px-2 py-2 mt-2 text-paragraphColor dark:text-slate-500 font-medium focus:bg-primaryLight text-smokyGrey focus:text-primaryDark"
            to="#"
          >
            <Icon :name="links.image" />
            {{ links.name }}
          </NuxtLink>
        </div>
        <div v-else class="py-12 space-y-8">
          <div v-for="(item, index) in 6" class="space-y-4" :key="index">
            <p
              class="w-28 h-5 dark:bg-slate-700 bg-strokeColor animate-pulse"
            ></p>
            <p
              :style="`width:${Math.ceil((Math.random() + 1) * 100)}px;`"
              class="h-3 dark:bg-slate-700 bg-strokeColor animate-pulse"
              v-for="(item, index) in 3"
              :key="index"
            ></p>
          </div>
        </div>
        <div
          class="py-12 border-t flex items-center gap-2 border-strokeColor dark:border-slate-800"
        >
          <!-- <p class="h-12 w-12 capitalize flex items-center justify-center text-lg font-semibold bg-primaryLight">{{userStore?.email[0]}}</p> -->
          <div>
            <p class="font-medium text-paragraphColor dark:text-slate-400">
              {{ userStore.email }}
            </p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { getCookie } from "@/mixins/cookies";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
const config = useRuntimeConfig();
let x = "Bearer ";
let y = getCookie("access_token");
const userStore = useUserStore().user;
const colorMode = useColorMode().preference;

const paymentNavlinks = ref();
const userNavlinks = ref();
const marketingNavlinks = ref();
const securityNavlinks = ref();
const otherNavlinks = ref();

axios
  .get(config.public.API_BASE_URL + `user/navbar/`, {
    headers: {
      Authorization: x + y,
    },
  })
  .then((res) => {
    const responseData = res.data;
    paymentNavlinks.value = responseData.filter(
      (filter) =>
        filter.name.toLowerCase().includes("payments") ||
        filter.name.toLowerCase().includes("access")
    );
    userNavlinks.value = responseData.filter(
      (filter) =>
        filter.name.toLowerCase().includes("users") ||
        filter.name.toLowerCase().includes("leads")
    );
    marketingNavlinks.value = responseData.filter(
      (filter) =>
        filter.name.toLowerCase().includes("campaign") ||
        filter.name.toLowerCase().includes("adverts")
    );
    securityNavlinks.value = responseData.filter((filter) =>
      filter.name.toLowerCase().includes("secops")
    );
    otherNavlinks.value = responseData.filter(
      (filter) =>
        filter.name.toLowerCase().includes("trainer") ||
        filter.name.toLowerCase().includes("product")
    );
  });
</script>
