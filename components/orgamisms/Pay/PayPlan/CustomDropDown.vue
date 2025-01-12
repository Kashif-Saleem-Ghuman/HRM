<template>
  <div id="user-select-wrapper" class="picker-wrapper" v-click-outside="closeDropdown">
    <bib-button 
      @click="toggleDropdown"
      label="Add Member" 
      variant="primary" 
      icon="add" 
      class="ms-2 mt-05 mb-05"
    ></bib-button>
    <div 
      v-show="isOpen" 
      ref="pickerContent"
      class="picker-content p-025"
      :class="{ 'theme-dark': !isLight, 'theme-light': isLight }"
    >
      <div class="input-container">
        <input 
        type="text" 
        class="picker-input"
        v-model="searchQuery"
        placeholder="Search users..."
        @keyup.esc="closeDropdown"
        autofocus
      />
      </div>
     
      <div class="mt-05 dropdown-list">
        <ul class="m-0 p-0 text-left">
          <li 
            v-for="user in filteredUsers" 
            :key="user.id"
            @click="selectUser(user)"
            class="p-025 align-center gap-05 font-md cursor-pointer"
            :class="{ 'selected': user.isSelected }"
          >
            <bib-avatar :src="user.photo" size="1rem" class="flex-shrink-0" />
            <span class="user-label d-inline-block text-truncate text-capitalize">{{ user.firstName + " " + user.lastName }}</span>
          </li>
          <li v-if="filteredUsers.length === 0" class="p-025 align-center gap-05 font-md cursor-pointer">No users found</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  
  props: {
    users: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      isOpen: false,
      searchQuery: ''
    }
  },

  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      const regex = new RegExp(this.searchQuery, 'i');
      return this.users.filter(user => {
        const name = `${user.firstName} ${user.lastName}`;
        regex.test(name) || regex.test(user.id)
      });
    },
    isLight() {
      return this.$store.state.theme.isLightTheme;
    },
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    closeDropdown() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    selectUser(user) {
      this.$emit('user-selected', user);
    //   this.closeDropdown();
    }
  },
}
</script>

<style lang="scss" scoped>
// Theme Variables
$light-background: #ffffff;
$light-surface: #f8f9fa;
$light-border: #e9ecef;
$light-text-primary: #212529;
$light-text-secondary: #6c757d;
$light-hover: #e9ecef;
$light-selected: #0d6efd;
$light-selected-text: #ffffff;
$light-input-bg: #ffffff;
$light-input-border: #ced4da;
$light-shadow: rgba(0, 0, 0, 0.1);

$dark-background: #212529;
$dark-surface: #343a40;
$dark-border: #495057;
$dark-text-primary: #f8f9fa;
$dark-text-secondary: #adb5bd;
$dark-hover: #495057;
$dark-selected: #0d6efd;
$dark-selected-text: #ffffff;
$dark-input-bg: #343a40;
$dark-input-border: #495057;
$dark-shadow: rgba(0, 0, 0, 0.25);

.picker-wrapper {
  width: 100%;
  position: relative;
}

.picker-content {
  position: absolute;
  top: 43px;
  left: 0px;
  z-index: 55;
  min-height: fit-content;
  max-height: 30rem;
  min-width: calc(50%);
  max-width: 15rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.theme-light {
    background-color: $light-background;
    border: 1px solid $light-border;
    color: $light-text-primary;
    .input-container{
        padding: 0px 2px !important;
        border: 1px solid $light-input-border;
        border-radius: 6px;
    }
    .picker-input {
      background-color: $light-input-bg;
      padding: 0px 10px !important;
      color: $light-text-primary;
      padding: 0.5rem;

      &::placeholder {
        color: $light-text-secondary;
      }
    }

    li {
      &:hover {
        background-color: $light-hover;
      }

      &.selected {
        background-color: $light-selected;
        color: $light-selected-text;
      }
    }
  }

  &.theme-dark {
    background-color: $dark-background;
    border: 1px solid $dark-border;
    color: $dark-text-primary;
    .input-container{
        padding: 0px 2px !important;
        border: 1px solid $dark-input-border;
        border-radius: 6px;
    }
    .picker-input {
      background-color: $dark-input-bg;
      padding: 0px 10px !important;
      color: $dark-text-primary;
      &::placeholder {
        color: $dark-text-secondary;
      }
    }

    li {
      &:hover {
        background-color: $dark-hover;
      }

      &.selected {
        background-color: $dark-selected;
        color: $dark-selected-text;
      }
    }
  }
}
.picker-input {
  width: 100%;
  border: none !important;
  background-color: transparent !important;
  outline: none;
}
.dropdown-list {
  max-height: 12rem;
  overflow-y: auto;
}

li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 0.25rem;
  margin: 0.125rem;
  cursor: pointer;

  .user-label {
    max-width: calc(100% - 2rem);
  }
}
</style>