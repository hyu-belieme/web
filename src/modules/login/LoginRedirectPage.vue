<script setup lang="ts">
import { List } from 'immutable';
import { onBeforeMount } from 'vue';
import { useMutation } from 'vue-query';
import { useRouter } from 'vue-router';

import { loginUsingHanyangApiToken } from '@common/apis/belieme-apis';
import type BaseError from '@common/errors/BaseError';
import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';

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
    onSuccess: async (response) => {
      localStorage.setItem('user-token', response.token);
      router.go(-2);
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
