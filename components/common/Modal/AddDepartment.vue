<template>
  <div class="modal-wrapper">
    <bib-modal-wrapper
      v-if="departmentModel"
      title="Create a new department"
      @close="$emit('close')"
      size="lg"
    >
      <template slot="content">
        <div id="modal-content-wrapper">
          <div>
            <bib-input
              type="text"
              label="Department Name"
              placeholder="Enter department name..."
            ></bib-input>
          </div>
          <div id="team-list">
            <div class="wrapper-with-bg">
              <bib-input
                type="select"
                label="Select a person or a team to invite"
                placeholder="Select a person..."
              ></bib-input>
              <div
                class="d-flex align-center cursor-pointer text-gray1 bg-light bg-hover-gray2 p-075 shape-circle ml-05 font-md"
                @click="$emit('on-click')"
                style="margin-top: 19px"
              >
                <bib-icon
                  icon="add"
                  variant="secondary"
                  :scale="1.1"
                  :class="className"
                ></bib-icon>
              </div>
            </div>
            <div class="content-wrapper">
              <div id="user-list">
                <div class="section-title">People who have access</div>
                <div class="people-list-wrapper scroll_wrapper_sm" >
                  <div class="list-item" v-for="(item, index) in items">
                    <div class="d-flex align-center">
                      <bib-avatar
                        :src="item.photo"
                        size="3rem"
                        class="mr-05"
                      ></bib-avatar>
                      <div>
                        <div class="em-title">
                          {{ item.firstName + " " + item.lastName }}
                        </div>
                        <div class="em-desc">{{ item.email }}</div>
                      </div>
                    </div>
                    <bib-input
                      type="select"
                      placeholder="Select a person..."
                      style="width: 100px"
                      :options="accessOptions"
                    ></bib-input>
                  </div>
                </div>
              </div>
              <div id="access-type">
                <div class="section-title">Access type</div>
                <div class="people-list-wrapper people-list-wrapper_bg-gray">
                  <div class="list-item">
                    <div class="d-flex align-center">
                      <div
                        class="d-flex align-center cursor-pointer text-gray1 bg-light bg-hover-gray2 p-075 shape-circle mr-05 font-md"
                        @click="$emit('on-click')"
                      >
                        <bib-icon
                          icon="locker-locked"
                          variant="secondary"
                          :scale="1.1"
                          :class="className"
                        ></bib-icon>
                      </div>
                      <div>
                        <div class="em-title">Private</div>
                        <div class="em-desc">
                          Only invited users can access team information
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <bib-button label="Cancel" variant="light" pill></bib-button>
          <bib-button
            label="Create"
            variant="success"
            class="ml-auto"
            pill
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>
<script>
export default {
  name: "AddDepartment",
  props: {
    items: {
      type: Array,
    },
    departmentModel: {
      type: String,
    },
    accessOptions:{
      type:Array
    }
  },
  data() {
    return {
      // modal3Opened: false,
    };
  },
};
</script>
<style lang="scss">
.modal-wrapper{
  .modal__wrapper__content{
    padding-bottom: 0px !important;
  }
}
.content-wrapper {
  padding: 1rem 0;
  font-size: 14px;
  color: #86868a;

  .section-title {
    padding: 0px 0 12px 0;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
  .people-list-wrapper {
    border: 1px solid #e6e6e8;
    border-radius: 6px;
    padding: 1rem;
    background-color: #fff;
    margin-bottom: 1rem;
    &_bg-gray {
      background: #f8f8f9 !important;
    }
    .list-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .em-title {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }
      .em-desc {
        font-size: 12px;
      }
    }
  }
}
.wrapper-with-bg {
  display: flex;
  align-items: center;
  padding: 16px;

  background: #f8f8f9;
  border-radius: 6px;
}
</style>
