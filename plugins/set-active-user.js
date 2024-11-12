export default async (context) => {

  const { store, error } = context;
  try {
    await store.dispatch("employee/setActiveUser");
  } catch (err) {
    console.error('error', err);
  }
};
