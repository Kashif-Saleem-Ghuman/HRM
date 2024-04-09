export default function ({ route, store }) {
  if (route.path.startsWith('/profile')) {
    const employeeId = route.params.id
    store.dispatch('employee/setSelelectedEmployee', { employeeId })
  }
}