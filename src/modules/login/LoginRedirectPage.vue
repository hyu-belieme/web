<script setup lang="ts">
import { List } from 'immutable';
import { onBeforeMount } from 'vue';
import { useMutation } from 'vue-query';
import { useRouter } from 'vue-router';

import { loginUsingHanyangApiToken } from '@common/apis/belieme-apis';
import type BaseError from '@common/errors/BaseError';
import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';
import useUserStore from '@common/stores/user-store';

const userStore = useUserStore();
const router = useRouter();

function extractMapFromQueryString(queryString: string, targetKey: string) {
  const kevValueList = List(queryString.split('&'));

  let result: string | undefined;
  kevValueList.forEach((str) => {
    const [key, value] = str.split('=');
    if (key === targetKey) {
      result = value;
    }
  });
  return result;
}

const accessToken = extractMapFromQueryString(window.location.hash.substring(1), 'access_token');

const loginMutation = useMutation<UserWithSecureInfo, BaseError>(
  () => loginUsingHanyangApiToken(accessToken || ''),
  {
    onSuccess: (response) => {
      userStore.updateUser(response);
      router.replace({ name: 'stuffs' });
    },
    onError: (error) => {
      console.error(error);
      router.replace({ name: 'login' });
    },
  }
);

onBeforeMount(() => {
  loginMutation.mutate();
});
</script>

<template>
  <span>로그인 성공 {{ accessToken }}</span>
</template>

<style scoped lang="scss"></style>
