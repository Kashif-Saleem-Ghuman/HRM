export const WIDGETS = [
    {
      key: "employees_present_count",
      title: "Present",
      actionKey: "isPresent",
      actionValue: true,
    },
    {
      key: "birthday_employees_count",
      title: "Birthdays",
      actionKey: "isBirthday",
      actionValue: true,
    },
    {
      key: "anniversary_employees_count",
      title: "Anniversaries",
      actionKey: "isWorkAnniversary",
      actionValue: true,
    },
    {
      key: "employees_absent_count",
      title: "Absent",
      actionKey: "isPresent",
      actionValue: false,
    },
    {
      key: "employees_on_leave_count",
      title: "On Leave",
      actionKey: "isOnLeave",
      actionValue: true,
    },
    {
      key: "pending_timesheets_count",
      title: "Pending timesheets",
      actionKey: "currentLeaveType",
      actionValue: 'pending_timesheets',
    },
    {
      key: "pending_requests_count",
      title: "Requests",
      actionKey: "currentLeaveType",
      actionValue: 'pending_requests',
    },
  ];
