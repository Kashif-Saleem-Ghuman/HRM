<template>
  <div>
    <div class="d-flex">
      <bib-avatar
        class="mr-1"
        shape="circle"
        :src="src"
        size="5rem"
      ></bib-avatar>
      <div>
        <div class="user_card_detail align-center d-flex">
          <label
            >{{ firstName }} {{ lastName }}
            <span>
            {{ jobTitle }}
            </span>
          </label>
          <div class="card_info">
            <div class="button-wrapper-punch" style="margin-left: -3px;">
              <span v-on:click="$emit('punchedIn')"> Punched in (online)</span>
            </div>
            <p class="email">
              {{ email }}
            </p>
            <p class="phone_color">{{ phone }}</p>
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
    src: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  methods: {
    employeModal() {
      alert("employe called");
    },
    employee() {
      alert("import called");
    },
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
        span {
          background-color: #D6F6D5;
          border-radius: 16px;
          padding: 4px 8px;
          color: #2ba026;
        }
      }
    }
  }
}
</style>
