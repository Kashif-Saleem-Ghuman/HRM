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
  export const buttonVariant = {
    "approved": {
      label: "Approved",
      key: "approved",
      variant:'success',
      icon:"check-circle-solid", 
      scale:'1'     
    },
    "pending": {
      label: "Pending",
      key: "pending",
      variant:'warning',
      icon:"eye-open",
      scale:'1'  
    },
    "rejected": {
      label: "Rejected",
      key: "rejected",
      variant:'danger',
      icon:"close",
      scale:'1'  
    },

  }
