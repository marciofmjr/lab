<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route(to) {
      document.title = "Lab | " + to.meta.title || "Lab";
    }
  }
};
</script>

<style lang="sass">
h1
  padding-left: 16px

.w100
  width: 100%

.swal-modal
  .swal-title,
  .swal-text,
  .swal-footer *
    font-family: 'Roboto'

.swal-modal *
  outline: none !important
</style>
