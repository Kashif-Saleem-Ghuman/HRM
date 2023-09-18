<template>
  <div class="d-flex gap-1">
    <div
      :class="[className]"
      style="width: 100%"
      class="cursor-pointer chip-list-wrapper ml-05"
      @click="$emit('on-click')"
    >
      <ul>
        <div>
            <li>
          {{ title }}
        </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chips",
  props: {
    title: {
      type: String,
    },
    className: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.chip-list-wrapper {
  border-radius: 6px;
  padding: 4px 8px;
  display: inline-block;
  // justify-content: center;
  align-items: center;
  ul {
    margin: 0 !important;
    padding: 0 !important;
  }
  li {
    margin: 0 !important;
    padding: 5px 0 !important;
    font-size: 14px;
    font-weight: 600;
  }
  &__sucess {
    //   background-color: #d5e8d4;
    li {
      color: #2ba026;

    }
  }
  &__default {
    li {
      color: #21db00 !important;
    }
  }
  &__light {
    li {
      color: #E2E2E3 !important;
    }
  }
}

</style>
