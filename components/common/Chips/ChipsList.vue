<template>
  <div class="d-flex gap-1">
    <div
      :class="[className]"
      style="width: 100%"
      class="cursor-pointer chip-wrapper ml-05"
      @click="$emit('on-click')"
    >
      <ul style="margin: 0; padding: 0">
        <div class="pl-05">
            <li>
          <span>{{ title }}</span>
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
  margin-right: 10px;
  display: flex;
  height: 3rem;
  // justify-content: center;
  align-items: center;
  // background-color: #f2f2f5;
  ul {
    margin: 0 !important;
    padding: 0 !important;
  }
  li {
    margin: 0;
    padding: 0;
  }
  &__sucess {
    //   background-color: #d5e8d4;
    li {
      color: #2ba026;
    }
    span {
      color: #2ba026;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__default {
    li {
      color: #b1b1b4;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__light {
    li {
      color: #dadada;
    }
    span {
      color: #dadada;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>
