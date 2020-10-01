import client from "./client";
var url = "customers/";

export default {
  list(query = {}) {
    return client.get(url, query);
  }
};
