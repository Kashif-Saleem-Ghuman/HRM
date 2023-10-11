const data = () => {
  return {
    popupNotificationMsgs: [
      {
        text: 'Leave Added successfully...',
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
    navItemsUser: [
      { label: "Home", icon: "home", key: "home", url:"/dashboard", selected: false},
      { label: "Time & Attendance", icon: "time-history", key: "time-attendance", selected: false},
      { label: "Leave & Vacations", icon: "airplane-solid", key: "leave-vacations",  selected: false},
      { label: "My Profile", icon: "user", key: "profile",  selected: false},
      // { label: "My Files", icon: "add", key: "files", url:"/files", selected: false},
    ],
    navItemsUserShortcuts: [
      { label: "Clock in", icon: "time", key: "clockIn", selected: false},
      { label: "Send Notification", icon: "mail", key: "sendNotification",  selected: false},
      { label: "Request Vacation", icon: "airplane-solid", key: "requestVacation",  selected: false},
      { label: "Request Leave", icon: "exit-to-app-solid", key: "requestLeave", url:"/files", selected: false},
    ],
    navItemsAdminSwitch: [
      { label: "Organization admin", icon: "user-profile-circle-solid", key: "organization-admin", selected: false, id:""},
    ],
    navItemsAdmin: [
      { label: "Organization Admin", icon: "user", key: "dashboard",  url:"/dashboard/", selected: false, id:""},
      // { label: "Inbox", icon: "add", key: "inbox",  url:"/inbox/", selected: false},
      { label: "Organization Profile", icon: "bib-logo", key: "orgprofile", url:"/orgprofile/", selected: false, id:""},
      { label: "People", icon: "user-group", key: "people", url:"/people/", selected: false, id:""},
      { label: "Time & Attendance", icon: "time-history", key: "time-attendance", url:'/time-attendance/', selected: false},
      { label: "Leave & Vacations", icon: "airplane-solid", key: "leave-vacations", url:'/leave-vacations/', selected: false},
      // { label: "Settings", icon: "add", key: "settings", url:'/settings', selected: false},
    ],
    navItemsUserSwitch: [
      { label: "My account", icon: "add", key: "my-account", selected: false, id:""},
    ],
  }
  
}
export default data;