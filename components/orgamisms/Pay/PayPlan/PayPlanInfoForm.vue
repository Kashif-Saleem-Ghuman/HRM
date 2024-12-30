<template>
  <div class="font-sm form-container" :style="{ border: isLightThemeCheck ? '1px solid #e9e9e9' : '1px solid #343437' }">
    <div class="row name-and-status">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            type="text"
            :value="addForm.reference"
            label="Reference"
            fieldKey="reference"
            hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ addForm.reference || "Reference" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Status"
            type="select"
            fieldKey="status"
            :options="statusOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.status || "Select status" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div :class="isLightThemeCheck ?'divider-light' : 'divider-dark'"></div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            type="text"
            :value="addForm.name"
            label="Name"
            fieldKey="name"
            hoverIcon="edit"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.name || "Name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Type"
            type="select"
            fieldKey="type"
            :options="typeOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.type || "Select type" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            type="text"
            :value="addForm.location"
            label="Location"
            fieldKey="location"
            hoverIcon="edit"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.location || "Location" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Pay Frequency"
            type="select"
            fieldKey="payFrequency"
            :options="payFrequencyOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.payFrequency || "Select frequency" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
          label="Pay Method"
          type="select"
          fieldKey="payMethodId"
          :options="payMethodsOptions"
          @update-value="handleUpdateValue"
        >
            <template #value>
              {{ addForm.payMethodName || "Pay Method" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Close Day"
            type="select"
            fieldKey="closeDay"
            :options="dayOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.closeDay || "Select close day" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Run Day"
            type="select"
            fieldKey="runDay"
            :options="dayOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.runDay || "Select run day" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-05">
      <div class="col-12">
        <div class="d-flex align-center picker-label font-md">
          <label for="time-picker" class="picker-label">Select Date and Time</label>
          <bib-datetime-picker 
            id="time-picker"
            class="ml-2"
            v-model="startDate"
            :format="format"
            :parseDate="parseDate"
            :formatDate="formatDate"
            @input="onStartDateChange"
          ></bib-datetime-picker>
        </div>
      </div>
    </div>

    <div>
      <bib-input
        type="textarea"
        name="cardNumber"
        placeholder="Description"
        class="input-wrapper"
        label="Description"
        v-model="addForm.description"
        :variant="isLightThemeCheck ? 'light' : 'dark'"
      />
    </div>

    <div :class="isLightThemeCheck ?'divider-light' : 'divider-dark'"></div>

    <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            label="Org default"
            type="select"
            fieldKey="orgDefault"
            :options="orgDefaultOptions"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{  addForm.orgDefault ? "Yes" : "No" }}
            </template>
          </BibAdvanceInput> 
        </div>
      </div>
  </div>
</template>


<script>
import dayjs from "dayjs";

export default {
  props:{
    payMethodsList:{
      type: [Array, Object],
      default: "",
    },
    editData:{
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      addForm: {
      reference: 'reference',
      status: '',
      name: 'name',
      type: '',
      location: '',
      payFrequency: '',
      payMethodId: '',
      payMethodName:'',
      closeDay: '',
      runDay: '',
      startDate:'',
      description:'',
      orgDefault:true,
      orgDefaultName:''
    },
      inputValue: "",
      startDate: dayjs("2023-01-25").format("MMM D, YYYY"),
      format: "MMM D, YYYY",
      statusOptions: [
        { value: "inactive", label: "Inactive" },
        { value: "active", label: "Active" },
      ],
      typeOptions: [
        { value: "DAILY", label: "Daily" },
        { value: "WEEKLY", label: "Weekly" },
        { value: "BIWEEKLY", label: "Biweekly" },
        { value: "MONTHLY", label: "Monthly" },
      ],
      payFrequencyOptions: [
        { value: "DAILY", label: "Daily" },
        { value: "WEEKLY", label: "Weekly" },
        { value: "BIWEEKLY", label: "Biweekly" },
        { value: "MONTHLY", label: "Monthly" },
      ],
      dayOptions: [
        { value: "MONDAY", label: "Monday" },
        { value: "TUESDAY", label: "Tuesday" },
        { value: "WEDNESDAY", label: "Wednesday" },
        { value: "THURSDAY", label: "Thursday" },
        { value: "FRIDAY", label: "Friday" },
        { value: "SATURDAY", label: "Saturday" },
        { value: "SUNDAY", label: "Sunday" },
      ],
      orgDefaultOptions:[
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
      
      ]
     
    };
  },
  methods: {
    handleUpdateValue(field, value) {
      // Handle pay method selection
      if (field === "payMethodId") {
        const selectedPayMethod = this.payMethodsList?.find((method) => 
          method?.id === (value ? Number(value) : null)
        );
        const payMethodName = selectedPayMethod?.name || "";
        this.$set(this.addForm, "payMethodName", payMethodName);
        this.$set(this.addForm, field, value || "");
      }
      // Handle org default toggle
      else if (field === "orgDefault") {
        const orgValue = value === "true";
        this.$set(this.addForm, field, orgValue);
      }
      // Handle all other fields
      else {
        this.$set(this.addForm, field, value);
      }

      // Always emit the updated form data
      this.$emit("form-updated", this.addForm);
    },
    parseDate(dateString) {
      return new Date(dateString);
    },
    formatDate(dateObj) {
      return dayjs(dateObj).format(this.format);
    },
    onStartDateChange(value) {
      const d = dayjs(value);
      const date = value ? d.format("YYYY-MM-DD") : null;
      const time = value ? d.format("HH:mm:ss") : null;
      console.log("Selected date:", date);
      console.log("Selected time:", time);
      this.$set(this.addForm, 'startDate', date);
      this.$emit("form-updated", this.addForm);
      this.startDate = date;
    },
    mapEditData() {
      if (this.editData) {
        this.addForm = {
          reference: this.editData.reference || 'Reference',
          name: this.editData.name || 'Name',
          type: this.editData.type || '',
          location: this.editData.location || '',
          payFrequency: this.editData.payFrequency || '',
          startDate: this.editData.startDate || '',
          runDay: this.editData.runDay || '',
          closeDay: this.editData.closeDay || '',
          description: this.editData.description || '',
          orgDefault: this.editData.orgDefault !== undefined ? this.editData.orgDefault : true,
          status: this.editData.status || '',
          payMethodId: this.editData.payMethod?.id || '',
          payMethodName: this.editData.payMethod?.name || ''
        };

        if (this.editData.startDate) {
          this.startDate = dayjs(this.editData.startDate).format('YYYY-MM-DD');
        }

        console.log('Updated Form Data:', this.addForm);
      }
    },
  },

  watch: {
    editData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.mapEditData();
        }
      }
    }
  },

  // mounted() {
  //   if(this.editData?.id){
  //     this.mapEditData();
  //   }
  // },

  computed: {
    payMethodsOptions() {
      return Array.isArray(this.payMethodsList)
        ? this.payMethodsList.map((item) => ({
            value: item.id, // Assuming each pay method has an `id`
            label: item.name || item.label, // Assuming each pay method has a `name` or `label`
          }))
        : [];
    },
  },
};
</script>

<style lang="scss">
.picker-label,
.input-label,
.input-wrapper label {
  margin: 2px 0px !important; 
  font-family: Inter;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 14.52px !important;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.advance-input {
  width: 100% !important; 
  .input-label {
    width: calc(35% - 0px);
    flex: 0 0 auto;
  }
}
.light-theme {
  .picker-label,
  .input-label,
  .input-wrapper label {
    color: var(--text-text-secondary, #1d1d20) !important;
  }

  .editable-value {
    border: 1px solid #e9e9e9 !important;
    background-color: #f4f4f4 !important;
  }
  .value,
  .edit-input,
  .input-field,
  select.select-field,
  .edit-select {
    color: #333 !important;
  }

  .edit-input .input-field:focus,
  .edit-select .select-field:focus {
    color: #000000 !important;
  }
  .editable-value svg {
    fill: #000000 !important;
  }
}

.dark-theme {
  .picker-label,
  .input-label,
  .input-wrapper label {
    color: var(--text-text-secondary-dark, #8d8d8f) !important;
  }
}
.editable-value {
  max-width: 60% !important;
}
.value,
.edit-input,
.input-field,
select.select-field,
.edit-select {
  white-space: nowrap !important;       
  overflow: hidden !important;          
  text-overflow: ellipsis !important;
}
.vdpComponent {
  &.input--dark {
    .vdpComponent__input {
      border: 1px solid #343437 !important;
      border-radius: 20px !important;
      color: #ffffff !important;
    }
    .vdpComponent__calendar-icon {
      svg {
        path {
          fill: #8d8d8f !important;
        }
      }
    }
  }
  
  &.input--light {
    .vdpComponent__input {
      border: 1px solid #e9e9e9 !important;
      border-radius: 20px !important;
      background-color: #f4f4f4 !important;
      color: #1a1a1c !important;
    }
    .vdpComponent__calendar-icon {
      svg {
        path {
          fill: #8d8d8f !important;
        }
      }
    }
  }
}


.form-container {
  border-radius: 6px;
  padding: 20px;

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
  }

  .BibAdvanceInput {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: Inter;
    input {
      text-align: left;
      padding-left: 0;
    }
  }

  .name-and-status {
    padding: 10px 0px 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .divider-dark {
    border: 1px solid #343437;
    margin: 4px 0px 8px 0px;
  }
  .divider-light {
    border: 1px solid #e9e9e9;
    margin: 4px 0px 8px 0px;
  }
}
 
</style>