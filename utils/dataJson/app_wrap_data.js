const data = () => {
  return {
    popupNotificationMsgs: [
      {
        text: 'Home page load suceessfully...',
        variant: 'success'
      },
      {
        text: 'Employe list page load suceessfully...',
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
      { label: "Dashboard", icon: "file", key: "dashboard", url:"/dashboard", selected: false},
      { label: "Inbox", icon: "recently-added", key: "inbox", url:"/inbox", selected: false},
      { label: "My Profile", icon: "file", key: "myprofile", url:"/myprofile", selected: false},
      { label: "People", icon: "recently-added", key: "people", url:"/people", selected: false},
      { label: "Timesheets", icon: "techno", key: "timesheets", url:'/timesheets', selected: false},
      { label: "Time tracker", icon: "prod", key: "timetracker", url:'/timetracker', selected: false},
      { label: "Absense", icon: "prod", key: "absense", url:'/absense', selected: false},
      { label: "Performance", icon: "prod", key: "performance", url:'/performance', selected: false},
      { label: "Compensation", icon: "prod", key: "compensation", url:'/compensation', selected: false},
      { label: "Files", icon: "contractors", key: "files", url:"/files", selected: false},
    ],
  }
}
export default data;