<template>
    <nav  class="bg-white d-flex align-center gap-05">
    <button-circle icon="arrow-left" scale="1" variant="secondary" showWhite="true"></button-circle>
    <bib-avatar v-if="avatar" :src="avatar"></bib-avatar>
    <span class=" mr-1 title-text">{{ title }}</span>
    <button-circle icon="bookmark" scale="0.8" variant="secondary" showLight="true"></button-circle>
    <button-circle icon="horizontal-dots" scale="0.8" variant="secondary" showLight="true"></button-circle>
  </nav>
  </template>
<script>
export default {

  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      default: "Page Title"
    },
    arrowleft:{
      type:String,
      default:''
    },
    bookmark: {
      type: String,
      default: ""
    },
    moreIcon: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },

  data() {
    return {

    }
  },
}

</script>
<style lang="css" scoped>
.nav_wrapper {
  border-bottom: 1px solid var(--bib-light);
}

.title-text {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
