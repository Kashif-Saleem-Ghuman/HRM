<template>
  <div class="info-card-success-wrapper">
    <div>
      <label>Leave status</label>
    </div>
    <div class="info-card-inner-wrapper">
        <div
      class="d-flex align-center cursor-pointer text-success bg-success-sub6 bg-hover-success-sub3 shape-circle mr-05" style="padding: 12px;"
      @click.stop="$emit('on-click')"
    >
      <bib-icon
        icon="tick"
        variant="success"
        :scale="1"
      ></bib-icon>
    </div>
      <div>
        <label>Approved</label>
        <div>
          Request Approved on 04-04-2023 by shweta S.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chips",
  props: {
    label: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    items: {
      type: Array,
    },
    profilePic: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.info-card-success-wrapper {
  padding: 12px 0;
  font-size: 14px;
  
  label {
    font-size: 1rem;
    font-weight: 600;
  }
  .info-card-inner-wrapper {
    display: flex;
    background-color: $light;
    align-items: center;
    color: #2ba026;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
    label {
      font-weight: 700;
    }
    &_desc {
      font-size: 10px;
    }
  }
}
</style>
