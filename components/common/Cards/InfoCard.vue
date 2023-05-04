<template>
  <div class="d-grid gap-1" style="grid-template-columns: repeat(4, 1fr)">
    <div class="info-card-wrapper" v-for="(item, index) in items">
      <div>
        <label>{{ item.title }}</label>
      </div>
      <div class="info-card-items">
        <div>
          <bib-avatar src="https://placekitten.com/300/300" size="2rem"></bib-avatar>
          <!-- <bib-avatar src="https://placekitten.com/300/300"></bib-avatar> -->
        </div>
        <div>
          <label>{{ item.numberData }}</label>
        </div>
      </div>
      <div class="info-card-items_desc">{{ item.desc }}</div>
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
  padding: 12px;
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
