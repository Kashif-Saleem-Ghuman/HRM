export function headerHelpClick() {
    window.open(process.env.SUPPORT_URL, "_blank");
}
export function headerActionCall() {
    window.open(process.env.BIB_PRICING, "_blank");
}
export function handleToggleWrapperTheme(value) {
    this.lightThemeChecked = value;
  }
  export function logout() {
    localStorage.removeItem("accessToken");
    this.$cookies.remove("b_ssojwt");
    window.location.href = process.env.LOGOUT_URL;
}