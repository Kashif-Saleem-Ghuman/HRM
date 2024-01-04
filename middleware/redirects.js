export default function ({ route, redirect }) {
  const { path } = route;
  if (path === "/") redirect("/dashboard/");
}
