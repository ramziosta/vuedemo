<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, RouterLink, useRouter} from "vue-router";
import axios from "axios";
import {useToast} from "vue-toastification";
const route =  useRoute();
const router = useRouter();

const toast = useToast();

const jobId =  route.params.id;

defineProps({
  item:{
    type: Object,
    required: true
  }
})
const state = reactive({
  singleListing:{},
  isLoading: true,
  error: null
});

const deleteData = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this data?');
      if(confirm){
      await axios.delete(`/api/traders/${jobId}`);
      toast.success('Data deleted successfully');
      await router.push('/data');}
    } catch (error) {
      console.error(error);
      toast.error('Error deleting data');
    }
}
onMounted(async () => {
  try {
    const response = await axios.get(`/api/traders/${jobId}`);
    console.log('Response data:', response.data); // Add this line
    state.singleListing = response.data;
  } catch (error) {
    console.error(error);
  }
  finally {
    state.isLoading = false;
  }
})
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
          to="/data"
          class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="pi pi-arrow-left pr-2 "></i> Back to trader's listings
      </RouterLink>
    </div>
  </section>

  <section class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{state.singleListing.type}}</div>
            <h1 class="text-3xl font-bold mb-4">{{state.singleListing.name}}</h1>
            <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                  class="pi pi-map-marker text-lg text-orange-700 mr-2"
              ></i>
              <p class="text-orange-700">{{state.singleListing.location}}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Trader's Bio
            </h3>

            <p class="mb-4">
              {{state.singleListing.description}}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{state.singleListing.salary}} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
         <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{state.singleListing.company?.name}}</h2>

            <p class="my-2">
              {{state.singleListing.company?.description}}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{state.singleListing.company?.contactEmail}}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{state.singleListing.company?.contactPhone}}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Trader Listing</h3>
            <RouterLink
                :to="`/data/edit/${state.singleListing.id}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >Edit Trader</RouterLink
            >
            <button
                @click="deleteData"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Trader
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>