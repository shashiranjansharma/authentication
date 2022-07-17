import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/main.scss";

// Import and define vee-validate rules.
import { defineRule, Form, Field, ErrorMessage } from "vee-validate";
import AllRules from "@vee-validate/rules";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/services/firebaseSetup";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const app = createApp(App);
app.use(store);
app.config.globalProperties.$store = store;
app.use(router);
app.use(ElementPlus);
app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("VeeError", ErrorMessage);
app.mount("#app");
