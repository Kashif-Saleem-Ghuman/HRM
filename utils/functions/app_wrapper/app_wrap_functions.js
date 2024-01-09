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
  }
  export function logout() {
    localStorage.removeItem("accessToken") ;
    this.$cookies.remove("b_ssojwt");
    window.location.href = `${process.env.AUTH_REDIRECT_URL}${process.env.HRM_APP_URL}`
}
export function myProfile() {
  window.open(process.env.BIB_ACCOUNT_URL, "_blank")
}

export function openTeamPage() {
  window.open(`${process.env.BIB_ACCOUNT_URL}/people`, "_blank")
}

export function openBillingPage() {
  window.open(`${process.env.BIB_ACCOUNT_URL}/subscription_billing`, "_blank")
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