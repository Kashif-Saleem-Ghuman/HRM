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
      { label: "Home", icon: "file", key: "home", url:"/dashboard", selected: false},
      { label: "Employees", icon: "recently-added", key: "employees", url:"/employees/employe-list", selected: false},
      { label: "Hiring", icon: "techno", key: "hiring", url:'/hiring', selected: false},
      { label: "Onboarding", icon: "prod", key: "onboarding", url:'/onboarding', selected: false},
    ],
    navItems2: [
      { label: "Payroll", icon: "contractors", key: "payroll", selected: false},
      { label: "Leaves", icon: "briefcase", key: "leaves", selected: false},
      { label: "Comapny Profile", icon: "save", key: "comapny_profile", selected: false},
      { label: "Evaluations", icon: "drag", key: "employe", selected: false},
      { label: "Setting", icon: "setting", key: "setting", selected: false},
    ],
    navItemsHome: [
      { label: "Home", icon: "file", key: "home", selected: false},
    ]
  }
}
export default data;