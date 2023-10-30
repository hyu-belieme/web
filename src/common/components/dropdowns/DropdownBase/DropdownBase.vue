<script setup lang="ts">
import { v4 as uuidV4 } from 'uuid';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'hover' | 'toggle';
    opened?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'hover',
    opened: false,
    disabled: false,
  }
);

const openedRef = ref<boolean>(false);

const dropdownKey = uuidV4();

let closeLogic: (_: Event) => void;
let closeEventRegistered = false;

let listenerType = 'mouseover';
if (props.type === 'hover') listenerType = 'mouseover';
else if (props.type === 'toggle') listenerType = 'click';

function closeDropdown() {
  window.removeEventListener(listenerType, closeLogic);
  openedRef.value = false;
  closeEventRegistered = false;
}

function openDropdown() {
  if (closeEventRegistered) return;
  closeEventRegistered = true;
  closeLogic = (e) => {
    const target = e.target as HTMLDivElement;
    if (!target.closest(`*[dropdown-key='${dropdownKey}']`)) {
      closeDropdown();
    }
  };
  window.addEventListener(listenerType, closeLogic);
  openedRef.value = true;
}

function toggleDropdown() {
  if (openedRef.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

if (props.opened) {
  openDropdown();
}

defineExpose({
  openedRef: () => openedRef.value,
});
</script>

<template>
  <div class="dropdown" :dropdown-key="dropdownKey">
    <section
      v-if="type === 'hover'"
      ref="trigger"
      @mouseover="() => (!disabled ? openDropdown() : {})"
    >
      <slot name="trigger"></slot>
    </section>
    <section
      v-else-if="type === 'toggle'"
      ref="trigger"
      @click="() => (!disabled ? toggleDropdown() : {})"
    >
      <slot name="trigger"></slot>
    </section>
    <section v-else ref="trigger" @mouseover="() => (!disabled ? toggleDropdown() : {})">
      <slot name="trigger"></slot>
    </section>
    <slot name="menu" :closeDropdown="closeDropdown"></slot>
  </div>
</template>

<style scoped lang="scss">
@import '@common/components/dropdowns/styles/main';
</style>
