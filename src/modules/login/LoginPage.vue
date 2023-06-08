<script setup lang="ts">
import type { List } from 'immutable';
import { onBeforeMount, ref, watchEffect } from 'vue';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';

import { getAccessibleDeptList, getCurrentUserInfo } from '@common/apis/belieme-apis';
import { deptKeys, userKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/AlertModal/utils/alert-modal-builder';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type Department from '@common/models/Department';
import type User from '@common/models/User';
import useModalStore from '@common/stores/modal-store';
import { deptStorage, userInfoStorage, userTokenStorage } from '@common/webstorages/storages';

import LoginBox from '@^login/components/LoginBox/LoginBox.vue';

const router = useRouter();
const modalStore = useModalStore();

const needLogin = ref(false);
const loginFailed = ref(false);

function resetLoginInfo() {
  needLogin.value = true;
  loginFailed.value = false;
  userTokenStorage.remove();
  userInfoStorage.remove();
  deptStorage.remove();
}

function setDeptStorage(authorities: List<Department>) {
  const inheritedDeptId = deptStorage.get()?.id;
  let isNotUpdated = true;
  authorities.some((dept) => {
    isNotUpdated = false;
    deptStorage.set(dept);
    if (dept.id === inheritedDeptId) return true;
    return false;
  });

  if (isNotUpdated) deptStorage.set(undefined);
}

onBeforeMount(() => {
  const userToken = userTokenStorage.get();

  if (userToken === undefined) {
    needLogin.value = true;
    return;
  }

  const {
    isError: errorOnGetUser,
    isSuccess: successOnGetUser,
    data: dataOnGetUser,
  } = useQuery<User>(userKeys.current(userToken), () => getCurrentUserInfo(userToken));

  const {
    isError: errorOnGetDepts,
    isSuccess: successOnGetDepts,
    data: dataOnGetDepts,
  } = useQuery<List<Department>>(deptKeys.accessible(userToken), () =>
    getAccessibleDeptList(userToken)
  );

  watchEffect(() => {
    if (errorOnGetUser.value || errorOnGetDepts.value) {
      loginFailed.value = true;
    } else if (
      successOnGetUser.value &&
      dataOnGetUser.value !== undefined &&
      successOnGetDepts.value &&
      dataOnGetDepts.value !== undefined
    ) {
      loginFailed.value = false;
      userInfoStorage.set(dataOnGetUser.value);
      setDeptStorage(dataOnGetDepts.value);

      if (deptStorage.get() === undefined) {
        modalStore.addModal(
          buildAlertModal('errorAlert', '소속된 학부 및 학과 내 이용 가능한 곳이 없습니다.')
        );
        resetLoginInfo();
      } else {
        router.push({ name: 'stuffs' });
      }
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
