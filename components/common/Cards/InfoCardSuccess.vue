<template>
  <div class="info-card-success-wrapper">
    <div>
      <label>Leave status</label>
    </div>
    <div class="info-card-inner-wrapper" :class="[classNameWrapper]">
      <div
        class="d-flex align-center cursor-pointer shape-circle mr-05"
        style="padding: 12px"
        @click.stop="$emit('on-click')"
        :class="[className]"
      >
        <bib-icon :icon="icon" :variant="variant" :scale="1"></bib-icon>
      </div>
      <div>
        <label>{{label}}</label>
        <div>{{ message }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chips",
  props: {
    label: {
      type: String,
    },
    message: {
      type: String,
    },
    icon: {
      type: String,
    },
    variant: {
      type: String,
    },
    className:{
      type:Array
    },
    classNameWrapper:{
      type:Array
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.info-card-success-wrapper {
  padding: 12px 0;
  font-size: 14px;

  label {
    font-size: 1rem;
    font-weight: 600;
  }
  .info-card-inner-wrapper {
    display: flex;
    background-color: $light;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
    label {
      font-weight: 700;
    }
    &_desc {
      font-size: 10px;
    }
  }
}
</style>
