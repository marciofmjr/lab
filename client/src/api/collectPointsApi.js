import client from "./client";
var url = "collect-points/";

export default {
  list(query = {}) {
    return client.get(url, query);
  }
};
