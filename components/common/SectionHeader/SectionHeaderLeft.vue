<template>
  <nav class="px-1 py-05 d-flex align-center gap-05">
    <bib-button
      variant="secondary--light"
      icon="arrow-left"
      pill
      @click="backRouter"
      icon_bg="bg-secondary-sub2"
      style="cursor: pointer"
      v-show="back"
    ></bib-button>
    <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
    <span class="title-text" v-if="title">{{ title }}</span>
    <bib-button
      v-if="bookmark"
      :icon="bookmark"
      variant="secondary"
      icon_bg="bg-secondary-sub3"
      pill
      style="cursor: pointer"
    ></bib-button>
    <div
      class="shape-circle bg-gray3 width-2 height-2 d-flex justify-center align-center"
      v-if="moreIcon"
    >
      <bib-popup pop="elipsis" :scale="1">
        <template v-slot:menu>
          <dropdown-menu
            v-if="moreIcon"
            onlyMenuItems="onlyMenuItems"
            :items="items"
            @click="$emit('vclick', $event)"
            style="margin-left: -10px"
          ></dropdown-menu>
          <div class="bg-secondary-sub2" style="height: 1px"></div>
          <dropdown-menu
            v-if="moreIcon"
            onlyMenuItems="onlyMenuItems"
            :items="items.slice(2, 8)"
            @click="$emit('vclick', $event)"
          ></dropdown-menu>
          <div class="bg-secondary-sub2" style="height: 1px"></div>
          <dropdown-menu
            v-if="moreIcon"
            onlyMenuItems="onlyMenuItems"
            :items="items.slice(9)"
            @click="$emit('vclick', $event)"
          ></dropdown-menu>
        </template>
      </bib-popup>
    </div>
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
      type: String,
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
<style lang="css" scoped>
.nav_wrapper {
  border-bottom: 1px solid #f2f2f5;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
}
</style>
