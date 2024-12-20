<template>
  <div class="font-sm form-container">
    <div class="row name-and-status">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Reference" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput label="Status" type="select" :options="statusOptions" @update-value="updatedValue">
            <template #value>
              {{ "In-progress" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="row mt-1">
      <div class="col-7">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Name" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Type" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Location" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Pay frequency" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Pay method" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Close day" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Run day" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-6">
        <div class="input-container">
          <BibAdvanceInput type="text" :value="inputValue" label="Start date" fieldKey="name" hoverIcon="edit"
            @update-value="handleUpdateValue">
            <template #value>
              {{ inputValue || "name" }}
            </template>
          </BibAdvanceInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {},
      referenceValue: "yash chauhan",
      inputValue: "",
      statusOptions: [
        { value: "in progress ", label: "In Progress" },
        { value: "active", label: "Active" },
      ],

      optionsDummy: [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
        { value: "opt3", label: "Option 3" },
      ],
    };
  },
  methods: {
    handleUpdateValue(field, value) {
      this.$set(this.addForm, field, value);
      console.log(this.addForm, "Updated form data");
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
