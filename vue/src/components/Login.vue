<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form
    class="justify-center items-center w-90 shadow rounded-lg bg-white px-6 flex flex-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/6 m-8"
    @submit.prevent="login"
  >
    <h2 class="text-2xl my-4 text-blue-950">Log in</h2>
    <div class="w-full p-2 justify-start flex flex-col">
      <p v-if="err" class="bg-red-500 rounded text-center p-1">{{ err }}</p>
      <div class="mt-4 flex flex-row">
        <span
          class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          mode="render"
          block=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
            <path
              d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <input
          v-model="email"
          type="email"
          class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
          placeholder="Email address"
          required="false"
        />
      </div>

      <div class="my-4 flex flex-row">
        <span
          class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          mode="render"
          block=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
            <path
              d="M280-412q-28 0-48-20t-20-48q0-28 20-48t48-20q28 0 48 20t20 48q0 28-20 48t-48 20Zm0 172q-100 0-170-70T40-480q0-100 70-170t170-70q72 0 126 34t85 103h344q6 0 11 2t10 7l82 82q5 5 7 10.5t2 11.5q0 6-2.5 11t-7.5 10L812-334q-4 4-9 6t-10 2q-5 0-9.5-1t-9.5-4l-69-50-70 51q-4 3-8.5 4t-9.5 1q-5 0-9.5-1.5T599-331l-57-46h-51q-25 60-78.5 98.5T280-240Zm0-60q58 0 107-38.5t63-98.5h114l54 45q-1 0 0 0h.5-.5l88-63 82 62h-.5.5l85-79 .5.5-.5-.5h.5-.5l-51-51H450q-12-56-60-96.5T280-660q-75 0-127.5 52.5T100-480q0 75 52.5 127.5T280-300Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <input
          v-model="password"
          type="password"
          class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
          placeholder="Password"
          required="false"
        />
      </div>

      <button
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 my-4 w-full"
        type="submit"
      >
        Log in
      </button>
      <div class="justify-center items-center w-full flex flex-col">
        <p class="m-2 text-blue-950">
          Don't have an account yet?
          <RouterLink class="text-blue-600 font-semibold" to="/signup">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/store'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const err = ref('')

const login = () => {
  const payload = {
    email: email.value,
    password: password.value
  }

  appStore.userLogin(payload).then(() => {   
    router.push('/dashboard')
  }).catch((error) => {
    console.log('Err:', error)
    err.value = error
  })
}
</script>
