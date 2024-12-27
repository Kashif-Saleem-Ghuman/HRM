
<template>
  <div>
    <custom-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      :allChecked="checkedAll"
      @column-header-clicked="headerColumnClick($event.column)"
      @item-clicked="handleRowClick"
      >
      <template #cell(id)="data">
        <div class="justify-between">
          <span>{{ data.value.id }}</span>
        </div>
      </template>
      <template #cell(location)="data">
        <div class="justify-between">
          <span>{{ data.value.location }}</span>
        </div>
      </template>
      <template #cell(payFrequency)="data">
        <div class="justify-between">
          <span>{{ data.value.payFrequency }}</span>
        </div>
      </template>
      <template #cell(payMethod)="data">
        <div class="justify-between">
          <span>{{ data.value.payMethod?.name }}</span>
        </div>
      </template>
      <template #cell(closeDay)="data">
        <div class="justify-between">
          <span>{{ data.value.closeDay }} </span>
        </div>
      </template>
      <template #cell(runDay)="data">
        <div class="justify-between">
          <span>
            {{ data.value.runDay }}
          </span>
        </div>
      </template>

      <template #cell(status)="data">
        <div>
          <select
            v-model="data.value.status"
            @change="updateStatus(data.value.id, data.value)"
            @click.stop
            class="select-field status-chip cursor-pointer"
            :class="getStatusClasses(data.value.status)"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </template>
      <template #cell(action)="data">
      <bib-button class="button-pop" pop="horizontal-dots" :variant="isLightThemeCheck ? 'light' : 'secondary'">
          <template v-slot:menu>
              <div class="list">
                  <span @click.stop="handleEditClick(data.value.id)" class="list__item">Edit</span>
                  <span @click.stop="handleDelete('delete', data.value.id)" class="list__item">Delete</span>
              </div>
          </template>
      </bib-button>
    </template>
  </custom-table>
    <confirmation-modal
      v-if="isDeleteModalVisible"
      title="Delete Confirmation"
      confirmationMessage="Are you sure you want to delete this item?"
      :confirmastionMessageModal="true"
      :loader="false"
      @close="closeConfirmationModal"
      @on-click="deleteSpecificEntry"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../../../utils/constant/pay/PayConstant";
import { sortColumn } from "../../../../utils/functions/table-sort";
import { deletePayPlan, updatePayPlan } from "../../../../utils/functions/api_call/pay/pay-plans";
import {
  meetLink,
  sendMessage,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import {
  getTimeFromDate,
  formatIsoDateToYYYYMMDD,
} from "../../../../utils/functions/dates";
export default {
  props: {
    payPlansList: {
      type: [Array, Object],
      default: "",
    },

    checked: {
      type: Boolean,
    },
    checkedAll: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadPayPlans,
      sortByField: null,
      isDeleteModalVisible: false,
      selectedDeleteId: null,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
  },
  beforeDestroy() {
    this.$resetTableFieldsHeaderIcon(this.tableFields);
  },
  computed: {
    leavePendingList() {
      if (!this.sortByField) return this.payPlansList;
      console.log(">>>>>>>>")
      return sortColumn({ items: this.payPlansList, field: this.sortByField });
    },
    truncateText() {
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
        return 40;
      } else {
        return 25;
      }
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },

  methods: {
    meetLink,
    sendMessage,
    makeCall,
    getTimeFromDate,
    formatIsoDateToYYYYMMDD,
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField?.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field?.header_icon?.isActive;
      this.sortByField = field;
    },
    headerColumnClick(column) {
      if(column != "action"){
        this.sortColumn(column);
      }
    },
    getStatusClasses(status) {
      if (status == "inactive") {
        return "bg-danger";
      } else if (status == "active") {
        return "bg-success ";
      } else {
        return "bg-secondary";
      }
    },
    handleRowClick(event, keyI, item) {
      const rowData = this.leavePendingList[keyI];
      this.$emit("row-clicked", rowData);
    },
    handleEditClick(id) {
      const rowData = this.leavePendingList.find(item => item.id === id);
      this.$emit("row-clicked", rowData);
    },
    handleDelete(action, id) {
      console.log("del", id, action);
      if (action === "delete") {
        this.selectedDeleteId = id; // Store the ID of the item to delete
        this.isDeleteModalVisible = true; // Show confirmation modal
      }
    },
    async deleteSpecificEntry() {
      try {
        // Call the delete API
        const res = await deletePayPlan(this.selectedDeleteId);

        // Remove the deleted item from the list
        this.payPlansList = this.payPlansList.filter(
          (item) => item.id !== this.selectedDeleteId
        );

        // Show a success message (if needed)
        this.$toast.success("Item successfully deleted!");
      } catch (error) {
        console.error("Error deleting item:", error);
        this.$toast.error("An error occurred while deleting the item");
      } finally {
        // Reset modal visibility and selected ID
        this.isDeleteModalVisible = false;
        this.selectedDeleteId = null;
      }
    },
    closeConfirmationModal() {
      this.isDeleteModalVisible = false;
      this.selectedDeleteId = null;
    },
    async updateStatus(id, data) {
      let addForm = {
        reference: 'reference',
        status: data.status,
        name: data.payMethod.name,
        type: data.type,
        location: data.location,
        payFrequency: data.payFrequency,
        payMethodId: data.payMethod.id,
        payMethodName: data.payMethod.name,
        closeDay: data.closeDay,
        runDay: data.runDay,
        startDate: data.startDate,
        description: data.description,
        orgDefault: data.orgDefault,
      };
      try {
        await updatePayPlan(id, addForm);
        this.$toast.success("Status updated successfully");
      } catch (error) {
        this.$toast.error("An error occurred while updating status");
      }
    },
  },
};
</script>

<style lang="scss">
.select-field{
  color: white !important;
  border: none !important;
}
.info_wrapper {
  color: $black;
  font-weight: normal;
}

.title-user {
  font-size: 14px;
  font-weight: 600;
  color: $dark;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $dark;
}

.status-chip {
  padding: 2px;
  border-radius: 16px;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
  text-transform: capitalize;
}

.dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
}
.dropdown-menu {
  display: none;
  border-radius: 4px;
  position: absolute;
  min-width: 160px;
  z-index: 100 !important;
  overflow: hidden;
  right: -30px;
  left: -70px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu span {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  transition: background-color 0.3s;
}

.dropdown-menu span:hover {
  cursor: pointer;
  width: 100% !important;
  background-color: #bebebe;
}

.table tr td{
  color: #f4f4f4 !important;
}

.table tr tr{
  color: #8d8d8f !important;
}
</style>