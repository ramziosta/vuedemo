<script setup>
import Card from "./Card.vue";
import {RouterLink} from "vue-router";
defineProps({
  title:{
    type: String,
    default: () => {
      return 'Vue Data Dashboard'
    }
  } ,
  description: {
    type: String,
    default: () => {
      return 'Displayed easily and quickly from our API'
    }
  } ,
  image: String,
});

</script>

<template>
  <section class="bg-blue-50 py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">For Employees</h2>
          <p class="mt-2 mb-4">
            Browse our Data and start your work today
          </p>
          <RouterLink
              to="/data"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Browse Data
          </RouterLink>
        </Card>
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">For Managers</h2>
          <p class="mt-2 mb-4">
            Add more data to your dashboard
          </p>
          <RouterLink
              to="/data/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Add Data
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>