<template>
  <div class="shape-circle bg-gray3 width-2 height-2 d-flex justify-center align-center">
    <bib-button pop="horizontal-dots" scale="1">
      <template v-slot:menu>
        <div class="list" v-for="(item, index) in items">
          <span class="list__item" @click="$emit('click', item)">{{item.label}}</span>
        </div>
      </template>
    </bib-button>
  </div>
</template>

<script>
export default {
  name: "DropdownMenu",
  props: {
    items:{
        type:Array
    }
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
