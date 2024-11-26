<template>
  <div :class="['time-picker-custom', themeClass]">
    <div
      @click="toggleDropdown"
      v-click-outside="handleClickOutside"
      class="set-time-value cursor-pointer font-md"
    >
      <bib-input
        v-model="value"
        :size="'sm'"
        type="text"
        input_id="time-input"
        @keypress="keyPressHandler"
        placeholder="HH:MM"
        :variant="isLightThemeCheck ? 'light' : 'dark'"
        autocomplete="off"
      ></bib-input>
    </div>

    <div v-if="modalOpened" :class="['dropdown-timepicker', themeClass]" ref="dropdown">
      <div>
        <select
          v-model="selectedHour"
          class="time-select"
          @change="emitTimeChange"
        >
          <option value="" disabled>HH</option>
          <option
            v-for="hour in hours"
            :key="hour"
            :value="hour"
            @click="handleHourClick"
          >
            {{ formatTimeUnit(hour) }}
          </option>
        </select>
      </div>
      <div class="time-separator pl-05 pr-05">:</div>
      <div>
        <select
          v-model="selectedMinute"
          class="time-select"
          @change="emitTimeChange"
        >
          <option value="" disabled>MM</option>
          <option
            v-for="minute in minutes"
            :key="minute"
            :value="minute"
            @click="handleMinuteClick"
          >
            {{ formatTimeUnit(minute) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    is24Hour: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      modalOpened: false,
      hour: "00",
      minute: "00",
      selectedHour: '',
      selectedMinute: '',
      hours: [],
      minutes: [],
      value: null,
    };
  },
  computed: {
    themeClass() {
      return this.isLightThemeCheck ? 'light-theme' : 'dark-theme';
    },
  },
  created() {
    // Generate hours array (0-23 or 1-12 based on is24Hour prop)
    const maxHours = this.is24Hour ? 23 : 12;
    const startHour = this.is24Hour ? 0 : 1;
    this.hours = Array.from(
      { length: maxHours + 1 },
      (_, i) => startHour + i
    );

    // Generate minutes array (0-59)
    this.minutes = Array.from(
      { length: 60 },
      (_, i) => i
    );

    // Set initial values if provided
    if (this.modelValue) {
      const [hour, minute] = this.modelValue.split(':');
      this.selectedHour = parseInt(hour);
      this.selectedMinute = parseInt(minute);
    }
  },
  methods: {
    handleHourClick(ev) {
      console.log(ev);
    },
    handleMinuteClick(ev) {},
    async keyPressHandler(evt) {
      const value = evt.target.value;
      const charCode = evt.which || evt.keyCode;
      const cursorPosition = evt.target.selectionStart;
      // if (this.isEnterKey(charCode)) {
      //   this.handleEnterKey(evt);
      //   return;
      // }
      if (this.isValidKeyPress(value, charCode, cursorPosition)) {
        // this.handleValidKeyPress(value, charCode);
        return true;
      } else {
        evt.preventDefault();
      }
    },
    isValidKeyPress(value, charCode, cursorPosition) {
      const cleanValue = this.cleanInput(value);
      if(cleanValue?.length >= 4){
        return false;
      }
      if(cursorPosition == 0 && cleanValue?.length != 0){
        if(cleanValue[0] > 3) {
          return this.isBetween(charCode, 48, 49)
        }
        return this.isBetween(charCode, 48, 50);
      }else if(cursorPosition == 1 && cleanValue[0] > 1) {
        return this.isBetween(charCode, 48, 51);
      } else if((cursorPosition === 2 || cursorPosition === 3) && cleanValue?.length != 2) {
        return this.isBetween(charCode, 48, 53);
      }
      return this.isBetween(charCode, 48, 57)
    },

    isEnterKey(charCode) {
      return charCode === 13;
    },
    cleanInput(value) {
      return value?.replace(/[^0-9]/g, '');
    },
    isValidInput(input) {
      return input?.length >= 4;
    },
    isBetween(value, min, max) {
      return value >= min && value <= max;
    },
    toggleDropdown() {
      this.modalOpened = !this.modalOpened;
      if (this.modalOpened) {
        this.setCurrentTime();
      }
    },
    handleClickOutside(event) {
      if (!this.$refs?.dropdown?.contains(event.target)) {
        this.modalOpened = false;
      }
    },
    formatTime() {
      const formattedHour = this.hour && this.hour.length === 2 ? this.hour : "00";
      const formattedMinute = this.minute && this.minute.length === 2 ? this.minute : "00";
      return `${formattedHour}:${formattedMinute}`;
    },
    setCurrentTime() {
      const now = DateTime.local();
      this.hour = now.toFormat("HH");
      this.minute = now.toFormat("mm");
    },
    validateHour(value) {
      let sanitizedValue = value.replace(/[^0-9]/g, "");
      if (sanitizedValue.length > 2) {
        sanitizedValue = sanitizedValue.slice(0, 2);
      }
      if (parseInt(sanitizedValue, 10) > 24) {
        sanitizedValue = "24";
      }
      this.hour = sanitizedValue;
    },
    validateMinute(value) {
      let sanitizedValue = value.replace(/[^0-9]/g, "");
      if (sanitizedValue.length > 2) {
        sanitizedValue = sanitizedValue.slice(0, 2);
      }
      if (parseInt(sanitizedValue, 10) > 59) {
        sanitizedValue = "59";
      }
      this.minute = sanitizedValue;
    },
    restrictToNumbers(event, type) {
      const key = event.key;
      const value = type === "hour" ? this.hour : this.minute;

      if (
        !/^[0-9]$/.test(key) &&
        key !== "Backspace" &&
        key !== "Enter" &&
        key !== "ArrowUp" &&
        key !== "ArrowDown" &&
        key !== "ArrowLeft" &&
        key !== "ArrowRight" &&
        key !== "Tab"
      ) {
        event.preventDefault();
      }

      if (
        value.length >= 2 &&
        key !== "Backspace" &&
        key !== "Enter" &&
        key !== "ArrowUp" &&
        key !== "ArrowDown" &&
        key !== "ArrowLeft" &&
        key !== "ArrowRight" &&
        key !== "Tab"
      ) {
        event.preventDefault();
      }
    },
    increaseHour() {
      if (this.hour !== "") {
        let newHour = parseInt(this.hour, 10) + 1;
        if (newHour > 23) newHour = 0;
        this.hour = newHour.toString().padStart(2, "0");
      }
    },
    decreaseHour() {
      if (this.hour !== "") {
        let newHour = parseInt(this.hour, 10) - 1;
        if (newHour < 0) newHour = 23;
        this.hour = newHour.toString().padStart(2, "0");
      }
    },
    increaseMinute() {
      if (this.minute !== "") {
        let newMinute = parseInt(this.minute, 10) + 1;
        if (newMinute > 59) newMinute = 0;
        this.minute = newMinute.toString().padStart(2, "0");
      }
    },
    decreaseMinute() {
      if (this.minute !== "") {
        let newMinute = parseInt(this.minute, 10) - 1;
        if (newMinute < 0) newMinute = 59;
        this.minute = newMinute.toString().padStart(2, "0");
      }
    },
    formatTimeUnit(unit) {
      return unit.toString().padStart(2, '0');
    },
    emitTimeChange() {
      if (this.selectedHour !== '' && this.selectedMinute !== '') {
        const formattedTime = `${this.formatTimeUnit(this.selectedHour)}:${this.formatTimeUnit(this.selectedMinute)}`;
        this.$emit('update:modelValue', formattedTime);
        this.$emit('change', formattedTime);
      }
    }

  },
};
</script>

<style lang="scss">
.time-picker-custom {
  padding: 30px;
  position: relative;
  display: flex;

  &.light-theme {
    .set-time-value {
      color: $gray6;
      width: 170px;
      height: 49px;
      display: flex;
      align-items: center;
      min-width: 100%;
    }
    .dropdown-timepicker {
      border-radius: 6px;
      display: flex;
      max-width: 200px;
      position: absolute;
      top: 60px;
      left: 8px;
      z-index: 9999;
      border: 1px solid $light;
      margin: 0;
      padding: 20px !important;
      background-color: $white;
      color: $gray5;
    }
    .time-select {
      padding: 8px;
      border: 1px solid $light-sub2;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
      background-color: $light;
      min-width: 40px;
      color: $dark;

      &::-webkit-scrollbar {
        width: 6px; /* Width of the scrollbar */
      }

      &::-webkit-scrollbar-track {
        background: $light; /* Track color */
      }

      &::-webkit-scrollbar-thumb {
        background: $gray5; /* Thumb color */
        border-radius: 4px; /* Rounded corners for the thumb */
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $gray6; /* Hover color for the thumb */
      }
    }

    .time-select:focus {
      border-color: $light-sub3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
    }
  }

  &.dark-theme {
    .set-time-value {
      color: $gray6;
      width: 170px;
      height: 49px;
      display: flex;
      align-items: center;
      min-width: 100%;
    }
    .dropdown-timepicker {
      border-radius: 6px;
      display: flex;
      max-width: 200px;
      position: absolute;
      top: 60px;
      left: 8px;
      z-index: 9999;
      border: 1px solid $light;
      margin: 0;
      padding: 20px !important;
      background-color: $dark;
      color: $gray5;
    }

    .time-select {
      padding: 8px;
      border: 1px solid $dark-sub3;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
      background-color: $dark;
      min-width: 40px;
      color: $dark-sub3;

      &::-webkit-scrollbar {
        width: 6px; /* Width of the scrollbar */
      }

      &::-webkit-scrollbar-track {
        background: $dark; /* Track color */
      }

      &::-webkit-scrollbar-thumb {
        background: $gray5; /* Thumb color */
        border-radius: 4px; /* Rounded corners for the thumb */
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $gray6; /* Hover color for the thumb */
      }
    }

    .time-select:focus {
      border-color: $dark-sub3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
    }
  }



}

.time-picker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.time-separator {
  margin-top: 2px;
  font-size: 22px;
  font-weight: bold;
  color: #666;
}
</style>
