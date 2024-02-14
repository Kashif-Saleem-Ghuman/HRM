let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const MONTH_LIST = [
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
];

export const MONTHS_LABEL_VALUE = [
  { label: 'January', value: 1, selected: false },
  { label: 'February', value: 2, selected: false },
  { label: 'March', value: 3, selected: false },
  { label: 'April', value: 4, selected: false },
  { label: 'May', value: 5, selected: false },
  { label: 'June', value: 6, selected: false },
  { label: 'July', value: 7, selected: false },
  { label: 'August', value: 8, selected: false },
  { label: 'September', value: 9, selected: false },
  { label: 'October', value: 10, selected: false },
  { label: 'November', value: 11, selected: false },
  { label: 'December', value: 12, selected: false }
];
export const YEAR_LIST = [
  { label: "2020", key: "2020", selected: false },
  { label: "2021", key: "2021", selected: false },
  { label: "2022", key: "2022", selected: false },
  { label: "2023", key: "2023", selected: false },
];