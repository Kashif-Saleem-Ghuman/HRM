import {DateTime} from "luxon";
import {getIsoDate} from "@/utils/functions/dates";


export function LeaveRequest(request) {
  for (let key in request) {
    this[key] = request[key];
  }

  this.todayDate = DateTime.now();

  this.tomorrowDate = DateTime.local().plus({ days: 1 });

  this.startOfWeek = this.todayDate.startOf('week');

  this.endOfWeek = this.todayDate.endOf('week');

  this.nextStartOfWeek = this.todayDate.plus({ weeks: 1 }).startOf("week");

  this.nextEndOfWeek = this.todayDate.plus({ weeks: 1 }).endOf("week");

  this.startOfMonth = this.todayDate.startOf('month');

  this.endOfMonth = this.todayDate.endOf('month');


  this.isDateBelongs = (date, start, end) => {
    return date >= start && date <= end;
  }

  this.isToday = () => {
    return this.isDateBelongs(this.todayDate.toISODate(), getIsoDate(this.request.start), getIsoDate(this.request.end));
  }

  this.isTomorrow = () => {
    return this.isDateBelongs(this.tomorrowDate.toISODate(), getIsoDate(this.request.start), getIsoDate(this.request.end));
  }

  this.isThisWeek = () => {
    return this.isDateBelongs(getIsoDate(this.request.start), this.startOfWeek.toISODate(), this.endOfWeek.toISODate())
  }

  this.isNextWeek = () => {
    return this.isDateBelongs(getIsoDate(this.request.start), this.nextStartOfWeek.toISODate(), this.nextEndOfWeek.toISODate())
  }

  this.isThisMonth = () => {
    return this.isDateBelongs(getIsoDate(this.request.start), this.startOfMonth.toISODate(), this.endOfMonth.toISODate())
  }

}
