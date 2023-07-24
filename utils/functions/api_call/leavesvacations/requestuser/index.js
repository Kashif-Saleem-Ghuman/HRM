import axios from "axios";
import fecha, { format } from "fecha";

export async function getLeaveVacations() {
  this.loading = true;
  try {
    const leaveVacations = await axios.get(
      process.env.API_URL + "/requests",
      {
        params: {
          from: this.fromDate, // This is the body part
          to: this.toDate,
        },
      },{
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      }
    );
    this.calendarOptions.events = leaveVacations.data.requests;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getAllowanceDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
        params: {
          type: this.vacationType, // This is the body part
        },
      }
    );
    this.loading = false;
    return allowanceDays.data;
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function addLeaveVacations() {
  if(this.addForm.type == ''){
    this.errorMsgSelect = true;
    return true
  }
  this.errorMsgSelect = false;
  if(this.addForm.start == ''){
    this.errorMsgStartDate = true;
    return true
  }
  this.errorMsgStartDate = false;
  if(this.addForm.end == ''){
    this.errorMsgEndDate = true;
    return true
  }
  this.errorMsgEndDate = false;
  this.loading = true;
  var data = this.addForm
  var startDate = fecha.format(new Date(data.start), 'isoDate'); // '2015-11-20'data.start.toISOString();
  var endDate = fecha.format(new Date(data.end), 'isoDate');
  this.addForm.start = startDate;
  this.addForm.end = endDate
  // console.log( this.getAccessToken, "toISOString()")
  try {
    const addLeaveVacations = await axios.post(
      process.env.API_URL + "/requests", this.addForm,
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
        
      }
    );
    this.leaveVacationData = addLeaveVacations.data;
    this.$store.dispatch("leavevacation/setLeaveVacations", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    }).then((result)=>{
      this.$nuxt.$emit("update-key");
    });
    this.slideClass = "slide-out";
    setTimeout(() => {
      this.openSidebar = false;
    }, 700);
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
