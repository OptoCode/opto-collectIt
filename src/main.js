import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase/config";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(VueFire, {
  firebaseApp,
  // add modules like VueFireAuth, ...
  modules: [VueFireAuth()],
});
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
