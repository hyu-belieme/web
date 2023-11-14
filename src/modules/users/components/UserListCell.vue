<template>
  <section class="d-flex flex-row align-items-center px-2">
    <BasicCheckbox
      class="mx-1"
      name="user-checkbox"
      ref="checkboxRef"
      :init-state="userCheckedStore.isChecked(props.user.id) ? 'checked' : 'unchecked'"
      @on-change="(checked) => updateChecked(user.id, checked)"
    ></BasicCheckbox>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ user.university.name }} / {{ user.studentId }}
        </span>
      </section>
      <BasicSelector
        class="authority-selector"
        size="xs"
        ref="selectorRef"
        @on-change="updateUserDiff"
        :disabled="hasHigherAuthorityPermission(user.getPermission(curDeptId), 'MASTER')"
        :options="
          hasHigherAuthorityPermission(user.getPermission(curDeptId), 'MASTER')
            ? masterOnlyAuthorityMap
            : authorityMap
        "
        :initial-key="user.getPermission(curDeptId)"
      ></BasicSelector>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
import type User from '@common/models/User';
import type AuthorityPermission from '@common/models/types/AuthorityPermission';
import {
  AUTHORITY_PERMISSIONS,
  hasHigherAuthorityPermission,
  parseAuthorityPermission,
  toString as permissionToString,
} from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import UserDiff from '@^users/models/UserDiff';
import useUserChecked from '@^users/stores/user-checked-store';
import useUserDiff from '@^users/stores/user-diff-store';

const props = defineProps<{
  user: User;
  checked: boolean;
}>();

defineEmits<{
  (e: 'onInit', checked: boolean): void;
  (e: 'onChange', checked: boolean): void;
}>();

const authorityMap = new Map<string, { value: AuthorityPermission; label: string }>();
AUTHORITY_PERMISSIONS.forEach((e) => {
  if (e === 'DEFAULT' || e === 'NIL' || hasHigherAuthorityPermission(e, 'MASTER')) return;
  authorityMap.set(e, {
    value: e,
    label: permissionToString(e),
  });
});

const masterOnlyAuthorityMap = new Map<string, { value: AuthorityPermission; label: string }>();
masterOnlyAuthorityMap.set('MASTER', {
  value: 'MASTER',
  label: permissionToString('MASTER'),
});

const curDeptStorage = useCurDeptStorage();
const { curDept, curDeptId } = storeToRefs(curDeptStorage);

const userDiffStore = useUserDiff();

const userCheckedStore = useUserChecked();

const selectorRef = ref<InstanceType<typeof BasicSelector> | null>(null);

const checkboxRef = ref<InstanceType<typeof BasicCheckbox> | null>(null);

function updateUserDiff(keys: { newKey: string; oldKey: string }) {
  const prevDiff = userDiffStore.getUserDiff(props.user.id);
  const prevState = prevDiff?.prevState || props.user.getPermission(curDeptId.value);
  if (prevState === selectorRef.value?.getValue(keys.newKey)) {
    userDiffStore.removeUserDiff(props.user.id);
    return;
  }
  const newState = parseAuthorityPermission(selectorRef.value?.getValue(keys.newKey));
  userDiffStore.putUserDiff(
    new UserDiff({
      user: props.user,
      dept: curDept.value,
      prevState,
      curState: newState,
    })
  );
}

function updateChecked(userId: string, checked: boolean) {
  if (checked) userCheckedStore.check(userId);
  else userCheckedStore.uncheck(userId);
}

watch(
  () => userCheckedStore.isChecked(props.user.id),
  (newVal) => {
    if (newVal === true) checkboxRef.value?.check();
    else checkboxRef.value?.uncheck();
  },
  { immediate: true }
);

defineExpose({
  check() {
    if (checkboxRef.value !== null) checkboxRef.value.check();
  },
  uncheck() {
    if (checkboxRef.value !== null) checkboxRef.value.uncheck();
  },
  indeterminate() {
    if (checkboxRef.value !== null) checkboxRef.value.indeterminate();
  },
  determinate() {
    if (checkboxRef.value !== null) checkboxRef.value.determinate();
  },
  isChecked() {
    if (checkboxRef.value !== null) checkboxRef.value.isChecked();
  },
  isIndeterminate() {
    if (checkboxRef.value !== null) checkboxRef.value.isIndeterminate();
  },
});
</script>

<style scoped lang="scss">
.authority-selector {
  width: 5rem;
}

.subinfo {
  color: $gray;
}

.light-border-bottom {
  border-bottom: calc($border-width * 0.5) solid $border-color;
}
</style>
