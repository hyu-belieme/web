<template>
  <section class="stuff-info">
    <section class="icon">{{ stuff.thumbnail }}</section>
    <section class="label-and-desc">
      <section class="label">
        <section class="name">{{ stuff.name }}</section>
        <section class="buttons">
          <button class="btn btn-primary btn-sm">수정</button>
          <button class="btn btn-primary btn-sm">추가</button>
        </section>
      </section>
      <div class="desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum quos.
        Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus. Modi
        magni, aut corporis impedit ullam nemo saepe!
      </div>
    </section>
  </section>
</template>

<script lang="ts">
export default {
  name: "StuffInfo",
  props: ["stuff"]
};
</script>

<style lang="scss" scoped>
.stuff-info {
  display: flex;
  flex-direction: row;

  gap: map-get($map: $spacers, $key: 4);

  .icon {
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    font-size: 10rem;
    text-align: center;
  }

  .label-and-desc {
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    .label {
      display: flex;
      flex-direction: row;
      align-items: center;

      font-size: $h3-font-size;
      gap: map-get($map: $spacers, $key: 2);

      .name {
        width: 0;
        flex-grow: 1;
        flex-basis: 0;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        gap: map-get($map: $spacers, $key: 2);

        button {
          min-width: 3rem;
        }
      }
    }

    .desc {
      flex-basis: 0;
      flex-grow: 1;

      border: 0.5px solid $gray-600;
      padding: map-get($map: $spacers, $key: 1);

      font-size: 0.75rem;
      font-weight: 300;

      overflow: scroll;
    }
  }
}
</style>
