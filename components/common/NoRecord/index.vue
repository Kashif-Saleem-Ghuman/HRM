<template>
  <div class="no-record-found">
    <label>No Record Founds</label>
    <!-- <div class="d-flex justify-center">
      <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Back to main page"
                    class="mr-05"
                    className="button button-custom--lightsuccess"
                    @on-click="$router.push('/dashboard/')"
                  ></button-green>
      
    </div> -->
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
  align-items: center;
  justify-content: center;
  display: grid;
  padding: 50px 0;
  text-align: center;
  border-radius: 6px;
  label {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    font-weight: 500;
    color: rgb(173, 173, 172);
    padding: 20px 0;
  }
}
</style>
