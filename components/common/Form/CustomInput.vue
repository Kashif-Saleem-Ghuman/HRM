<template>
    <div class="custom-input">
        <label v-if="label"> {{ label }} </label>
        <template v-if="indicator">
      <div :class="textClass">
        <div :class="'shape-circle bg-' + indicator"></div>
      </div>
    </template>
      <template v-if="type == 'multiselect'">
        <div>
          <select
            :name="name"
            @change="inputEvent"
            :required="required"
            :disabled="disabled"
            :test_id="test_id"
            :test_name="test_name"
            multiple
            style="height: 60px; overflow: scroll;"
          >
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
              :selected="value == option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <!-- <bib-icon icon="arrow-down" :scale="0.6"></bib-icon> -->
        </div>
      </template>
  
    </div>
  </template>
  
  <script>
  
  export default {
    name: "CustomInput",
    props: {
      readonly: {
        type: Boolean,
        default() {
          return false;
        },
      },
      type: {
        type: String,
        default() {
          return "text";
        },
      },
      selectedOrg: {
        type: Object,
        default() {
          return {
            label: "Selected Item",
            img: "https://i.pravatar.cc/300",
          };
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
          return null;
        },
      },
      value: [String, Number],
      name: {
        type: String,
        default() {
          return null;
        },
      },
      placeholder: {
        type: String,
        default() {
          return null;
        },
      },
      min: {
        type: Number,
        default() {
          return null;
        },
      },
      max: {
        type: Number,
        default() {
          return null;
        },
      },
      step: {
        type: Number,
        default() {
          return 1;
        },
      },
      required: {
        type: Boolean,
        default() {
          return false;
        },
      },
     
      label: {
        type: String,
        default() {
          return null;
        },
      },
      options: {
        type: Array,
        default() {
          return [];
        },
      },

    
      disabled: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    data() {
      return {
       
      };
    },
    computed: {
      classNames() {
        return `input input--${this.variant} input--${this.size} ${
          this.disabled ? "input--disabled" : ""
        }`;
      },
    },
    created() {},
    methods: {
      inputEvent(event) {
        this.$emit("input", event.target.value);
      },
      keypressEvent(event) {
        this.$emit("keypress", event);
      },
      keydownEvent(event) {
        this.$emit("keydown", event);
      },
      keydownUp(event) {
        this.$emit("keyup", event);
      },
      changeEvent(event) {
        this.$emit("change", event.target.value);
      },
      blurEvent(event) {
        this.$emit("blur", event.target.value);
      },
      focusEvent(event) {
        this.$emit("focus", event.target.value);
      },
      taskToggle(event) {
        event.preventDefault();
        console.log(!this.taskValue);
        this.taskValue = !this.taskValue;
        this.$emit("task-val-change", this.taskValue);
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .custom-input {
    position: relative;
    width: 100%;
    select {
      padding: 0px;
      font-size: $base-size;
      line-height: 1.2;
      width: 100%;
      border: 1px solid $gray4;
      border-radius: 0.2rem;
      margin: 0.5rem 0;
      color: $dark;
      min-height: 2.5rem;
  
      &:hover {
        border-color: $gray5;
      }
  
      &:focus {
        outline: none;
        border: 1.5px solid $gray6;
      }
    }
    &--select {
      position: relative;
      z-index: 3;
      color: $black;
      border: 1px solid $gray6;
      background-color: $light;
      letter-spacing: 0.035rem;
      line-height: 2.5rem;
      font-size: $base-size;
      @extend .shape-rounded !optional;
      position: relative;
      transition: height 0.2s ease-in, width 0.2s ease-in, color 0.2s ease-in,
        padding 0.2s ease-in, margin 0.2s ease-in;
      height: 100%;
      padding: 0.5rem 0.5rem 0 0rem;
      margin: -0.5rem 0.5rem;
      overflow: hidden;
      .icon {
        transition: transform 0.2s ease-in;
        transform: rotate(180deg);
      }
      &--collapsed {
        background-color: transparent;
        color: $gray6;
        padding: 0;
        margin: 0 1rem;
        height: 2.5rem;
        .icon {
          transform: rotate(0deg);
        }
        &:hover {
          .icon {
            &::v-deep {
              svg {
                fill: $white;
                background: transparent;
              }
            }
          }
          color: $white;
          background-color: rgba(177, 177, 180, 0.4);
        }
      }
  
      &__options {
        top: 2.5rem;
        left: -0.25rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.25rem;
        z-index: 9;
        height: inherit;
        width: 104%;
      }
      &__option {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 0 0 0.75rem;
        color: $gray6;
      }
  
      &__footer {
        display: flex;
        align-items: center;
        max-height: 2.5rem;
        gap: 1rem;
        line-height: 2.5rem;
        border-top: 1px solid $gray4;
        margin-top: 0.5rem;
        cursor: pointer;
      }
    }
    
    label {
      color: $gray6;
    }
  
    span.input-instruction {
      color: $gray6;
      font-size: 84%;
    }
  
    ::placeholder {
      color: $gray5;
    }
  
    textarea {
      resize: none;
      width: 100%;
      height: 5.5rem;
      border: 1px solid $gray4;
      padding: 0.9em 0.5rem;
      border-radius: 0.25rem;
      font-size: $base-size;
  
      &:focus {
        outline: none;
      }
    }
  
    .wrapper {
      $wrapper: &;
      position: relative;
      .icon {
        position: absolute;
        top: 1.4rem;
      }
      .avatar {
        position: absolute;
        top: 0.95rem;
      }
      &.with-left-icon {
        input {
          padding-left: 2rem;
        }
        .left-icon {
          left: 0.6rem;
        }
      }
      &.with-right-icon {
        input {
          padding-right: 2rem;
        }
        .right-icon {
          right: 0.6rem;
        }
      }
      &.with-left-avatar {
        input {
          padding-left: 2.4rem;
        }
        .left-avatar {
          left: 0.4rem;
        }
      }
      &.with-right-avatar {
        input {
          padding-right: 2.4rem;
        }
        .right-avatar {
          right: 0.4rem;
        }
      }
    }
  
    select {
      appearance: none;
      + .icon {
        position: absolute;
        right: 0.6rem;
        top: 1.5rem;
      }
    }
  
    /*---------- size ----------*/
    &--sm {
      input,
      select {
        min-height: 2rem;
        font-size: $font-size-sm;
        border-radius: 0.18rem;
      }
      .wrapper .icon {
        top: 1rem;
      }
      .wrapper .avatar {
        top: 0.8rem;
      }
    }
  
    &--lg {
      input,
      select {
        min-height: 3rem;
        font-size: $font-size-lg;
        border-radius: 0.3rem;
      }
      .wrapper {
        .icon {
          top: 1.4rem;
        }
        .avatar {
          top: 1.1rem;
        }
        &.with-left-icon {
          input {
            padding-left: 2.3rem;
          }
        }
        &.with-right-icon {
          input {
            padding-right: 2.3rem;
          }
        }
        &.with-left-avatar {
          input {
            padding-left: 3rem;
          }
          .left-avatar {
            left: 0.7rem;
          }
        }
        &.with-right-avatar {
          input {
            padding-right: 3rem;
          }
          .right-avatar {
            right: 0.7rem;
          }
        }
      }
    }
  
    /*---------- variant ----------*/
    &--transparent {
      input,
      textarea,
      select {
        background-color: transparent;
        color: $white;
      }
      .icon {
        &::v-deep {
          fill: $gray4;
        }
      }
    }
    &--ghost {
      input,
      textarea,
      select {
        color: $gray4;
        border-color: $gray4;
        background-color: $gray6;
  
        &:hover {
          border-color: $gray4;
        }
  
        &:focus {
          border-color: $gray4;
        }
      }
  
      label {
        color: $gray5;
      }
  
      span.input-instruction {
        color: $gray5;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $gray4;
      }
    }
    &--dark {
      $dark: &;
      input,
      textarea,
      select {
        border: none;
        color: $secondary-sub1;
        background-color: $dark-sub3;
        transition: background-color 0.15s ease-in;
        $input: &;
        &:hover {
          background-color: $light;
          color: $black;
          &::placeholder {
            color: $black;
          }
          & + .icon::v-deep {
            svg {
              fill: $black !important;
            }
          }
        }
      }
      .icon {
        &::v-deep {
          fill: $black !important;
        }
      }
      label {
        color: $light;
      }
  
      span.input-instruction {
        color: $gray4;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $light;
      }
    }
    &--light {
      input,
      textarea,
      select {
        border: none;
        color: $black;
        background-color: $light;
        transition: background-color 0.15s ease-in;
        &:hover {
          &::placeholder {
            color: $black;
          }
          & + .icon::v-deep {
            svg {
              fill: $black !important;
            }
          }
        }
      }
      .icon {
        &::v-deep {
          fill: $black !important;
        }
      }
      label {
        color: $light;
      }
  
      span.input-instruction {
        color: $gray4;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $secondary;
      }
    }
    &--alert {
      input,
      textarea,
      select {
        color: $danger;
        border-color: $danger-sub2;
        background-color: $danger-sub3;
  
        &:hover {
          border-color: $danger;
        }
  
        &:focus {
          border-color: $danger;
        }
      }
  
      label {
        color: $danger-sub1;
      }
  
      span.input-instruction {
        color: $danger-sub1;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $danger-sub1;
      }
    }
  
    &--warning {
      input,
      textarea,
      select {
        color: #bdab60;
        border-color: #e3d176;
        background-color: $warning-sub3;
  
        &:hover {
          border-color: $warning;
        }
  
        &:focus {
          border-color: $warning;
        }
      }
  
      label {
        color: #bdab60;
      }
  
      span.input-instruction {
        color: #bdab60;
        font-size: 85%;
      }
  
      ::placeholder {
        color: #dcc96d;
      }
    }
  
    &--accepted {
      input,
      textarea,
      select {
        color: $success;
        border-color: $success-sub2;
        background-color: $success-sub3;
  
        &:hover {
          border-color: $success;
        }
  
        &:focus {
          border-color: $success;
        }
      }
  
      label {
        color: $success-sub1;
      }
  
      span.input-instruction {
        color: $success-sub1;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $success-sub1;
      }
    }
  
    &--secondary {
      input,
      select {
        color: $white;
        border-color: $white;
        background-color: $secondary-sub1;
  
        &:hover {
          border-color: $gray3;
        }
      }
      label {
        color: $gray4;
      }
  
      span.input-instruction {
        color: $gray4;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $gray4;
      }
  
      textarea {
        border-color: $gray4;
  
        &:focus {
          border-color: $gray4;
        }
      }
    }
    /*---------- disabled ----------*/
    &--disabled {
      input,
      select {
        color: $gray1;
        border-color: $gray3;
        background-color: $gray4;
  
        &:hover {
          border-color: $gray3;
        }
      }
  
      label {
        color: $gray5;
      }
  
      span.input-instruction {
        color: $gray5;
        font-size: 85%;
      }
  
      ::placeholder {
        color: $gray4;
      }
  
      textarea {
        border-color: $gray4;
  
        &:focus {
          border-color: $gray4;
        }
      }
    }
  
    &__img {
      select,
      input {
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid $secondary;
        font-size: $base-size;
        padding: 0 0 0 3.5rem;
      }
  
      .avatar {
        position: absolute;
        top: 0.2rem;
        left: 0.25rem;
      }
    }
  
    // &__icon {
    //   text-align: center;
  
    //   input {
    //     padding: 0rem 1rem 0rem 1rem;
    //   }
  
    //   .icon {
    //     position: absolute;
    //     top: 0.75rem;
    //     right: 0.5rem;
    //   }
    // }
    }
  </style>
  