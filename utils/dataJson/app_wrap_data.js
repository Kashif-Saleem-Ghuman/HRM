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
    navItemsUser: [
      { label: "Home", icon: "add", key: "home", selected: false, id:""},
      { label: "Time & Attandance", icon: "add", key: "my-time-attandance", selected: false},
      { label: "Leave & Vacations", icon: "add", key: "my-leave-vacations",  selected: false},
      { label: "My Profile", icon: "add", key: "myprofile",  selected: false},
      // { label: "My Files", icon: "add", key: "files", url:"/files", selected: false},
    ],
    navItemsUserShortcuts: [
      { label: "Clock in", icon: "time", key: "usertimeattandance", selected: false},
      { label: "Send Notification", icon: "mail", key: "userleavevacations",  selected: false},
      { label: "Request Vacation", icon: "start", key: "userprofile",  selected: false},
      { label: "Request Leave", icon: "exit-to-app", key: "files", url:"/files", selected: false},
    ],
    navItemsAdminSwitch: [
      { label: "Organization admin", icon: "add", key: "organization-admin", selected: false, id:""},
    ],
    navItemsAdmin: [
      { label: "Organization admin", icon: "user", key: "dashboard",  url:"/dashboard/", selected: false, id:""},
      { label: "Inbox", icon: "add", key: "inbox",  url:"/inbox/", selected: false},
      { label: "Organization profile", icon: "add", key: "orgprofile", url:"/orgprofile/", selected: false, id:""},
      { label: "People", icon: "add", key: "people", url:"/people/", selected: false, id:""},
      { label: "Time & Attendance", icon: "add", key: "time-attendance", url:'/time-attendance/', selected: false},
      { label: "Leave & vacations", icon: "add", key: "leave-vacations", url:'/leave-vacations/', selected: false},
      { label: "Settings", icon: "add", key: "settings", url:'/settings', selected: false},
    ],
    navItemsUserSwitch: [
      { label: "My account", icon: "add", key: "my-account", selected: false, id:""},
    ],
  }
  
}
export default data;