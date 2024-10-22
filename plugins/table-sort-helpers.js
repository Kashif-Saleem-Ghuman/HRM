// plugins/table-helpers.js

export const resetTableFieldsHeaderIcon = (tableFields) => {
    tableFields.forEach((field) => {
      if (field.hasOwnProperty('header_icon')) {
        field.header_icon.isActive = false;
        field.header_icon.icon = field.header_icon.isActive === false ? "long-arrow-up" : "long-arrow-down";
      }
    });
  };
  
  export default (context, inject) => {
    inject('resetTableFieldsHeaderIcon', resetTableFieldsHeaderIcon);
  };
  