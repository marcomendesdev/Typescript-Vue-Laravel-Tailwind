<template>
    <div>
      <ul class="flex list-none p-0">
        <li
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ 'text-blue-600': pageNumber === currentPage }"
          class="cursor-pointer"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    data: {
      type: Array as () => unknown[],
      required: true,
    },
  });
  
  const emits = defineEmits(['pagination-change-page']);
  
  const currentPage = ref(1);
  
  const changePage = (pageNumber: number) => {
    currentPage.value = pageNumber;
    emits('pagination-change-page', pageNumber);
  };
  
  const totalPages = computed(() => {
    return Math.ceil(props.data.length / 10); // Change the number 10 to the desired number of products per page (should match the one used in Laravel)
  });
  </script>
  
  <style scoped>
  li {
    display: inline-block;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  </style>
  