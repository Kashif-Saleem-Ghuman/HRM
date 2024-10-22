export default async (context) => {

  const { store, error } = context;
  try {
    const user = await store.dispatch("employee/setActiveUser");
    await store.dispatch("token/setActiveUserRole", { employee: user });
  } catch (err) {
    console.error('error', err);
  }
};
