<script setup lang="ts">
import { List } from 'immutable';
import { onBeforeMount } from 'vue';
import { useMutation } from 'vue-query';
import { useRouter } from 'vue-router';

import { loginUsingHanyangApiToken } from '@common/apis/belieme-apis';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type BaseError from '@common/errors/BaseError';
import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';
import useUserTokenStorage from '@common/storages/user-token-storage';

const router = useRouter();

const userTokenStorage = useUserTokenStorage();

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
      userTokenStorage.setItem(response.token);
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
  <section class="d-flex align-items-center w-100 h-100">
    <LoadingView></LoadingView>
  </section>
</template>

<style scoped lang="scss"></style>
