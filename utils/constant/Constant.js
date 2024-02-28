export const TABLE_HEAD = {
  tHeadDashboard: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Employee",
      width: `${100 / 5}%`,
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
      width: `${100 / 6}%`,
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
      width: `${100 / 6}%`,
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
      width: `${100 / 6}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-out-sort",
        isActive: false,
        sortKey: "activityReport.out",
        type: "string",
      },
    },
    {
      key: "breaks",
      label: "Breaks",
      width: `${100 / 7}%`,
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
      width: `${100 / 3}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 13}%`,
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
      width: `${100 / 4}%`,
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
      width: `${100 / 5}%`,
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
      width: `${100 / 5}%`,
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
      width: `${100 / 6}%`,
      header_icon: {
        icon: "long-arrow-up",
        event: "employee-end-sort",
        isActive: false,
        sortKey: "end",
        type: "date",
      },
    },
    {
      key: "reason",
      label: "Reason",
      width: `${100 / 6}%`,
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
      width: `${100 / 4}%`,
    },
    {
      key: "in",
      label: "IN",
      center: true,
      width: `${100 / 5}%`,
    },
    {
      key: "break",
      label: "Break",
      center: true,
      width: `${100 / 4}%`,
    },
    {
      key: "out",
      label: "Out",
      center: true,
      width: `${100 / 5}%`,
    },
    {
      key: "total",
      label: "Total",
      center: true,
      width: `${100 / 7}%`,
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
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "IN ACTIVE", value: "IN ACTIVE" },
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
export const COUNTRIES = [
  { value: "", label: "Select Country" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "Other", label: "Other" },
];
export const STATES = [
  { value: "", label: "Select State" },
  {
    label: "Alabama",
    value: "Alabama",
    code: "USA",
  },
  {
    label: "Alaska",
    value: "Alaska",
    code: "USA",
  },
  {
    label: "Arizona",
    value: "AZ",
    code: "USA",
  },
  {
    label: "Arkansas",
    value: "AR",
    code: "USA",
  },
  {
    label: "California",
    value: "CA",
    code: "USA",
  },
  {
    label: "Colorado",
    value: "CO",
    code: "USA",
  },
  {
    label: "Connecticut",
    value: "CT",
    code: "USA",
  },
  {
    label: "Delaware",
    value: "DE",
    code: "USA",
  },
  {
    label: "Florida",
    value: "FL",
    code: "USA",
  },
  {
    label: "Georgia",
    value: "GA",
    code: "USA",
  },
  {
    label: "Hawaii",
    value: "HI",
    code: "USA",
  },
  {
    label: "Idaho",
    value: "ID",
    code: "USA",
  },
  {
    label: "Illinois",
    value: "IL",
    code: "USA",
  },
  {
    label: "Indiana",
    value: "IN",
    code: "USA",
  },
  {
    label: "Iowa",
    value: "IA",
    code: "USA",
  },
  {
    label: "Kansas",
    value: "KS",
    code: "USA",
  },
  {
    label: "Kentucky",
    value: "KY",
    code: "USA",
  },
  {
    label: "Louisiana",
    value: "LA",
    code: "USA",
  },
  {
    label: "Maine",
    value: "ME",
    code: "USA",
  },
  {
    label: "Maryland",
    value: "MD",
    code: "USA",
  },
  {
    label: "Massachusetts",
    value: "MA",
    code: "USA",
  },
  {
    label: "Michigan",
    value: "MI",
    code: "USA",
  },
  {
    label: "Minnesota",
    value: "MN",
    code: "USA",
  },
  {
    label: "Mississippi",
    value: "MS",
    code: "USA",
  },
  {
    label: "Missouri",
    value: "MO",
    code: "USA",
  },
  {
    label: "Montana",
    value: "MT",
    code: "USA",
  },
  {
    label: "Nebraska",
    value: "NE",
    code: "USA",
  },
  {
    label: "Nevada",
    value: "NV",
    code: "USA",
  },
  {
    label: "New Hampshire",
    value: "NH",
    code: "USA",
  },
  {
    label: "New Jersey",
    value: "NJ",
    code: "USA",
  },
  {
    label: "New Mexico",
    value: "NM",
    code: "USA",
  },
  {
    label: "New York",
    value: "NY",
    code: "USA",
  },
  {
    label: "North Carolina",
    value: "NC",
    code: "USA",
  },
  {
    label: "North Dakota",
    value: "ND",
    code: "USA",
  },
  {
    label: "Ohio",
    value: "OH",
    code: "USA",
  },
  {
    label: "Oklahoma",
    value: "OK",
    code: "USA",
  },
  {
    label: "Oregon",
    value: "OR",
    code: "USA",
  },
  {
    label: "Pennsylvania",
    value: "PA",
    code: "USA",
  },
  {
    label: "Rhode Island",
    value: "RI",
    code: "USA",
  },
  {
    label: "South Carolina",
    value: "SC",
    code: "USA",
  },
  {
    label: "South Dakota",
    value: "SD",
    code: "USA",
  },
  {
    label: "Tennessee",
    value: "TN",
    code: "USA",
  },
  {
    label: "Texas",
    value: "TX",
    code: "USA",
  },
  {
    label: "Utah",
    value: "UT",
    code: "USA",
  },
  {
    label: "Vermont",
    value: "VT",
    code: "USA",
  },
  {
    label: "Virginia",
    value: "VA",
    code: "USA",
  },
  {
    label: "Washington",
    value: "WA",
    code: "USA",
  },
  {
    label: "West Virginia",
    value: "WV",
    code: "USA",
  },
  {
    label: "Wisconsin",
    value: "WI",
    code: "USA",
  },
  {
    label: "Wyoming",
    value: "WY",
    code: "USA",
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
    variant: "primary-24",
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
