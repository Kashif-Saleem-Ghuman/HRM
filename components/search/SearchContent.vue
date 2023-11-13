<template>
  <div class="search-content">
    <ul v-for="item in searchResults" class="search-items" :key="item.id">
      <component v-if="item?.type" :is="getSearchItemComponent(item?.type)" :item="item"></component>
    </ul>
  </div>
</template>

<script>

export default {
  computed: {
    searchResults() {
      return this.$store.state.app.searchResults || []
    },
  },
  data() {
    return {
      items: []
    }
  },

  methods: {
    isEmployeeType(type) {
      return type === 'employee'
    },

    getSearchItemComponent(type) {
      const componentMapper = {
        employee: 'employee-search-item'
      }

      return componentMapper[type]
    }
  }
}
</script>

<style lang="scss">
.search-items {
  padding: 0;

  .search-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
  }
}
</style>