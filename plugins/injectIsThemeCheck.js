export default ({ app, store }, inject) => {
  const setThemeCookie = (value) => {
    const cookieOptions = {
      path: "/",
      domain: location.host.includes("business-in-a-box.com") ? ".business-in-a-box.com" : undefined,
      maxAge: 60 * 60 * 24 * 30,
    };
    app.$cookies.set("isLightTheme", value, cookieOptions);
  };

  const toggleTheme = (value) => {
    setThemeCookie(value);
    store.dispatch("theme/toggleTheme", value);
  };

  const isThemeCheck = () => {
    let isTheme = app.$cookies.get('isLightTheme');
    if (isTheme === undefined) {
      isTheme = true;
      setThemeCookie(isTheme);
    }
    toggleTheme(isTheme);
  };

  inject('handleToggleWrapperTheme', toggleTheme);
  inject('isThemeCheck', isThemeCheck);
};
