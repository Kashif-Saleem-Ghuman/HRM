export const TABLE_HEAD = {
  tHeadPeople: [
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
  ],
  tHeadAttandance: [
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
      key: "breaks",
      label: "Breaks",
    },
    {
      key: "total",
      label: "total",
    },
  ],
  tHeadTimesheet: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Employee",
    },
    {
      key: "mon",
      label: "Mon",
    },
    {
      key: "tue",
      label: "Tue",
    },

    {
      key: "thu",
      label: "Thu",
    },
    {
      key: "fri",
      label: "Fri",
    },
    {
      key: "sat",
      label: "Sat",
    },
    {
      key: "sun",
      label: "Sun",
    },
    {
      key: "total",
      label: "Total",
    },
    {
      key: "status",
      label: "Status",
    },
  ],
  tHeadDepartment: [
    {
      key: "",
      label: "#",
    },
    {
      key: "name",
      label: "Department Name",
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
export const TIME_ATTENDANCE_TAB = [
  {
    title: "Attendance",
    value: "Attendance",
  },
  {
    title: "Timesheets",
    value: "Timesheets",
  },
  {
    title: "Pending",
    value: "Pending",
  },
  {
    title: "Past due",
    value: "Past due",
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
export const TABLE_FIELDS_DIR = [
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
export const TABLE_SECTIONS = [
  {
    id: "63b64e0b9a8c618c76610466",
    businessId: "O3GWpmbk5ezJn4KR",
    userId: "gELYqaQWQG9dnjk2",
    role: "USER",
    firstName: "Rajeev",
    middleName: "Sharma",
    lastName: "Sharma",
    email: "rajeev.sharma@qsstechnosoft.com",
    status: "IN",
    date: "2023-02-21T06:20:53.864Z",
    start: "09:20 AM",
    end: null,
    breaks: 0.7,
    department: "Tech",
    timeWork: "8",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1674473092167.jpg",
    useOrganizationSettings: true,
  },
  {
    id: "63bf3de76bb6d8b00bb07cf3",
    businessId: "O3GWpmbk5ezJn4KR",
    userId: "wNJAPdR6RJEdGyOX",
    role: "USER",
    firstName: "Kelvin",
    lastName: "Jara",
    email: "kelvin.jara@biztree.com",
    status: "Late",
    date: "2023-02-21T06:20:53.864Z",
    start: "09:20 AM",
    end: "06:20 PM",
    breaks: 0.7,
    department: "Tech",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675200061019.jpg",
  },
  {
    id: "63bf9d766bb6d8b00bb07d13",
    businessId: "O3GWpmbk5ezJn4KR",
    userId: "DKgl9av2NwnaG1vz",
    role: "USER",
    firstName: "Vishwajeet",
    lastName: "Mandal",
    email: "vishwajeet.mandal@qsstechnosoft.com",
    status: "Absent",
    date: "2023-02-21T06:20:53.864Z",
    start: "09:20 AM",
    end: null,
    breaks: 0.7,
    department: "Tech",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675423967685.jpg",
  },
  {
    id: "63bfa19c6bb6d8b00bb07d1f",
    businessId: "O3GWpmbk5ezJn4KR",
    userId: "k61YQdJ6J7ldOGpJ",
    role: "ADMIN",
    firstName: "Dhruv",
    lastName: "Sharma",
    email: "dhruv.sharma@qsstechnosoft.com",
    status: "Vacation",
    date: "2023-02-21T06:20:53.864Z",
    start: "09:20 AM",
    end: "06:20 PM",
    timeWork: "8",
    breaks: 0.7,
    department: "Tech",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1676464522832.jpg",
    maritalStatus: "single",
  },
  {
    id: "63bfcfd36bb6d8b00bb07d90",
    businessId: "O3GWpmbk5ezJn4KR",
    userId: "Py7LDdwpOq1e1YKX",
    role: "USER",
    firstName: "Charan",
    middleName: "",
    lastName: "Chauhan",
    email: "charan.pal@qsstechnosoft.com",
    status: "IN",
    date: "2023-02-21T06:20:53.864Z",
    start: "09:20 AM",
    timeWork: "8",
    end: null,
    department: "Tech",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675315647862.jpg",
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
};

export const PERSONAL_INFO_TAB = [
  {
    title: "Personal Information",
    value: "personal-information",
  },
  {
    title: "Address",
    value: "address",
  },
  {
    title: "Contacts",
    value: "contacts",
  },
];
export const EMPLOYEE_PROFILE_TAB = [
  {
    title: "Employee Profile",
    value: "Employee Profile",
  },
  {
    title: "Personal Information",
    value: "Personal Information",
  },
  {
    title: "Contact Information",
    value: "Contact Information",
  },
  {
    title: "Employment Information",
    value: "Employment Information",
  },
  {
    title: "Pay",
    value: "Pay",
  },
  {
    title: "Benefits",
    value: "benefits",
  },
  {
    title: "Time-off",
    value: "time-off",
  },
  {
    title: "Time & Attendance",
    value: "timeattendance",
  },
  {
    title: "Files",
    value: "files",
  },
];
export const EMPLOYEE_INFO_TAB = [
  {
    title: "Employment Information",
    value: "employment-information",
  },
  {
    title: "Compensation",
    value: "compensation",
  },
  {
    title: "Benefits",
    value: "benefits",
  },
  {
    title: "Time-off",
    value: "time-off",
  },
  {
    title: "Attendance",
    value: "attendance",
  },
  {
    title: "Files",
    value: "files",
  },
];
export const FOLDERS_DATA = [
  {
    _id: "63d75423e882494130ec935c",
    name: "Temp Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935b",
    name: "Temp two Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935d",
    name: "Share Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935c",
    name: "Temp Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935b",
    name: "Temp two Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935d",
    name: "Share Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935b",
    name: "Temp two Folder",
    parent: null,
  },
  {
    _id: "63d75423e882494130ec935d",
    name: "Share Folder",
    parent: null,
  },
];
export const FILES_DATA = [
  {
    _id: "63d37245283452acce1ada0a",
    parent: null,
    name: "Dummy Text",
    extension: "pdf",
    size: 64031,
    type: "FILE",
  },
  {
    _id: "63d37245283452acce1ada0a",
    parent: null,
    name: "Dummy Text",
    extension: "pdf",
    size: 64031,
    type: "FILE",
  },
  {
    _id: "63d37245283452acce1ada0b",
    parent: null,
    name: "Dummy Text Two",
    extension: "docx",
    size: 64031,
    type: "FILE",
  },
  {
    _id: "63d37245283452acce1ada0c",
    parent: null,
    name: "Dummy Text Three",
    extension: "docx",
    size: 64031,
    type: "FILE",
  },
  {
    _id: "63d37245283452acce1ada0a",
    parent: null,
    name: "Dummy Text",
    extension: "pdf",
    size: 64031,
    type: "FILE",
  },
  {
    _id: "63d37245283452acce1ada0a",
    parent: null,
    name: "Dummy Text",
    extension: "pdf",
    size: 64031,
    type: "FILE",
  },
];
export const COUNTRIES = [
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "Other", label: "Other" },
];
export const STATES = [
  // { value: "", label: "Select State", code: "all" },
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
  {
    title: "Organizational Chart",
    value: "Organizational Chart",
  },
  {
    title: "Departments",
    value: "Departments",
  },
  {
    title: "Teams",
    value: "Teams",
  },
];
export const MORE_MENU = [
  {
    label: "Open",
    key: "Open",
  },
  {
    label: "Show Detail",
    key: "showdetail",
  },
  {
    label: "Shared with...",
    key: "share",
    icon: "share-arrow",
  },
  {
    label: "Get Link",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "Upload Folder",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "Download Folder",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "submenu Comes here",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "Download Folder",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "submenu Comes here",
    key: "dashboard",
    icon: "file",
  },
  {
    label: "Delete",
    key: "dashboard",
  },
  {
    label: "Setting",
    key: "setting",
  },
  // { label: "Inbox", icon: "recently-added", key: "inbox", url:"/inbox", selected: false},
  // { label: "My Profile", icon: "file", key: "myprofile", url:"/myprofile", selected: false},
];
export const SORTING_MENU = {
  actionMenuPeople: [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Presence",
      key: "presence",
    },
    {
      label: "Department",
      key: "department",
    },
    {
      label: "Reset",
      key: "reset",
    },
  ],
  actionMenuTimeAttandance: [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Date Modified",
      key: "Date Modified",
    },
    {
      label: "Size",
      key: "size",
    },
    {
      label: "File Format",
      key: "file-format",
    },
    {
      label: "Reset",
      key: "reset",
    },
  ],
};
export const ACTION_MENU = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Presence",
    key: "presence",
  },
  {
    label: "Department",
    key: "department",
  },
  {
    label: "Reset",
    key: "reset",
  },
];
export const WEEK_DAY = [
  {
    label: "sunday",
    value: "sunday",
  },
  {
    label: "monday",
    value: "monday",
  },
  {
    label: "tuesday",
    value: "tuesday",
  },
  {
    label: "thursday",
    value: "thursday",
  },
  {
    label: "friday",
    value: "friday",
  },
  {
    label: "saturday",
    value: "saturday",
  },
];
export const DEPARTMENT_ITEMS = [
  {
    label: "Operational Management",
    hashItem: "people",
  },
  {
    label: "Human Resources",
    hashItem: "people",
  },
  {
    label: "Project Management",
    hashItem: "people",
  },
  {
    label: "Product Development",
    hashItem: "people",
  },
  {
    label: "Research",
    hashItem: "people",
  },
  {
    label: "Sales",
    hashItem: "people",
  },
  {
    label: "Marketing",
    hashItem: "people",
  },
  {
    label: "Customer Service",
    hashItem: "people",
  },
  {
    label: "Finance",
    hashItem: "people",
  },
];
export const ACCESS_ITEMS = [
  {
    label: "Owner",
    value: "Owner",
  },
  {
    label: "User",
    value: "User",
  },
];
