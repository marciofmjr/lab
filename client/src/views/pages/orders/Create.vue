<template>
  <v-container fluid>
    <v-row>
      <h1>Criar Ordem de Serviço</h1>
    </v-row>

    <v-row>
      <v-subheader>Crie uma nova ordem de serviço</v-subheader>
    </v-row>

    <v-row v-if="!error">
      <v-form v-model="form.valid" class="w100" @submit.prevent="onSubmit">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                id="orderCreate"
                :items="customers"
                label="Paciente"
                item-text="name"
                item-value="id"
                v-model="form.data.customerId"
                :rules="form.rules.customer"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :items="doctors"
                label="Médico"
                item-text="display"
                item-value="id"
                v-model="form.data.doctorId"
                :rules="form.rules.doctor"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :items="collectPoints"
                label="Ponto de Coleta"
                item-text="name"
                item-value="id"
                v-model="form.data.collectPointId"
                :rules="form.rules.collectPoint"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="2">
              <v-text-field
                id="healthInsurance"
                v-model="form.data.healthInsurance"
                :rules="form.rules.healthInsurance"
                label="Convênio"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-menu
                v-model="modalMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="modalMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="8">
              <v-select
                v-model="form.data.exams"
                :items="exams"
                item-text="display"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                label="Exames"
                multiple
                hint="Selecione os exames pedidos"
                persistent-hint
                :rules="form.rules.exams"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn class="mr-4" @click="$router.go(-1)">
                Voltar
              </v-btn>
              <v-btn
                id="submit"
                type="submit"
                :disabled="!form.valid"
                color="primary"
              >
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import customersApi from "@/api/customersApi";
import doctorsApi from "@/api/doctorsApi";
import collectPointsApi from "@/api/collectPointsApi";
import examsApi from "@/api/examsApi";
import ordersApi from "@/api/ordersApi";

import alerty from "@/services/alerty";
import formify from "@/services/formify";
import moment from "moment-timezone";

export default {
  name: "ordersCreate",
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  data() {
    return {
      modalMenu: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      error: false,
      customers: [],
      doctors: [],
      collectPoints: [],
      exams: [],
      form: {
        valid: false,
        data: {
          customerId: null,
          doctorId: null,
          collectPointId: null,
          healthInsurance: "",
          exams: [],
          date: new Date().toISOString().substr(0, 10)
        },
        rules: {
          customer: [v => !!v || "Paciente é obrigatório"],
          doctor: [v => !!v || "Médico é obrigatório"],
          collectPoint: [v => !!v || "Ponto de Coleta é obrigatório"],
          healthInsurance: [v => !!v || "Convênio é obrigatório"],
          date: [v => !!v || "Data é obrigatório"],
          exams: [
            v => !!v || "Exame é obrigatório",
            v => (v.length && !!v) || "Exame é obrigatório"
          ]
        }
      }
    };
  },
  methods: {
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async onSubmit() {
      const payload = formify(this.form.data);
      const formattedExams = [];
      const exams = formify(this.exams);
      for (const examId of payload.exams) {
        for (const exam of exams) {
          if (exam.id === examId) {
            formattedExams.push({
              id: exam.id,
              price: exam.price
            });
          }
        }
      }
      payload.exams = formattedExams;
      payload.date = moment
        .tz(moment(this.date, "YYYY-MM-DD"), "America/Sao_Paulo")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss");

      try {
        const response = await ordersApi.create(payload);
        const ok = await alerty(
          "Sucesso",
          "Ordem de serviço criada com sucesso!!"
        );
        if (ok) {
          this.$router.push({
            name: "ordersView",
            params: { id: response.data.id }
          });
        }
      } catch (error) {
        this.errorAndExit("Não foi possível criar a ordem de serviço");
      }
    },
    async errorAndExit(message) {
      await alerty("Erro", message, "error");
    },
    async getCustomers() {
      try {
        const response = await customersApi.list();
        for (const customer of response.data) {
          this.customers.push({
            id: customer.id,
            name: customer.name
          });
        }
      } catch (error) {
        this.errorAndExit("Não foi possível carregar os clientes");
      }
    },
    async getDoctors() {
      try {
        const response = await doctorsApi.list();
        for (const doctor of response.data) {
          this.doctors.push({
            id: doctor.id,
            name: doctor.name,
            display: doctor.name + " - " + doctor.specialty
          });
        }
      } catch (error) {
        this.errorAndExit("Não foi possível carregar os médicos");
      }
    },
    async getCollectPoints() {
      try {
        const response = await collectPointsApi.list();
        for (const collectPoint of response.data) {
          this.collectPoints.push({
            id: collectPoint.id,
            name: collectPoint.name
          });
        }
      } catch (error) {
        this.errorAndExit("Não foi possível carregar os pontos de coleta");
      }
    },
    async getExams() {
      try {
        const response = await examsApi.list();
        for (const exam of response.data) {
          this.exams.push({
            id: exam.id,
            name: exam.name,
            price: exam.price,
            display:
              exam.name +
              " - " +
              exam.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              })
          });
        }
      } catch (error) {
        this.errorAndExit("Não foi possível carregar os exames");
      }
    }
  },
  async mounted() {
    await this.getCustomers();
    await this.getDoctors();
    await this.getCollectPoints();
    await this.getExams();
  }
};
</script>
