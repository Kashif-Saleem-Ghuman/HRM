export default async (context, inject) => {
    const logout = () => {
      return new Promise((resolve, reject) => {
        context.app.$cookies.remove(process.env.SSO_COOKIE_NAME, {
          domain: "business-in-a-box.com",
        });
  
        context.app.$cookies.remove(process.env.SSO_COOKIE_NAME);
  
        window.location.href = `${process.env.AUTH_REDIRECT_URL}"http://dev-hrm.business-in-a-box.com/"`;
  
        resolve();
      });
    };
  
    // Inject $logout() in Vue, context and store.
  
    inject("logout", logout);
  };