<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="max-w-sm bg-white rounded-xl shadow-2xl shadow-slate-900 dark:bg-gray-800 w-[18rem] m-auto h-full items-stretch flex flex-col"
  >
    <a href="#">
      <img class="rounded-t-xl" :src="imageSrc" alt="" />
    </a>
    <div class="p-5 flex flex-1 flex-col justify-between">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <slot name="title"></slot>
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <slot name="description"> </slot>
      </p>
      <div class="flex  justify-center">
        <template v-if="$slots['button-edit']">
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-16 mx-auto mr-2"
          @click="$emit('edit')"
        >
          <slot name="button-edit"></slot>
        </a>
      </template>
      <template v-if="$slots['button-delete']">
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-16 mx-auto"
          @click="$emit('delete')"
        >
          <slot name="button-delete"></slot>
        </a>
      </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageSrc: {
    type: String,
    required: true
  }
})
</script>
