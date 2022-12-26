<template>
  <div class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper">
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
      <button-circle icon="user-add" scale=1 @click="addUser()" variant="success" showLight="true" class="ml-05"></button-circle>
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
.title-text {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
