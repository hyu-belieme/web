<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicCheckboxVue from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import { useGuidePopoverStore } from '@common/components/guide-popovers/stores/guide-popover-store';
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';

const guidePopoverStore = useGuidePopoverStore();
const { openedGuidePopovers, openedGuidePopoverCount } = storeToRefs(guidePopoverStore);

const guideFlagsStorage = useGuideFlagsStorage();

const notShowAgain = ref(true);
function updateNotShowAgain(checked: boolean) {
  notShowAgain.value = checked;
}

function closeGuidePopovers() {
  openedGuidePopovers.value.forEach((popover) => {
    if (notShowAgain.value) {
      guideFlagsStorage.setGuideFlag(popover, true);
    }
  });
  guidePopoverStore.closeAllGuidePopover();
}
</script>

<template>
  <template v-if="openedGuidePopoverCount > 0">
    <div class="backdrop show"></div>
    <section class="confirm-button">
      <section class="not-show-again-checkbox-section">
        <BasicCheckboxVue
          name="not-show-again"
          init-state="checked"
          @on-change="(checked) => updateNotShowAgain(checked)"
        ></BasicCheckboxVue>
        <span class="fs-xs">이 가이드를 다시 보지 않습니다.</span>
      </section>
      <BasicButton content="닫기" color="dark" @click="closeGuidePopovers()"></BasicButton>
    </section>
  </template>
</template>

<style scoped lang="scss">
$backdrop-zindex: 5000;
$backdrop-bg: $black !default;
$backdrop-opacity: 0.4 !default;

.backdrop {
  --#{$prefix}backdrop-zindex: #{$backdrop-zindex};
  --#{$prefix}backdrop-bg: #{$backdrop-bg};
  --#{$prefix}backdrop-opacity: #{$backdrop-opacity};

  @include overlay-backdrop(
    var(--#{$prefix}backdrop-zindex),
    var(--#{$prefix}backdrop-bg),
    var(--#{$prefix}backdrop-opacity)
  );
}

.not-show-again-checkbox-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: map-get($spacers, 1);
  padding: map-get($spacers, 1);

  @include border-radius($border-radius);

  background-color: RGBA(to-rgb($light), 0.7);
}

.confirm-button {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  z-index: 10000;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: map-get($spacers, 2);

  font-weight: $font-weight-semibold;
}
</style>
