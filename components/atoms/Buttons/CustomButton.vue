<template>
   <a
    class="button d-flex align-center cursor-pointer text-success bg-success-sub6 bg-hover-success-sub3 shape-rounded pl-05 pt-025 pb-025 pr-075 mr-05 font-md"
    :class="[
      variant ? 'button--' + variant : '',
      disabled ? 'button--' + disabled :'',
    ]"
    :href="href"
    @click="$emit('click')"
    
  >
  <div class="text-center w-200" :class="['button--' + size]" >
        <slot name="button">{{ label }}</slot>
      </div>
  </a>
</template>

<script>
export default {
  name: "BlackButton",
  props: {
    label: {
      type: String,
      default() {
        return null;
      },
    },
    href: {
      type: String,
      default() {
        return null;
      },
    },
    size: {
      type: String,
      default() {
        return "md";
      },
    },
    variant: {
      type: String,
      default() {
        return "";
      },
    },
    disabled: {
      type: String,
      default() {
        return "";
      },
    },
    
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$black-button: #2BA026;
$white: #fff;
$font-size-sm:14px;
$base-size: 16px;
$dark-sub: var(--bib-dark-sub2);
.button {
  // display: inline-block;
  // align-items: center;
  // position: relative;
  // text-decoration: none;
  // cursor: pointer;
  // // padding: 0.25rem 1rem;
  // border-radius: 0.5rem;

  &--dark {
    // background-color: $black-button;
    color: $white;
    // min-width:150px;
  }
  &--disabled {
  cursor: not-allowed;
  // opacity: 0.5;
}
  &:focus,
  &:active,
  &:focus-within {
    // box-shadow: 0 0 0 0.2rem $dark-sub;
  }
  &--custom {
    padding: 11px 24px;
    // font-size: $base-size;
    font-weight:600
  }
}
</style>
