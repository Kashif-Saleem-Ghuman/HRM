import { formatTime } from "../utils/functions/clock_functions";
export default ({ app, store }, inject) => {
    const getLeaveTypeValue = (data, day, useAlternateData = false) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = !useAlternateData ? data : data.weekData;
      const dayValue = !useAlternateData ? data[weekDay] : data.weekData[weekIndex]?.totalHours;
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

    const getLeaveTooltipTitle = (data, day, useAlternateData = false) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = !useAlternateData ? data : data.weekData;
      const dayValue = !useAlternateData ? data[weekDay] : data.weekData[weekIndex]?.totalHours;
      const formattedTime = formatTime(dayValue, false);
  
      if (Object.keys(leaves ?? {}).length) {
        const leave = leaves[weekIndex];
        if (leave) {
          const leaveType = leave.type;
          const leaveMessage = leaveType === "vacation"
          ? "on vacation"
          : leaveType === "medical"
          ? "on medical leave"
          : `on ${leaveType}`;
          return `The employee is ${leaveMessage} and had worked for ${app.$formatDisplayTime(formattedTime)}.`;
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

    const getTimesheetDayValue = (data, day, useAlternateData = false) => {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = !useAlternateData ? data : data.weekData;


      if (Object.keys(leaves ?? {}).length) {
        const leave = leaves[weekIndex];
        if (leave) {
          return leave?.type.charAt(0).toUpperCase() + leave?.type.slice(1);
        }
      }

      if(useAlternateData){
        const dayVal = data.weekData[weekIndex]?.totalHours;
        if (!dayVal) return '--';
        return formatTime(dayVal, false);
      }

      if (!data?.[weekDay]) return '--';
      return formatTime(data[weekDay], false);
    };
  
    inject('getLeaveTypeValue', getLeaveTypeValue);
    inject('getLeaveTooltipTitle', getLeaveTooltipTitle);
    inject('formatDisplayTime', formatDisplayTime);
    inject('getTimesheetDayValue', getTimesheetDayValue);
  };
  