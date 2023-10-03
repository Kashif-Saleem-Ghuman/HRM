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
          <label
            >{{ user.firstName }} {{ user.lastName }}
            <span>
            {{ user.jobTitle }}
            </span>
          </label>
          <div class="card_info">
            <div class="button-wrapper-punch">
              <span :class="{online: isOnline}" v-on:click="$emit('punchedIn')">{{  isOnline ? 'Punched in (online)' : 'Offline' }}</span>
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
          variant="light"
          class="mr-05"
          v-on:click="$emit('viewProfile')"
        ></bib-button>
        <bib-button
          label="Meet"
          variant="light"
          class="mr-05"
          v-on:click="$emit('sendMeet')"
        ></bib-button>
        <bib-button
          label="Send Message"
          variant="success"
          v-on:click="$emit('sendMessage')"
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
      type: Object
    }

  },

  computed: {
    isOnline() {
      if (!this.user) return false
      if (this.user.presence && this.user.presence == 'in' ) return true
      if (this.user.active) return true

      return false
    }
  },
  methods: {
    sendMail(mail){
      window.location.href= 'mailTo:'+mail
    }
  },
};
</script>
<style lang="scss">
.userCard {
  display: none;
  position: absolute;
  padding: 24px;
  background-color: #fff;
  z-index: 200000;
  border-radius: 10px;
  // width: 350px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 24%);
  .user_card_detail {
    display: block;
    
    label {
      font-weight: 600;
      color: #000;
      display: flex;
      font-size: 16px !important;
      flex-direction: column;
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
        color: #6A6D76;
      }
      .phone_color {
        color: #1f42a2;
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
            background-color: #D6F6D5;
            color: #2ba026;
          }

          
        }
      }
    }
  }
}
</style>
