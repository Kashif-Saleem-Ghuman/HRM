import { USER_ROLES } from "../utils/constant/Constant.js";

export default function ({ route, redirect }) {
  const { path } = route;
if(USER_ROLES.USER){
  if (path === "/") redirect("/time-attendance/attendance/");
}else{
  if (path === "/") redirect("/dashboard");
}
}
