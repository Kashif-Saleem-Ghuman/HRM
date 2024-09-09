export const leaveDetail = (item, event) => {
  if(event != null) {
    event.stopPropagation();
  }
  
  const data = item.request;
  if (typeof window !== 'undefined' && window.$nuxt) {
    window.$nuxt.$emit("open-sidebar", data);
    window.$nuxt.$emit("close-sidebar-main");
  }
};

export default (context, inject) => {
  inject('leaveDetail', leaveDetail);
};
