<template>
  <div
    class="d-flex justify-between align-center"
    :class="[borderClassBottom, isLightThemeCheck ? 'bg-light-sub2' : 'bg-dark']"
  >
    <nav class="gap-05 page_title">
      <bib-button
        :variant="isLightThemeCheck ? 'secondary--light' : 'dark'"
        icon="arrow-left"
        pill
        @click="backRouter"
        icon_bg="bg-secondary-sub2"
        class="cursor-pointer"
        v-show="back"
      ></bib-button>
      <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
      <div class="page__header__bread__title" :class="customStyle"  style="text-transform: capitalize;"  v-if="title" :title="title">
        {{ title }} <aside>{{ subDetail }}</aside>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "SectionHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
    subDetail: {
      type: String,
      default: "",
    },
    customStyle: {
      type: String,
      default: "",
    },
    arrowleft: {
      type: String,
      default: "",
    },
    bookmark: {
      type: String,
      default: "",
    },
    moreIcon: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
    },
    back: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },

  methods: {
    backRouter() {
      this.$emit("on-click");
    },
  },
};
</script>
<style lang="scss" scoped>
.nav_wrapper {
  border-bottom: 1px solid $secondary-sub3;
}

.page_title {
  align-items: center;
  display: flex;
  font-weight: 600;
  height: 4rem;
  justify-content: space-between;
  padding-left: 1rem;
  .customStyle{
    font-size: 14px !important;
    color:#747478;
  }
  // padding-right: 1rem;
  .page__header__bread__title {
    font-size: 18px;
    position: relative;
    aside{
      display: inline-block;
      padding: 0 0.3rem 0 0.2rem;
      color:$dark;
    }
  }
}
</style>
