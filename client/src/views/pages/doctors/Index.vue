<template>
  <v-container fluid>
    <v-row>
      <h1>Médicos</h1>
    </v-row>

    <v-row>
      <v-subheader>Listagem de todos os médicos</v-subheader>
    </v-row>

    <v-row justify="end">
      <v-col cols="12">
        <div class="data-table-search-container">
          <v-text-field
            id="doctorsFilterInput"
            v-model="tableSearch"
            append-icon="mdi-magnify"
            label="Procurar"
            class="search"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-data-table
        id="doctorsTable"
        :loading="tableLoader"
        loading-text="Carregando pontos de coleta.. aguarde"
        :headers="tableHeaders"
        :items="tableData"
        :items-per-page="10"
        :search="tableSearch"
        :footer-props="{
          'items-per-page-options': [10, 25, 50, 100]
        }"
        class="elevation-1 w100 data-table-header-colored"
      >
        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ item.createdAt | createdAt }}</span>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import doctorsApi from "@/api/doctorsApi";
import alerty from "@/services/alerty";

export default {
  name: "DoctorIndex",
  data() {
    return {
      tableLoader: false,
      tableSearch: "",
      tableHeaders: [
        { text: "Nome", value: "name" },
        { text: "Especialidade", value: "specialty" }
      ],
      tableData: []
    };
  },
  methods: {
    async getTableData() {
      this.tableLoader = true;
      try {
        const response = await doctorsApi.list();
        this.tableData = response.data;
        this.tableLoader = false;
      } catch (error) {
        await alerty("Erro", "Não foi possível carregar os dados", "error");
        this.tableLoader = false;
      }
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
