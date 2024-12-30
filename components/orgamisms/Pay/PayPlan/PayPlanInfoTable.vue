<template>
  <div class="position-relative h-100">
    <div class="d-flex align-items-center mb-05">
      <CustomDropdown 
        :users="availableUsers"
        @user-selected="handleUserSelected"
      />
    </div>
    <custom-table
      v-if="employeeData.length > 0"
      :fields="tableFields"
      class="table pay-plan-table"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
      :sections="employeeData"
      :hide-no-column="true"
      :fixHeader="true"
    >

      <template #cell(name)="data">
        <div class="justify-between">
          <span>{{ data.value.name }}</span>
        </div>
      </template>
      
      <template #cell(added-on)="data">
        <div class="justify-between">
          <span>{{ data.value.addedOn }}</span>
        </div>
      </template>
      <template #cell(action)="data">
        <div class="justify-between">
          <bib-icon 
          @click="deleteRow(data.value.id)"
            icon="trash" 
            class="cursor-pointer"
          />
        </div>
      </template>

      <template #row="{ row, index }">
    <tr :class="{ 'highlight-row': index === 0 }">
      <td>
        <bib-icon 
          v-if="index === 0" 
          @click="deleteRow(row.id)"
          icon="trash" 
          class="cursor-pointer"
        />
      </td>
    </tr>
  </template>
    </custom-table>
  </div>
</template>

<script>
import {
  TABLE_HEAD, DUMMY_USERS_LIST
} from "@/utils/constant/pay/PayConstant";
import CustomDropdown from './CustomDropDown.vue'

export default {
  components: {
    CustomDropdown
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadPayPlanInfo,
      employeeData: [],
      users: DUMMY_USERS_LIST,
      selectedUsers: [],
    };
  },
  computed: {
    availableUsers() {
      return this.users.filter(user => 
        !this.selectedUsers.some(selected => selected.id === user.id)
      );
    }
  },
  methods: {
    getRateClass(rate) {
      const rateValue = parseFloat(rate);
      if (rateValue > 0) return "text-success";
      if (rateValue < 0) return "text-danger";
      return "";
    },
    addRow() {
      const newRow = {
        id: Date.now(),
        employeeId: 80,
        effectiveDate: "2024-10-28",
        type: "bonus",
        augmentation: "---",
        rate: "38.84",
        amount: "6500 USD",
        isNew: true,
      };

      this.employeeData.unshift(newRow);
    },
    deleteRow(id) {
      console.log(id, ">>>>>>");
      this.employeeData = this.employeeData.filter(row => row.id !== id);
      const deletedUser = this.selectedUsers.find(user => user.id === id);
      if (deletedUser) {
        this.selectedUsers = this.selectedUsers.filter(user => user.id !== id);
      }
      this.emitSelectedUsersLength();
    },
    handleUserSelected(user) {
      const newRow = {
        id: user.id,
        name: user.name,
        addedOn: new Date().toLocaleDateString(),
      };

      this.employeeData.push(newRow);
      this.selectedUsers.push(user);
      this.emitSelectedUsersLength();
    },
    emitSelectedUsersLength() {
      this.$emit('selected-users-length', this.selectedUsers.length);
    }
  },
};
</script>
<style lang="scss"> 
.pay-plan-table{
  border-radius: 6px !important;
}
.light-theme {
  .pay-plan-table{
    border: 1px solid #e9e9e9 !important;
  }
}
.dark-theme{
  .pay-plan-table{
    border: 1px solid #343437 !important;
  }
  .pay-plan-table .table__irow td{
    background-color: transparent !important;
  }
  .pay-plan-table .table__irow:hover td { // Added hover effect
    background-color: #020202 !important; // Change to desired hover color
  }
}
</style>