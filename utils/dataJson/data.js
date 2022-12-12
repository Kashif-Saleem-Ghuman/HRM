const data = () => {
    return{
    appItems: [
        {
        img: "Layers",
        color: "primary",
        text: "Templates",
        href: '',
      },
      {
        img: "data-storage-single",
        color: "success-sub1",
        text: "Files",
        href: '',
      },
      {
        img: "Signature",
        color: "orange",
        text: "eSign",
        href: '',
      },
      {
        img: "Tick",
        color: "primary",
        text: "Project",
        href: '',
      },
      {
        img: "CommentForum",
        color: "purple",
        text: "Chat",
        href: '',
      },
      {
        img: "pencil",
        color: "primary-sub1",
        active: false,
        text: "Editor",
        href: '',
      },
      {
        img: "video",
        color: "warning",
        text: "Connect",
        href: '',
      },
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
    { label: "Menu Goes Here", icon: "file", key: "new_tab", href:"/about"},
    { label: "Menu Goes Here 2", icon: "file", key: "file" },
  ],
   
    }
}
export default data;