<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <nav class="bg-gray-600 p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold">Meme Generator</h1>

        <div class="flex space-x-4">
          <RouterLink to="/" class="nav-link">🏠 Home</RouterLink>
          <RouterLink to="/memes" class="nav-link">🖼 Bekijk Memes</RouterLink>
          <RouterLink to="/create" class="nav-link">🎨 Maak een Meme</RouterLink>
        </div>
      </div>
    </nav>

    <div class="container mx-auto mt-6 p-6 bg-white shadow-lg rounded-md">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
