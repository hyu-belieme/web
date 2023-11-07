<template>
  <section class="w-100 h-100 d-flex flex-column gap-2">
    <BasicSearchBox
      ref="searchBoxRef"
      placeholder="이름 또는 학번을 검색하세요."
      @on-change="(val) => (searchKeyword = val)"
    ></BasicSearchBox>
    <UserList></UserList>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BasicSearchBox from '@common/components/searchboxes/BasicSearchBox/BasicSearchBox.vue';

import UserList from '@^users/components/UserList.vue';
import useUserListFilter from '@^users/stores/user-list-filter-store';

const userListFilterStore = useUserListFilter();

const searchKeyword = ref<string>('');

const searchBoxRef = ref<InstanceType<typeof BasicSearchBox> | null>(null);
userListFilterStore.putFilter(
  'keyword-search',
  (e) =>
    e.name.includes(searchKeyword.value.trim()) || e.studentId.includes(searchKeyword.value.trim())
);
</script>

<style scoped lang="scss"></style>
