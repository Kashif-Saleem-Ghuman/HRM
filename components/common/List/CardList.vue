<template>
  <div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      "
      class="d-grid gap-2 px-2 py-2"
    >
      <div v-for="(item, index) in userList" :key="index">
        <bib-board-card :isLightTheme="isLightThemeCheck">
          <template #new_contact_section>
            <bib-button
              label="Birthday"
              variant="success"
              class="mb-1"
            ></bib-button>
          </template>
          <template #card_menu>
            <bib-popup pop="horizontal-dots" icon-variant="secondary">
              <template v-slot:menu>
                <div class="list" @click.stop>
                  <span class="list__item">option1</span>
                  <span class="list__item danger">option2</span>
                </div>
              </template>
            </bib-popup>
          </template>
          <template #user_data>
            <div class="d-flex pb-1" :class="isLightThemeCheck ? 'border-bottom-gray2' : 'border-bottom-dark-sub1'">
              <div style="min-width: 70px">
                <bib-avatar
                  variant="secondary-sub2"
                  :text="getEmployeeInitials(item)"
                  text-variant="primary"
                  size="4rem"
                  v-show="item.photo === null"
                ></bib-avatar>
                <bib-avatar
                  class="mt-auto mb-auto"
                  shape="circle"
                  :src="item.photo"
                  v-show="item.photo != null"
                  size="4rem"
                >
                </bib-avatar>
              </div>

              <div class="ml-05">
                <label
                  class="font-w-600"
                  :class="isLightThemeCheck ? 'text-dark' : 'text-white'"
                >
                  {{ getEmployeeFullName(item) }}
                </label>
                <div
                  class="font-sm font-w-500"
                  :class="isLightThemeCheck ? 'text-dark1' : 'text-gray4'"
                >
                  {{ item.jobTitle }}
                </div>
                <div
                  class="font-md font-w-500"
                  :class="isLightThemeCheck ? 'text-dark1' : 'text-gray4'"
                >
                  <a :href="'mailto:' + item.email">{{ item.email }}</a>
                </div>
              </div>
            </div>
          </template>
          <template #card_footer>
            <div class="d-flex gap-05">
              <div
                class="bg-gray2 p-05 shape-circle d-flex align-center space-between"
              >
                <bib-icon icon="chat" variant="primary"></bib-icon>
              </div>
              <div
                class="bg-gray2 p-05 shape-circle d-flex align-center space-between"
              >
                <bib-icon icon="phone" variant="primary"></bib-icon>
              </div>
            </div>
          </template>
        </bib-board-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getEmployees } from "@/utils/functions/api_call/employees";
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "@/utils/functions/common_functions";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      employees: [],
      loading: true,
    };
  },

  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      activeTabSidebar: "token/getActiveTab",
    }),
  },
  mounted() {
    // this.getOrganizationEntries();
  },

  methods: {
    getEmployeeFullName,
    getEmployeeInitials,
    async getOrganizationEntries() {
      this.loading = true;
      const data = await getEmployees();
      const employees = data.employees;

      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
  },
};
</script>
