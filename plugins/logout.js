export default function signOutPlugin({ app }, inject) {
  const signOut = async () => {
    try {
      await removeCookie(process.env.SSO_COOKIE_NAME, { domain: "business-in-a-box.com" });
      await removeCookie(process.env.SSO_COOKIE_NAME);
      window.location.href = `${process.env.AUTH_REDIRECT_URL}${process.env.HRM_APP_URL}`;
    } catch (error) {
      console.error("Error occurred during sign out:", error);
    }
  };

  const removeCookie = (cookieName, options = {}) => {
    return new Promise((resolve, reject) => {
      try {
        app.$cookies.remove(cookieName, options);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  // Inject $signOut() in Vue, context, and store.
  inject("signOut", signOut);
}
