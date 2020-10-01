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

<style lang="sass"></style>
