export default async ({ store }) => {
  const user = await store.dispatch("employee/setActiveUser");
  await store.dispatch("token/setActiveUserRole", { employee: user });
};
