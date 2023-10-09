export function headerHelpClick() {
    window.open(process.env.SUPPORT_URL, "_blank");
}
export function headerActionCall() {
    window.open(process.env.BIB_PRICING, "_blank");
}
export function handleToggleWrapperTheme(value) {
    this.lightThemeChecked = value;
    // this.$cookies.set("isLightTheme", value, {
    //   path: "/",
    //   domain: location.host.includes("business-in-a-box.com")
    //     ? ".business-in-a-box.com"
    //     : undefined,
    //   maxAge: 60 * 60 * 24 * 30,
    // });
    // this.$cookies.set("isLightTheme", value);
  }
  export function logout() {
    localStorage.removeItem("accessToken") ;
    this.$cookies.remove("b_ssojwt");
    window.location.href = `${process.env.AUTH_REDIRECT_URL}${process.env.HRM_APP_URL}`
}
export function myProfile() {
    window.open(process.env.USER_PROFILE_URL, "_blank")
}
export function openAccountPage() {
    window.open(process.env.ACCOUNT_PAGE_URL, "_blank")
  }
export function isThemeCheck(){
    let isTheme = this.$cookies.get('isLightTheme');
    if (isTheme == undefined) {
        this.$cookies.set("isLightTheme", false, {
          path: "/",
          domain: location.host.includes("business-in-a-box.com")
            ? ".business-in-a-box.com"
            : undefined,
          maxAge: 60 * 60 * 24 * 30,
        });
      }
}