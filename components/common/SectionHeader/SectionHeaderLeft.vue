<template>
  <nav class="gap-05 page_title">
    <bib-button
      variant="secondary--light"
      icon="arrow-left"
      pill
      @click="backRouter"
      icon_bg="bg-secondary-sub2"
      class="cursor-pointer"
      v-show="back"
    ></bib-button>
    <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
    <div class="page__header__bread__title" v-if="title" :title="title">{{ title }}</div>
  </nav>
</template>
<script>
export default {
  name: "SectionHeader",
  props: {
    title: {
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
      this.$router.back();
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
    padding-right: 1rem;
    .page__header__bread__title {
    font-size: 18px;
    position: relative;
}
}
</style>
