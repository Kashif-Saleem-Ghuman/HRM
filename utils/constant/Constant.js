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
      status:'IN',
      date: "2023-02-21T06:20:53.864Z",
      start: "09:20 AM",
      end: null,
      department:"Tech",
      timeWork:"8",
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
      status:'Late',
      date: "2023-02-21T06:20:53.864Z",
      start: "09:20 AM",
      end: "06:20 PM",
      department:"Tech",
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
      status:'Absent',
      date: "2023-02-21T06:20:53.864Z",
      start: "09:20 AM",
      end: null,
      department:"Tech",
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
      status:'Vacation',
      date: "2023-02-21T06:20:53.864Z",
      start: "09:20 AM",
      end: "06:20 PM",
      timeWork:"8",
      department:"Tech",
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
      status:'IN',
      date: "2023-02-21T06:20:53.864Z",
      start: "09:20 AM",
      timeWork:"8",
      end: null,
      department:"Tech",
      photo:
        "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675315647862.jpg",
    },
];
export const SELECT_OPTIONS = {
  maritalStatusOptions: [
    { label: "Please choose one", value: null },
    { label: "single", value: "single" },
    { label: "married", value: "married" },
    { label: "separated", value: "separated" },
    { label: "widowed", value: "widowed" },
    { label: "divorced", value: "divorced" },
  ],
  genderOptions: [
    { label: "Please choose one", value: null },
    { label: "male", value: "male" },
    { label: "female", value: "female" },
  ],
  esstatusOptions: [
    { label: "Please choose one", value: null },
    { label: "Active", value: "Active" },
    { label: "In Active", value: "In Active" },
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
    title: "Compensation",
    value: "Compensation",
  },
  {
    title: "Benefits",
    value: "Benefits",
  },
  {
    title: "Time-off",
    value: "Time-off",
  },
  {
    title: "Time & Attendance",
    value: "Time & Attendance",
  },
  {
    title: "Performance",
    value: "Performance",
  },
  {
    title: "Files",
    value: "Files",
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
  { value: "", label: "Select Country" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "Other", label: "Other" },
];
export const STATES = [
  { value: "", label: "Select State", code: "all" },
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
    label: "American Samoa",
    value: "American Samoa",
    code: "USA",
  },
  {
    label: "Arizona",
    value: "Arizona",
    code: "USA",
  },

  {
    label: "Alberta",
    value: "Alberta",
    code: "Canada",
  },
  {
    label: "British Columbia",
    value: "British Columbia",
    code: "Canada",
  },
  {
    label: "Manitoba",
    value: "Manitoba",
    code: "Canada",
  },
  {
    label: "New Brunswick",
    value: "New Brunswick",
    code: "Canada",
  },
  {
    label: "Newfoundland and Labrador",
    value: "Newfoundland and Labrador",
    code: "Canada",
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
  // { label: "Inbox", icon: "recently-added", key: "inbox", url:"/inbox", selected: false},
  // { label: "My Profile", icon: "file", key: "myprofile", url:"/myprofile", selected: false},
];
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
