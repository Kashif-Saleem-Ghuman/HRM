<template>
  <div class="sidebar-content2">
    <div class="row">
      <div class="col-6">
        <editable-input
          label="Reference"
          type="text"
          value="yash chauhan"
          fieldKey="reference"
          @update-value="updatedValue"
        />
      </div>
      <div class="col-6">
        <editable-input
          label="Status"
          type="select"
          :options="statusOptions"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-7">
        <editable-input
          label="Name"
          fieldKey="name"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <editable-input
          label="Type"
          fieldKey="type"
          @update-value="updatedValue"
        />
      </div>
      <div class="col-6">
        <editable-input
          label="Location"
          fieldKey="location"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <editable-input
          label="Pay frequency"
          type="select"
          :options="optionsDummy"
          fieldKey="payFrequency"
          @update-value="updatedValue"
        />
      </div>
      <div class="col-6">
        <editable-input
          label="Pay method"
          type="select"
          :options="optionsDummy"
          fieldKey="payMethod"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <editable-input
          label="Close day"
          fieldKey="closeDay"
          type="select"
          :options="optionsDummy"
          @update-value="updatedValue"
        />
      </div>
      <div class="col-6">
        <editable-input
          label="Run day"
          fieldKey="runDay"
          type="select"
          :options="optionsDummy"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <editable-input
          label="Start date"
          fieldKey="startDate"
          @update-value="updatedValue"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">Description</div>
    </div>

    <bib-rich-editor
      :isLightTheme="isLightTheme"
      :editingMessage="editingMessage"
      :cover="cover"
      :isClear="isClear"
      :buttonObject="SubmitButtonOptions"
      :isLinkActive="true"
      @send-message="sendMessage"
      @onFileSelect="onFileSelect"
      @blur="onBlur"
      @focus="onFocus"
      @debounce="onDebounce"
      :class="classes"
      :contacts="users"
    >
      <template #action>
        <slot name="action"></slot>
      </template>
    </bib-rich-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {},
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
    updatedValue(field, value) {
      this.$set(this.addForm, field, value);
      console.log(this.addForm, "Updated form data");
    },
  },
};
</script>
