<template>
  <div>
    <div class="d-flex">
      <bib-avatar
        class="mr-05"
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
            <div class="button-wrapper-punch">
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
          variant="success"
          class="mr-05"
          v-on:click="sendMeet()"
        ></bib-button>
        <bib-button
          label="Send Message"
          variant="success"
          v-on:click="sendMessage()"
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
    sendMeet(){
      window.open('https://dev-connect.business-in-a-box.com/', "_blank")
    },
    sendMessage(){
      window.open('https://dev-chat.business-in-a-box.com/', "_blank")
    }
  },
};
</script>
<style lang="scss">
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
    font-size: 1rem;
    label {
      font-weight: 600;
      color: #000;
      display: flex;
      flex-direction: column;

      span {
        font-weight: 400;
        padding: 1px 0 3px 0;
        color: #6a6d76;
      }
    }
    .card_info {
      font-size: 14px;
      .email {
        text-decoration: underline;
      }
      .phone_color {
        color: #1f42a2;
      }
      p {
        padding: 1px 0;
        margin: 0px;
      }
      .button-wrapper-punch {
        padding-top: 5px;
        span {
          background-color: #d5e8d4;
          border-radius: 6px;
          padding: 5px 10px;
          color: #2ba026;
        }
      }
    }
  }
}
</style>
