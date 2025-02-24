<script setup lang="ts">
import 'primeicons/primeicons.css'
</script>
<template>
  <div class="min-h-screen text-gray-200">
    <!-- Navbar -->
    <nav class="bg-gray-800 p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-3xl font-bold flex items-center">
          <i class="pi pi-image mr-2"></i> Meme Generator
        </h1>

        <div class="flex space-x-4">
          <RouterLink to="/" class="nav-link"><i class="pi pi-home"></i> Home</RouterLink>
          <RouterLink to="/memes" class="nav-link"
            ><i class="pi pi-images"></i> Bekijk Memes</RouterLink
          >
          <RouterLink to="/create" class="nav-link"
            ><i class="pi pi-palette"></i> Maak een Meme</RouterLink
          >
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto mt-6 p-6 sshadow-lg rounded-md">
      <router-view></router-view>
    </div>
  </div>
</template>
