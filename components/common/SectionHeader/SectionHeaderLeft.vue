<template>
  <nav class="bg-white d-flex align-center gap-05">
    <button-circle
      icon="arrow-left"
      :scale="1"
      variant="secondary"
      @on-click="backRouter"
      icon_bg="bg-white"
    ></button-circle>
    <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
    <span class="mr-1 title-text" v-if="title">{{ title }}</span>
    <button-circle
      v-if="bookmark"
      :icon="bookmark"
      :scale="0.8"
      variant="secondary"
      icon_bg="bg-secondary-sub3"
      @on-click="bookmarkButton"
    >
    </button-circle>
    <!-- <button-circle v-if="moreIcon" :icon="moreIcon" :scale="0.8" variant="secondary" icon_bg="bg-secondary-sub3" @on-click="moreButton"></button-circle> -->
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
  },
  data() {
    return {};
  },
  methods: {
    bookmarkButton() {
      // console.log(this.users, "calllled");
    },
    backRouter() {
      this.$router.back();
    },
    moreButton() {
      alert("More Button called");
    },
  },
};
</script>
<style lang="css" scoped>
.nav_wrapper {
  border-bottom: 1px solid #F2F2F5;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
}
</style>
