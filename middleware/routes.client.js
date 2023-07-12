import notFound from "../layouts/error.vue";
export default function routesCheck() {
  if (process.client) {
    var userRole = localStorage.getItem("userRole");
    var pathPath = this.$router.history.current.fullPath;
    // Admin Role Routes
    // this.$router.push('/dashboard/');
    // if (userRole === "ADMIN") {
    //   if (pathPath === "/") {
    //     this.$router.push('/dashboard/');
    //   }
    //   if (pathPath === "/myprofile") {
    //     this.$router.push('/notFound');
    //   }
    //   // if (pathPath === "/dashboard") {
    //   //   this.$router.push(notFound);
    //   //   console.log(pagePath, "page path");
    //   // }
    // } 
    // // Super Admin based Routes Check
    // else if(userRole=='USER'){
    //   if (pathPath === "/myprofile") {
    //     this.$router.push(notFound);
    //   }
    // }
    // // User Role Routes
    // else if (userRole === "USER") {
    //   if (pathPath === "/myprofile") {
    //     this.$router.push(notFound);
    //   }
    // }
  }
}
