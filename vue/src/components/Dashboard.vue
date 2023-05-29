<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex h-full relative">
    <!-- Sidebar drawer -->
    <div
      :class="sidebarClass"
      @transitionend="handleTransitionEnd"
      class="absolute inset-y-0 left-0 z-20 flex flex-col"
      id="sidebar"
    >
      <!-- Sidebar content goes here -->
      <button @click="toggleSidebar" class="p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div class="ml-8 mt-16">
        <nav>
          <ul>
            <li class="p-2 hover:bg-sky-700"><RouterLink @click.prevent="togs" to="/items">All items</RouterLink></li>
            <li class="p-2 hover:bg-sky-700"><RouterLink @click.prevent="togs" to="/user-items">My items</RouterLink></li>
            <li class="p-2 hover:bg-sky-700"><RouterLink @click.prevent="togs" to="/add-item">Add item</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-grow bg-gray-100 min-h-screen">
      <!-- Header -->
      <header class="bg-gray-800 p-4 shadow-lg shadow-gray-500 flex justify-between">
        <button @click.stop="toggleSidebar" class="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <h1 class="text-white text-lg font-bold m-auto">Dashboard</h1>
        <p @click="logout" class="text-white my-auto p-2 hover:bg-sky-700 cursor-pointer">
          Log out
        </p>
      </header>

      <!-- Content area -->
      <main class="p-4 relative z-10 flex flex-col justify-center">
        <!-- Main content goes here -->
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="bg-gray-500 w-full sticky top-[100vh] p-4 shadow">
        <!-- Footer content goes here -->
        <h1 class="text-white">Footer</h1>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/store'

const isSidebarOpen = ref(false)
const router = useRouter()
const appStore = useAppStore()

const toggleSidebar = (event: MouseEvent) => {
  event.stopPropagation()
  isSidebarOpen.value = !isSidebarOpen.value
}

const sidebarClass = computed(() => {
  return isSidebarOpen.value
    ? 'fixed inset-y-0 left-0 bg-gray-800 text-white w-44 flex-shrink-0 transition-transform transform translate-x-0 shadow-lg shadow-gray-500'
    : 'fixed inset-y-0 left-0 bg-gray-800 text-white w-44 flex-shrink-0 transition-transform transform -translate-x-full'
})

const togs = () => {
  isSidebarOpen.value = false
}

const handleTransitionEnd = () => {
  if (!isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
}

const logout = () => {
  appStore.logoutUser().then(() => {
    router.push('/login')
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  const sidebar = document.getElementById('sidebar')
  if (sidebar && !sidebar.contains(event.target as Node)) {
    isSidebarOpen.value = false
  }
}
</script>
