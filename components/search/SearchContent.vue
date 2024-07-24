<template>
  <div class="list shape-rounded" :class="themeClassCommon">
  <div class="list__items shape-rounded">
    <div v-for="item in searchResults"  :key="item.id" :class="isLightThemeCheck ? 'bg-white bg-hover-light' : 'bg-dark  bg-hover-dark-sub1'">
      <component v-if="item?.type" :is="getSearchItemComponent(item?.type)" :item="item"></component>
    </div>
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