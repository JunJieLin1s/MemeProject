<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchMemes, createMeme } from '@/api/memeAPI'
import type { Meme } from '@/api/memeAPI'
import Dropdown from 'primevue/Dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Image from 'primevue/image'

const memes = ref<Meme[]>([])
const selectedMeme = ref<Meme | null>(null)
const texts = ref<string[]>([]) // Dynamische array voor alle invoervelden
const generatedMeme = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  try {
    memes.value = await fetchMemes()
  } catch (error) {
    console.error('Fout bij het ophalen van memes:', error)
    errorMessage.value = 'Kan geen memes laden. Probeer het later opnieuw.'
  }
})

// Wanneer er een meme wordt geselecteerd, initialiseert de texts array met lege strings
watch(selectedMeme, (newMeme) => {
  if (newMeme) {
    texts.value = new Array(newMeme.box_count).fill('')
  }
})

const handleCreateMeme = async () => {
  if (!selectedMeme.value) {
    errorMessage.value = 'Je moet eerst een meme kiezen!'
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    generatedMeme.value = await createMeme(selectedMeme.value.id, texts.value)
  } catch (error) {
    console.error('Fout bij het genereren van de meme:', error)
    errorMessage.value = 'Meme genereren mislukt. Probeer opnieuw!'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-gray-800">🎨 Maak een Meme</h2>

    <div v-if="errorMessage" class="text-red-500 text-center mt-4">
      {{ errorMessage }}
    </div>

    <div v-if="selectedMeme" class="mt-4 flex justify-center">
      <Image :src="selectedMeme.url" alt="Meme" width="300" preview class="rounded-lg shadow-md" />
    </div>

    <div class="mt-4">
      <!-- Dynamisch gegenereerde invoervelden -->
      <div v-for="(text, index) in texts" :key="index" class="mb-3">
        <label class="text-gray-700 font-medium">Tekst {{ index + 1 }}</label>
        <InputText
          v-model="texts[index]"
          :placeholder="`Voer tekst ${index + 1} in`"
          class="w-full p-inputtext-lg"
        />
      </div>
    </div>

    <div class="">
      <Dropdown
        v-model="selectedMeme"
        :options="memes"
        optionLabel="name"
        placeholder="Kies een meme"
        class="w-full mt-6"
      />
    </div>

    <div class="flex justify-center mt-6">
      <Button
        :label="isLoading ? 'Meme Genereren...' : 'Genereer Meme'"
        :disabled="isLoading"
        @click="handleCreateMeme"
        class="p-button-lg p-button-success"
      />
    </div>

    <div v-if="generatedMeme" class="mt-6 text-center">
      <h3 class="text-lg font-medium">🎉 Je gegenereerde meme!</h3>
      <Image
        :src="generatedMeme"
        alt="Gegenereerde Meme"
        width="350"
        preview
        class="rounded-lg shadow-lg mx-auto"
      />
      <p class="text-green-600 font-semibold mt-2">Je meme is opgeslagen!</p>
    </div>
  </div>
</template>
