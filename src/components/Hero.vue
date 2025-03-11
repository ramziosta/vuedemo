<script setup>

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
  <section class="bg-green-700 py-20">
    <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <h1
            class="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        >
          {{ title }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>