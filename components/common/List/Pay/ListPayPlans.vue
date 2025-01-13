<template>
  <div>
    <custom-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      :allChecked="checkedAll"
      @column-header-clicked="headerColumnClick($event.column)"
      :cellActionIcon="'table-column-solid'"
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
          <span class="text-container">{{ data.value.payFrequency }}</span>
        </div>
      </template>
      <template #cell(payMethod)="data">
        <div class="justify-between">
          <span>{{ data.value.payMethod?.name }}</span>
        </div>
      </template>
      <template #cell(closeDay)="data">
        <div class="justify-between">
          <span class="text-container">{{ data.value.closeDay }} </span>
        </div>
      </template>
      <template #cell(runDay)="data">
        <div class="justify-between">
          <span class="text-container">
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
      <template #cell_action_right="data">
        <div class="d-flex justify-center align-center">
          <div class="menu-container">
            <bib-button
              class="button-pop"
              icon="horizontal-dots"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              @click.native.stop="toggleMenu(data.value.id)"
            >
            </bib-button>
            <div 
              v-show="activeMenuId === data.value.id"
              class="menu-dropdown"
            >
              <div class="list">
                <span 
                  @click.stop="handleEditClick(data.value.id)" 
                  class="list__item"
                >Edit</span>
                <span
                  @click.stop="handleDelete('delete', data.value.id)"
                  class="list__item"
                >Delete</span>
              </div>
            </div>
          </div>
        </div>
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
import {
  deletePayPlan,
  updatePayPlan,
} from "../../../../utils/functions/api_call/pay/pay-plans";
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
      activeMenuId: null,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
    this.$resetTableFieldsHeaderIcon(this.tableFields);
  },
  computed: {
    leavePendingList() {
      if (!this.sortByField) return this.payPlansList;
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
      if (column != "action") {
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
      const rowData = this.leavePendingList.find((item) => item.id === id);
      this.$emit("row-clicked", rowData);
      this.activeMenuId = null;
    },
    handleDelete(action, id) {
      console.log("del", id, action);
      if (action === "delete") {
        this.selectedDeleteId = id;
        this.isDeleteModalVisible = true;
        this.activeMenuId = null;
      }
    },
    async deleteSpecificEntry() {
      try {
        // Emit the delete event to parent instead of handling it here
        this.$emit("delete-pay-plan", this.selectedDeleteId);
        this.closeConfirmationModal();
      } catch (error) {
        console.error("Error deleting item:", error);
        this.$toast.error("An error occurred while deleting the item");
      }
    },
    closeConfirmationModal() {
      this.isDeleteModalVisible = false;
      this.selectedDeleteId = null;
    },
    async updateStatus(id, data) {
      let addForm = {
        reference: "reference",
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
        this.$openPopupNotification({
          text: "Status updated successfully",
          variant: "primary-24",
        });
      } catch (error) {
        this.$openPopupNotification({
          text: "An error occurred while updating status",
          variant: "danger",
        });
      }
    },
    toggleMenu(id) {
      this.activeMenuId = this.activeMenuId === id ? null : id;
    },
    handleClickOutside(event) {
      // Check if click is outside any menu button
      const isClickInsideMenu = event.target.closest('.button-pop');
      if (!isClickInsideMenu) {
        this.activeMenuId = null;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
};
</script>

<style lang="scss">
.select-field {
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

.list {
  background: var(--color-surface);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &__item {
    display: block;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
      background-color: var(--color-surface-hover);
    }
  }
}

.button-pop {
  position: relative;
}

.menu-container {
  position: relative;
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  min-width: 120px;
  margin-top: 4px;
}
</style>
<style scoped>
.text-container {
  text-transform: lowercase;
}

.text-container::first-letter {
  text-transform: uppercase;
}
</style>
