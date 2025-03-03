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

  test("parse timesheets data for hours per day", () => {
    const start = DateTime.now().toISO();
    const end = DateTime.fromISO(start).plus({ hours: 8 }).toISO();

    const timesheetsApiResponse = [
      {
        firstName: "John",
        lastName: "Doe",
        photo: "",
        jobTitle: null,
        active: false,
        timesheets: [
          {
            id: 10,
            start: DateTime.now().startOf("week").toISO(),
            end: DateTime.now().endOf("week").toISO(),
            status: "not_submitted",
            timeEntries: [
              {
                id: 273,
                start: start,
                end: end,
                total: 8,
                activity: "in",
              },
            ],
          },
        ],
      },
    ];

    const timesheet = timesheetsApiResponse[0].timesheets[0];
    const timesheetParser = new TimesheetParser(timesheet);
    const parsed = timesheetParser.parse("hours");
    const { dailyTimeEntries } = parsed;
    expect(dailyTimeEntries).toBeDefined();
    expect(
      dailyTimeEntries[DateTime.fromISO(start).toFormat("yyyy-MM-dd")]
        .totalHours
    ).toEqual(8);
    expect(parsed.total).toEqual(8);
  });
});



const result = {

  // the data of the timesheet passed to parser
  id: 10,
  start: "2023-09-04T00:00:00.000-04:00",
  end: "2023-09-10T23:59:59.999-04:00",
  status: "not_submitted",
  timeEntries: [
    {
      id: 273,
      start: "2023-09-07T11:15:36.675-04:00",
      end: "2023-09-07T19:15:36.675-04:00",
      total: 8,
      activity: "in",
    },
  ],

// New field added by the parser
  dailyTimeEntries: {
    "2023-09-07": {
      timeEntries: [
        {
          id: 273,
          start: "2023-09-07T11:15:36.675-04:00",
          end: "2023-09-07T19:15:36.675-04:00",
          total: 8,
          activity: "in",
        },
      ],
      totalHours: 8,
    },
  },
  total: 8,
}
