<template>
  <div :class="['custom-time-picker', themeClass]">

    <div class="dropdown-timepicker">
      <input-timer-picker
        placeholder="HH"
        :is24-hour="true"
        type="hour"
        :value="hour"
        :hour.sync="hour"
        @tabpress="tabPressHandler"
        @timeClick="timeClickHandler"
      >
      </input-timer-picker>
      <span class="time-separator">:</span>
      <input-timer-picker
        placeholder="MM"
        :is24-hour="true"
        type="minute"
        :value="minute"
        :minute.sync="minute"
        @tabpress="tabPressHandler"
        @timeClick="timeClickHandler"
      >
      </input-timer-picker>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DropdownTimePickerNew',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    is24Hour: {
      type: Boolean,
      default: true
    },
    value: {
      type: String | Number,
      default: null,
    }
  },
  data() {
    return {
      selectedHour: '',
      selectedMinute: '',
      hour: null,
      minute: null,
      isWaiting: false,
    }
  },
  computed: {
    themeClass() {
      return this.isLightThemeCheck ? 'light-theme' : 'dark-theme';
    },
  },
  methods: {

    tabPressHandler(evt) {
      const waitTime = !this.minute ? 3000 : 0;
      this.emitTimeChange(waitTime)
    },
    timeClickHandler(val) {

      const waitTime = !this.minute ? 3000 : 0;
      this.emitTimeChange(waitTime);
    },
    formatTimeUnit(unit) {
      unit = unit || '00'
      return unit?.toString()?.padStart(2, '0');
    },
    emitTimeChange(waitTime = 0) {
      const formattedTime = `${this.formatTimeUnit(this.hour)}:${this.formatTimeUnit(this.minute)}`;
      if (this.hour !== null && this.value !== formattedTime) {

        if(!this.isWaiting) {
          this.isWaiting = true;
          setTimeout(() => {
            this.isWaiting = false;
            this.$emit('update:modelValue', formattedTime);
            this.$emit('change', formattedTime);
          }, waitTime)
        }

      }
    },
    setHourMinute(time) {
      if(!time) {
       this.hour = time;
       this.minute = time;
       return;
      }
      const [hour, minute] = time?.split(':');
      this.hour = hour;
      this.minute = minute;
    },
  },

  watch: {
    value(time) {
      this.setHourMinute(time);
    },
  },
}
</script>

<style lang="scss">
.custom-time-picker {
  padding: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  &.light-theme {

    .dropdown-timepicker {
      border-radius: 6px;
      margin: 0;
      color: $gray5;
    }

    .time-select {
      display: inline;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
      background-color: $light;
      max-width: 53px;
      max-height: 30px;

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

    .dropdown-timepicker {
      border-radius: 6px;
      margin: 0;
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
      min-width: 70px;
      color: $dark-sub3;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: $dark;
      }

      &::-webkit-scrollbar-thumb {
        background: $light;
        border-radius: 4px;
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

  .time-separator {
    margin: 2px 3px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }



}

.input-wrapper {
  display: inline-flex !important;
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
}


</style>
