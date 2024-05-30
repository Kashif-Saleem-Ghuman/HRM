export const TABLE_HEAD = {
  tHeadDashboard: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Employee",
      width: `${100 / 4.3}%`,
      style: "text-align:left",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-name-sort",
        isActive: false,
        sortKey: "firstName",
        type: "string",
      },
    },
    {
      key: "status",
      label: "Status",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-status-sort",
        isActive: false,
        sortKey: "activityReport.in",
        type: "string",
      },
    },
    {
      key: "in",
      label: "In",
      width: `${100 / 7}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-in-sort",
        isActive: false,
        sortKey: "activityReport.in",
        type: "string",
      },
    },
    {
      key: "out",
      label: "Out",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-out-sort",
        isActive: false,
        sortKey: "activityReport.out",
        type: "string",
      },
      width: `${100 / 7}%`,
    },
    {
      key: "breaks",
      label: "Breaks",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-breaks-sort",
        isActive: false,
        sortKey: "activityReport.break",
        type: "string",
      },
    },
    {
      key: "total",
      label: "Total hours",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-total-sort",
        isActive: false,
        sortKey: "activityReport.total",
        type: "number",
      },
    },
  ],
  tHeadPeople: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Employee",
      width: `${100 / 4.3}%`,
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "firstName",
        type: "string",
      },
    },
    {
      key: "email",
      label: "Email",
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "email",
        type: "string",
      },
    },
    {
      key: "phone",
      label: "Telephone",
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "phone",
        type: "phone",
      },
    },
    {
      key: "jobTitle",
      label: "Job Title",
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "jobTitle",
        type: "string",
      },
    },
    {
      key: "department",
      label: "Department",
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "department",
        type: "string",
      },
    },
    {
      key: "hiredate",
      label: "Hire Date",
      header_icon: {
        icon: "long-arrow-up",
        isActive: false,
        sortKey: "hireDate",
        type: "date",
      },
    },
  ],
  tHeadAttendanceUser: [
    {
      key: "",
      label: "#",
    },
    {
      key: "leavetype",
      label: "Leave Type",
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-type-sort",
        isActive: false,
        sortKey: "type",
        type: "string",
      },
    },
    {
      key: "start",
      label: "Start",
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-start-sort",
        isActive: false,
        sortKey: "start",
        type: "date",
      },
    },

    {
      key: "end",
      label: "End",
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-end-sort",
        isActive: false,
        sortKey: "end",
        type: "date",
      },
    },
    {
      key: "duration",
      label: "Duration",
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-duration-sort",
        isActive: false,
        sortKey: "duration",
        type: "number",
      },
    },
    {
      key: "status",
      label: "Status",
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-status-sort",
        isActive: false,
        sortKey: "status",
        type: "string",
      },
    },
  ],
  tHeadTimesheetListWeekTab: [
    {
      key: "",
      label: "#",
    },
    {
      key: "date",
      label: "Date",
      width: `${100 / 5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-name-sort",
        isActive: false,
        sortKey: "date",
        type: "string",
      },
    },
    {
      key: "mon",
      label: "MON",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-mon-sort",
        isActive: false,
        sortKey: "weekData.1.totalHours",
        type: "week",
      },
    },
    {
      key: "tue",
      label: "TUE",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-tue-sort",
        isActive: false,
        sortKey: "weekData.1.totalHours",
        type: "week",
      },
    },
    {
      key: "wed",
      label: "WED",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-wed-sort",
        isActive: false,
        sortKey: "weekData.3.totalHours",
        type: "week",
      },
    },
    {
      key: "thu",
      label: "THU",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-thu-sort",
        isActive: false,
        sortKey: "weekData.4.totalHours",
        type: "week",
      },
    },
    {
      key: "fri",
      label: "FRI",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-fri-sort",
        isActive: false,
        sortKey: "weekData.5.totalHours",
        type: "week",
      },
    },
    {
      key: "sat",
      label: "SAT",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-sat-sort",
        isActive: false,
        sortKey: "weekData.6.totalHours",
        type: "week",
      },
    },
    {
      key: "sun",
      label: "SUN",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-sun-sort",
        isActive: false,
        sortKey: "weekData.7.totalHours",
        type: "week",
      },
    },
    {
      key: "total",
      label: "TOTAL HRS",
      style: "text-align:left",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-total-hours-sort",
        isActive: false,
        sortKey: "total",
        type: "number",
      },
    },
    {
      key: "status",
      label: "STATUS",
      style: "text-align:left",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-status-sort",
        isActive: false,
        sortKey: "timesheets[0].status",
        type: "string",
      },
    },
  ],
  tHeadTimesheetTab: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "EMPLOYEE",
      width: `${100 / 5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-name-sort",
        isActive: false,
        sortKey: "firstName",
        type: "string",
      },
    },
    {
      key: "mon",
      label: "MON",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-mon-sort",
        isActive: false,
        sortKey: "weekData.1.totalHours",
        type: "week",
      },
    },
    {
      key: "tue",
      label: "TUE",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-tue-sort",
        isActive: false,
        sortKey: "weekData.1.totalHours",
        type: "week",
      },
    },
    {
      key: "wed",
      label: "WED",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-wed-sort",
        isActive: false,
        sortKey: "weekData.3.totalHours",
        type: "week",
      },
    },
    {
      key: "thu",
      label: "THU",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-thu-sort",
        isActive: false,
        sortKey: "weekData.4.totalHours",
        type: "week",
      },
    },
    {
      key: "fri",
      label: "FRI",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-fri-sort",
        isActive: false,
        sortKey: "weekData.5.totalHours",
        type: "week",
      },
    },
    {
      key: "sat",
      label: "SAT",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-sat-sort",
        isActive: false,
        sortKey: "weekData.6.totalHours",
        type: "week",
      },
    },
    {
      key: "sun",
      label: "SUN",
      style: "text-align:center",
      width: `${100 / 12}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-sun-sort",
        isActive: false,
        sortKey: "weekData.7.totalHours",
        type: "week",
      },
    },
    {
      key: "total",
      label: "TOTAL HRS",
      style: "text-align:left",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-total-hours-sort",
        isActive: false,
        sortKey: "total",
        type: "number",
      },
    },
    {
      key: "status",
      label: "STATUS",
      style: "text-align:left",
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-status-sort",
        isActive: false,
        sortKey: "timesheets[0].status",
        type: "string",
      },
    },
  ],
  tHeadTimesheet: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "EMPLOYEE",
      width: `${100 / 5}%`,
    },
    {
      key: "mon",
      label: "MON",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "tue",
      label: "TUE",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "wed",
      label: "WED",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "thu",
      label: "THU",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "fri",
      label: "FRI",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "sat",
      label: "SAT",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "sun",
      label: "SUN",
      style: "text-align:center",
      width: `${100 / 12}%`,
    },
    {
      key: "total",
      label: "TOTAL HRS",
      style: "text-align:left",
    },
    {
      key: "status",
      label: "STATUS",
      style: "text-align:left",
    },
  ],
  tHeadLeaveVacationPending: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Employee Name",
      width: `${100 / 4.5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-name-sort",
        isActive: false,
        sortKey: "employee.firstName",
        type: "string",
      },
    },
    {
      key: "type",
      label: "Leave Type",
      width: `${100 / 8.5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-type-sort",
        isActive: false,
        sortKey: "type",
        type: "string",
      },
    },
    {
      key: "start",
      label: "Start",
      width: `${100 / 8.5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-start-sort",
        isActive: false,
        sortKey: "start",
        type: "date",
      },
    },
    {
      key: "end",
      label: "End",
      width: `${100 / 8.5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-end-sort",
        isActive: false,
        sortKey: "end",
        type: "date",
      },
    },
    {
      key: "duration",
      label: "Duration",
      width: `${100 / 8.5}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "leave-duration-sort",
        isActive: false,
        sortKey: "duration",
        type: "number",
      },
    },
    {
      key: "reason",
      label: "Reason",
      width: `${100 / 3}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-reason-sort",
        isActive: false,
        sortKey: "note",
        type: "string",
      },
    },
    {
      key: "action",
      label: "Action",
    },
  ],
  tHeadWeekView: [
    {
      key: "",
      label: "#",
      center: false,
    },
    {
      key: "name",
      label: "Day of week",
      center: false,
      width: `${100 / 4.6}%`,
    },
    {
      key: "in",
      label: "IN",
      center: false,
      width: `${100 / 4.6}%`,
    },
    {
      key: "break",
      label: "Break",
      center: false,
      width: `${100 / 4.6}%`,
    },
    {
      key: "out",
      label: "Out",
      center: true,
      width: `${100 / 4.6}%`,
    },
    {
      key: "total",
      label: "Total",
      center: true,
      width: `${100 / 5}%`,
    },
  ],
};

export const TABLE_FIELDS_TIME_ATTENDANCE = [
  {
    key: "",
    label: "#",
  },
  {
    key: "name",
    label: "Employee",
  },
  {
    key: "status",
    label: "Status",
  },

  {
    key: "in",
    label: "In",
  },
  {
    key: "out",
    label: "Out",
  },
  {
    key: "on",
    label: "On",
  },
  {
    key: "breaks",
    label: "Breaks",
  },
  {
    key: "time-work",
    label: "Time-at-work",
  },
];
export const LEAVEVACATION_TAB = [
  {
    title: "Dashboard",
    value: "Dashboard",
    route: "/leaves-and-vacations/dashboard/",
  },
  {
    title: "Pending Requests",
    value: "Pending Requests",
    route: "/leaves-and-vacations/pendingrequest/",
  },
  // },
];
export const TIME_ATTENDANCE_TAB = [
  {
    title: "Attendance",
    value: "Attendance",
    route: "/time-attendance/attendance/",
  },
  {
    title: "Timesheets",
    value: "Timesheets",
    route: "/time-attendance/timesheets/",
  },
  {
    title: "Pending",
    value: "Pending",
    route: "/time-attendance/pending/",
  },
  {
    title: "Past due",
    value: "Past due",
    route: "/time-attendance/past-due/",
  },
];
export const DOWNLOAD_REPORT_TAB = [
  {
    title: "Leave Details",
    value: "leaveReport",
    route: "/reports/leave-report/",
  },
  {
    title: "Leave Summary",
    value: "leaveSummary",
    route: "/reports/leave-summary/",
  },
  {
    title: "Time Sheet",
    value: "timesheetReport",
    route: "/reports/timesheet-report/",
  },
];
export const TABLE_FIELDS = [
  {
    key: "",
    label: "#",
  },
  {
    key: "name",
    label: "Employee",
  },
  {
    key: "presence",
    label: "Presence",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "team",
    label: "Team",
  },
];
export const SELECT_OPTIONS = {
  maritalStatusOptions: [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Separated", value: "separated" },
    { label: "Widowed", value: "widowed" },
    { label: "Divorced", value: "divorced" },
    { label: "Cohabiting Couples", value: "couple" },

  ],
  genderOptions: [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    // { label: "Male", value: "male" },
    // { label: "Female", value: "female" },
  ],
  esstatusOptions: [
    { label: "Active", value: "active " },
    { label: "Serving notice period", value: "serving_notice_period" },
    { label: "Terminated", value: "terminated" },
    { label: "Relieved", value: "relieved" },
    // { label: "IN ACTIVE", value: "IN ACTIVE" },
  ],
  departmentOptions: [
    { label: "Please choose one", value: null },
    { label: "IT", value: "IT" },
    { label: "HR", value: "HR" },
  ],
  teamOptions: [
    { label: "Please choose one", value: null },
    { label: "Technical", value: "Technical" },
    { label: "Account", value: "Account" },
  ],
  titleOptions: [
    { label: "Please choose one", value: null },
    { label: "Sr. Technical Lead", value: "Sr. Technical Lead" },
    { label: "Technical Lead", value: "Technical Lead" },
  ],
  reportsToOptions: [
    { label: "Please choose one", value: null },
    { label: "Bruno", value: "Bruno" },
    { label: "Kelvin", value: "kelvin" },
  ],
  leaveType: [
    // { label: "", value: "" },
    { label: "Personal Leave", value: "leave" },
    { label: "Vacation Leave", value: "vacation" },
    { label: "Medical Leave", value: "medical" },
    { label: "Other Leave", value: "other" },
  ],
};

export const EMPLOYEE_PROFILE_TAB = [
  {
    title: "Employee Profile",
    value: "Employee Profile",
    route: "employee-profile-tab",
  },
  {
    title: "Employment Information",
    value: "employement-info",
    route: "employment-information-tab",
  },
  {
    title: "Files",
    value: "files",
    route: "files-profile-tab",
  },
];
export const USER_PROFILE_TAB = [
  {
    title: "Employee Profile",
    value: "Employee Profile",
    route: "employee-profile-tab",
  },
  {
    title: "Employment Information",
    value: "Employment Information",
    route: "employment-information-tab",
  },
  {
    title: "Time & Attendance",
    value: "Time & Attendance",
    route: "time-attendance-profile-tab",
  },
  {
    title: "Leaves and Vacations",
    value: "Leaves and Vacations",
    route: "leave-vacations-profile-tab",
  },
  {
    title: "Files",
    value: "files",
    route: "files-profile-tab",
  },
];
// export const COUNTRIES = [
//   { value: "", label: "Select Country" },
//   { value: "United States", label: "United States" },
//   { value: "Canada", label: "Canada" },
//   { value: "Other", label: "Other" },
// ];
export const STATES = [
  { value: "", label: "Select State" },
  {
    label: "Alabama",
    value: "Alabama",
    code: "United States",
  },
  {
    label: "Alaska",
    value: "Alaska",
    code: "United States",
  },
  {
    label: "Arizona",
    value: "AZ",
    code: "United States",
  },
  {
    label: "Arkansas",
    value: "AR",
    code: "United States",
  },
  {
    label: "California",
    value: "CA",
    code: "United States",
  },
  {
    label: "Colorado",
    value: "CO",
    code: "United States",
  },
  {
    label: "Connecticut",
    value: "CT",
    code: "United States",
  },
  {
    label: "Delaware",
    value: "DE",
    code: "United States",
  },
  {
    label: "Florida",
    value: "FL",
    code: "United States",
  },
  {
    label: "Georgia",
    value: "GA",
    code: "United States",
  },
  {
    label: "Hawaii",
    value: "HI",
    code: "United States",
  },
  {
    label: "Idaho",
    value: "ID",
    code: "United States",
  },
  {
    label: "Illinois",
    value: "IL",
    code: "United States",
  },
  {
    label: "Indiana",
    value: "IN",
    code: "United States",
  },
  {
    label: "Iowa",
    value: "IA",
    code: "United States",
  },
  {
    label: "Kansas",
    value: "KS",
    code: "United States",
  },
  {
    label: "Kentucky",
    value: "KY",
    code: "United States",
  },
  {
    label: "Louisiana",
    value: "LA",
    code: "United States",
  },
  {
    label: "Maine",
    value: "ME",
    code: "United States",
  },
  {
    label: "Maryland",
    value: "MD",
    code: "United States",
  },
  {
    label: "Massachusetts",
    value: "MA",
    code: "United States",
  },
  {
    label: "Michigan",
    value: "MI",
    code: "United States",
  },
  {
    label: "Minnesota",
    value: "MN",
    code: "United States",
  },
  {
    label: "Mississippi",
    value: "MS",
    code: "United States",
  },
  {
    label: "Missouri",
    value: "MO",
    code: "United States",
  },
  {
    label: "Montana",
    value: "MT",
    code: "United States",
  },
  {
    label: "Nebraska",
    value: "NE",
    code: "United States",
  },
  {
    label: "Nevada",
    value: "NV",
    code: "United States",
  },
  {
    label: "New Hampshire",
    value: "NH",
    code: "United States",
  },
  {
    label: "New Jersey",
    value: "NJ",
    code: "United States",
  },
  {
    label: "New Mexico",
    value: "NM",
    code: "United States",
  },
  {
    label: "New York",
    value: "NY",
    code: "United States",
  },
  {
    label: "North Carolina",
    value: "NC",
    code: "United States",
  },
  {
    label: "North Dakota",
    value: "ND",
    code: "United States",
  },
  {
    label: "Ohio",
    value: "OH",
    code: "United States",
  },
  {
    label: "Oklahoma",
    value: "OK",
    code: "United States",
  },
  {
    label: "Oregon",
    value: "OR",
    code: "United States",
  },
  {
    label: "Pennsylvania",
    value: "PA",
    code: "United States",
  },
  {
    label: "Rhode Island",
    value: "RI",
    code: "United States",
  },
  {
    label: "South Carolina",
    value: "SC",
    code: "United States",
  },
  {
    label: "South Dakota",
    value: "SD",
    code: "United States",
  },
  {
    label: "Tennessee",
    value: "TN",
    code: "United States",
  },
  {
    label: "Texas",
    value: "TX",
    code: "United States",
  },
  {
    label: "Utah",
    value: "UT",
    code: "United States",
  },
  {
    label: "Vermont",
    value: "VT",
    code: "United States",
  },
  {
    label: "Virginia",
    value: "VA",
    code: "United States",
  },
  {
    label: "Washington",
    value: "WA",
    code: "United States",
  },
  {
    label: "West Virginia",
    value: "WV",
    code: "United States",
  },
  {
    label: "Wisconsin",
    value: "WI",
    code: "United States",
  },
  {
    label: "Wyoming",
    value: "WY",
    code: "United States",
  },
  {
    label: "Alberta",
    value: "AB",
    code: "Canada",
  },
  {
    label: "British Columbia",
    value: "BC",
    code: "Canada",
  },
  {
    label: "Manitoba",
    value: "MB",
    code: "Canada",
  },
  {
    label: "New Brunswick",
    value: "NB",
    code: "Canada",
  },
  {
    label: "Newfoundland and Labrador",
    value: "NL",
    code: "Canada",
  },
  {
    label: "Northwest Territories",
    value: "NT",
    code: "Canada",
  },
  {
    label: "Nova Scotia",
    value: "NS",
    code: "Canada",
  },
  {
    label: "Nunavut",
    value: "NU",
    code: "Canada",
  },
  {
    label: "Ontario",
    value: "ON",
    code: "Canada",
  },
  {
    label: "Prince Edward Island",
    value: "PE",
    code: "Canada",
  },
  {
    label: "Quebec",
    value: "QC",
    code: "Canada",
  },
  {
    label: "Saskatchewan",
    value: "SK",
    code: "Canada",
  },
  {
    label: "Yukon Territory",
    value: "YT",
  },
];
export const PEOPLE_TAB = [
  {
    title: "Directory",
    value: "Directory",
  },
];
export const WEEK_DAY = [
  {
    label: "Sunday",
    value: "sunday",
    weekday: 7,
  },
  {
    label: "Monday",
    value: "monday",
    weekday: 1,
  },
  {
    label: "Tuesday",
    value: "tuesday",
    weekday: 2,
  },
  {
    label: "Wednesday",
    value: "wednesday",
    weekday: 3,
  },
  {
    label: "Thursday",
    value: "thursday",
    weekday: 4,
  },
  {
    label: "Friday",
    value: "friday",
    weekday: 5,
  },
  {
    label: "Saturday",
    value: "saturday",
    weekday: 6,
  },
];

export const WEEK_DAYS_START_MONDAY = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const TIMESHEET_STATUS = {
  not_submitted: {
    label: "Not submitted",
    value: "not_submitted",
  },
  pending: {
    label: "Pending",
    value: "pending",
    key: "pending",
    variant: "warning",
    icon: "eye-open",
  },
  vacation: {
    label: "Vacation",
    value: "vacation",
    key: "vacation",
  },
  approved: {
    label: "Approve",
    value: "approved",
    key: "approved",
    variant: "success",
    icon: "check-circle-solid",
  },
  rejected: {
    label: "Reject",
    value: "rejected",
    key: "rejected",
    variant: "danger",
    icon: "close",
  },
  past_due: {
    label: "Past Due",
    value: "past_due",
    key: "past_due",
    variant: "warning",
    icon: "eye-open",
  },
};

export const MONTH_VIEW_TIMESHEET_STATUS = {
  not_submitted: {
    label: "Not submitted",
    value: "not_submitted",
  },
  pending: {
    label: "Pending",
    value: "pending",
    key: "pending",
    variant: "warning",
    icon: "eye-open",
  },
  vacation: {
    label: "Vacation",
    value: "vacation",
    key: "vacation",
  },
  approved: {
    label: "Approved",
    value: "approved",
    key: "approved",
    variant: "success",
    icon: "check-circle-solid",
  },
  rejected: {
    label: "Rejected",
    value: "rejected",
    key: "rejected",
    variant: "danger",
    icon: "close",
  },
  past_due: {
    label: "Past Due",
    value: "past_due",
    key: "past_due",
    variant: "warning",
    icon: "eye-open",
  },
}

export const TIMESHEET_STATUSES = {
  NOT_SUBMITTED: "not_submitted",
  PENDING: "pending",
  VACATION: "vacation",
  APPROVED: "approved",
  REJECTED: "rejected",
  PAST_DUE: "past_due",
};

export const ACTIVITY_TYPE = {
  VACATION: "vacation",
  LEAVE: "leave",
  IN: "in",
  OUT: "out",
  MEDICAL: "medical",
  SICK: "sick",
  PERSONAL: "personal",
  BREAK: "break",
};

export const ACTIVITY_TYPE_LABEL_VALUE = {
  [ACTIVITY_TYPE.VACATION]: "Vacation",
  [ACTIVITY_TYPE.LEAVE]: "Leave",
  [ACTIVITY_TYPE.IN]: "In",
  [ACTIVITY_TYPE.OUT]: "Out",
  [ACTIVITY_TYPE.MEDICAL]: "Medical",
  [ACTIVITY_TYPE.PERSONAL]: "Personal",
};

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
};

export const REQUEST_TYPES = {
  MEDICAL: "medical",
  VACATION: "vacation",
  LEAVE: "leave",
  OTHER: "other",
};

export const REQUEST_STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
};

export const REQUEST_TYPE_OPTIONS = {
  [REQUEST_TYPES.LEAVE]: {
    label: "Request Leave",
    value: "request_leave",
    icon: "exit-to-app-solid",
    type: REQUEST_TYPES.LEAVE,
  },
  [REQUEST_TYPES.VACATION]: {
    label: "Request Vacation",
    value: "request_vacation",
    icon: "airplane",
    type: REQUEST_TYPES.VACATION,
  },
  [REQUEST_TYPES.MEDICAL]: {
    label: "Request Medical/sick",
    value: "request_medical",
    icon: "medical-clinic-solid",
    type: REQUEST_TYPES.MEDICAL,
  },
  [REQUEST_TYPES.OTHER]: {
    label: "Request Other Leave",
    value: "request_other_leave",
    icon: "exit-to-app-solid",
    type: REQUEST_TYPES.OTHER,
  },
};
export const apiKeyUsedValue = {
  leave: "leaveDaysUsed",
  vacation: "vacationDaysUsed",
  medical: "medicalDaysUsed",
  other: "otherDaysUsed",
};
export const apiKeyAllowanceValue = {
  leave: "leaveDaysAllowed",
  vacation: "vacationDaysAllowed",
  medical: "medicalDaysAllowed",
  other: "otherDaysAllowed",
};
export const PEOPLE_ACTION_ITEMS = {
  viewProfile: "View Profile",
  sendMessage: "Send Message",
  meet: "Meet",
};
export const FILL_DAILY_ENTRY_EVENT = 'filldaily-entry'

export const MAX_TIMER_DURATION_HOUR = 12

export const MONTH_SELECTOR_DEFAULT = {
  label: "Select Month",
  value: 'select_month',
};

export const WEEK_SELECTOR_DEFAULT = {
  label: 'Select Week',
  value: 'select_week',
};

export const DAY_SELECTOR_DEFAULT = {
  label: 'Select Day',
  value: 'select_day',
};

export const PENDING_TYPE = "pending";
export const PAST_DUE_TYPE = "past_due";

