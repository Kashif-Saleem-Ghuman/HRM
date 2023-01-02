<template>
    <nav  class="bg-white d-flex align-center gap-05">
    <button-circle icon="arrow-left" :scale="1" variant="secondary" @on-click="" icon_bg="bg-white"></button-circle>
    <bib-avatar v-if="avatar" :src="avatar" size="2rem"></bib-avatar>
    <span class=" mr-1 title-text" v-if="title">{{ title }}</span>
    <button-circle v-if="bookmark" :icon="bookmark" :scale="0.8" variant="secondary" icon_bg="bg-secondary-sub3" @on-click="bookmarkButton"></button-circle>
    <button-circle v-if="moreIcon" :icon="moreIcon" :scale="0.8" variant="secondary" icon_bg="bg-secondary-sub3" @on-click="moreButton"></button-circle>
  </nav>
  </template>
<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      default: ""
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
    },

  },
  methods:{
        backButton(){
        alert("Back Button called")
      },
      bookmarkButton(){
        alert("Bookmark Button called")
      },
      moreButton(){
        alert("More Button called")
      }
    } 
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
