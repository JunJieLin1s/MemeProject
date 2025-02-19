<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchMemes, createMeme } from '@/api/memeAPI'
import type { Meme } from '@/api/memeAPI'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Image from 'primevue/image'

const memes = ref<Meme[]>([])
const selectedMeme = ref<Meme | null>(null)
const topText = ref('')
const bottomText = ref('')
const generatedMeme = ref<string | null>(null)

onMounted(async () => {
  try {
    memes.value = await fetchMemes()
  } catch (error) {
    console.error(error)
  }
})

const handleCreateMeme = async () => {
  if (!selectedMeme.value) {
    console.error('Geen meme geselecteerd!')
    return
  }

  try {
    generatedMeme.value = await createMeme(selectedMeme.value.id, topText.value, bottomText.value)
  } catch (error) {
    console.error('Fout bij het genereren van de meme:', error)
  }
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-gray-800">🎨 Maak een Meme</h2>

    <Dropdown
      v-model="selectedMeme"
      :options="memes"
      optionLabel="name"
      placeholder="Kies een meme"
      class="w-full mt-4 p-inputtext-lg"
    />

    <div v-if="selectedMeme" class="mt-4 flex justify-center">
      <Image :src="selectedMeme.url" alt="Meme" width="300" preview class="rounded-lg shadow-md" />
    </div>

    <div class="mt-4">
      <label class="text-gray-700 font-medium">Bovenste tekst</label>
      <InputText
        v-model="topText"
        placeholder="Voer bovenste tekst in"
        class="w-full p-inputtext-lg"
      />

      <label class="text-gray-700 font-medium mt-2 block">Onderste tekst</label>
      <InputText
        v-model="bottomText"
        placeholder="Voer onderste tekst in"
        class="w-full p-inputtext-lg"
      />
    </div>

    <div class="flex justify-center mt-6">
      <Button
        label="Genereer Meme"
        @click="handleCreateMeme"
        class="p-button-lg p-button-success"
      />
    </div>

    <div v-if="generatedMeme" class="mt-6 text-center">
      <h3 class="text-lg font-medium">🎉 Je gegenereerde meme is opgeslagen!</h3>
      <Image
        :src="generatedMeme"
        alt="Gegenereerde Meme"
        width="350"
        preview
        class="rounded-lg shadow-lg mx-auto"
      />
      <p class="text-green-600 font-semibold mt-2">De meme is opgeslagen in je account!</p>
    </div>

    <div class="flex justify-center mt-6">
      <Button label="Sluiten" @click="$emit('close')" class="p-button-danger p-button-lg" />
    </div>
  </div>
</template>
