<template>
  <div id="profile-info-wrapper" class="static_display">
    <div class="row mx-0">
      <div class="col-6">
        <div>
          <label>First Name</label>
          <p>{{ firstname }}</p>
        </div>
      </div>
      <div class="col-6">
        <label>Last Name</label>
        <p>{{ lastname }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Personal email address <span>•</span></label>
        <p>{{ email }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Personal mobile number <span>•</span> </label>
        <p>{{ mobile }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Info",
  props: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
};
</script>
<style lang="scss">
.static_display {
  label {
    font-size: 12px;
    display: block;
    font-weight: 600;
    span {
      color: red;
    }
  }
  p {
    font-size: 16px;
    margin: 0 0 24px 0;
    line-height: 40px;
    align-items: center;
    font-weight: 500;
    border-bottom: 1px solid #e8e8eb;
    color: #1d1d20;
  }
}
</style>
