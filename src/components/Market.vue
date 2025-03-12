<script setup>
import { onMounted, reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const state = reactive({
  exchange: {},
  isLoading: true,
  error: null,
  highlightCurrencies: ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY']
});

const topCurrencies = computed(() => {
  if (!state.exchange.conversion_rates) return [];

  return Object.entries(state.exchange.conversion_rates)
      .filter(([currency]) => state.highlightCurrencies.includes(currency))
      .sort((a, b) => a[1] - b[1]);
});

const lastUpdated = computed(() => {
  if (!state.exchange.time_last_update_utc) return '';

  const date = new Date(state.exchange.time_last_update_utc);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/796aa25dc4cf66a414ce3ea2/latest/USD`);
    state.exchange = response.data;
  } catch (error) {
    console.error(error);
    state.error = "Failed to load exchange rates";
  } finally {
    state.isLoading = false;
  }
});

const getTrendClass = (rate) => {
  const random = Math.random();
  if (random > 0.6) return 'text-green-500';
  if (random < 0.4) return 'text-red-500';
  return 'text-gray-500';
};

const getTrendIcon = (rate) => {
  const random = Math.random();
  if (random > 0.6) return '↑';
  if (random < 0.4) return '↓';
  return '―';
};

const formatRate = (rate) => {
  return rate.toFixed(4);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 cursor-pointer ">
    <!-- Header -->
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-semibold text-gray-800 m-auto">Exchange Rates</h3>
      <div class="flex items-center">
        <span v-if="!state.isLoading" class="text-xs text-gray-500">{{ lastUpdated }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="state.isLoading" class="py-8 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Error State -->
    <div v-else-if="state.error" class="py-4 text-center text-red-500">
      {{ state.error }}
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Base Currency Info -->
      <div class="mb-3 bg-blue-50 rounded-md p-2 flex justify-between items-center">
        <div>
          <span class="text-xs text-gray-500">Base Currency</span>
          <div class="font-bold text-gray-800">USD</div>
        </div>
        <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          $
        </div>
      </div>

      <!-- Currency Grid -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div v-for="[currency, rate] in topCurrencies" :key="currency"
             class="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors duration-200">
          <div class="flex justify-between">
            <span class="font-bold text-gray-800">{{ currency }}</span>
            <span :class="getTrendClass(rate)" class="text-sm font-medium">{{ getTrendIcon(rate) }}</span>
          </div>
          <div class="text-lg font-medium mt-1">{{ formatRate(rate) }}</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="pt-2 border-t border-gray-100 text-center">
        <RouterLink to="/APIView" class="text-blue-500 text-lg font-bold flex items-center justify-center">
          View full analysis
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>