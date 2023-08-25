import axios from "axios";

export async function getTimeAttendance() {
  this.loading = true
  try {
          const timeAttendance = await axios.get(
            process.env.API_URL + "/timesheets/admin/attendance?date=" + this.getCurrentDate,
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.localData = timeAttendance.data;
        } catch (e) {
          alert(e);
        }
        this.loading = false
}

export async function getTimesheet() {
  try {
          const timesheetData = await axios.get(
            process.env.API_URL + "/widgets/admin/timesheet/",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
              params: {
                from:  this.getformToDate?.from,
                to: this.getformToDate?.to,
              },
            }
          );
          this.timesheetData = timesheetData.data;
        } catch (e) {
          alert(e);
        }
}

  export async function getTimeAttendanceDaily(date) {
    this.loading = true
    try {
            const timeAttendance = await axios.get(
              process.env.API_URL + "/timesheets/daily?date=",
              {
                headers: {
                  Authorization: "Bearer " + this.getAccessToken,
                },
                params: {
                  from:  date,
                  to: date,
                  employeeId:this.id
                },
              }
            );
            this.todayData = timeAttendance.data;
            return timeAttendance.data;
          } catch (e) {
            alert(e);
          }
          this.loading = false
  }
  export async function getTimeAttendanceWeek() {
    this.loading = true
    try {
            const timeAttendance = await axios.get(
              process.env.API_URL + "/timesheets/week?date=",
              {
                headers: {
                  Authorization: "Bearer " + this.getAccessToken,
                },
                params: {
                  from:  '2023-08-22',
                  to: '2023-08-22',
                },
              }
            );
            this.weekDataView = timeAttendance.data;
          } catch (e) {
            alert(e);
          }
          this.loading = false
  }
  export async function getTimeAttendanceMonth() {
    this.loading = true
    try {
            const timeAttendance = await axios.get(
              process.env.API_URL + "/timesheets/month?date=",
              {
                headers: {
                  Authorization: "Bearer " + this.getAccessToken,
                },
                params: {
                  from:  this.getformToDate?.from,
                  to: this.getformToDate?.to,
                },
              }
            );
            this.MonthViewData = timeAttendance.data;
          } catch (e) {
            alert(e);
          }
          this.loading = false
  }