<template>
  <div class="d-flex gap-1">
    <div
      class="button-custom"
      :class="[
      className,
      disabled == true ? 'button-custom--disabled' : '',
     
    ]"
     
      @click.stop="$emit('on-click')"
    >
      <bib-icon
        v-if="icon"
        :icon="icon"
        :variant="variant"
        :scale="scale"
      ></bib-icon>
      <span :class="titleClass" class="pl-025">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ButtonDefault",
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
    className: {
      type: String,
    },
    titleClass: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.button-custom {
  display: inline-block;
  align-items: center;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  padding: 0.25rem 1rem !important;
  border-radius: 0.25rem;
  white-space: nowrap;
  user-select: none;
  $self: &;
  &--lightsuccess {
    background-color: #2ba02629 !important;
    display: flex;
    align-items: center;
    height: 32px;
    // max-width: 140px;
    color: #6bbf68 !important;
    svg {
      fill: #6bbf68 !important;
    }
    span {
      font-weight: 500;
      font-size: 14px;
      color: #6bbf68 !important; 
    }
    &:focus,
    &:active,
    &:focus-within {
      box-shadow: 0 0 0 0.2rem #207f1d29 !important;
    }
  }
  &--pending {
    background-color: #f3ced0 !important;
    display: flex;
    align-items: center;
    height: 32px;
    // max-width: 140px;
    color: #e6000e !important;
    svg {
      fill: #e6000e !important;
    }
    span {
      font-weight: 500;
      font-size: 14px;
      color: #e6000e !important;
    }
    &:focus,
    &:active,
    &:focus-within {
      box-shadow: 0 0 0 0.2rem #f4c2c4 !important;
    }
  }
  
  &--disabled {
    cursor: not-allowed;
    display: flex; /* For IE11/ MS Edge bug */
    align-items: center;
    pointer-events: none;
    text-decoration: none;
    
  }
}
</style>
