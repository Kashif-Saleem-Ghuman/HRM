<template>
    <div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));"
      class="widgets-container d-grid gap-2 px-2 py-2"
    >
      <div v-for="widget in widgets" :key="widget.key" class="widget d-flex">
        <div class="widget-container">
          <div>
            <label>{{ widget.title }}</label>
          </div>
          <div class="widget-info mt-05">
            <div>
              <div class="widget-info__subheading">{{ widget.subheading }}</div>
              <span>{{ widget.value }}</span>
            </div>
          </div>
          <div>
            <bib-button
              :label="widget.showingAll ? `Showing all ${widget.title}` : 'Show All'"
              :variant="widget.showingAll ? 'primary' : isLightThemeCheck ? 'light' : 'secondary'"
              @click="handleClick(widget)"
              class="w-100 button-wrapper-align"
            ></bib-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getAdminWidget } from "@/utils/functions/api_call/timeattendance/time";
  import { WIDGETS } from "@/utils/constant/widgetConstants";
  
  export default {
    data() {
      return {
        widgets: [],
      };
    },
  
    methods: {
      async fetchData() {
        const data = await getAdminWidget();
        if (data) {
          this.widgets = WIDGETS.map(widget => ({
            ...widget,
            value: data[widget.key] || 0,
            showingAll: false,
          }));
        }
      },
      handleClick(clickedWidget) {
    if (clickedWidget.key === 'pending_timesheets_count') {
      this.$router.push('/time-attendance/attendance/');
    } else {
      this.widgets.forEach(widget => {
        if (widget.key === clickedWidget.key) {
          widget.showingAll = !widget.showingAll;
        } else {
          widget.showingAll = false;
        }
      });
      this.$emit('clickedWidget', clickedWidget.actionKey);
    }
  },

    },
  
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style lang="scss">
  $text-font-size: 14px;
  .widget-container {
    width: 100%;
    height: 100%;
    padding: 24px;
    font-size: $text-font-size;
    border-radius: 24px;
    background-color: $white;
    border: 1px solid var(--bib-secondary-sub3);
  
    label {
      font-size: 1rem;
      font-weight: 600;
    }
  
  }
  </style>
  