<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchMemes } from '@/api/memeAPI'
import type { Meme } from '@/api/memeAPI'
import Card from 'primevue/card'
import Image from 'primevue/image'

const memes = ref<Meme[]>([])
const loading = ref<boolean>(true)

onMounted(async () => {
  try {
    memes.value = await fetchMemes()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-gray-800">📸 Beschikbare Memes</h2>

    <p v-if="loading" class="text-gray-500 text-center mt-4">Memes worden geladen...</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <Card v-for="meme in memes" :key="meme.id" class="shadow-lg rounded-lg overflow-hidden">
        <template #header>
          <Image :src="meme.url" alt="Meme" class="w-full h-40 object-cover" preview />
        </template>
        <template #title>
          <h3 class="text-lg font-semibold text-gray-900">{{ meme.name }}</h3>
        </template>
      </Card>
    </div>
  </div>
</template>
