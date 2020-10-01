<template>
  <v-container fluid>
    <v-row>
      <h1>Dashboard</h1>
    </v-row>

    <v-row>
      <v-subheader>Bem-vindo {{ user.name }}</v-subheader>
    </v-row>

  </v-container>
</template>

<script>
import session from "@/services/session";

export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return session.getUser();
    }
  }
};
</script>
