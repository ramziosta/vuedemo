<script setup>
import Data from '../Data.json'
import DataItem from './DataItem.vue';
import { ref , defineProps} from 'vue';
const data = ref(Data);
defineProps({
  limit: {
      type: Number,
      default: 3
  },
  showButton: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <h1 class="text-white bg-green-700 text-3xl font-bold flex justify-center py-10">Api-fetched Data</h1>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <DataItem v-for="item in data.slice(0,limit)" :key="item.id" :item="item" />
      </div>
    </div>

  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <a
        href="jobs.html"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >View All Jobs</a
    >
  </section>
</template>

<style scoped>

</style>