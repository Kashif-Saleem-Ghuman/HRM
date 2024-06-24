import { ACTIVITY_TYPE } from "@/utils/constant/Constant";
export function Employee(employee) {
  for (let key in employee) {
    this[key] = employee[key];
  }

  this.hasActiveTimer = () => {
    return !!this.timers?.length;
  };

  this.isPresent = () => {
    return this.hasActiveTimer() || this.hasInEntry();
  };

  this.hasInEntry = () => {
    return this.timeEntries.some(
      (timeEntry) =>
        timeEntry.activity === ACTIVITY_TYPE.IN && timeEntry.start
    );
  };
}
