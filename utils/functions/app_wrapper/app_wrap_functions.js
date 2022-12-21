export function headerHelpClick() {
    window.open(process.env.SUPPORT_URL, "_blank");
}
export function headerActionCall() {
    window.open(process.env.BIB_PRICING, "_blank");
}
export function handleToggleWrapperTheme(value) {
    this.lightThemeChecked = value;
    this.$cookies.set("isLightTheme", value);
  }
  export function logout() {
    localStorage.removeItem("accessToken") ;
    this.$cookies.remove("b_ssojwt");
    window.location.href = process.env.LOGOUT_URL;
}
export function myProfile() {
    window.open(process.env.USER_PROFILE_URL, "_blank")
}
export function openAccountPage() {
    window.open(process.env.ACCOUNT_PAGE_URL, "_blank")
  }

