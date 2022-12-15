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
    navItems: [
      { label: "Home", icon: "file", key: "home", },
      { label: "Employe List", icon: "file", key: "employe" },
    ],


  }
}
export default data;