import {DateTime} from "luxon";
import {parseDate} from "@/utils/functions/dates";


export function LeaveRequest(requests) {
  for (let key in requests) {
    this[key] = requests[key];
  }

  this.todayDate = DateTime.local();

  this.tomorrowDate = DateTime.local().plus({ days: 1 });

  this.startOfWeek = this.todayDate.startOf('week');

  this.endOfWeek = this.todayDate.endOf('week');

  this.nextStartOfWeek = this.todayDate.plus({ weeks: 1 }).startOf("week");

  this.nextEndOfWeek = this.todayDate.plus({ weeks: 1 }).endOf("week");

  this.startOfMonth = this.todayDate.startOf('month');

  this.endOfMonth = this.todayDate.endOf('month');

  this.doesDateExist = (selectedDateColl, date) => {
   for(const selectedDate in selectedDateColl) {
     const collectionDate = parseDate(selectedDate);
     if (collectionDate.hasSame(date, 'day')) {
       return true;
     }
   }
   return false;
  }

  this.isDateBelongs = (startDate, start, end) => {
    const parseStartDate = parseDate(startDate)
    return parseStartDate >= start && parseStartDate <= end;

  }

  this.getTodayCollection = () => {
    return requests.filter(request => { return this.doesDateExist(request.selectedDays, this.todayDate) });
  }

  this.getTomorrowCollection = () => {
    return requests.filter(request => { return this.doesDateExist(request.selectedDays, this.tomorrowDate) });
  }

  this.getThisWeekCollection = () => {
    return requests.filter(request => { return this.isDateBelongs(request.start, this.startOfWeek, this.endOfWeek) })
  }

  this.getNextWeekCollection = () => {
    return requests.filter(request => { return this.isDateBelongs(request.start, this.nextStartOfWeek, this.nextEndOfWeek) })
  }

  this.getThisMonthCollection = () => {
    return requests.filter(request => { return this.isDateBelongs(request.start, this.startOfMonth, this.endOfMonth) })
  }

}
