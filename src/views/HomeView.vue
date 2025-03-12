<script setup>
import DataCards from "@/components/DataCards.vue";
import Hero from "@/components/Hero.vue";
import FetchedData from "@/components/FetchedData.vue";
import Market from "@/components/Market.vue";
</script>

<template>
  <Hero title="Data Dashboard" description="Fast visualization from the Database"/>
  <DataCards />
  <Market />
  <FetchedData  :limit="4" :showButton="true"/>
</template>

<style scoped>

</style>