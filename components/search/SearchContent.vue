<template>
  <div>
    <div v-for="item in searchResults"  :key="item.id" :class="isLightThemeCheck ? 'bg-white bg-hover-light' : 'bg-dark  bg-hover-dark-sub1'" class="shape-rounded">
      <component v-if="item?.type" :is="getSearchItemComponent(item?.type)" :item="item" class="shape-rounded"></component>
    </div>
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
.search_form_modal-heading{
  font-weight: 600 !important;
}
</style>