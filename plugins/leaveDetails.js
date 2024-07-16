// plugins/leaveDetailHelper.js
export const leaveDetail = function(item) {
  event.stopPropagation();
  const data = item.request;
  this.$nuxt.$emit("open-sidebar", data);
  this.$nuxt.$emit("close-sidebar-main");
};

export default (context, inject) => {
  inject('leaveDetail', leaveDetail);
};
