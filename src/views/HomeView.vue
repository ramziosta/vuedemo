<script setup>
import DataCards from "@/components/DataCards.vue";
import Hero from "@/components/Hero.vue";
import FetchedData from "@/components/FetchedData.vue";
</script>

<template>
  <Hero title="Data Dashboard" description="Fast visualization from the Database"/>
  <DataCards />
  <FetchedData  :limit="2" :showButton="true"/>
</template>

<style scoped>

</style>