import { formatTime } from "../utils/functions/clock_functions";
export default ({ app, store }, inject) => {
    const getLeaveTypeValue = (data, day) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data;
      const dayValue = data[weekDay];
      const formattedTime = formatTime(dayValue, false);
      const isValidTime = formattedTime && formattedTime !== "NaN:NaN";
  
      if (leaves && leaves[weekIndex]) {
        const leave = leaves[weekIndex];
        const leaveType = leave?.type.charAt(0).toUpperCase() + leave?.type.slice(1);
        if (isValidTime) {
          return `${formattedTime}`;
        }
      }
      return '';
    };
  
    const getLeaveTooltipTitle = (data, day) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data;
      const dayValue = data[weekDay];
      const formattedTime = formatTime(dayValue, false);
  
      if (Object.keys(leaves ?? {}).length) {
        const leave = leaves[weekIndex];
        if (leave) {
          const leaveType = leave.type;
          const leaveMessage = leaveType === 'vacation' ? 'on vacation' : `on ${leaveType} leave`;
          return `The user is ${leaveMessage} and has worked for ${app.$formatDisplayTime(formattedTime)}.`;
        }
      }
      return '';
    };
  
    const formatDisplayTime = (timeString) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
  
      if (totalMinutes < 30) {
        return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
      } else {
        const formattedHours = Math.floor(totalMinutes / 60);
        const formattedMinutes = totalMinutes % 60;
        return formattedMinutes > 0
          ? `${formattedHours} hour${formattedHours !== 1 ? 's' : ''} and ${formattedMinutes} minute${formattedMinutes !== 1 ? 's' : ''}`
          : `${formattedHours} hour${formattedHours !== 1 ? 's' : ''}`;
      }
    };
  
    const getTimesheetDayValue = (data, day) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data;
  
      if (Object.keys(leaves ?? {}).length) {
        const leave = leaves[weekIndex];
        if (leave) {
          return leave?.type.charAt(0).toUpperCase() + leave?.type.slice(1);
        }
      }
      if (!data?.[weekDay]) return '--';
      return formatTime(data[weekDay], false);
    };
  
    inject('getLeaveTypeValue', getLeaveTypeValue);
    inject('getLeaveTooltipTitle', getLeaveTooltipTitle);
    inject('formatDisplayTime', formatDisplayTime);
    inject('getTimesheetDayValue', getTimesheetDayValue);
  };
  