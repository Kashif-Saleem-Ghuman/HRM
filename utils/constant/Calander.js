let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
// let endStr = new Date('22/11/2021').toISOString().replace(/T.*$/, '')
// console.log(todayStr)

export const SAMPLE_EVENTS = [
  {
    id: createEventId(),
    title: "Demo Event 123",
    dueDate: "Nov 30, 2021",
    completed: false,
    start: "2023-06-29",
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1678188456408.jpg",
    firstName: "Rajeev",
    lastName: "Sharma",
    type: "Vacation",
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: "Demo Event 123",
    dueDate: "Nov 30, 2021",
    completed: false,
    start: "2023-07-07",
    photo: "https://placekitten.com/300/300",
    firstName: "Charan",
    lastName: "Chauhan",
    type: "On Leave",
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: "Demo Event 123",
    dueDate: "Nov 30, 2021",
    completed: false,
    start: "2023-07-04",
    photo: "https://placekitten.com/300/300",
    firstName: "Dhuru",
    lastName: "Sharma",
    type: "Holiday",
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: "Demo Timed 12",
    dueDate: "Nov 30, 2021",
    completed: true,
    start: "2023-07-19", //  + 'T12:00:00',
    photo: "https://placekitten.com/300/300",
    firstName: "Kelvin",
    lastName: "Pal",
    type: "Absent",
  },
  {
    id: createEventId(),
    title: "Demo Timed c",
    dueDate: "Nov 30, 2021",
    completed: true,
    start: "2023-07-09", //  + 'T12:00:00'
    photo: "https://placekitten.com/300/300",
    firstName: "Kelvin",
    lastName: "Pal",
    type: "Absent",
  },
  {
    id: createEventId(),
    title: "Demo Timed d",
    dueDate: "Nov 30, 2021",
    completed: true,
    photo:
      "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1678188456408.jpg",
    firstName: "Charan",
    lastName: "Chauhan",
    type: "On Leave",
    start: "2023-07-11", //  + 'T12:00:00'
  },
];

export function createEventId() {
  return String(eventGuid++);
}
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
export const YEAR_LIST = [
  { label: "2020", key: "2020", selected: false },
  { label: "2021", key: "2021", selected: false },
  { label: "2022", key: "2022", selected: false },
  { label: "2023", key: "2023", selected: false },
];

