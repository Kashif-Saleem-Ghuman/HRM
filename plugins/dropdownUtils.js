export default (context, inject) => {
    const profiletab = function(name, isLeave) {
      const avatar = document.querySelector(`#${name}`);
      
      avatar.style.display = isLeave ? "none" : "block";
  
      if (!isLeave) {
        avatar.style.top = "100%";
        avatar.style.bottom = "auto";
  
        const rect = avatar.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = avatar.offsetHeight - 150;
        const spaceBelow = viewportHeight - rect.bottom;
  
        if (spaceBelow < dropdownHeight) {
          avatar.style.top = "auto";
          avatar.style.bottom = "100%";
        }
      }
    };
  
    // Inject the function globally in the app
    inject('profiletab', profiletab);
  };
  