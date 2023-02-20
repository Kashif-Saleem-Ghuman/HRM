<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="userList"
    :hide-no-column="true"
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
              :src="data.value.photo"
              :firstName="data.value.firstName"
              :lastName="data.value.lastName"
              :jobTitle="data.value.jobTitle"
              :email="data.value.email"
              :phone="data.value.phone"
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
    <template #cell(presence)="data">
      <div class="text-dark">
        <chips
          :title="
            data.value.attendance == null ? 'N/A' : data.value.attendance + '%'
          "
          :className="[
            data.value.attendance >= 70 ? 'chip-wrapper__bgsucess' : '',
            data.value.attendance <= 70 ? 'chip-wrapper__bgabsent' : '',
            data.value.attendance <= 35 ? 'chip-wrapper__bgabsentpink' : '',
            data.value.attendance <= 20 ? 'chip-wrapper__bggray' : '',
          ]"
        ></chips>
      </div>
    </template>

    <template #cell(department)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.department }}</span>
      </div>
    </template>

    <template #cell(team)="data">
      <div class="d-flex text-dark">
        <div v-for="teams in data.value.teams.slice(0, 1)" class="mr-05">
          {{ teams }}
        </div>
        {{
          data.value.teams.length == "0"
            ? ""
            : "+" + "" + data.value.teams.length
        }}
      </div>
    </template>
  </custom-table>
</template>

<script>
import {
  TABLE_FIELDS,
  TABLE_FIELDS_DIR,
} from "../../../utils/constant/Constant.js";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: "",
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
    };
  },
  created() {
    if (this.$router.history.current.fullPath == "/people") {
      this.tableFields = TABLE_FIELDS;
      return;
    }
    if (this.$router.history.current.fullPath == "/people/directory") {
      this.tableFields = TABLE_FIELDS_DIR;
      return;
    }
  },
  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/myprofile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/myprofile/" + id);
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

.variant_green {
  background: #d6f7d5;
}

.variant_yellow {
  background: #f7f3d5;
}

.variant_light_pink {
  background: #f6d5d5;
}

.variant_gray {
  background: #f2f2f5;
}
.userCard {
  display: none;
  position: absolute;
  padding: 20px 10px;
  background-color: #fff;
  z-index: 200000;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 24%);
  .user_card_detail {
    display: block;
    label {
      font-weight: 600;
      color: #000;
      display: flex;
      flex-direction: column;
      span {
        font-weight: 400;
        padding: 1px 0 3px 0;
      }
    }
    .card_info {
      .phone_color {
        color: blue;
      }
      p {
        padding: 1px 0;
        margin: 0px;
      }
    }
  }
}
</style>
