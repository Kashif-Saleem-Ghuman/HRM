<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{
      table__headless: headless,
      resizableTable: resizableColumns,
      'table--light': isLightThemeCheck,
      'table--dark': !isLightThemeCheck,
    }"
    :fixHeader="true"
    cellspacing="0"
  >
    <template>
      <tr class="table__hrow" :class="fixHeader ? 'table__hrow-fixed' : ''">
        <th
          v-for="(field, key) in fields"
          :key="key"
          :style="`width: ${field.width};`"
          @click="clickColumnHeader($event, key)"
          :class="{
            table__hrow__active:
              field.header_icon && field.header_icon.isActive,
          }"
        >
          <div
            class="align-center"
            :class="{ 'cursor-pointer': $listeners['column-header-clicked'] }"
          >
            <span>{{ field.label }}</span>
            <template v-if="field.header_icon">
              <div
                v-if="field.header_icon.icon"
                @click="
                  field.header_icon.event && $emit(field.header_icon.event)
                "
                class="ml-05 shape-rounded bg-hover-black width-105 height-105 d-flex justify-center align-center cursor-pointer"
                :class="{ 'bg-black': field.header_icon.isActive }"
              >
                <bib-icon
                  :icon="field.header_icon.icon"
                  :scale="1.1"
                  variant="gray5"
                  hoverVariant="white"
                >
                </bib-icon>
              </div>
            </template>
          </div>
        </th>
        <th v-if="$scopedSlots.cell_action" class="cell_action_header">
          <div class="d-flex justify-center align-center">
            <bib-icon icon="horizontal-dots"></bib-icon>
          </div>
        </th>
      </tr>
    </template>
    <template v-for="(collapseObj, collapseIndex) in localCollapseObjs">
      <tr :key="`collapse-${collapseIndex}`">
        <td colspan="2">
          <bib-detail-collapse
            :label="collapseObj.label"
            :open="!collapseObj.isCollapsed"
            :variant="collapseObj.variant"
            @click="toggleCollapse(collapseIndex)"
            style="transform: translateX(-10px)"
          >
          </bib-detail-collapse>
        </td>
      </tr>
      <template v-for="(item, itemIndex) in collapseObj.sections">
        <tr
          :key="`item-${collapseIndex}-${itemIndex}`"
          :style="{ visibility: collapseObj.isCollapsed ? 'collapse' : '' }"
          class="table__irow"
          @contextmenu.stop="rightClickItem($event, collapseIndex, itemIndex)"
          @click="$emit('item-clicked', $event, collapseIndex, itemIndex, item)"
          @dblclick="clickItem($event, collapseIndex, itemIndex)"
          :id="`item-${collapseIndex}-${itemIndex}`"
        >
          <td
            v-for="(field, fieldIndex) in fields"
            :key="`field-${collapseIndex}-${itemIndex}-${fieldIndex}`"
          >
            <div
              v-if="$scopedSlots[`cell(${field.key})`]"
              :class="{ 'h-100 align-center': centerCellY }"
            >
              <slot
                :name="`cell(${field.key})`"
                v-bind:keyI="itemIndex"
                v-bind:value="item"
              >
              </slot>
            </div>
          </td>
          <td v-if="$scopedSlots.cell_action">
            <slot
              name="cell_action"
              v-bind:keyI="itemIndex"
              v-bind:value="item"
            >
            </slot>
          </td>
        </tr>
      </template>
    </template>
  </table>
</template>

<script>
export default {
  name: "BibTable",
  props: {
    resizableColumns: {
      type: Boolean,
      default: false,
    },
    headless: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    collapseObjs: {
      type: Array,
      default: () => [],
    },
    fixHeader: {
      type: Boolean,
      default: false,
    },
    centerCellY: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localCollapseObjs: JSON.parse(JSON.stringify(this.collapseObjs)),
      isCollapsed: false,
    };
  },
  watch: {
    collapseObjs: {
      handler(newVal) {
        this.localCollapseObjs = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    toggleCollapse(index) {
      this.$set(this.localCollapseObjs, index, {
        ...this.localCollapseObjs[index],
        isCollapsed: !this.localCollapseObjs[index].isCollapsed,
      });
      this.$emit("change-open-collapse", this.localCollapseObjs[index].value);
    },
    clickItem($event, collapseIndex, itemIndex) {
      this.$emit(
        "item-dblclicked",
        $event,
        this.localCollapseObjs[collapseIndex].sections[itemIndex]
      );
      this.unselectAll();
      document
        .getElementById(`item-${collapseIndex}-${itemIndex}`)
        .classList.toggle("active");
    },
    unselectAll() {
      let rows = document.getElementsByClassName("table__irow");
      for (let row of rows) {
        row.classList.remove("active");
      }
    },
    rightClickItem(event, collapseIndex, itemIndex) {
      this.$emit("item-right-clicked", {
        event: event,
        row: this.localCollapseObjs[collapseIndex].sections[itemIndex],
      });
    },
    clickColumnHeader(event, key) {
      this.$emit("column-header-clicked", {
        event: event,
        column: this.fields[key],
      });
    },
  },
};
</script>
