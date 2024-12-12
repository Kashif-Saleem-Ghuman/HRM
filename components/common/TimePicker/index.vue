<template>
  <div :class="['custom-time-picker', themeClass]">

    <div class="dropdown-timepicker">
      <input-timer-picker
        :placeholder="getHourPlaceholder"
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
        :placeholder="getMinutePlaceholder"
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
    },
    placeholder: {
      type: String,
      default: 'HH:MM'
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
    getHourPlaceholder() {
      return this.placeholder.split(':')[0];
    },
    getMinutePlaceholder() {
      return this.placeholder.split(':')[1];
    }
  },
  methods: {

    tabPressHandler(evt) {
      this.emitTimeChange()
    },
    timeClickHandler(val) {
      this.emitTimeChange();
    },
    formatTimeUnit(unit) {
      unit = unit || '00'
      return unit?.toString()?.padStart(2, '0');
    },
    emitTimeChange() {

      const waitTime = this.minute && this.hour ? 0 : 7000;

      if(this.minute && this.hour) {
        clearTimeout(this.timeoutId);
        this.isWaiting = false;
      }

      if(!this.isWaiting) {
        this.isWaiting = true;
        this.timeoutId = setTimeout(() => {
          this.isWaiting = false;
          const formattedTime = `${this.formatTimeUnit(this.hour)}:${this.formatTimeUnit(this.minute)}`;
          if (this.hour !== null && this.value !== formattedTime) {
            this.$emit('update:modelValue', formattedTime);
            this.$emit('change', formattedTime);
          }
        }, waitTime)
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
  background-color: transparent !important;

  .time-separator {
    margin: 2px 3px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }



}
</style>
