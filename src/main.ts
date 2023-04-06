import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ko";

import "bootstrap";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;
app.use(createPinia());
app.use(router);

app.mount("#app");
