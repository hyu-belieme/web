<script setup lang="ts">
import { onBeforeMount, ref, watchEffect } from 'vue';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';

import { getCurrentUserInfo } from '@common/apis/belieme-apis';
import { userKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';
import { userInfoStorage, userTokenStorage } from '@common/webstorages/storages';

import LoginBox from '@^login/components/LoginBox/LoginBox.vue';

const router = useRouter();
const needLogin = ref(false);
const loginFailed = ref(false);

onBeforeMount(() => {
  const userToken = userTokenStorage.get();

  if (userToken === undefined) {
    needLogin.value = true;
    return;
  }

  const { isError, isSuccess, data } = useQuery<UserWithSecureInfo>(
    userKeys.current(userToken),
    () => getCurrentUserInfo(userToken)
  );

  watchEffect(() => {
    if (isError.value) {
      loginFailed.value = true;
    } else if (isSuccess.value && data.value !== undefined) {
      loginFailed.value = false;
      userInfoStorage.set(data.value);
      router.push({ name: 'stuffs' });
    }
  });
});
</script>

<template>
  <section class="login-page">
    <LoginBox v-if="needLogin"></LoginBox>
    <DataLoadFailView v-else-if="loginFailed"></DataLoadFailView>
    <LoadingView v-else></LoadingView>
  </section>
</template>

<style scoped lang="scss">
.login-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);
}
</style>
