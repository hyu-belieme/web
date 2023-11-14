<template>
  <section class="d-flex flex-row align-items-center px-2">
    <BasicCheckbox
      ref="checkboxRef"
      class="mx-1"
      name="user-checkbox"
      @on-change="updateTotalCheck"
    ></BasicCheckbox>
    <section
      class="px-1 py-1 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">이름</span>
        <span class="lh-sm text-gray fs-xs">학교/학과</span>
      </section>
      <BasicSelector
        ref="selectorRef"
        class="authority-selector"
        size="xs"
        @on-change="updateUserDiffsAtOnce"
        :disabled="checkedUsers.length === 0 || masterSelected"
        :options="masterSelected ? authorityMapWithMaster : authorityMap"
      ></BasicSelector>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
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

const authorityMap = new Map<string, { value: AuthorityPermission; label: string }>();
AUTHORITY_PERMISSIONS.forEach((e) => {
  if (e === 'DEFAULT' || e === 'NIL' || hasHigherAuthorityPermission(e, 'MASTER')) return;
  authorityMap.set(e, {
    value: e,
    label: permissionToString(e),
  });
});

const authorityMapWithMaster = new Map<string, { value: AuthorityPermission; label: string }>();
AUTHORITY_PERMISSIONS.forEach((e) => {
  if (e === 'DEFAULT' || e === 'NIL' || hasHigherAuthorityPermission(e, 'DEVELOPER')) return;
  authorityMapWithMaster.set(e, {
    value: e,
    label: permissionToString(e),
  });
});

const curDeptStorage = useCurDeptStorage();
const { curDept, curDeptId } = storeToRefs(curDeptStorage);

const userCheckedStore = useUserChecked();
const { repChecked, checkedUsers } = storeToRefs(userCheckedStore);

const userDiffStore = useUserDiff();

const masterSelected = computed(
  () =>
    !checkedUsers.value.every(
      (user) => !hasHigherAuthorityPermission(user.getPermission(curDeptId.value), 'MASTER')
    )
);

const checkboxRef = ref<InstanceType<typeof BasicCheckbox> | null>(null);
const selectorRef = ref<InstanceType<typeof BasicSelector> | null>(null);

function updateTotalCheck(checked: boolean) {
  if (checked) userCheckedStore.checkAll();
  else userCheckedStore.uncheckAll();
}

function updateUserDiffsAtOnce(keys: { newKey: string; oldKey: string }) {
  if (selectorRef.value?.getValue(keys.newKey) === undefined) return;
  checkedUsers.value.forEach((user) => {
    const prevDiff = userDiffStore.getUserDiff(user.id);
    const prevState = prevDiff?.prevState || user.getPermission(curDeptId.value);
    if (prevState === selectorRef.value?.getValue(keys.newKey)) {
      userDiffStore.removeUserDiff(user.id);
      return;
    }
    userDiffStore.putUserDiff(
      new UserDiff({
        user,
        dept: curDept.value,
        prevState,
        curState: parseAuthorityPermission(selectorRef.value?.getValue(keys.newKey)),
      })
    );
  });
}

watch(checkedUsers, (newVal) => {
  if (newVal.length === 0) {
    selectorRef.value?.select('NIL');
    return;
  }
  const repPermission = checkedUsers.value.reduce((prev, cur) => {
    if (prev === cur.getPermission(curDeptId.value)) return prev;
    return 'NIL';
  }, checkedUsers.value[0]?.getPermission(curDeptId.value) ?? 'NIL');
  selectorRef.value?.select(repPermission);
});

watch(repChecked, (newVal) => {
  if (newVal === 'checked') checkboxRef.value?.check();
  else if (newVal === 'unchecked') checkboxRef.value?.uncheck();
  if (newVal === 'indeterminate') checkboxRef.value?.indeterminate();
});
</script>

<style scoped lang="scss">
.authority-selector {
  width: 5rem;
}

.subinfo {
  color: $gray;
}
</style>
