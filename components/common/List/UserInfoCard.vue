<template>
  <div>
    <div class="d-flex">
      <bib-avatar
        class="mr-1"
        shape="circle"
        :src="user.photo"
        size="5rem"
      ></bib-avatar>
      <div>
        <div class="user_card_detail align-center d-flex">
          <label :title="$getEmployeeFullName(user)">
            {{ $getEmployeeFullName(user) | truncate(truncateText, "...") }}
            <span>
              {{ user.jobTitle }}
            </span>
          </label>
          <div class="card_info">
            <div class="button-wrapper-punch">
              <span
                :class="{ online: isOnline }"
                v-on:click="$emit('punchedIn')"
                >{{ isOnline ? "Punched in (online)" : "Offline" }}</span
              >
            </div>
            <p class="email" @click="sendMail(user.email)">
              {{ user.email }}
            </p>
            <p class="phone_color">{{ user.phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex pt-1">
        <bib-button
          label="View Profile"
          :variant="isLightThemeCheck ? 'light' : 'secondary'"
          class="mr-05"
          @click.native.stop="$emit('viewProfile')"
        ></bib-button>
        <bib-button
          label="Meet"
          class="mr-05"
          @click.native.stop="sendMeet"
          :variant="isLightThemeCheck ? 'light' : 'secondary'"
          v-show="contactButtons"
        ></bib-button>
        <bib-button
          label="Send Message"
          variant="primary-24"
          v-on:click="$emit('sendMessage')"
          v-show="contactButtons"
        ></bib-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserCardInfo",
  props: {
    /**
     * A user object
     * @typedef {Object} User
     * @property {string} firstName -
     * @property {string} lastName -
     * @property {string} jobTitle -
     * @property {string} email -
     * @property {string} phone -
     * @property {string} photo -
     * @property {string} active -
     */
    user: {
      required: true,
      type: Object,
    },
    contactButtons: {
      type:Boolean,
      default:true,
    }
  },

  computed: {
    isOnline() {
      if (!this?.user?.id) return false;
      return this.$store.state.employee.activeEmployees[this.user?.id];
    },
    truncateText(){
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
      return 32;
    } else {
      return 28;
    }
  }
  },
  methods: {
    sendMail(mail) {
      window.location.href = "mailTo:" + mail;
    },
    sendMeet(event) {
      this.$emit("sendMeet", event);
    },
  },
};
</script>
<style lang="scss">
.userCard {
  display: none;
  position: absolute;
  padding: 24px;
  background-color: $white;
  z-index: 200000;
  border-radius: 10px;
  // width: 350px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 24%);
  .user_card_detail {
    display: block;
    max-width: 300px;
    label {
      font-weight: 600;
      color: $black;
      display: flex;
      font-size: 16px !important;
      flex-direction: column;
      text-transform: capitalize;
      span {
        font-weight: 400;
        font-size: 14px !important;
        padding: 1px 0 3px 0;
        color: #6a6d76;
      }
    }
    .card_info {
      font-size: 14px;
      .email {
        text-decoration: underline;
        color: #6a6d76;
      }
      .phone_color {
        color:  $primary;
      }
      p {
        padding: 1px 0;
        margin: 0px;
        font-size: 14px;
        font-weight: 400;
        // text-decoration: underline;
        line-height: 25px;
      }
      .button-wrapper-punch {
        padding: 3px 0;
        margin-left: -3px;
        span {
          border-radius: 16px;
          padding: 4px 8px;
          background-color: #eee;

          &.online {
            background-color: #d6f6d5;
            color: $success;
          }
        }
      }
    }
  }
}
</style>
