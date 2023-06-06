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

import userDummy from '@common/assets/dummies/userDummy';
import useDeptStore from '@common/stores/new-dept-store';
import useUserStore from '@common/stores/new-user-store';

import App from '@core/App.vue';
import router from '@core/router';

const app = createApp(App);

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('ko');
app.config.globalProperties.$dayjs = dayjs;

app.use(createPinia());
app.use(router);

localStorage.setItem('dept-id', '35334234-3731-4231-4545-304134383143');
localStorage.setItem('user-token', userDummy.token);
sessionStorage.setItem('user-info', JSON.stringify(userDummy));

window.addEventListener('storage', (event) => {
  if (event.storageArea === window.sessionStorage && event.key === 'user-info') {
    useUserStore().updateUser();
  }
  if (event.storageArea === window.localStorage && event.key === 'dept-id') {
    useDeptStore().updateDeptId();
  }
});

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
