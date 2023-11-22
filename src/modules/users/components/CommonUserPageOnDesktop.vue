<script setup lang="ts">
import UserDiffListAndRegisterTab from '@^users/components/UserDiffListAndRegisterTab.vue';
import UserListAndSearchBox from '@^users/components/UserListAndSearchBox.vue';
</script>

<template>
  <section class="tabs-wrapper">
    <section class="users-section">
      <UserListAndSearchBox></UserListAndSearchBox>
    </section>
    <section class="user-diffs-section">
      <UserDiffListAndRegisterTab></UserDiffListAndRegisterTab>
    </section>
  </section>
</template>

<style lang="scss" scoped>
$list-height: calc(100vh - $header-height-desktop);

.tabs-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .users-section {
    width: 0;
    height: 100%;

    flex-grow: 1;

    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);
  }

  .user-diffs-section {
    width: 0;
    height: 100%;

    flex-grow: 1;

    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);
  }
}
</style>
