<template>
  <section class="d-flex flex-row align-items-center px-2">
    <BasicCheckbox class="mx-1" name="user-checkbox"></BasicCheckbox>
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
        :disabled="false"
        :options="authorityMap"
        :initial-key="user.getPermission(curDeptId)"
      ></BasicSelector>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
import type User from '@common/models/User';
import type AuthorityPermission from '@common/models/types/AuthorityPermission';
import {
  AUTHORITY_PERMISSIONS,
  parseAuthorityPermission,
  toString as permissionToString,
} from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import UserDiff from '@^users/models/UserDiff';
import useUserDiff from '@^users/stores/user-diff-store';

const props = defineProps<{
  user: User;
}>();

const authorityMap = new Map<string, { value: AuthorityPermission; label: string }>();
AUTHORITY_PERMISSIONS.forEach((e) => {
  if (e === 'DEFAULT' || e === 'DEVELOPER' || e === 'NIL') return;
  authorityMap.set(e, {
    value: e,
    label: permissionToString(e),
  });
});

const curDeptStorage = useCurDeptStorage();
const { curDept, curDeptId } = storeToRefs(curDeptStorage);

const userDiffStore = useUserDiff();

const selectorRef = ref<InstanceType<typeof BasicSelector> | null>(null);

function updateUserDiff(keys: { newKey: string; oldKey: string }) {
  const prevDiff = userDiffStore.getUserDiff(props.user.id);
  const prevState = prevDiff?.prevState || props.user.getPermission(curDeptId.value);
  if (prevState === selectorRef.value?.getValue(keys.newKey)) {
    userDiffStore.removeUserDiff(props.user.id);
    return;
  }
  userDiffStore.putUserDiff(
    new UserDiff({
      user: props.user,
      dept: curDept.value,
      prevState,
      curState: parseAuthorityPermission(selectorRef.value?.getValue(keys.newKey)),
    })
  );
}
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
