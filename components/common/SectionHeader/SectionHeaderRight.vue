<template>
  <div class="avtar_margin cursor-pointer" @click="$emit('click')">
    <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
  </div>
</template>
<script>
export default {
  name: "SectionHeaderRight",
  props: {
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
};
</script>
<style lang="css" scoped>
.avtar_margin {
  margin-right: -7px;
}
</style>
