<template>
  <div class="my-profile-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper px-025 bottom_border_wrapper"
    >
      <section-header-left
        :title="
          form.firstName || form.lastName != undefined
            ? form.firstName + ' ' + form.lastName
            : '---'
        "
        :avatar="form.photo"
        :key="topNav"
      ></section-header-left>
    </div>
    <div class="section-wrapper custom-input">
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              v-if="activeTab"
              :tabs="personalTabItem"
              :value="activeTab"
              @change="onTabChange"
            ></bib-tabs>
          </div>
        </div>
      </div>
      <div class="main-wrapper">
        <NuxtChild />
      </div>
    </div>
    <!-- <loader v-bind:showloader="loading"></loader> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { USER_PROFILE_TAB } from "../../../../utils/constant/Constant.js";

export default {
  data() {
    return {
      personalTabItem: USER_PROFILE_TAB,
      activeTab: null,
      form: {},
      id: "",
      topNav:0,
      name:{},
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.$store.dispatch("token/setActiveTab", "Employee Profile");
    await this.$store.dispatch("employee/setUser", this.id).then((result)=>{
      this.form = result;
    this.name = result
    });
    this.setActiveTab();
    this.$root.$on("top-nav-key", () => {
       this.$store.dispatch("employee/setUser", this.id).then((result)=>{
        console.log(result, "setUsersetUsersetUsersetUser")
        this.name = this.getUser
        this.form = this.getUser;
       });
      this.topNav += 1;
      console.log("this.topNav", this.name)

    });
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
    }),

  },
  methods: {
    onTabChange(tab) {
      this.$router.push(tab.route);
    },
    setActiveTab() {
      const route = this.$route.fullPath;
      const activeTab = USER_PROFILE_TAB.find((tab) =>
        route.includes(tab.route)
      );
      this.activeTab = activeTab?.value ?? USER_PROFILE_TAB[0]?.value
    },
  },
};
</script>
<style lang="scss">
.scroll-wrapper {
  height: 70vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.section-wrapper {
  width: 100%;

  .section-left {
    width: 50%;
    height: 100%;
  }

  .section-mid {
    border-left: 1px solid #f2f2f5;
  }

  .section-right {
    width: 50%;
  }
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  select {
    margin-bottom: 12px !important;
    border-radius: 4px;
    padding: 8px;
  }
}
.dropdown span {
  display: inline-block;
  width: 80px;
}
.border-wrapper {
  border: solid 1px $light;
  border-radius: 5px;
  padding: 0px 10px 0rem 10px !important;
  margin-bottom: 16px;
}
.time-attendance-wrapper {
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid #f2f2f5;
      border-radius: 0.2rem;
      background-color: #f2f2f5;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: #fff;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: #fff;
    width: 97px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: 0px;
    top: 0px;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 0;
      }
    }
  }
}
.button-custom-wrapper {
  .button {
    text-align: center;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      justify-content: center;
    }
    div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
