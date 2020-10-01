import client from "./client";
var url = "exams/";

export default {
  list(query = {}) {
    return client.get(url, query);
  }
};
