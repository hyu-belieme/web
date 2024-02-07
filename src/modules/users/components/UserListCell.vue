<template>
  <section class="d-flex flex-row align-items-center px-2">
    <Popper
      disableClickAway
      arrow
      :show="openedMultiSelectGuidePopover"
      placement="bottom-start"
      :openDelay="500"
    >
      <BasicCheckbox
        class="mx-1"
        name="user-checkbox"
        ref="checkboxRef"
        :init-state="userCheckedStore.isChecked(props.user.id) ? 'checked' : 'unchecked'"
        @on-change="(checked) => updateChecked(user.id, checked)"
      ></BasicCheckbox>
      <template #content>
        <div class="user-auth-selector-guide">
          체크박스를 통해 여러 유저를 선택하고, 선택된 유저들에 대해 한 번에 권한을 설정할 수
          있습니다.
        </div>
      </template>
    </Popper>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ user.university.name }} / {{ user.studentId }}
        </span>
      </section>
      <Popper
        disableClickAway
        arrow
        :show="openedUserTabGuidePopover"
        placement="left-start"
        :openDelay="500"
      >
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
        <template #content>
          <div class="user-auth-selector-guide">
            일반 유저(user), 관리자 유저(staff), 차단할 유저(banned)로 권한을 설정할 수 있습니다.
          </div>
        </template>
      </Popper>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import Popper from 'vue3-popper';

import BasicCheckbox from '@common/components/checkboxes/BasicCheckbox/BasicCheckbox.vue';
import useGuidePopoverStore from '@common/components/guide-popovers/stores/guide-popover-store';
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
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';

import UserDiff from '@^users/models/UserDiff';
import useUserChecked from '@^users/stores/user-checked-store';
import useUserDiff from '@^users/stores/user-diff-store';

const props = defineProps<{
  user: User;
  idx: number;
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

const guidePopoverStore = useGuidePopoverStore();
const { openedGuidePopovers } = storeToRefs(guidePopoverStore);

const guideFlagsStorage = useGuideFlagsStorage();

const openedUserTabGuidePopover = computed(() => {
  return props.idx === 0 && openedGuidePopovers.value.includes('USER_TAB_MASTER');
});

const openedMultiSelectGuidePopover = computed(() => {
  return props.idx === 3 && openedGuidePopovers.value.includes('USER_TAB_MASTER');
});

if (guideFlagsStorage.getGuideFlag('USER_TAB_MASTER')?.value === false) {
  guidePopoverStore.openGuidePopover('USER_TAB_MASTER');
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

.user-auth-selector-guide {
  max-width: 12rem;
  height: auto;

  font-size: $font-size-sm;
}
</style>
