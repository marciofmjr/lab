<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: "Doctor"
};
</script>
