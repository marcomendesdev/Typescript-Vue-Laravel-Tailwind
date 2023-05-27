<template>
  <div class="relative">
    <div
      class="sticky top-0 h-screen flex flex-col items-center justify-center bg-img bg-opacity-75 text-white"
    >
      <h2 class="text-4xl">The First Title</h2>
      <p>Scroll Down</p>
      <RouterView />
    </div>
    <div
      class="sticky top-0 h-screen flex flex-col items-center justify-center bg-img2 bg-opacity-75 text-white"
    >
      <h2 class="text-4xl">The Second Title</h2>
      <p>Scroll Down</p>
    </div>
    <div
      class="sticky top-0 h-screen flex flex-col items-center justify-center bg-img3 bg-opacity-75 text-white"
    >
      <h2 class="text-4xl">The Third Title</h2>
      <p>Scroll Down</p>
    </div>
    <div
      class="sticky top-0 h-screen flex flex-col items-center justify-center bg-img4 bg-opacity-75 text-white"
    >
      <h2 class="text-4xl">The Fourth Title</h2>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.bg-img {
  background-image: url('https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover; /* Adjust this based on your needs */
  background-position: center center; /* Adjust this based on your needs */
}
.bg-img2 {
  background-image: url('https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover; /* Adjust this based on your needs */
  background-position: center center; /* Adjust this based on your needs */
}
.bg-img3 {
  background-image: url('https://images.pexels.com/photos/355904/pexels-photo-355904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover; /* Adjust this based on your needs */
  background-position: center center; /* Adjust this based on your needs */
}
.bg-img4 {
  background-image: url('https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover; /* Adjust this based on your needs */
  background-position: center center; /* Adjust this based on your needs */
}
</style>
