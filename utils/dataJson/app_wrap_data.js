const data = () => {
  return {
    popupNotificationMsgs: [
      {
        text: 'Profile Image Upload successfully...',
        variant: 'success'
      },
      {
        text: 'Employee data update successfully...',
        variant: 'success'
      },
    ],
    appItems: [
      {
        img: "projects",
        color: "primary",
        // active: true,
        text: "Projects",
        href: process.env.BIB_PROJECT_APP_URL,
      },
      {
        img: "cloud-solid",
        color: "success",
        text: "Drive",
        href: process.env.BIB_DRIVE_URL,
      },
      {
        img: "editor",
        color: "orange",
        text: "Editor",
        href: process.env.WEB_EDITOR_APP_URL,
      },
      {
        img: "chat",
        color: "primary",
        text: "Chat",
        href: process.env.BIB_CHAT_APP_URL,
      },
      {
        img: "signature",
        color: "purple",
        text: "eSign",
        href: process.env.BIB_ESIGN_APP_URL,
      },
      {
        img: "meetings",
        color: "primary-sub1",
        text: "Meetings",
        href: process.env.VIDEO_CONF_APP_URL
      },
      {
        img: "layers-solid",
        color: "warning",
        text: "Templates",
        href: process.env.BIB_TEMPLATES_APP_URL,
      }
    ],
    avatarMenu: [
      {
        img: "user-canonical",
        color: "gray5",
        active: false,
        text: "My Profile",
        href: '',

      },
    ],
    bibTabs: [
      {
        title: "Personal",
        value: "personal",
      },
      {
        title: "Work",
        value: "work",
      },
      {
        title: "Tasks",
        value: "tasks",
      },
      {
        title: "Team",
        value: "team",
      },
      {
        title: "Documents",
        value: "documents",
      },
      {
        title: "Work Week",
        value: "Workweek",
      },

      {
        title: "Payroll",
        value: "payroll",
      },
      {
        title: "File Manager",
        value: "filemanager",
      },
    ],
    navItems: [
      { label: "Dashboard", icon: "add", key: "dashboard", url:"/dashboard", selected: false, id:""},
      { label: "Inbox", icon: "add", key: "inbox", url:"/inbox", selected: false},
      { label: "Org Profile", icon: "add", key: "orgprofile", url:"/orgprofile", selected: false, id:""},
      { label: "People", icon: "add", key: "people", url:"/people", selected: false, id:""},
      { label: "Time & Attendance", icon: "add", key: "Time", url:'/timesheets', selected: false},
      { label: "Absense", icon: "add", key: "absense", url:'/absense', selected: false},
      { label: "Compensation", icon: "add", key: "compensation", url:'/compensation', selected: false},
      { label: "Benefits", icon: "add", key: "benefits", url:"/benefits", selected: false},
      { label: "Files", icon: "add", key: "files", url:"/files", selected: false},
      { label: "My Profile", icon: "add", key: "myprofile", url:"/myprofile", selected: false},
      { label: "Time & Attendance", icon: "add", key: "attendance", url:"/files", selected: false},
      { label: "Time-off", icon: "add", key: "timesoff", url:"/files", selected: false},
      { label: "My Files", icon: "add", key: "myfiles", url:"/files", selected: false},

    ],
  }
}
export default data;