export default function ({ route, store }) {
  const paths = [
    "/dashboard",
    "/people",
    "/time-attendance",
    "/leaves-and-vacations",
    "/employee-directory"
  ];
  
  if (paths.some((path) => route.path.includes(path))) {
    store.dispatch("employee/setActiveEmployees");
  }
}
