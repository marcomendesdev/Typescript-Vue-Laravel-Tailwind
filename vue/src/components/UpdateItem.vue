<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <form
                class="justify-center items-center w-90 shadow rounded-lg bg-white px-6 flex flex-col m-8"
                @submit.prevent="edit"
              >
                <h2 class="text-2xl my-4 text-blue-950">Edit item</h2>
                <div class="w-full p-2 justify-start flex flex-col">
                  <div class="mt-4 flex flex-row">
                    <span
                      class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
                      mode="render"
                      block=""
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        viewBox="0 -960 960 960"
                        width="28"
                      >
                        <path
                          d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="name"
                      type="text"
                      class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
                      placeholder="Title"
                      required="false"
                    />
                  </div>

                  <div class="my-4 flex flex-row">
                    <span
                      class="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
                      mode="render"
                      block=""
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        viewBox="0 -960 960 960"
                        width="28"
                      >
                        <path
                          d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="description"
                      type="text"
                      class="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 text-slate-600"
                      placeholder="Description"
                      required="false"
                    />
                  </div>

                  <button
                    class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 my-4 w-full"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axiosClient from '@/axiosClient'

const props = defineProps({
  show: Boolean,
  id: Number
})

// eslint-disable-next-line vue/no-dupe-keys
const { show } = toRefs(props)
const open = ref(false)

watch(show, () => {
  open.value = show.value
  console.log('id', props.id)
  console.log('show', show.value)
})

const name = ref('')
const description = ref('')

const edit = async () => {
  const { data } = await axiosClient.put(`/update-product/${props.id}`, {
    name: name.value,
    description: description.value
  })
  console.log('data', data)
  open.value = false
  location.reload()
}
</script>
