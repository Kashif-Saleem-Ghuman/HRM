<template>
     <div class="d-flex align-center salary-wrapper  pb-1">
        <aside class="pr-1 input-label" v-if="label">{{label}}</aside>
    <div
      class="editable-select d-flex align-center gap-05"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
    <div v-if="showAvatar">
      <bib-avatar :src="avatarImg" size="1rem"></bib-avatar>
    </div>
      <div class="edit-select">
        <select 
          v-model="editableValue" 
          @change="saveValue" 
          class="select-field"
        >
          <option value="" disabled>Select an option</option>
          <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EditableSelect",
    props: {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
      },
      options: {
        type: Array,
        required: true,
      },
      showAvatar: {
      type: Boolean,
      default: false,
    },
    },
    data() {
      return {
        isHovered: false,
        editableValue: this.value || "", // Set default selected value
      };
    },
    methods: {
      saveValue() {
        this.$emit("update-value", this.editableValue);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .editable-select {
    display: flex;
    align-items: center;
    border: 1px solid var(--bib-dark-sub3);
    padding: 0 0.5rem;
    background-color: var(--bib-dark);
    border-radius: 1rem;
    position: relative;
    transition: background-color 0.3s ease;
    font-size: 14px;
  
    &:hover {
        background-color: $surface-tertiary;
    }
  
    .edit-select {
      flex-grow: 1;
  
      .select-field {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 0.5rem;
        background-color: transparent;
        color: $white;
        outline: none;
        font-size: 14px;
        option{
            background-color: $dark;
        }
        &:hover {
          border-color: var(--bib-light); /* Hover effect for select box */
        }
  
        &:focus {
            &:focus {
        border-color: transparent;
        box-shadow: none;
      }
        }
      }
    }
  }
  </style>
  