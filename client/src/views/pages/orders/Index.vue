<template>
  <v-container fluid>
    <v-row>
      <h1>Ordens de Serviço</h1>
    </v-row>

    <v-row>
      <v-subheader>Listagem de todos as ordens de serviço</v-subheader>
    </v-row>

    <v-row justify="end">
      <v-col cols="12">
        <div class="data-table-search-container">
          <v-text-field
            id="ordersFilterInput"
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
        id="ordersTable"
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
        <template v-slot:[`item.date`]="{ item }">
          <span>{{ item.date | createdAt }}</span>
        </template>
        <!--<template v-slot:[`item.gender`]="{ item }">
          <span>{{ item.gender | gender }}</span>
        </template> -->
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import ordersApi from "@/api/ordersApi";
import alerty from "@/services/alerty";

export default {
  name: "OrderIndex",
  data() {
    return {
      tableLoader: false,
      tableSearch: "",
      tableHeaders: [
        { text: "Criado em", value: "date" },
        { text: "Convênio", value: "healthInsurance" },
        { text: "Cliente", value: "customer.name" },
        { text: "Médico", value: "doctor.name" },
        { text: "Ponto de Coleta", value: "collectPoint.name" }
      ],
      tableData: []
    };
  },
  methods: {
    async getTableData() {
      this.tableLoader = true;
      try {
        const response = await ordersApi.list({
          include: "customer,doctor,collectPoint"
        });
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
