<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="userList"
    :hide-no-column="true"
    @item-clicked="handleItemClick_Table"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="sm"></bib-checkbox>
      </div>
    </template>

    <template #cell(name)="data">
      <div
        class="d-flex align-center text-dark"
        style="color: #000; font-weight: 600"
      >
        <span class="first_letter">{{ data.value.label.slice(0, 1) }}</span>
        {{ data.value.label }}
      </div>
    </template>
    <template #cell_action_right="data">
      <div class="d-flex justify-center align-center">
        <bib-icon icon="trash" :scale="0.9"></bib-icon>
      </div>
    </template>
  </custom-table>
</template>

<script>
export default {
  props: {
    tableFields: {
      type: Array,
      default: "",
    },
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
    };
  },
  // created() {
  //   if (this.$router.history.current.fullPath == "/people") {
  //     this.tableFields = TABLE_HEAD.tHeadPeople;
  //     return;
  //   }

  //   if (this.$router.history.current.fullPath == "/people/directory") {
  //     this.tableFields = TABLE_FIELDS_DIR;
  //     return;
  //   }
  // },
  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    sendInvite() {
      alert("send invite api call");
    },
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },

    handleAction_Table(data) {
      // console.log(data);
    },
  },
};
</script>

<style lang="scss">
.info_wrapper {
  color: $black;
  font-weight: normal;
}
.first_letter {
  padding: 10px 12px;
  background-color: #f2f2f5;
  border-radius: 8px;
  margin-right: 8px;
}
.title {
  font-size: 14px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $black;
}
</style>
