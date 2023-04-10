<template>
  <div>
    <div class="list" v-if="onlyMenuItems">
      <span class="list__item" v-for="(item, index) in items"  @click="$emit('click', item)">
        <div class="d-flex align-center mb-1 mt-1">
          <bib-icon
            variant="success"
            v-if="item.icon"
            :icon="item.icon"
            :scale="0.9"
          ></bib-icon>
          <span class="ml-05">{{
            item.label
          }}</span>
        </div>
      </span>
    </div>
    <div class="shape-circle bg-secondary-sub3 width-2 height-2 d-flex justify-center align-center ml-05" v-if="dropDowmMenu">
      <bib-popup :pop="popIcon" :scale="1">
        <template v-slot:menu>
          <div class="list">
          <span class="list__item" v-for="(item, index) in items"  @click="$emit('click', item)">
            <div class="d-flex align-center mb-1 mt-1">
              <bib-icon
                variant="success"
                v-if="item.icon"
                :icon="item.icon"
                :scale="0.9"
              ></bib-icon>
              <span class="ml-05">{{
                item.label
              }}</span>
            </div>
          </span>
          </div>
        </template>
      </bib-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownMenu",
  props: {
    items: {
      type: Array,
    },
    dropDowmMenu:{
      type:String
    },
    onlyMenuItems:{
      type:String
    },
    popIcon:{
      type:String
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
