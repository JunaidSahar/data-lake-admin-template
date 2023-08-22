<template>
  <div
    class="flex h-screen items-center justify-center bg-cover w-full bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/auth-background.jpg')]"
  >
    <div class="max-w-4xl bg-white p-8 text-headingColor">
      <h2 class="text-2xl font-semibold">Sign in</h2>
      <p class="text-paragraphColor">Please enter your account details</p>
      <form @submit.prevent="login" class="pt-12">
        <div v-for="(field, index) in inputFields" :key="index">
          <label class="block mb-2 text-sm">{{ field.label }}</label>
          <div class="relative mb-6">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
            >
              <Icon :name="field.icon" class="mt-1" />
            </div>
            <input
              :type="field.type"
              class="bg-gray-50 border border-strokeColor text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="field.placeholder"
              v-model="field.value"
            />
          </div>
        </div>
        <button class="bg-paragraphColor px-5 py-2 text-white">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import axios from "axios";
import { setCookie } from "@/mixins/cookies";
import { useUserStore } from "~~/stores/userStore";
definePageMeta({
  layout: "auth",
});

const inputFields = ref([
  {
    name: "email",
    value: "",
    label: "Enter your email address",
    type: "email",
    placeholder: "name@demo.com",
    icon: "ic:round-mail-outline",
  },
  {
    name: "email",
    value: "",
    type: "password",
    label: "Enter your password",
    placeholder: "*****",
    icon: "solar:lock-password-broken",
  },
]);
const config = useRuntimeConfig().public.API_BASE_URL;

function login() {
  let data = {
    email: inputFields.value[0].value,
    password: inputFields.value[1].value,
  };
  console.log(data);
  axios(config + "user/login/", {
    // withCredentials: true,
    method: "post",
    data: data,
  })
    .then((res) => {
      console.log(res);
      useUserStore().isAuthenticated = true;
      useUserStore().user = res.data.user;
      setCookie("access_token", res.data.access_token, 7);
      setCookie("refresh_token", res.data.refresh_token, 365);
      useRouter().push("/");
      Swal.fire({
        icon: "success",
        title: "Signed in",
        text: res.data.message,
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.data.err,
      });
    });
}
</script>
