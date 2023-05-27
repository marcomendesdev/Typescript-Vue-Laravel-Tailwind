<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10 py-10"
  >
    <Card v-for="product in products" :key="product.id" :imageSrc="product.image">
      <template v-slot:title>{{ product.name }}</template>
      <template v-slot:description>{{ product.description }} </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import { onMounted, ref } from 'vue'
import axiosClient from '@/axiosClient'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const products = ref<Product[] | null>([])

onMounted(() => {
  axiosClient.get('/all-products').then((response) => {
    console.log(response)
    products.value = response.data.data as Product[]
  })
})
</script>

<style scoped></style>
