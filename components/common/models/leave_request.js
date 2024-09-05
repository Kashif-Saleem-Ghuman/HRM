import {DateTime} from "luxon";
import {parseDate} from "@/utils/functions/dates";


export function LeaveRequest(request) {
  for (let key in request) {
    this[key] = request[key];
  }

  this.todayDate = DateTime.local();

  this.tomorrowDate = DateTime.local().plus({ days: 1 });

  this.startOfWeek = this.todayDate.startOf('week');

  this.endOfWeek = this.todayDate.endOf('week');

  this.nextStartOfWeek = this.todayDate.plus({ weeks: 1 }).startOf("week");

  this.nextEndOfWeek = this.todayDate.plus({ weeks: 1 }).endOf("week");

  this.startOfMonth = this.todayDate.startOf('month');

  this.endOfMonth = this.todayDate.endOf('month');


  this.isDateBelongs = (startDate, startOf, endOf) => {
    const parseStartDate = parseDate(startDate)
    return parseStartDate >= startOf && parseStartDate <= endOf;
  }

  this.isToday = () => {
    return this.isDateBelongs(this.todayDate.toISO(), parseDate(this.request.start).startOf('day'), parseDate(this.request.end).endOf('day'));
  }

  this.isTomorrow = () => {
    return this.isDateBelongs(this.tomorrowDate.toISO(), parseDate(this.request.start).startOf('day'), parseDate(this.request.end).endOf('day'));
  }

  this.isThisWeek = () => {
    return this.isDateBelongs(this.request.start, this.startOfWeek, this.endOfWeek)
  }

  this.isNextWeek = () => {
    return this.isDateBelongs(this.request.start, this.nextStartOfWeek, this.nextEndOfWeek)
  }

  this.isThisMonth = () => {
    return this.isDateBelongs(this.request.start, this.startOfMonth, this.endOfMonth)
  }

}
