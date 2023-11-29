import { isDateInRange } from "../functions/dates";
import { DateTime } from "luxon";
import { set } from "lodash";

function filterSelectedDays(request, from, to) {
  return Object.keys(request?.selectedDays ?? {}).filter((date) => {
    console.log({ date, from, to, selectedDay: request?.selectedDays });
    return request.selectedDays[date] && isDateInRange(date, from, to);
  });
}

function updateEmployeeWeekData(employee, day, requestType) {
  if (!employee.weekData[day]) {
    employee.weekData[day] = {};
  }
  set(employee.weekData, [day, requestType], true);
}

export function processEmployeeRequests(employee, from, to) {
  if (employee.requests?.length > 0) {
    for (const request of employee.requests) {
      const days = filterSelectedDays(request, from, to);
      for (const day of days) {
        const weekday = DateTime.fromISO(day).weekday;
        updateEmployeeWeekData(employee, weekday, request.type);
      }
    }
  }
}
