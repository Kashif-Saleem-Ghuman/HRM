<template>
  <div class="search-items">
    <ul v-for="item in searchResults"  :key="item.id">
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
.search_form_modal-heading{
  font-weight: 600 !important;
}
.search-items {
  // padding-top: 10px;
  font-size: 14px;
ul{
  padding: 0;
  margin: 0;
  li{
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $light;
    padding: 0.5rem 0;
    // margin: 0 -14px;
    cursor: pointer;
    border-radius: 6px;
    text-transform: capitalize;
  }
  :hover{
      background-color: $light;
      color: $black;
    }
}
}
</style>