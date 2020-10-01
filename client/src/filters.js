import Vue from "vue";
import moment from "moment";

Vue.filter("createdAt", function(value) {
  return moment(value).format("DD/MM/YYYY HH:mm");
});
