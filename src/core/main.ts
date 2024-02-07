import '@vueuse/core';
import 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'immutable';
import { createPinia } from 'pinia';
import 'uuid';
import { createApp } from 'vue';
import Popper from 'vue3-popper';
import { VueQueryPlugin, type VueQueryPluginOptions } from 'vue-query';

import App from '@core/App.vue';
import router from '@core/router';

const app = createApp(App);

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('ko');
app.config.globalProperties.$dayjs = dayjs;

app.use(createPinia());
app.use(router);
app.component('PopperWrapper', Popper);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 20000,
      },
    },
  },
};

app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount('#app');
