<script setup lang="ts">
import CommonUserPageOnDesktop from '@^users/components/CommonUserPageOnDesktop.vue';
import UserListAndSearchBox from '@^users/components/UserListAndSearchBox.vue';
</script>

<template>
  <section class="desktop-frame">
    <CommonUserPageOnDesktop></CommonUserPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <UserListAndSearchBox></UserListAndSearchBox>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .desktop-frame {
    display: none;
  }

  .mobile-frame {
    display: block;

    width: 100%;
    height: 100%;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .desktop-frame {
    display: block;

    width: 100%;
    height: 100%;
  }

  .mobile-frame {
    display: none;
  }
}
</style>
