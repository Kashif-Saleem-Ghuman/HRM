<template>
  <div
    :class="['time-select input-wrapper', themeClass ]">
    <div :class="['input-container']">
      <input
        id="timeInput"
        type="text"
        v-model="timeValue"
        :placeholder="placeholder"
        ref="time_input_ref"
        @keypress="keyPressHandler"
        @input="inputHandler"
        autocomplete="off"
        @change="timeChangeHandler(timeValue)"
        @keydown.tab="tabPressHandler"
      />
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
    parseString(time) {
      return typeof time && time === "string" ? time : time?.toString();
    },
    parseTime(time) {
      return this.parseString(time)?.length !== 1 ? time : `0${time}`;
    },
    timeChangeHandler(val) {
      this.timeValue = this.parseTime(val);
      this.updateHourMinute();
      this.$emit("timeClick", this.timeValue);
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

    inputHandler(evt) {
      this.$emit("update:minute", evt.target.value);

    },

    handleNextInput(evt, value) {
      const charCode = evt.which ? evt.which : evt.keyCode;
      const char = String.fromCharCode(charCode);
      const inputs = document.querySelectorAll('#timeInput');
      const currentIndex = Array.from(inputs).indexOf(evt.target);
      if (currentIndex !== -1 && currentIndex + 1 < inputs.length) {
        const nextInput = inputs[currentIndex + 1];
        if (nextInput) {
          nextInput.value = char;
          nextInput.focus();
        }
      }
      evt.preventDefault()
    },

    keyPressHandler(evt) {
      const value = this.$refs.time_input_ref.value;
      const charCode = evt.which ? evt.which : evt.keyCode;
      const char = String.fromCharCode(charCode);
      const selectionStart = this.$refs.time_input_ref.selectionStart;
      if (this.type === "hour") {
        if (value.length >= 2 && this.value === null) {
          this.handleNextInput(evt, value);
        }
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
    tabPressHandler(evt) {
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
  max-height: 33px;
  max-width: 43px;
  min-width: 32px;
}
.input-wrapper {
  display: inline-flex !important;
  align-items: center;
  position: relative;
  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
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
  }
}
</style>
