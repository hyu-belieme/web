<template>
  <section class="ps-2 pe-2 pt-2 d-flex flex-row w-100">
    <section class="d-flex flex-row flex-grow-1 gap-2">
      <ButtonBase :size="'xsm'" :color="'dark'">
        <span class="lh-sm">전체</span>
      </ButtonBase>
      <ButtonBase :size="'xsm'" :color="'white'">
        <span class="lh-sm">일반 유저만</span>
      </ButtonBase>
      <ButtonBase :size="'xsm'" :color="'white'">
        <span class="lh-sm">관리자 유저만</span>
      </ButtonBase>
      <ButtonBase :size="'xsm'" :color="'white'">
        <span class="lh-sm">차단된 유저만</span>
      </ButtonBase>
    </section>
    <ButtonBase :size="'xsm'">
      <section class="d-flex flex-row gap-1 align-items-center">
        <span class="lh-sm">등록하기</span>
        <PlusIcon :multiplier="0.5" :color="'white'" hover="off"></PlusIcon>
      </section>
    </ButtonBase>
  </section>
</template>

<script setup lang="ts">
import ButtonBase from '@common/components/buttons/ButtonBase/ButtonBase.vue';
import PlusIcon from '@common/components/icons/PlusIcon/PlusIcon.vue';
</script>

<style scoped lang="scss"></style>
