<template>
  <v-container fluid>
    <div class="paper">
      <v-row>
        <div class="logo">
          <img src="../../../assets/lab-logo.svg" />
        </div>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>Ordem de Serviço</h3>
          <h2>
            Código de Retirada:
            <span class="code" id="code">{{ orderId }}</span>
          </h2>
        </v-col>
      </v-row>

      <v-row class="resume" v-if="order && order.customer">
        <v-col cols="12">
          <h2 id="titleCustomer">Paciente</h2>
          <ul>
            <li>
              <b>Nome:</b>
              <span id="customerName">{{ order.customer.name }}</span>
            </li>
            <li>
              <b>Sexo:</b>
              <span id="customerGender">{{
                order.customer.gender | gender
              }}</span>
            </li>
            <li>
              <b>Nascimento:</b>
              <span id="customerBirthday">{{
                order.customer.birthday | date
              }}</span>
            </li>
            <li>
              <b>Endereço:</b>
              <span id="customerAddress">{{ order.customer.address }}</span>
            </li>
          </ul>
        </v-col>
        <v-col cols="12">
          <h2 id="titleDoctor">Médico</h2>
          <ul>
            <li>
              <b>Nome:</b> <span id="doctorName">{{ order.doctor.name }}</span>
            </li>
            <li>
              <b>Especialidade:</b>
              <span id="doctorSpecialty">{{ order.doctor.specialty }}</span>
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-row class="resume" v-if="order && order.collectPoint">
        <v-col cols="12">
          <h2 id="titleCollectPoint">Ponto Coleta</h2>
          <ul>
            <li>
              <b>Nome:</b>
              <span id="collectPointName">{{ order.collectPoint.name }}</span>
            </li>
            <li>
              <b>Endereço:</b>
              <span id="collectPointAddress">{{
                order.collectPoint.address
              }}</span>
            </li>
          </ul>
        </v-col>
        <v-col cols="12">
          <h2 id="titleExam">Exames</h2>
          <ul v-if="order && order.exams && order.exams.length">
            <li v-for="(exam, index) in order.exams" :key="index">
              <span :id="'exam_' + index"
                >{{ exam.name }} - {{ exam.price | money }}</span
              >
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ordersApi from "@/api/ordersApi";
import alerty from "@/services/alerty";

export default {
  name: "ordersView",
  data() {
    return {
      orderId: this.$route.params.id,
      order: null
    };
  },
  methods: {
    async getOrder() {
      try {
        const response = await ordersApi.list({
          q: {
            id: this.orderId
          },
          include: "customer,doctor,collectPoint,exams"
        });
        this.order = response.data[0];
      } catch (error) {
        await alerty(
          "Erro",
          "Não foi possível carregar as informações da ordem de serviço",
          "error"
        );
      }
    }
  },
  async mounted() {
    await this.getOrder();
  }
};
</script>

<style lang="sass">
.paper
  display: block
  width: 800px
  max-width: 90%
  padding: 24px
  border: 1px solid #eee
  background-color: #fff
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1)
  margin: 0 auto

  h1
    padding: 0
    text-align: center

  .logo
    display: block
    width: 100%

    img
      display: block
      margin: 0 auto
      width: 200px

  .resume h2
    display: block
    width: 100%
    color: #037fff
    border-bottom: 1px solid #ccc

  .resume ul
    display: block
    width: 100%
    margin-top: 10px
    padding: 0

  .resume ul li
    display: block
    width: 100%
    margin-top: 8px
</style>
