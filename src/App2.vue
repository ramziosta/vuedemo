<script>
export default {
  data() {
    return {
      name: 'Vue Dashboard',
      status : "error",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "Task 1 description",
          completed: false
        },
        {
          id: 2,
          title: "Task 2",
          description: "Task 2 description",
          completed: true
        },
        {
          id: 3,
          title: "Task 3",
          description: "Task 3 description",
          completed: false
        }
      ],
      links: [
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
      ],
      externalLink:"https://ramziosta.vercel.app",
    }
  },
  methods:{
    dataStatus: function(){
      if(this.status === "received"){
        this.status = "pending";
      }else if (this.status === "pending"){
        this.status = "received";
      }
      else if (this.status === "error"){
        this.status = "re-fetching";
      }
      else if (this.status === "re-fetching"){
        this.status = "received";
      }
    },
    dataStatus2(){
      this.status = "error";
    },
    dataStatus3(){
      this.status = "";
    }
  },
}
</script>

<template>
  <h1 >{{name}}</h1>
  <p v-if="status === 'received'">Data Received</p>
  <p v-else-if="status === 'pending'">Date Pending</p>
  <p v-else-if="status === 'error'">Error Retrieving Data</p>
  <p v-else-if="status === 're-fetching'">Re Fetching Data</p>
  <p v-else>No Data found</p>

  <h3>Data</h3>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <h3>{{task.title}}</h3>
      <p>{{task.description}}</p>
    </li>
  </ul>
  <a v-for="link in links" :key="link.id" :href="link.url"><ul><li>{{link.title}}</li></ul></a>
  <a :href="externalLink">Ramzi Osta</a>
  <br />
  <a href="https://linkedin.com/in/ramziosta">LinkedIn</a>
  <br />
  <button v-on:click="dataStatus">Data Status</button>
  <br />
  <button @click="dataStatus2">Error Data</button>
  <br />
  <button @click="dataStatus3">Delete Data</button>
</template>

<style>

</style>