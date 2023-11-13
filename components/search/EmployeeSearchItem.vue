<template>
  <li class="search-item" @click="handleEmployeeClick(item)">
    <bib-avatar :src="item.photo"></bib-avatar>
    <div>{{ `${item.firstName} ${item.lastName}` }}</div>
  </li>
</template> 

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleEmployeeClick(item) {
      const { id } = item
      this.$router.push(`/profile/${id}`);
    }
  }

}
</script>

<style></style>