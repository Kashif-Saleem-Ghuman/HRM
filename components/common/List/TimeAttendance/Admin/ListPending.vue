<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="listPending"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
    @input="($emit('selectAllItems'))"
    :allChecked="checkedAll"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md" @change="$emit('input', data.value.id)" :checked="checked"></bib-checkbox>
      </div>
    </template>
    <!-- <template #cell(from)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.submitted }}</span>
      </div>
    </template> -->
    <template #cell(recived)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.id }}</span>
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
      <div class="d-flex align-center justify-center space-between">
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
              data.value?.status === 'rejected' ? 'chip-wrapper__bggray' : '',
              data.value?.status == null ? 'chip-wrapper__bggray' : '',
            ]"
          ></chips>
          <bib-button
          label="Reject"
          variant="warning"
          size="xl"
          class="px-1"
          @click="$emit('reject-item', data.value.id)"
          
        ></bib-button>
      </div>
    </template>
  </custom-table>
</template>

<script>
import { TABLE_HEAD } from "../../../../../utils/constant/Constant";
export default {
  props: {
    listPending: {
      type: [Array, Object],
      default: "",
    },
    checked:{
      type:Boolean
    },
    checkedAll:{
      type: Boolean,
      default: false,
    }
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
    handleAction($event){
      this.$emit("get-id", $event);
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
