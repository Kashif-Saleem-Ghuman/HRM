<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="userList"
    @item-clicked="handleItemClick_Table"
    :hide-no-column="true"
  >
    <template #cell(name)="data">
      <div class="d-flex align-center text-left gap-05">
        <bib-avatar
          class="mt-auto mb-auto"
          shape="circle"
          :src="data.value.avatar"
          size="3rem"
        >
        </bib-avatar>
        <div class="info_wrapper">
          <div class="title">
            {{ data.value.firstName  }} {{ data.value.lastName  }}
          </div>
          <div class="description">
            {{ data.value.title }}
          </div>
        </div>
      </div>
    </template>
    <template #cell(department)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.department }}</span>
      </div>
    </template>
    <template #cell(presence)="data">
      <div class="justify-center text-dark">
        <circle-text
        :title="data.value.attendance ==null ? 'N/A' : data.value.attendance + '%'"
          :className="[
            data.value.attendance >= 70 ? 'variant_green' : '',
            data.value.attendance < 70 ? 'variant_yellow' : '',
            data.value.attendance < 35 ? 'variant_light_pink' : '',
            data.value.attendance < 20 ? 'variant_gray' : '',
          ]"
        ></circle-text>
      </div>
    </template>
    <template #cell(attendance)="data">
      <div class="justify-center text-dark">
        <chips
        :title="data.value.attendance ==null ? 'N/A' : data.value.attendance + '%'"
        shapeCircle="__shape-circle"
        :className="[
        data.value.attendance >= 70 ? 'chip-wrapper__bgsucess' : '' ,
        data.value.attendance <= 70 ? 'chip-wrapper__bgabsent' : '' ,
        data.value.attendance <= 35 ? 'chip-wrapper__bgabsentpink' : '',
        data.value.attendance <= 20 ? 'chip-wrapper__bggray' : ''
      ]"
        ></chips>
      </div>
    </template>
    <template #cell(satisfaction)="data">
      <div class="justify-center text-dark">
        <chips
        shapeCircle="__shape-circle"
        :title="data.value.satisfaction ==null ? 'N/A' : data.value.satisfaction + '%'"
        :className="[
        data.value.satisfaction >= 70 ? 'chip-wrapper__bgsucess' : '', 
        data.value.satisfaction < 80 ? 'chip-wrapper__bgabsent' : '' ,
        data.value.satisfaction <= 35 ? 'chip-wrapper__bgabsentpink' : '', 
        data.value.satisfaction <= 20 ? 'chip-wrapper__bggray' : '',
      ]"
        ></chips>
      </div>
    </template>
    <template #cell(performance)="data">
      <div class="justify-between text-dark">
        <!-- <span>{{ data.value.performance }}</span> -->
        <star-rating
          :round-start-rating="false"
          :border-width="0"
          :star-size="18"
          :show-rating="false"
          :rating="data.value.performance"
          :read-only="true"
          :active-color="['#E6000E', '#000', '#FFC130', '#6BBF68']"
          :active-border-color="['#F6546A', '#a8c3c0']"
          :clearable="true"
          active-on-click
          :padding="0"
        ></star-rating>
      </div>
      
    </template>
  </custom-table>
</template>

<script>
import { TABLE_FIELDS, TABLE_FIELDS_DIR } from "../../../utils/constant/Constant.js";
import { StarRating } from "../StarRating/StarRating.vue";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: '',
      attendanceClass: [],
      satisfaction: "",
    };
  },
  created(){
    if (this.$router.history.current.fullPath == "/people") {
        this.tableFields = TABLE_FIELDS
        return;
      }
      if (this.$router.history.current.fullPath == "/people/directory") {
        this.tableFields = TABLE_FIELDS_DIR
        return;
      }
  },
  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push('/myprofile/' + item.id)
    },
    handleAction_Table(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
.info_wrapper {
  color: $black;
  font-weight: normal;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $black;
}

.variant_green {
  background: #d6f7d5;
}

.variant_yellow {
  background: #f7f3d5;
}

.variant_light_pink {
  background: #f6d5d5;
}

.variant_gray {
  background: #f2f2f5;
}
</style>
