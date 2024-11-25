import PaySidebarDropmenu from "../../../components/common/Pay/PaySidebarDropmenu.vue";

export const PAY_SIDEBAR_ICONS = [
  { 
    id: "bookmark", 
    icon: "bookmark-solid", 
    tooltip: "Bookmark", 
    emitEvent: "bookmarkClicked", 
    dropdown: false 
  },
  { 
    id: "expand", 
    icon: "expand-fullscreen", 
    tooltip: "Expand", 
    emitEvent: "expandClicked", 
    dropdown: false 
  },
  { 
    id: "elipsis", 
    icon: "elipsis", 
    component: PaySidebarDropmenu,
    tooltip: "Elipsis", 
    emitEvent: "elipsisClicked", 
    dropdown: true, 
    menuItems: [
      { label: "Bookmark", action: "handleBookmark" },
      { label: "Share Contact", action: "handleShareContact" },
      { label: "Archive", action: "handleArchive" },
      { label: "Delete", action: "handleDelete" },
    ]
  },
  { 
    id: "close", 
    icon: "close", 
    tooltip: "Close", 
    emitEvent: "closeSidebar", 
    dropdown: false 
  },
];
