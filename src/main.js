import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMq from "vue-mq";
import store from "./store";
import VueProgressBar from "vue-progressbar";
import VueGTag from 'vue-gtag'

Vue.config.productionTip = false;


Vue.use(VueGTag, {
  config: {id: process.env.VUE_APP_GA_ID}
},router)

Vue.use(VueProgressBar, {
  color: "#13b0a7",
  failedColor: "red",
  thickness: "5px",
});

Vue.use(VueMq, {
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 960,
    big: 1152,
    xl: Infinity,
  },
});
 new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
