<template>
  <div id="files-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Pay"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items.slice(-1)"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
      <div class="d-flex justify-between">
        <template v-for="user in userList.slice(0, 4)">
          <section-header-right
            @click="userId(user.id)"
            :avatar="
              user.photo == null
                ? 'http://localhost:3000/_nuxt/_/bib-shared/img/user-default.png'
                : user.photo
            "
          >
          </section-header-right>
        </template>
        <div
          style="z-index: 100"
          class="bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0"
        >
          <span style="font-size: 14px; font-weight: 500">{{ totalUser }}</span>
        </div>
        <button-circle
          icon="user-add"
          :scale="1"
          @click="addUser()"
          variant="success"
          class="ml-05"
          icon_bg="light-green"
        ></button-circle>
      </div>
    </div>
    <div class="tab-wrapper">
      <div id="files-inner-wrapper">
        <div class="" id="tab_info_wrapper">
          <div>
            <div id="folder-info-wrapper" class="scroll_wrapper">
              <div class="nav_wrapper bottom_border_wrapper">
                <div class="main-wrapper">
                  <div
                    class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
                  >
                    <div class="d-flex align-center">
                      <button-green
                        icon="add"
                        variant="success"
                        :scale="1"
                        title="Upload Files"
                      ></button-green>
                      <button-green
                        icon="add"
                        :scale="1"
                        variant="success"
                        title="Create Folder"
                      ></button-green>
                    </div>
                    <action-right
                      @vclick="clickAction"
                      :items="actionMenu"
                    ></action-right>
                  </div>
                  <div class="px-1" id="folder-wrraper">
                    <bib-detail-collapse label="Folders" open>
                      <template v-slot:content>
                        <div class="flex_grid">
                          <!-- <folders></folders> -->
                          <template v-for="folder in folderData">
                            <folders :folder="folder"></folders>
                          </template>
                        </div>
                      </template>
                    </bib-detail-collapse>
                    <div
                      class="bg-light mt-1 mb-1"
                      :class="seprator"
                      style="height: 1px"
                    ></div>
                    <div id="files-wrapper">
                      <bib-detail-collapse label="Files" open>
                        <template v-slot:content>
                          <div class="flex_grid">
                            <!-- <folders></folders> -->
                            <template v-for="files in filesData">
                              <files :files="files"></files>
                            </template>
                          </div>
                        </template>
                      </bib-detail-collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <timeoff-modal
      @close="timeOffModal = false"
      :timeOffModal="timeOffModal"
    ></timeoff-modal>
  </div>
</template>
<script>
import {
  MORE_MENU,
  FOLDERS_DATA,
  FILES_DATA,
  PAY_ACTION_MENU,
} from "../../utils/constant/Constant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      // timeoffRequestData:TIMEOFF_REQUEST_DATA,
      activeTab: "Dashborad",
      items: MORE_MENU,
      orderBy: "asc",
      totalUser: "",
      folderData: FOLDERS_DATA,
      filesData: FILES_DATA,
      actionMenu: PAY_ACTION_MENU,
      userPhoto: localStorage.getItem("userPhoto"),
      // Time & attandance
      timeOffModal: false,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setUserList");
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
    }),
  },
  async mounted() {
    this.totalUser = this.userList.length;
  },
  methods: {
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
  },
};
</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  > li {
    display: inline; // Remove list-style and block-level defaults
    > a,
    > span {
      position: relative;
      float: left; // Collapse white-space
      padding: 5px 10px;
      line-height: 30px;
      text-decoration: none;
      color: #000;
      background-color: #d5e8d4;
      border: 1px solid #8dd488;
      margin-left: -1px;
    }
    &:first-child {
      > a,
      > span {
        margin-left: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      > a,
      > span {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  > li > a,
  > li > span {
    &:hover {
      z-index: 2;
      color: #31a22c;
      background-color: #f2f5f1;
      // border-color: @pagination-hover-border;
    }
  }

  > .active > a,
  > .active > span {
    &,
    &:hover,
    &:focus {
      z-index: 3;
      color: #fff;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
