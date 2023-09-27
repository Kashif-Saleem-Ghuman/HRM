<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="payData"
    :hide-no-column="true"
    classTypeHead="table__hrow__custom"
    classTypeBody="table__hrow__custom__irow"
    :collapseObj="{
      collapsed: false,
      label: 'Section Name',
      variant: 'black',
    }"
  >
    <template #cell(name)="data">
      <div
        class="d-flex align-center text-left gap-05"
        style="position: relative"
      >
        <div
          style="cursor: pointer"
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <bib-avatar
            class="mt-auto mb-auto"
            shape="circle"
            :src="data.value.photo"
            size="3rem"
          >
          </bib-avatar>
          <div :id="'id_' + data.value.id" style="" class="userCard">
            <user-info-card
              :user="data.value"
              @viewProfile="viewProfile(data.value.id)"
              @sendInvite="sendInvite"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper">
          <div class="title">
            {{ data.value.firstName }} {{ data.value.lastName }}
          </div>
          <div class="description">
            {{ data.value.jobTitle }}
          </div>
        </div>
      </div>
    </template>
    <template #cell(package)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.package }}</span>
      </div>
    </template>
    <template #cell(effectivedate)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.effectiveDate }}</span>
      </div>
    </template>
    <template #cell(enrolmentstatus)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.enrolmentStatus }}</span>
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
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
export default {
  props: {
    payData: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadBenefits,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
    };
  },

  methods: {
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },

    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
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
