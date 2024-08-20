import { clockInReminder, submitTimesheetReminder } from '@/utils/functions/api_call/notification-reminder';

export default ({ store }, inject) => {
  const getEmployeeInitials = (employee) => {
    if (!employee) return "";
    const { firstName, lastName } = employee;
    return firstName?.charAt(0) + lastName?.charAt(0);
  };

  const getEmployeeFullName = (employee) => {
    if (!employee) return "";
    const { firstName, lastName } = employee;
    const capitalize = (name) => {
      if (!name) return "";
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    return `${capitalize(firstName)} ${capitalize(lastName)}`;
  };

  const openPopupNotification = (notification) => {
    store.dispatch("app/addNotification", { notification });
  };

  inject('getEmployeeInitials', getEmployeeInitials);
  inject('getEmployeeFullName', getEmployeeFullName);
  inject('clockInReminder', clockInReminder);
  inject('submitTimesheetReminder', submitTimesheetReminder);
  inject('openPopupNotification', openPopupNotification);
};
