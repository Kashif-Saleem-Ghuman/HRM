<template>
  <div>
    <div class="table">
      <div class="table__thead">
        <div class="cell" style="width: 40px">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell">New Activity</div>
        <div class="cell">Start</div>
        <div class="cell">End</div>
        <div class="cell">Total</div>
      </div>
      <!-- <div class="row">
        <div
          class="d-flex justify-between align-center py-05 cell"
          style="background-color: yellow"
        >
          <div class="">
            <label>Timesheet</label>
          </div>
          <div class="time-list">
            <ul class="time-list-item">
              <li>In <label>00:00</label></li>
              <li>Out <label>00:00</label></li>
              <li>Break <label>00:00</label></li>
              <li>Total <label>00:00</label></li>
            </ul>
          </div>
        </div>
      </div> -->
      <div class="row">
        <div class="cell" style="padding-left: 10px">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell" style="padding-left: 10px">Activity</div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
      </div>
      <div class="row">
        <div class="cell" style="padding-left: 10px">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell" style="padding-left: 10px">Activity</div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
      </div>
      <div class="row">
        <div class="cell" style="padding-left: 10px">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell" style="padding-left: 10px">Activity</div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
      </div>
      <div class="row">
        <div class="cell" style="padding-left: 10px">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell" style="padding-left: 10px">Activity</div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            value="00:00:00"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.time-list {
  ul {
    margin: 0px;
    padding: 0;
  }
  .time-list-item {
    display: flex;
    color: #000;
    li {
      list-style: none;
      padding: 0 10px;
      border-right: 1px solid #eee;
      font-weight: normal;
      font-size: 11px;
      &:last-child {
        border-right: 0px;
        padding-right: 0px;
      }
      label {
        display: block;
        font-weight: normal;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
.table {
  display: table;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  &__thead {
    display: table-row;
    color: $gray5;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border-top: 1px solid $gray3;
    border-collapse: collapse;
    .cell {
      display: table-cell;
      border-bottom: 1px solid $gray3;
      border-right: 1px solid $gray3;
      padding: 0px 10px;
    }
  }
  .row {
    display: table-row;
    .cell {
      display: table-cell;
      border-bottom: 1px solid $gray3;
      border-right: 1px solid $gray3;
    }
  }
}
</style>
