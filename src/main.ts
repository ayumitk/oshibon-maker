import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";
import store from "./store/index";
import VueSocialSharing from "vue-social-sharing";

createApp(App).use(router).use(store).use(VueSocialSharing).mount("#app");
