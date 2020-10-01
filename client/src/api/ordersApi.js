import client from "./client";
var url = "orders/";

export default {
  list(query = {}) {
    return client.get(url, query);
  },
  create(payload) {
    return client.create(url, payload);
  }
};
