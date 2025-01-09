<template>
  <div id="pay-types">
    <loader :loading="loading"></loader>
    <div>
      <!-- Header with Action Button -->
      <div class="d-flex justify-between">
        <div class="d-flex">
          <action-button-header
            :primaryButton="{
              label: 'Pay Type',
              icon: 'add',
              variant: 'primary',
              onClick: addPayTypes,
            }"
          />

          <action-button-header
            v-if="isShowMultiSelectButtons"
            :primaryButton="{
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              onClick: confirmDeleteSelectedItems,
            }"
          />
        </div>
        <div class="d-flex">
          <!-- Filter Buttons -->
          <filter-button
            v-if="requestListData?.length > 0"
            :primaryButton="{
              filterLabel: 'Sort by',
              label: 'Date created',
              onClick: handleSortBy,
            }"
          />
        </div>
      </div>

      <!-- List Pay Plans -->
      <div>
        <list-pay-type
          v-if="requestListData?.length > 0"
          :payTypeList="requestListData"
          :checkedAll="allChecked"
          ref="list-pay-type"
          @action-selected="handleActionFromListing"
          @selectAllItems="updateAllItems"
          @itemChecked="handleItemChecked"
        />
        <NoRecord v-else-if="requestListData?.length == 0 && !loading" />
        <!-- Pay Methods Modal -->
        <pay-method-modal
          v-if="isAddPayTypeModalVisible"
          :payMethodsModal="isAddPayTypeModalVisible"
          modalTitle="Pay Types"
          @close="closePayTypeModal"
        >
          <div class="d-flex">
            <bib-input
              type="text"
              name="payTypeName"
              placeholder="Salary, Commission, Overtime, Expense, etc..."
              label="Pay type name"
              required
              :variant="isLightThemeCheck ? 'light' : 'dark'"
              style="width: 100%"
              v-model.trim="payTypeName"
            />
          </div>
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              @click="closePayTypeModal"
              class="footer-button"
            ></bib-button>
            <bib-button
              :label="payTypeId ? 'Update' : 'Add'"
              variant="primary-24"
              class="ml-auto footer-button"
              :disabled="!payTypeName"
              @click="selectAction"
            ></bib-button>
          </template>
        </pay-method-modal>

        <!-- Delete Modal -->
        <confirmation-modal
          v-if="isOpenDeleteModal"
          title="Delete Confirmation"
          confirmationMessage="Are you sure you want to delete the selected pay type(s)?"
          :confirmastionMessageModal="true"
          :loader="false"
          @close="closePayTypeModal"
          @on-click="confirmDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  createPayType,
  deletePayType,
  getPayTypes,
  updatePayType,
} from "../../utils/functions/api_call/pay/pay-types";

export default {
  data() {
    return {
      id: null,
      requestListData: [],
      loading: true,
      isAddPayTypeModalVisible: false,
      payTypeName: "",
      payTypeId: null,
      selectedAction: null,
      isOpenDeleteModal: false,
      allChecked: false,
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
    showTable() {
      return !this.loading && this.requestListData?.length;
    },
    showNoData() {
      return (
        !this.loading && (!this.requestListData || !this.requestListData.length)
      );
    },

    isShowMultiSelectButtons() {
      const selectedItems = this.requestListData.filter((item) => item.checked);

      return selectedItems.length;
    },
  },
  mounted() {
    this.getPayTypes();
  },
  methods: {
    addPayTypes() {
      this.isAddPayTypeModalVisible = !this.isAddPayTypeModalVisible;
    },
    handleSortBy() {
      this.$refs["list-pay-type"].sortColumn("created-on");
    },
    closePayTypeModal() {
      this.payTypeName = "";
      this.selectedAction = null;
      this.payTypeId = null;
      this.isOpenDeleteModal = false;
      this.isAddPayTypeModalVisible = false;
    },

    async getPayTypes() {
      try {
        this.loading = true;
        this.requestListData = await getPayTypes();
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error) {
      console.error("Error fetching pay types:", error);
      let message = "Something went wrong";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
      this.$openPopupNotification({
        text: message,
        variant: "danger",
      });
    },

    selectAction() {
      if (this.selectedAction) {
        this.updatePayType();
      } else {
        this.createNewPayType();
      }
    },

    async createNewPayType() {
      try {
        await createPayType({
          name: this.payTypeName,
        });
        this.getPayTypes();
        this.payTypeName = "";
        this.isAddPayTypeModalVisible = false;
        this.$openPopupNotification({
          text: "Pay type added successfully",
          variant: "primary-24",
        });
      } catch (error) {
        this.handleError(error);
      }
    },

    handleActionFromListing({ action, data }) {
      this.payTypeId = data.id;
      this.selectedAction = action;
      if (action === "edit") {
        this.payTypeName = data.name;
        this.isAddPayTypeModalVisible = true;
      } else if (action === "delete") {
        this.isOpenDeleteModal = true;
      }
    },

    async updatePayType() {
      try {
        await updatePayType(this.payTypeId, {
          name: this.payTypeName,
        });
        this.getPayTypes();
        this.closePayTypeModal();
      } catch (error) {
        this.handleError(error);
      }
    },

    confirmDelete() {
      if (this.payTypeId) {
        this.deletePayType();
      } else {
        this.deletedSelectedItems();
      }
    },

    async deletePayType() {
      try {
        await deletePayType(this.payTypeId);
        this.requestListData = this.requestListData.filter(
          (item) => item.id !== this.payTypeId
        );
        this.$openPopupNotification({
          text: "Pay type deleted successfully",
          variant: "primary-24",
        });
        this.closePayTypeModal();
      } catch (error) {
        this.handleError(error);
      }
    },

    updateAllItems() {
      this.allChecked = !this.allChecked;

      this.requestListData = this.requestListData.map((item) => ({
        ...item,
        checked: this.allChecked,
      }));
    },

    confirmDeleteSelectedItems() {
      this.isOpenDeleteModal = true;
    },

    handleItemChecked({ id }) {
      const requestIndex = this.requestListData.findIndex(
        (item) => item.id === id
      );
      if (requestIndex === -1) {
        console.error(`Request with id ${id} not found`);
        return;
      }
      this.$set(this.requestListData, requestIndex, {
        ...this.requestListData[requestIndex],
        checked: !this.requestListData[requestIndex].checked,
      });

      this.allChecked = this.requestListData.every((item) => item.checked);
    },

    deletedSelectedItems() {
      console.log("delete selected items ====>");
      this.closePayTypeModal();
    },
  },
};
</script>
