export const navigationPaths = [
  {
    name: "leaveAndVacationPaths",
    paths: [
      "/leaves-and-vacations/upcoming/",
      "/leaves-and-vacations/leavelist/",
      "/leaves-and-vacations/dashboard/",
      "/leaves-and-vacations/pendingrequest/",
    ],
    defaultPath: "/leaves-and-vacations/upcoming/",
  },
  {
    name: "timeAttendancePaths",
    paths: [
      "/time-attendance/attendance/",
      "/time-attendance/timesheets/",
      "/time-attendance/month/",
      "/time-attendance/year/",
      "/time-attendance/pending/",
      "/time-attendance/past-due/",
    ],
    defaultPath: "/time-attendance/attendance/",
  },
  {
    name: "reportsPaths",
    paths: [
      "/reports/leave-report/",
      "/reports/leave-summary/",
      "/reports/timesheet-report/",
    ],
    defaultPath: "/reports/leave-report/",
  },
  {
    name: "peoplePath",
    paths: [
      "/profile/:id/employee-profile-tab",
      "/profile/:id/employment-information-tab",
      "/profile/:id/time-attendance-profile-tab",
      "/profile/:id/leave-vacations-profile-tab",
      "/profile/:id/files-profile-tab",
      "/profile/:id/time-attendance-profile-tab?view=day",
      "/profile/:id/time-attendance-profile-tab?view=week",
      "/profile/:id/time-attendance-profile-tab?view=month",
    ],
    defaultPath: "/people/",
  },
];

export const navigationPathsAdmin = [
  {
    name: "leaveAndVacationPaths",
    paths: [
      "/leaves-and-vacations/upcoming/",
      "/leaves-and-vacations/leavelist/",
      "/leaves-and-vacations/dashboard/",
      "/leaves-and-vacations/pendingrequest/",
    ],
    defaultPath: "/leaves-and-vacations/upcoming/",
  },
  {
    name: "timeAttendancePaths",
    paths: [
      "/time-attendance/attendance/",
      "/time-attendance/timesheets/",
      "/time-attendance/month/",
      "/time-attendance/year/",
      "/time-attendance/pending/",
      "/time-attendance/past-due/",
    ],
    defaultPath: "/time-attendance/attendance/",
  },
  {
    name: "reportsPaths",
    paths: [
      "/reports/leave-report/",
      "/reports/leave-summary/",
      "/reports/timesheet-report/",
    ],
    defaultPath: "/reports/leave-report/",
  },
  {
    name: "peoplePath",
    paths: [
      "/profile/:id/employee-profile-tab",
      "/profile/:id/employment-information-tab",
      "/profile/:id/time-attendance-profile-tab",
      "/profile/:id/leave-vacations-profile-tab",
      "/profile/:id/files-profile-tab",
      "/profile/:id/time-attendance-profile-tab?view=day",
      "/profile/:id/time-attendance-profile-tab?view=week",
      "/profile/:id/time-attendance-profile-tab?view=month",
    ],
    defaultPath: "/people/",
  },
];
