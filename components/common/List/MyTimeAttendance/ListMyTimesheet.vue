<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="timeoffData"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md"></bib-checkbox>
      </div>
    </template>
    <template #cell(activity)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.activity }}</span>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.start }}</span>
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
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
export default {
  props: {
    timeoffData: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadMyTimeAttendance,
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
