<script setup lang="ts">
import DesktopHeader from '@^header/components/DesktopHeader.vue';
import MobileHeader from '@^header/components/MobileHeader.vue';
</script>

<template>
  <div class="w-100 desktop-frame">
    <DesktopHeader></DesktopHeader>
  </div>
  <div class="w-100 mobile-frame">
    <MobileHeader></MobileHeader>
  </div>
</template>

<style lang="scss">
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .mobile-frame {
    display: block;
  }

  .desktop-frame {
    display: none;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .mobile-frame {
    display: none;
  }

  .desktop-frame {
    display: block;
  }
}
</style>
