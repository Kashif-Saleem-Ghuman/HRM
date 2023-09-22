<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="listToday"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
    @input="($emit('selectAllItems'))"
    :allChecked="checkedAll"
    :showTotal=true
    :totalValue="totalWork"
    :status="status"
    :colspan="3"
  >
    <template v-if="includeCheckbox" #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md" @change="$emit('input', data.value.employee.id)" :checked="checked"></bib-checkbox>
      </div>
    </template>
    <!-- <template #cell(recived)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.id }}</span>
      </div>
    </template> -->
    <template #cell(activity)="data">
      <div class="justify-between text-dark title">
        <span>{{ data.value.activityTitle }}</span>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-between text-dark">
        <span>{{data.value.start }}</span>
        <!-- <span>{{onLoad(data.value.start) }}</span> -->
      </div>
    </template>
    <template #cell(end)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.end }}</span>
      </div>
    </template>
    <template #cell(total)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.total }}</span>
      </div>
    </template>
  </custom-table>
</template>

<script>
import fecha from "fecha";
import { TABLE_HEAD, TIMESHEET_STATUS } from "../../../../../utils/constant/Constant";

export default {
  props: {
    listToday: {
      type: Array,
      default: [],
    },
    checked:{
      type:Boolean
    },
    checkedAll:{
      type: Boolean,
      default: false,
    },
    includeCheckbox: {
      type: Boolean,
      default: false,
    },
    totalWork: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadMyTimeAttendance,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      TIMESHEET_STATUS,
    };
  },
  methods: {
    onLoad(item) {
      return fecha.format(new Date(item), "YYYY/MM/DD");
    },
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
    },
    handleAction($event){
      this.$emit("get-id", $event);
    },
    handleAction_Table(data) {
      console.log(data);
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    vclick() {
      alert("callled");
    },
    mouseover() {
      this.showTooltip = true;
    },
    mouseleave() {
      this.showTooltip = false;
    },
    sendInvite() {
      alert("send invite api call");
    },
    
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },

  },
};
</script>

<style lang="scss">
.info_wrapper {
  color: $black;
  font-weight: normal;
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
