 

<template>
  <div class="font-sm form-container">
    <div class="row name-and-status">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput
            type="text"
            :value="addForm.reference"
            label="Reference"
            fieldKey="reference"
            hoverIcon="edit"
            @update-value="handleUpdateValue"
          >
            <template #value>
              {{ addForm.reference || "name" }}
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
              {{ addForm.status || "active" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="row mt-1">
      <div class="col-7">
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
              {{ addForm.name || "name" }}
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
              {{ addForm.location || "name" }}
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
              {{ addForm.payFrequency || "Select  frequency" }}
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
              {{ addForm.payMethodName || "name" }}
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

    <div class="row mt-1">
      <div class="col-12">
        <div class="d-flex align-center picker-label font-md">
          <label for="time-picker" class="picker-label">Select Date and Time:</label>

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

    <div class="pt-1">
      <bib-input
        type="textarea"
        name="cardNumber"
        placeholder="Description"
        class="input-wrapper"
        label="Description"
        v-model="addForm.description"
      />
    </div>

      <!-- Divider after first row -->
      <div class="divider"></div>


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
  },
  data() {
    return {
      addForm: {
      reference: '',
      status: '',
      name: '',
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
    handleUpdateValue( field, value) {
 
      if (field === "payMethodId") {
      
      const selectedPayMethod = this.payMethodsList.find((method) => {
   
    return method.id == Number(value); // Ensure type compatibility
  });
      console.log("sel meth -- ",selectedPayMethod)
      const payMethodName = selectedPayMethod ? selectedPayMethod.name : "name";
      this.$set(this.addForm, "payMethodName", payMethodName); // Save the name (optional, if needed)
    }

    else if(field === "orgDefault"){
      const orgValue = value === "true"; 
      this.$set(this.addForm, field, orgValue);
      console.log( "org data ",value, orgValue);
      this.$emit("form-updated", this.addForm);
    }else{
      console.log("only firld and vlue", field, value)
      this.$set(this.addForm, field, value);
      console.log(this.addForm, "Updated form data");
      this.$emit("form-updated", this.addForm);
    }

     
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
  },

  mounted(){
    console.log("pay methods list 000 ", this.payMethodsList)
  },
  computed: {
    payMethodsOptions() {
      // Transform the prop into the required format
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
.form-container {
  border: 1px solid #343437;
  border-radius: 6px;
  padding: 20px;

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%; // Ensures the container spans the full width of the column
  }

  .BibAdvanceInput {
    width: 100%; // Ensures input fields span the full width
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    input {
      text-align: left; // Aligns text to the left
      padding-left: 0; // Removes extra padding if present
    }
  }


  .name-and-status {
    //  border: 1px solid white;
    padding: 10px 0px 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .divider {
    border: 1px solid #343437;
    margin: 4px 0px 8px 0px;
  }
}
 
</style>
