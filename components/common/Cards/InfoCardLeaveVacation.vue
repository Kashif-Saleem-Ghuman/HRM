<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div style="display: flex; justify-content: space-between;">
        <label>{{ title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">Available</div>
          <span>{{ balanceLeaveValue }}</span>

          <div class="subheading_footer">Days</div>
        </div>
        <div>
          <progress-circle
            :progressCount="
              getpercentageValue == 'Infinity' ? '0' : getpercentageValue
            "
            :progressPercentage="
              getpercentageValue == 'Infinity' ? '0' : getpercentageValue + '%'
            "
            :fill="fill"
            emptyfill="#f1f1f1"
          ></progress-circle>
        </div>
        <!-- <div v-show="item.photo == null ? '' : item.photo">
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
        </div> -->
      </div>
      <div class="footer-item d-flex">
        <div class="items"
          v-if="$store.state.token.isAdmin"
          @mouseover="editAllowanceIcon = true"
          @mouseleave="editAllowanceIcon = false"
        >
          <label>Allowance</label>
          <div style="position: relative;">
            <span v-show="!editAllowance">{{ totalAllowance }}</span>
            <div v-show="editAllowance" class="edit-allowance">
              <bib-input
                type="text"
                v-model="editAllowanceValue"
                size="sm"
                class="pt-05"
              ></bib-input>
              <bib-icon class="edit-allowance__action-icon" icon="save" hover-variant="primary" @click="saveAllowance"></bib-icon>
              <bib-icon class="edit-allowance__action-icon" icon="close" hover-variant="primary" @click="editAllowance = false"></bib-icon>
            </div>
            <bib-icon v-show="editAllowanceIcon && !editAllowance" class="edit-allowance-icon" icon="pencil" hover-variant="primary" @click="handleEditAllowanceClick"></bib-icon>
          </div>
        </div>
        <div v-else class="items">
          <label>Allowance</label>
          <span>{{ totalAllowance }}</span>
        </div>
        
        <div class="items">
          <label>Used</label>
          <span>{{ daysUsed }}</span>
        </div>
      </div>
      <bib-button
        :icon="icon"
        :variant="variant"
        :scale="$button.approved.scale"
        :label="buttonLable"
        class="mr-05 button-wrapper-align"
        style="width: 100%"
        @click="$emit('on-click')"
      ></bib-button>
    </div>
  </div>
</template>
<script>
import { updateEmployee } from "@/utils/functions/api_call/employees";
import { REQUEST_TYPES } from "@/utils/constant/Constant"

export default {
  props: {
    title: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    item: {
      type: [Object, Array],
    },
    buttonLable: {
      type: String,
    },
    icon: {
      type: String,
    },
    variant: {
      type: String,
    },
    title: {
      type: String,
    },
    className: {
      type: String,
    },
    totalAllowance: {
      type: [String, Number],
    },
    daysUsed: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      balanceLeave: null, 
      progress: "0%",
      editAllowanceIcon: false,
      editAllowance: false,
      editAllowanceValue: 0
    };
  },
  computed: {
    getpercentageValue() {
      return (this.daysUsed / this.totalAllowance).toFixed(2) * 100 || "0";
    },
    balanceLeaveValue() {
      if (!Number.isNaN(this.totalAllowance) && !Number.isNaN(this.daysUsed)) {
        const balance = this.totalAllowance - this.daysUsed
        return balance < 0 ? 0 : balance
      }
      return 0
    },
    employeeId() {
      return this.$store.state.employee.selectedEmployeeId
    }
  },
  async created() {

  },
  mounted() {
  },
  methods: {
    handleEditAllowanceClick() {
      this.editAllowanceValue = this.totalAllowance
      this.editAllowance = true
    },

    async saveAllowance() {
      if (!this.employeeId || !this.type) return 
      if (!Object.values(REQUEST_TYPES).includes(this.type)) return 

      const payload = { id: this.employeeId, employee: {[`${this.type}DaysAllowed`]: this.editAllowanceValue} }
      await updateEmployee(payload)
      this.editAllowance = false
      this.$emit("update")
    }
  },
};
</script>
<style lang="scss">
.button-wrapper-align {
  div {
    display: flex;
    justify-content: center;
    .btn_icon {
      display: flex;
      justify-content: center !important;
      width: 0.8rem;
      height: 0.8rem;
      display: flex;
      position: relative !important;
      margin-right: 20px;
    }
  }
}

.edit-allowance {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  width: 6rem;

  &__action-icon {
    cursor: pointer;
    margin-left: .1rem;
  }
}

.edit-allowance-icon {
  cursor: pointer;
  position: absolute;
  margin-left: .1rem;
}
</style>
