export const DropdownMenu = {
    tableListView: [
      {
        label: "Today",
        key: "today",
        class:'drop-item-wrapper__bgsucess',
      },
      {
        label: "Week",
        key: "week",
        class:'drop-item-wrapper__bgabsent'
      },
      {
        label: "Month",
        key: "month",
        class:'drop-item-wrapper__bgabsentpink'
      },
      {
        label: "Year",
        key: "year",
        class:'drop-item-wrapper__bgsucess'
      },
    ],
    dropButtonChip: [
        {
          label: "Approved",
          key: "approve",
          variant:'success',
          icon:"check-circle-solid"
        },
        {
          label: "Pending",
          key: "pending",
          variant:'warning',
          icon:"eye-open"
        },
        {
          label: "Reject",
          key: "reject",
          variant:'danger',
          icon:"close"
        },
      ],
      calendarViewType: [
        {
          label: "Week",
          key: "week",
        },
        {
          label: "Month",
          key: "month",
        },
      ],
      monthList : [
        { label: "Jan", key: "01", selected: false },
        { label: "Feb", key: "02", selected: false },
        { label: "March", key: "03", selected: false },
        { label: "April", key: "04", selected: false },
        { label: "May", key: "05", selected: false },
        { label: "June", key: "06", selected: false },
        { label: "July", key: "07", selected: false },
        { label: "Aug", key: "08", selected: false },
        { label: "Sep", key: "09", selected: false },
        { label: "Oct", key: "10", selected: false },
        { label: "Nov", key: "11", selected: false },
        { label: "Dec", key: "12", selected: false },
      ],
      yearList : [
        { label: "2020", key: "2020", selected: false },
        { label: "2021", key: "2021", selected: false },
        { label: "2022", key: "2022", selected: false },
        { label: "2023", key: "2023", selected: false },
      ]
  };
  