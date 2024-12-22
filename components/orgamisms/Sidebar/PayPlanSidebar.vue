<template>
  <div>
    <pay-action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      classMain="heightEdit"
      heading="Pay plan name - ID"
      icon="help-circle-solid"
      v-show="openSidebar"
      @closeSidebar="closeSidebar"
      @flagClicked="handleFlag"
      @bookmarkClicked="handleBookmark"
      @expandClicked="handleExpand"
      @elipsisClicked="handleElipsis"
    >
      <template v-slot:sidebar-body>
        <pay-plan-info-form @form-updated="updateFormData" :payMethodsList="payMethodsList" ></pay-plan-info-form>
        <div class="py-1">
          <pay-plan-info></pay-plan-info>
        </div>
        <div class="py-1">
          <logs-section></logs-section>
        </div>
        <bib-button @click="closeSidebar" label="Cancel" variant="secondary" class="footer-button mb-3" />
        <bib-button @click="saveFormData" label="Save" variant="primary" class="footer-button mb-3" />
      </template>
    </pay-action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPayPlans, createPayPlan } from "../../../utils/functions/api_call/pay/pay-plans"; 
const OPEN_SIDEBAR_EVENT = "open-sidebar-pay-paln";
const CLOSE_SIDEBAR_EVENT = "close-sidebar-pay-plan";
export default {
  props: {
    leaveData: {
      type: [Array, String],
      default: "",
    },
    payMethodsList:{
      type: [Array, Object],
      default: "",
      },
  },
  data() {
    return {
      loading: false,
      openSidebar: false,
      slideClass: "slide-in",
      isVisible: false,
      options: null,
      optionsDummy: [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
        { value: "opt3", label: "Option 3" },
      ],
      
    };
  },
  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
    }),
  },
  created() {
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.options = [{ label: "", value: "" }, ...reportTo];
    });
    this.registerRootListeners();
  },
  mounted() {
    this.registerRootListeners();
    console.log("Pay amm --- ", this.payMethodsList)
  },
  methods: {
    
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    },
    async saveFormData() {
      delete this.formData.payMethodName;
     const res=  await createPayPlan(this.formData);
     this.$emit("created-pay-plan", res); 
     this.closeSidebar();
    },
    editSalary() {
      console.log("Edit salary clicked");
    },
    handleFlag() {
      return true;
    },
    handleBookmark() {
      alert("Bookmark");
      return true;
    },
    handleElipsis() {
      return true;
    },
    handleExpand() {
      this.isVisible = !this.isVisible;
    },
    async payDetail() {
      this.slideClass = "slide-in";
      this.openSidebar = true;
    },
    registerCloseSideBarRootListener() {
      this.$root.$on(CLOSE_SIDEBAR_EVENT, () => {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.openSidebar = false;
          this.isVisible = true;
        }, 700);
      });
    },
    unregisterCloseSideBarRootListener() {
      this.$root.$off(CLOSE_SIDEBAR_EVENT);
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SIDEBAR_EVENT, (item) => {
        event.stopPropagation();
        this.$hideUserMenu();
        this.payDetail(item);
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SIDEBAR_EVENT);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener();
      this.registerCloseSideBarRootListener();
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener();
      this.unregisterOpenSideBarRootListener();
    },
    updateFormData(data) {
    console.log("Data in parent ",data)
      this.formData = data; // Update the form data in the parent
    },
  },
  handleClickOutside() {
    this.$nuxt.$emit("close-sidebar");
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },

   

};
</script>
