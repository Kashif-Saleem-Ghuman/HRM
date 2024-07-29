export default ({ app, store }, inject) => {
    const getEmployeeInitials = (employee) => {
        if (!employee) return "";
        const { firstName, lastName } = employee;
        return firstName?.charAt(0) + lastName?.charAt(0);
      }
      
      const getEmployeeFullName = (employee)=>  {
        if (!employee) return "";
        const { firstName, lastName } = employee;
        const capitalize = (name) => {
          if (!name) return "";
          return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        };
        return `${capitalize(firstName)} ${capitalize(lastName)}`;
      }
    inject('getEmployeeInitials', getEmployeeInitials);
    inject('getEmployeeFullName', getEmployeeFullName);
  };
  