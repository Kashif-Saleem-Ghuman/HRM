<template>
  <div class="no-record-found">
    <label>No Records Found</label>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.no-record-found {
  align-items: left;
  justify-content: center;
  display: grid;
  padding: 50px 0;
  text-align: center;
  border-radius: 6px;
  label {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: rgb(173, 173, 172);
    padding: 20px 0;
  }
}
</style>
