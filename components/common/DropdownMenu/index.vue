<template>
        <div class="list">
          <span class="list__item" v-for="(item, index) in items">
            <div class="d-flex align-center  mb-1 mt-1">
              <bib-icon
                variant="success"
                v-if="item.icon"
                :icon="item.icon"
                :scale="0.9"
              ></bib-icon>
              <span class="ml-05" @click="$emit('click', item)">{{
                item.label
              }}</span>
            </div>
          </span>
        </div>
      </template>

<script>
export default {
  name: "DropdownMenu",
  props: {
    items: {
      type: Array,
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
