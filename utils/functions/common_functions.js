import axios from "axios";
import dayjs from "dayjs";
import fecha, { format } from "fecha";

export async function getUser() {
  let userId = localStorage.getItem("userId");
  try {
    const avtar = await axios.get(
      process.env.USER_API_ENDPOINT + "/" + userId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    localStorage.setItem("userPhoto", avtar.data.Photo);
    this.userPhoto = avtar.data.Photo;
    localStorage.setItem("businessId", avtar.data.BusinessId);
  } catch (e) {
    alert(e);
  }
}
export async function getBusinessId() {
  this.loading = true;
  let businessId = localStorage.getItem("businessId");
  try {
    const businessid = await axios.get(
      process.env.ORG_API_ENDPOINT + "/" + businessId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    // console.log(businessid.data, "Org Object Called");
    this.org = businessid.data;
    this.loading = false;
  } catch (e) {
    alert(e);
  }
}

export async function updateBusinessId() {
  this.loading = true;
  let businessId = localStorage.getItem("businessId");
  try {
    const businessid = await axios.put(
      process.env.ORG_API_ENDPOINT + "/" + businessId,
      this.updateForm,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    // console.log(businessid.data, "Org Object Called");
    this.org = businessid.data;
    this.loading = false;
  } catch (e) {
    alert(e);
  }
}
export function openPopupNotification(n) {
  this.popupMessages.push(this.popupNotificationMsgs[n]);
}
export function dateCheck(dateTime) {
  return dayjs(dateTime).format("HH:mm") || "N/A";
}
export function getCurrentDateMonth() {
  var cuDate = this.selectedYear + "/" + this.selectedMonth + "/01";
  let date = new Date(cuDate);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DDT12:00:00");
  this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DDT11:59:00");
}
export function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  const firstDay = new Date(currentYear, 0, 1);
  const lastDay = new Date(currentYear, 11, 31);
  this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DDT12:00:00");
  this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DDT11:59:00");
}
export function getCurrentWeek() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 5; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();

console.log(firstday, lastday, "current week")
}
export function sendMeet(userId) {
  var genratedId = userId;
  var meetId = genratedId.toUpperCase();
  var id = meetId.match(/.{1,6}/g);
  var newValue = id.join("-");
  window.open(
    process.env.VIDEO_CONF_APP_URL+
      newValue ,
    "_blank"
  );
};
export function sendMessage(userId) {
  window.open(
    process.env.BIB_CHAT_APP_URL + "/directs/" + userId,
    "_blank"
  );
}
export function handleItemClick_Table(item, event) {
  event.preventDefault();
  this.$router.push("/profile/" + item);
}