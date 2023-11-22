<template>
  <section class="d-flex flex-column">
    <section class="w-100 px-2">
      <section class="w-100 px-1 py-2 d-flex flex-row gap-2">
        <section class="w-0 flex-grow-1 d-flex flex-row gap-1 align-items-center">
          <span>학교</span>
          <BasicSelector
            class="w-0 flex-grow-1"
            size="xs"
            :disabled="isLoading || isError"
            :options="univMap"
            hint="학교를 선택해주세요."
            @on-change="(keys) => (selectedUniv = univMap.get(keys.newKey)?.value ?? null)"
          ></BasicSelector>
        </section>
        <section class="w-0 flex-grow-1 d-flex flex-row gap-1 align-items-center">
          <span>학번</span>
          <input
            ref="studentIdRef"
            type="text"
            class="w-0 form-control edit-box flex-grow-1 fs-xs"
            placeholder="학번을 입력해주세요."
          />
        </section>
      </section>
    </section>
    <section class="w-100 px-2 pb-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton
        content="등록하기"
        size="sm"
        @click="() => openUserRegisterModal()"
      ></BasicButton>
      <BasicButton
        content="취소하기"
        color="light"
        size="sm"
        @click="userRegisterTabStore.closeUserRegisterTab"
      ></BasicButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useQuery } from 'vue-query';

import { getAllUnivList } from '@common/apis/belieme-apis';
import { univKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
import type University from '@common/models/University';
import useUserTokenStorage from '@common/storages/user-token-storage';

import UserRegisterConfirmModal from '@^users/components/UserRegisterConfirmModal.vue';
import useUserRegisterTab from '@^users/stores/user-register-tab-store';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const userRegisterTabStore = useUserRegisterTab();

const modalStore = useModalStore();

const { isSuccess, isLoading, isError, data } = useQuery<List<University>>(univKeys.all(), () =>
  getAllUnivList(userToken.value)
);

const selectedUniv = ref<University | null>(null);
const studentIdRef = ref<HTMLInputElement | null>(null);

const univMap = ref<Map<string, { value: University; label: string }>>(new Map());
watch(
  data,
  () => {
    if (isSuccess.value) {
      const tmpMap = new Map<string, { value: University; label: string }>();
      data.value?.forEach((e) => {
        tmpMap.set(e.id, {
          value: e,
          label: e.name,
        });
      });
      univMap.value = tmpMap;
    }
  },
  { immediate: true }
);

function openUserRegisterModal() {
  if (selectedUniv.value === null) {
    modalStore.addModal(
      buildAlertModal('user-register-no-univ-error', '등록 시 학교를 선택해주세요.')
    );
    return;
  }

  const userRegisterModal = {
    component: UserRegisterConfirmModal,
    props: {
      univId: selectedUniv.value?.id ?? '',
      studentId: studentIdRef.value?.value ?? '',
    },
    resolve: () => {
      modalStore.removeModal();
      userRegisterTabStore.closeUserRegisterTab();
    },
    reject: () => {
      modalStore.removeModal();
    },
  };
  modalStore.addModal(userRegisterModal);
}
</script>

<style scoped lang="scss">
.authority-selector {
  width: 5rem;
}

.edit-box {
  border: $border-width solid $border-color;
  @include border-radius();

  padding-top: map-get($spacers, 'sm');
  padding-bottom: map-get($spacers, 'sm');

  padding-left: 2 * map-get($spacers, 'sm');
  padding-right: 2 * map-get($spacers, 'sm');
  font-size: inherit;
  font-weight: inherit;

  &:focus {
    border: $border-width solid $primary;
    outline: none;
  }

  background-color: $white;
}
</style>
