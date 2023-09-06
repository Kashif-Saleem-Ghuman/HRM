import { TimesheetParser } from "../utils/timesheet-parsers/timesheet-parser";
import { DateTime } from "luxon";
describe("Timesheet Parsers", () => {
  test("parse data for employee with daily time entries", () => {
    const start = DateTime.now().toISO();
    const end = DateTime.fromISO(start).plus({ hours: 8 }).toISO();
    const startBreak = DateTime.now().plus({ hours: 2 }).toISO();
    const endBreak = DateTime.fromISO(startBreak).plus({ hours: 1 }).toISO();
    const employeeWithTimeEntries = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      jobTitle: null,
      photo: "",
      email: "john.doe@biztree.com",
      phone: "",
      active: false,
      timeEntries: [
        {
          id: 273,
          start,
          end,
          total: 8,
          activity: "in",
        },
        {
          id: 274,
          start: startBreak,
          end: endBreak,
          total: 1,
          activity: "break",
        },
      ],
      timers: [],
    };
    const timesheetParser = new TimesheetParser(employeeWithTimeEntries);
    const parsed = timesheetParser.parse("day");
    expect(parsed.activityReport).toBeDefined();
    expect(parsed.activityReport.break).toEqual(1 * 60);
    expect(parsed.activityReport.in).toBe(
      DateTime.fromISO(start).toFormat("HH:mm")
    );
    expect(parsed.activityReport.out).toBe(
      DateTime.fromISO(end).toFormat("HH:mm")
    );
    expect(parsed.activityReport.total).toBe(8 * 60);
  });

  test("parse data for employee with active timer", () => {
    const start = DateTime.now().toISO();
    const mockDate = DateTime.fromISO(start).plus({ hours: 1 }).toMillis();
    const dateNowSpy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => mockDate);

    const employeeWithActiveTimer = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      jobTitle: null,
      photo: "",
      email: "john.doe@biztree.com",
      phone: "",
      active: false,
      timeEntries: [],
      timers: [
        {
          id: "1",
          start: start,
          end: null,
          type: "in",
        },
      ],
    };

    const timesheetParser = new TimesheetParser(employeeWithActiveTimer);
    const parsed = timesheetParser.parse("day");
    expect(parsed.activityReport).toBeDefined();
    expect(parsed.activityReport.break).toEqual(null);
    expect(parsed.activityReport.in).toBe(
      DateTime.fromISO(start).toFormat("HH:mm")
    );
    expect(parsed.activityReport.out).toBe(null);
    expect(parsed.activityReport.total).toBe(60);

    dateNowSpy.mockRestore();
  });
});
