<template>
  <div class="time-wrapper">
    <div class="d-flex gap-05">
      <!-- <div
        class="d-flex gap-05 align-center p-025 cursor-pointer bg-hover-gray2 shape-rounded"
        @click="addSection"
      >
        <bib-icon icon="add" variant="success" :scale="1.4"></bib-icon>
        <span class="text-dark"> New Section </span>
      </div> -->
    </div>
    <div v-for="(tableData, sec_index) in tableSectionsArray" :key="sec_index">
      <custom-table
        :fields="tableTaskFields"
        :sections="tableData.tasks"
        :collapseObj="{
          collapsed: false,
          label: tableData.title,
          variant: 'black',
        }"
        @item-clicked="handleTaskItemClick"
        hide-no-column
        :headless="sec_index > 0"
        class="bg-white border-top-gray4"
      >
        <template #cell(check)="data">
          <div class="d-flex gap-05 align-center">
            <bib-icon
              icon="check-circle"
              :scale="1.5"
              :variant="
                data.value.status === 'completed' ? 'success' : 'secondary-sub1'
              "
              class="cursor-pointer"
              @click="handleTaskStatus(sec_index, data)"
            ></bib-icon>
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.photo"
              size="3rem"
            ></bib-avatar>
            <div class="info_wrapper text-left">
              <div class="title">
                {{ data.value.firstName }} {{ data.value.lastName }}
              </div>
              <div class="description">
                {{ data.value.jobTitle }}
              </div>
            </div>
          </div>
          <div v-if="data.value.new_task" class="d-flex gap-05 align-center">
            <bib-input
              type="text"
              v-model="data.value.name"
              name="name"
              placeholder="Untitled Name"
              required
              @blur="pushTask(sec_index, data.keyI, data.value.name)"
            ></bib-input>
          </div>
        </template>
        <template #cell_action="data">
          <bib-checkbox size="md"></bib-checkbox>
        </template>
        <template #cell(name)="data">
          <div class="d-flex gap-05 align-center">
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.photo"
              size="3rem"
            ></bib-avatar>
            <div class="info_wrapper text-left">
              <div class="title">
                {{ data.value.firstName }} {{ data.value.lastName }}
              </div>
              <div class="description">
                {{ data.value.jobTitle }}
              </div>
            </div>
          </div>
          <div v-if="data.value.new_task" class="d-flex gap-05 align-center">
            <bib-input
              type="text"
              v-model="data.value.name"
              name="name"
              placeholder="Untitled Name"
              required
              @blur="pushTask(sec_index, data.keyI, data.value.name)"
            ></bib-input>
          </div>
        </template>
        <template #cell(presence)="data">
          <div class="d-flex gap-05 align-center" v-if="data.value.presence">
            <span class="text-dark">{{ data.value.presence }}</span>
          </div>
        </template>
        <template #cell(in)="data">
          <div class="d-flex gap-05 align-center">
            <bib-icon
              icon="time"
              :scale="0.8"
              :variant="
                data.value.status === 'completed' ? 'success' : 'secondary-sub1'
              "
              class="cursor-pointer"
              @click="handleTaskStatus(sec_index, data)"
            ></bib-icon>
            <span class="text-dark">{{ data.value.in }}</span>
          </div>
        </template>
        <template #cell(offbreak)="data">
          <span class="text-dark">{{
            data.value.offbreaks === null ? "..." : data.value.offbreaks
          }}</span>
        </template>
        <template #cell(out)="data">
          <bib-icon
            icon="time"
            :scale="0.8"
            :variant="
              data.value.status === 'completed' ? 'success' : 'secondary-sub1'
            "
            class="cursor-pointer"
            @click="handleTaskStatus(sec_index, data)"
          ></bib-icon>
          <span class="text-dark">{{ data.value.out }}</span>
        </template>
        <template #cell(total)="data">
          <span class="text-dark">{{
            data.value.total === null ? "..." : data.value.total
          }}</span>
        </template>
      </custom-table>
      <div class="bg-white w-100 p-025 border-bottom-gray4 border-top-white">
        <!-- <div
          class="d-flex align-center p-025 cursor-pointer bg-hover-gray2 shape-rounded w-fit gap-05"
          @click="addTask(sec_index)"
        > -->
        <div
          class="d-flex align-center p-025 cursor-pointer bg-hover-gray2 shape-rounded w-fit gap-05"
        >
          <bib-icon
            icon="add"
            variant="secondry"
            :scale="1.2"
            style="margin-left: 2px"
          ></bib-icon>
          <!-- <span class="text-dark"> New Task </span> -->
        </div>
      </div>
    </div>
    <div v-if="isNewSectionInput" class="d-flex gap-05 align-center">
      <bib-input
        type="text"
        v-model="newSectionName"
        name="section-name"
        placeholder="Untitled Section"
        required
        input_id="new_sec_input"
        @blur="pushSection()"
      ></bib-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      isNewSectionInput: false,
      newSectionName: "",
      tableTaskFields: [
        {
          key: "",
          label: "#",
        },

        {
          key: "name",
          label: "Name",
        },
        {
          key: "presence",
          label: "Presence",
        },
        {
          key: "in",
          label: "In",
        },
        {
          key: "offbreak",
          label: "off / breaks",
        },
        {
          key: "out",
          label: "Out",
        },
        {
          key: "total",
          label: "Total",
        },
      ],
      tableSectionsArray: [
        {
          title: "New Section",
          tasks: [
            {
              id: "63b64e0b9a8c618c76610466",
              businessId: "O3GWpmbk5ezJn4KR",
              userId: "gELYqaQWQG9dnjk2",
              firstName: "Rajeev",
              middleName: "Sharma",
              lastName: "Sharma",
              email: "rajeev.sharma@qsstechnosoft.com",
              jobTitle: "Frontend Developer",
              presence: "Punched in",
              in: "10:00",
              offbreaks: "00:30",
              out: "06:00",
              total: "8.2",
              photo:
                "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1674473092167.jpg",
            },
            {
              id: "63b64e0b9a8c618c76610466",
              businessId: "O3GWpmbk5ezJn4KR",
              userId: "gELYqaQWQG9dnjk2",
              firstName: "Rajeev",
              middleName: "Sharma",
              lastName: "Sharma",
              email: "rajeev.sharma@qsstechnosoft.com",
              jobTitle: "Frontend Developer",
              presence: "Punched in",
              in: "10:00",
              offbreaks: "00:30",
              out: "06:00",
              total: "8.2",
              photo:
                "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1674473092167.jpg",
            },
            {
              id: "63bf3de76bb6d8b00bb07cf3",
              businessId: "O3GWpmbk5ezJn4KR",
              userId: "wNJAPdR6RJEdGyOX",
              role: "USER",
              firstName: "Kelvin",
              lastName: "Jara",
              jobTitle: "Technical Architect",
              presence: "Punched in",
              in: "08:00",
              offbreaks: "00:30",
              out: "06:00",
              total: "8.2",
              photo:
                "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675200061019.jpg",
            },
            {
              id: "63bf9d766bb6d8b00bb07d13",
              businessId: "O3GWpmbk5ezJn4KR",
              userId: "DKgl9av2NwnaG1vz",
              role: "USER",
              firstName: "Vishwajeet",
              lastName: "Mandal",
              jobTitle: "Frontend Developer",
              offbreaks: null,
              presence: "Punched in",
              in: "08:30",
              out: "06:00",
              total: "8.2",
              photo:
                "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1675423967685.jpg",
            },
            {
              id: "63bfa19c6bb6d8b00bb07d1f",
              businessId: "O3GWpmbk5ezJn4KR",
              userId: "k61YQdJ6J7ldOGpJ",
              role: "ADMIN",
              firstName: "Dhruv",
              lastName: "Sharma",
              jobTitle: "Software Developer",
              presence: "Punched in",
              in: "09:00",
              offbreaks: "00:30",
              out: "06:00",
              total: null,
              photo:
                "https://dev-bib-account-storagebucket.s3.amazonaws.com/user_avatar_1676464522832.jpg",
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/myprofile/" + item.id);
    },
  }
}
</script>

<style lang="scss">
.time-wrapper {
}
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
</style>
