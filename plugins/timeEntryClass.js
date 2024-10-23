function convertSecondsToHour(seconds) {
  return seconds / 3600;
}
export default ({ app }, inject) => {
  const getDayClassName = (hours, data, day) => {
    const totalHours = convertSecondsToHour(Number(hours));
    if (data && day) {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data;
  
      if (Object.keys(leaves ?? {}).length > 0) {
        const leave = leaves[weekIndex];  
        // Leave type conditions
        if (leave?.type === "vacation") {
          return "chip-wrapper__bgsucess"; 
        }
        if (leave?.type === "leave") {
          return "chip-wrapper__bgabsent";
        }
        if (leave?.type === "medical") {
          return "chip-wrapper__bgabsentpink";
        }
      }
    }

    if (!totalHours || totalHours === "00:00") return "chip-wrapper__bggray";

    if (totalHours >= "08") return "chip-wrapper__bgsucess";

    if (totalHours < "08" && totalHours >= "6") return "chip-wrapper__bgabsent";

    if (totalHours < "6" && totalHours > "0")
      return "chip-wrapper__bgabsentpink";

    return "chip-wrapper__bgdefault";
  };
  const getWeekdayClassNames = (weekData, day) => {
    if (!weekData) return "chip-wrapper__bggray";

    const data = weekData[day.weekday];
    if (!data || data === "00:00") return "chip-wrapper__bggray";

    if (data.vacation)
      return "chip-wrapper__bgvacation chip-wrapper__border-radius";

    const totalHours = convertSecondsToHour(Number(data.totalHours));
    if (totalHours >= 8) {
      return "chip-wrapper__bgsucess chip-wrapper__border-radius";
    } else if (totalHours < 8 && totalHours >= 6) {
      return "chip-wrapper__bgabsent chip-wrapper__border-radius";
    } else if (totalHours > 0 && totalHours < 6) {
      return "chip-wrapper__bgabsentpink chip-wrapper__border-radius";
    } else {
      return "chip-wrapper__bgdefault chip-wrapper__border-radius";
    }
  };
  const getHightlighterClass = (hours, data, day) => {
    const totalHours = convertSecondsToHour(Number(hours));
    if (data && day) {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data;
  
      if (Object.keys(leaves ?? {}).length > 0) {
        const leave = leaves[weekIndex];  
        // Leave type conditions
        if (leave?.type === "vacation") {
          return "notify-highlighter__bgsucess"; 
        }
        if (leave?.type === "leave") {
          return "notify-highlighter__bgabsent";
        }
        if (leave?.type === "medical") {
          return "notify-highlighter__bgabsentpink";
        }
      }
    }
  };
  inject("getDayClassName", getDayClassName);
  inject("getWeekdayClassNames", getWeekdayClassNames);
  inject("getHightlighterClass", getHightlighterClass);
};
