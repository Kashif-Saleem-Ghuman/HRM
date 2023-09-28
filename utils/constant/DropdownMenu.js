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
          icon:"check-circle-solid",
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
      
     
  };
  
  export const viewType = {
    sectionLabel: "sectionLabel",
    "today": {
      label: "Today",
      key: "today",
      class:'drop-item-wrapper__bgsucess',
    },
    "week": {
      label: "Week",
      key: "week",
      class:'drop-item-wrapper__bgabsent'
    },
    "month": {
      label: "Month",
      key: "month",
      class:'drop-item-wrapper__bgabsentpink'
    },
    "year": {
      label: "Year",
      key: "year",
      class:'drop-item-wrapper__bgsucess'
    },

  }
  export const dropButtonChip = {
    "approved": {
      label: "Approved",
      key: "approved",
      variant:'success',
      icon:"check-circle-solid",      
    },
    "pending": {
      label: "Pending",
      key: "pending",
      variant:'warning',
      icon:"eye-open"
    },
    "rejected": {
      label: "Rejected",
      key: "rejected",
      variant:'danger',
      icon:"close"
    },

  }