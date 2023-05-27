<template>
  <div
    class="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10 py-10"
  >
    <Card
      v-for="product in products"
      :key="product.id"
      :imageSrc="product.image"
      @delete="deleteProduct(product.id)"
      @edit="editProduct(product.id)"
    >
      <template v-slot:title>{{ product.name }}</template>
      <template v-slot:description>{{ product.description }} </template>
      <template v-slot:button-edit>Edit</template>
      <template v-slot:button-delete>Delete</template>
    </Card>
  </div>

  <UpdateItem :show="show" :id="id" />
</template>

<script setup lang="ts">
import Card from './Card.vue'
import UpdateItem from './UpdateItem.vue'
import { onMounted, ref } from 'vue'
import axiosClient from '@/axiosClient'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const products = ref<Product[]>([])

onMounted(() => {
  axiosClient.get('/user-products').then((response) => {
    console.log(response)
    products.value = response.data.data as Product[]
  })
})

const deleteProduct = (productId: number) => {
  axiosClient.delete(`/delete-product/${productId}`).then((response) => {
    const { data } = response
    console.log('Data:', data.message)
    alert(data.message)
    products.value = products.value?.filter((product) => product.id !== productId)
  })
}

const id = ref(0)
const show = ref(false)

const editProduct = (productId: number) => {
 show.value = !show.value
  id.value = productId
}
</script>
