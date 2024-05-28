export default ({ app, store }, inject) => {
  const handleToggleWrapperTheme = (value) => {
    app.$cookies.set("isLightTheme", value, {
      path: "/",
      domain: location.host.includes("business-in-a-box.com") ? ".business-in-a-box.com" : undefined,
      maxAge: 60 * 60 * 24 * 30,
    });
    store.dispatch("theme/toggleTheme", value);
  };

  const isThemeCheck = () => {
    let isTheme = app.$cookies.get('isLightTheme');
    if (isTheme === undefined) {
      isTheme = false;
      app.$cookies.set("isLightTheme", isTheme, {
        path: "/",
        domain: location.host.includes("business-in-a-box.com") ? ".business-in-a-box.com" : undefined,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    store.dispatch("theme/toggleTheme", isTheme);
  };

  inject('handleToggleWrapperTheme', handleToggleWrapperTheme);
  inject('isThemeCheck', isThemeCheck);
}
