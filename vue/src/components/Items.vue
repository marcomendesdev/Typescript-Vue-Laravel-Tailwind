<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="pagination flex items-center justify-center mt-6">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(1)"
        class="py-2 px-4 rounded bg-blue-500 text-white font-semibold mr-2"
      >
        First Page
      </button>
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="py-2 px-4 rounded bg-blue-500 text-white font-semibold mr-2"
      >
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="py-2 px-4 rounded bg-blue-500 text-white font-semibold mr-2"
      >
        Next
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(totalPages)"
        class="py-2 px-4 rounded bg-blue-500 text-white font-semibold mr-2"
      >
        Last Page
      </button>
      <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
    <div
      class="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10 py-10"
    >
      <Card v-for="product in displayedProducts" :key="product.id" :imageSrc="product.image">
        <template v-slot:title>{{ product.name }}</template>
        <template v-slot:description>{{ product.description }}</template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import { onMounted, ref, computed } from 'vue'
import axiosClient from '@/axiosClient'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface ResponseData {
  data: Product[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

const products = ref<Product[] | null>(null)
const currentPage = ref(1)
const totalPages = ref(0)

onMounted(() => {
  fetchProducts()
})

function fetchProducts() {
  axiosClient.get(`/all-products?page=${currentPage.value}`).then((response) => {
    const data = response.data as ResponseData
    products.value = data.data
    currentPage.value = data.meta.current_page
    totalPages.value = data.meta.last_page
    console.log('Current Page', data.meta.current_page)
    console.log('Last Page', data.meta.last_page)
    console.log('Total Products', data.meta.total)
    console.log('Data', data)

    console.log('Products', data.data)
  })
}

const displayedProducts = computed(() => {
  return products.value || []
})

function goToPage(page: number): void {
  currentPage.value = page
  fetchProducts()
}
</script>
