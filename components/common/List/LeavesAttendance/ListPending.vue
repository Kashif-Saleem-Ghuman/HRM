<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="listPending"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
    @input="$emit('selectAllItems')"
    :allChecked="checkedAll"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox
          size="md"
          @change="$emit('input', data.value.id)"
          :checked="checked"
        ></bib-checkbox>
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
              :user="data.value.employee"
              @viewProfile="viewProfile(data.value.employee.id)"
              @sendInvite="sendInvite"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper">
          <div class="title-user">
            {{ data.value.employee.firstName }}
            {{ data.value.employee.lastName }}
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
        <span style="text-transform: capitalize">{{ data.value.type }}</span>
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
    <template #cell(action)="data">
      <div class="d-flex align-center justify-center space-between">
        <bib-button
                :icon="$button.approved.icon"
                :variant="$button.approved.variant"
                :scale="$button.approved.scale"
                :label="$button.approved.label"
                class="mr-05"
                @click="$emit('approve-item', data.value.id)"
              ></bib-button>
              <bib-button
                :icon="$button.rejected.icon"
                :variant="$button.rejected.variant"
                :scale="$button.rejected.scale"
                :label="$button.rejected.label"
                class="mr-05"
                @click="$emit('reject-item', data.value.id)"
              ></bib-button>
        
        <!-- <chips
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
            style="text-transform:capitalize;"
            :className="[
              data.value?.status == 'approve' ? 'chip-wrapper__bgsucess' : '',
              data.value?.status === 'pending' ? 'chip-wrapper__bgabsentpink' : '',
              data.value?.status === 'rejected' ? 'chip-wrapper__bgdefault' : '',
              data.value?.status == null ? 'chip-wrapper__bggray' : '',
            ]"
          ></chips> -->
        <!-- <bib-button
          label="Reject"
          variant="warning"
          class="px-1"
          style="height: 2.2rem; display: flex; align-items: center;"
          @click="$emit('reject-item', data.value.id)"
          
        ></bib-button> -->
      </div>
    </template>
  </custom-table>
</template>

<script>
import fecha, { format } from "fecha";
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
export default {
  props: {
    listPending: {
      type: [Array, Object],
      default: "",
    },
    checked: {
      type: Boolean,
    },
    checkedAll: {
      type: Boolean,
      default: false,
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
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
    },
    handleAction($event) {
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

.title-user {
  font-size: 14px;
  font-weight: 600;
  color: #1d1d20;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: #1d1d20;
}
</style>
