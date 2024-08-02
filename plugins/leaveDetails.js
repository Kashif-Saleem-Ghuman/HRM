import { clockInReminder, submitTimesheetReminder } from '@/utils/functions/api_call/notification-reminder';

export const leaveDetail = function(item) {
  event.stopPropagation();
  const data = item.request;
  this.$nuxt.$emit("open-sidebar", data);
  this.$nuxt.$emit("close-sidebar-main");
};

export default (context, inject) => {
  inject('leaveDetail', leaveDetail);
  inject('clockInReminder', clockInReminder);
  inject('submitTimesheetReminder', submitTimesheetReminder);
};
