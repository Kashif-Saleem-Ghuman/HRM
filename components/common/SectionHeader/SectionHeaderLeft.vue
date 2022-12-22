<template>
    <nav  class="bg-white d-flex align-center gap-05 py-075 px-025">
    <button type="button" @click="" class="cursor-pointer d-flex cursor-pointer bg-white border-white">
      <bib-icon :icon="arrowleft" :scale="1.5" variant="secondary"></bib-icon>
    </button>
    <bib-avatar v-if="avatar" :src="avatar"></bib-avatar>
    <span class=" mr-1 title-text">{{ title }}</span>
    <button type="button" @click="" class="cursor-pointer shape-circle bg-secondary-sub3 width-2 height-2  d-flex justify-center align-center border-white">
      <bib-icon :icon="bookmark" :scale="0.8" variant="secondary"></bib-icon>
    </button>
    <button type="button" @click="" class="cursor-pointer shape-circle bg-secondary-sub3 width-2 height-2  d-flex justify-center align-center border-white">
      <bib-icon :icon="moreIcon" :scale="0.8" variant="secondary"></bib-icon>
    </button>
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
