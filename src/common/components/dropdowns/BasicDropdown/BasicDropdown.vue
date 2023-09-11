<script setup lang="ts">
import { v4 as uuidV4 } from 'uuid';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'hover' | 'toggle';
    align?: 'left' | 'right';
    opened?: boolean;
  }>(),
  {
    type: 'hover',
    align: 'left',
    opened: false,
  }
);

const openedRef = ref<boolean>(false);

const dropdownKey = uuidV4();

let closeLogic;
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
    if (!e.target.closest(`*[dropdown-key='${dropdownKey}']`)) {
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
</script>

<template>
  <div class="dropdown" :dropdown-key="dropdownKey">
    <section v-if="type === 'hover'" ref="trigger" @mouseover="openDropdown()">
      <slot name="trigger"></slot>
    </section>
    <section v-else-if="type === 'toggle'" ref="trigger" @click="toggleDropdown()">
      <slot name="trigger"></slot>
    </section>
    <section v-else ref="trigger" @mouseover="openDropdown()">
      <slot name="trigger"></slot>
    </section>
    <ul ref="dropdownBody" :class="['dropdown-menu', align + '-aligned', openedRef ? 'show' : '']">
      <slot name="menu" :closeDropdown="closeDropdown"></slot>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@common/components/dropdowns/styles/main';

.right-aligned {
  right: 0;
}

.left-aligned {
  left: 0;
}
</style>
