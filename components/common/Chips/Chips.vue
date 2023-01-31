<template>
  <div class="d-flex gap-1">
    <div
      :class="[
        variant ? 'chip-wrapper' + variant : '',
        shapeCircle ? 'chip-wrapper' + shapeCircle : ''
        ]"
      class="cursor-pointer chip-wrapper"
      @click="$emit('on-click')"
    >
      <span>{{ title }}</span>
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
    icon: {
      type: String,
    },
    scale: {
      type: Number,
    },
    variant: {
      type: String,
    },
    shapeCircle: {
      type: String,
    },
    titleClass: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.chip-wrapper {
  border-radius: 1rem;
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  justify-content:center;
  align-items: center;
  background-color: #F2F2F5;
  span{
    color: #E2E2E3;
      font-weight: 500;
      font-size: 14px;
  }

  &__shape-circle{
    width: 3rem;
    height:3rem;
    border-radius: 50%;
  }

  &__bgsucess {
    background-color: #d5e8d4;
    span {
      color: #2ba026;
      font-weight: 500;
      font-size: 14px;
    }
  }
  
  &__bgabsent {
    background-color: rgba(255, 171, 0, 0.16);
    span {
      color: #FFAB00;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgvacation {
    background-color: rgba(31, 66, 162, 0.16);
    span {
      color: #1F42A2;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgabsentpink {
    background-color: rgba(230, 0, 14, 0.16);
    span {
      color: #E6000E;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgpending {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    span {
      color: #B1B1B4;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgdefault {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    span {
      color: #B1B1B4;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
