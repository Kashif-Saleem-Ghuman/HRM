<template>
    <div
      class="compensation-selector d-flex align-center gap-05"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Editable Label -->
      <div class="label-wrapper">
        <div v-if="isEditing" class="editable-label">
          <select v-model="selectedOption" @change="updateLabel" class="select-dropdown">
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div v-else class="label">
          {{ selectedOption }}
        </div>
      </div>
  
      <!-- Amount Display -->
      <div class="amount">{{ amount }}</div>
  
      <!-- Currency Display -->
      <div class="currency">{{ currency }}</div>
  
      <!-- Edit Icon -->
      <bib-icon
        v-show="isHovered"
        class="cursor-pointer edit-icon"
        icon="pencil"
        :scale="1"
        @click="toggleEditing"
      />
    </div>
  </template>
  
  
  <script>
  export default {
    name: "CompensationSelector",
    props: {
      initialLabel: {
        type: String,
        default: "Annual",
      },
      amount: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        default: () => ["Annual", "Monthly", "Weekly"],
      },
    },
    data() {
      return {
        isEditing: false,
        isHovered: false, // Track hover state
        selectedOption: this.initialLabel,
      };
    },
    methods: {
      toggleEditing() {
        this.isEditing = !this.isEditing;
      },
      updateLabel() {
        this.isEditing = false;
        this.$emit("label-updated", this.selectedOption);
      },
    },
  };
  </script>
  
  <style lang="scss">
 .compensation-selector {
  display: inline-flex; /* Ensure width is based on content */
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  color: var(--bib-text-secondary);
  border: 1px solid $dark-sub3;
  background-color: $dark;
  border-radius: 1rem;
  padding: 0.5rem;
  width: auto;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: $dark-sub3; /* Hover background color */
  }
}

.label-wrapper {
  display: flex;
  align-items: center;
}
.editable-label{
  
}
.select-dropdown {
//   border: none;
  font-size: inherit;
  color: var(--bib-text-secondary);
  border-right: 10px solid red !important;
  padding-right: 0.5rem;
  margin-right: 0.5rem; /* Add spacing after the border */
  border-right: 1px solid var(--bib-text-secondary);

  /* Add right border */
 
}

.label {
  font-weight: bold;
}

.amount {
  font-weight: 500;
  margin: 0 0.25rem;

  /* Add right border */
  border-right: 1px solid var(--bib-text-secondary);
  padding-right: 0.7rem;
  margin-right: 0.4rem; /* Add spacing after the border */
}

.currency {
  font-weight: 500;
}

.cursor-pointer {
  cursor: pointer;
}

.edit-icon {
  transition: opacity 0.3s ease;
  opacity: 0; /* Hide by default */

  /* Show edit button only when parent is hovered */
  .compensation-selector:hover & {
    opacity: 1;
  }

  }
  </style>
  