const data = () => {
  return {
    popupNotificationMsgs: [
      {
        text: "Leave Added successfully...",
        variant: "primary-24",
      },
      {
        text: "Employee data update successfully...",
        variant: "primary-24",
      },
    ],
    appItems: [
      {
        img: "Layers",
        color: "primary",
        text: "Templates",
        href: process.env.BIB_TEMPLATES_APP_URL,
      },
      {
        img: "cloud-data-network-solid",
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
        img: "table",
        color: "success",
        text: "Sheets",
        active: false, 
        href: process.env.WEB_SHEET_EDITOR_APP_URL,
      },
      {
        img: "chat",
        color: "primary",
        text: "Chat",
        href: process.env.BIB_CHAT_APP_URL,
      },
      {
        img: "meetings",
        color: "primary-sub1",
        text: "Connect",
        href: process.env.VIDEO_CONF_APP_URL,
      },
      {
        img: "projects",
        color: "primary",
        text: "Projects",
        href: process.env.BIB_PROJECT_APP_URL,
      },
      {
        img: "partners",
        color: "primary",
        text: "HRM",
        active: true, 
        href: process.env.HRM_APP_URL
      },
    ],
    navItemsUser: [
      // {
      //   label: "Home",
      //   icon: "home",
      //   key: "dashboard",
      //   url: "/dashboard",
      //   selected: false,
      // },
      {
        label: "Time & Attendance",
        icon: "time-history",
        key: "time-attendance",
        url: "/time-attendance/attendance/",
        selected: false,
      },
      {
        label: "Leave & Vacations",
        icon: "airplane-solid",
        key: "leave-vacations",
        url: "/leaves-and-vacations/dashboard",
        selected: false,
      },
      {
        label: "My Profile",
        icon: "user",
        key: "profile",
        url: "/profile",
        selected: false,
      },
      // { label: "My Files", icon: "add", key: "files", url:"/files", selected: false},
    ],
    navItemsUserShortcuts: [
      // {
      //   label: "Clock in",
      //   icon: "time",
      //   key: "clockIn",
      //   action: "openClockIn",
      // },
      // {
      //   label: "Send Notification",
      //   icon: "mail",
      //   key: "sendNotification",
      //   selected: false,
      // },
      {
        label: "Request Vacation",
        icon: "airplane-solid",
        key: "requestVacation",
        url: "/leaves-and-vacations/dashboard",
        action: "openRequestVacation",
      },
      {
        label: "Request Leave",
        icon: "exit-to-app-solid",
        key: "requestLeave",
        url: "/leaves-and-vacations/dashboard",
        action: "openRequestLeave",
      },
    ],
    navItemsAdminSwitch: [
      {
        label: "Organization admin",
        icon: "user-profile-circle-solid",
        key: "organization-admin",
        selected: false,
        id: "",
      },
    ],
    navItemsAdmin: [
      {
        label: "Organization Admin",
        icon: "user",
        key: "dashboard",
        url: "/dashboard/",
        selected: false,
        id: "",
      },
      // { label: "Inbox", icon: "add", key: "inbox",  url:"/inbox/", selected: false},
      {
        label: "Organization Profile",
        icon: "bib-logo",
        key: "orgprofile",
        url: "/orgprofile/",
        selected: false,
        id: "",
      },
      {
        label: "People",
        icon: "user-group",
        key: "people",
        url: "/people/",
        selected: false,
        id: "",
      },
      {
        label: "Time & Attendance",
        icon: "time-history",
        key: "time-attendance",
        url: "/time-attendance/attendance/",
        selected: false,
      },
      {
        label: "Leave & Vacations",
        icon: "airplane-solid",
        key: "leave-vacations",
        url: "/leaves-and-vacations/dashboard/",
        selected: false,
      },
      // { label: "My Account", icon: "add", key: "settings", selected: true},
    ],
    navItemsUserSwitch: [
      { label: "My Account", icon: "add", key: "my-account", selected: false },
      {
        label: "Organization Admin",
        icon: "add",
        key: "organization-admin",
        selected: false,
      },
    ],
  };
};
export default data;
