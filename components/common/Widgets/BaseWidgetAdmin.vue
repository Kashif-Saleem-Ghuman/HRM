<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    "
    class="widgets-container d-grid gap-2 px-2 py-2"
  >
    <div
      v-for="widget in filteredWidgets"
      :key="widget.key"
      class="widget d-flex"
    >
      <div class="widget-container">
        <div>
          <label>{{ widget.title }}</label>
        </div>
        <div class="widget-info mt-05">
          <div>
            <div class="widget-info__subheading">{{ widget.subheading }}</div>
            <span>{{ widget.value }}</span>
          </div>
          <div v-if="progressCountShow">
            <progress-circle
              :progressCount="getPercentageValue(widget)"
              :progressPercentage="`${getPercentageValue(widget)}%`"
              :fill="fill"
              emptyfill="#f1f1f1"
              :key="progressKey"
            ></progress-circle>
          </div>
        </div>

        <div class="widget-avatars-container-bottom pt-1 mb-2">
          <div
            v-for="avatar in widget.avatars.slice(0, MAX_VISIBLE_AVATARS)"
            :key="avatar.id"
            class="cursor-pointer"
          >
            <NuxtLink :to="`/profile/${avatar.id}`">
              <div class="avtar-contain">
                <bib-avatar
                :src="avatar.photo"
                size="1.5rem"
                :text="avatar.photo ? null : $getEmployeeInitials(avatar)"
              ></bib-avatar>
              </div>
            </NuxtLink>
          </div>
          <div
            v-if="widget.avatars.length > MAX_VISIBLE_AVATARS"
            class="d-flex align-center"
            style="position: relative"
            @mouseover="showEmployeeList(widget.key)"
            @mouseout="hideEmployeeList"
            v-click-outside="hideEmployeeList"
          >
            <span
              class="avatar__text mr-025 cursor-default position-relative cursor-pointer"
            >
              ... {{ widget.avatars.length - MAX_VISIBLE_AVATARS }} more
              <div
                class="list position-absolute shape-rounded"
                v-show="employeeList[widget.key]"
                :class="
                  isLightThemeCheck
                    ? 'bg-dark border-light'
                    : 'bg-dark border-dark-sub3'
                "
              >
                <div
                  class="list__item"
                  :class="
                    isLightThemeCheck
                      ? 'bg-white bg-hover-gray3'
                      : 'bg-dark bg-hover-dark-sub1'
                  "
                  v-for="avatar in widget.avatars.slice(MAX_VISIBLE_AVATARS)"
                  :key="avatar.id"
                  @mouseout="hideEmployeeList"
                >
                  <NuxtLink :to="`/profile/${avatar.id}`">
                    <div class="d-flex align-center">
                      <bib-avatar
                        :src="avatar.photo"
                        size="1.5rem"
                        class="mr-05 avtar-contain"
                        
                        :text="
                          avatar.photo ? null : $getEmployeeInitials(avatar)
                        "
                      ></bib-avatar>
                      <div
                        :class="isLightThemeCheck ? 'text-gray1' : 'text-light'"
                      >
                        {{ $getEmployeeFullName(avatar) | truncate(25, "...") }}
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div>
          <bib-button
            :label="
              widget.showingAll ? `Showing all ${widget.title}` : 'Show All'
            "
            :variant="
              widget.showingAll
                ? 'primary'
                : isLightThemeCheck
                ? 'light'
                : 'secondary'
            "
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
import { WIDGETS } from "@/utils/constant/WidgetConstants";
import { DateTime } from "luxon";

export default {
  props: {
    visibleWidgetKeys: {
      type: Array,
      default: () => [],
    },
    totalData: {
      type: Array,
    },
    progressCountShow: {
      type: Boolean,
    },
    activeWidgetKey: {
      type: String,
    },
  },
  data() {
    return {
      widgets: [],
      getCurrentDate: DateTime.now().toFormat("yyyy-MM-dd"),
      fill: { gradient: ["#ffb700", "#47b801"] },
      progressKey: 0,
      employeeList: {},
      MAX_VISIBLE_AVATARS: 3,
      widgetsData: null
    };
  },
  computed: {
    filteredWidgets() {
      this.progressKey += 1;
      if (!this.visibleWidgetKeys || this.visibleWidgetKeys.length === 0) {
        return this.widgets;
      }
      const widgetKeys = this.visibleWidgetKeys;

      // Update avatars based on widget key
      this.updateAvatars(widgetKeys);

      return this.widgets.filter((widget) => widgetKeys.includes(widget.key));
    },
  },
  methods: {
    async fetchData() {
      const data = await getAdminWidget();
      this.widgetsData = data;
      if (data) {
        this.widgets = WIDGETS.map((widget) => ({
          ...widget,
          value: data[widget.key] || 0,
          showingAll: false,
          avatars: [],
        }));

        this.updateAvatars(this.visibleWidgetKeys);
      }
    },
    handleClick(clickedWidget) {
      if (clickedWidget.key === "pending_timesheets_count") {
        this.$router.push("/time-attendance/pending/");
      } else if (clickedWidget.key === "pending_requests_count") {
        this.$router.push("/leaves-and-vacations/pendingrequest/");
      }

      let matchedWidget = null;
      this.widgets.forEach((widget) => {
        if (widget.key === clickedWidget.key) {
          widget.showingAll = !widget.showingAll;
          matchedWidget = widget;
        } else {
          widget.showingAll = false;
        }
      });

      const widg = this.widgets.find(widget => widget.showingAll);
      if(widg) {
        this.$emit("clickedWidget", widg.actionKey, widg.actionValue);
        this.$emit("update:activeWidgetKey", widg.actionKey);
      }else {
        this.$emit("clickedWidget");
        this.$emit("update:activeWidgetKey", null);
      }
    },
    getPercentageValue(widget) {
      const totalEmployees = this.totalData.length;
      return totalEmployees > 0 && widget.value >= 0
        ? Math.round((widget.value / totalEmployees) * 100)
        : 0;
    },
    showEmployeeList(widgetKey) {
      this.$set(this.employeeList, widgetKey, true);
    },
    hideEmployeeList() {
      this.employeeList = {};
    },
    updateAvatars(widgetKeys) {
      this.widgets.forEach((widget) => {
        if (widgetKeys.includes(widget.key)) {
          if (widget.key === "employees_present_count") {
            widget.avatars =
              this.widgetsData?.employeesPresent || [];
          } else if (widget.key === "employees_absent_count") {
            widget.avatars =
              this.widgetsData?.employeesAbsent || [];;
          } else if (widget.key === "employees_on_leave_count") {
            widget.avatars =
              this.widgetsData?.employeesOnLeave || [];
          }
        }
      });
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