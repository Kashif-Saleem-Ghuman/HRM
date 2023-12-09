<template>
  <div>
    <div class="list" v-if="onlyMenuItems">
      <span
        class="list__item"
        v-for="(item, index) in items"
        @click="$emit('click', item)"
      >
        <div class="d-flex align-center mb-1 mt-1">
          <bib-icon
            variant="primary"
            v-if="item.icon"
            :icon="item.icon"
            :scale="0.9"
          ></bib-icon>
          <span class="ml-05">{{ item.label }}</span>
        </div>
      </span>
    </div>
    <div
      class="shape-circle bg-secondary-sub3 width-2 height-2 d-flex justify-center align-center ml-05"
      v-if="dropDowmMenu"
    >
      <bib-popup pop="arrowhead-down" :scale="1">
        <template v-slot:menu>
          <div class="list">
            <span
              class="list__item"
              v-for="(item, index) in items"
              @click="$emit('click', item)"
            >
              <div class="d-flex align-center mb-1 mt-1">
                <bib-icon
                  variant="primary"
                  v-if="item.icon"
                  :icon="item.icon"
                  :scale="0.9"
                ></bib-icon>
                <span class="ml-05">{{ item.label }}</span>
              </div>
            </span>
          </div>
        </template>
      </bib-popup>
    </div>

    <div class="action-menu-wrapper">
      <template>
        <div
          class="shape-rounded bg-secondary-sub3 width-2 height-2 d-flex justify-center align-center ml-05 cursor-pointer;"
          @click="showMenuItems"
          v-click-outside="clickOutside"
          style="cursor: pointer;"
        >
          {{filterLabel}}
        </div>
        <template>
          <div class="action-menu-items" v-show="showMenu">
            <ul>
              <li class="d-flex align-center checkbox">
                <input
                  class="mr-05"
                  type="checkbox"
                  id="selectAll"
                  value="nasdnas,dnasd,n"
                  v-model="checkAll"
                />
                <label for="selectAll">All</label>
              </li>
              <li class="d-flex align-center checkbox" v-for="c in items">
                <input
                  type="checkbox"
                  :id="c.key"
                  class="mr-05"
                  v-model="checked"
                  :value="c.label"
                  @click="$emit('click', c.key)"
                />
                <label :for='c.key' @click="$emit('click', c)">{{ c.label }}</label>
              </li>
            </ul>
          </div>
        </template>
      </template>
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
    dropDowmMenu: {
      type: String,
    },
    onlyMenuItems: {
      type: String,
    },
    actionMenu: {
      type: String,
    },
    popIcon: {
      type: String,
    },
    allChecked: {
      type: String,
    },
    filterLabel:{
      type:String
    }
  },
  data() {
    return {
      showMenu: false,
      checked: [],
    };
  },
  computed: {
    checkAll: {
      get: function () {
        return this.items ? this.checked.length == this.items.length : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.items.forEach(function (c) {
            checked.push(c.label);
          });
        }
        this.checked = checked;
      },
    },
  },
  methods: {
    showMenuItems() {
      this.showMenu = !this.showMenu;
    },
    clickOutside(){
      this.showMenu = false
    },
  },
};
</script>
<style lang="scss">
.button--drop .menu details .wrapper ul li[data-v-3cac2eae] {
  position: static;
  padding: 0 0.5rem !important;
  margin: 0 0.2rem !important;
}
.action-menu-wrapper {
  position: relative;
  .action-menu-items {
    padding-left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    text-align: left;
    border-radius: 0.5rem;
    background-color: #000;
    z-index: 10000;
    padding: 0 10px;
    ul {
      margin: 0;
      padding: 0 15px 0 10px;
      position: absolute;
      right: 1px;
      background-color: #fff;
      border-radius: 0.5rem;
      border: #f0f4f8 solid 1px;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
    }
    li {
      cursor: pointer;
      padding: 5px 0;
    }
    .checkbox {
      input {
        display: flex;
        width: 1rem;
        height: 1rem;
        border-radius: 0.25rem;
      }
    }
  }
}
</style>
