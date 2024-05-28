export function headerHelpClick() {
    window.open(process.env.SUPPORT_URL, "_blank");
}
export function headerActionCall() {
  this.accountType == 'CLIENT' ?  window.open(process.env.TEAM_URL, "_blank") :
  window.open(process.env.BIB_UPGRADE_LICENSE_URL, "_blank");
}
export function handleToggleWrapperTheme(value) {
    this.lightThemeChecked = value;
    this.$cookies.set("isLightTheme", value, {
      path: "/",
      domain: location.host.includes("business-in-a-box.com")
        ? ".business-in-a-box.com"
        : undefined,
      maxAge: 60 * 60 * 24 * 30,
    });
    this.$cookies.set("isLightTheme", value);
    this.$nuxt.$emit("update-theme");
  }
  export function logout() {
    localStorage.removeItem("accessToken") ;
    this.$cookies.remove("b_ssojwt");
    window.location.href = `${process.env.AUTH_REDIRECT_URL}${process.env.HRM_APP_URL}`
}
export function myProfile() {
  window.open(process.env.USER_PROFILE_URL, "_blank")
}

export function openTeamPage() {
  window.open(`${process.env.TEAM_URL}`, "_blank")
}

export function openBillingPage() {
  window.open(`${process.env.BILLING_URL}`, "_blank")
}
// export function isThemeCheck(){
//     let isTheme = this.$cookies.get('isLightTheme');
//     if (isTheme == undefined) {
//         this.$cookies.set("isLightTheme", false, {
//           path: "/",
//           domain: location.host.includes("business-in-a-box.com")
//             ? ".business-in-a-box.com"
//             : undefined,
//           maxAge: 60 * 60 * 24 * 30,
//         });
//       }
// }