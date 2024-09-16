export default ({ app }, inject) => {
    // Define the hideUserMenu function
    const hideUserMenu = () => {
      const userMenu = document.getElementsByClassName("user-menu")[0];
  
      if (userMenu) {
        const animationClasses = [
          "slide-right-leave-active",
          "slide-right-leave-to",
        ];
  
        // Add animation classes to the user menu
        userMenu.classList.add(...animationClasses);
  
        // Optional: You may want to remove the menu after the animation is done
        setTimeout(() => {
          userMenu.style.display = 'none';
        }, 300); // Adjust this duration to match the animation time
      }
    };
  
    // Inject the hideUserMenu function globally
    inject('hideUserMenu', hideUserMenu);
  };
  