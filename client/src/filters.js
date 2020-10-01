import Vue from "vue";
import moment from "moment-timezone";

Vue.filter("createdAt", function(value) {
  return moment.tz(value, "America/Sao_Paulo").format("DD/MM/YYYY HH:mm");
});

Vue.filter("money", function(value) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
});

Vue.filter("gender", function(value) {
  return value.toLowerCase() === "m" ? "Masculino" : "Feminino";
});

Vue.filter("date", function(value) {
  return moment.tz(value, "America/Sao_Paulo").format("DD/MM/YYYY");
});
