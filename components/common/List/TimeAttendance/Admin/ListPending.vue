<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="listPending"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md"></bib-checkbox>
      </div>
    </template>
    <!-- <template #cell(from)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.submitted }}</span>
      </div>
    </template> -->
    <template #cell(recived)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.employeeId }}</span>
      </div>
    </template>
    <template #cell(type)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.type }}</span>
      </div>
    </template>
    <template #cell(from)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.start }}</span>
      </div>
    </template>
    <template #cell(to)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.end }}</span>
      </div>
    </template>
    <template #cell(reason)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.note }}</span>
      </div>
    </template>
    <template #cell(status)="data">
      <chips
            :title="data.value.status == null ? 'N/A' : data.value.status"
            iconShow="iconShow"
            :icon="
              data.value.status == 'approve'
                ? 'check-all'
                : '' || data.value.status == 'pending'
                ? 'eye-open'
                : '' || data.value.status == 'Past due'
                ? 'help'
                : ''
            "
            :className="[
              data.value?.status == 'approve' ? 'chip-wrapper__bgsucess' : '',
              data.value?.status === 'pending' ? 'chip-wrapper__bgabsentpink' : '',
              data.value?.status === 'A' ? 'chip-wrapper__bgvacation' : '',
              data.value?.status == null ? 'chip-wrapper__bggray' : '',
            ]"
          ></chips>
    </template>
  </custom-table>
</template>

<script>
import { TABLE_HEAD } from "../../../../../utils/constant/Constant";
export default {
  props: {
    listPending: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadLeaveVacationPending,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
    };
  },
  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/myprofile/" + item.id);
    },
    handleAction_Table(data) {
      console.log(data);
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
