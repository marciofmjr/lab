import client from "./client";
var url = "doctors/";

export default {
  list(query = {}) {
    return client.get(url, query);
  }
};
