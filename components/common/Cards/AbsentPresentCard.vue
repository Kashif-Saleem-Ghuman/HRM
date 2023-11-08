<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>{{ item }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">{{ item.length }}</div>
          <span>{{ item.length }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  props: {
    title: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    item: {
      type: Object,
    },
    buttonLable: {
      type: String,
    },
    icon: {
      type: String,
    },
    buttonVariant: {
      type: String,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
    };
  },
  methods: {
    
  },
};
</script>

  