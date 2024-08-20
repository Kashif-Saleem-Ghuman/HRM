import {ACTIVITY_TYPE, TIME_ENTRY_SOURCE} from "@/utils/constant/Constant";
export function TimeEntry(time_entry) {
  for (let key in time_entry) {
    this[key] = time_entry[key];
  }

  this.getStart = () => {
    return this.start;
  }

  this.getEnd = () => {
    return this.end ?? new Date()
  }

  this.isActivityIn = () => {
    return this.activity === ACTIVITY_TYPE.IN
  }
  this.isActivityBreak = () => {
    return this.activity === ACTIVITY_TYPE.BREAK;
  }

  this.isSourceTimer = () => {
    return this.source === TIME_ENTRY_SOURCE.SOURCE_TIMER;
  }

  this.isSourceManual = () => {
    return this.source == TIME_ENTRY_SOURCE.SOURCE_MANUAL;
  }

}
