export default async (context, inject) => {
    const signOut = () => {
      return new Promise((resolve, reject) => {
        context.app.$cookies.remove(process.env.SSO_COOKIE_NAME, {
          domain: "business-in-a-box.com",
        });
  
        context.app.$cookies.remove(process.env.SSO_COOKIE_NAME);
  
        window.location.href = `${process.env.AUTH_REDIRECT_URL}${process.env.HRM_APP_URL}`;
  
        resolve();
      });
    };
    // Inject $logout() in Vue, context and store.
    inject("signOut", signOut);
  };
  