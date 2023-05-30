<template>
  <form
    class="justify-center items-center w-90 mx-auto shadow rounded-lg bg-white px-6 flex flex-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/6 m-8"
    @submit.prevent="signup"
  >
    <h2 class="text-2xl my-4 text-blue-950">Add new item</h2>
    <div class="w-full p-2 justify-start flex flex-col">
      <div class="flex flex-row">
        <span
          class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          mode="render"
          block=""
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M450-320v-260H330v-60h300v60H510v260h-60ZM40-40v-213h79v-454H40v-213h213v79h454v-79h213v213h-79v454h79v213H707v-79H253v79H40Zm213-139h454v-74h74v-454h-74v-74H253v74h-74v454h74v74ZM100-767h93v-93h-93v93Zm667 0h93v-93h-93v93Zm0 667h93v-93h-93v93Zm-667 0h93v-93h-93v93Zm667-667Zm0 574Zm-574 0Zm0-574Z" fill="currentColor"/></svg>
        </span>
        <input
          v-model="name"
          type="text"
          class="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1 text-slate-600"
          required="false"
          placeholder="Title"
        />
      </div>

      <div class="mt-4 flex flex-row">
        <span
          class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          mode="render"
          block=""
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z" fill="currentColor"/></svg>
        </span>
        <input
          v-model="description"
          type="text"
          class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
          placeholder="Description"
          required="false"
        />
      </div>

      <div class="my-4 flex flex-row">
        <span
          class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          mode="render"
          block=""
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z" fill="currentColor"/></svg>
        </span>
        <input
          v-model="image"
          type="url"
          class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
          placeholder="Image"
          required="false"
        />
      </div>

      <button
        type="submit"
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 my-4 w-full"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosClient from '@/axiosClient';
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const description = ref('')
const image = ref('')
const id = ref('')

const signup = () => {
  const payload = {
    name: name.value,
    description: description.value,
    image: image.value,
    user_id: id.value,
    price: 0,
  }

  axiosClient.post(`/add-new-product/${id.value}`, payload).then((res) => {
    console.log(res.data);
  }).then(() => {
    router.push('/')
  })
}

onMounted(() => {
  axiosClient.get('/user').then((res) => {
    console.log(res.data.id);
    id.value = res.data.id
  })
})
</script>
