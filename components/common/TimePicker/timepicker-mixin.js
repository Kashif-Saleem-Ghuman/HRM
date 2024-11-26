
export default {
  props: {
    type: {
      type: String,
      default: 'hour',
    },
    placeholder: {
      type: String,
      default: ''
    },
    is24Hour: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },
  methods: {
    blurHandler() {
      this.dropdownOpen = false;
    },
    focusHandler() {
      // this.scrollToSelected();
    },
    formatTimeUnit(unit) {
      return unit.toString().padStart(2, '0');
    },
    setHourOptions() {
      const maxHours = this.is24Hour ? 23 : 12;
      const startHour = this.is24Hour ? 0 : 1;
      this.options = Array.from(
        { length: maxHours + 1 },
        (_, i) => startHour + i
      );
    },

    setMinuteOptions() {
      this.options = Array.from(
        { length: 60 },
        (_, i) => i
      );
    },
    setTimeValue(time) {
      this.timeValue = time;
    },
  },
  watch: {
    value(time) {
      this.setTimeValue(time);
    }
  }
}
