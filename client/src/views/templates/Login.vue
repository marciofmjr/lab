<template>
  <div class="login-container">
    <div class="main">
      <div class="logo">
        <!-- <img src="./assets/lab-logo.svg)"/> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style lang="sass">
.login-container
  display: flex
  position: relative
  justify-content: center
  align-items: center
  width: 100%
  height: 100vh

.login-container .main
  display: inline-flex
  position: relative
  width: 200px
  min-height: 300px
  height: fit-content
  border: 1px solid #000
</style>
