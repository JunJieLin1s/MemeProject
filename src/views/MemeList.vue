<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchMemes } from '@/api/memeAPI'
import type { Meme } from '@/api/memeAPI'
import Card from 'primevue/card'
import Image from 'primevue/image'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'

const memes = ref<Meme[]>([])
const loading = ref<boolean>(true)
const router = useRouter()

onMounted(async () => {
  try {
    memes.value = await fetchMemes()
  } catch (error) {
    console.error('Error fetching memes:', error)
  } finally {
    loading.value = false
  }
})

// Navigate to meme creation page with selected meme
const selectMeme = (meme: Meme) => {
  router.push({ path: '/create', query: { memeId: meme.id } })
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-6">📸 Beschikbare Memes</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="shadow-md rounded-lg p-4">
        <Skeleton width="100%" height="200px" class="mb-3" />
        <Skeleton width="80%" height="20px" class="mb-2" />
        <Skeleton width="50%" height="20px" />
      </div>
    </div>

    <!-- Meme List -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="meme in memes"
        :key="meme.id"
        class="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
        @click="selectMeme(meme)"
      >
        <template #header>
          <Image
            :src="meme.url"
            alt="Meme"
            class="w-full justify-center h-48 object-cover rounded-t-lg"
            preview
          />
        </template>
        <template #title>
          <h3 class="text-lg font-semibold text-gray-900 text-center">{{ meme.name }}</h3>
        </template>
        <template #footer>
          <div class="p-4 flex justify-center">
            <Button
              label="Maak Meme"
              icon="pi pi-pencil"
              class="p-button-outlined p-button-primary"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
