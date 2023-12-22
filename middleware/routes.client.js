// import notFound from "../layouts/error.vue";
export default function routesCheck() {
  if (process.client) {
    var pagePath = this.$router.history.current.fullPath;
    if (pagePath === "/") {
          this.$router.push('/dashboard/');
        }
  
  }
}
