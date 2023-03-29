<template>
  <div class="table-wrapper">
    <div class="header">
      <p>This is a Table</p>
    </div>
    <div class="thead">
      <div class="Cell" v-for="(field, key) in tableFields">
        <p>{{ field.label }}</p>
      </div>
    </div>
    <div class="Row" v-for="(field, key) in userListTimesheet">
      <div class="Cell">
        <p>{{ field.activity }}</p>
      </div>
      <div class="cell">
        <p>{{ field.start }}</p>
      </div>
      <div class="cell">
        <p>{{ field.end }}</p>
      </div>
      <div class="cell">
        <p>{{ field.total }}</p>
      </div>
      <!-- <div class="cell">
        <bib-icon icon="trash" :scale="0.9"></bib-icon>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
export default {
  props: {
    userListTimesheet: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadTimesheetModal,
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
  },
  // created() {
  //   if (this.$router.history.current.fullPath == "/people") {
  //     this.tableFields = TABLE_HEAD.tHeadPeople;
  //     return;
  //   }

  //   if (this.$router.history.current.fullPath == "/people/directory") {
  //     this.tableFields = TABLE_FIELDS_DIR;
  //     return;
  //   }
  // },
  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
    }),
  },
  mounted() {
    console.log(this.getTeamListOptions, "Team List");
  },
  methods: {},
};
</script>

<style lang="scss">
.table-wrapper {
  display: table;
  .header {
  display: table-caption;
  text-align: center;
  font-weight: bold;
  font-size: larger;
}
.thead {
  display: table-row;
  font-weight: bold;
  text-align: center;
}
.Row {
  display: table-row;
}
.Cell {
  display: table-cell;
  border: solid;
  border-width: thin;
  padding-left: 5px;
  padding-right: 5px;
}
}

</style>
