<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const showMore = ref(false);

const truncatedDescription = computed(() => {
  const fullDescription = props.item.description;
  if (fullDescription.length > 100 && !showMore.value) {
    return fullDescription.substring(0, 100) + '...';
  }
  return fullDescription;
});

const toggleFullDescription = () => {
  showMore.value = !showMore.value;
};

</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h2 class="text-xl font-bold">{{ item.title }}</h2>
    <p class="text-gray-600 text-sm mt-2" >{{ truncatedDescription }} </p>
    <button @click="toggleFullDescription" class="text-blue-500 hover:underline">{{showMore ? "Less" : "More"}}</button>
    <p class="text-gray-600">{{ item.type }}</p>
    <div class="flex items-center">
      <i class="pi pi-map-marker text-orange-500 pr-1"></i>
      <p class="text-blue-600">{{ item.location }}</p>
    </div>

    <p class="text-green-600">{{ item.salary }}</p>
    <p class="text-gray-600 text-bold">{{ item.company.name }}</p>
    <p class="text-gray-600">{{ item.company.description }}</p>
    <p class="text-gray-600">{{ item.company.contactEmail }}</p>
    <p class="text-gray-600">{{ item.company.contactPhone }}</p>
  </div>
</template>

<style scoped>

</style>