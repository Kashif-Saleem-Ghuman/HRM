<template>
  <div class="d-flex align-center">
    <bib-icon
      icon="time-alarm-solid"
      class="cursor-pointer"
      variant="gray"
      :scale="1"
      v-show="clockInReminderIcon"
      @click.native.stop="pushNotificationClockin"
    ></bib-icon>
    <bib-icon
      icon="send-solid"
      class="ml-05 mr-1 cursor-pointer"
      variant="gray"
      :scale="1"
      v-show="timesheetSubmitReminderIcon"
      @click.native.stop="pushNotificationTimeseet"
    ></bib-icon>
  </div>
</template>

<script>
export default {
  props:{
    clockInReminderIcon:{
      type:Boolean,
      default:true,
    },
    timesheetSubmitReminderIcon:{
      type:Boolean,
      default:true,
    },
  },
  methods: {
    pushNotificationClockin() {
      this.$emit("clock-in-reminder");
    },
    pushNotificationTimeseet() {
      this.$emit("submit-timesheet-reminder");
    },
  },
};
</script>

<style scoped></style>
