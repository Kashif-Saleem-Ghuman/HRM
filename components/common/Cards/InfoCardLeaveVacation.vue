<template>
  <div class="d-flex info-card-leave-container">
    <div class="info-card-leave-wrapper w-100">
      <div class="d-flex justify-between item">
        <label :class="isLightThemeCheck  ? 'text-gray' : 'text-gray'">{{ title }}</label>
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
            :key="progressKey"
          ></progress-circle>
        </div>
        <!-- <div v-show="item.photo == null ? '' : item.photo">
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
        </div> -->
      </div>
      <div class="footer-item d-flex gap-05">
        <div
          class="items"
          v-if="$store.state.token.isAdmin"
          @mouseover="editAllowanceIcon = true"
          @mouseleave="editAllowanceIcon = false"
        >
          <label>Allowance</label>
          <div class="position-relative">
            <span class="pl-05" v-show="!editAllowance">
              {{ totalAllowance }}
            </span>
            <div v-show="editAllowance" class="edit-allowance">
              <bib-input
                type="text"
                v-model="editAllowanceValue"
                size="sm"
                class="pt-05 edit-allowance__input"
              ></bib-input>
              <bib-icon
                class="edit-allowance__action-icon"
                icon="save"
                hover-variant="primary"
                @click="saveAllowance"
              ></bib-icon>
              <bib-icon
                class="edit-allowance__action-icon"
                icon="close"
                hover-variant="primary"
                @click="editAllowance = false"
              ></bib-icon>
            </div>
            <bib-icon
              v-show="editAllowanceIcon && !editAllowance"
              class="edit-allowance-icon"
              icon="pencil"
              hover-variant="primary"
              @click="handleEditAllowanceClick"
              :scale="1.1"
            ></bib-icon>
          </div>
        </div>
        <div v-else class="items">
          <label>Allowance</label>
          <span class="pl-05">{{ totalAllowance }}</span>
        </div>

        <div class="items">
          <label>Used</label>
          <span class="pl-05">{{ daysUsed }}</span>
        </div>

        <div class="items">
          <label>Scheduled</label>
          <span class="pl-05">{{ scheduledDays }} </span>
        </div>
      </div>
      <div class="d-flex justify-center pt-05">
        <bib-button
          :icon="icon"
          :variant="variant"
          :scale="$button.approved.scale"
          :label="buttonLable"
          @click.native.stop="$emit('on-click')"
          class="button-wrapper-align w-100"
        ></bib-button>
      </div>
    </div>
  </div>
</template>
<script>
import { updateEmployee } from "@/utils/functions/api_call/employees";
import { REQUEST_TYPES } from "@/utils/constant/Constant";

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
    scheduledDays: {
      type: Number,
    },
    type: {
      type: String,
    },
    daysUsedCarryOver: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      balanceLeave: null,
      progress: "0%",
      editAllowanceIcon: false,
      editAllowance: false,
      editAllowanceValue: 0,
      progressKey: 0,
    };
  },
  computed: {
    getpercentageValue() {
      const totalLeave = this.daysUsed + this.scheduledDays;
      this.progressKey += 1;
      if (this.totalAllowance !== 0) {
        return Math.round((totalLeave / this.totalAllowance) * 100);
      } else {
        return "0";
      }
    },

    balanceLeaveValue() {
      if (!Number.isNaN(this.totalAllowance) && !Number.isNaN(this.daysUsed)) {
        const balance =
          this.totalAllowance - this.daysUsed - this.daysUsedCarryOver;
        return balance % 1 === 0 ? balance : balance.toFixed(2);
      }
      return 0;
    },
    employeeId() {
      return this.$store.state.employee.selectedEmployeeId;
    },
  },
  async created() {},
  mounted() {},
  methods: {
    handleEditAllowanceClick() {
      this.editAllowanceValue = this.totalAllowance;
      this.editAllowance = true;
    },

    async saveAllowance() {
      if (!this.employeeId || !this.type) return;
      if (!Object.values(REQUEST_TYPES).includes(this.type)) return;

      const payload = {
        id: this.employeeId,
        employee: { [`${this.type}DaysAllowed`]: this.editAllowanceValue },
      };
      await updateEmployee(payload);
      this.editAllowance = false;
      this.$emit("update");
    },
  },
};
</script>
<style lang="scss">
.info-card-leave-container {
  overflow: hidden;
}

.edit-allowance {
  display: flex;
  align-items: center;
  width: 4.5rem;
  background-color: $white;
  justify-content: left;

  &__action-icon {
    cursor: pointer;
    margin-left: 0.2rem;
  }

  &__input {
    max-width: 3rem;
  }
}

.edit-allowance-icon {
  cursor: pointer;
  position: absolute;
  background-color: $white;
  border-radius: 6px;
  top: 0;
  right: -1px;
  margin: 1px;
}
</style>
