<template>
    <div>
        <div class="d-flex align-center">
              <bib-avatar
                class="mt-auto mb-auto mr-05"
                shape="circle"
                :src="src"
                size="5rem"
              ></bib-avatar>
              <div>
                <div class="user_card_detail">
                  <label
                    >{{ firstName }} {{ lastName }}
                    <span>
                      {{ jobTitle }}
                    </span>
                  </label>
                  <div class="card_info">
                    <div style="padding: 2px 0">
                      <chips
                        title="Punched in [online]"
                        variant="__bgsucess"
                      ></chips>
                    </div>
                    <p style="text-decoration: underline">
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
                  pill
                  v-on:click="$emit('viewProfile')"
                ></bib-button>
                <bib-button
                  label="Send Message"
                  variant="success"
                  class="ml-auto"
                  pill
                  v-on:click="$emit('sendInvite')"
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
