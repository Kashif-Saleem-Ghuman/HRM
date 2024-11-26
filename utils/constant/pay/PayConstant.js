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
      tHeadPaySalaryEarningInfo: [
        {
          key: "",
          label: "#",
        },
        {
          key: "effective-date",
          label: "Effective date",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "augmentation",
          label: "Augmentation",
        },
        {
          key: "rate",
          label: "Rate",
        },
        {
          key: "amount",
          label: "Amount",
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
  export const PAY_SALARY_SIDBAR_TAB = [
    {
      title: "Salary summary",
      value: "Salary summary",
      route: "salary-summary-tab",
    },
    {
      title: "Earnings",
      value: "earnings",
      route: "earnings-tab",
    },
  ];
  export const PAY_DUMMY_REQUESTS = {
    requests: [
      {
        id: 574,
        employeeId: 76,
        employee: {
          id: 76,
          firstName: "Tester",
          lastName: "Account",
          photo: "",
          jobTitle: "QA Engineer",
          phone: "+1 1234567891",
          email: "testbib574@gmail.com",
          userId: "AMrlNbW621Xayg5K",
          role: "QA Engineer",
          engagementType: "Full-time",
          rateAnnual: "60,000 USD",
          rateHourly: "30 USD",
          currency: "USD",
          payPlan: "Monthly",
          paymentMethod: "Bank Transfer",
        },
        organizationId: "VqQK9b68kWReEvYn",
        managerId: null,
        start: "2024-10-23T00:00:00.000Z",
        end: "2024-10-24T00:00:00.000Z",
        status: "pending",
        type: "leave",
        note: "",
        duration: 2,
        refusalReason: null,
        approvalComment: null,
        selectedDays: {
          "2024-10-23": 1,
          "2024-10-24": 1,
        },
        statusChangeDate: null,
        isHalfDay: false,
        created_at: "2024-10-22T12:11:26.674Z",
        updated_at: "2024-10-22T12:11:26.674Z",
        isDone: false,
      },
      {
        id: 575,
        employeeId: 77,
        employee: {
          id: 77,
          firstName: "John",
          lastName: "Doe",
          photo: "",
          jobTitle: "Software Developer",
          phone: "+1 9876543210",
          email: "johndoe@gmail.com",
          userId: "BNrlNbW621Xayg5K",
          role: "Software Developer",
          engagementType: "Part-time",
          rateAnnual: "45,000 USD",
          rateHourly: "25 USD",
          currency: "USD",
          payPlan: "Weekly",
          paymentMethod: "PayPal",
        },
        organizationId: "WqQK9b68kWReEvYn",
        managerId: 45,
        start: "2024-11-01T00:00:00.000Z",
        end: "2024-11-02T00:00:00.000Z",
        status: "approved",
        type: "leave",
        note: "Medical leave",
        duration: 1,
        refusalReason: null,
        approvalComment: "Approved by manager",
        selectedDays: {
          "2024-11-01": 1,
        },
        statusChangeDate: "2024-11-01T08:00:00.000Z",
        isHalfDay: true,
        created_at: "2024-10-28T14:15:00.000Z",
        updated_at: "2024-10-28T14:15:00.000Z",
        isDone: true,
      },
      {
        id: 576,
        employeeId: 78,
        employee: {
          id: 78,
          firstName: "Jane",
          lastName: "Smith",
          photo: "",
          jobTitle: "Project Manager",
          phone: "+1 6543210987",
          email: "janesmith@gmail.com",
          userId: "CNrlNbW621Xayg5K",
          role: "Project Manager",
          engagementType: "Full-time",
          rateAnnual: "85,000 USD",
          rateHourly: "45 USD",
          currency: "USD",
          payPlan: "Bi-weekly",
          paymentMethod: "Bank Transfer",
        },
        organizationId: "XqQK9b68kWReEvYn",
        managerId: 44,
        start: "2024-12-15T00:00:00.000Z",
        end: "2024-12-20T00:00:00.000Z",
        status: "pending",
        type: "leave",
        note: "Family emergency",
        duration: 5,
        refusalReason: null,
        approvalComment: null,
        selectedDays: {
          "2024-12-15": 1,
          "2024-12-16": 1,
          "2024-12-17": 1,
          "2024-12-18": 1,
          "2024-12-19": 1,
        },
        statusChangeDate: null,
        isHalfDay: false,
        created_at: "2024-12-01T09:00:00.000Z",
        updated_at: "2024-12-01T09:00:00.000Z",
        isDone: false,
      },
      {
        id: 577,
        employeeId: 79,
        employee: {
          id: 79,
          firstName: "Alice",
          lastName: "Johnson",
          photo: "",
          jobTitle: "HR Specialist",
          phone: "+1 1230984567",
          email: "alicejohnson@gmail.com",
          userId: "DNrlNbW621Xayg5K",
          role: "HR Specialist",
          engagementType: "Contract",
          rateAnnual: "50,000 USD",
          rateHourly: "35 USD",
          currency: "USD",
          payPlan: "Monthly",
          paymentMethod: "Direct Deposit",
        },
        organizationId: "YqQK9b68kWReEvYn",
        managerId: 43,
        start: "2024-11-10T00:00:00.000Z",
        end: "2024-11-12T00:00:00.000Z",
        status: "rejected",
        type: "leave",
        note: "Personal leave",
        duration: 2,
        refusalReason: "Not enough notice",
        approvalComment: null,
        selectedDays: {
          "2024-11-10": 1,
          "2024-11-11": 1,
        },
        statusChangeDate: "2024-11-09T15:00:00.000Z",
        isHalfDay: false,
        created_at: "2024-11-05T10:30:00.000Z",
        updated_at: "2024-11-09T15:30:00.000Z",
        isDone: true,
      },
      {
        id: 578,
        employeeId: 80,
        employee: {
          id: 80,
          firstName: "Bob",
          lastName: "Brown",
          photo: "",
          jobTitle: "UI/UX Designer",
          phone: "+1 1122334455",
          email: "bobbrown@gmail.com",
          userId: "ENrlNbW621Xayg5K",
          role: "UI/UX Designer",
          engagementType: "Full-time",
          rateAnnual: "75,000 USD",
          rateHourly: "40 USD",
          currency: "USD",
          payPlan: "Monthly",
          paymentMethod: "Bank Transfer",
        },
        organizationId: "ZqQK9b68kWReEvYn",
        managerId: null,
        start: "2024-10-30T00:00:00.000Z",
        end: "2024-10-31T00:00:00.000Z",
        status: "approved",
        type: "leave",
        note: "Vacation",
        duration: 1,
        refusalReason: null,
        approvalComment: "Enjoy your leave",
        selectedDays: {
          "2024-10-30": 1,
        },
        statusChangeDate: "2024-10-28T14:00:00.000Z",
        isHalfDay: false,
        created_at: "2024-10-20T11:00:00.000Z",
        updated_at: "2024-10-28T14:00:00.000Z",
        isDone: true,
      },
    ],
  };
  export const PAY_SALARY_DUMMY_DATA = [
    {
      id: 574,
      employeeId: 76,
      effectiveDate: "2024-10-23",
      type: "leave",
      augmentation: "+1",
      rate: "60,000 USD",
      amount: "5000 USD"
    },
    {
      id: 575,
      employeeId: 77,
      effectiveDate: "2024-10-24",
      type: "bonus",
      augmentation: "+1",
      rate: "70,000 USD",
      amount: "6000 USD"
    },
    {
      id: 576,
      employeeId: 78,
      effectiveDate: "2024-10-25",
      type: "leave",
      augmentation: "+1",
      rate: "65,000 USD",
      amount: "5400 USD"
    },
    {
      id: 577,
      employeeId: 79,
      effectiveDate: "2024-10-26",
      type: "bonus",
      augmentation: "-1",
      rate: "80,000 USD",
      amount: "7000 USD"
    }
  ];
  
  