<template>
  <div class="time-select input-wrapper">
    <input
      id="hour"
      type="text"
      v-model="hourTime"
      :placeholder="placeholder"
      autocomplete="off"
      @focus="focusHandler"
      @blur="blurHandler"
    />
    <bib-icon
      icon="arrowhead-down"
      class="arrowdown--icon"
    ></bib-icon>

    <div v-if="dropdownOpen" class="dropdown-timepicker" ref="dropdown">
      <ul class="time-options">
        <li
          v-for="minute in minutes"
          :key="minute"
          :class="{ 'active': selectedHour === minute }"
        >
          {{ formatTimeUnit(minute) }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import TimepickerMixin from "@/components/common/TimePicker/timepicker-mixin";

export default {
  name: 'MinuteTimerPicker',
  mixins: [ TimepickerMixin ],

  data() {
    return {
      selectedHour: '',
      selectedMinute: '',
      hours: [],
      minutes: [],
      hourTime: null,
      minuteTime: null,
      dropdownOpen: false,
    }
  },
  computed: {
    themeClass() {
      return this.isLightThemeCheck ? 'light-theme' : 'dark-theme';
    },
  },
  created() {
    this.minutes = Array.from(
      { length: 60 },
      (_, i) => i
    );

    if (this.modelValue) {
      const [hour, minute] = this.modelValue.split(':');
      this.selectedHour = parseInt(hour);
      this.selectedMinute = parseInt(minute);
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>


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
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: $light;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $gray6;
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
    max-height: 300px; // Set a fixed height
    overflow-y: auto; // Add a scrollbar

    .time-options {
      list-style-type: none;
      padding: 0;
      margin: 0;
      li {
        padding: 0.5rem 1rem;
        cursor: pointer;

        &.active {
          background-color: $primary;
          color: $white;
        }

        &:hover {
          background-color: $gray3;
        }
      }
    }
  }
}


</style>
