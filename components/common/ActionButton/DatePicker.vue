<template>
  <div class="custom_date_picker">
    <div class="mr-05">Date:</div>
    <bib-datetime-picker
      v-model="date2"
      :format="format"
      :parseDate="parseDate"
      :formatDate="formatDate"
      @input="onChange"
      class="custom_date_picker"
    ></bib-datetime-picker>
  </div>
</template>

<script>
import fecha, { format } from "fecha";
import {mapGetters} from 'vuex';
import {getTimeAttendance} from '../../../utils/functions/api_call/timeattendance/time'
export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      date: null,
      format: "MMM D, YYYY",
      date2: fecha.format(new Date(), "MMM D, YYYY"),
    };
  },
  computed:{
    ...mapGetters({
      activeDate: "date/getActiveDate",
    })
  },
  created(){
    var formatDate = format(new Date(this.date2), "YYYY-MM-DD")
    this.$store.dispatch("date/setActiveDate", formatDate);
  },
  methods: {
    getTimeAttendance,
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    onChange(value) {
      let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
      this.$store.dispatch("date/setActiveDate", date);
    },
  },
};
</script>

<style lang="scss">
.custom_date_picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  input {
    border: none !important;
    background-color: $light;
    border-radius: 6px;
    font-size: 14px;

    // margin: 0 1rem;
  }
}
</style>
