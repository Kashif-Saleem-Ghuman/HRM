export const TABLE_HEAD = {
    tHeadPaySalaries: [
        {
          key: "",
          label: "#",
        },
        {
          key: "name",
          label: "Employee Name",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "employee-name-sort",
            isActive: false,
            sortKey: "employee.firstName",
            type: "string",
          },
        },
        {
          key: "role",
          label: "Role",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "employee-role-sort",
            isActive: false,
            sortKey: "role",
            type: "string",
          },
        },
        {
          key: "engagement-type",
          label: "Engagement Type",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "engagement-type-sort",
            isActive: false,
            sortKey: "engagement-type",
            type: "string",
          },
        },
        {
          key: "rate-annual",
          label: "Rate (Annual)",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "rate-annual-sort",
            isActive: false,
            sortKey: "rate-annual",
            type: "string",
          },
        },
        {
          key: "rate-hourly",
          label: "Rate (hourly)",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "rate-hourly-sort",
            isActive: false,
            sortKey: "rate-hourly",
            type: "number",
          },
        },
        {
          key: "currency",
          label: "Currency",
 
          header_icon: {
            icon: "long-arrow-up",
            event: "currency-sort",
            isActive: false,
            sortKey: "currency",
            type: "string",
          },
        },
        {
            key: "pay-plan",
            label: "Pay Plan",
   
            header_icon: {
              icon: "long-arrow-up",
              event: "pay-plan",
              isActive: false,
              sortKey: "pay-plan",
              type: "string",
            },
          },
          {
            key: "payment-method",
            label: "payment-method",
   
            header_icon: {
              icon: "long-arrow-up",
              event: "payment-method",
              isActive: false,
              sortKey: "payment-method",
              type: "string",
            },
          },
        {
          key: "action",
          label: "Action",
        },
      ],
      
  };
  export const PAY_TAB = [
    {
      title: "Salaries",
      value: "Salaries",
      route: "/pay/salaries/",
    },
    {
      title: "Payouts",
      value: "Payouts",
      route: "/pay/payouts/",
    },
    {
      title: "Pay Plans",
      value: "Pay Plans",
      route: "/pay/pay-plans/",
    },
    {
      title: "Pay Methods",
      value: "Pay Methods",
      route: "/pay/pay-methods/",
    },
    {
      title: "Pay Types",
      value: "Pay Types",
      route: "/pay/pay-types/",
    },
  ];