import dayjs from "dayjs";
import { DateTime } from "luxon";
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
export function getCurrentWeek() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 5; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
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

export function getEmployeeInitials(employee) {
  if (!employee) return "";
  const { firstName, lastName } = employee;
  return firstName?.charAt(0) + lastName?.charAt(0);
}

export function getEmployeeFullName(employee) {
  if (!employee) return "";
  const { firstName, lastName } = employee;
  const capitalize = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
}
const START_YEAR = 2023;
export function generateYearList() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = [];
  for (let year = START_YEAR; year <= currentYear + 0; year++) {
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
    this.totalDays = 0;
    return;
  }

  if (typeof start === "string" && typeof end === "string") {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      let dayDifference = 0;
      let currentDate = new Date(startDate);

      if (this.isHalfDay && start === end) {
        this.totalDays = `0.5 day`;
        return;
      }
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          dayDifference += 1;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (dayDifference === 0) {
        this.totalDays = `0 days`;
      } else {
        this.totalDays = `${dayDifference} days`;
      }
    }
  }
}

