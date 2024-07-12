export default ({ app, store }, inject) => {
    const leaveTypeCheck = (type) => {
      if (!type) return type;
  
      const lowerCaseType = type.toLowerCase();
    
      if (lowerCaseType === "leave") {
        return "Unpaid Leave";
      } else if (lowerCaseType === "vacation") {
        return "Paid time-off";
      } else {
        return lowerCaseType;
      }
    };
  
    inject('leaveTypeCheck', leaveTypeCheck);
  };
  