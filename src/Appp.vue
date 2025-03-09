<script setup>
import {onMounted, ref} from 'vue';
import Navbar from "./components/Navbar.vue";
const name = ref('Vue Dashboard');
const status = ref("error");
const data = ref([
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    body: "text",
  },
  {
    userId: 2,
    id: 2,
    title: "Data 2",
    body: "text",
  },
  {
    userId: 3,
    id: 3,
    title: "Data 3",
    body: "text",
  }
]);
const newData = ref("");
const links = ref([
  {
    id: 1,
    title: "Link 1",
    url: "https://google.com"
  },
  {
    id: 2,
    title: "Link 2",
    url: "https://google.com"
  }
]);
const externalLink = ref("https://ramziosta.vercel.app");

const dataStatus = () => {
  if (status.value === "received") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "received";
  } else if (status.value === "error") {
    status.value = "re-fetching";
  } else if (status.value === "re-fetching") {
    status.value = "received";
  }
};
const dataStatus2 = () => {
  status.value = "error";
};
const dataStatus3 = () => {
  status.value = "";
};
const addData = () => {
  if (newData.value) {
    data.value.push({
      userId: data.value.length + 1,
      id: data.value.length + 1,
      title: newData.value,
      body: `${newData.value} body, id ${data.value.length + 1}`,
    });
    newData.value = "";
  }
};

const deleteDataId = ref(null);
const deleteData = () => {
  if (deleteDataId.value) {
    data.value = data.value.filter((task) => task.id !== parseInt(deleteDataId.value));
    deleteDataId.value = null;
  }
};
onMounted(
    async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        data.value = await response.json();
        data.value = data.value.map((item) => ({
          userId: item.userId,
          id: item.id,
          title: item.title,
          body: item.body,
        }));
        status.value = "received";

      } catch (error) {
        status.value = "error";
      }
    }
);
</script>

<template>
  <Navbar />
  <h1 class="text-3xl font-bold ">{{ name }}</h1>
  <p v-if="status === 'received'">Data Received</p>
  <p v-else-if="status === 'pending'">Date Pending</p>
  <p v-else-if="status === 'error'">Error Retrieving Data</p>
  <p v-else-if="status === 're-fetching'">Re Fetching Data</p>
  <p v-else>No Data found</p>

  <h3>Data</h3>
  <ul>
    <li v-for="task in data" :key="task.id">
      <p>User ID: {{ task.userId }}</p>
      <p>Post ID: {{ task.id }}</p>
      <h4>{{ task.title }}</h4>
      <p>{{ task.body }}</p>
    </li>
  </ul>
  <a v-for="link in links" :key="link.id" :href="link.url">
    <ul>
      <li>{{ link.title }}</li>
    </ul>
  </a>
  <a :href="externalLink">Ramzi Osta</a>
  <br/>
  <a href="https://linkedin.com/in/ramziosta">LinkedIn</a>
  <br/>
  <button v-on:click="dataStatus">Data Status</button>
  <br/>
  <button @click="dataStatus2">Error Data</button>
  <br/>
  <button @click="dataStatus3">Delete Data</button>

  <form @submit.prevent="addData">
    <label for="newData">New Data:</label>
    <input type="text" id="newData" v-model="newData" placeholder="Add Data">
    <button type="submit">Add Data</button>
  </form>
  <form @submit.prevent="deleteData">
    <label for="deleteData">Delete Data:</label>
    <input type="text" id="deleteData" v-model="deleteDataId" placeholder="Delete Data">
    <button type="submit">Delete Data</button>
  </form>

</template>

<style>

</style>
