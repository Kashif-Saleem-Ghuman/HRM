<template>
  <div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      "
      class="d-grid gap-2 px-2 py-2"
    >
      <div v-for="(item, index) in userList" :key="index">
        <board-card :isLightTheme="isLightThemeCheck">
          <template #new_contact_section>
           <div class="pb-05 px-05 py-05">
            <bib-button
              label="Birthday"
              variant="tertiary"
              v-if="item.isBirthday"
              pill
              style="background-color: #6F00FF; color: #fff;"
              class="mr-05"
            ></bib-button>
            <bib-button
              label="Aniversary"
              variant="primary-24"
              v-if="item.isWorkAnniversary"
              pill
            ></bib-button>
           </div>
          </template>
          <!-- <template #card_menu>
            <bib-popup pop="horizontal-dots" icon-variant="secondary">
              <template v-slot:menu>
                <div class="list" @click.stop>
                  <span class="list__item">option1</span>
                  <span class="list__item danger">option2</span>
                </div>
              </template>
            </bib-popup>
          </template> -->
          <template #user_data>
            <div
              class="d-flex pb-1"
              :class="
                isLightThemeCheck
                  ? 'border-bottom-gray2'
                  : 'border-bottom-dark-sub1'
              "
            >
              <div style="min-width: 70px">
                <bib-avatar
                  variant="secondary-sub2"
                  :text="$getEmployeeInitials(item)"
                  text-variant="primary"
                  size="4rem"
                  v-show="item.photo === null"
                ></bib-avatar>
                <bib-avatar
                  class="mt-auto mb-auto"
                  shape="circle"
                  :src="item.photo"
                  v-show="item.photo != null"
                  size="4rem"
                >
                </bib-avatar>
              </div>

              <div class="ml-05">
                <label
                  class="font-w-600"
                  :class="isLightThemeCheck ? 'text-dark' : 'text-white'"
                  :title="$getEmployeeFullName(item)"
                >
                  {{ $getEmployeeFullName(item) | truncate(35, "...") }}
                </label>
                <div
                  class="font-sm font-w-500"
                  :class="isLightThemeCheck ? 'text-dark1' : 'text-gray4'"
                >
                  {{ item.jobTitle }}
                </div>
                <div class="button-wrapper-punch">
                  <attendance-status
                    :attendanceStatusData="item"
                    minWidth="min-width: 85px !important;"
                  ></attendance-status>
                </div>
              </div>
            </div>
          </template>
          <template #card_footer>
            <div class="d-flex gap-05">
              <div
                :class="getDynamicClass()"
                @click="sendMessage(item.userId)"
              >
                <bib-icon icon="chat" variant="secondary" :scale="1"></bib-icon>
              </div>
              <div
              :class="getDynamicClass()"
                @click="sendEmail(item.email)"
              >
                <bib-icon icon="mail" variant="secondary" :scale="1"></bib-icon>
              </div>
              <div
              :class="getDynamicClass()"
              @click="makeCall(getUser.userId, getUser.userId)"
              >
                <bib-icon
                  icon="phone"
                  variant="secondary"
                  :scale="0.8"
                ></bib-icon>
              </div>
            </div>
          </template>
        </board-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sendMessage,
  meetLink,
  makeCall,
} from "@/utils/functions/functions_lib";
import { mapGetters } from "vuex";

export default {
  props: {
    userList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  methods: {
    sendMessage,
    meetLink,
    makeCall,
    getDynamicClass() {
      return this.isLightThemeCheck
        ? 'bg-gray2 bg-hover-gray4 p-05 shape-circle d-flex align-center space-between cursor-pointer'
        : 'bg-dark-sub1 bg-hover-dark-sub3 p-05 shape-circle d-flex align-center space-between cursor-pointer';
    },
    sendEmail(email) {
      const mailtoLink = `mailto:${encodeURIComponent(email)}`;
      window.location.href = mailtoLink;
    },

    isOnline(user) {
      return user.presence && user.presence === "in";
    },
    getOnlineStatusClass(user) {
      return this.isOnline(user) ? "online" : "offline";
    },
    getStatusTitle(data) {
      const presence = data.presence;
      if (presence === "in") {
        return "Online";
      }
      if (presence === "out") {
        return "Offline";
      }
    },
    getStatusClass(data) {
      const presence = data.presence;
      if (presence === "in") {
        return "online";
      }

      return "offline";
    },
  },
};
</script>
