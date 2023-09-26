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
   
  };
  