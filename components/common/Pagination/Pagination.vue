<template>
      <nav aria-label="Page navigation">
              <ul class="pagination py-2 px-1">
                <li>
                  <a href="#" @click="page = 1" aria-label="First">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    v-if="page != 1"
                    @click="page--"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&lsaquo;</span>
                  </a>
                </li>
                <li
                  v-for="pageNumber in pages.slice(page - 1, page + 8)"
                  :class="{ active: page === pageNumber }"
                >
                  <a href="#" @click="page = pageNumber">{{ pageNumber }}</a>
                </li>
                <li>
                  <a
                    href="#"
                    @click="page++"
                    v-if="page < pages.length"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&rsaquo;</span>
                  </a>
                </li>
                <li>
                  <a href="#" @click="page = pages.length" aria-label="Last">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    props:{
      displayedUsers:{
        type:Array
      }
    },
    data() {
    return {
      
        // localData: [],
    }
    },
    watch: {
      localData() {
        this.setPages();
      }
  },
  async created() {
    await this.$store.dispatch("users/setUserListPayload" , { limit: 10, page: 1 })
    this.localData = this.userList;
  },
    computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
    }),
    displayedUsers() {
      return this.paginate(this.users);
    },
  },
    async mounted() {
    // await this.usersList({ limit: 10, page: 1 });
    // this.users = this.userList;
    console.log(this.localData);
    },
  };
  </script>
  