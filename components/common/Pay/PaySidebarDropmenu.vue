<template>
  <div
    class="shape-circle width-2 height-2 d-flex justify-center align-center more-tiems-wrapper"
    :class="
      isLightThemeCheck
        ? 'bg-light bg-hover-gray2'
        : 'bg-dark-sub1 bg-hover-dark-sub3'
    "
  >
    <template>
      <bib-button
        dropdown="horizontal-dots"
        :iconVariant="isLightThemeCheck ? '' : 'light'"
      >
        <template v-slot:menu>
          <div class="list">
            <span
              class="list__item"
              v-for="(item, index) in menuItems"
              :key="index"
            >
              {{ item.label }}
            </span>
          </div>
        </template>
      </bib-button>
    </template>
  </div>
</template>

<script>
export default {
  name: "ElipsisDropdown",
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.more-tiems-wrapper{
    .list{
        border: 1px solid $dark-sub3;
        border-radius: 6px;
        right: 64px;
        min-width: 150px;
        position: absolute;
        top: -30px;
    }
}
</style>
