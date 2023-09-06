import DayTimesheetParser from "./day-timesheet-parse";
import MonthTimesheetParser from "./month-timesheet-parser";
import WeekTimesheetParser from "./week-timesheet-parser";

const parserMap = {
  day: DayTimesheetParser,
  week: WeekTimesheetParser,
  month: MonthTimesheetParser,
};

export class TimesheetParser {
  constructor(timesheets = []) {
    this.timesheets = timesheets;
  }

  parse(view) {
    const parser = parserMap[view];
    if (!parser) throw new Error(`Invalid view type: ${view}`);

    const parserInstance = new parser(this.timesheets);
    return parserInstance.parse();
  }
}
