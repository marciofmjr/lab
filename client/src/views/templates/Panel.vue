<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <!-- Dashboard -->
        <v-list-item link :to="{ name: 'dashboard' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- /Dashboard -->

        <!-- Dashboard -->
        <v-list-item link :to="{ name: 'collect-points' }">
          <v-list-item-action>
            <v-icon>mdi-hospital-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pontos de Coleta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- /Dashboard -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Lab - Controle de exames médicos</v-toolbar-title>
      <v-spacer></v-spacer>
      <strong>{{ user.name }}</strong>
      <v-btn icon @click="loggout()">
        <v-icon title="Sair">mdi-location-exit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import session from "@/services/session";

export default {
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    user() {
      return session.getUser();
    }
  },
  methods: {
    loggout() {
      session.logout();
    }
  }
};
</script>

<style lang="sass">
.v-app-bar.v-toolbar.v-sheet
  background: #037fff !important
</style>
