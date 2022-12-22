<template>
  <div class="d-flex justify-between align-center nav_wrapper">
    <section-header-left
      title="People"
      avatar="t.jpg"
      arrowleft="arrow-left"
      bookmark="bookmark-solid"
      moreIcon="horizontal-dots"
    ></section-header-left>
    <div class="d-flex justify-between mr-1">
      <template v-for="user in userItems">
        <section-header-right :avatar="user.avatarUrl"> </section-header-right>
      </template>
      <button type="button" @click="addUser()" class="cursor-pointer shape-circle bg-secondary-sub3 width-2 height-2 ml-05 d-flex justify-center align-center border-white">
      <bib-icon icon="user-add" :scale="1" variant="success"></bib-icon>
    </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SectionHeader",
  data() {
    return {
      userItems: [
        { avatarUrl: "1.jpg" },
        { avatarUrl: "1.jpg" },
        { avatarUrl: "1.jpg" },
      ],
    };
  },
  methods:{
    addUser(){
      alert("called")
    }
  }
};
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
