import { ACTIVITY_TYPE } from "@/utils/constant/Constant";
export function Employee(employee) {
  for (let key in employee) {
    this[key] = employee[key];
  }

  this.hasActiveTimer = () => {
    return !!this.timers?.length;
  };

  this.isPresent = () => {
    const present = this.hasActiveTimer() || this.hasInEntry();
    if (present) {
      console.log("is present!", this);
    }
    return present;
  };

  this.hasInEntry = () => {
    return this.timeEntries.some(
      (timeEntry) =>
        timeEntry.activity === ACTIVITY_TYPE.IN &&
        timeEntry.start &&
        timeEntry.end
    );
  };
}
