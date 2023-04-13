import App from "@core/App.vue";
import router from "@core/router";
import "bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "immutable";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("ko");
app.config.globalProperties.$dayjs = dayjs;

app.use(createPinia());
app.use(router);

app.mount("#app");
