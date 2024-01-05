export default function ({ route, redirect }) {
  const { path } = route;
  const userRole = localStorage.getItem("userRole")
  console.log(userRole, "changeDashboardchangeDashboard")
  if(userRole === 'ADMIN'){
  if (path === "/") redirect("/dashboard/");
}else{
  if (path === "/") redirect("/time-attendance/attendance/");
}
}
