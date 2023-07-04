let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// let endStr = new Date('22/11/2021').toISOString().replace(/T.*$/, '')
// console.log(todayStr)

export const SAMPLE_EVENTS = [
  {
    id: createEventId(),
    title: 'Demo Event 123',
    dueDate: 'Nov 30, 2021',
    completed: false,
    start: '2023-06-29',
    photo:"https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1678188456408.jpg",
    firstName:"Rajeev",
    lastName:"Sharma",
    type:"Vacation"
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: 'Demo Event 123',
    dueDate: 'Nov 30, 2021',
    completed: false,
    start: '2023-07-07',
    photo:"https://placekitten.com/300/300",
    firstName:"Charan",
    lastName:"Chauhan",
    type:"On Leave"
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: 'Demo Event 123',
    dueDate: 'Nov 30, 2021',
    completed: false,
    start: '2023-07-04',
    photo:"https://placekitten.com/300/300",
    firstName:"Dhuru",
    lastName:"Sharma",
    type:"Holiday"
    // end: '2021-11-22'
  },
  {
    id: createEventId(),
    title: 'Demo Timed 12',
    dueDate: 'Nov 30, 2021',
    completed: true,
    start: '2023-07-19', //  + 'T12:00:00',
    photo:"https://placekitten.com/300/300",
    firstName:"Kelvin",
    lastName:"Pal",
    type:"Absent"
  },
  {
    id: createEventId(),
    title: 'Demo Timed c',
    dueDate: 'Nov 30, 2021',
    completed: true,
    start: '2023-07-09', //  + 'T12:00:00'
    photo:"https://placekitten.com/300/300",
    firstName:"Kelvin",
    lastName:"Pal",
    type:"Absent"
  },
  {
    id: createEventId(),
    title: 'Demo Timed d',
    dueDate: 'Nov 30, 2021',
    completed: true,
    photo:"https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1678188456408.jpg",
    firstName:"Charan",
    lastName:"Chauhan",
    type:"On Leave",
    start: '2023-07-11' //  + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}