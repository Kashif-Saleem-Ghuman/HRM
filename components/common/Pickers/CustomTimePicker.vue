<template>
  <div :class="classNames" v-click-outside="handleOutside">
    <label v-if="label"> {{ label }} </label>
    <!-- Manual Input -->
    <div class="input-wrapper">
      <input
        type="text"
        v-mask="'##:##'"
        :value="value"
        :test_id="test_id"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @input="inputEvent"
        @keypress="keypressEvent"
        @keydown="keydownEvent"
        @keydown.tab="keydownTabEvent"
        @keyup="keyupEvent"
        @change="changeEvent"
        @blur="blurEvent"
        @focus="focusEvent"
        ref="input_ref"
        :style="styleObject"
      />
      <bib-icon
        icon="arrowhead-down"
        @click="iconClickHandle"
        class="arrowdown--icon"
      ></bib-icon>
    </div>

    <!-- Present Time Dropdown -->
    <div v-show="isOpenedDropdown && filteredTimes.length > 0" class="select-wrapper">
      <ul ref="list_ref">
        <li
          v-for="(option, index) in filteredTimes"
          :key="index"
          @click="handleSelect(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * @module Melecules/BibTimePicker
 * @author Jianyu Wu
 * @desc Time Picker component.
 * @vue-prop {String} label=null - label text.
 * @vue-prop {String} variant=null - variant (alert, warning, accepted).
 * @vue-prop {String} value v-model.
 * @vue-prop {String} name=null - text value.
 * @vue-prop {String} placeholder=null - placeholder value.
 * @vue-prop {Boolean} required=false - on / off state.
 * @vue-prop {Boolean} disabled=false - on / off state.
 * @vue-prop {String} test_id - setting test id.
 */
export default {
  name: "CustomTimePicker",
  props: {
    value: {
      type: String,
      default() {
        return null;
      },
    },
    variant: {
      type: String,
      default() {
        return null;
      },
    },
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
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
    required: {
      type: Boolean,
      default() {
        return false;
      },
    },
    autocomplete: {
      type: String,
      default() {
        return "off";
      },
    },
    label: {
      type: String,
      default() {
        return null;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    test_id: {
      type: String,
      default() {
        return null;
      },
    },
    isLightTheme: {
      type: Boolean,
      default() {
        return null;
      },
    },
    styleObject: {
      type: Object,
      default() {
        return {};
      },
    },
    size: {
      type: String,
      default() {
        return "md";
      },
    },
  },
  data() {
    return {
      manualInput: "",
      selectedOption: "",
      isOpenedDropdown: false,
      presentTimes: [],
    };
  },
  computed: {
    filteredTimes() {
      return this.presentTimes.filter((time) =>
        time.startsWith(this.manualInput)
      );
    },
    classNames() {
      const basicClassName = "bib-time-picker";
      return [
        basicClassName,
        this.disabled && `${basicClassName}--disabled`,
        (this.isLightTheme  !== null ? this.isLightTheme : this.isLight)
          ? `${basicClassName}--light-theme`
          : `${basicClassName}--dark-theme`,
        `picker--${this.size}`,
      ];
    },
    presentTimeOptions() {
      const times = [];
      const startDate = new Date(0); // January 1, 1970 00:00:00 UTC
      for (let i = 0; i < 24 * 6; i++) {
        const currentTime = new Date(startDate.getTime() + i * 10 * 60 * 1000);
        const hours = currentTime.getUTCHours().toString().padStart(2, "0");
        const minutes = currentTime.getUTCMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        times.push(formattedTime);
      }
      return times;
    },
    currentTime() {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}`;
      return formattedTime;
    },
    isLight() {
      return this.$store.state.uiLibStore.isLightMode;
    },
  },
  created() {
    this.presentTimes = this.presentTimeOptions;
  },
  mounted() {},
  methods: {
    scrollToHighlight() {
      const list = this.$refs.list_ref;
      const listItems = list.getElementsByTagName("li");
      const time = this.$refs.input_ref.value || this.currentTime;
      const hour = time.slice(0, 2);
      const minute = time.slice(-2);
      let highLightTime = "";
      if (parseInt(minute) === 0) {
        highLightTime = `${hour}:00`;
      } else if (parseInt(minute) <= 30) {
        highLightTime = `${hour}:30`;
      } else {
        highLightTime = hour !== "23" ? `${parseInt(hour) + 1}:00` : "00:00";
      }
      if (highLightTime.length === 4) {
        highLightTime = `0${highLightTime}`;
      }
      for (let i = 0; i < this.presentTimes.length; i++) {
        listItems[i]?.classList?.remove("time-highlight");
        if (this.presentTimes[i] === highLightTime) {
          this.$nextTick(() => {
            listItems[i]?.classList?.add("time-highlight");
            list.scrollTop =
              i > 0 ? listItems[i - 1]?.offsetTop : listItems[i]?.offsetTop;
          });
        }
      }
    },
    inputEvent(event) {
      // emit input event
      this.manualInput = event.target.value;
      this.$emit("input", event.target.value);
    },
    changeEvent(event) {
      this.$emit("change", event.target.value);
    },
    blurEvent(event) {
      this.$emit("blur", event.target.value);
    },
    focusEvent(event) {
      this.isOpenedDropdown = true;
      this.scrollToHighlight();
      this.$emit("focus", event.target.value);
    },
    keydownEvent(event) {
      this.$emit("keydown", event);
    },
    keydownTabEvent(event) {
      this.isOpenedDropdown = false;
      this.$emit("keydown.tab", event);
    },
    keyupEvent(event) {
      this.$emit("keyup", event);
    },
    keypressEvent(evt) {
      // add additional mask
      const value = this.$refs.input_ref.value;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        (value.length === 0 && charCode >= 48 && charCode <= 50) ||
        ((value.length === 2 || value.length === 3) &&
          charCode >= 48 &&
          charCode <= 53) ||
        (value.length === 1 &&
          (value === "0" ||
            value === "1" ||
            (value === "2" && charCode >= 48 && charCode <= 51))) ||
        value.length === 4
      ) {
        return true;
      } else {
        evt.preventDefault();
      }
      // emit keypress
      this.$emit("keypress", evt);
    },
    handleSelect(option) {
      this.$emit("select-change", option);
      this.isOpenedDropdown = false;
      this.manualInput = "";
    },
    iconClickHandle() {
      if (!this.disabled) {
        this.isOpenedDropdown = true;
        this.scrollToHighlight();
      }
    },
    handleOutside() {
      if (
        this.$refs.input_ref.value > 0 &&
        this.$refs.input_ref.value.length < 5
      ) {
        this.$emit("input", "");
      }
      this.isOpenedDropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.bib-time-picker {
  position: relative;
  width: 100%;

  .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    input {
      padding: 0rem 0.5rem 0rem 0.5rem;
      font-size: $base-size;
      line-height: 1.2;
      width: 100%;
      border: 1px solid $gray4;
      border-radius: 0.2rem;
      margin: 0.5rem 0;
      color: $dark;
      min-height: 2.5rem;
      outline: none;

      &:hover {
        border-color: $gray5;
        border: 1.5px solid $gray6;
      }
    }
    .arrowdown--icon {
      position: absolute;
      right: 0.5rem;
    }
  }

  &--disabled {
    input {
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
    ::placeholder {
      color: $gray4;
    }
  }

  .select-wrapper {
    width: 100%;
    border: 1px solid $gray4;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    position: absolute;
    top: 4.3rem;
    left: 0rem;
    min-width: max-content;
    background: $white !important;
    box-shadow: 0px 2px 8px #00000029;
    padding: 0;
    overflow: hidden;
    z-index: 2;
    transition: 0.15s all ease;
    ul {
      max-height: 250px;
      overflow: auto;
      list-style-type: none;
      margin: 0;
      padding: 0 0.5rem;
      scroll-behavior: auto !important;
      @include scrollbars(0.65rem, $gray4, transparent);
      li {
        padding: 0.2rem 0 0.2rem 0.1rem;
        font-size: $font-size-sm;
        &:hover {
          background: $light;
          font-weight: 600;
        }
      }
    }
  }

  &--light-theme {
    label {
      color: $gray6;
    }

    ::placeholder {
      color: $gray5;
    }

    .input-wrapper {
      input {
        border: 1px solid $border-light;
        color: $dark;
        background: $light-sub2;

        &:hover {
          border-color: $gray5;
          border: 1.5px solid $gray6;
        }
      }
      .arrowdown--icon {
      }
    }

    &--disabled {
      input {
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
      ::placeholder {
        color: $gray4;
      }
    }

    .select-wrapper {
      border: 1px solid $gray4;
      background: $white !important;
      box-shadow: 0px 2px 8px #00000029;
      ul {
        li {
          &:hover {
            background: $light;
          }
          &.time-highlight {
            background: $light;
          }
        }
      }
    }
  }

  &--dark-theme {
    label {
      color: $gray6;
    }

    ::placeholder {
      color: $gray5;
    }

    .input-wrapper {
      input {
        border: 1px solid $border-primary;
        color: $light;
        background: $dark;

        &:hover {
          border: 1.5px solid $gray4;
        }
      }
      .arrowdown--icon {
      }
    }

    &--disabled {
      input {
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
      ::placeholder {
        color: $gray4;
      }
    }

    .select-wrapper {
      border: 1px solid $gray6;
      background: $dark !important;
      box-shadow: 0px 2px 8px #00000029;
      ul {
        li {
          color: $light;
          &:hover {
            background: $dark-sub1;
          }
          &.time-highlight {
            background: $dark-sub1;
          }
        }
      }
    }
  }
  &.picker {
    /*---------- size ----------*/
    &--sm {
      input {
        min-height: 2rem;
        font-size: $font-size-sm;
        border-radius: 0.18rem;
        margin: 0.3rem 0;
      }
    }

    &--lg {
      input {
        min-height: 3rem;
        font-size: $font-size-lg;
        border-radius: 0.3rem;
      }
    }
  }
}
</style>
