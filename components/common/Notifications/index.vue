<template>
  <div class="d-flex align-center">
    <bib-icon
      :icon="iconName"
      :class="['cursor-pointer', customClass]"
      variant="gray"
      :scale="1"
      @click.native.stop="pushNotification"
    ></bib-icon>
  </div>
</template>

<script>
export default {
  props:{
    clockInReminderIcon:{
      type: Boolean,
      default: false,
    },
    timesheetSubmitReminderIcon:{
      type: Boolean,
      default: false,
    },
    pastDueTimesheetReminderIcon:{
      type:Boolean,
      default: false,
    },
    iconName: {
      type: String,
    },
    customClass: {
      type: String,
    },
  },
  methods: {
    pushNotification() {
      if(this.clockInReminderIcon){
        this.$emit("clock-in-reminder");
      }
      else if(this.timesheetSubmitReminderIcon){
        this.$emit("submit-timesheet-reminder");
      }
      else if(this.pastDueTimesheetReminderIcon) {
        this.$emit('submit-due-timesheet-reminder');
      }
    },
  },
};
</script>

<style scoped></style>
