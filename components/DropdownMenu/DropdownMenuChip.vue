<template>
  <div class="dropdown-menu">
    <div class="d-flex align-center px-1 py-05">
      <div style="position: relative">
        <bib-button
          :label="buttonLabel"
          :variant="
            buttonLabel === 'Approved'
              ? 'success'
              : '' || buttonLabel === 'Pending'
              ? 'warning'
              : '' || buttonLabel === 'Reject'
              ? 'danger'
              : ''
          "
          size="lg"
          @click="show = !show"
          :icon="buttonIconShow == true ? buttonIcon : false"
          v-click-outside="clickOutside"
          class="pr-05"
        ></bib-button>
        <div class="menu-items">
          <div v-if="show">
            <div v-for="item in items">
              <bib-button
                :label="item.label"
                :variant="item.variant"
                size="lg"
                @click="$emit('on-click', item)"
                :icon="buttonIconShow == true ? item.icon : false"
                v-click-outside="clickOutside"
                style="min-width: 120px"
                class="pr-05 mb-025"
              ></bib-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    buttonLabel: {
      type: String,
    },
    buttonIconShow: {
      type: Boolean,
    },
    buttonVariant: {
      type: String,
    },
    buttonIcon: {
      type: String,
    },
    listIcon: {
      type: String,
    },
    listIconVariant: {
      type: String,
    },
  },
  data() {
    return {
      viewChange: "Today",
      show: false,
    };
  },
  methods: {
    clickOutside() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss">

</style>
