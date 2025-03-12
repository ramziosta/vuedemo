<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h2 class="text-xl font-bold">{{ item.name }}</h2>
    <p class="text-gray-600 text-sm mt-2" >{{ item.description }} </p>
    <p class="text-gray-600">{{ item.type }}</p>
    <div class="flex items-center mb-4">
      <i class="pi pi-map-marker text-orange-500 pr-1"></i>
      <p class="text-blue-600 ">{{ item.location }}</p>
    </div>


    <RouterLink :to="`/data/${item.id}`" class="h-[36px] bg-green-500 hover:bg-green-600 text-white rounded-lg text-center text-sm mt-4 px-4 py-2 ">View</RouterLink>
  </div>
</template>

<style scoped>

</style>