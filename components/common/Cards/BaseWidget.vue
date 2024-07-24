<template>
  <div class="widget d-flex">
    <div class="widget-container">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="widget-info mt-05">
        <div>
          <div class="widget-info__subheading">{{ subheading }}</div>
          <span>{{ value }}</span>
        </div>

        <div
          v-if="avatars && avatarsPosition === 'center'"
          class="widget-avatars-container"
        >
          <div
            v-for="avatar in avatars.slice(0, MAX_VISIBLE_AVATARS)"
            class="widget-avatars"
            :key="avatar.id"
          >
            <NuxtLink :to="`/profile/${avatar.id}`">
              <bib-avatar
                class="avatar"
                :src="avatar.photo"
                size="1.5rem"
                :text="avatar.photo ? null : getEmployeeInitials(avatar)"
              ></bib-avatar>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="subData" class="sub-data-container">
        <div v-for="item in subData" class="sub-data" :key="item.title">
          <div class="sub-data__title">{{ item.title }}</div>
          <div class="sub-data__value">{{ item.value }}</div>
        </div>
      </div>

      <div
        v-if="avatars && avatarsPosition === 'bottom'"
        class="widget-avatars-container-bottom pt-05"
      >
        <div
          v-for="avatar in avatars.slice(0, MAX_VISIBLE_AVATARS)"
          :key="avatar.id"
          class="cursor-pointer"
        >
          <NuxtLink :to="`/profile/${avatar.id}`">
            <bib-avatar
              :src="avatar.photo"
              size="1.5rem"
              :text="avatar.photo ? null : getEmployeeInitials(avatar)"
            ></bib-avatar>
          </NuxtLink>
        </div>
        <div
          v-if="avatars.length > MAX_VISIBLE_AVATARS"
          class="d-flex align-center item "
          style="position: relative"
          @mouseover="showEmployeeList"
          @mouseout="hideEmployeeList"
          v-click-outside="hideEmployeeList"
        >
          <span
            class="avatar__text  mr-025 cursor-default position-relative cursor-pointer" :class="isLightThemeCheck ? 'text-gray1' : 'text-light'"
            >... {{ avatars.length - MAX_VISIBLE_AVATARS }} more
            <div class="list position-absolute shape-rounded" v-show="employeeList" :class="isLightThemeCheck ? 'bg-dark border-light' : 'bg-dark border-dark-sub3'">
              <div
                class="list__item " :class="isLightThemeCheck ? 'bg-white bg-hover-gray3' : 'bg-dark  bg-hover-black'"
                v-for="avatar in avatars.slice(MAX_VISIBLE_AVATARS)"
                :key="avatar.id"
                @mouseout="hideEmployeeList"
              >
                <NuxtLink :to="`/profile/${avatar.id}`">
                  <div class="d-flex align-center">
                    <bib-avatar
                      :src="avatar.photo"
                      size="1.5rem"
                      class="mr-05"
                      :text="avatar.photo ? null : getEmployeeInitials(avatar)"
                    ></bib-avatar>
                    <div :class="isLightThemeCheck ? 'text-gray1' : 'text-light'">
                      {{ getEmployeeFullName(avatar) | truncate(25, "...") }}
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getEmployeeInitials,
  getEmployeeFullName,
} from "../../../utils/functions/common_functions";

const MAX_VISIBLE_AVATARS = 3;

export default {
  props: {
    avatarsPosition: {
      type: String,
      default: "bottom",
    },

  },

  data() {
    return {
      MAX_VISIBLE_AVATARS,
      data: {},
      subData: null,
      avatars: null,
      loading: false,
      avatarsBottom: null,
      employeeList: false,
    };
  },

  computed: {
    title() {
      return this.data?.title;
    },
    subheading() {
      return this.data?.subheading;
    },
    value() {
      return this.data?.value;
    },
  },

  methods: {
    getEmployeeInitials,
    getEmployeeFullName,
    async fetchData() {
      throw new Error(`Widget fetchaData function needs to be implemented!`);
    },
    showEmployeeList() {
      this.employeeList = true;
    },

    hideEmployeeList() {
      this.employeeList = false;
    },
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
$text-font-size: 14px;

.widget {
  height: 100%;
}

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

  .widget-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__subheading {
      font-weight: 500;
      color: $secondary-sub1;
      margin-bottom: -10px;
      font-size: $text-font-size;
    }

    span {
      font-size: 56px;
      font-weight: 500;
      margin-left: -4px;
    }

    .subheading_footer {
      font-weight: 500;
      color: $secondary-sub1;
      margin-top: -10px;
    }

    &_desc {
      font-size: 10px;
    }

    .widget-avatars-container {
      display: flex;
      // flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0.5rem;
      // overflow: hidden;
      // max-height: 2rem;

      .avatar {
        flex: 0 0 auto;
        margin: 1px;
        // overflow: hidden;
      }
    }
  }

  .footer-item {
    padding-top: 8px;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    .items {
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding-right: 10px;
      align-items: center;

      label {
        color: $secondary-sub1;
        font-weight: normal;
        font-size: $text-font-size;
      }

      span {
        font-weight: 600;
        font-size: $text-font-size;
      }
    }
  }

  .sub-data-container {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    flex-wrap: wrap;

    .sub-data {
      display: flex;
      justify-content: space-between;
      width: 48%;
      padding-top: 0.2rem;
      // border-bottom: 1px solid $light;
      // height: 40px;

      &__title {
        color: $secondary-sub1;
        font-size: $text-font-size;
        font-weight: 500;
      }

      &__value {
        font-weight: 500;
        font-size: $text-font-size;
      }
    }
  }

  .widget-avatars-container-bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    // flex-wrap: wrap;
    max-height: 2rem;
    // overflow: hidden;
    .list {
      z-index: 999999;
      width: 250px;
      left: 0px;
      top: 22px;
      max-height: 250px;
      overflow-y: auto;
      overflow-x: hidden;
      a {
        text-decoration: none;
        color: $black;
      }
    }
    .span {
      height: 1.5rem;
      width: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list__item {
      // width: 200px;
      cursor: pointer;
    }
  }
}
</style>
