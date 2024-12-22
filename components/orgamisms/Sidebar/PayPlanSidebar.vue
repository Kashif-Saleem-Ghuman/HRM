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
        <pay-plan-info-form @form-updated="updateFormData" :payMethodsList="payMethodsList" :editData="editData"></pay-plan-info-form>
        <div class="py-1">
          <pay-plan-info></pay-plan-info>
        </div>
        <div v-if="editData?.id" class="py-1">
          <logs-section></logs-section>
        </div>
        <bib-button @click="closeSidebar" label="Cancel" variant="secondary" class="footer-button mb-3" />
        <bib-button @click="saveFormData" :label="editData?.id ? 'Update' : 'Save'" variant="primary" class="footer-button mb-3" />
      </template>
    </pay-action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPayPlans, createPayPlan, updatePayPlan } from "../../../utils/functions/api_call/pay/pay-plans"; 
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
    editData: {
      type: Object,
      default: null,
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
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    validateForm() {
      const requiredFields = {
        reference: 'Reference',
        status: 'Status',
        name: 'Name',
        type: 'Type',
        location: 'Location',
        payFrequency: 'Pay Frequency',
        payMethodId: 'Pay Method',
        closeDay: 'Close Day',
        runDay: 'Run Day',
        startDate: 'Start Date'
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!this.formData?.[field] || (typeof this.formData[field] === 'string' && this.formData[field].trim() === '')) {
          this.openPopupNotification({
            text: `Please fill the ${label} field.`,
            variant: "danger",
          });
          return false;
        }
      }

      return true;
    },
    async saveFormData() {
      try {
        if (!this.validateForm()) {
          return;
        }
        console.log("save form data --- ", this.formData);
        if (!this.formData || typeof this.formData !== 'object') {
          console.warn('No valid form data to save');
          return;
        }
        
        // Create a copy of the form data to avoid mutating the original
        const dataToSave = { ...this.formData };
        
        if ('payMethodName' in dataToSave) {
          delete dataToSave.payMethodName;
        }
        if(this.editData?.id){
          console.log("update pay plan --- ", this.editData.id, dataToSave);
          await updatePayPlan(this.editData.id, dataToSave);
          this.$emit("created-pay-plan"); 
        }else{
          const res = await createPayPlan(dataToSave);
          this.$emit("created-pay-plan", res); 
        }
        this.closeSidebar();
      } catch (error) {
        console.error('Error saving form data:', error);
        // Handle error appropriately (maybe show an error message to user)
      }
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
    console.log("Data in parent::::::::: ",data)
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
