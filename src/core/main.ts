import 'axios';
import 'bootstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'immutable';
import { createPinia } from 'pinia';
import 'uuid';
import { createApp } from 'vue';
import { VueQueryPlugin, type VueQueryPluginOptions } from 'vue-query';

import setStorageEventListener from '@common/utils/storage-event-listener';
import { deptIdStorage } from '@common/webstorages/storages';

import App from '@core/App.vue';
import router from '@core/router';

const app = createApp(App);

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('ko');
app.config.globalProperties.$dayjs = dayjs;

app.use(createPinia());
app.use(router);

setStorageEventListener();
deptIdStorage.set('35334234-3731-4231-4545-304134383143');

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
