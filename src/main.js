import {createApp} from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router);

app.use(Toast, {
    timeout: 3000,
});
app.mount('#app');