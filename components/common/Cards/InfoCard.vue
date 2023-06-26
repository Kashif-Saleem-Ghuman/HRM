<template>
  <div class="d-grid gap-1" style="grid-template-columns: repeat(4, 1fr)">
    <div class="info-card-wrapper" v-for="(item, index) in items">
      <div>
        <label>{{ item.title }}</label>
      </div>
      <div class="info-card-items">
        <div>
          <label>{{ item.numberData }}</label>
        </div>
      </div>
      <div style="margin-left: -2px;" class="mt-05 mb-1">
          <bib-avatar src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" size="2rem"></bib-avatar>
          <bib-avatar src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"></bib-avatar>
          <bib-avatar src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" size="2rem"></bib-avatar>
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
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.info-card-wrapper {
  padding: 12px 12px 0px 12px;
  font-size: 14px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e2e3;
  overflow-wrap: break-word;
  label {
    font-size: 1rem;
    font-weight: 600;
  }
  .info-card-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      font-size: 40px;
      font-weight: 700;
    }
    &_desc {
      font-size: 10px;
    }
  }
}
</style>
