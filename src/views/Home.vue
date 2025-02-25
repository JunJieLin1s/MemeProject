<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

// Functie om door te linken naar de meme creator
const goToCreateMeme = () => {
  router.push('/create')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-black-500">
    <section class="flex flex-col items-center text-center py-20 px-6">
      <h1 class="text-4xl md:text-5xl font-bold">
        Welkom bij de <span class="text-yellow-400">Meme Generator</span> 🎭
      </h1>
      <p class="text-lg text-gray-400 mt-4">Maak, bekijk en deel de grappigste memes met gemak!</p>
      <Button
        label="🎨 Maak een Meme"
        icon="pi pi-palette"
        class="mt-6 btn-primary"
        @click="goToCreateMeme"
      />
    </section>

    <section class="py-16 px-6">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">🔥 Wat kun je hier doen?</h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="feature-card">
          <i class="pi pi-image text-yellow-400 text-5xl"></i>
          <h3 class="text-xl font-semibold mt-4">Bekijk Memes</h3>
          <p class="text-gray-400 mt-2">
            Scroll door een verzameling hilarische memes gemaakt door anderen.
          </p>
        </div>
        <div class="feature-card">
          <i class="pi pi-palette text-yellow-400 text-5xl"></i>
          <h3 class="text-xl font-semibold mt-4">Maak Memes</h3>
          <p class="text-gray-400 mt-2">
            Gebruik onze makkelijke editor om je eigen memes te maken.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
