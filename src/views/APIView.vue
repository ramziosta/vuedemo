<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import axios from "axios";

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const state = reactive({
  exchange: {},
  isLoading: true,
  error: null,
  selectedCurrencies: ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'BRL'],
  baseCurrency: 'USD'
});

const currencyNames = {
  'USD': 'US Dollar',
  'EUR': 'Euro',
  'GBP': 'British Pound',
  'JPY': 'Japanese Yen',
  'CAD': 'Canadian Dollar',
  'AUD': 'Australian Dollar',
  'CNY': 'Chinese Yuan',
  'INR': 'Indian Rupee',
  'BRL': 'Brazilian Real'
};

const sortedRates = computed(() => {
  if (!state.exchange.conversion_rates) return [];

  return Object.entries(state.exchange.conversion_rates)
      .filter(([currency]) => state.selectedCurrencies.includes(currency))
      .sort((a, b) => a[1] - b[1]);
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/796aa25dc4cf66a414ce3ea2/latest/USD`);
    console.log('Exchange data:', response.data);
    state.exchange = response.data;
  } catch (error) {
    console.error(error);
    state.error = "Failed to load exchange rate data";
  } finally {
    state.isLoading = false;
  }
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(value);
};

const getPercentDifference = (rate) => {
  // Calculate how much stronger/weaker compared to base (1.0)
  return ((rate - 1) * 100).toFixed(2);
};
</script>

<template>
  <div class="exchange-rate-container">
    <h2>Exchange Rates (Base: {{ state.baseCurrency }})</h2>

    <div v-if="state.isLoading" class="loading">
      <p>Loading exchange rate data...</p>
    </div>

    <div v-else-if="state.error" class="error">
      <p>{{ state.error }}</p>
    </div>

    <div v-else class="exchange-data">
      <div class="info-panel">
        <p><strong>Base Currency:</strong> {{ currencyNames[state.baseCurrency] }}</p>
        <p><strong>Last Update:</strong> {{ new Date(state.exchange.time_last_update_utc).toLocaleString() }}</p>
      </div>

      <!-- Bar chart visualization -->
      <div class="chart-container">
        <div v-for="[currency, rate] in sortedRates" :key="currency" class="rate-bar">
          <div class="currency-info">
            <span class="currency-code">{{ currency }}</span>
            <span class="currency-name">{{ currencyNames[currency] || currency }}</span>
          </div>

          <div class="bar-container">
            <div class="bar-wrapper">
              <div class="bar" :style="{ width: `${Math.min(rate * 50, 100)}%` }"></div>
            </div>
            <div class="rate-value">{{ formatCurrency(rate) }}</div>
          </div>
        </div>
      </div>

      <!-- Currency comparison table -->
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>vs {{ state.baseCurrency }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="[currency, rate] in sortedRates" :key="currency">
            <td>
              <strong>{{ currency }}</strong>
              <span class="currency-name-small">{{ currencyNames[currency] || currency }}</span>
            </td>
            <td>{{ formatCurrency(rate) }}</td>
            <td :class="{ 'positive': rate > 1, 'negative': rate < 1 }">
              {{ rate > 1 ? '+' : '' }}{{ getPercentDifference(rate) }}%
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exchange-rate-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #e74c3c;
}

.info-panel {
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.chart-container {
  margin-bottom: 30px;
}

.rate-bar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.currency-info {
  width: 120px;
  text-align: right;
  padding-right: 15px;
}

.currency-code {
  font-weight: bold;
  font-size: 16px;
  display: block;
}

.currency-name {
  font-size: 12px;
  color: #666;
}

.bar-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.bar-wrapper {
  flex: 1;
  height: 20px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
}

.bar {
  height: 100%;
  background-color: #3498db;
  transition: width 0.5s ease;
}

.rate-value {
  width: 80px;
  font-size: 14px;
  text-align: right;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.currency-name-small {
  display: block;
  font-size: 12px;
  color: #666;
  font-weight: normal;
}

.positive {
  color: #27ae60;
  font-weight: bold;
}

.negative {
  color: #e74c3c;
  font-weight: bold;
}
</style>