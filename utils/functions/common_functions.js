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
  this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DD");
  this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DD");
}
export function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  const firstDay = new Date(currentYear, 0, 1);
  const lastDay = new Date(currentYear, 11, 31);
  this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DD");
  this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DD");
  console.log(
    this.fromDate,
    this.toDate,
    "this.fromDatethis.fromDatethis.fromDatethis.fromDatethis.fromDate"
  );
}
