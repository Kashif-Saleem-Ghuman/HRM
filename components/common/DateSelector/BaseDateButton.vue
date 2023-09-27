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
$btn-aspect-ratio: 4;
$date-btn-width: 6vw;
$date-btn-height: calc($date-btn-width / $btn-aspect-ratio);
$padding-value: 10px;
$border-radius-value: 5%;
$disabled-background: #e7e7e7;
$dropdown-background: #fff;
$dropdown-item-hover-bg: #f0f0f0;
$dropdown-item-padding: 8px;

.dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: $date-btn-width;
  max-height: $date-btn-height;
  background-color: black;
  border-radius: $border-radius-value;
  color: white;
  padding: $padding-value;
  position: relative;
  cursor: pointer;
  border: none;
  &.disabled {
    background: $disabled-background !important;
  }

  .text {
    flex: 1;
    font-weight: 500;
    font-size: 1em;
  }

  .icon {
    padding-left: $padding-value;
    cursor: pointer;
  }
}

.dropdown-menu {
  width: $date-btn-width;
  min-height: $date-btn-height;
  background-color: $dropdown-background;
  position: absolute;
  border: 1px solid #e7e7e7;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;;
  z-index: 10;
  font-size: .8em;
  font-weight: 200;
  margin-top: -$date-btn-height;
  padding-top: .5em;
  padding-bottom: .5em;
  .dropdown-item {
    display: flex;
    align-items: center;
    padding: $dropdown-item-padding;
    cursor: pointer;
    margin-left: .1em;
    margin-right: .1em;
    height: 2em;
    
    &:hover {
      background-color: $dropdown-item-hover-bg;
      border-radius: 5px;
    }
  }
}

</style>