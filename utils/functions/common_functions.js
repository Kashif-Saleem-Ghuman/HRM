import dayjs from "dayjs";
import { DateTime } from "luxon";
import { generateRequestSelectedDays } from "../requests/request-selected-days";
import { sum } from "lodash";
import { formatLeaveDurationDaysString } from "./leave-request-helper";
export function dateCheck(dateTime) {
  return dayjs(dateTime).format("HH:mm") || "N/A";
}
export function getCurrentDateMonth() {
  var cuDate = this.selectedYear + "/" + this.selectedMonth + "/01";
  let date = new Date(cuDate);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).toISOString();
  this.fromDate = DateTime.fromISO(firstDay).startOf("day").toUTC().toISO();
  this.toDate = DateTime.fromISO(lastDay).endOf("day").toUTC().toISO();
}
export function getCurrentYear() {
  const currentYear = this.selectedYear;
  const firstDay = new Date(currentYear, 0, 1).toISOString();
  const lastDay = new Date(currentYear, 11, 31).toISOString();
  this.fromDate = DateTime.fromISO(firstDay).startOf("day").toUTC().toISO();
  this.toDate = DateTime.fromISO(lastDay).endOf("day").toUTC().toISO();
}
export function getDateRanges() {
  const now = DateTime.local();
  const thisMonthStart = now.startOf('month').toUTC().toISO(); // Start of the current month in UTC
  const nextMonthWeekEnd = now.endOf('month').endOf('day').toUTC().toISO(); // End of the current month in UTC

  return {
    nextWeek: { start: thisMonthStart, end: nextMonthWeekEnd },
  };
}

export function getCurrentWeek() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 5; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
  return {firstday, lastday}
}
export function sendMeet(userId) {
  var genratedId = userId;
  var meetId = genratedId.toUpperCase();
  var id = meetId.match(/.{1,6}/g);
  var newValue = id.join("-");
  window.open(process.env.VIDEO_CONF_APP_URL + newValue, "_blank");
}
export function sendMessage(userId) {
  window.open(process.env.BIB_CHAT_APP_URL + "/directs/" + userId, "_blank");
}
export function handleItemClick_Table(item, event) {
  event.preventDefault();
  this.$router.push("/profile/" + item);
}


const START_YEAR = 2023;
export function generateYearList() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = [];
  for (let year = START_YEAR; year <= currentYear + 1; year++) {
    const yearObject = {
      label: year.toString(),
      value: year,
      selected: false,
    };
    years.push(yearObject);
  }
  return years;
}
export function downloadFile(data, filename) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  // TODO - Should not use .xlsx extension by default. Left it there to avoid breaking changes
  link.setAttribute("download", `${filename.includes(".xlsx") ? filename : filename + ".xlsx"}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getTimeDiffInSeconds(start, end) {
  return Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 1000
  );
}
export function calculateTotalDays(start, end) {
  if (start === null || end === null) {
    this.localTotalDays = 0;
    return;
  }

  if (typeof start === "string" && typeof end === "string") {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const startUtc =  DateTime.fromFormat(start, "yyyy-MMM-dd", { zone: "utc" }).toISO();
      const endUtc = DateTime.fromFormat(end, "yyyy-MMM-dd", { zone: "utc" }).toISO();

      const selectedDays = generateRequestSelectedDays(startUtc, endUtc, this.localIsHalfDay);
      const totalDays = sum(Object.values(selectedDays));

      this.localTotalDays =  formatLeaveDurationDaysString(totalDays)
    }
  }
}

