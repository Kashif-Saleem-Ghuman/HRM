<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>{{ item.title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">{{ item.numLabel }}</div>
          <span>{{ item.numberData }}</span>

          <div class="subheading_footer">{{ item.daysDesc }}</div>
        </div>
        <div>
          <progress-circle
            :progressCount="item?.progress"
            :progressTitle="item?.progreesTitle"
            :progressPercentage="item?.progress + '%'"
            :fill="fill"
            v-show="item.progress == null ? '' : item.progress + '%'"
            emptyfill="#f1f1f1"
          ></progress-circle>
        </div>
        <div v-show="item.photo == null ? '' : item.photo">
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
        </div>
      </div>
      <div class="pt-1 d-block">
        <div>
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
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
    item: {
      type: Array,
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
    buttonAction(item) {
      alert("Called", item);
    },
  },
};
</script>
