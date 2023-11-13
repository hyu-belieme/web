<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { onBeforeMount, ref, watchEffect } from 'vue';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';

import { getAccessibleDeptList, getCurrentUserInfo } from '@common/apis/belieme-apis';
import { deptKeys, userKeys } from '@common/apis/query-keys';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import Department from '@common/models/Department';
import type User from '@common/models/User';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import LoginBox from '@^login/components/LoginBox/LoginBox.vue';

const router = useRouter();
const modalStore = useModalStore();

const needLogin = ref(false);
const loginFailed = ref(false);

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const loggedInUserStorage = useLoggedInUserStorage();

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

function resetLoginInfo() {
  needLogin.value = true;
  loginFailed.value = false;

  userTokenStorage.removeItem();
  loggedInUserStorage.removeItem();
  curDeptStorage.removeItem();
}

function updateCurDeptStorage(depts: List<Department>) {
  const inheritedDeptId = curDeptId.value;
  let isNotUpdated = true;
  depts.some((dept) => {
    isNotUpdated = false;
    curDeptStorage.setItem(dept);
    if (dept.id === inheritedDeptId) return true;
    return false;
  });

  if (isNotUpdated) curDeptStorage.removeItem();
}

onBeforeMount(() => {
  if (userToken.value === NIL_UUID) {
    needLogin.value = true;
    return;
  }

  const {
    isError: errorOnGetUser,
    isSuccess: successOnGetUser,
    data: dataOnGetUser,
  } = useQuery<User>(userKeys.current(userToken.value), () => getCurrentUserInfo(userToken.value));

  const {
    isError: errorOnGetDepts,
    isSuccess: successOnGetDepts,
    data: dataOnGetDepts,
  } = useQuery<List<Department>>(deptKeys.accessible(userToken.value), () =>
    getAccessibleDeptList(userToken.value)
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
      loggedInUserStorage.setItem(dataOnGetUser.value);
      updateCurDeptStorage(dataOnGetDepts.value);

      if (curDeptStorage.itemEquals(Department.NIL)) {
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
    <LoginBox v-if="needLogin || loginFailed"></LoginBox>
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
