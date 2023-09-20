<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      selected: null,
      value: null,
      disabled: false,
    };
  },

  methods: {
    setDefaultValue() {
      throw new Error(
        "Set default value needs to be implemented in extended component"
      );
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },

  created() {
    this.setDefaultValue();
  },

  watch: {
    value(value) {
      this.$emit("update:value", value);
    },
  },
};
</script>

<style lang="scss" scoped>
$date-btn-width: 7vw;
$padding-value: 10px;
$border-radius-value: 10px;
$disabled-background: #e7e7e7;
$dropdown-background: #fff;
$dropdown-border: 1px solid #ccc;
$dropdown-item-hover-bg: #f0f0f0;
$dropdown-item-padding: 8px;

.dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: $date-btn-width;
  background-color: black;
  border-radius: $border-radius-value;
  color: white;
  padding: $padding-value;
  position: relative;
  cursor: pointer;
  &.disabled {
    background: $disabled-background !important;
  }

  .text {
    flex: 1;
  }

  .icon {
    padding-left: $padding-value;
    cursor: pointer;
  }
}

.dropdown-menu {
  width: $date-btn-width;
  border: $dropdown-border;
  background-color: $dropdown-background;
  position: absolute;
  z-index: 10;

  .dropdown-item {
    padding: $dropdown-item-padding;
    cursor: pointer;

    &:hover {
      background-color: $dropdown-item-hover-bg;
    }
  }
}

</style>