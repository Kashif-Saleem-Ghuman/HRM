<template>
  <div
    :class="['time-select input-wrapper', themeClass]"
    @click="clickInside"
    v-click-outside="clickOutside"  >
    <div class="input-container">
      <input
        id="hour"
        type="text"
        v-model="timeValue"
        :placeholder="placeholder"
        ref="time_input_ref"
        @keypress="keyPressHandler"
        autocomplete="off"
        @focus="focusHandler"
        @input="inputHandler"
        @keydown.tab="tabPressHandler"
      />
    </div>
    <div v-if="dropdownOpen" class="dropdown-timepicker" ref="dropdown">
      <ul class="time-options" ref="timeOptionsList">
        <li
          v-for="option in options"
          :key="option"
          @click.stop="timeClickHandler(option)"
          :class="{ active: parseTime(timeValue) == parseTime(option) }"
          :ref="parseTime(timeValue) == parseTime(option) ? 'activeOption' : ''"
        >
          {{ formatTimeUnit(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import TimepickerMixin from "@/components/common/TimePicker/timepicker-mixin";
export default {
  name: "InputTimerPicker",
  mixins: [TimepickerMixin],
  data() {
    return {
      selectedHour: "",
      selectedMinute: "",
      hourTime: null,
      minuteTime: null,
      dropdownOpen: false,
      options: [],
      timeValue: null,
    };
  },
  computed: {
    themeClass() {
      return this.isLightThemeCheck ? "light-theme" : "dark-theme";
    },
  },
  created() {
    if (this.type === "hour") {
      this.setHourOptions();
    } else if (this.type === "minute") {
      this.setMinuteOptions();
    }
  },
  methods: {

    clickInside(evt) {
      this.dropdownOpen = true;
      this.scrollToSelected();
    },
    scrollToSelected() {
      this.$nextTick(() => {
        const activeElement = this.$refs.activeOption?.[0];
        const container = this.$refs.timeOptionsList;
        if (activeElement && container) {
          const containerHeight = container.offsetHeight;
          const elementOffset = activeElement.offsetTop;
          const elementHeight = activeElement.offsetHeight;
          container.scrollTop =
            elementOffset - containerHeight / 2 + elementHeight / 2;
        }
      });
    },
    clickOutside() {
      this.dropdownOpen = false;
    },
    parseString(time) {
      return typeof time && time === "string" ? time : time?.toString();
    },
    parseTime(time) {
      return this.parseString(time)?.length !== 1 ? time : `0${time}`;
    },
    timeClickHandler(val) {
      this.timeValue = this.parseTime(val);
      this.updateHourMinute();
      this.$emit("timeClick", this.timeValue);
      this.dropdownOpen = false;
    },
    validateHour(value, charCode, cursorPos) {
      if (charCode < 48 || charCode > 57) {
        return false;
      }
      const newChar = String.fromCharCode(charCode);
      const newValue =
        value.slice(0, cursorPos) + newChar + value.slice(cursorPos);
      if (newValue.length > 2) {
        return false;
      }
      const firstDigit = parseInt(newValue[0]);
      if (cursorPos === 0 || (cursorPos === 1 && value.length === 0)) {
        return firstDigit <= 2;
      }
      if (cursorPos === 1 || (cursorPos === 0 && value.length === 1)) {
        const secondDigit =
          cursorPos === 1 ? parseInt(newChar) : parseInt(value[1]);
        if (firstDigit === 2) {
          return secondDigit <= 3;
        }
        return true;
      }
      return true;
    },
    validateMinute(value, charCode, cursorPos) {
      if (charCode < 48 || charCode > 57) {
        return false;
      }
      const newChar = String.fromCharCode(charCode);
      const newValue =
        value.slice(0, cursorPos) + newChar + value.slice(cursorPos);
      if (newValue.length > 2) {
        return false;
      }
      const firstDigit = parseInt(newValue[0]);
      if (cursorPos === 0 || (cursorPos === 1 && value.length === 0)) {
        return firstDigit <= 5;
      }
      if (cursorPos === 1 || (cursorPos === 0 && value.length === 1)) {
        const secondDigit =
          cursorPos === 1 ? parseInt(newChar) : parseInt(value[1]);
        return secondDigit <= 9;
      }
      return true;
    },
    keyPressHandler(evt) {
      const value = this.$refs.time_input_ref.value;
      const charCode = evt.which ? evt.which : evt.keyCode;
      const selectionStart = this.$refs.time_input_ref.selectionStart;
      if (this.type === "hour") {
        if (this.validateHour(value, charCode, selectionStart)) {
          return true;
        } else {
          evt.preventDefault();
        }
      } else if (this.type === "minute") {
        if (this.validateMinute(value, charCode, selectionStart)) {
          return true;
        } else {
          evt.preventDefault();
        }
      }
    },
    updateHourMinute() {
      if (this.type === "hour") {
        this.$emit("update:hour", this.timeValue);
      } else if (this.type === "minute") {
        this.$emit("update:minute", this.timeValue);
      }
    },
    inputHandler(evt) {
      this.updateHourMinute();
      this.$emit("input", evt);
    },
    tabPressHandler(evt) {
      this.dropdownOpen = false;
      this.$emit("tabpress", evt);
    },
  },
};
</script>
<style lang="scss" scoped>
.time-select {
  display: inline;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: $light;
  max-width: 75px;
  min-width: 65px;
  max-height: 33px;
}
.input-wrapper {
  display: inline-flex !important;
  align-items: center;
  position: relative;
  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
    &::after {
      content: "";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 3px 3px 0 3px;
      border-color: $dark transparent transparent transparent;
      pointer-events: none;
    }
  }
  input {
    padding: 0rem 0.5rem 0rem 0.5rem;
    font-size: $base-size;
    line-height: 2rem;
    width: 100%;
    border: none !important;
    background-color: transparent !important;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
    color: $dark;
    outline: none;
    &:hover {
      border-color: $gray5;
      border: 1.5px solid $gray6;
    }
  }
  .arrowdown--icon {
    position: absolute;
    right: 0;
  }
  .dropdown-timepicker {
    border-radius: 6px;
    display: flex;
    max-width: 200px;
    position: absolute;
    top: 30px;
    left: 1px;
    z-index: 9999;
    border: 1px solid $light;
    margin: 0;
    background-color: $white;
    color: $gray5;
    max-width: 200px;
    max-height: 300px;
    overflow-y: auto;
    .time-options {
      list-style-type: none;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      scrollbar-width: thin;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 4px;
      }
      li {
        padding: 0.5rem 1rem;
        cursor: pointer;
        &.active {
          background-color: $gray5;
          color: $white;
        }
        &:hover {
          background-color: $gray4;
        }
      }
    }
  }
}
.dark-theme {
  .time-select {
    border: 1px solid $dark-sub3;
    background-color: $dark;
  }
  .input-wrapper {
    .input-container {
      &::after {
        border-color: $light transparent transparent transparent;
      }
    }
    input {
      border: none !important;
      background-color: transparent !important;
      color: $light;
      &:hover {
        border: 1.5px solid $dark-sub3;
      }
    }
    .dropdown-timepicker {
      border: 1px solid $dark-sub3;
      background-color: $dark;
      color: $gray5;
      .time-options {
        li {
          &.active {
            background-color: $black;
            color: $white;
          }
          &:hover {
            background-color: $black;
          }
        }
      }
    }
  }
}
</style>
