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
        <bib-checkbox size="md" @change="$emit('input', data.value.employee.id)" :checked="checked"></bib-checkbox>
      </div>
    </template>
    <template #cell(name)="data">
      <div
          class="d-flex align-center text-left gap-05"
          style="position: relative"
        >
          <div
            style="cursor: pointer"
            v-on:click="profiletab('id_' + data.value.employee.id)"
            v-on:mouseleave="profiletab('id_' + data.value.employee.id, true)"
            class="ml-05"
          >
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.employee.photo"
              size="3rem"
            >
            </bib-avatar>
            <div :id="'id_' + data.value.employee.id" style="" class="userCard">
              <user-info-card
                :src="data.value.employee.photo"
                :firstName="data.value.employee.firstName"
                :lastName="data.value.employee.lastName"
                :jobTitle="data.value.employee.jobTitle"
                :email="data.value.employee.email"
                :phone="data.value.employee.phone"
                @viewProfile="viewProfile(data.value.employee.id)"
                @sendInvite="sendInvite"
              ></user-info-card>
            </div>
          </div>
          <div class="info_wrapper">
            <div class="title">
              {{ data.value.employee.firstName }} {{ data.value.employee.lastName }}
            </div>
            <div class="description">
              {{ data.value.employee.jobTitle }}
            </div>
          </div>
        </div>
    </template>
    <!-- <template #cell(recived)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.id }}</span>
      </div>
    </template> -->
    <template #cell(type)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.type }}</span>
      </div>
    </template>
    <template #cell(from)="data">
      <div class="justify-between text-dark">
        <span>{{ onLoad(data.value.start) }}</span>
      </div>
    </template>
    <template #cell(to)="data">
      <div class="justify-between text-dark">
        <span>{{ onLoad(data.value.end) }}</span>
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
                : '' || data.value.status == 'rejected'
                ? 'help'
                : ''
            "
            :className="[
              data.value?.status == 'approve' ? 'chip-wrapper__bgsucess' : '',
              data.value?.status === 'pending' ? 'chip-wrapper__bgabsentpink' : '',
              data.value?.status === 'rejected' ? 'chip-wrapper__bgdefault' : '',
              data.value?.status == null ? 'chip-wrapper__bggray' : '',
            ]"
          ></chips>
          <bib-button
          label="Reject"
          variant="warning"
          size="xl"
          class="px-1"
          style="height: 3rem; display: flex; align-items: center;"
          @click="$emit('reject-item', data.value.id)"
          
        ></bib-button>
      </div>
    </template>
  </custom-table>
</template>

<script>
import fecha, { format } from "fecha";
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
    onLoad(item) {
      return fecha.format(new Date(item), "YYYY/MM/DD");
    },
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/myprofile/" + item.id);
    },
    handleAction($event){
      this.$emit("get-id", $event);
    },
    handleAction_Table(data) {
      console.log(data);
    },
    viewProfile(id) {
      this.$router.push("/myprofile/" + id);
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
