<script setup lang="ts">
import { v4 as uuidV4 } from 'uuid';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    align?: 'left' | 'right';
    opened?: boolean;
  }>(),
  {
    align: 'left',
    opened: false,
  }
);

const openedRef = ref<boolean>(false);

const dropdownKey = uuidV4();

let closeLogic;

function closeDropdown() {
  window.removeEventListener('click', closeLogic);
  openedRef.value = false;
}

function openDropdown() {
  closeLogic = (e) => {
    if (!e.target.closest(`*[dropdown-key='${dropdownKey}']`)) {
      closeDropdown();
    }
  };
  window.addEventListener('click', closeLogic);
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
  <div class="dropdown-frame" :dropdown-key="dropdownKey">
    <section ref="trigger">
      <slot name="trigger" :toggleDropdown="toggleDropdown"></slot>
    </section>
    <ul ref="dropdownBody" :class="['dropdown-menu', align + '-aligned', openedRef ? 'show' : '']">
      <slot name="menu" :closeDropdown="closeDropdown"></slot>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@common/components/dropdowns/styles/main';

.dropdown-frame {
  position: relative;
}

.dropdown-menu {
  position: absolute;
}

.right-aligned {
  right: 0;
}

.left-aligned {
  left: 0;
}
</style>
