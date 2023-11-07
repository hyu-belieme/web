<template>
  <section class="a d-flex flex-row align-items-center px-2">
    <DiffTypeBadge class="mx-1" :state="userDiff.diffType()"></DiffTypeBadge>
    <section
      class="light-border-bottom px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
    >
      <section class="d-flex flex-row align-items-baseline gap-1">
        <span class="lh-sm">{{ userDiff.user.name }}</span>
        <span class="lh-sm text-gray fs-xs">
          {{ userDiff.user.university.name }} / {{ userDiff.user.studentId }}
        </span>
      </section>
      <section class="d-flex flex-row gap-1 align-items-center">
        <section class="permission-change lh-sm text-gray fs-xs">
          <span v-if="userDiff.prevState !== 'NIL'">
            {{ permissionToString(userDiff.prevState) }}
          </span>
          <span v-if="userDiff.curState !== 'NIL'">
            {{ permissionToString(userDiff.curState) }}
          </span>
        </section>
        <UndoIcon
          size="xs"
          color="danger"
          class="hover-on"
          @click="() => modalStore.addModal(undoModal)"
        >
        </UndoIcon>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import UndoIcon from '@common/components/icons/UndoIcon/UndoIcon.vue';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import { toString as permissionToString } from '@common/models/types/AuthorityPermission';

import DiffTypeBadge from '@^users/components/DiffTypeBadge.vue';
import type UserDiff from '@^users/models/UserDiff';
import useUserDiff from '@^users/stores/user-diff-store';

const props = defineProps<{
  userDiff: UserDiff;
}>();

const modalStore = useModalStore();

const userDiffStore = useUserDiff();

const undoModal = {
  component: ConfirmModal,
  props: {
    title: '변경 되돌리기',
    content: '해당 변경사항을 기존으로 되돌립니다. 이 작업은 되돌릴 수 없습니다.',
    resolveLabel: '되돌리기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    userDiffStore.removeUserDiff(props.userDiff.user.id);
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};
</script>

<style scoped lang="scss">
.light-border-bottom {
  border-bottom: calc($border-width * 0.5) solid $border-color;
}

.permission-change {
  span::after {
    content: '→';
    margin: 0 map-get($spacers, 1);
  }

  span:last-child::after {
    content: '';
    margin: 0;
  }
}

.a {
  .hover-on {
    display: none;
  }

  &:hover {
    .hover-on {
      display: block;
    }
  }
}
</style>
